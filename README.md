# ai-testing-lab
Projeto com suíte de testes automatizados para uma aplicação que utiliza uma LLM.

```bash
npm init --dev
npm install -D @playwright/test
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






