const MODEL = 'gemma-4-e2b';
const BASE_URL = 'http://localhost:1234/v1';

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
      ],
      temperature: 0
    })
  });

  if (!response.ok) {
    throw new Error(`LLM request failed: ${response.status}`);
  }

  const data = await response.json();

  return data.choices[0].message.content;
}

module.exports = { askLLM };