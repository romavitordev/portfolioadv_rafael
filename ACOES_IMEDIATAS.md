# Acoes Imediatas - Status Pos-Melhorias
## Site Rafael Pedroso Advocacia

Atualizado em: 27/05/2026

Este documento registra o que ja foi implementado no projeto e o que ainda precisa ser feito antes de publicar ou apresentar ao cliente.

---

## Implementado no Projeto

### 1. SEO tecnico basico
- [x] Meta description otimizada em `index.html`.
- [x] Keywords trabalhistas e locais adicionadas.
- [x] Canonical tag configurada com placeholder de dominio.
- [x] Open Graph e Twitter Card adicionados.
- [x] Schema `LegalService` em JSON-LD adicionado.
- [x] `sitemap.xml` criado com 8 URLs.
- [x] `robots.txt` criado bloqueando `/api/` e `/admin`.
- [x] Rotas Express para `/sitemap.xml` e `/robots.txt`.

Pendente:
- [ ] Trocar `https://www.seudominio.com/` pelo dominio real.
- [ ] Trocar `[CIDADE]`, `[CEP]`, `[ENDERECO_COMPLETO]`, `[EMAIL]`, `[NUMERO_OAB]` e telefones reais.
- [ ] Validar Schema no Rich Results Test do Google.
- [ ] Enviar sitemap no Google Search Console.

---

### 2. Conversao e confianca
- [x] CTA principal atualizado para "Agendar em 2 minutos".
- [x] Texto de retorno em ate 2 horas uteis no hero e no formulario.
- [x] Faixa de confianca com sigilo, atendimento online e analise documental.
- [x] Secao "Confianca" com sinais objetivos de seguranca, clareza e metodo.
- [x] Aviso de sigilo profissional antes do formulario.
- [x] Texto claro de que o formulario nao cria relacao advogado-cliente automaticamente.

Pendente:
- [ ] Confirmar com o advogado se o prazo "ate 2h uteis" e operacionalmente verdadeiro.
- [ ] Ajustar a cidade, endereco e mapa para os dados reais.
- [ ] Inserir foto profissional real para substituir placeholders.

---

### 3. Compliance e paginas legais
- [x] `privacy-policy.html` criado.
- [x] `terms.html` criado.
- [x] Links legais adicionados no footer.
- [x] Rotas Express adicionadas para politica e termos.
- [x] Checkbox LGPD mantido no formulario.

Pendente:
- [ ] Revisao juridica final da Politica de Privacidade.
- [ ] Revisao juridica final dos Termos de Uso.
- [ ] Confirmar periodo real de retencao de dados.
- [ ] Confirmar responsavel/controlador dos dados.

---

### 4. Comunicacao com o lead
- [x] E-mail interno para o escritorio mantido.
- [x] E-mail automatico de confirmacao para o cliente adicionado.
- [x] Template informa resumo, prazo de retorno, sigilo e aviso legal.

Pendente:
- [ ] Configurar SMTP real no `.env`.
- [ ] Testar envio real com conta de e-mail profissional.
- [ ] Inserir OAB real no template de e-mail.
- [ ] Decidir se havera copia para administrativo/secretaria.

---

## Acoes Externas Necessarias

### Google Business Profile
- [ ] Criar ou reivindicar perfil em `google.com/business`.
- [ ] Inserir endereco, telefone, horario e site real.
- [ ] Adicionar categoria principal: "Advogado trabalhista".
- [ ] Adicionar fotos profissionais.
- [ ] Publicar descricao com foco em Direito do Trabalho, rescisao, FGTS e atendimento online.

### Google Search Console
- [ ] Adicionar propriedade do dominio.
- [ ] Validar propriedade por DNS ou arquivo HTML.
- [ ] Enviar `/sitemap.xml`.
- [ ] Acompanhar indexacao e erros.

### Google Analytics 4
- [ ] Criar propriedade GA4.
- [ ] Adicionar tag ou Google Tag Manager.
- [ ] Configurar eventos:
  - `contact_form_submit`
  - `whatsapp_click`
  - `phone_click`
  - `email_click`

---

## Proximas Acoes Recomendadas

1. Substituir todos os placeholders por dados reais.
2. Instalar Node.js no ambiente local ou validar em ambiente com Node disponivel.
3. Rodar `npm install` e `npm start`.
4. Testar formulario com banco e SMTP reais.
5. Validar mobile em 375px, tablet e desktop.
6. Publicar em dominio com HTTPS.
7. Conectar Search Console e GA4.

---

## Observacao Etica Importante

Depoimentos promocionais foram mantidos fora da homepage. A secao criada usa sinais objetivos de confianca, sem prometer resultado e sem exploracao de casos de clientes, preservando uma postura mais segura para comunicacao juridica.
