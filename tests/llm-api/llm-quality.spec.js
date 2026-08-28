// Quality/format - a IA deve gerar respostas com qualidade, respeitando um formato.

const { test, expect } = require('@playwright/test');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM deve explicar um conceito de forma compreensível', async () => {
  const response = await askLLM(
    'Explique o que é teste de software em no máximo 3 frases.',
    MODEL
  );

  logLLMResponse(response);

  expect(response).toBeTruthy();
  expect(response.length).toBeGreaterThan(20);
  expect(response.split(/[.!?]+/).filter(Boolean).length).toBeLessThanOrEqual(3);
});