const { test, expect } = require('@playwright/test');
const { askLLM, saveLLMResponse } = require('../../utils/llm-client');
const { buildRequirementSignature, assertCoreRequirement } = require('../../utils/evaluators');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

// O teste compara pontos essenciais, porque duas respostas semanticamente equivalentes podem usar palavras diferentes

test('IA deve manter os pontos essenciais ao analisar o mesmo requisito', async () => {
  const prompt = `
    Analise o seguinte requisito:

    "Um usuário deve conseguir fazer login informando
    e-mail e senha válidos."

    Liste os principais pontos que um QA deve considerar.
    Separe:
    1. regras definidas no requisito;
    2. informações que não foram especificadas.

    Não invente regras.
  `;

  const response1 = await askLLM(prompt, MODEL);
  const response2 = await askLLM(prompt, MODEL);

  assertCoreRequirement(expect, response1);
  assertCoreRequirement(expect, response2);

  const signature1 = buildRequirementSignature(response1);
  const signature2 = buildRequirementSignature(response2);

  expect(
    signature2,
    'A segunda resposta mudou os pontos essenciais em relação à primeira.'
  ).toEqual(signature1);

  await saveLLMResponse(
    `## Execução 1:\n\n${response1}\n\n## Execução 2:\n\n${response2}`,
    'ai-consistency',
    prompt
  );
});
