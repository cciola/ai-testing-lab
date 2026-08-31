const { test, expect } = require('@playwright/test');
const { saveLLMResponse } = require('../../utils/llm-client');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

test('IA deve gerar casos de teste a partir de um requisito', async () => {

  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const prompt = `
    Gere casos de teste para o seguinte requisito:

    ${requirement}

    Inclua cenários positivos e negativos.
    Apresente os casos de teste de forma clara.
  `;

  const response = await askLLM(prompt, MODEL);

  //logLLMResponse(response);

  const responseLower = response.toLowerCase();

  // A resposta deve conter cenários positivos e negativos
  expect(responseLower).toContain('positivo');
  expect(responseLower).toContain('negativo');

  // Deve abordar os principais elementos do requisito
  expect(responseLower).toContain('e-mail');
  expect(responseLower).toContain('senha');
  expect(responseLower).toContain('login');

  saveLLMResponse(response, 'ai-test-generation');
});
