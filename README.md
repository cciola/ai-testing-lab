# AI Testing Lab

Laboratório prático de estudos básicos sobre **AI-Assisted Testing** e **AI Testing** para exercitar técnicas de QA, usando uma LLM local e automação com Playwright e MCP Server.

## 🎯 O que este laboratório pretende ensinar

O projeto foi criado para aprender, na prática, a diferença entre:

- **AI-Assisted Testing:** usar IA como assistente do QA para analisar requisitos, gerar testes, revisar cobertura e apoiar atividades de qualidade.

- **AI Testing:** testar o comportamento de um sistema que utiliza IA/LLM, avaliando propriedades como aderência a instruções, consistência, alucinação e segurança.

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
> [!NOTE]
> **Princípio do laboratório:** a resposta da IA é uma saída a ser avaliada, não uma verdade automaticamente aceita. O QA continua responsável pela decisão final. A IA pode acelerar o trabalho, mas **não substitui o julgamento crítico do QA**.

---

## 📋 Requisitos

- **Node.js** 24.20.0 ou superior
- **npm** 9.6.5 ou superior
- **MCP Server**
- **Playwright**
- **LM Studio**
- Um modelo compatível carregado no LM Studio

### Observação

Neste laboratório, o MCP é necessário para os exercícios que envolvem a interação do Copilot com a aplicação, mas não é uma dependência dos testes automatizados executados pelo Playwright Test.

- O **Playwright Test** é utilizado como framework para escrever e executar os testes deste laboratório.

- O **Playwright MCP**, integrado ao **VS Code/Copilot**, atua como ferramenta de apoio, permitindo que a IA interaja com o navegador, analise a aplicação e auxilie na criação e investigação dos testes.</p>

---

## 🛠 Instalação

Clone ou disponibilize o projeto no ambiente de execução e instale as dependências:

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

## ⚙ Configurando a LLM local

### 1. Instale o LM Studio

Baixe o LM Studio pelo site oficial: https://lmstudio.ai/download

### 2. Baixe os modelos

- **Gemma 4 E2B:** `google/gemma-4-e2b` (utilizado nos exercícios de AI Testing/LLM)
- **Qwen3 4B Instruct (2507 GGUF Q4_K_M)**: `qwen.qwen3-4b-instruct-2507` (utilizado nos exercícios de AI-Assisted Testing)

Altere estas configurações em ambos modelos para melhorar o desempenho:

- Aba Load > opção Context and Offload > Context Length: 4096
- Aba Load > opção Context and Offload > GPU Offload: 10
- Aba Inference > opção Custom Fields > Enable Thinking: off (se houver)

O laboratório possui os IDs configurados em `config/models.js`. **O ID usado no código deve ser exatamente o mesmo ID disponibilizado pelo servidor do LM Studio**.

### 3. Carregando o modelo

No LM Studio:

1. Carregue o modelo desejado
2. Abra o servidor local em **Developer**
3. Deixe o servidor com status **Running**

A API utilizada pelo projeto é `http://localhost:1234/v1`. Esse endereço está configurado em `utils/llm-client.js`.

### 4. Verificação manual

Antes de executar os testes automatizados, faça uma verificação simples perguntando no chat do modelo, no LM Studio:

```text
Qual é a capital do Brasil?
```

Isso confirma apenas que o modelo está carregado e respondendo. **Essa verificação não substitui os testes automatizados.**

Para validar o funcionamento do cliente/API `llm-client.js`, execute o comando abaixo no terminal do projeto:

```bash
npx playwright test tests/llm-api/llm-basic-mock.spec.js
```

> [!WARNING]
> Este cenário **não testa a inteligência ou o comportamento do modelo**. Ele utiliza uma resposta simulada (mock) para validar o funcionamento do cliente/API `llm-client.js`, sem depender da execução de uma LLM real pelo LM Studio. Os demais testes desta pasta utilizam a LLM real para avaliar aspectos relacionados ao comportamento e às respostas do modelo.

---

## 🧪 Execução automatizada dos testes

Nos tópicos abaixo, temos uma relação do conteúdo teórico com exercícios executáveis:

