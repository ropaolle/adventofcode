const fsPromises = require('fs').promises;
var parseStringPromise = require('xml2js').parseStringPromise;

function getCoverageProcent({ statements, coveredstatements }) {
  const coverageProcent = (coveredstatements / statements) * 100;
  return coverageProcent >= 100 ? 100 : Math.floor(coverageProcent);
}

async function loadData() {
  const result = { tests: [], coverage: [] };

  try {
    // Parse test data
    const test_xml = await fsPromises.readFile('./__test__/reports/junit.xml');
    const {
      testsuites: { testsuite },
    } = await parseStringPromise(test_xml);
    testsuite.forEach(({ $: test }) => {
      const { name, errors, tests } = test;
      const success = tests - errors;
      const successProcent = Math.floor((success / 25) * 100);
      const year = name.slice(-4);
      result.tests.push({ /* ...test, */ success, successProcent, year });
    });

    // Parse coverage data
    const coverage_xml = await fsPromises.readFile('./__test__/reports/clover.xml');
    const {
      coverage: {
        project: [projectData],
      },
    } = await parseStringPromise(coverage_xml);
    const projectStatus = projectData.metrics.shift()['$'];
    if (projectStatus.packages === '1') {
      // If the coverage test only includes on test file we do not get PacketStatus, only Project status.
      const name = result.tests[0].name;
      result.coverage.push({
        coverageProcent: getCoverageProcent(projectStatus),
        year: name /* , ...projectStatus */,
      });
    } else {
      projectData.package.forEach(({ $: { name }, metrics }) => {
        const packetStatus = metrics.shift()['$'];
        result.coverage.push({
          coverageProcent: getCoverageProcent(packetStatus),
          year: name /* , ...packetStatus */,
        });
      });
    }
  } catch (err) {
    console.error('Failed to load files', err.message);
  }

  return result;
}

async function updateFile(badgeTag, newBadge, filename = './README.md') {
  try {
    const text = await fsPromises.readFile(filename, 'utf8');
    const lines = text.split(/\n/);
    const line = lines.findIndex((line) => line.indexOf(badgeTag) === 0);
    lines[line] = newBadge;
    await fsPromises.writeFile(filename, lines.join('\n'));
  } catch (err) {
    console.error('Failed to update file', err.message);
  }
}

async function replaceBadge(options = {}) {
  const defaultBadgeOptions = {
    tag: 'tag',
    label: 'label',
    color: 'green',
    message: 'message',
    logo: 'github',
    style: 'for-the-badge', // 'flat',
  };

  const { tag, label, message, color, logo, style } = { ...defaultBadgeOptions, ...options };
  const link = `https://img.shields.io/static/v1?label=${label}&message=${message}&color=${color}&logo=${logo}&style=${style}`;
  const newBadge = `${tag}(${encodeURI(link)})`;

  console.log('tag', newBadge);

  await updateFile(tag, newBadge);
}

async function updateBadges() {
  const data = await loadData();
  // console.info('data', data);
  console.info('\n');

  data['tests'].forEach(({ success, successProcent, year }) => {
    console.info(`Replacing badge AoC Progress ${year}!`);
    replaceBadge({
      tag: `![AoC Progress ${year}]`,
      label: `AoC Progress`,
      color: success < 15 ? 'red' : success < 25 ? 'yellow' : 'lightgreen',
      message: `${successProcent}% (${success} of 25)`,
    });
  });

  data['coverage'].forEach(({ coverageProcent, year }) => {
    console.info(`Replacing badge Code Coverage ${year}!`);
    replaceBadge({
      tag: `![Code Coverage ${year}]`,
      label: `Code Coverage`,
      color: coverageProcent < 65 ? 'red' : coverageProcent < 100 ? 'yellow' : 'lightgreen',
      message: `${coverageProcent}%`,
    });
  });
}

updateBadges();
