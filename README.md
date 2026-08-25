# AI-Testing-Lab
Projeto com suíte de testes automatizados para uma aplicação que utiliza uma LLM.

```bash
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright install chromium
```

Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado;
* não inventa informações;
* segue instruções;
* mantém formato esperado;
* não revela informações indevidas;
* responde consistentemente;
* recusa solicitações inadequadas.

Criar um teste spec.js, contendo:
```bash
const { test, expect } = require('@playwright/test');

test('LLM deve responder a uma pergunta simples', async () => {
  const prompt = 'Qual é a capital do Brasil?';

  // Temporariamente simulamos a resposta do LLM
  const response = 'A capital do Brasil é Brasília.';

  expect(response).toContain('Brasília');
});
```

Execute `npm run test:playwright`, resultado: **1 passed**.

Agora vamos sair do mock e fazer o primeiro teste contra um LLM real:

1. Instale o SDK `npm install openai`. Esse pacote é apenas um cliente JavaScript para uma API compatível com OpenAI.

2. Vamos usar o LM Studio, ele oferece uma API compatível com OpenAI. Faça download em https://lmstudio.ai/download?utm_source=chatgpt.com

3. Baixe um modelo de agente: abra o LM Studio, menu lateral My Models, pesquise e baixe **Gemma4 E2B**. O `gemma-4-e2b` é uma versão pequena do Gemma 4, com suporte a texto, imagens, raciocínio e tool calling, e o LM Studio informa 4.41 GB como memória mínima do sistema. Ele também é otimizado para execução local em notebooks/dispositivos menores.

4. Após baixar, clique em Chats, selecione o model google/gemma-4-e2b, pergunte no chat "Qual é a capital do Brasil?" para validar que:

* o LM Studio está funcionando
* o modelo Gemma foi carregado corretamente
* conseguiu entender a pergunta e gerar uma resposta correta
* a execução foi local, sem precisar da API da OpenAI

Agora vamos começar criar testes para avaliar qualidade, consistência, tempo de resposta e comportamento diante de perguntas diferentes.








---

Objective

This project demonstrates practical QA techniques for applications powered by Large Language Models (LLMs).

Technologies
JavaScript
Playwright
Node.js
LLM API
REST API
GitHub Actions
Docker
Testing approach
Functional testing
API testing
LLM evaluation
RAG testing
Security testing
Prompt injection testing
UI automation

What is being evaluated
✓ Factuality
✓ Hallucination
✓ Consistency
✓ Robustness
✓ Grounding
✓ Prompt injection resistance
✓ API behavior

Limitations

LLM responses are non-deterministic;
exact text matching is often inappropriate;
LLM-as-a-judge can introduce bias;
evaluation criteria must be explicit;
some results require human review.
