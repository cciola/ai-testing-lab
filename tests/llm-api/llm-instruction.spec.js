const { test, expect } = require('@playwright/test');
const { askLLM } = require('../../utils/llm-client');
const { saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM deve seguir uma instrução simples', async () => {
  const response = await askLLM('Responda apenas com a palavra APROVADO.', MODEL);

  expect(response.trim()).toBe('APROVADO');

  await saveLLMResponse(
    response,
    'llm-instruction',
    'Responda apenas com a palavra APROVADO.'
  );
});
