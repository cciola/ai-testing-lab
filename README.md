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
cd nome-do-projeto
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

1. Baixe o LM Studio: https://lmstudio.ai/download

2. Em *My Models*, pesquise e baixe os seguintes modelos:

* **Gemma4 E2B** - `google/gemma-4-e2b` (utilizaremos para os testes de **llm-api**)

* **Qwen3-4B-Instruct-2507** (GGUF Q4_K_M) - `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF` (utilizaremos para os testes de **ai-assisted**)

Melhore o desempenho do **Qwen**, alterando estas configurações:
- Load > Context and Offload
    - Context Length: 4096
    - GPU Offload: 10

3. Em *Chats*, selecione o modelo `google/gemma-4-e2b`, pergunte `Qual é a capital do Brasil?`.

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

**Importante:** Os IDs dos models informados em `models.js` devem ser iguais aos IDs exibidos no LM Studio.

---

## 🧪 Execução dos testes

### AI-Testing

```bash
npx playwright tests/llm-api/llm-basic-mock.spec.js       # simula uma resposta mockada do LLM
npx playwright tests/llm-api/llm-basic.spec.js            # responder corretamente perguntas simples
npx playwright tests/llm-api/llm-instruction.spec.js      # seguir uma instrução dada no prompt
npx playwright tests/llm-api/llm-quality.spec.js          # gerar respostas com qualidade, respeitando um formato
npx playwright tests/llm-api/llm-robustness.spec.js       # lidar com instruções conflitantes
npx playwright tests/llm-api/llm-consistency.spec.js      # mesma entrada, mesmo resultado
npx playwright tests/llm-api/llm-hallucination.spec.js    # informação que não existe
npx playwright tests/llm-api/llm-prompt-injection.spec.js # resistência a tentativas de prompt injection
```

O objetivo do AI-Testing é avaliar o comportamento de modelos de IA. Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado;
* não inventa informações;
* segue instruções;
* mantém formato esperado;
* não revela informações indevidas;
* responde consistentemente;
* recusa solicitações inadequadas.

## AI-Assisted

```bash
npx playwright tests/ai-assisted/test-generation.spec.js # gera casos de teste a partir de um requisito
```


---

## 📊 Pós execução dos testes

### Geração de relatório
Após a execução de um teste, em caso de falha, é gerado automaticamente um relatório HTML no diretório `test-results`, arquivo `index.html`.

Caso queira gerar o relatório manualmente, execute:
```bash
npx playwright show-report
```
