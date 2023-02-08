import axios, { AxiosError } from 'axios';

// https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages
interface OfficialSendMessageResult {
  messaging_product: 'whatsapp';
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
  }[];
}

export interface SendMessageResult {
  messageId: string;
  phoneNumber: string;
  whatsappId: string;
}

export const sendRequestHelper = (
  fromPhoneNumberId: string,
  accessToken: string,
  version: string = 'v14.0',
) => async <T>(data: T): Promise<SendMessageResult> => {
  try {
    const { data: rawResult } = await axios({
      method: 'post',
      url: `https://graph.facebook.com/${version}/${fromPhoneNumberId}/messages`,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
    const result = rawResult as OfficialSendMessageResult;

    return {
      messageId: result.messages?.[0]?.id,
      phoneNumber: result.contacts?.[0]?.input,
      whatsappId: result.contacts?.[0]?.wa_id,
    };
  } catch (err: unknown) {
    if ((err as any).response) {
      throw (err as AxiosError)?.response?.data;
    // } else if ((err as any).request) {
    //   throw (err as AxiosError)?.request;
    } else if (err instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw (err as Error).message;
    } else {
      throw err;
    }
  }
};
