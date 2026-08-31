# AI-Assisted
**(Utilize o model `lmstudio-community/Qwen3-4B-Instruct-2507-GGUF)**

O objetivo do AI-Assisted Testing é usar a IA como assistente do QA, para aumentar produtividade e qualidade, não necessariamente testar a própria IA. Por exemplo:

* geração de cenários positivos
* geração de cenários negativos
* regras de negócio implícitas
* cenários de segurança
* cenários de integração
* identificação de riscos
* perguntas que deveriam ser esclarecidas com o PO

### Diferença fundamental

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

### O erro que queremos evitar

* Pensar: "a IA gerou os testes, então os testes estão corretos"

* Mentalidade correta: "a IA gerou **sugestões** de testes. Agora vou **avaliá-las como QA**"

A IA pode ajudar com ganho de produtividade em:

### 1. Análise de requisitos

Pergunte para a IA:
```
Com relação ao seguinte requisito:

"O usuário pode cancelar um pedido."

* identifique ambiguidades
* encontre regras implícitas
* sugira perguntas
* identifique cenários esquecidos
* transforme requisitos em critérios de aceite
```

Resposta:
> - Qualquer pedido pode ser cancelado? </br>
> - Existe prazo? </br>
> - Pedido já enviado pode ser cancelado? </br>
> - Existe cobrança? </br>
> - O cancelamento gera reembolso? </br>
> - O usuário recebe alguma notificação?

### 2. Geração de Casos de Teste
Você fornece para a IA:
```
Requisito
```

Resposta:
> Cenários </br>
> Pré-condições </br>
> Passos </br>
> Resultado esperado

### 3. Geração de Dados
```
- Gere 20 e-mails válidos e 20 e-mails inválidos para testes
- Gere dados para testar CPF, telefone, CEP e nome
```

---

### 1. Test Generation
Geração de casos de teste pela IA, a partir de um requisito. A IA não deve inventar regras de negócio que não estão presentes no requisito fornecido.

```bash
npx playwright test tests/ai-assisted/test-generation.spec.js
```
> Resposta em: `llm-results/ai-test-generation.spec.js`

### 2. Requirement Adherance
A IA deve respeitar o requisito fornecido, não extrapolando suas limitações,respeitando a fonte de verdade fornecida.

```bash
npx playwright test tests/ai-assisted/requirement-adherance.spec.js
```
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
> *Resposta em: llm-results/ai-consistency.spec.js*

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
