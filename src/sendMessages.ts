import axios, { AxiosError } from 'axios';
import {
  ContactMessageOptions, getContactMessageOptions, getInteractiveMessageOptions,
  getLocationMessageOptions, getMediaMessageOptions, getTemplateMessageOptions,
  getTextMessageOptions, InteractiveMessageOptions, LocationMessageOptions,
  MediaMessageOptions, TemplateMessageOptions, TextMessageOptions,
} from './messages';
import {
  ContactMessage, InteractiveListMessage, InteractiveMessage,
  InteractiveReplyButton, LocationMessage, MediaMessage,
  MediaWithId, MediaWithLink, TemplateMessage,
  TextMessage,
} from './messages.types';

export interface SendMessageResult {
  messaging_product: 'whatsapp';
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
  }[];
}

const sendRequestHelper = (
  fromPhoneNumberId: string,
  accessToken: string,
  version: string,
) => async <T>(data: T): Promise<SendMessageResult> => {
  try {
    const { data: result } = await axios({
      method: 'post',
      url: `https://graph.facebook.com/${version}/${fromPhoneNumberId}/messages`,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    return result as SendMessageResult;
  } catch (err) {
    throw (err as AxiosError)?.response?.data ?? (err as Error).message;
  }
};

export const sendMessages = (fromPhoneNumberId: string, accessToken: string, version: string = 'v14.0') => {
  const sendRequest = sendRequestHelper(fromPhoneNumberId, accessToken, version);

  return {
    sendText: async (
      options: TextMessageOptions,
    ) => sendRequest<TextMessage>(getTextMessageOptions(options)),
    sendMedia: async (
      options: MediaMessageOptions & (MediaWithId | MediaWithLink),
    ) => sendRequest<MediaMessage>(getMediaMessageOptions(options)),
    sendLocation: async (
      options: LocationMessageOptions,
    ) => sendRequest<LocationMessage>(getLocationMessageOptions(options)),
    sendContacts: async (
      options: ContactMessageOptions,
    ) => sendRequest<ContactMessage>(getContactMessageOptions(options)),
    sendInteractive: async (
      options: InteractiveMessageOptions & (InteractiveReplyButton | InteractiveListMessage),
    ) => sendRequest<InteractiveMessage>(getInteractiveMessageOptions(options)),
    sendTemplate: async (
      options: TemplateMessageOptions,
    ) => sendRequest<TemplateMessage>(getTemplateMessageOptions(options)),
  };
};
