# Notes

- [ ] [freeCodeCamp points](https://www.freecodecamp.org/)
- [ ] [codacy.com](https://codacy.com/)
- [ ] [snyk.io](https://snyk.io/)
- [ ] [codebeat.co](https://codebeat.co/)
- [?] [deepsource.io](https://deepsource.io/) - Krånglig

## Running test and dev

```sh
# Run dev
ROPAOLLE=DEV npm run dev -- 2021/day01.js
# Run Mocha locally
mocha -w --slow 10
# Run Mocha
npm test
# Run Mocha and code coverage
test:coverage
```

## Git merge and squash

```sh
# create local branch 'local:dev'
git checkout master
git merge --squash local:dev
#git commit -m <"your commit message">
```

## Codacy.com

Quotes: unnamedParam: double -> single

## Div

- [C8](https://github.com/bcoe/c8)
- [NPM Scripts](https://www.twilio.com/blog/npm-scripts)
- [Badges](https://shields.io/endpoint)
- [Badge in private repo](https://medium.com/@vemarav/dynamic-badges-using-shields-io-5948dcb2a99d)

## Mocha

- [Mocha](https://medium.com/serverlessguru/how-to-unit-test-with-nodejs-76967019ba56)
- [Mocha.js, the JavaScript test framework: A tutorial](https://blog.logrocket.com/a-quick-and-complete-guide-to-mocha-testing-d0e0ea09f09d/)
- [Getting Started with Node.js and Mocha](https://semaphoreci.com/community/tutorials/getting-started-with-node-js-and-mocha)
- [Mocha and Travis CI](https://github.com/mrnz/adventofcode)

## Code

```js
// Optional Chaining Has Arrived! - https://dev.to/laurieontech/optional-chaining-has-arrived-111l
const x = { a: { b: 0 } };
console.log(x?.a);

// nullish coalescing - https://dev.to/laurieontech/nullish-coalescing-let-falsy-fool-you-no-more-41c0
let t = '';
console.log(t ?? 'hallå', t || 'olle');

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.info(`${__filename} - Part one:`, partOne(testInput));
  console.info(`${__filename} - Part two:`, partTwo(testInput));
}
```

### ES6 Modules

```js
// package.json: "type": "module",

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
```

### Replace string

```sh
#!/bin/bash

TAG=Branches
NEW_TEXT='![Branches](https:\/\/img.shields.io\/badge\/branches-90%25-brightgreen.svg?style=flat)'

sed -i 's/.*'"${TAG}"'.*/'"${NEW_TEXT}"'/g' BADGE.md
```

## Create files

```sh
#!/bin/bash

hello_world () {
cat << EOF > $1
const testInput = \`\`;

function parse(input) {
  return input.split(/\r?\n/).filter((line) => line.length !== 0); // Ignore empty lines in the test input
}

function partOne(input) {
  const data = parse(input)
  console.log('data', data);
}

function partTwo(input) {}

/* c8 ignore next 4 */
if (process.env.ROPAOLLE === 'DEV') {
  console.log(\`${__filename} - Part one:\`, partOne(testInput));
  console.log(\`${__filename} - Part two:\`, partTwo(testInput));
}

exports.partOne = partOne;
exports.partTwo = partTwo;
EOF
}

for f in {01..01}; do
    hello_world "day$f.js"
    touch "day$f.txt"
done
```

## Jest test

```js
// Jest - https://jestjs.io/

function dailyTest(day, answerOne, answerTwo) {
  describe(`Day ${day}`, function () {
    var { partOne, partTwo } = require(`../2021/day${day}.js`);

    test('part one', function () {
      expect(partOne(loadInput(`./2021/day${day}.txt`))).toBe(answerOne);
    });

    test('part two', function () {
      expect(partTwo(loadInput(`./2021/day${day}.txt`))).toBe(answerTwo);
    });
  });
}
```

## ES Lint

[Prettier and ES Lint](https://prettier.io/docs/en/integrating-with-linters.html)

```json
 "prettier": {
    "singleQuote": true,
    "eqeqeq": [
      "error",
      "always"
    ]
  },
  "eslintConfig": {
    "rules": {
      "no-console": [
        "error",
        {
          "allow": [
            "info",
            "error"
          ]
        }
      ],
      "quotes": [
        "error",
        "single",
        {
          "avoidEscape": true
        }
      ],
      "eqeqeq": [
        "error",
        "always"
      ]
    }
  },


{
  "rules": {
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true
      }
    ],
    "no-console": ["error", { "allow": ["warn", "error", "info"] }]
  }
}

arrowParens: 'always'
bracketSpacing: true
endOfLine: 'lf'
htmlWhitespaceSensitivity: 'css'
insertPragma: false
jsxBracketSameLine: false
jsxSingleQuote: false
printWidth: 100
proseWrap: 'preserve'
quoteProps: 'as-needed'
requirePragma: false
semi: true
singleQuote: true
tabWidth: 2
trailingComma: 'es5'
useTabs: false
vueIndentScriptAndStyle: false
no-console: true

```
