const { test, expect } = require('@playwright/test');
const { askLLM, saveLLMResponse } = require('../../utils/llm-client');
const { assertCoreRequirement, findUnsupportedClaims } = require('../../utils/evaluators');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

// Aqui avaliamos a sugestão da IA como QA: gerar testes não basta; os cenários também precisam estar apoiados pelo requisito

test('IA deve gerar casos de teste sem inventar regras', async () => {
  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const prompt = `

    Atue como um QA.

    Gere casos de teste para o requisito abaixo.

    Inclua:
    - pelo menos um cenário positivo;
    - pelo menos um cenário negativo, mas somente se ele puder ser
      justificado pelo requisito;
    - cenário, entrada e resultado esperado.

    Regra importante:
    não invente mensagens, limites, tamanhos, número de tentativas,
    regras de segurança, telas, redirecionamentos ou comportamentos
    que não estejam no requisito.

    Quando uma informação necessária não estiver especificada,
    escreva "NÃO ESPECIFICADO" em vez de assumir um valor.

    Requisito:
    ${requirement}
  `;

  const response = await askLLM(prompt, MODEL);
  const responseLower = response.toLowerCase();

  expect(response).toBeTruthy();
  assertCoreRequirement(expect, response);

  expect(
    responseLower,
    'A IA deveria apresentar ou classificar cenários positivos/negativos.'
  ).toMatch(/positivo|negativo|sucesso|falha/);

  const unsupportedClaims = findUnsupportedClaims(response);
  expect(
    unsupportedClaims,
    `A IA inventou regras: ${unsupportedClaims.join(' | ')}`
  ).toEqual([]);

  await saveLLMResponse(
    response,
    'ai-test-generation',
    prompt
  );
});
