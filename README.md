# AI-Testing-Lab
> Projeto de AI-Testing usando Playwright e MCP Server na aplicação **LM Studio** (LLM local).

---

## 📋 Requisitos
* **NodeJS** (versão 24.20.0 ou superior)
* **NPM** (versão 9.6.5 ou superior)
* **MCP Server**
* **Playwright**
* **LM Studio**

---

## 🛠 Instalação
```bash
cd nome-do-projeto
npm install
```

---

## ⚙ Configuração do zero

1. Crie um repositório
2. Inicialize um pacote criando o arquivo `package. json`:
```bash
npm init -y
```
3. Instale o Playwright, o Chromium e o client Undici (execute um comando por vez):
```bash
npm install -D @playwright/test
npx playwright install
npx playwright install chromium
npm install undici@6
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
O teste `llm-basic-mock.spec.js` faz uma pergunta no prompt e temporariamente simula uma resposta mockada do LLM.

### 🤖 Teste com LLM real local

1. Baixe o LM Studio: https://lmstudio.ai/download

2. Em *My Models*, pesquise e baixe os seguintes modelos:

* **Gemma4 E2B** - `google/gemma-4-e2b` (utilizaremospara os testes de **llm-api**)

* **Qwen3.5 4B GGUF** - `unsloth/Qwen3.5-4b-gguf` (utilizaremos para os testes de **ai-assisted**)

* **Qwen3-4B-Instruct-2507-GGUF Q4_K_M** - `devQuasar/Qwen3-4B-Instruct-2507-GGUF Q4_K_M` (utilizaremos para os testes de **ai-assisted**)

Melhore o desempenho do **Qwen**, alterando estas configurações:
- aba Load > Context and Offload:
    - Context Length: 4096
    - GPU Offload: 0
- aba Inference > Reasoning
    - Enable Thinking: desabilitar

3. Em *Chats*, selecione o modelo desejado, pergunte `Qual é a capital do Brasil?`.

Vamos validar que:

- o LM Studio está funcionando
- o modelo Gemma foi carregado corretamente
- conseguiu entender a pergunta e gerar uma resposta correta
- a execução foi local, sem precisar da API da OpenAI

5. Deixe o modelo carregado e inicie o servidor local (menu *Developer*, alterar opção *Status* para *Running*).

6. A URL local deve ser configurada no arquivo `utils/llm-client.js`:
```javascript
const BASE_URL = 'http://localhost:1234/v1';
```

> **Importante:** Os IDs dos models informados em `models.js` devem ser iguais aos IDs exibidos no LM Studio.

## 🧪 Execução dos testes
```bash
npx playwright tests/ai-assisted/test-generation.spec.js
npm run test:llm llm-basic.spec.js
```

### Testes - llm-api

- **llm-basic** - responder corretamente perguntas simples
- **llm-instruction** -  seguir uma instrução dada no prompt
- **llm-quality** - gerar respostas com qualidade, respeitando um formato
- **llm-robustness** - lidar com instruções conflitantes
- **llm-consistency** - mesma entrada, mesmo resultado
- **llm-hallucination** - informação que não existe
- **llm-prompt-injection** - resistência a tentativas de prompt injection

### Testes - ai-assisted

- **test-generation** - gerar casos de teste a partir de um requisito

---

## 📊 Pós execução dos testes

### Geração de relatório
Após a execução de um teste, em caso de falha, é gerado automaticamente um relatório HTML no diretório `test-results`, arquivo `index.html`.

Caso queira gerar o relatório manualmente, execute:
```bash
npx playwright test report
```
