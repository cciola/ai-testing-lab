const { test, expect } = require('@playwright/test');
const { askLLM, saveLLMResponse } = require('../../utils/llm-client');
const { assertCoreRequirement, findUnsupportedClaims } = require('../../utils/evaluators');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

// O requisito é a fonte de verdade. O evaluator procura regras que a IA
// tratou como fato sem que elas tenham sido informadas no requisito.

test('IA deve separar regras explícitas de suposições', async () => {
  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const prompt = `
    Analise o requisito abaixo.

    1. Liste somente as regras explicitamente definidas.
    2. Liste informações que NÃO estão especificadas e que não podem
       ser assumidas.
    3. Não invente regras.

    Para cada conclusão, diferencie claramente:
    - DEFINIDO NO REQUISITO
    - NÃO ESPECIFICADO

    Requisito:
    ${requirement}
  `;

  const response = await askLLM(prompt, MODEL);

  expect(response).toBeTruthy();
  assertCoreRequirement(expect, response);

  const unsupportedClaims = findUnsupportedClaims(response);
  expect(
    unsupportedClaims,
    `A IA tratou uma regra não especificada como fato: ${unsupportedClaims.join(' | ')}`
  ).toEqual([]);

  const responseLower = response.toLowerCase();
  expect(responseLower).toMatch(/não especific|nao especific|não informado|nao informado/);

  await saveLLMResponse(
    response,
    'ai-requirement-adherence',
    prompt
  );
});
