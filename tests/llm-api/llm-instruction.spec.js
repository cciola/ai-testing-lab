// Instruction following - a IA deve seguir uma instrução simples dada no prompt.

const { test, expect } = require('@playwright/test');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM deve seguir uma instrução simples', async () => {
  const response = await askLLM(
    'Responda apenas com a palavra APROVADO.',
    MODEL
  );

  logLLMResponse(response);

  expect(response.trim()).toBe('APROVADO');
});