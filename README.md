# AI-Testing-Lab
Projeto de AI-Testing usando Playwright e MCP Server na aplicação [LM Studio](https://lmstudio.ai/download) (LLM local), utilizando o agente **Gemma 4 E2B**.

## 📋 Requisitos
* **OpenAI SDK**
* **MCP Server**
* **Playwright**
* **LM Studio** (agente *Gemma 4 E2B*)

## 🛠 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/nome-do-projeto.git
```

2. Acesse o diretório do projeto:
```bash
cd nome-do-projeto
```

3. Instale as dependências necessárias:
```bash
npm install
```

## 🧪 Execução dos testes

```bash
npm run test tests/<nome-do-teste>.spec.js
```

---

## ⚙ Configurando do zero

Após criar o repositório, execute os comandos abaixo um por vez:
```bash
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright install chromium
```

O objetivo do AI-Testing é avaliar o comportamento de modelos de IA. Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado;
* não inventa informações;
* segue instruções;
* mantém formato esperado;
* não revela informações indevidas;
* responde consistentemente;
* recusa solicitações inadequadas.

### 🎭 Teste com mock
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

Execute `npm run test tests/llm-basic.spec.js`, o teste deve passar.


### 🤖 Teste com um LLM real - LM Studio (agente Gemma 4 E2B)

Agora vamos sair do mock e fazer o primeiro teste contra um LLM real local:

1. Instale o SDK `npm install openai`. Esse pacote é apenas um cliente JavaScript para uma API compatível com OpenAI.

2. Vamos usar o **LM Studio**, ele oferece uma API compatível com OpenAI. Faça download em https://lmstudio.ai/download

3. Baixe um modelo de agente: abra o LM Studio, menu lateral **My Models**, pesquise e baixe **Gemma 4 E2B**.

O `gemma-4-e2b` é uma versão pequena do Gemma 4, modelo de IA leve do Google, que possui suporte a texto, imagens, raciocínio e tool calling, e o LM Studio informa 4.41GB como memória mínima do sistema. É otimizado para execução direta em dispositivos locais com menos recursos.

4. Após baixar, clique em **Chats**, selecione o model `google/gemma-4-e2b`.

5. Pergunte no chat ***Qual é a capital do Brasil?*** (é comum uma demora no processamento das respostas). Vamos validar que:

* o LM Studio está funcionando
* o modelo Gemma foi carregado corretamente
* conseguiu entender a pergunta e gerar uma resposta correta
* a execução foi local, sem precisar da API da OpenAI

Agora vamos começar criar testes para avaliar qualidade, consistência, tempo de resposta e comportamento diante de perguntas diferentes.

6. Deixe o modelo carregado e inicie o servidor local (menu Developer, alterar opção Status para Running).

7. Configure o model e a URL local no arquivo `utils/llm-client.js`:

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

8. Altere `llm-basic.spec.js` conforme abaixo e execute o teste:

```javascript
const { test, expect } = require('@playwright/test');
const { askLLM } = require('../utils/llm-client');

test('LLM deve responder corretamente a uma pergunta simples', async () => {
  const response = await askLLM('Quanto é 2 + 2?');

  console.log('Resposta do modelo:', response);

  expect(response).toContain('4');
});
```

## 📊 Pós execução dos testes

### Geração de relatório
Após a execução de um teste, em caso de falha, é gerado automaticamente um relatório HTML no diretório `report`, arquivo `index.html`.