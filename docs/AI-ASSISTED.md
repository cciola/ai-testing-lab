# 🧪 AI-Assisted Testing

## O que é

**AI-Assisted Testing** é o uso de IA como assistente nas atividades de QA. Nesse cenário, a IA **não é necessariamente o sistema que estamos testando**. Ela ajuda o QA a executar tarefas.

**Teste tradicional**

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

**AI-Assisted Testing**

```text
             ┌── IA sugere
             ├── IA analisa
QA ──────────┼── IA gera
             ├── IA revisa
             └── IA explica
                  ↓
             QA valida a saída
```

---

## O principal risco

A IA pode gerar uma resposta bem escrita, coerente, tecnicamente plausível, aparentemente completa, e ainda assim estar errada para aquele requisito.

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

## ✨ Como a IA ajuda o QA

### 1. Análise de requisitos

Um bom uso da IA é procurar informações que podem passar despercebidas.

Podemos perguntar:

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

---

### 2. Geração de casos de teste

Podemos fornecer um requisito e solicitar:

- cenários positivos;
- cenários negativos;
- fronteiras;
- pré-condições;
- entradas;
- resultados esperados.

Exemplo:

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

---

### 3. Geração de dados de teste

A IA também pode acelerar a criação de massa:

```text
- Gere 20 e-mails válidos e 20 e-mails inválidos para testes.

- Gere dados para testar os limites de uma senha que deve possuir
entre 8 e 20 caracteres.
```

Aqui o requisito precisa conter a regra de limite. Caso contrário, a IA pode inventar valores.

---

### 4. Geração de automação

Podemos solicitar código de teste:

```text
Crie um teste Playwright para validar login com e-mail e senha.
```

Mas o código gerado deve ser tratado como **código sugerido**.

O QA deve verificar:

- locator;
- sincronização;
- assertions;
- tratamento de erros;
- manutenção;
- dados utilizados;
- aderência ao padrão do projeto.

**Não copie** automaticamente um teste gerado pela IA para a suíte.

---

### 5. Debug e Code Review

A IA pode ajudar a investigar uma falha de automação.

Exemplo:

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

## 6. Prompt Engineering para QA

Um prompt útil normalmente contém:

```text
Contexto
+
Objetivo
+
Restrições
+
Entrada
+
Formato esperado
```

Exemplo:

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

Quanto mais claro for o critério, mais fácil será para o QA avaliar a resposta.

Uma técnica simples sobre como avaliar criticamente a saída da IA, é procurar a origem de cada afirmação.

```text
REQUISITO
   ↓
O que está explicitamente definido?
   ↓
O que não está definido?
   ↓
A IA adicionou alguma regra?
   ↓
Se adicionou, ela deixou claro que é uma suposição?
```

Essa habilidade é fundamental para AI-Assisted Testing.

---

### 7. Revisão dos casos de teste pelo próprio QA + IA

Podemos fornecer requisito + testes já criados:

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

Isso é útil porque a IA passa a atuar como uma **segunda perspectiva de revisão**.

---

## 🔎 O que os testes deste laboratório validam

Os testes em `tests/ai-assisted/` transformam esses conceitos em verificações automatizadas.

### Test generation

Avalia se a IA consegue gerar casos de teste sem transformar regras inexistentes em fatos.

```bash
npx playwright test tests/ai-assisted/ai-test-generation.spec.js
```

**Análise do resultado**: TODO

---

### Requirement adherance

Avalia se a IA diferencia informações explicitamente presentes no requisito, de informações não especificadas.

```bash
npx playwright test tests/ai-assisted/ai-requirement-adherence.spec.js
```

**Análise do resultado**: TODO

---

### Consistency
Executa a mesma solicitação duas vezes e compara os **pontos essenciais**, em vez de exigir igualdade textual.

Consistência não significa respostas textualmente iguais: o objetivo é avaliar se a LLM mantém os mesmos critérios, fatos e restrições essenciais entre execuções.

```bash
npx playwright test tests/ai-assisted/ai-consistency.spec.js
```

**Análise do resultado**: `ai-consistency_20260902_114333.md`

A Execução 1 identifica lacunas sem tentar definir o que "válido" significa.

A Execução 2 identifica a mesma lacuna, mas depois tenta preenchê-la por inferência. **Preenchimento por inferência** é quando a LLM encontra uma informação que não está escrita no requisito e tenta completá-la usando aquilo que ela considera provável ou comum.

Neste teste, o requisito diz apenas:

```text
Um usuário deve conseguir fazer login informando e-mail e senha válidos.
```

O requisito não explica o que significa "válidos". A LLM poderia simplesmente dizer:

```text
O requisito não especifica quais critérios determinam se o e-mail e a senha são válidos.
```

Isso sim é correto. Portanto, a LLM pode produzir uma análise aparentemente correta, mas em uma execução diferente, ultrapassar uma restrição explícita do prompt.

---

### Requirement analysis

Avalia se a IA identifica ambiguidades e transforma lacunas do requisito em perguntas para o negócio.

```bash
npx playwright test tests/ai-assisted/ai-requirement-analysis.spec.js
```

**Análise do resultado:** TODO

---

### Test review

Fornece casos de teste deliberadamente problemáticos e verifica se a IA identifica regras que não estão apoiadas pelo requisito.

```bash
npx playwright test tests/ai-assisted/ai-test-review.spec.js
```

**Análise do resultado:** TODO

---

## 🎯 Ideia central

O objetivo não é provar que a IA é "inteligente".

O objetivo é aprender a construir um processo em que:

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
