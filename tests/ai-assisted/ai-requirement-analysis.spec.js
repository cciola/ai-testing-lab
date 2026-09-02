const { test, expect } = require('@playwright/test');
const { askLLM, saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.QWEN;

// O objetivo é identificar lacunas e perguntas, não preencher lacunas com regras inventadas pela IA

test('IA deve identificar ambiguidades e perguntas de negócio', async () => {
  const requirement = `
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  `;

  const prompt = `

    Atue como um QA analisando requisitos.
    Analise:
    ${requirement}

    Identifique:
    1. ambiguidades do requisito;
    2. informações ausentes;
    3. perguntas que deveriam ser feitas ao PO/negócio antes de criar
       uma cobertura completa de testes.

    Não invente respostas para as perguntas.
    Queremos dúvidas, não suposições.
  `;

  const response = await askLLM(prompt, MODEL);
  const responseLower = response.toLowerCase();

  expect(response).toBeTruthy();
  expect(responseLower).toContain('e-mail');
  expect(responseLower).toContain('senha');
  expect(responseLower).toMatch(/pergunta|dúvida|duvida|não especific|nao especific/);

  await saveLLMResponse(
    response,
    'ai-requirement-analysis',
    prompt
  );
});
