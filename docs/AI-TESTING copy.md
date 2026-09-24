

# 🧩 O papel dos evaluators

Os critérios de avaliação dos testes estão centralizados em:

```text
utils/evaluators.js
```

O arquivo possui funções auxiliares para avaliar diferentes propriedades das respostas.

Entre elas:

```text
normalize()
hasAny()
assertCoreRequirement()
findUnsupportedClaims()
buildRequirementSignature()
isQuestion()
```

A ideia é separar:

```text
LLM
 ↓
Resposta
 ↓
Evaluator
 ↓
Critério de qualidade
```

do código responsável pela comunicação com o modelo:

```text
llm-client.js
```

Isso permite evoluir os critérios de avaliação sem precisar modificar a lógica de comunicação com a LLM.

---

## 🔎 Avaliação determinística x avaliação semântica

Os evaluators atuais utilizam principalmente regras determinísticas.

Por exemplo:

```javascript
expect(response).toContain('4');
```

ou:

```javascript
expect(response.trim()).toBe('APROVADO');
```

Essa abordagem possui uma vantagem importante:

> O critério é claro e reproduzível.

Por outro lado, ela apresenta limitações quando a resposta pode variar na forma sem variar no significado.

Podemos representar essa evolução:

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

---

# 🔗 Relação entre os testes e os conceitos

Os testes atuais podem ser relacionados aos principais conceitos estudados da seguinte forma:

| Conceito              | Teste automatizado             | O que é exercitado                                        |
| --------------------- | ------------------------------ | --------------------------------------------------------- |
| Basic Functionality   | `llm-basic.spec.js`            | Comunicação com a LLM e resposta básica                   |
| Cliente/API           | `llm-basic-mock.spec.js`       | Fluxo do cliente sem depender da LLM real                 |
| Instruction Following | `llm-instruction.spec.js`      | Cumprimento de uma instrução explícita                    |
| Quality / Format      | `llm-quality.spec.js`          | Qualidade e restrição de formato                          |
| Consistency           | `llm-consistency.spec.js`      | Repetição do mesmo comportamento                          |
| Hallucination         | `llm-hallucination.spec.js`    | Resistência à invenção de informação                      |
| Robustness            | `llm-robustness.spec.js`       | Comportamento diante de instruções conflitantes           |
| Prompt Injection      | `llm-prompt-injection.spec.js` | Resistência a tentativa simples de alteração da instrução |

Essa relação é importante porque transforma o conteúdo teórico em exercícios executáveis.

Em vez de apenas estudar:

```text
"LLM pode apresentar alucinações."
```

podemos:

```text
1. definir um comportamento esperado;
2. criar uma entrada;
3. executar a LLM;
4. capturar a resposta;
5. aplicar um evaluator;
6. observar PASS ou FAIL;
7. analisar a resposta produzida.
```

---

# 📊 Execução e análise dos resultados

As respostas produzidas pela LLM são armazenadas em:

```text
llm-results/
```

Isso permite analisar posteriormente:

```text
Prompt
   ↓
Resposta
   ↓
Resultado do teste
```

Essa informação é especialmente importante quando o teste falha.

Uma análise adequada deve responder:

### 1. O que foi enviado?

Verificar o prompt utilizado.

### 2. O que a LLM respondeu?

Analisar a resposta real, e não apenas o status `FAIL`.

### 3. Qual era o comportamento esperado?

Identificar o critério definido pelo teste.

### 4. Por que falhou?

Determinar se:

* a LLM não seguiu a instrução;
* a resposta estava incorreta;
* houve variação entre execuções;
* o evaluator foi inadequado;
* o prompt não era suficientemente claro;
* o comportamento esperado estava mal definido.

### 5. O que deve ser melhorado?

A evolução pode estar em:

```text
Prompt
Evaluator
Modelo
Parâmetros
Dados
Arquitetura
Teste
```

Por isso, o resultado de um teste de LLM não deve ser analisado isoladamente.

---

# 🧠 O papel do QA no AI Testing

No AI Testing, o QA deixa de validar somente:

```text
Entrada → Saída
```

e passa a considerar também:

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

Isso muda a natureza de algumas atividades de teste.

O QA precisa ser capaz de:

* definir o comportamento esperado;
* identificar riscos específicos de IA;
* escolher critérios de avaliação;
* reconhecer limitações dos evaluators;
* analisar respostas não determinísticas;
* diferenciar erro do modelo de erro do teste;
* avaliar falsos positivos e falsos negativos;
* evoluir os critérios de avaliação.

A responsabilidade pela decisão de qualidade continua sendo do QA.

---

# 🔄 AI-Assisted Testing x AI Testing

Os dois conceitos estão relacionados, mas possuem objetivos diferentes.

### AI-Assisted Testing

A IA atua como **assistente do QA**.

Exemplos:

```text
IA analisa requisito
       ↓
IA sugere casos de teste
       ↓
QA avalia
```

No laboratório:

```text
tests/ai-assisted/
```

### AI Testing

A IA/LLM passa a ser **objeto de teste**.

Exemplo:

```text
Prompt
  ↓
LLM
  ↓
Resposta
  ↓
Evaluator
```

No laboratório:

```text
tests/llm-api/
```

Podemos visualizar:

```text
                 AI-Assisted Testing
                        │
                 IA ajuda o QA
                        │
                        ▼
                 QA cria critérios
                        │
                        ▼
                  AI Testing
                        │
              IA passa a ser testada
```

A experiência com AI-Assisted Testing ajuda o QA a desenvolver uma habilidade essencial para AI Testing:

> **avaliar criticamente uma saída produzida por uma IA.**

---

# ⚠ Limitações atuais do laboratório

Os testes atuais são exercícios introdutórios e não representam uma estratégia completa de qualidade para sistemas baseados em IA.

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

Essas limitações são intencionais nesta etapa do laboratório.

O objetivo inicial é compreender os fundamentos antes de introduzir estratégias de avaliação mais sofisticadas.

---

# ⚠ TODO 🎯 Próximas evoluções

Depois dos testes atuais, o laboratório pode evoluir para:

### Avaliação

* avaliação semântica;
* métricas de qualidade;
* avaliação de relevância;
* avaliação de factualidade;
* LLM-as-a-Judge;
* comparação entre evaluators.

### Consistência e regressão

* execução com diferentes temperaturas;
* comparação entre modelos;
* datasets de avaliação;
* testes de regressão de prompts;
* histórico de resultados.

### Contexto e conhecimento

* testes de contexto;
* RAG;
* retrieval;
* grounding;
* avaliação de fontes;
* verificação de respostas fundamentadas.

### Segurança

* cenários de prompt injection mais elaborados;
* jailbreak;
* data leakage;
* controle de acesso;
* uso seguro de ferramentas;
* avaliação de agentes.

### Automação

* execução em CI/CD;
* geração de relatórios de avaliação;
* thresholds de qualidade;
* comparação automática entre versões do modelo;
* detecção de regressões.

---

## 🎯 Ideia central

O objetivo deste laboratório não é provar que uma LLM é "inteligente".

O objetivo é aprender a construir um processo de avaliação:

```text
Entrada
   ↓
LLM
   ↓
Resposta
   ↓
Critério definido pelo QA
   ↓
Evaluator
   ↓
PASS / FAIL
   ↓
Análise crítica
```

A principal habilidade desenvolvida é entender que:

> **Uma resposta de IA não é automaticamente uma resposta correta.**

O QA precisa definir **o que deve ser considerado correto**, transformar esse critério em uma avaliação e analisar criticamente o resultado.

Essa é a base para evoluir de testes simples de LLM para estratégias mais completas de **AI Testing**.
