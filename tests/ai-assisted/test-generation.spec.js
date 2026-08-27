const { test, expect } = require('@playwright/test');

const { askLLM } = require('../../utils/llm-client');

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

  const response = await askLLM(prompt);

  console.log('Resposta da IA:\n', response);

  expect(response).toBeTruthy();
  expect(response.toLowerCase()).toContain('login');
});