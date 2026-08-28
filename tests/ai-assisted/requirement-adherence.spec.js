// Requirement Adherence - a IA deve respeitar o requisito fornecido, não extrapolando suas limitações,respeitando a fonte de verdade fornecida

const { test, expect } = require('@playwright/test');
const { askLLM, logLLMResponse } = require('../../utils/llm-client');
const { saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

test('IA não deve inventar regras não presentes no requisito', async () => {

  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const prompt = `
    Analise o requisito abaixo e identifique quais regras
    de negócio estão explicitamente definidas.

    Gere casos de teste somente com base nas informações
    presentes no requisito.

    Não invente regras, valores, mensagens, limites,
    políticas de segurança ou comportamentos que não
    estejam especificados.

    Requisito:
    ${requirement}
  `;

  const response = await askLLM(prompt, MODEL);

  logLLMResponse(response);

  const responseLower = response.toLowerCase();

  // A resposta deve reconhecer os elementos realmente definidos
  expect(responseLower).toContain('e-mail');
  expect(responseLower).toContain('senha');
  expect(responseLower).toContain('válid');

  // Não deve assumir regras específicas não informadas
  expect(responseLower).not.toContain('6 caracteres');
  expect(responseLower).not.toContain('3 tentativas');
  expect(responseLower).not.toContain('5 tentativas');
  expect(responseLower).not.toContain('força bruta');
  expect(responseLower).not.toContain('dashboard');

  saveLLMResponse(response, 'requirement-adherence');
});

/*
Na resposta, a IA identificou corretamente que o requisito só define:
login com e-mail e senha válidos.

E explicitamente reconheceu que não temos informação suficiente sobre:
tamanho da senha;
formato exato do e-mail;
mensagens de erro;
limite de tentativas;
2FA;
política de segurança.

Isso é um comportamento que queremos de uma IA em um cenário de QA.

Mas encontramos um problema interessante: ela primeiro disse
"válidos" ... indica que o e-mail deve seguir o formato esperado
e
"a senha deve atender aos critérios de validade (como tamanho mínimo...)"

Isso é uma inferência. Depois ela mesma se corrige:
"não podemos inferir regras adicionais"

Então temos uma resposta que termina corretamente, mas contém uma contradição interna.
*/