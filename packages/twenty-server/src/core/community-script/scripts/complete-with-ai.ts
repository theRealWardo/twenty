import { Script } from 'src/core/community-script/interface/script';

export default async function (content: string) {
  return fetch('https://openrouter.ai/api/v1/chat/completions', {
    headers: {
      Authorization: `Bearer ${this.environmentService.getOpenRouterApiKey()}`,
      'HTTP-Referer': `https://twenty.com`,
      'X-Title': `Twenty CRM`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mistralai/mixtral-8x7b-instruct',
      messages: [{ role: 'user', content: content }],
    }),
  });
}

export const config: Partial<Script> = {
  quickAction: {
    label: 'AI auto-fill',
    icon: 'enrich',
    objectNameSingular: 'company',
    name: 'complete-with-ai',
  },
};
