import express, { Application } from 'express';
import { Server } from 'http';
import { Contact, InteractiveHeader, TemplateComponent } from './messages.types';
import { SendMessageResult } from './sendRequestHelper';

export type ICreateBot = (
  fromPhoneNumberId: string,
  accessToken: string,
  options?: {
    version?: string;
  },
) => {
  startExpressServer: (options?: {
    app?: express.Application;
    useMiddleware?: (app: express.Application) => void;
    port?: number;
    webhookPath?: string;
    webhookVerifyToken?: string;
  }) => Promise<{ server?: Server; app: Application; }>;
  on: (event: 'message', cb: (data: { msg: string, from: string }) => void) => void;

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
      [id: string]: string;
    },
    options?: {
      footerText: string;
      header?: InteractiveHeader;
    },
  ) => Promise<SendMessageResult>;
  sendList: (
    to: string,
    buttonName: string,
    bodyText: string,
    sections: {
      [sectionTitle: string]: {
        id: string;
        title: string;
        description?: string;
      }[];
    },
    options: {
      footerText: string,
      header?: InteractiveHeader;
    },
  ) => Promise<SendMessageResult>;
};
