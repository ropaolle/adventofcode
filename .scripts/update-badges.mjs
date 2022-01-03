import { readFileSync, writeFileSync } from 'fs';

function passedTests() {
  try {
    const {
      stats: { passes },
    } = JSON.parse(readFileSync('./mochawesome-report/mochawesome.json', 'utf8'));
    return Math.floor(passes / 2);
  } catch (error) {
    console.error(error.message);
    return 0;
  }
}

function lineCoverage() {
  try {
    const {
      total: {
        lines: { pct },
      },
    } = JSON.parse(readFileSync('./coverage/coverage-summary.json', 'utf8'));
    return Math.floor(pct);
  } catch (error) {
    console.error(error.message);
    return 0;
  }
}

function updateFile(badgeTag, newBadge, filename = './README.md') {
  try {
    // Load file
    const lines = readFileSync(filename, 'utf8').split(/\n/);
    // Replace badge
    const line = lines.findIndex((line) => line.indexOf(badgeTag) === 0);
    lines[line] = newBadge;
    // Update file
    writeFileSync(filename, lines.join('\n'), { flag: 'w' });
  } catch (error) {
    console.error(error.message);
  }
}

function replaceBadge(options = {}) {
  const defaultBadgeOptions = {
    label: 'label',
    color: 'green',
    message: 'message',
    logo: 'github',
    style: 'for-the-badge', // 'flat',
  };

  const { label, message, color, logo, style } = { ...defaultBadgeOptions, ...options };
  const tag = `![${label}](`;
  const link = `https://img.shields.io/static/v1?label=${label}&message=${message}&color=${color}&logo=${logo}&style=${style}`;
  const newBadge = `![${label}](${encodeURI(link)})`;

  updateFile(tag, newBadge);
}

function updateBadges() {
  const passes = passedTests();
  const passesProcent = Math.floor((passes / 25) * 100);
  const coverageProcent = lineCoverage();

  console.info('\nReplacing badge AoC Progress!');
  replaceBadge({
    label: `AoC Progress`,
    color: passes < 15 ? 'red' : passes < 25 ? 'yellow' : 'lightgreen',
    message: `${passesProcent}% (${passes} of 25)`,
  });

  console.info('Replacing badge Code Coverage!');
  replaceBadge({
    label: `Code Coverage`,
    color: coverageProcent < 65 ? 'red' : coverageProcent < 100 ? 'yellow' : 'lightgreen',
    message: `${coverageProcent}%`,
  });
}

updateBadges();
