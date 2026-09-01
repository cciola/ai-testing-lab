const { test, expect } = require('@playwright/test');
const { askLLM, saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

// Os casos abaixo são propositalmente problemáticos. O teste verifica se a IA
// consegue reconhecê-los em vez de simplesmente aceitá-los como válidos.

test('IA deve identificar problemas em casos de teste criados pelo QA', async () => {
  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const testCases = `
    CT01 - Login com e-mail e senha válidos.
    Resultado: login realizado com sucesso.

    CT02 - Senha com no mínimo 8 caracteres.
    Resultado: mostrar a mensagem "Senha deve ter no mínimo 8 caracteres".

    CT03 - Após 3 tentativas inválidas, bloquear a conta.
    Resultado: mostrar mensagem de bloqueio.

    CT04 - Login com e-mail válido e senha válida.
    Resultado: redirecionar para o dashboard.
  `;

  const prompt = `
    Revise os casos de teste abaixo como um QA crítico.

    Requisito:
    ${requirement}

    Casos de teste:
    ${testCases}

    Identifique:
    1. quais casos estão diretamente apoiados pelo requisito;
    2. quais casos introduzem regras que não estão especificadas;
    3. quais resultados esperados são suposições;
    4. quais dúvidas deveriam ser encaminhadas ao PO.

    Não reescreva os testes. Apenas faça a análise.
  `;

  const response = await askLLM(prompt, MODEL);
  const responseLower = response.toLowerCase();

  expect(response).toBeTruthy();
  expect(responseLower).toMatch(/8 caracteres|8 character/);
  expect(responseLower).toMatch(/3 tentativas|três tentativas|tres tentativas/);
  expect(responseLower).toMatch(/dashboard/);
  expect(responseLower).toMatch(/não especific|nao especific|não informado|nao informado|suposi/);

  await saveLLMResponse(
    response,
    'ai-test-review',
    prompt
  );
});
