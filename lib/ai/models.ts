
export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gpt-3.5-turbo',
    label: 'GPT-3.5 Turbo',
    apiIdentifier: 'gpt-3.5-turbo',
    description: 'Fast and efficient for most tasks',
  },
  {
    id: 'gpt-4',
    label: 'GPT-4',
    apiIdentifier: 'gpt-4',
    description: 'Most capable model for complex tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME = 'gpt-3.5-turbo';
