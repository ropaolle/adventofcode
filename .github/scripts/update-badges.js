const fsPromises = require('fs').promises;
const parseStringPromise = require('xml2js').parseStringPromise;

/**
 * Create a shields.io badge.
 * @param {object} options - shields.io options.
 * @return {string} Badge string.
 */
function makeShieldsIoBadge(options) {
  const { baseUrl, label, message, color, logo, style } = {
    ...{
      style: 'for-the-badge', // flat | for-the-badge | ...
      baseUrl: 'https://img.shields.io/static/v1?',
      logo: 'github',
    },
    ...options,
  };

  const link = `${baseUrl}label=${label}&message=${message}&color=${color}&logo=${logo}&style=${style}`;

  return `![${label}](${encodeURI(link)})`;
}

function prepareBadgeData({ tests, errors, name }) {
  const success = tests - errors;
  const successProcent = Math.floor((success / 50) * 100);
  const year = name.slice(-4);
  return {
    label: `AoC Progress ${year}`,
    message: `${successProcent}% (${success / 2} of 25)`,
    color: success < 30 ? 'red' : success < 50 ? 'yellow' : 'lightgreen',
  };
}

async function parseTestData(filename) {
  const result = [];

  try {
    // return;
    const xml_data = await fsPromises.readFile(filename);
    const js_data = await parseStringPromise(xml_data);
    for (const { $: test } of js_data.testsuites.testsuite) {
      if (test.name.indexOf('AOC 20') === 0) {
        result.push(makeShieldsIoBadge(prepareBadgeData(test)));
      }
    }
  } catch (err) {
    console.error('Failed to load files', err);
  }

  return result;
}

function replaceTagContent(textFile, tagName, linesToInsert = []) {
  const lines = textFile.split(/\n/);
  const start = lines.findIndex((line) => line.indexOf(`<!--- ${tagName}-start --->`) === 0);
  const stop = lines.findIndex((line) => line.indexOf(`<!--- ${tagName}-stop --->`) === 0);

  if (start === -1 || stop === -1) {
    return console.error('Start or stop tag is missing!');
  }

  // Delete old badges
  lines.splice(start + 1, stop - start - 1);

  // Insert new badges
  lines.splice(start + 1, 0, '', ...linesToInsert.map((badge) => badge + ' '), '');

  return lines.join('\n');
}

async function updateFile(filename) {
  const badges = await parseTestData('./__test__/reports/junit.xml');
  try {
    const text = await fsPromises.readFile(filename, 'utf8');
    await fsPromises.writeFile(filename, replaceTagContent(text, 'aoc-progress', badges));
  } catch (err) {
    console.error('Failed to update file', err.message);
  }
}

updateFile('./README.md');
