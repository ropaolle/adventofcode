# Notes

Run dev `npm start -- 2020 01`.

## TODO

- [ ] Clean up slow code (day 5, 7, 12, 14 and 15).
- [ ] Fix complexity
- [ ] Switch to arrow funcs?
- [ ] [freeCodeCamp points](https://www.freecodecamp.org/)
- [ ] [Kent C Dobbs](https://remix.run/docs/en/v1/pages/technical-explanation)

## Code cleanup

- Code quality
  - [codacy.com](https://codacy.com)
  - [snyk.io](https://snyk.io)
  - [codebeat.co](https://codebeat.co)
  - [codeclimate.com](https://codeclimate.com)
- [Clean code](https://github.com/ryanmcdermott/clean-code-javascript)

  - Function arguments (2 or fewer ideally)
  - Use default arguments instead of short circuiting or conditionals
  - Functions should do one thing
  - Function names should say what they do
  - Don't use flags as function parameters, use multiple functions
  - Encapsulate conditionals `function shouldShowSpinner(fsm, listNode) { return fsm.state === "fetching" && isEmpty(listNode); }`.
  - [Use method chaning](https://github.com/ryanmcdermott/clean-code-javascript#use-method-chaining)

- [Node.js best practices](https://github.com/goldbergyoni/nodebestpractices)
  - Use arrow functions
  - Error:
    - Don't ignore caught errors
    - Always use the built in error object.
    - Handle errors centrally, not within a middleware
    - Don't forget to test error flows
  - Require modules by folders, as opposed to the files directly

## Code

### RC conf reader

```js
var conf = require('rc')('appname', { port: 2468 });
console.log('conf', conf);
```

### .appnamerc

```json
{
  // You can even comment your JSON, if you want
  "param": "0.10.0"
}
```

### Pino

```js
// const logger = require('pino')();
const pino = require('pino');
const logger = pino({
  // level: 'trace',
  // name: 'pid prefix',
  transport: {
    target: 'pino-pretty',
    options: {
      // colorize: false,
      levelKey: 'trace',
      level: 'trace',
      translateTime: true,
      ignore: 'pid,hostname',
      // hideObject: true,
    },
  },
});

logger.silent('Hello world 1');
logger.trace('Hello world 2');
logger.debug('Hello world 3');
logger.info('Hello world 4');
logger.warn('Hello world 5');
logger.error('Hello world 6');
logger.fatal('asd', 'asd');
```
