import express, { Application } from 'express';
import { Server } from 'http';
import PubSub from 'pubsub-js';
import { PubSubEvent, PubSubEvents } from './utils/pubSub';

export interface ServerOptions {
  app?: Application;
  useMiddleware?: (app: Application) => void;
  port?: number;
  webhookPath?: string;
  webhookVerifyToken?: string;
}

export interface ExpressServer {
  server?: Server;
  app: Application;
}

export const startExpressServer = (
  options?: ServerOptions,
): Promise<ExpressServer> => new Promise((resolve) => {
  const app = options?.app || express();

  app.use(express.json());

  if (options?.useMiddleware) {
    options.useMiddleware(app);
  }

  const webhookPath = options?.webhookPath || '/webhook/whatsapp';

  if (options?.webhookVerifyToken) {
    app.get(webhookPath, (req, res) => {
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
        // eslint-disable-next-line
        console.log('✔️ Webhook verified');
        res.status(200).send(challenge);
        return;
      }

      res.sendStatus(403);
    });
  }

  app.post(webhookPath, async (req, res) => {
    if (!req.body.object || req.body.entry[0].changes[0].value.statuses) {
      res.sendStatus(404);
      return;
    }

    const {
      from,
      id,
      timestamp,
      type,
      ...rest
    } = req.body.entry[0].changes[0].value.messages[0];

    switch (type) {
      case 'text':
        PubSub.publish(PubSubEvents.text, { from, msg: rest.text?.body });
        break;
      case 'interactive':
        break;

      default:
        PubSub.publish(PubSubEvents[type as PubSubEvent], { from, ...rest[type] });
        break;
        // e.g.
        // PubSub.publish(PubSubEvents.image, { from, ...rest.image });
    }

    res.sendStatus(200);
  });

  if (options?.app) {
    resolve({ app });
    return;
  }

  const port = options?.port || 3000;
  const server = app.listen(port, () => {
    // eslint-disable-next-line
    console.log(`🚀 Server running on port ${port}...`);
    resolve({ server, app });
  });
});
