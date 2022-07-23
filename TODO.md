# TODO

- [ ] README -> remove tags: minifiedSize; rearrange
- [ ] sendMessage deprecate
- [ ] create business account & add number
- [ ] createBot.types.d.ts:2:38: Try `npm i --save-dev @types/express` if it exists or add a new declaration (.d.ts) file containing `declare module 'express';`
- [ ] Better documentation for data in `bot.on(...)` & update docs
- [ ] Create localBuildTest.sh & run tests

- [ ] example/
- [ ] Opening PRs: templates, format, etc
  - Create feature branch from staging (create mileston v1.0)
  - npm i
  - git commit -m ""
  - git push origin feature/xx
  - Open PR to staging & merge (This closes #1, delete source branch)
- [ ] fix: test sending stickers
- [ ] Licenses: https://www.exygy.com/blog/which-license-should-i-use-mit-vs-apache-vs-gpl
- [ ] Use validation & be more strict
  - [ ] comprehensive tests: test errors & edge cases
  - [ ] validate function args, e.g. use joi

## New features

- [ ] Enable multi-process pubsub (e.g. use redis)
- [ ] Add support for other types of servers, e.g. Nest.js, etc
