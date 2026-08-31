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
```bash
npx playwright test tests/ai-assisted/test-generation.spec.js        # Geração de cenários de teste
npx playwright test tests/ai-assisted/requirement-adherance.spec.js  # Aderência aos requisitos
npx playwright test tests/ai-assisted/consistency.spec.js            # Consistência
```

> [AI-Testing](./AI-TESTING.md)
```bash
npx playwright test tests/llm-api/llm-basic.spec.js            # Basic Functionality
npx playwright test tests/llm-api/llm-basic-mock.spec.js       # Basic Functionalitya (usando mock)
npx playwright test tests/llm-api/llm-instruction.spec.js      # Instruction Following
npx playwright test tests/llm-api/llm-quality.spec.js          # Quality Format
npx playwright test tests/llm-api/llm-robustness.spec.js       # Robustness
npx playwright test tests/llm-api/llm-consistency.spec.js      # Consistency
npx playwright test tests/llm-api/llm-hallucination.spec.js    # Hallucination
npx playwright test tests/llm-api/llm-prompt-injection.spec.js # Prompt-Injection
```
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

---

## 📂 Estrutura do Projeto
```
ai-testing-lab/
├── README.md
├── AI-ASSISTED.md
├── AI-TESTING.md
├── package.json
├── playwright.config.ts
├── .gitignore
│
├── docs/
│   ├── business-rules.md          # Regras de negócio e critérios de validação
│   ├── faq.md                     # Perguntas frequentes e dúvidas do projeto
│   └── product-requirements.md    # Requisitos funcionais e não funcionais
│
├── config/
│   └── models.js                  # Modelos LLM configurados para testes
│
├── prompts/
│   ├── evaluation.md              # Prompt para avaliação de respostas
│   ├── requirement-analysis.md    # Prompt para análise de requisitos
│   └── test-case-generation.md    # Prompt para geração de casos de teste
│
├── knowledge-base/
│   ├── benefits-policy.md         # Política de benefícios
│   ├── remote-work-policy.md      # Política de trabalho remoto
│   ├── security-policy.md         # Política de segurança
│   └── vacation-policy.md         # Política de férias
│
├── utils/
│   ├── evaluators.js              # Funções de avaliação de respostas
│   ├── llm-client.js              # Cliente para comunicação com LLM local
│   ├── llm-output.js              # Tratamento e persistência de saídas
│   └── test-data.js               # Dados e fixtures usados nos testes
│
├── tests/
│   ├── ai-assisted/
│   │   ├── ai-consistency.spec.js
│   │   ├── ai-requirement-adherence.spec.js
│   │   └── ai-test-generation.spec.js
│   │
│   ├── llm-api/
│   │   ├── llm-basic.spec.js
│   │   ├── llm-basic-mock.spec.js
│   │   ├── llm-consistency.spec.js
│   │   ├── llm-hallucination.spec.js
│   │   ├── llm-instruction.spec.js
│   │   ├── llm-prompt-injection.spec.js
│   │   ├── llm-quality.spec.js
│   │   └── llm-robustness.spec.js
│   │
│   ├── rag/
│   │   ├── document-content.spec.js
│   │   ├── grounding.spec.js
│   │   └── retrieval.spec.js
│   │
│   └── security/
│       ├── data-leakage.spec.js
│       ├── jailbreak.spec.js
│       └── prompt-injection.spec.js
│
├── pages/
│   └── # Páginas ou cenários front-end simulados para testes
│
├── test-results/
│   └── # Saídas de execução dos testes
│
├── playwright-report/
│   └── index.html                 # Relatório HTML gerado pelo Playwright
│
├── llm-results/
│   ├── ai-consistency_20260828_15-4645.md
│   ├── ai-requirement-adherence-2026-082814_3655.md
│   ├── ai-test-generation_20260828_15-2942.md
│   └── # Resultados e respostas geradas pela LLM
│
└── .github/
    └── workflows/
        └── # CI/CD e automação futura
```