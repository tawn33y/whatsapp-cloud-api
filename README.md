# whatsapp-cloud-api

`whatsapp-cloud-api` is a Node.js library for creating bots and sending/receiving messages using the [Whatsapp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).

Contains built-in Typescript declarations.

[![run tests, lint, build](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml)
[![npm publish](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml)
![npm](https://img.shields.io/npm/v/whatsapp-cloud-api)
![npm bundle size](https://img.shields.io/bundlephobia/min/whatsapp-cloud-api)
![npm](https://img.shields.io/npm/dw/whatsapp-cloud-api)

## Install

Using npm:

```bash
npm i whatsapp-cloud-api
```

Using yarn:

```bash
yarn add whatsapp-cloud-api
```

## Usage

```js
import { createBot } from 'whatsapp-cloud-api';
// or if using require:
// const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    // replace the values below
    const from = 'YOUR_WHATSAPP_PHONE_NUMBER_ID';
    const token = 'YOUR_TEMPORARY_OR_PERMANENT_ACCESS_TOKEN';
    const to = 'PHONE_NUMBER_OF_RECIPIENT';
    const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';

    // Create a bot that can send messages
    const bot = createBot(from, token);

    // Send text message
    const result = await bot.sendText(to, 'Hello world');

    // Start express server to listen for incoming messages
    // NOTE: See below under `Documentation/Tutorial` to learn how
    // you can verify the webhook URL and make the server publicly available
    await bot.startExpressServer({
      webhookVerifyToken,
    });

    // Listen to ALL incoming messages
    // NOTE: remember to always run: await bot.startExpressServer() first
    bot.on('message', async (msg) => {
      console.log(msg);

      if (msg.type === 'text') {
        await bot.sendText(msg.from, 'Received your text message!');
      } else if (msg.type === 'image') {
        await bot.sendText(msg.from, 'Received your image!');
      }
    });
  } catch (err) {
    console.log(err);
  }
})();
```

## Documentation

- [API Reference](./API.md).
- [Tutorial](./TUTORIAL.md) for a step-by-step on how to get everything set up.

## Examples

Sending other message types ([read more in API reference](./API.md#api-reference)):

```js
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

Customized express server ([read more below](#2-handling-incoming-messages)):

```js
import cors from 'cors';

// Create bot...
const bot = createBot(...);

// Customize server
await bot.startExpressServer({
  webhookVerifyToken: 'my-verification-token',
  port: 3000,
  webhookPath: `/custom/webhook`,
  useMiddleware: (app) => {
    app.use(cors()),
  },
});
```

Listening to other message types ([read more in API reference](./API.md#onevent-cb-message--void)):

```js
const bot = createBot(...);

await bot.startExpressServer({ webhookVerifyToken });

// Listen to incoming text messages ONLY
bot.on('text', async (msg) => {
  console.log(msg);
  await bot.sendText(msg.from, 'Received your text!');
});

// Listen to incoming image messages ONLY
bot.on('image', async (msg) => {
  console.log(msg);
  await bot.sendText(msg.from, 'Received your image!');
});
```

## Notes

### 1. Verifying your Webhook URL

By default, the endpoint for whatsapp-related requests will be: `/webhook/whatsapp`.
This means that locally, your URL will be: `http://localhost/webhook/whatsapp`.

You can use a reverse proxy to make the server publicly available. An example of this is [ngrok](https://ngrok.com/download). 

You can [read more on the Tutorial](./TUTORIAL.md#3-setting-up-ngrok).

### 2. Handling incoming messages

The implementation above creates an express server for you through which it listens to incoming messages. There may be plans to support other types of server in future (PRs are welcome! :)).

You can change the port as follows:

```js
await bot.startExpressServer({
  port: 3000,
});
```

By default, all requests are handled by the `POST|GET /webhook/whatsapp` endpoint. You can change this as below:

```js
await bot.startExpressServer({
  webhookPath: `/custom/webhook`,
});
```

**Note:** Remember the leading `/`; i.e. don't use `custom/whatsapp`; instead use `/custom/whatsapp`.

If you are already running an express server in your application, you can avoid creating a new one by using it as below:

```js
// your code...
import express from 'express';
const app = express();

...

// use the `app` variable below:
await bot.startExpressServer({
  app,
});
```

To add middleware:

```js
import cors from 'cors';

await bot.startExpressServer({
  useMiddleware: (app) => {
    app.use(cors()),
  },
});
```

Full customized setup:

```js
import cors from 'cors';

await bot.startExpressServer({
  webhookVerifyToken: 'my-verification-token',
  port: 3000,
  webhookPath: `/custom/webhook`,
  useMiddleware: (app) => {
    app.use(cors()),
  },
});
```

### 3. `on()` listener

This library uses a single process pubsub, which means that it won't work well if you're deploying on multi-instance clusters, e.g. distributed Kubernetes clusters. In future, there may be plans to export/support a pubsub reference which can be stored in extenal storage, e.g. redis (PRs are welcome! :)).

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
WEBHOOK_VERIFY_TOKEN=""
WEBHOOK_PATH=""
```

### Attribution

Library API inspired by [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md).

## Pull Requests

Any and all PRs are open.
