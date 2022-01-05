# Notes

## TODO

- [ ] [freeCodeCamp points](https://www.freecodecamp.org/)
- [ ] [codacy.com](https://codacy.com/)
- [ ] [snyk.io](https://snyk.io/)
- [ ] [codebeat.co](https://codebeat.co/)

## Running test and dev

```sh
# Run dev
npm start -- 2020 01
```

## How to include commonjs module in ES6 module node app?

[info](https://stackoverflow.com/questions/61549406/how-to-include-commonjs-module-in-es6-module-node-app)

```json
{
  "name": "local-iso-dt",
  "version": "3.1.0",
  "description": "...",
  "type": "commonjs",
  "exports": {
    "node": {
      "import": "./index.mjs",
      "require": "./index.js"
    },
    "default": "./index.mjs"
  },
  "main": "index.js",
  "files": ["index.ts", "index.mjs", "index.js"],
  "scripts": {
    "clean": "rm index*.js index.mjs",
    "prepublishOnly:cjs": "tsc index.ts --esModuleInterop --removeComments",
    "prepublishOnly:esm": "tsc index.ts -t ES2015 --types node && mv index.js index.mjs",
    "prepublishOnly": "npm run prepublishOnly:esm; npm run prepublishOnly:cjs"
  },
  "devDependencies": {
    "typescript": "^4.0.2"
  }
}
```
