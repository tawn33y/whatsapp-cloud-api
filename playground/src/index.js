require('dotenv').config({ path: '../.env' });

const { createBot } = require('whatsapp-cloud-api');

(async () => {
  try {
    const from = process.env['FROM_PHONE_NUMBER_ID'];
    const token = process.env['ACCESS_TOKEN'];
    const version = process.env['VERSION'];
    const to = process.env['TO'];
    const webhookVerifyToken = process.env['WEBHOOK_VERIFY_TOKEN'];

    if (!from || !token || !to || !webhookVerifyToken) {
      throw new Error('Missing env variables');
    }

    const bot = createBot(from, token, { version });

    await bot.sendText(to, 'Hello world');

    await bot.startExpressServer({
      webhookVerifyToken,
    });

    const subscriptionToken = bot.on('message', async (msg) => {
      console.log(msg);

      await bot.sendText(msg.from, 'Received your message!');
    });

    setTimeout(() => {
      bot.unsubscribe(subscriptionToken);
      console.log(`Unsubcribed`);
    }, 15e3);
  } catch (err) {
    console.log(err);
  }
})();
