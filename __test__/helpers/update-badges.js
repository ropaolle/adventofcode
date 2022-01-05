const fsPromises = require('fs').promises;
var parseStringPromise = require('xml2js').parseStringPromise;

function getCoverageResult({ statements, coveredstatements }, year) {
  const coverageProcent = (coveredstatements / statements) * 100;
  return {
    type: 'coverage',
    coverageProcent: coverageProcent >= 100 ? 100 : Math.floor(coverageProcent),
    year,
  };
}

async function parseTestData() {
  const result = [];

  try {
    // Parse test data
    const test_xml = await fsPromises.readFile('./__test__/reports/junit.xml');
    const {
      testsuites: { testsuite },
    } = await parseStringPromise(test_xml);
    testsuite.forEach(({ $: test }) => {
      const { name, errors, tests } = test;
      const success = tests - errors;
      const successProcent = Math.floor((success / 50) * 100);
      const year = name.slice(-4);
      result.push({ type: 'test', success, successProcent, year });
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
      result.push(getCoverageResult(projectStatus, result.tests[0].name));
    } else {
      projectData.package.forEach(({ $: { name }, metrics }) => {
        const packetStatus = metrics.shift()['$'];
        result.push(getCoverageResult(packetStatus, name));
      });
    }
  } catch (err) {
    console.error('Failed to load files', err.message);
  }

  return result;
}

// eslint-disable-next-line complexity
function getBadge({ type, year, success, successProcent, coverageProcent }) {
  const logo = 'github';
  const style = 'for-the-badge'; // 'flat'
  const { tag, label, message, color } =
    type === 'test'
      ? {
          tag: `![AoC Progress ${year}]`,
          label: `AoC Progress`,
          color: success < 30 ? 'red' : success < 50 ? 'yellow' : 'lightgreen',
          message: `${successProcent}% (${success / 2} of 25)`,
        }
      : {
          tag: `![Code Coverage ${year}]`,
          label: `Code Coverage`,
          color: coverageProcent < 65 ? 'red' : coverageProcent < 100 ? 'yellow' : 'lightgreen',
          message: `${coverageProcent}%`,
        };
  const link = `https://img.shields.io/static/v1?label=${label}&message=${message}&color=${color}&logo=${logo}&style=${style}`;

  return { tag, badge: `${tag}(${encodeURI(link)})` };
}

async function updateFile(badges, filename = './README.md') {
  try {
    const text = await fsPromises.readFile(filename, 'utf8');
    const lines = text.split(/\n/);
    badges.forEach(({ tag, badge }) => {
      const line = lines.findIndex((line) => line.indexOf(tag) === 0);
      lines[line] = badge;
    });
    await fsPromises.writeFile(filename, lines.join('\n'));
  } catch (err) {
    console.error('Failed to update file', err.message);
  }
}

async function updateBadges() {
  const data = await parseTestData();
  const badges = data.reduce((acc, test) => [...acc, getBadge(test)], []);
  await updateFile(badges);
}

updateBadges();
