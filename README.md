# whatsapp-cloud-api

[![run tests, lint, build](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/tests.yml)
[![npm publish](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/tawn33y/whatsapp-cloud-api/actions/workflows/npm-publish.yml)
![npm](https://img.shields.io/npm/v/whatsapp-cloud-api)
![npm bundle size](https://img.shields.io/bundlephobia/min/whatsapp-cloud-api)
![npm](https://img.shields.io/npm/dw/whatsapp-cloud-api)

`whatsapp-cloud-api` is a Node.js library for creating bots and sending/receiving messages using the [Whatsapp Cloud API](https://developers.facebook.com/docs/whatsapp/cloud-api/).

Contains built-in Typescript declarations.

## Install

```bash
npm i whatsapp-cloud-api
```

## Usage

> To get a phone number & access token for testing, ensure you follow the steps listed on ['Getting Started With the WhatsApp Business Cloud API'](https://developers.facebook.com/docs/whatsapp/cloud-api/get-started).

```js
import { createBot } from 'whatsapp-cloud-api';
const bot = createBot(FROM_PHONE_NUMBER_ID, ACCESS_TOKEN);

// send text message
const result = await bot.sendText({
  to: YOUR_PHONE_NUMBER,
  body: 'Hello world',
  preview_url: true,
});

// send image
const result = await bot.sendMedia({
  to: YOUR_PHONE_NUMBER,
  type: 'image',
  caption: 'Random image',
  link: 'https://static.onecms.io/wp-content/uploads/sites/13/2015/04/05/featured.jpg',
});

// send location
const result = await bot.sendLocation({
  to: YOUR_PHONE_NUMBER,
  latitude: 40.7128,
  longitude: -74.0060,
  name: 'New York',
});

// send contact
const result = await bot.sendContacts({
  to: YOUR_PHONE_NUMBER,
  contacts: [{
    name: {
      formatted_name: 'John Doe',
      first_name: 'John',
    },
    phones: [{
      type: 'HOME',
      phone: '0712345678',
    }],
    emails: [{
      type: 'HOME',
      email: 'random@random.com',
    }],
  }],
});

// send interactive reply button
const result = await bot.sendInteractive({
  to: YOUR_PHONE_NUMBER,
  body: {
    text: 'Some random text',
  },
  footer: {
    text: 'Some random footer text',
  },
  header: {
    type: 'text',
    text: 'Some random header text',
  },
  type: 'button',
  action: {
    buttons: [
      {
        type: 'reply',
        reply: {
          title: 'Button 1',
          id: 'random_id_1',
        },
      },
      {
        type: 'reply',
        reply: {
          title: 'Button 2',
          id: 'random_id_2',
        },
      },
    ],
  },
});

// send interactive list
const result = await bot.sendInteractive({
  to: YOUR_PHONE_NUMBER,
  body: {
    text: 'Some random text',
  },
  footer: {
    text: 'Some random footer text',
  },
  header: {
    type: 'text',
    text: 'Some random header text',
  },
  type: 'list',
  action: {
    button: 'Click me',
    sections: [
      {
        title: 'Section 1',
        rows: [
          {
            id: 'random_id_1',
            title: 'Item 1',
            description: 'Random description',
          },
          {
            id: 'random_id_2',
            title: 'Item 2',
          },
        ],
      },
      {
        title: 'Section 2',
        rows: [
          {
            id: 'random_id_3',
            title: 'Item 3',
          },
          {
            id: 'random_id_4',
            title: 'Item 4',
            description: 'Random description',
          },
        ],
      },
    ],
  },
});

// send template
const result = await bot.sendTemplate({
  to: YOUR_PHONE_NUMBER,
  name: 'hello_world',
  language: {
    code: 'en_us',
  },
});
```

## Development

```bash
# install npm modules
npm i

# eslint
npm run lint

# typescript check
npm run ts-check

# test
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
