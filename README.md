# whatsapp-cloud-api

`whatsapp-cloud-api` is a Node.js library for creating bots and sending/receiving messages using the [Whatsapp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).

Contains built-in Typescript declarations.

[![run tests, lint, build](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml)
[![npm publish](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml)
![npm](https://img.shields.io/npm/v/whatsapp-cloud-api)
![npm bundle size](https://img.shields.io/bundlephobia/min/whatsapp-cloud-api)
![npm](https://img.shields.io/npm/dw/whatsapp-cloud-api)

## Install

```bash
npm i whatsapp-cloud-api
```

## Usage

```js
import { createBot } from 'whatsapp-cloud-api';

// replace the values below
const from = 'YOUR_WHATSAPP_BUSINESS_ACCOUNT_ID';
const token = 'YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN';
const to = 'PHONE_NUMBER_OF_RECIPIENT';

// Create a bot that can send messages
const bot = createBot(from, token);

// Send text message
const result = await bot.sendMessage(to, 'Hello world');

// Send image
const result = await bot.sendImage(to, 'https://picsum.photos/200/300', {
  caption: 'Random jpg',
});

// Send location
const result = await bot.sendLocation(to, 40.7128, -74.0060, {
  name: 'New York',
});

// Send template
const result = await bot.sendTemplate(to, 'hello_world', 'en_us');
```

## Documentation

- [API Reference](./API.md)

## Development

```bash
# install npm modules
npm i

# eslint
npm run lint

# typescript check
npm run ts-check

# test
## Read 'Local Testing' below before running this
npm t

# build
npm run build
```

### Local Testing

Create a .env file in the root of your project:

```txt
FROM_PHONE_NUMBER_ID=""
ACCESS_TOKEN=""
VERSION=""
TO=""
```

## Pull Requests

Any and all PRs are open.
