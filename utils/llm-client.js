const { Agent } = require('undici');
const { saveResponse } = require('./llm-output');

const BASE_URL = 'http://localhost:1234/v1';

const agent = new Agent({
  headersTimeout: 900000,
  bodyTimeout: 900000,
  connectTimeout: 30000
});

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

//console.log('Resposta completa:', JSON.stringify(data, null, 2));

if (!response.ok) {
  throw new Error(`Erro HTTP ${response.status}`);
}

if (!data.choices?.[0]?.message?.content) {
  throw new Error(`Formato inesperado: ${JSON.stringify(data)}`);
}

return data.choices[0].message.content;
}

function logLLMResponse(response) {
  console.log('Resposta do modelo:', response);
}

async function saveLLMResponse(response, fileName) {
  await saveResponse(response, fileName);
}

module.exports = {
  askLLM,
  logLLMResponse,
  saveLLMResponse
};