
  ## ai-requirement-analysis
  2026-09-02, 15:12

  ### Prompt enviado à LLM
    

    Atue como um QA analisando requisitos.
    Analise:
    
    Um usuário deve conseguir fazer login informando
    e-mail e senha válidos.
  

    Identifique:
    1. ambiguidades do requisito;
    2. informações ausentes;
    3. perguntas que deveriam ser feitas ao PO/negócio antes de criar
       uma cobertura completa de testes.

    Não invente respostas para as perguntas.
    Queremos dúvidas, não suposições.
  

  ### Resposta da LLM
    Claro. Abaixo está a análise do requisito fornecido com foco em **QA**, seguindo exatamente o que foi solicitado:

---

### Requisito:
> Um usuário deve conseguir fazer login informando e-mail e senha válidos.

---

## 1. Ambiguidades do requisito

- **O que é "válido"?**  
  O termo "válidos" não está definido.  
  - O que significa um *e-mail válido*? (formato, domínio existente, etc.)  
  - O que significa uma *senha válida*? (tamanho mínimo, padrões de complexidade, uso de caracteres especiais?)  
  - O que acontece se o e-mail estiver registrado mas com senha inválida?  

- **"Conseguir fazer login"** é vago.  
  - Isso pode significar apenas a tela de login ser carregada?  
  - Ou realmente autenticar com sucesso (redirecionamento para painel, sucesso exibido)?  
  - O que acontece se houver falha na autenticação após validação do e-mail/senha?  

- **Falta especificar o fluxo de login.**  
  Não é claro se:
  - Há entrada de e-mail + senha em um único formulário.
  - A senha é solicitada apenas ao inserir o e-mail (ou vice-versa).
  - O sistema verifica a autenticação em tempo real ou após clique em "Entrar".

- **Ausência de contexto sobre erros.**  
  Não há menção ao comportamento em casos de erro, como:
  - E-mail não encontrado.
  - Senha incorreta.
  - E-mail inválido (ex: formato errado).
  - Condições de bloqueio ou tentativas falhas.

---

## 2. Informações ausentes

- **Formato do e-mail válido:**  
  Ex: `usuario@dominio.com`, deve ter ponto, @, domínio, etc.? Deve ser um domínio existente?

- **Regras de senha válida:**  
  - Tamanho mínimo? (ex: 6 dígitos?)  
  - Requer letras maiúsculas/minusculas? Números? Caracteres especiais?  
  - Pode conter espaços ou caracteres não permitidos?

- **Fonte da validação do usuário:**  
  O sistema valida o e-mail e senha no banco de dados, ou usa um serviço externo (ex: SSO, API)?

- **Sistema de autenticação utilizado:**  
  Ex: Login com hash, token JWT, autenticação via backend?

- **O que é considerado "login bem-sucedido"?**  
  - O usuário é redirecionado para a tela inicial?  
  - Há um alerta de sucesso?  
  - A sessão é iniciada e persiste?

- **Tempo esperado de resposta do sistema:**  
  Não há tempo limite ou expectativa de desempenho.

---

## 3. Perguntas que deveriam ser feitas ao PO/negócio antes de criar cobertura completa de testes

> (Sem suposições – apenas dúvidas)

1. **O que é considerado "e-mail válido"?**  
   - Ex: O sistema deve validar o formato do e-mail com regex?  
   - Deve verificar se o domínio existe?  

2. **Como é definido uma "senha válida" no contexto do negócio?**  
   - Há política de segurança interna (ex: 8 dígitos, maiúsculas, números)?  
   - A senha é exigida em formato específico ou pode ser qualquer string?

3. **O que acontece se o e-mail estiver registrado mas a senha estiver incorreta?**  
   - O sistema exibe erro claro?  
   - Há limite de tentativas (ex: bloqueio após 5 tentativas)?  

4. **Como é definido "conseguir fazer login"?**  
   - O usuário é redirecionado para a página principal após o login?  
   - Ou apenas a tela de login é carregada com sucesso?  

5.- O sistema permite que o usuário entre com e-mail e senha em um único campo, ou são campos separados (e-mail + senha)?  

6. **O que acontece se o e-mail não estiver registrado no sistema?**  
   - Isso deve ser tratado como erro de autenticação?  
   - O sistema deve mostrar uma mensagem clara?

7. **Quais são os cenários de erro esperados?**  
   - Ex: e-mail vazio, senha vazio, e-mail inválido (formato), senha incorreta.

8. **O login é feito por autenticação local ou com serviço externo (ex: Google, Microsoft)?**  

9. **Existem limites de tentativas de login?**  
   - O sistema bloqueia após X tentativas erradas?

10. **A validação do e-mail/senha ocorre em tempo real ou apenas ao clicar "Entrar"?**

---

✅ Essas perguntas são **dúvidas**, não suposições.  
Elas permitem que o QA (ou equipe técnica) se mantenha alinhado com a intenção do negócio, sem assumir comportamentos ou regras.

Sem essas respostas claras, qualquer cobertura de testes será parcial, ambígua e potencialmente falha em cenários reais.  

---

**Conclusão:**  
O requisito atual está **muito vago**, com múltiplas ambiguidades e lacunas críticas para um teste eficaz.  
Não é possível criar uma cobertura de testes robusta sem que essas dúvidas sejam respondidas pelo PO ou negócio.
  