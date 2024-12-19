
import { openai } from '@ai-sdk/openai';
import { experimental_wrapLanguageModel as wrapLanguageModel } from 'ai';
import { customMiddleware } from './custom-middleware';

export const customModel = (apiIdentifier: string) => {
  return wrapLanguageModel({
    model: openai(process.env.OPENAI_API_KEY!).chat(apiIdentifier),
    middleware: customMiddleware,
  });
};
