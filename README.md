# AI Testing Lab

Laboratório prático de estudos sobre **AI-Assisted Testing** e **AI Testing**, usando uma LLM local para exercitar técnicas de QA.

O projeto foi criado para aprender, na prática, a diferença entre:

- **AI-Assisted Testing:** usar IA como assistente do QA para analisar requisitos, gerar testes, revisar cobertura e apoiar atividades de qualidade.
- **AI Testing:** testar o comportamento de um sistema que utiliza IA/LLM, avaliando propriedades como aderência a instruções, consistência, alucinação e segurança.

> **Princípio do laboratório:** a resposta da IA é uma saída a ser avaliada, não uma verdade automaticamente aceita.

---

## 📋 Requisitos

- **Node.js** 24.20.0 ou superior
- **npm** 9.6.5 ou superior
- **MCP Server**
- **Playwright**
- **LM Studio**
- Um modelo compatível carregado no LM Studio

**Observação:** </br>
Neste laboratório, o MCP é necessário para os exercícios que envolvem a interação do Copilot com a aplicação, mas não é uma dependência dos testes automatizados executados pelo Playwright Test.

- O **Playwright Test** é utilizado como framework para escrever e executar os testes deste laboratório.
- O **Playwright MCP**, integrado ao **VS Code/Copilot**, atua como ferramenta de apoio, permitindo que a IA interaja com o navegador, analise a aplicação e auxilie na criação e investigação dos testes.

---

## 🛠 Instalação

```bash
cd ai-testing-lab
npm install
```

Se estiver configurando o projeto do zero:

```bash
npm init -y
npm install -D @playwright/test playwright
npm install undici@6
npx playwright install chromium
```

O Node.js é um requisito do ambiente, e não deve ser instalado como dependência do `package.json`.

---

## 🤖 Configurando a LLM local

### 1. Instale o LM Studio

Baixe o LM Studio pelo site oficial:
https://lmstudio.ai/download

### 2. Baixe um modelo

Modelos utilizados:

- **Gemma 4 E2B:** `google/gemma-4-e2b`
  - utilizado nos exercícios de AI Testing / LLM
- **Qwen3 4B Instruct** (2507 GGUF Q4_K_M): `qwen.qwen3-4b-instruct-2507`
  - utilizado nos exercícios de AI-Assisted Testing

Altere estas configurações em ambos modelos para melhorar o desempenho:

- aba Load, opção Context and Offload
  - Context Length: 4096
  - GPU Offload: 10
- aba Inference, opção Custom Fields
  - Enable Thinking: off (se houver)

O laboratório possui os IDs configurados em `config/models.js`. O ID usado no código deve ser **exatamente o mesmo ID disponibilizado pelo servidor do LM Studio**.

### 3. Carregue o modelo

No LM Studio:

1. Carregue o modelo desejado
2. Abra o servidor local em **Developer**
3. Deixe o servidor com status **Running**

A API utilizada pelo projeto é `http://localhost:1234/v1`. Esse endereço está configurado em `utils/llm-client.js`.

### 4. Verificação manual

Antes de executar os testes, faça uma verificação simples perguntando no chat do modelo, no LM Studio:

```text
Qual é a capital do Brasil?
```

Isso confirma apenas que o modelo está carregado e respondendo. **Essa verificação não substitui os testes automatizados.**

Para validar o funcionamento do cliente/API `llm-client.js`, execute o comando abaixo no terminal do projeto:

```bash
npx playwright test tests/llm-api/llm-basic-mock.spec.js
```

Este cenário **não testa a inteligência ou o comportamento do modelo**. Ele utiliza uma resposta simulada (mock) para validar o funcionamento do cliente/API `llm-client.js`, sem depender da execução de uma LLM real pelo LM Studio.

Os demais testes desta pasta utilizam a LLM real para avaliar aspectos relacionados ao comportamento e às respostas do modelo.

---

## 🧪 Execução dos testes

### AI-Assisted Testing

Aqui a IA atua como **assistente do QA**. O objetivo é avaliar se ela consegue apoiar atividades de teste sem transformar suposições em requisitos.

**Modelo:** `Qwen`

```bash
npx playwright test tests/ai-assisted/ai-test-generation.spec.js
npx playwright test tests/ai-assisted/ai-requirement-adherence.spec.js
npx playwright test tests/ai-assisted/ai-consistency.spec.js
npx playwright test tests/ai-assisted/ai-requirement-analysis.spec.js
npx playwright test tests/ai-assisted/ai-test-review.spec.js
```

> [AI-ASSISTED](/docs/AI-ASSISTED.md)

### AI Testing / LLM API

Aqui o objeto de teste é a própria resposta da LLM.

**Modelo:** `Gemma`

```bash
npx playwright test tests/llm-api/llm-basic.spec.js
npx playwright test tests/llm-api/llm-basic-mock.spec.js
npx playwright test tests/llm-api/llm-instruction.spec.js
npx playwright test tests/llm-api/llm-quality.spec.js
npx playwright test tests/llm-api/llm-robustness.spec.js
npx playwright test tests/llm-api/llm-consistency.spec.js
npx playwright test tests/llm-api/llm-hallucination.spec.js
npx playwright test tests/llm-api/llm-prompt-injection.spec.js
```

> [AI-TESTING](/docs/AI-TESTING.md)

**Observação:** o `llm-basic-mock.spec.js` não é um teste da inteligência ou do comportamento do modelo. Ele utiliza uma resposta simulada (mock) para validar o funcionamento do cliente/API `llm-client.js`, sem depender da execução de uma LLM real pelo LM Studio.

### RAG TODO

Testes relacionados à recuperação e fundamentação em documentos:

```bash
npx playwright test tests/rag/.spec.js
```

### Security TODO

Testes relacionados a prompt injection, jailbreak e vazamento de dados:

```bash
npx playwright test tests/security/.spec.js
```

---

## 📊 Resultados

### Relatório Playwright

Após uma falha, o Playwright gera automaticamente o relatório HTML em `playwright-report`.

Para gerar o relatório manualmente:

```bash
npx playwright report
```

### Respostas da LLM

Os testes salvam as respostas recebidas da LLM em `llm-results/` para permitir análise posterior.

Isso é importante em AI Testing: **não devemos analisar somente PASS/FAIL; devemos também olhar a saída produzida pelo modelo.**

---

## 📂 Estrutura principal

```text
ai-testing-lab/
├── README.md
├── package.json
├── playwright.config.ts
│
├── config/
│   └── models.js
│
├── docs/
│   ├── AI-ASSISTED.md
│   └── AI-TESTING.md
│
├── prompts/
│   ├── evaluation.md
│   ├── requirement-analysis.md
│   └── test-case-generation.md
│
├── knowledge-base/
│   ├── benefits-policy.md
│   ├── remote-work-policy.md
│   ├── security-policy.md
│   └── vacation-policy.md
│
├── utils/
│   ├── evaluators.js
│   ├── llm-client.js
│   ├── llm-output.js
│   └── test-data.js
│
├── tests/
│   ├── ai-assisted/
│   ├── llm-api/
│   ├── rag/
│   └── security/
│
└── llm-results/
```

---

## 🎯 O que este laboratório pretende ensinar

A evolução esperada é:

```text
Entender LLM
    ↓
Criar prompts melhores
    ↓
Usar IA como assistente do QA
    ↓
Definir critérios objetivos para avaliar respostas
    ↓
Automatizar esses critérios
    ↓
Aprender a testar sistemas que utilizam IA
```

O QA continua responsável pela decisão final. A IA pode acelerar o trabalho, mas **não substitui o julgamento crítico do QA**.
