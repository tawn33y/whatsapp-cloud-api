import {
  Contact, ContactMessage, InteractiveBase,
  InteractiveListMessage, InteractiveMessage, InteractiveReplyButton,
  Location, LocationMessage, MediaBase,
  MediaMessage, MediaWithId, MediaWithLink,
  Template, TemplateMessage, Text,
  TextMessage,
} from './messages.types';

interface OptionsBase {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
}

const optionsBase: OptionsBase = {
  messaging_product: 'whatsapp',
  recipient_type: 'individual',
};

export interface TextMessageOptions extends Text {
  to: string;
}

export const getTextMessageOptions = (options: TextMessageOptions): TextMessage => {
  const { to, ...text } = options;

  return {
    ...optionsBase,
    to,
    type: 'text',
    text,
  };
};

export interface MediaMessageOptions extends MediaBase {
  to: string;
  type: 'image' | 'document' | 'audio' | 'video' | 'sticker';
}

export const getMediaMessageOptions = (
  options: MediaMessageOptions & (MediaWithId | MediaWithLink),
): MediaMessage => {
  const { to, type, ...media } = options;

  return {
    ...optionsBase,
    to,
    type,
    [type]: media,
  } as any;
};

export interface LocationMessageOptions extends Location {
  to: string;
}

export const getLocationMessageOptions = (options: LocationMessageOptions): LocationMessage => {
  const { to, ...location } = options;

  return {
    ...optionsBase,
    to,
    type: 'location',
    location,
  };
};

export interface ContactMessageOptions {
  to: string;
  contacts: Contact[];
}

export const getContactMessageOptions = (options: ContactMessageOptions): ContactMessage => {
  const { to, contacts } = options;

  return {
    ...optionsBase,
    to,
    type: 'contacts',
    contacts,
  };
};

export interface InteractiveMessageOptions extends InteractiveBase {
  to: string;
}

export const getInteractiveMessageOptions = (
  options: InteractiveMessageOptions & (InteractiveReplyButton | InteractiveListMessage),
): InteractiveMessage => {
  const { to, ...interactive } = options;

  return {
    ...optionsBase,
    to,
    type: 'interactive',
    interactive,
  };
};

export interface TemplateMessageOptions extends Template {
  to: string;
}

export const getTemplateMessageOptions = (options: TemplateMessageOptions): TemplateMessage => {
  const { to, ...template } = options;

  return {
    ...optionsBase,
    to,
    type: 'template',
    template,
  };
};
