/*
Consistency - a IA deve responder de forma consistente ao mesmo prompt repetidas vezes.

Temos duas validações diferentes:
- Consistência: as 5 respostas são iguais.
- Correção: a resposta está correta.

Exemplo de resposta:
cinco execuções, todas com a mesma resposta (4).

Isso é importante porque a resposta poderia ser:
- Execução 1 → 4
- Execução 2 → 4
- Execução 3 → cinco
- Execução 4 → 4
- Execução 5 → 4

Nesse caso o modelo poderia até estar majoritariamente correto, mas não seria consistente segundo o nosso critério.

Obs. no llm-client.js temos temperature: 0. Isso tende a reduzir a variabilidade, então não espere necessariamente encontrar respostas diferentes com este valor.
*/

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

    saveLLMResponse(`Execução ${i + 1} - resposta: ${response.trim()}`, 'llm-consistency');
    //console.log(`Execução ${i + 1}:`, response.trim());
  }

  // Todas as respostas devem ser iguais
  expect(new Set(responses).size).toBe(1);

  // E devem conter o resultado esperado
  expect(responses[0]).toBe('4');
});
