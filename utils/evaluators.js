// Normaliza texto para que as avaliações não dependam de maiúsculas,acentuação ou diferenças simples de espaçamento.
function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(text, terms) {
  const value = normalize(text);
  return terms.some(term => value.includes(normalize(term)));
}

function sentenceList(text) {
  return text
    .replace(/\r/g, '')
    .split(/(?<=[.!?])\s+|\n+/)
    .map(sentence => sentence.trim())
    .filter(Boolean);
}

const UNSUPPORTED_RULES = [
  '6 caracteres',
  '8 caracteres',
  '3 tentativas',
  '5 tentativas',
  'minimo de 8',
  'minimo 8',
  'maximo de',
  'dashboard',
  'captcha',
  '2fa',
  'dois fatores',
  'autenticacao de dois fatores',
  'conta bloqueada',
  'bloqueio da conta',
  'forca bruta',
  'senha forte',
  'senha fraca',
  'mensagem de erro',
  'campo obrigatorio',
  'e-mail obrigatorio',
  'email obrigatorio',
  'senha obrigatoria',
  'formato do e-mail',
  'formato do email',
  'expiracao da senha',
  'expira',
  'sessao ativa',
  'cookies'
];

const NEGATION_MARKERS = [
  'nao especific',
  'nao informado',
  'nao informada',
  'nao definido',
  'nao definida',
  'nao foi informado',
  'nao foi definida',
  'nao podemos inferir',
  'nao e possivel inferir',
  'nao ha informacao',
  'nao consta',
  'nao mencionado',
  'nao mencionada',
  'nao invent',
  'fora do requisito',
  'nao esta especificado',
  'nao esta especificada'
];

// Identifica frases que representam perguntas.
// Uma pergunta sobre uma regra não especificada não significa que a LLM   esteja afirmando que essa regra existe.
//
// Exemplo:
// "Há necessidade de 2FA?" -> pergunta, não violação.
// "O sistema exige 2FA."   -> afirmação, possível violação.
function isQuestion(sentence) {
  const normalizedSentence = normalize(sentence);

  return (
    normalizedSentence.includes('?') ||
    /^(ha|existe|existem|e necessario|e necessaria|precisa|precisamos|deve|devemos|sera que|pode|podera)\b/.test(
      normalizedSentence
    )
  );
}

// Procura regras que não aparecem no requisito e que foram apresentadas pela LLM como se fossem fatos. Frases que explicitamente negam a regra ou que apenas fazem perguntas sobre ela são ignoradas para reduzir falsos positivos.
function findUnsupportedClaims(response) {
  const violations = [];

  for (const sentence of sentenceList(response)) {
    const normalizedSentence = normalize(sentence);

    // Perguntas sobre regras não especificadas não são consideradas afirmações de que a regra existe.
    if (isQuestion(sentence)) {
      continue;
    }

    for (const rule of UNSUPPORTED_RULES) {
      if (normalizedSentence.includes(normalize(rule))) {
        const isExplicitlyRejected = NEGATION_MARKERS.some(marker =>
          normalizedSentence.includes(normalize(marker))
        );

        if (!isExplicitlyRejected) {
          violations.push(sentence);
          break;
        }
      }
    }
  }

  return [...new Set(violations)];
}

function assertCoreRequirement(expect, response) {
  const value = normalize(response);

  expect(value, 'A resposta não menciona login.').toContain('login');
  expect(value, 'A resposta não menciona e-mail/email.').toMatch(/e-mail|email/);
  expect(value, 'A resposta não menciona senha.').toContain('senha');
}

// Cria uma assinatura semântica simples dos pontos essenciais.
// A intenção é comparar o conteúdo relevante entre execuções sem exigir que a LLM produza exatamente as mesmas palavras.

// Mantemos somente os elementos fundamentais do requisito.
// Não usamos classificações como "positivo", "negativo" ou "restrição", pois elas podem variar entre respostas sem representar mudança semântica.
function buildRequirementSignature(response) {
  const value = normalize(response);

  return {
    login: value.includes('login'),
    email: /e-mail|email/.test(value),
    senha: value.includes('senha'),
    validos:
      value.includes('valid') ||
      value.includes('corret')
  };
}

module.exports = {
  normalize,
  hasAny,
  assertCoreRequirement,
  findUnsupportedClaims,
  buildRequirementSignature,
  isQuestion
};
