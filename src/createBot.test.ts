import request from 'supertest';
import { Server } from 'http';
import { Application } from 'express';
import { createBot } from '.';
import { FreeFormObject } from './utils/misc';
import { PubSubEvents } from './utils/pubSub';

const expectSendMessageResult = (result: any): void => {
  expect(result && typeof result === 'object').toBe(true);
  expect(result).toHaveProperty('messageId');
  expect(result).toHaveProperty('phoneNumber');
  expect(result).toHaveProperty('whatsappId');

  expect(typeof result.messageId).toBe('string');
  expect(typeof result.phoneNumber).toBe('string');
  expect(typeof result.whatsappId).toBe('string');
};

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * https://stackoverflow.com/a/1527820
 */
const getRandomInt = (_min: number, _max: number): number => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const fromPhoneNumberId = process.env.FROM_PHONE_NUMBER_ID;
const accessToken = process.env.ACCESS_TOKEN;
const version = process.env.VERSION;
const to = process.env.TO;
const webhookVerifyToken = process.env.WEBHOOK_VERIFY_TOKEN;
const webhookPath = process.env.WEBHOOK_PATH;

if (!fromPhoneNumberId || !accessToken || !to || !webhookVerifyToken || !webhookPath) {
  throw new Error('Missing env variables');
}

