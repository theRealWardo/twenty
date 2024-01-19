export default async function (content: string) {
  return this.httpService.axiosRef.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
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
    },
  );
}
