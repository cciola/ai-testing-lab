// Instruction following — capacidade de seguir uma instrução dada no prompt

const { test, expect } = require('@playwright/test');
const { askLLM } = require('../utils/llm-client');

test('LLM deve seguir uma instrução simples', async () => {
  const response = await askLLM(
    'Responda apenas com a palavra APROVADO.'
  );

  console.log('Resposta do modelo:', response);

  expect(response.trim()).toBe('APROVADO');
});