describe('send functions', () => {
  const bot = createBot(fromPhoneNumberId, accessToken, { version });

  test('sends text', async () => {
    const result = await bot.sendText(to, 'Hello world', {
      preview_url: true,
    });

    expectSendMessageResult(result);
  });

  test('sends message', async () => {
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

describe('server functions', () => {
  const bot = createBot(fromPhoneNumberId, accessToken, { version });
  let server: Server | undefined;
  let app: Application | undefined;

  beforeAll(async () => {
    ({ server, app } = await bot.startExpressServer({ webhookVerifyToken }));
  });

  afterAll((): Promise<void> => new Promise((resolve) => {
    if (!server) {
      resolve();
      return;
    }

    server.close(() => {
      // eslint-disable-next-line
      console.log('✔️ Server closed');
      resolve();
    });
  }));

  test('invalid webhook token', async () => {
    const sendRequest = (path: string) => request(app)
      .get(path)
      .send()
      .expect(200);

    const paths = [
      webhookPath,
      `${webhookPath}?hub.mode=subscribe&hub.challenge=random`,
      `${webhookPath}?hub.mode=subscribe&hub.verify_token=abcd`,
      `${webhookPath}?hub.mode=sub&hub.verify_token=abcd&hub.challenge=random`,
      `${webhookPath}?hub.mode=subscribe&hub.verify_token=abcd&hub.challenge=random`,
    ];

    for (let i = 0; i < paths.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await expect(sendRequest(paths[i])).rejects.toThrow();
    }
  });

  test('verify webhook token', async () => {
    const challenge = 'random';
    const { text } = await request(app)
      .get(`${webhookPath}?hub.mode=subscribe&hub.verify_token=${encodeURIComponent(webhookVerifyToken)}&hub.challenge=${challenge}`)
      .send()
      .expect(200);

    expect(text).toBe(challenge);
  });

  test('send invalid body', async () => {
    const sendRequest = (data: FreeFormObject) => request(app)
      .post(webhookPath)
      .send(data)
      .expect(200);

    const data = [
      {},
      { object: 'abcd' },
      { entry: [] },
      { object: 'abcd', entry: [{ changes: [] }] },
      { object: 'abcd', entry: [{ changes: [{ value: { statuses: [] } }] }] },
    ];

    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await expect(sendRequest(data[i])).rejects.toThrow();
    }
  });

  // eslint-disable-next-line no-async-promise-executor
  test('listen for new messages', (): Promise<void> => new Promise(async (resolve, reject) => {
    const payloads = [
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'text',
        text: { body: 'Hello' },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'image',
        image: {
          mime_type: 'image/jpeg',
          sha256: 'abcd=',
          id: '1234',
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'document',
        document: {
          caption: 'Random pdf',
          filename: 'myfile.pdf',
          mime_type: 'application/pdf',
          sha256: 'abcd=',
          id: '1234',
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'audio',
        audio: {
          mime_type: 'audio/mpeg',
          sha256: 'abcd=',
          id: '1234',
          voice: false,
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'video',
        video: {
          mime_type: 'video/mp4',
          sha256: 'abcd=',
          id: '1234',
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'sticker',
        sticker: {
          mime_type: 'image/webp',
          sha256: 'abcd=',
          id: '1234',
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'location',
        location: { latitude: 40.7128, longitude: -74.006, name: 'New York' },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'contacts',
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
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'interactive',
        interactive: {
          type: 'list_reply',
          list_reply: {
            id: 'random_id_1',
            title: 'Item 1',
            description: 'Random description',
          },
        },
        context: {
          from: '12345678',
          id: 'wamid.abcd',
        },
      },
      {
        from: '12345678',
        id: 'wamid.abcd',
        timestamp: '1640995200',
        type: 'interactive',
        interactive: {
          type: 'button_reply',
          button_reply: {
            id: 'random_id_1',
            title: 'Button 1',
          },
        },
        context: {
          from: '12345678',
          id: 'wamid.abcd',
        },
      },
    ];

    let i = 0;

    // TODO: listen for each event, e.g. bot.on('text', ...)

    bot.on('message', async (message) => {
      expect(message && typeof message === 'object').toBe(true);
      expect(message).toHaveProperty('from');
      expect(message).toHaveProperty('id');
      expect(message).toHaveProperty('timestamp');
      expect(message).toHaveProperty('type');
      expect(message).toHaveProperty('data');

      expect(typeof message.from).toBe('string');
      expect(typeof message.id).toBe('string');
      expect(typeof message.timestamp).toBe('string');
      expect(typeof message.type).toBe('string');
      expect(Object.values(PubSubEvents)).toContain(message.type);

      if (message.name) {
        expect(typeof message.name).toBe('string');
      } else {
        expect(message.name === undefined).toBe(true);
      }

      expect(typeof message.data === 'object').toBe(true);
      const { data } = message;

      switch (message.type) {
        case 'text':
          expect(data).toHaveProperty('text');
          expect(typeof data.text).toBe('string');
          break;

        case 'image':
        case 'document':
        case 'audio':
        case 'video':
        case 'sticker':
          expect(data).toHaveProperty('mime_type');
          expect(data).toHaveProperty('sha256');
          expect(data).toHaveProperty('id');

          expect(typeof data.mime_type).toBe('string');
          expect(typeof data.sha256).toBe('string');
          expect(typeof data.id).toBe('string');
          if (data.caption) {
            expect(typeof data.caption).toBe('string');
          }
          if (data.filename) {
            expect(typeof data.filename).toBe('string');
          }
          if (data.voice) {
            expect(typeof data.voice).toBe('boolean');
          }
          break;

        case 'location':
          expect(data).toHaveProperty('latitude');
          expect(data).toHaveProperty('longitude');

          expect(typeof data.latitude).toBe('number');
          expect(typeof data.longitude).toBe('number');
          if (data.name) {
            expect(typeof data.name).toBe('string');
          }
          if (data.address) {
            expect(typeof data.address).toBe('string');
          }
          break;

        case 'contacts':
          expect(Array.isArray(data)).toBe(true);
          data.forEach((item: FreeFormObject) => expect(typeof item === 'object').toBe(true));
          break;

        case 'list_reply':
        case 'button_reply':
          expect(data).toHaveProperty('id');
          expect(data).toHaveProperty('title');
          expect(data).toHaveProperty('context');

          expect(typeof data.id).toBe('string');
          expect(typeof data.title).toBe('string');
          if (data.description) {
            expect(typeof data.description).toBe('string');
          }

          expect(typeof data.context === 'object').toBe(true);
          expect(data.context).toHaveProperty('from');
          expect(data.context).toHaveProperty('id');

          expect(typeof data.context.from).toBe('string');
          expect(typeof data.context.id).toBe('string');
          break;

        default:
          break;
      }

      i += 1;

      if (i === payloads.length) {
        resolve();
      }
    });

    try {
      Object.values(payloads).map(async (payload) => {
        await request(app)
          .post(webhookPath)
          .send({
            object: 'abcd',
            entry: [{
              changes: [{
                value: {
                  messages: [payload],
                  contacts: [{
                    profile: {
                      name: getRandomInt(0, 1) ? 'John Doe' : undefined,
                    },
                  }],
                  metadata: {
                    phone_number_id: fromPhoneNumberId,
                  },
                },
              }],
            }],
          })
          .expect(200);
      });
    } catch (err) {
      reject(err);
    }
  }));
});
