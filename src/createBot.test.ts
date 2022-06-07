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
    const result = await bot.sendImage(to, 'https://picsum.photos/200/300', {
      caption: 'Random jpg',
    });

    expectSendMessageResult(result);
  });

  test('sends document', async () => {
    const result = await bot.sendDocument(to, 'http://www.africau.edu/images/default/sample.pdf', {
      caption: 'Random pdf',
      filename: 'myfile.pdf',
    });

    expectSendMessageResult(result);
  });

  test('sends audio', async () => {
    const result = await bot.sendAudio(to, 'https://samplelib.com/lib/preview/mp3/sample-3s.mp3');

    expectSendMessageResult(result);
  });

  test('sends video', async () => {
    const result = await bot.sendVideo(to, 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', {
      caption: 'Random mp4',
    });

    expectSendMessageResult(result);
  });

  // TODO: not working
  // https://faq.whatsapp.com/general/how-to-create-stickers-for-whatsapp/?lang=en
  // transparent 512x512 gif
  test('sends sticker', async () => {
    const result = await bot.sendSticker(to, 'https://i.gifer.com/ZXHC.gif');

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
