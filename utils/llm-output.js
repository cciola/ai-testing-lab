const fs = require('fs');
const path = require('path');

// Persiste o prompt enviado e a saída bruta da LLM para permitir análise posterior de uma execução
async function saveResponse(response, fileName, prompt) {
  const outputDir = path.join(process.cwd(), 'llm-results');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const now = new Date();
  const ano = `${now.getFullYear()}`;
  const mes = `${String(now.getMonth() + 1).padStart(2, '0')}`;
  const dia = `${String(now.getDate()).padStart(2, '0')}`;
  const hora = `${String(now.getHours()).padStart(2, '0')}`;
  const minuto = `${String(now.getMinutes()).padStart(2, '0')}`;
  const segundo = `${String(now.getSeconds()).padStart(2, '0')}`;

  const timestamp = `${ano}${mes}${dia}_${hora}${minuto}${segundo}`;

  const filePath = path.join(
    outputDir,
    `${fileName}_${timestamp}.md`
  );

  const content = `
  ## ${fileName}
  ${ano}-${mes}-${dia}, ${hora}:${minuto}

  ### Prompt enviado à LLM
    ${prompt}

  ### Resposta da LLM
    ${response}
  `;

  // Cada execução recebe timestamp para evitar que uma resposta sobrescreva outra
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`Resultado salvo em: ${filePath}`);
}

module.exports = { saveResponse };
