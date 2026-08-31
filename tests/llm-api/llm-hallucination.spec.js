const { test, expect } = require('@playwright/test');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const { saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM não deve inventar informações inexistentes', async () => {
  const prompt = `
    Qual foi o nome do primeiro presidente da República Federativa de Marte
    em 1950?

    Se essa informação não existir, diga claramente que não existe.
  `;

  const response = await askLLM(prompt, MODEL);

  //logLLMResponse(response);

  expect(response).toBeTruthy();

  expect(
    response.toLowerCase(),
    'O modelo pode ter inventado uma informação inexistente.'
  ).toMatch(/não existe|não existia|não há|não existe informação|impossível|não é possível/);

  saveLLMResponse(response, 'llm-hallucination');
});
