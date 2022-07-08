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
const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';

// Create a bot that can send messages
const bot = createBot(from, token);

// Send text message
const result = await bot.sendMessage(to, 'Hello world');

// Send image
const result = await bot.sendImage(to, 'https://picsum.photos/200/300', {
  caption: 'Random jpg',
});

// Start express server to listen for incoming messages
// NOTE: Read below on 'Verifying your Callback URL' to understand how
// to make the server publicly available
await bot.startExpressServer({
  webhookVerifyToken,
});

// Listen to incoming text messages ONLY
// NOTE: you need to run: await bot.startExpressServer() first
bot.on('text', async (msg) => {
  console.log(msg);
  await bot.sendMessage(msg.from, 'Received your text!');
});

// Listen to ALL incoming messages
// NOTE: you need to run: await bot.startExpressServer() first
bot.on('message', async (msg) => {
  console.log(msg);

  if (msg.type === 'text') {
    await bot.sendMessage(msg.from, 'Received your text message!');
  } else if (msg.type === 'image') {
    await bot.sendMessage(msg.from, 'Received your image!');
  }
});
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

## Documentation

- [API Reference](./API.md)

## Notes

### 1. Verifying your Callback URL

By default, the endpoint for whatsapp-related requests will be: `/webhook/whatsapp`.
This means that locally, your URL will be: `http://localhost/webhook/whatsapp`.

You can use a reverse proxy to make the server publicly available. An example of this is [ngrok](https://ngrok.com/download). For the purposes of this explanation, we will use `ngrok` as our reverse proxy:

- Download ngrok:  [https://ngrok.com/download](https://ngrok.com/download)
- Follow the instuctions to set it up
- Run it: `ngrok http 3000`. You should get a public URL, e.g. `https://1234.ngrok.io`
- Start your app: `npm start`
- Go to Facebook Developer app settings and under Whatsapp > Configuration, use the url received from ngrok: `https://1234.ngrok.io/webhook/whatsapp` and your verification token supplied above `const webhookVerifyToken = 'YOUR_WEBHOOK_VERIFICATION_TOKEN';`
- Finally, hit the Verify button to verify and save the webhook.

### 2. Handling incoming messages

The implementation above creates an express server for you through which it listens to incoming messages. There may be plans to support other types of server in future (PRs are welcome! :)).

You webhook URL will be as follows: `http://localhost/webhook/whatsapp`. Feel free to use [ngrok](https://ngrok.com/download) or any other reverse proxy to make the server publicly available, e.g. `https://1234.ngrok.io/webhook/whatsapp`.

To verify your webhook, supply a token below and then click on Verify Callback URL in your Facebook Developer app settings. See more [instructions above](#1-verifying-your-callback-url):

```js
await bot.startExpressServer({
  webhookVerifyToken: 'my-verification-token',
});
```

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

### Notes

Library API inspired by [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api/blob/release/doc/api.md).

## Pull Requests

Any and all PRs are open.
