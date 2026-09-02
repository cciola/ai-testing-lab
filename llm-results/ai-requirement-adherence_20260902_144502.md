
  ## ai-requirement-adherence
  2026-09-02, 14:45

  ### Prompt enviado à LLM
    
    Analise o requisito abaixo.

    1. Liste somente as regras explicitamente definidas.
    2. Liste informações que NÃO estão especificadas e que não podem
       ser assumidas.
    3. Não invente regras.

    Para cada conclusão, diferencie claramente:
    - DEFINIDO NO REQUISITO
    - NÃO ESPECIFICADO

    Requisito:
    
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  
  

  ### Resposta da LLM
    **Requisito:**  
"Um usuário deve conseguir fazer login informando e-mail e senha válidos."

---

### 1. Regras explicitamente definidas (DEFINIDO NO REQUISITO)

- O usuário deve conseguir fazer login.  
  → DEFINIDO NO REQUISITO

- O login é feito informando um e-mail e uma senha.  
  → DEFINIDO NO REQUISITO

- Os e-mail e a senha devem ser "válidos".  
  → DEFINIDO NO REQUISITO

---

### 2. Informações que NÃO estão especificadas (NÃO ESPECIFICADO)

- O que significa "válido" para o e-mail? (ex: formato, domínio, existência de registro?)  
  → NÃO ESPECIFICADO

- O que significa "válida" para a senha? (ex: comprimento mínimo, complexidade, regras de criptografia?)  
  → NÃO ESPECIFICADO

- A validade do e-mail e da senha é verificada em tempo real ou apenas ao tentar login?  
  → NÃO ESPECIFICADO

- O sistema deve validar o usuário com base em um banco de dados, um serviço externo ou outro mecanismo?  
  → NÃO ESPECIFICADO

- A autenticação ocorre apenas com e-mail e senha, ou podem ser usados outros métodos (ex: biometria, código de confirmação)?  
  → NÃO ESPECIFICADO

- O login é bem-sucedido quando o usuário está ativo, ou mesmo se estiver inativo?  
  → NÃO ESPECIFICADO

- Há limites no número de tentativas de login (ex: bloqueio após 5 tentativas)?  
  → NÃO ESPECIFICADO

- A validade do e-mail e da senha é baseada em uma política de segurança interna ou em regras externas?  
  → NÃO ESPECIFICADO

---

### Resumo final com diferenciação:

| Item | Tipo |
|------|------|
| O usuário deve conseguir fazer login. | DEFINIDO NO REQUISITO |
| O login é feito informando e-mail e senha. | DEFINIDO NO REQUISITO |
| Os e-mail e a senha devem ser válidos. | DEFINIDO NO REQUISITO |
| O que significa "válido" para o e-mail? | NÃO ESPECIFICADO |
| O que significa "válida" para a senha? | NÃO ESPECIFICADO |
| A validação ocorre em tempo real ou apenas no login? | NÃO ESPECIFICADO |
| A autenticação depende de um banco de dados, serviço externo etc.? | NÃO ESPECIFICADO |
| Outros métodos de login (ex: biometria) são permitidos? | NÃO ESPECIFICADO |
| O usuário deve estar ativo para logar? | NÃO ESPECIFICADO |
| Há limite de tentativas de login? | NÃO ESPECIFICADO |
| A validade do e-mail/senha é baseada em regras internas ou externas? | NÃO ESPECIFICO |

✅ Não foram inventadas regras.  
✅ Todas as conclusões são baseadas apenas no texto fornecido.
  