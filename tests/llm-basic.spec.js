const { test, expect } = require('@playwright/test');
const OpenAI = require('openai');

require('dotenv').config();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

test('LLM deve responder corretamente a uma pergunta simples', async () => {
  const prompt = 'Qual é a capital do Brasil?';

  const response = await client.responses.create({
    model: 'gpt-5.6',
    input: prompt
  });

  const answer = response.output_text;

  console.log('Resposta do LLM:', answer);

  expect(answer).toContain('Brasília');
});