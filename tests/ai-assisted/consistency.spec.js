// Consistency: a IA deve manter a mesma resposta essencial, quando fazemos a mesma pergunta duas vezes

const { test, expect } = require('@playwright/test');
const { saveLLMResponse } = require('../../utils/llm-client');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

test('IA deve apresentar respostas consistentes para o mesmo requisito', async () => {

  const prompt = `
    Analise o seguinte requisito:

    "Um usuário deve conseguir fazer login informando
    e-mail e senha válidos."

    Liste os principais cenários de teste que podem ser
    derivados exclusivamente desse requisito.
    Não invente regras que não estejam especificadas.
  `;

  const response1 = await askLLM(prompt, MODEL);
  const response2 = await askLLM(prompt, MODEL);

  logLLMResponse(response1);
  logLLMResponse(response2);

  const response1Lower = response1.toLowerCase();
  const response2Lower = response2.toLowerCase();

  // As duas respostas devem abordar os elementos principais
  expect(response1Lower).toContain('login');
  expect(response2Lower).toContain('login');

  expect(response1Lower).toContain('e-mail');
  expect(response2Lower).toContain('e-mail');

  expect(response1Lower).toContain('senha');
  expect(response2Lower).toContain('senha');

  // As duas respostas devem reconhecer a restrição do requisito
  expect(response1Lower).toContain('não');
  expect(response2Lower).toContain('não');

  saveLLMResponse(response1, 'consistency');
  saveLLMResponse(response2, 'consistency');
});

/*
Neste teste não estamos exigindo que as duas respostas sejam idênticas; queremos verificar consistência sem exigir igualdade textual.
*/