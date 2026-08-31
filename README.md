# AI-Testing-Lab
Laboratório de estudos sobre utilização de IA no processo de QA.

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
cd ai-testing-lab
npm install
```

---

## ⚙ Configurando do zero

1. Crie um repositório

2. Inicialize um pacote criando o arquivo `package.json`:
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

### Instalando o LLM local

Baixe o LM Studio: https://lmstudio.ai/download

### Baixando e configurando os modelos
Em My Models, pesquise e baixe os seguintes modelos:

* Gemma4 E2B - `google/gemma-4-e2b`
* Qwen3-4B-Instruct-2507 (GGUF Q4_K_M) - `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF`

Melhore o desempenho dos modelos, alterando estas configurações:
- aba Load, opção Context and Offload
    - Context Length: 4096
    - GPU Offload: 10
- aba Inference, opção Custom Fields (se houver)
    - Enable Thinking: off

Em Chats, selecione o modelo `google/gemma-4-e2b`, pergunte *Qual é a capital do Brasil?*

Vamos validar que:

- o LM Studio está funcionando
- o modelo Gemma foi carregado corretamente
- conseguiu entender a pergunta e gerar uma resposta correta
- a execução foi local, sem precisar da API da OpenAI

Deixe o modelo carregado e inicie o servidor local (menu *Developer*, alterar opção *Status* para *Running*).

A URL local deve ser configurada no arquivo `utils/llm-client.js`:
```javascript
const BASE_URL = 'http://localhost:1234/v1';
```

**Importante:** Os IDs dos models informados em `models.js` devem ser iguais aos IDs exibidos no LM Studio.

---

## 🧪 Execução dos testes

> [AI-Assisted](./AI-ASSISTED.md)

> [AI-Testing](./AI-TESTING.md)

---

## 📊 Pós execução dos testes

### Geração de relatório
Caso o teste falhe, o relatório HTML é gerado automaticamente no diretório `playwright-report` (arquivo `index.html`).

Para gerar o relatório manualmente:
```bash
npx playwright show-report
```

### Resposta da LLM
Caso o teste passe, um arquivo `.md` contendo o resultado (resposta) da LLM é gerado automaticamente no diretório `llm-results`.
