import { OpenAI } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';

import { customMiddleware } from './custom-middleware';

const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openaiClient.chat(apiIdentifier),
    middleware: customMiddleware,
  });
};
