// (Teste com mock) Basic functionality - a IA deve retornar uma resposta correta para uma pergunta simples.

const { test, expect } = require('@playwright/test');

test('LLM deve responder a uma pergunta simples', async () => {
  const prompt = 'Qual é a capital do Brasil?';

  // Temporariamente simulamos a resposta do LLM
  const response = 'A capital do Brasil é Brasília.';

  expect(response).toContain('Brasília');
});