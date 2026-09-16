# AI-Assisted Testing

**AI-Assisted Testing** é o uso de IA como assistente nas atividades de QA.

No teste tradicional:

```text
QA
 ↓
Analisa requisito
 ↓
Cria testes
 ↓
Implementa
 ↓
Executa
 ↓
Analisa resultado
```

Na AI-Assisted Testing:

```text
             ┌── IA sugere
             ├── IA analisa
QA ──────────┼── IA gera
             ├── IA revisa
             └── IA explica
                  ↓
             QA valida a saída
```

O principal risco é que a IA pode gerar uma resposta bem escrita, coerente, tecnicamente plausível, aparentemente completa... e ainda assim **estar errada** para aquele requisito.

Por isso, não devemos pensar:

> "A IA gerou os testes, então os testes estão corretos."

A mentalidade correta é:

> "A IA gerou **sugestões**. Agora vou **avaliá-las como QA**."

Sempre questione:

- Isso veio do requisito?
- Isso veio do código ou do contexto fornecido?
- Isso é conhecimento geral?
- Ou a IA simplesmente assumiu?

A diferença não é simplesmente "usar ChatGPT/Copilot". O ponto importante é **como o QA utiliza a IA e como valida o que ela produziu**.

---

## Como a IA ajuda o QA

### 1. Análise de requisitos

Um bom uso da IA é procurar informações que podem passar despercebidas. Podemos perguntar:

```text
Analise o requisito abaixo como um QA.

- identifique ambiguidades;
- identifique informações ausentes;
- sugira perguntas para o PO/negócio;
- identifique cenários que precisam de esclarecimento.

Não invente respostas para as perguntas.

Requisito:
"O usuário pode cancelar um pedido."
```

A IA pode levantar questões como:

- qualquer pedido pode ser cancelado?
- existe prazo para cancelamento?
- um pedido já enviado pode ser cancelado?
- existe cobrança?
- existe reembolso?
- o usuário recebe uma notificação?

O valor para o QA está em **encontrar perguntas que precisam ser respondidas**, não em aceitar as respostas da IA como regras do sistema.

### Execução automatizada

Esse conceito é demonstrado pelo teste `ai-requirement-analysis`, que valida se a IA consegue identificar ambiguidades e transformar lacunas do requisito em perguntas úteis para o QA/PO.

```bash
npx playwright test tests/ai-assisted/ai-requirement-analysis.spec.js
```

No resultado observado no arquivo`ai-requirement-analysis_20260902_151242.md`, a LLM percebeu que o requisito é insuficiente para definir uma cobertura de testes completa, mas misturou informação ausente com detalhes técnicos que não necessariamente precisam ser definidos pelo requisito. Por exemplo:

```text
“O sistema valida o e-mail e senha no banco de dados, ou usa um serviço externo (ex: SSO, API)?”

“Sistema de autenticação utilizado: Login com hash, token JWT, autenticação via backend?”
```

Essas são perguntas tecnicamente plausíveis, mas não necessariamente são lacunas do requisito de negócio.

Portanto, a execução demonstra que a LLM consegue identificar lacunas, mas pode transformar uma análise de requisitos em uma lista excessivamente ampla de possibilidades.

---

### 2. Geração de casos de teste

Podemos fornecer um requisito e solicitar:

- cenários positivos;
- cenários negativos;
- fronteiras;
- pré-condições;
- entradas;
- resultados esperados.

```text
Atue como um QA.

Gere casos de teste para o requisito abaixo.

Inclua:
- cenário;
- entrada;
- resultado esperado.

Não invente regras que não estejam no requisito.
Caso alguma informação esteja ausente, marque como NÃO ESPECIFICADO.

Requisito:
"O usuário deve conseguir fazer login utilizando e-mail e senha válidos."
```

O QA deve revisar a saída e verificar se a IA não criou, por exemplo:

- senha com exatamente 8 caracteres;
- bloqueio após 3 tentativas;
- CAPTCHA;
- redirecionamento para dashboard;
- mensagem específica de erro;
- autenticação em dois fatores.

Se essas regras não estiverem no requisito, são **suposições**, não fatos.

### Execução automatizada

Esse conceito é demonstrado pelo teste `ai-test-generation`, que valida se a IA consegue gerar casos de teste sem transformar regras inexistentes em fatos.

