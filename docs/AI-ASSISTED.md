# 🧪 AI-Assisted

O objetivo do AI-Assisted Testing é usar a IA como assistente do QA, para aumentar produtividade e qualidade, não necessariamente testar a própria IA. Por exemplo:

* geração de cenários positivos
* geração de cenários negativos
* regras de negócio implícitas
* cenários de segurança
* cenários de integração
* identificação de riscos
* perguntas que deveriam ser esclarecidas com o PO

## Diferença fundamental

**Teste tradicional**
```
QA → Analisa requisito → Cria testes → Implementa → Executa → Analisa resultado
```

**AI-Assisted Tetsting**
```
        ┌── IA sugere
QA ─────┼── IA analisa
        ├── IA gera
        └── IA explica
```

## O erro que queremos evitar

- Pensar "a IA gerou os testes, então os testes estão corretos"
- Mentalidade correta: "a IA gerou **sugestões** de testes. Agora vou **avaliá-las como QA**"

## Ganho de produtividade

### 1. Análise de requisitos

Pergunte para a IA:
```
Com relação ao seguinte requisito:

"O usuário pode cancelar um pedido."

- identifique ambiguidades
- encontre regras implícitas
- sugira perguntas
- identifique cenários esquecidos
- transforme requisitos em critérios de aceite
```

Resposta:
> - Qualquer pedido pode ser cancelado? </br>
> - Existe prazo? </br>
> - Pedido já enviado pode ser cancelado? </br>
> - Existe cobrança? </br>
> - O cancelamento gera reembolso? </br>
> - O usuário recebe alguma notificação?

### 2. Geração de Casos de Teste

Você fornece o **requisito** para a IA, e tem como resposta:
> - Cenários </br>
> - Pré-condições </br>
> - Passos </br>
> - Resultado esperado

### 3. Geração de Dados

Geração de massa de dados válidos/inválidos/valores limite para os testes:
```
- Gere 20 e-mails válidos e 20 e-mails inválidos para testes
- Gere dados para testar CPF, telefone, CEP e nome
- Gere dados para testar os limites da regra de senha (deve possuir entre 8 e 20 caracteres)
```

### 4. Geração de automação
Geração de código:
```
Crie um teste Playwright para validar o login com usuário e senha.
```

### 5. Debug / Code Review

Você fornece o erro da automação + código + contexto, e a IA pode ajudar a identificar:

- timeout
- locator incorreto
- race condition
- elemento invisível
- problema de espera
- problema de ambiente

```
Erro:
Timeout 30000ms exceeded.

Código:
await page.getByTestId('btn-login').click();

Contexto:
O botão aparece visualmente na tela,
mas o teste não consegue clicar.

Analise este erro como um especialista em Playwright.

Apresente:
1. possíveis causas
2. como investigar cada causa
3. correções possíveis

Não altere o código ainda.
```

O intuito é **entender** o problema, não apenas receber código.

Também é possível solicitar **Code Review**.

## Onde NÃO confiar na IA

- A IA pode produzir uma resposta bem escrita, coerente e tecnicamente plausível, e ainda assim estar errada
- Código aparentemente correto

Sempre questione:
1. Isso veio do requisito?
2. Isso veio do código?
3. Isso é conhecimento geral?
4. Ou a IA simplesmente assumiu?

## Prompt Engineering para QA

Forneça contexto suficiente para a IA trabalhar corretamente:

```
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

```bash
Atue como um QA especialista em aplicações web.     # quem a IA deve ser (QA)

Analise o requisito abaixo:                         # qual informação utilizar (requisito)

"O usuário deve conseguir realizar
login utilizando e-mail e senha válidos."

Gere:                                              # o que deve fazer (gerar testes)
- cenários positivos
- cenários negativos
- cenários de fronteira

Não invente regras.                                # o que não fazer (inventar regras)
Caso alguma informação esteja ausente,
liste-a como dúvida.

Apresente o resultado em uma tabela contendo:      # como responder (tabela)
ID | Cenário | Resultado esperado
```

## Análise dos casos de teste gerados a partir de requisitos
Parq o requisito:
```
- O sistema deve permitir que o usuário faça login utilizando e-mail e senha.
- Após três tentativas inválidas, o acesso deve ser bloqueado.
```

Peça para a IA:
```
Gere casos de teste para este requisito.

Classifique cada caso como:
- positivo
- negativo
- fronteira
- segurança

