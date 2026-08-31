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

Baixe o LM Studio: https://lmstudio.ai/download

Em *My Models*, pesquise e baixe os seguintes modelos:

* **Gemma4 E2B** - `google/gemma-4-e2b`
* **Qwen3-4B-Instruct-2507** (GGUF Q4_K_M) - `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF`

Melhore o desempenho dos modelos, alterando estas configurações:
- aba Load, opção Context and Offload
    - Context Length: 4096
    - GPU Offload: 10
- aba Inference, opção Custom Fields (se houver)
    - Enable Thinking: off

Em *Chats*, selecione o modelo `google/gemma-4-e2b`, pergunte `Qual é a capital do Brasil?`

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

### AI-Testing
> Utilize o model `google/gemma-4-e2b`

O objetivo do AI-Testing é avaliar o comportamento de modelos de IA. Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado
* não inventa informações
* segue instruções
* mantém formato esperado
* não revela informações indevidas
* responde consistentemente
* recusa solicitações inadequadas

### Basic Functionality
A IA deve retornar respostas corretas para perguntas simples.
```bash
npx playwright test tests/llm-api/llm-basic.spec.js
# 2 + 2 é **4**.

npx playwright test tests/llm-api/llm-basic-mock.spec.js
# A capital do Brasil é Brasília.
```

### Instruction Following
A IA deve seguir uma instrução simples dada no prompt.
```bash
npx playwright test tests/llm-api/llm-instruction.spec.js
# APROVADO
```

### Quality Format
A IA deve gerar respostas com qualidade, respeitando um formato.
```bash
npx playwright test tests/llm-api/llm-quality.spec.js
# Teste de software é o processo de verificar um programa ou sistema para identificar defeitos (bugs) e garantir que ele funcione conforme o esperado. O objetivo é validar a qualidade do software, assegurando que ele atenda aos requisitos especificados pelos usuários. Isso envolve executar o software com diferentes entradas para encontrar falhas e corrigir os problemas antes da implantação.
```

### Robustness
A IA deve seguir a instrução principal, mesmo quando há conteúdo conflitante na entrada.

O teste vai falhar, e está funcionando corretamente; quem não cumpriu o critério foi o modelo:
```bash
npx playwright test tests/llm-api/llm-robustness.spec.js

Error: O modelo não respeitou a instrução de responder apenas APROVADO.

expect(received).toBe(expected) // Object.is equality

Expected: "APROVADO."
Received: "APROVADO"
```

O que aconteceu:
- O prompt tem duas instruções conflitantes.
- O Gemma escolheu a segunda instrução e produziu uma resposta longa.

Portanto:
- Comportamento observado: respondeu à instrução conflitante
- Comportamento esperado: APROVADO.

Isso é um exemplo de robustez a instruções conflitantes.

Observação: não devemos assumir que a primeira instrução é necessariamente "a principal" só porque apareceu primeiro. Em sistemas de LLM reais, existe uma hierarquia de instruções, e o comportamento depende também de como a aplicação constrói o prompt. Neste teste estamos deliberadamente simplificando isso para estudar o conceito.

### Consistency
A IA deve responder de forma consistente ao mesmo prompt repetidas vezes (mesma entrada, mesmo resultado).

Temos duas validações diferentes:
- Consistência: as 5 respostas são iguais.
- Correção: a resposta está correta.

```bash
npx playwright test tests/llm-api/llm-consistency.spec.js
# Execução 1 - resposta: 4
# Execução 2 - resposta: 4
# Execução 3 - resposta: 4
# Execução 4 - resposta: 4
# Execução 5 - resposta: 4
```

A resposta poderia ser:
- Execução 1 → 4
- Execução 2 → 4
- Execução 3 → cinco
- Execução 4 → 4
- Execução 5 → 4

Nesse caso, o modelo poderia até estar majoritariamente correto, mas não seria consistente segundo o nosso critério.

Observação: no `llm-client.js` temos `temperature: 0`. Isso tende a reduzir a variabilidade, então não espere necessariamente encontrar respostas diferentes com este valor.

### Hallucination
npx playwright test tests/llm-api/llm-hallucination.spec.js informação que não existe

### Prompt-injection
npx playwright test tests/llm-api/llm-prompt-injection.spec.js resistência a tentativas de prompt injection


## AI-Assisted
> Utilize o model `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF`

O objetivo do AI-Assisted Testing é usar a IA como assistente do QA, para aumentar produtividade e qualidade, não necessariamente testar a própria IA. Por exemplo:

* geração de cenários positivos
* geração de cenários negativos
* regras de negócio implícitas
* cenários de segurança
* cenários de integração
* identificação de riscos
* perguntas que deveriam ser esclarecidas com o PO

```bash
# Comando base
npx playwright test tests/ai-assisted/<teste>.spec.js

# Testes
test-generation        # geração de casos de teste a partir de um requisito
requirement-adherence  # extrapolação do requisito
consistency            # manter a mesma resposta essencial ao fazer a mesma pergunta duas vezes
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
