import { createBot } from '.';

const expectSendMessageResult = (result: any): void => {
  expect(result && typeof result === 'object').toBe(true);
  expect(result).toHaveProperty('messageId');
  expect(result).toHaveProperty('phoneNumber');
  expect(result).toHaveProperty('whatsappId');

  expect(typeof result.messageId).toBe('string');
  expect(typeof result.phoneNumber).toBe('string');
  expect(typeof result.whatsappId).toBe('string');
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
    const result = await bot.sendMessage(to, 'Hello world', {
      preview_url: true,
    });

    expectSendMessageResult(result);
  });

  test('sends image', async () => {
    const result = await bot.sendImage(to, 'https://static.onecms.io/wp-content/uploads/sites/13/2015/04/05/featured.jpg', {
      caption: 'Random image',
    });

    expectSendMessageResult(result);
  });

  test('sends location', async () => {
    const result = await bot.sendLocation(to, 40.7128, -74.0060, {
      name: 'New York',
    });

    expectSendMessageResult(result);
  });

  test('sends template', async () => {
    const result = await bot.sendTemplate(to, 'hello_world', 'en_us');

    expectSendMessageResult(result);
  });

  test('sends contacts', async () => {
    const result = await bot.sendContacts(to, [{
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
    }]);

    expectSendMessageResult(result);
  });

  test('sends reply button', async () => {
    const result = await bot.sendReplyButtons(
      to,
      'Random body text',
      {
        random_id_1: 'Button 1',
        random_id_2: 'Button 2',
      },
      {
        footerText: 'Random footer text',
        header: {
          type: 'text',
          text: 'Random header text',
        },
      },
    );

    expectSendMessageResult(result);
  });

  test('sends list', async () => {
    const result = await bot.sendList(
      to,
      'Click me',
      'Random body text',
      {
        'Section 1': [
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
        'Section 2': [
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
      {
        footerText: 'Random footer text',
        header: {
          type: 'text',
          text: 'Random header text',
        },
      },
    );

    expectSendMessageResult(result);
  });
});
