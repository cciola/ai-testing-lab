# AI-Testing-Lab
Projeto com suíte de testes automatizados para uma aplicação que utiliza uma LLM.

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright install chromium
```

Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado;
* não inventa informações;
* segue instruções;
* mantém formato esperado;
* não revela informações indevidas;
* responde consistentemente;
* recusa solicitações inadequadas.

## Teste com mock ##
Criar o teste `llm-basic.spec.js`, contendo:
```bash
const { test, expect } = require('@playwright/test');

test('LLM deve responder a uma pergunta simples', async () => {
  const prompt = 'Qual é a capital do Brasil?';

  // Temporariamente simulamos a resposta do LLM
  const response = 'A capital do Brasil é Brasília.';

  expect(response).toContain('Brasília');
});
```

Execute `npm run test tests/llm-basic.spec.js`, o resultado será **1 passed**.

Agora vamos sair do mock e fazer o primeiro teste contra um LLM real:

## Teste com um LLM real - LM Studio (agente Gemma 4 E2B)

1. Instale o SDK `npm install openai`. Esse pacote é apenas um cliente JavaScript para uma API compatível com OpenAI.

2. Vamos usar o LM Studio, ele oferece uma API compatível com OpenAI. Faça download em https://lmstudio.ai/download?utm_source=chatgpt.com

3. Baixe um modelo de agente: abra o LM Studio, menu lateral My Models, pesquise e baixe **Gemma4 E2B**. O `gemma-4-e2b` é uma versão pequena do Gemma 4, com suporte a texto, imagens, raciocínio e tool calling, e o LM Studio informa 4.41 GB como memória mínima do sistema. Ele também é otimizado para execução local em notebooks/dispositivos menores.

4. Após baixar, clique em Chats, selecione o model google/gemma-4-e2b, pergunte no chat **Qual é a capital do Brasil?** (é comum uma demora no processamento das respostas). Vamos validar que:

* o LM Studio está funcionando
* o modelo Gemma foi carregado corretamente
* conseguiu entender a pergunta e gerar uma resposta correta
* a execução foi local, sem precisar da API da OpenAI

Agora vamos começar criar testes para avaliar qualidade, consistência, tempo de resposta e comportamento diante de perguntas diferentes.

5. Deixe o modelo carregado e inicie o servidor local (menu Developer, alterar opção Status para Running).

6. Configure o model e a URL local no arquivo`utils/llm-client.js`:
```javascript
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
```

7. Altere `llm-basic.spec.js` conforme abaixo e execute o teste:
```javascript
const { test, expect } = require('@playwright/test');
const { askLLM } = require('../utils/llm-client');

test('LLM deve responder corretamente a uma pergunta simples', async () => {
  const response = await askLLM('Quanto é 2 + 2?');

  console.log('Resposta do modelo:', response);

  expect(response).toContain('4');
});
```


---

Objective

This project demonstrates practical QA techniques for applications powered by Large Language Models (LLMs).

# 📋 Requisitos #
* **JavaScript
* **Playwright
Node.js
LLM API
REST API
GitHub Actions
Docker
Testing approach
Functional testing
API testing
LLM evaluation
RAG testing
Security testing
Prompt injection testing
UI automation

What is being evaluated
✓ Factuality (fatualidade)
✓ Hallucination (alucinação)
✓ Consistency (consistência)
✓ Robustness (robustez)
✓ Grounding
✓ Prompt injection resistance (resistência a injeção de comandos)
✓ API behavior (comportamento de API)

Limitações:

* as respostas de LLMs são não determinísticas;
* a correspondência exata de texto é frequentemente inadequada;
* o uso de LLMs como juízes pode introduzir vieses;
* os critérios de avaliação devem ser explícitos;
* alguns resultados requerem revisão humana.