```bash
npx playwright test tests/ai-assisted/ai-test-generation.spec.js
```

No resultado observado no arquivo`ai-test-generation_20260904_151133.md`, o modelo demonstrou que entendeu a regra conceitualmente, mas não a aplicou integralmente na geração do caso de teste:

* Em alguns pontos, a LLM questionou coisas que não estão no requisito (ok):

  No cenário negativo, a LLM percebeu que não deveria inventar:

        senha inválida;
        e-mail inválido;
        mensagens de erro;
        limite de tentativas;
        regras de segurança;
        validações específicas.

  E concluiu: "não é possível justificar um cenário negativo baseado apenas no requisito fornecido".

* Em outros pontos, incorporou incorretamente informações não especificadas no caso de teste (nok):

  No cenário positivo, fez preenchimento por inferência apesar do prompt dizer explicitamente "NÃO ESPECIFICADO" em vez de assumir um valor. Entradas inventadas:

  ```text
  * E-mail: "usuario@exemplo.com", Senha: "senha123" (o requisito só diz "e-mail e senha válidos", não fornece nenhum valor concreto)

  * "O usuário é redirecionado para a tela principal ou para a página indicada após autenticação." (o requisito não diz nada sobre redirecionamento).
  ```

Sendo assim, não basta a LLM dizer "não devemos assumir informações"; precisamos verificar se ela **realmente** não assume efetivamente essas informações no artefato gerado.

---

### 3. Geração de dados de teste

A IA pode acelerar a criação de massa:

```text
- Gere 20 e-mails válidos e 20 e-mails inválidos para testes.

- Gere dados para testar os limites de uma senha que deve possuir
entre 8 e 20 caracteres.
```

> 💡 Observação: aqui o requisito precisa conter a regra de limite. Caso contrário, a IA pode inventar valores.

---

### 4. Geração de automação

Podemos solicitar código de teste:

```text
Crie um teste Playwright para validar login com e-mail e senha.
```

Mas o código gerado deve ser tratado como **código sugerido**.

**Não copie automaticamente um teste gerado pela IA para a suíte**; verifique:

- locator;
- sincronização;
- assertions;
- tratamento de erros;
- manutenção;
- dados utilizados;
- aderência ao padrão do projeto.

---

### 5. Debug e Code Review

A IA pode ajudar a investigar uma falha de automação:

```text
Erro:
Timeout 30000ms exceeded.

Código:
await page.getByTestId('btn-login').click();

Contexto:
O botão aparece visualmente na tela,
mas o teste não consegue clicar.

Analise este problema como um especialista em Playwright.

Apresente:
1. possíveis causas;
2. como investigar cada causa;
3. possíveis correções.

Não altere o código ainda.
```

O objetivo é usar a IA para **aumentar a capacidade de investigação do QA**, não simplesmente substituir o raciocínio pelo código gerado.

---

### 6. Prompt Engineering para QA

Um prompt útil normalmente contém:

* Contexto
* Objetivo
* Restrições
* Entrada
* Formato esperado

Quanto mais claro for o critério, mais fácil será para o QA avaliar a resposta.

```text
Atue como um QA especialista em aplicações web.

Analise o requisito abaixo.

Requisito:
"O usuário deve conseguir realizar login utilizando e-mail e senha válidos."

Gere:
- cenários positivos;
- cenários negativos justificáveis pelo requisito;
- cenários de fronteira, somente quando houver uma fronteira definida.

Não invente regras.
Quando uma informação não estiver especificada,
marque-a como NÃO ESPECIFICADO.

Formato:
ID | Tipo | Cenário | Resultado esperado
```

Uma técnica simples sobre como avaliar criticamente a saída da IA, é procurar a **origem** de cada afirmação. Essa habilidade é **fundamental** para AI-Assisted Testing.

* O que está explicitamente definido?
* O que não está definido?
* A IA adicionou alguma regra?
* Se adicionou, ela deixou claro que é uma suposição?

### Execuções automatizadas relacionadas

O laboratório utiliza essa abordagem de definição de contexto, objetivo, restrições e formato nos prompts dos testes de AI-Assisted Testing. Os principais exemplos são:

```bash
npx playwright test tests/ai-assisted/ai-test-generation.spec.js
npx playwright test tests/ai-assisted/ai-requirement-adherence.spec.js
npx playwright test tests/ai-assisted/ai-consistency.spec.js
npx playwright test tests/ai-assisted/ai-requirement-analysis.spec.js
```

Esses testes demonstram, na prática, que o prompt não serve apenas para solicitar uma resposta, mas também para estabelecer critérios que posteriormente podem ser avaliados automaticamente.

---

### 7. Revisão dos casos de teste pelo próprio QA + IA

Podemos fornecer para a IA requisito + testes já criados. Isso é útil porque a IA passa a atuar como uma **segunda perspectiva de revisão**.

```text
Revise estes casos de teste.

Identifique:
1. cobertura insuficiente;
2. testes redundantes;
3. resultados esperados incorretos;
4. casos que não derivam do requisito;
5. cenários de fronteira ausentes;
6. ambiguidades.

Não reescreva os testes.
Primeiro apresente somente a análise.
```

### Execução automatizada

Esse conceito é demonstrado pelo teste `ai-test-review`, que valida se a IA fornece casos de teste deliberadamente problemáticos e verifica se a IA identifica regras que não estão apoiadas pelo requisito.

```bash
npx playwright test tests/ai-assisted/ai-test-review.spec.js
```

No resultado observado no arquivo`ai-test-review_20260902_151242.md`, ⚠ TODO

---

### 8. Verificação de aderência ao requisito

Além de gerar e revisar testes, podemos utilizar a IA para verificar se uma resposta permanece fiel ao requisito original.

```text
Analise o requisito abaixo.

1. Liste somente as regras explicitamente definidas.

2. Liste informações que NÃO estão especificadas e que não podem
   ser assumidas.

3. Não invente regras.

Para cada conclusão, explique sua origem.
```

### Execução automatizada

Esse conceito é demonstrado pelo teste `ai-requirement-adherence`, que valida se a IA diferencia informações explicitamente presentes no requisito, de informações não especificadas.

```bash
npx playwright test tests/ai-assisted/ai-requirement-adherence.spec.js
```

No resultado observado no arquivo `ai-requirement-adherence_20260902_144502.md`, a LLM fez corretamente a separação entre fato e lacuna do requisito:

* preservou as três informações realmente existentes no requisito, atendendo ao assertCoreRequirement();
* não transformou suposições em fatos, atendendo ao assertCoreRequirement();
* reconheceu lacunas mas não inventou regras, classificando informações como "não especificado".

---

### 9. Consistência

Outro aspecto importante é verificar se a IA mantém a mesma interpretação quando recebe a mesma solicitação mais de uma vez.

Consistência não significa respostas textualmente iguais. O objetivo é avaliar se a LLM mantém os mesmos critérios, fatos e restrições essenciais entre execuções.

### Execução automatizada

Esse conceito é demonstrado pelo teste `ai-consistency`, que valida se a IA mantém a mesma interpretação ao repetir a análise, comparando os pontos essenciais, em vez de exigir igualdade textual.

```bash
npx playwright test tests/ai-assisted/ai-consistency.spec.js
```

No resultado observado no arquivo `ai-consistency_20260902_114333.md`, a **Execução 1** identifica lacunas sem tentar definir o que "válido" significa.

A **Execução 2** identifica a mesma lacuna, mas depois tenta preenchê-la por inferência.

**Preenchimento por inferência** é quando a LLM encontra uma informação que não está escrita no requisito e tenta completá-la usando aquilo que considera provável ou comum.

Neste teste, o requisito diz apenas: *"Um usuário deve conseguir fazer login informando e-mail e senha válidos."*, mas não explica o que significa "válidos".

A LLM poderia simplesmente dizer: *"O requisito não especifica quais critérios determinam se o e-mail e a senha são válidos."*. Isso é consistente com o requisito.

Portanto, uma resposta pode ser aparentemente correta em uma execução e, em outra, ultrapassar uma restrição explícita do prompt.

---

## Ideia central

O objetivo não é provar que a IA é "inteligente". O objetivo é aprender a construir um processo em que:

```text
IA produz uma sugestão
        ↓
QA define critérios
        ↓
Evaluator verifica a saída
        ↓
QA analisa o resultado
        ↓
Decisão de qualidade
```

**A responsabilidade pela qualidade continua sendo do QA.**