* [**AI-Assisted Testing**](/docs/AI-ASSISTED.md)
* [**AI Testing / LLM API**](/docs/AI-TESTING.md)

### Resultados

Os testes automatizados salvam as respostas recebidas da LLM na pasta `llm-results/`.

Após uma falha, o Playwright gera automaticamente o relatório HTML em `playwright-report`. Para gerar o relatório manualmente, utilize o comando:

```bash
npx playwright report
```

---

## 📚 Conceitos

### O papel dos evaluators

Os critérios de avaliação dos testes estão centralizados em `utils/evaluators.js`. O arquivo possui funções auxiliares para avaliar diferentes propriedades das respostas. A ideia é separar:

```text
LLM
 ↓
Resposta
 ↓
Evaluator
 ↓
Critério de qualidade
```

do código responsável pela comunicação com o modelo. Isso permite evoluir os critérios de avaliação sem precisar modificar a lógica de comunicação com a LLM.

### Avaliação determinística x avaliação semântica

Os evaluators atuais utilizam principalmente regras determinísticas. Essa abordagem possui uma vantagem importante: **o critério é claro e reproduzível**. Exemplo:

```javascript
expect(response).toContain('4');
expect(response.trim()).toBe('APROVADO');
```

Por outro lado, ela apresenta limitações quando a resposta pode variar na forma sem variar no significado. Podemos representar essa evolução:

```text
Nível 1
Comparação exata
       ↓
Nível 2
Palavras-chave
       ↓
Nível 3
Regras estruturais
       ↓
Nível 4
Avaliação semântica
       ↓
Nível 5
LLM-as-a-Judge
```

O laboratório começa pelos níveis mais simples para permitir que o QA compreenda primeiro **como transformar uma expectativa em um critério automatizado**.

### O papel do QA no AI Testing

No AI Testing, o QA deixa de validar somente entrada/saída, e passa a considerar também:

```text
Entrada
   ↓
Contexto
   ↓
Prompt
   ↓
Modelo
   ↓
Parâmetros
   ↓
Resposta
   ↓
Evaluator
   ↓
Resultado
```

O QA precisa ser capaz de:

* definir o comportamento esperado;
* identificar riscos específicos de IA;
* escolher critérios de avaliação;
* reconhecer limitações dos evaluators;
* analisar respostas não determinísticas;
* diferenciar erro do modelo de erro do teste;
* avaliar falsos positivos e falsos negativos;
* evoluir os critérios de avaliação.

### Análise das respostas da LLM

O resultado de um teste de LLM não deve ser analisado isoladamente. Uma análise adequada deve responder:

- **O que foi enviado?** Verificar o prompt utilizado.
- **O que a LLM respondeu?** Analisar a resposta real, e não apenas o status FAIL.
- **Qual era o comportamento esperado?** Identificar o critério definido pelo teste.
- **Por que falhou?** Devemos questionar e determinal se:
  * a LLM não seguiu a instrução
  * a resposta estava incorreta
  * houve variação entre execuções
  * o evaluator foi inadequado
  * o prompt não era suficientemente claro
  * o comportamento esperado estava mal definido
- **O que deve ser melhorado?** A evolução pode estar em prompt, evaluator, modelo, parâmetros, dados, arquitetura, teste.

---

## ⚠ Limitações atuais do laboratório

Os testes atuais são exercícios **introdutórios** e não representam uma estratégia completa de qualidade para sistemas baseados em IA.

Entre as limitações:

* alguns critérios utilizam palavras-chave;
* algumas validações utilizam comparação textual;
* a consistência atual exige igualdade exata das respostas;
* o teste de hallucination utiliza uma heurística;
* os testes de robustness e prompt injection utilizam cenários simples;
* ainda não existe avaliação semântica;
* ainda não existe LLM-as-a-Judge;
* ainda não existe dataset de avaliação;
* ainda não existe comparação sistemática entre modelos;
* ainda não existe execução de regressão de prompts em CI/CD.

Essas limitações são intencionais nesta etapa do laboratório. O objetivo inicial é compreender os fundamentos antes de introduzir estratégias de avaliação mais sofisticadas.
