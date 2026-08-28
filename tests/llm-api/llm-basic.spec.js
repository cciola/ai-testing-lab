// Basic functionality - a IA deve retornar uma resposta correta para uma pergunta simples.

const { test, expect } = require('@playwright/test');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const { saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM deve responder corretamente a uma pergunta simples', async () => {
  const response = await askLLM('Quanto é 2 + 2?', MODEL);

  logLLMResponse(response);

  expect(response).toContain('4');

  saveLLMResponse(response, 'llm-basic');
});