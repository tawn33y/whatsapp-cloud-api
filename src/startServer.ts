import express from 'express';
import { log } from './utils/log';
import { pubSub, PubSubEvents } from './utils/pubSub';

interface ServerOptions {
  expressApp?: express.Application;
  useMiddleware?: (app: express.Application) => void;
  port?: number;
  webhookVerifyToken?: string;
}

export const startServer = (options?: ServerOptions) => {
  const app = options?.expressApp || express();

  app.use(express.json());

  if (options?.useMiddleware) {
    options.useMiddleware(app);
  }

  if (options?.webhookVerifyToken) {
    app.get('/webhook/whatsapp', (req, res) => {
      if (!req.query) {
        res.sendStatus(403);
        return;
      }

      const mode = req.query['hub.mode'];
      const verifyToken = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (!mode || !verifyToken || !challenge) {
        res.sendStatus(403);
        return;
      }

      if (mode === 'subscribe' && verifyToken === options.webhookVerifyToken) {
        log.info('✔️ Webhook verified');
        res.status(200).send(challenge);
        return;
      }

      res.sendStatus(403);
    });
  }

  app.post('/webhook/whatsapp', async (req, res) => {
    if (!req.body.object || req.body.entry[0].changes[0].value.statuses) {
      res.sendStatus(404);
      return;
    }

    const msg = req.body.entry[0].changes[0].value.messages[0].text.body;
    const { from } = req.body.entry[0].changes[0].value.messages[0];

    pubSub.publish(PubSubEvents.message as any, { msg, from });
  });

  const port = options?.port || 3000;
  app.listen(port, () => log.info(`🚀 Server running on port ${port}...`));
};
