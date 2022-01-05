const fsPromises = require('fs').promises;
var parseStringPromise = require('xml2js').parseStringPromise;

function getBadge({ year, success, successProcent, color }) {
  const label = `AoC Progress ${year}`;
  const message = `${successProcent}% (${success / 2} of 25)`;
  const style = 'for-the-badge'; // 'flat'
  const logo = 'github';
  const url = 'https://img.shields.io/static/v1?';
  const link = `${url}label=${label}&message=${message}&color=${color}&logo=${logo}&style=${style}`;

  return { year, badge: `![${label}](${encodeURI(link)})` };
}

async function parseTestData() {
  const result = [];

  try {
    const xml_data = await fsPromises.readFile('./__test__/reports/junit.xml');
    const js_data = await parseStringPromise(xml_data);

    for (const { $: test } of js_data.testsuites.testsuite) {
      const success = test.tests - test.errors;
      result.push(
        getBadge({
          year: test.name.slice(-4),
          success,
          successProcent: Math.floor((success / 50) * 100),
          color: success < 30 ? 'red' : success < 50 ? 'yellow' : 'lightgreen',
        })
      );
    }
  } catch (err) {
    console.error('Failed to load files', err.message);
  }

  return result;
}

async function updateFile(badges, filename = './README.md') {
  const startTag = '<!--- aoc-progress-start --->';
  const stopTag = '<!--- aoc-progress-stop --->';

  try {
    const text = await fsPromises.readFile(filename, 'utf8');
    const lines = text.split(/\n/);

    const start = lines.findIndex((line) => line.indexOf(startTag) === 0);
    const stop = lines.findIndex((line) => line.indexOf(stopTag) === 0);

    if (start === -1 || stop === -1) {
      return console.error('Start or stop tag is missing!');
    }

    // Delete old badges
    lines.splice(start + 1, stop - start - 1);

    // Insert new badges
    lines.splice(start + 1, 0, '', ...badges.map(({ badge }) => badge + ' '), '');

    await fsPromises.writeFile(filename, lines.join('\n'));
  } catch (err) {
    console.error('Failed to update file', err.message);
  }
}

async function updateBadges() {
  const badges = await parseTestData();
  await updateFile(badges);
}

updateBadges();
