# Prompt — Avaliação de uma resposta de IA

Use este modelo quando quiser pedir uma avaliação estruturada de uma resposta gerada por uma LLM.

```text
Avalie a resposta abaixo com base no contexto fornecido.

Contexto:
[INSIRA O CONTEXTO]

Critérios:
1. aderência ao contexto;
2. atendimento à instrução;
3. informações inventadas ou sem fundamentação;
4. omissões relevantes;
5. formato solicitado.

Para cada critério, informe:
- PASS ou FAIL;
- justificativa objetiva.

Não introduza informações que não estejam no contexto.

Resposta da IA:
[INSIRA A RESPOSTA]
```

> Este prompt representa o conceito de **LLM-as-a-judge**, mas o julgamento produzido por outra LLM também precisa ser validado. Para os primeiros testes do laboratório, preferimos evaluators determinísticos sempre que possível.
