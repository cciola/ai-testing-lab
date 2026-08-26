// Basic functionality — resposta correta a uma pergunta simples

const { test, expect } = require('@playwright/test');
const { askLLM } = require('../../utils/llm-client');

test('LLM deve responder corretamente a uma pergunta simples', async () => {
  const response = await askLLM('Quanto é 2 + 2?');

  console.log('Resposta do modelo:', response);

  expect(response).toContain('4');
});