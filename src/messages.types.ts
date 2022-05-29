import type { RequireAtLeastOne } from 'type-fest';

// https://developers.facebook.com/docs/whatsapp/cloud-api/reference/messages

interface Message {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
}

interface ContactName {
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  suffix?: string;
  prefix?: string;
}

interface Contact {
  addresses?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
    country_code?: string;
    type?: 'HOME' | 'WORK';
  }[];
  birthday: string; // YYYY-MM-DD
  emails?: {
    email?: string;
    type: 'HOME' | 'WORK';
  }[];
  name: {
    formatted_name: string;
  } & RequireAtLeastOne<ContactName, 'first_name' | 'last_name' | 'middle_name' | 'prefix' | 'suffix'>;
  org?: {
    company?: string;
    department?: string;
    title?: string;
  };
  phones?: {
    phone?: string;
    type?: 'CELL' | 'MAIN' | 'IPHONE' | 'HOME' | 'WORK';
    wa_id?: string;
  }[];
  urls: {
    url?: string;
    type?: 'HOME' | 'WORK';
  }[];
}

interface HeaderText {
  type: 'text';
  text: string;
}

interface HeaderVideo {
  type: 'video';
  video: Media;
}

interface HeaderImage {
  type: 'image';
  image: Media;
}

interface HeaderDocument {
  type: 'document';
  document: Media;
}

interface InteractiveBase {
  body: {
    text: string;
  };
  footer: {
    text: string;
  };
  header: HeaderText | HeaderVideo | HeaderImage | HeaderDocument;
}

interface InteractiveReplyButton {
  type: 'button';
  action: {
    buttons: {
      type: 'reply';
      title: string;
      id: string;
    };
  };
}

interface InteractiveListMessage {
  type: 'list';
  action: {
    button: string;
    sections: {
      title: string;
      rows: {
        id: string;
        title: string;
        description?: string;
      }[];
    }[];
  };
}

type Interactive = InteractiveBase & (InteractiveReplyButton | InteractiveListMessage);

interface Location {
  longitude: number;
  latitude: number;
  name?: string;
  address?: string;
}

interface MediaWithId {
  id: string;
}

interface MediaWithLink {
  link: string; // http/https
}

interface MediaBase {
  caption?: string;
  filename?: string;
}

type Media = MediaBase & (MediaWithId | MediaWithLink);

interface ParameterText {
  type: 'text';
  text: string;
}

interface ParameterCurrency {
  type: 'currency';
  fallback_value: string;
  code: string;
  amount_1000: number;
}

interface ParameterDateTime {
  type: 'date_time';
  fallback_value: string;
}

interface ParameterImage {
  type: 'image';
  image: Media;
}

interface ParameterDocument {
  type: 'document';
  document: Media;
}

interface ParameterVideo {
  type: 'video';
  video: Media;
}

interface TemplateComponentTypeHeader {
  type: 'header';
}

interface TemplateComponentTypeBody {
  type: 'body';
  parameters: (
    ParameterText | ParameterCurrency | ParameterDateTime |
    ParameterImage | ParameterDocument | ParameterVideo
  )[];
}

interface TemplateComponentTypeButtonQuickReply {
  sub_type: 'quick_reply';
  parameters: {
    type: 'payload' | 'text';
    payload: any;
    text: string;
  }[];
}

interface TemplateComponentTypeButtonUrl {
  sub_type: 'url';
  parameters: {
    type?: 'payload' | 'text';
    payload?: any;
    text: string;
  }[];
}

interface TemplateComponentTypeButtonBase {
  type: 'button';
  index: 0 | 1 | 2;
}

type TemplateComponentTypeButton = TemplateComponentTypeButtonBase & (
  TemplateComponentTypeButtonQuickReply | TemplateComponentTypeButtonUrl
);

interface Template {
  name: string;
  language: {
    policy?: 'deterministic';
    code: string; // https://developers.facebook.com/docs/whatsapp/api/messages/message-templates#supported-languages
  };
  components?: (
    TemplateComponentTypeHeader | TemplateComponentTypeBody | TemplateComponentTypeButton
  )[];
}

interface Text {
  body: string;
  preview_url?: boolean;
}

export interface AudioMessage extends Message {
  type: 'audio';
  audio: Media;
}

export interface ContactsMessage extends Message {
  type: 'contacts';
  contacts: Contact[];
}

export interface DocumentMessage extends Message {
  type: 'document';
  document: Media;
}

export interface ImageMessage extends Message {
  type: 'image';
  image: Media;
}

export interface InteractiveMessage extends Message {
  type: 'interactive';
  interactive: Interactive;
}

export interface LocationMessage extends Message {
  type: 'location';
  location: Location;
}

export interface StickerMessage extends Message {
  type: 'sticker';
  sticker: Media;
}

export interface TemplateMessage extends Message {
  type: 'template';
  template: Template;
}

export interface TextMessage extends Message {
  type: 'text';
  text: Text;
}

export interface VideoMessage extends Message {
  type: 'video';
  video: Media;
}
