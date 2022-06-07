import {
  Contact, InteractiveBase, InteractiveListMessage,
  InteractiveReplyButton, Template,
} from './messages.types';
import { SendMessageResult } from './sendRequestHelper';

export interface ICreateBot {
  sendMessage: (to: string, text: string, options?: {
    preview_url?: boolean;
  }) => Promise<SendMessageResult>;
  sendImage: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendDocument: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendAudio: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendVideo: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendSticker: (to: string, urlOrObjectId: string, options?: {
    caption?: string;
    filename?: string;
  }) => Promise<SendMessageResult>;
  sendLocation: (to: string, latitude: number, longitude: number, options?: {
    name?: string;
    address?: string;
  }) => Promise<SendMessageResult>;

  // TODO: simplify below definitions even further
  sendTemplate: (to: string, template: Template) => Promise<SendMessageResult>;
  sendContacts: (to: string, contacts: Contact[]) => Promise<SendMessageResult>;
  sendInteractive: (
    to: string,
    interactive: InteractiveBase & (InteractiveReplyButton | InteractiveListMessage),
  ) => Promise<SendMessageResult>;
}
