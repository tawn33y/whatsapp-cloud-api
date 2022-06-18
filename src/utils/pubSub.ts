import PubSub from 'pubsub-js';

export const pubSub = PubSub;

export type PubSubEvent = 'message';

export enum PubSubEvents {
  message,
}
