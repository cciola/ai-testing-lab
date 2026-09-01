const fs = require('fs');
const path = require('path');

// Persiste o prompt enviado e a saída bruta da LLM para permitir análise posterior de uma execução
async function saveResponse(response, fileName, prompt) {
  const outputDir = path.join(process.cwd(), 'llm-results');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const now = new Date();

  const timestamp =
    `${now.getFullYear()}` +
    `${String(now.getMonth() + 1).padStart(2, '0')}` +
    `${String(now.getDate()).padStart(2, '0')}_` +
    `${String(now.getHours()).padStart(2, '0')}` +
    `${String(now.getMinutes()).padStart(2, '0')}` +
    `${String(now.getSeconds()).padStart(2, '0')}`;

  const filePath = path.join(
    outputDir,
    `${fileName}_${timestamp}.md`
  );

  const content = `# ${fileName}

## Prompt enviado à LLM

\`\`\`text
${prompt}
\`\`\`

## Resposta da LLM

${response}
`;

  // Cada execução recebe timestamp para evitar que uma resposta sobrescreva outra
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`Resultado salvo em: ${filePath}`);
}

module.exports = { saveResponse };
