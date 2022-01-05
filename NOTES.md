# Notes

## TODO

- [ ] [freeCodeCamp points](https://www.freecodecamp.org/)
- [ ] Code quality (codacy.com, snyk.io, coadbeat.co)

## Update readme

- Use codecov: uses: codecov/codecov-action@v1
- [Update readme 1](https://github.com/Mokkapps/mokkapps)
- [Compile Badges Action v1](https://github.com/marketplace/actions/compile-badges-action)
- [info a](https://github.com/deeheber)
- [info a](https://fromthebottomoftheheap.net/2020/04/30/rendering-your-readme-with-github-actions)
- [info a](https://github.com/prettier/prettier-eslint/blob/master/package-scripts.js)
- [Prettier-eslint](https://github.com/prettier/prettier-eslint)

## Running test and dev

```sh
# Run dev
npm start -- 2020 01
```

```yml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]

    steps:
      - uses: actions/checkout@v2

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - run: npm ci

      - name: Codecov
        uses: codecov/codecov-action@v2
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          flags: unittests
```
