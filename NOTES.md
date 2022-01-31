# Notes

- Run dev: `npm start -- 2020 01`
- Test on Windows Termianal: `/home/olle/adventofcode`,
  `npm run test:dev:verbose`

## TODO

- [ ] Clean up slow code (day 5, 7, 12, 14 and 15).
  - Fix complexity
  - Use map, set, weak map (Object only, no itteration)

## WSL2 - Install NODE.js

[Install](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl)

## Proofing

```sh
NODE_ENV=production node --prof index.js 2020 11
node --prof-process isolate-000002B710B32830-6396-v8.log > processed.txt
```
