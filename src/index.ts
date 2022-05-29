import 'dotenv/config';
import { sendMessages } from './sendMessages';

export const createBot = (fromPhoneNumberId: string, accessToken: string, version: string = 'v14.0') => ({
  ...sendMessages(fromPhoneNumberId, accessToken, version),
});

export * from './index.types';
