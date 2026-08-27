const BASE_URL = 'http://localhost:1234/v1';
const MODEL = 'google/gemma-4-e2b';

async function askLLM(prompt) {
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();

  return data.choices[0].message.content;
}

module.exports = { askLLM };