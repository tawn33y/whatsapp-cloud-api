import express, { Application } from 'express';
import { Server } from 'http';
import { Contact, InteractiveHeader, TemplateComponent } from './messages.types';
import { SendMessageResult } from './sendRequestHelper';
import { FreeFormObject } from './utils/misc';
import { PubSubEvent } from './utils/pubSub';

export interface Message {
  from: string;
  name: string | undefined;
  id: string;
  timestamp: string;
  type: PubSubEvent;
  data: FreeFormObject; // TODO: properly define interfaces for each type
}

export interface Bot {
  startExpressServer: (options?: {
    app?: express.Application;
    useMiddleware?: (app: express.Application) => void;
    port?: number;
    webhookPath?: string;
    webhookVerifyToken?: string;
  }) => Promise<{ server?: Server; app: Application; }>;
  on: (event: PubSubEvent, cb: (message: Message) => void) => string;
  unsubscribe: (token: string) => string | boolean;

  sendText: (to: string, text: string, options?: {
    preview_url?: boolean;
  }) => Promise<SendMessageResult>;
  sendMessage: (to: string, text: string, options?: {
    preview_url?: boolean;
  }) => Promise<SendMessageResult>;
  sendImage: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
  }) => Promise<SendMessageResult>;
  sendDocument: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendAudio: (to: string, urlOrObjectId: string) => Promise<SendMessageResult>;
  sendVideo: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
  }) => Promise<SendMessageResult>;
  sendSticker: (to: string, urlOrObjectId: string) => Promise<SendMessageResult>;
  sendLocation: (to: string, latitude: number, longitude: number, options?: {
    name?: string;
    address?: string;
  }) => Promise<SendMessageResult>;
  sendTemplate: (
    to: string,
    name: string,
    languageCode: string,
    components?: TemplateComponent[],
  ) => Promise<SendMessageResult>;
  sendContacts: (to: string, contacts: Contact[]) => Promise<SendMessageResult>;
  sendReplyButtons: (
    to: string,
    bodyText: string,
    buttons: {
      [id: string]: string | number;
    },
    options?: {
      footerText?: string;
      header?: InteractiveHeader;
    },
  ) => Promise<SendMessageResult>;
  sendList: (
    to: string,
    buttonName: string,
    bodyText: string,
    sections: {
      [sectionTitle: string]: {
        id: string | number;
        title: string | number;
        description?: string;
      }[];
    },
    options?: {
      footerText?: string,
      header?: InteractiveHeader;
    },
  ) => Promise<SendMessageResult>;
}

export type ICreateBot = (
  fromPhoneNumberId: string,
  accessToken: string,
  options?: {
    version?: string;
  },
) => Bot;
