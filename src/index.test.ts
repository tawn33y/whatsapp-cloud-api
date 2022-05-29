import { createBot } from '.';

const expectSendMessageResult = (result: any): void => {
  expect(result && typeof result === 'object').toBe(true);
  expect(result).toHaveProperty('messaging_product');
  expect(result).toHaveProperty('contacts');
  expect(result).toHaveProperty('messages');

  expect(result.messaging_product).toBe('whatsapp');

  expect(Array.isArray(result.contacts)).toBe(true);
  expect(result.contacts.length > 0).toBe(true);
  result.contacts.forEach((contact: any) => {
    expect(contact && typeof contact === 'object').toBe(true);
    expect(contact).toHaveProperty('input');
    expect(contact).toHaveProperty('wa_id');
    expect(typeof contact.input).toBe('string');
    expect(typeof contact.wa_id).toBe('string');
  });

  expect(Array.isArray(result.messages)).toBe(true);
  expect(result.messages.length > 0).toBe(true);
  result.messages.forEach((message: any) => {
    expect(message && typeof message === 'object').toBe(true);
    expect(message).toHaveProperty('id');
    expect(typeof message.id).toBe('string');
  });
};

describe('send messages', () => {
  const {
    env: {
      FROM_PHONE_NUMBER_ID: fromPhoneNumberId = '',
      ACCESS_TOKEN: accessToken = '',
      VERSION: version = '',
      TO: to = '',
    },
  } = process;

  const bot = createBot(fromPhoneNumberId, accessToken, version);

  test('sends text', async () => {
    const result = await bot.sendText({
      to,
      body: 'Hello world',
      preview_url: true,
    });

    expectSendMessageResult(result);
  });

  test('sends image', async () => {
    const result = await bot.sendMedia({
      to,
      type: 'image',
      caption: 'Random image',
      link: 'https://static.onecms.io/wp-content/uploads/sites/13/2015/04/05/featured.jpg',
    });

    expectSendMessageResult(result);
  });

  test('sends location', async () => {
    const result = await bot.sendLocation({
      to,
      latitude: 40.7128,
      longitude: -74.0060,
      name: 'New York',
    });

    expectSendMessageResult(result);
  });

  test('sends contacts', async () => {
    const result = await bot.sendContacts({
      to,
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

    expectSendMessageResult(result);
  });

  test('sends interactive reply button', async () => {
    const result = await bot.sendInteractive({
      to,
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

    expectSendMessageResult(result);
  });

  test('sends interactive list', async () => {
    const result = await bot.sendInteractive({
      to,
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

    expectSendMessageResult(result);
  });

  test('sends template', async () => {
    const result = await bot.sendTemplate({
      to,
      name: 'hello_world',
      language: {
        code: 'en_us',
      },
    });

    expectSendMessageResult(result);
  });
});
