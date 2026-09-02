const { Agent } = require('undici');
const { saveResponse } = require('./llm-output');

// Endpoint OpenAI-compatible exposto pelo servidor local do LM Studio.
const BASE_URL = 'http://localhost:1234/v1';

// Os timeouts são altos porque modelos locais podem levar vários minutos para responder, principalmente em máquinas sem GPU dedicada.
const agent = new Agent({
  headersTimeout: 900000,
  bodyTimeout: 900000,
  connectTimeout: 30000
});

// Envia um prompt ao modelo informado e retorna somente o conteúdo da resposta. O status HTTP e o formato da resposta são validados antes do retorno.
async function askLLM(prompt, model) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    }),
    dispatcher: agent
  });

  const data = await response.json();

if (!response.ok) {
  throw new Error(`Erro HTTP ${response.status}`);
}

if (!data.choices?.[0]?.message?.content) {
  throw new Error(`Formato inesperado: ${JSON.stringify(data)}`);
}

return data.choices[0].message.content;
}

// Útil durante uma investigação manual; os testes normalmente salvam a resposta em arquivo para manter o terminal mais limpo.
function logLLMResponse(response) {
  console.log('Resposta do modelo:', response);
}

async function saveLLMResponse(response, fileName, path) {
  await saveResponse(response, fileName, path);
}

module.exports = {
  askLLM,
  logLLMResponse,
  saveLLMResponse
};