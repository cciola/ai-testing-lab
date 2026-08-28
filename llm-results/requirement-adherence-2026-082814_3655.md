O requisito apresentado é:

> "Um usuário deve conseguir fazer login informando e-mail e senha válidos."

---

### **Regras de negócio explicitamente definidas:**

1. **O sistema permite que um usuário faça login**  
   → O ato de fazer login é possível, desde que as informações sejam válidas.

2. **Para realizar o login, o usuário deve informar um e-mail válido**  
   → A validade do e-mail é um requisito para o login ser possível.

3. **Para realizar o login, o usuário deve informar uma senha válida**  
   → A validade da senha é um requisito para o login ser possível.

---

### **Casos de teste (baseados somente no requisito):**

1. **E-mail e senha válidos: login bem-sucedido**  
   - Entrada: e-mail válido, senha válida  
   - Expectativa: o usuário deve conseguir fazer login com sucesso.

2. **E-mail inválido → login não deve ser permitido**  
   - Entrada: e-mail inválido (ex: formato incorreto, ausência de @, etc.), senha válida  
   - Expectativa: o sistema deve impedir o login.

3. **Senha inválida → login não deve ser permitido**  
   - Entrada: e-mail válido, senha inválida (ex: senha errada, vazia)  
   - Expectativa: o sistema deve impedir o login.

> ✅ Observação: O requisito **não especifica** se há limites de tentativas, tempo de validade, políticas de segurança, mensagens de erro ou regras sobre o formato exato dos dados (como tamanho do e-mail/senha). Portanto, esses elementos **não são incluídos** nos casos de teste.

---

### ✅ Casos de teste gerados com base apenas no requisito:

| Cenário | Entradas | Resultado Esperado |
|--------|---------|-------------------|
| 1 | E-mail válido, senha válida | Login bem-sucedido |
| 2 | E-mail inválido (ex: sem @), senha válida | Login não permitido |
| 3 | E-mail válido, senha inválida (ex: errada) | Login não permitido |

---

### ✅ Conclusão:

- As **regras de negócio** explicitamente definidas são:
  - O login só é possível com e-mail e senha válidos.
  - O sistema deve permitir o login se ambos os campos forem válidos.

- Os casos de teste estão totalmente alinhados ao requisito, sem suposições ou criação de regras adicionais.