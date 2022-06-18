import PubSub from 'pubsub-js';

// https://medium.com/@huytrongnguyen1985/from-pub-sub-pattern-to-observer-pattern-f4ae1e425cc9
// https://javascript.plainenglish.io/how-i-created-an-event-driven-backend-with-rxjs-server-sent-events-and-expressjs-9f8be1ffc123

export const pubSub = PubSub;
// <(msg: string, from: string) => void, PubSubEvent>;

export type PubSubEvent = 'message';

export enum PubSubEvents {
  message,
}
