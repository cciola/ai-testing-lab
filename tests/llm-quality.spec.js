// Quality/format — capacidade de gerar respostas com qualidade, respeitando um formato

const { test, expect } = require('@playwright/test');
const { askLLM } = require('../utils/llm-client');

test('LLM deve explicar um conceito de forma compreensível', async () => {
  const response = await askLLM(
    'Explique o que é teste de software em no máximo 3 frases.'
  );

  console.log('Resposta do modelo:', response);

  expect(response).toBeTruthy();
  expect(response.length).toBeGreaterThan(20);
  expect(response.split(/[.!?]+/).filter(Boolean).length).toBeLessThanOrEqual(3);
});