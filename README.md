# AI-Testing-Lab
Projeto de AI-Testing usando Playwright e MCP Server na aplicação [LM Studio](https://lmstudio.ai/download) (LLM local).

## 📋 Requisitos
* **MCP Server**
* **Playwright**
* **LM Studio**
    - modelo *Gemma 4 E2B* (Google)
    - modelo *Qwen3.5 4B GGUF* (Unsloth)

## 🛠 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/nome-do-projeto.git
```

2. Acesse o diretório do projeto:
```bash
cd nome-do-projeto
```

3. Instale as dependências necessárias:
```bash
npm install
```

## ⚙ Configurando do zero

Após criar o repositório, execute os comandos abaixo um por vez:
```bash
npm init -y
npm install -D @playwright/test
npx playwright install
npx playwright install chromium
```

O objetivo do AI-Testing é avaliar o comportamento de modelos de IA. Em sistemas de LLM, queremos validar propriedades da resposta, por exemplo:

* responde ao que foi solicitado;
* não inventa informações;
* segue instruções;
* mantém formato esperado;
* não revela informações indevidas;
* responde consistentemente;
* recusa solicitações inadequadas.

### 🎭 Teste com mock
O teste `llm-basic-mock.spec.js` faz uma pergunta no prompt e temporariamente simula a resposta do LLM.

### 🤖 Teste com LLM real (LM Studio)

Para fazer o teste contra um LLM real local, siga os passos abaixo:

1. Vamos usar o **LM Studio**, ele oferece uma API compatível com OpenAI. Faça download em https://lmstudio.ai/download

2. Abra o LM Studio, menu lateral **My Models**, pesquise e baixe os modelos:

* `google/gemma-4-e2b` (para os testes de **llm-api**) - o **Gemma4 E2B** é uma versão pequena do Gemma 4, modelo de IA leve do Google, que possui suporte a texto, imagens, raciocínio e tool calling, e o LM Studio informa 4.41GB como memória mínima do sistema. É otimizado para execução direta em dispositivos locais com menos recursos.

* `unsloth/Qwen3.5-4b-gguf` (para os testes de **ai-assisted**) - o **Qwen3.5 4B GGUF** é um modelo de inteligência artificial multimodal leve de peso livre, criado com cerca de 4 bilhões de parâmetros, e otimizado para rodar em computadores locais.

3. Após baixar, clique em **Chats**, selecione o model desejado

4. Pergunte no chat *Qual é a capital do Brasil?* (é comum uma demora no processamento das respostas). Vamos validar que:

- o LM Studio está funcionando
- o modelo Gemma foi carregado corretamente
- conseguiu entender a pergunta e gerar uma resposta correta
- a execução foi local, sem precisar da API da OpenAI

5. Deixe o modelo carregado e inicie o servidor local (menu **Developer**, alterar opção **Status** para *Running*).

6. O model e a URL local são configurados no arquivo `utils/llm-client.js`:

```javascript
const MODEL = 'gemma-4-e2b';
// const MODEL = 'unsloth/Qwen3.5-4b-gguf';
const BASE_URL = 'http://localhost:1234/v1';
```

## 🧪 Execução dos testes
O comando de execução segue o padrão `npx playwright test tests/<pasta>/<teste>.spec.js`, exemplo:
```bash
npx playwright test tests/llm-api/llm-basic.spec.js
```

### llm-api

- **llm-basic** - responder corretamente perguntas simples
- **llm-instruction** -  seguir uma instrução dada no prompt
- **llm-quality** - gerar respostas com qualidade, respeitando um formato
- **llm-robustness** - lidar com instruções conflitantes
- **llm-consistency** - mesma entrada, mesmo resultado
- **llm-hallucination** - informação que não existe
- **llm-prompt-injection** - resistência a tentativas de prompt injection

### ai-assisted

- **test-generation** - gerar casos de teste a partir de um requisito


## 📊 Pós execução dos testes

### Geração de relatório
Após a execução de um teste, em caso de falha, é gerado automaticamente um relatório HTML no diretório `test-results`, arquivo `index.html`.

Caso queira gerar o relatório manualmente, execute:
```bash
npx playwright show-report
```
