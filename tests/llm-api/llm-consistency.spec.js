const { test, expect } = require('@playwright/test');
const { askLLM } = require('../../utils/llm-client');
const { saveLLMResponse } = require('../../utils/llm-client');
const MODELS = require('../../config/models');

const MODEL = MODELS.GEMMA;

test('LLM deve responder de forma consistente ao mesmo prompt', async () => {
  const prompt = 'Quanto é 2 + 2? Responda apenas com o número.';

  const responses = [];

  for (let i = 0; i < 5; i++) {
    const response = await askLLM(prompt, MODEL);

    responses.push(response.trim());

    await saveLLMResponse(
      `Execução ${i + 1} - resposta: ${response.trim()}`,
      'llm-consistency',
      prompt
    );
  }

  // Todas as respostas devem ser iguais
  expect(new Set(responses).size).toBe(1);

  // E devem conter o resultado esperado
  expect(responses[0]).toBe('4');
});