Não invente regras adicionais.
```

Teremos algo semelhante a:

> **Tipo - Cenário** </br>
> Positivo - Login válido </br>
> Negativo - E-mail inválido </br>
> Negativo - Senha inválida </br>
> Negativo - Campos vazios </br>
> Fronteira - 3 tentativas inválidas </br>
> Segurança - Conta bloqueada após 3 tentativas

Então, se pergunte: "a IA esqueceu alguma coisa?", e questione a IA:
```
O que acontece na quarta tentativa?
```

## Revisão dos casos de teste elaborados pelo QA

Peça para a IA revisar seus testes, fornecendo **requisito + seus casos de teste**:

```
Revise estes casos de teste.

Identifique:
1. cobertura insuficiente
2. testes redundantes
3. resultados esperados incorretos
4. casos que não derivam do requisito
5. cenários de fronteira ausentes
6. ambiguidades

Não altere os testes ainda.
Primeiro apresente somente a análise.
```

Isso inclusive evita que a IA reescreva tudo.

## Como identificar Hallucination
No Hallucination, a IA apresenta uma informação **falsa** ou **não fundamentada** como se fosse verdadeira.

No AI-Assisted Testing isso pode aparecer como:

- **Regras inventadas** ("o sistema deve enviar e-mail", mas o requisito nunca mencionou isso)
- **APIs inventadas** (`await page.loginAsAdmin();`, mas essa função não existe)
- **Seletores inventados** (`page.getByTestId('user-profile')`, mas esse data-testid não existe)
- **Comportamentos inventados** ("após três erros o sistema apresenta um CAPTCHA", mas ninguém disse isso)

Uma técnica muito boa para combater é pedir:

```
- Para cada conclusão apresentada, indique qual informação fornecida no contexto a sustenta.
- Se não houver informação suficiente, responda "não informado".
```

Isso força a IA a separar **FATO** de **SUPOSIÇÃO**.

---

## ▶ Cenários automatizados
**Utilize o model** `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF`

### 1. Test Generation
Geração de casos de teste pela IA, a partir de um requisito. A IA não deve inventar regras de negócio que não estão presentes no requisito fornecido.

```bash
npx playwright test tests/ai-assisted/test-generation.spec.js
```
> Prompt: </br>
> *Gere casos de teste para o seguinte requisito:* </br>
>
> *Um usuário deve conseguir fazer login informando e-mail e senha válidos.* </br>
>
> *Inclua cenários positivos e negativos.* </br>
> *Apresente os casos de teste de forma clara.* </br>
>
> Resposta em: `llm-results/ai-test-generation.spec.js`

### 2. Requirement Adherance
A IA deve respeitar o requisito fornecido, não extrapolando suas limitações,respeitando a fonte de verdade fornecida.

```bash
npx playwright test tests/ai-assisted/requirement-adherance.spec.js
```
> Prompt: </br>
> *Analise o requisito abaixo e identifique quais regras de negócio estão explicitamente definidas.*
>
> *Gere casos de teste somente com base nas informações presentes no requisito.*
>
> *Não invente regras, valores, mensagens, limites, políticas de segurança ou comportamentos que não estejam especificados.*
>
> *Requisito:* </br>
> *Um usuário deve conseguir fazer login informando e-mail e senha válidos.*
>
> *Resposta em: llm-results/ai-requirement-adherance.spec.js*

Na resposta, a IA identificou corretamente que o requisito só define:
*login com e-mail e senha válidos*

E explicitamente reconheceu que não temos informação suficiente sobre:
- tamanho da senha
- formato exato do e-mail
- mensagens de erro
- limite de tentativas
- 2FA
- política de segurança

Isso é um comportamento que queremos de uma IA em um cenário de QA.

Mas encontramos um problema interessante:

- ela primeiro disse *válidos*: isso que o e-mail deve seguir o formato esperado
- depois disso *a senha deve atender aos critérios de validade (como tamanho mínimo...)*

Isso é uma inferência. Depois ela mesma se corrige: *não podemos inferir regras adicionais*.

Então temos uma resposta que termina corretamente, mas contém uma contradição interna.

### 3. Consistency
A IA deve manter a mesma resposta essencial, quando fazemos a mesma pergunta duas vezes.

Neste teste não estamos exigindo que as duas respostas sejam idênticas; queremos verificar consistência sem exigir igualdade textual.

```bash
npx playwright test tests/ai-assisted/consistency.spec.js
```
> Prompt: </br>
> *Analise o seguinte requisito:*
>
> *Um usuário deve conseguir fazer login informando e-mail e senha válidos.*
>
> *Liste os principais cenários de teste que podem ser derivados exclusivamente desse requisito.*
>
> *Não invente regras que não estejam especificadas.*
>
> *Resposta em: llm-results/ai-consistency.spec.js*
