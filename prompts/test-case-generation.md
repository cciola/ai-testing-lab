# Prompt — Geração de casos de teste

Use este prompt como modelo para pedir à IA que gere casos de teste a partir de um requisito.

```text
Atue como um QA.

Gere casos de teste para o requisito abaixo.

Inclua:
- cenário;
- entrada;
- resultado esperado.

Inclua cenários positivos e negativos somente quando forem justificáveis pelo requisito.

Não invente regras, limites, mensagens, telas, redirecionamentos ou comportamentos que não estejam no requisito.
Quando uma informação necessária não estiver especificada, escreva "NÃO ESPECIFICADO".

Requisito:
[INSIRA O REQUISITO]
```

## O que o QA deve avaliar

Depois da resposta, verifique:

- os testes realmente derivam do requisito?
- a IA criou regras que não existem?
- alguma informação ausente foi tratada como fato?
- existem cenários importantes que ficaram de fora?
- o resultado esperado é verificável?
