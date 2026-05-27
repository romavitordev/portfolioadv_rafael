# Checklist de Qualidade - Site Rafael Pedroso
## Status pos-melhorias

Atualizado em: 27/05/2026

Legenda:
- [x] Implementado no codigo.
- [ ] Pendente.
- [~] Parcial ou depende de dados/ambiente real.

---

## SEO

- [x] Meta description principal otimizada.
- [x] Title com foco em advogado trabalhista e cidade.
- [x] Keywords adicionadas.
- [x] Canonical tag adicionada.
- [x] Open Graph configurado.
- [x] Twitter Card configurado.
- [x] Schema JSON-LD `LegalService`.
- [x] `sitemap.xml` criado.
- [x] `robots.txt` criado.
- [x] Rotas Express para sitemap e robots.
- [~] URLs usam dominio placeholder.
- [ ] Validar Schema em ferramenta do Google.
- [ ] Enviar sitemap ao Search Console.
- [ ] Configurar Google Business Profile.
- [ ] Instalar GA4/GTM.

---

## Conversao

- [x] CTA principal acima da dobra.
- [x] CTA "Agendar em 2 minutos".
- [x] WhatsApp flutuante.
- [x] CTA intermediario em faixa laranja.
- [x] Formulario com mensagem de sucesso e erro.
- [x] Fallback para WhatsApp se formulario falhar.
- [x] Aviso de retorno em ate 2h uteis.
- [x] Secao de confianca com sigilo, clareza e metodo.
- [~] Promessa de 2h depende de capacidade real de atendimento.
- [ ] Medir cliques em CTA.
- [ ] Medir cliques no WhatsApp.
- [ ] Teste A/B de textos de CTA.

---

## Compliance e LGPD

- [x] Checkbox de consentimento LGPD no formulario.
- [x] Aviso de sigilo profissional antes do formulario.
- [x] Aviso de que formulario nao cria relacao advogado-cliente.
- [x] Politica de Privacidade criada.
- [x] Termos de Uso criados.
- [x] Links legais no footer.
- [x] E-mail de confirmacao com aviso de sigilo e relacao advogado-cliente.
- [~] Textos legais precisam de revisao juridica final.
- [~] Dados do controlador/e-mail/OAB ainda estao como placeholders.
- [ ] Definir politica de cookies apos instalar analytics.

---

## Funcionalidades

### Frontend
- [x] Landing page responsiva.
- [x] Tema claro/escuro.
- [x] Navegacao por secoes.
- [x] Bottom nav mobile.
- [x] Formulario com honeypot.
- [x] Links para politicas legais.
- [~] Fotos profissionais ainda sao placeholders.
- [~] Mapa/endereco precisam de dados reais.

### Backend
- [x] API Express estruturada.
- [x] Rate limit geral.
- [x] Rate limit para contatos.
- [x] Validacao de entrada.
- [x] Prepared statements via `mssql`.
- [x] E-mail interno para lead.
- [x] E-mail automatico para cliente.
- [~] Teste real depende de Node, banco e SMTP configurados.

---

## Etica e Comunicacao Juridica

- [x] Sem promessa de resultado no footer e textos legais.
- [x] Secao de confianca sem depoimentos promocionais.
- [x] Linguagem de "analise", "orientacao" e "possibilidades".
- [x] Rota de depoimentos permanece interna/admin.
- [ ] Revisao final conforme regras aplicaveis da OAB.

---

## Performance e Mobile

- [x] Layout responsivo.
- [x] Iframe do mapa com `loading="lazy"`.
- [x] Imagens placeholders nao pesam.
- [~] Fontes externas e Bootstrap via CDN.
- [ ] Otimizar imagens reais quando forem adicionadas.
- [ ] Testar PageSpeed com site publicado.
- [ ] Testar em 375px, 768px e desktop.
- [ ] Verificar Core Web Vitals em producao.

---

## Pre-lancamento

- [ ] Trocar todos os placeholders.
- [ ] Instalar Node.js ou validar em ambiente com Node.
- [ ] Rodar `npm install`.
- [ ] Rodar `npm start`.
- [ ] Testar `/`, `/privacy-policy.html`, `/terms.html`, `/sitemap.xml`, `/robots.txt`.
- [ ] Testar envio de formulario.
- [ ] Testar e-mail interno e e-mail ao cliente.
- [ ] Testar banco de dados.
- [ ] Publicar com HTTPS.
- [ ] Configurar Search Console.
- [ ] Configurar GA4/GTM.

---

## Pontuacao Atual Estimada

Score tecnico antes da publicacao: 70-75%.

Motivo: a base de SEO, compliance e conversao ja foi implementada, mas ainda faltam dados reais, validacao em ambiente com Node, publicacao, analytics e testes de producao.

Status: bom para evoluir; ainda nao pronto para lancamento publico sem substituir placeholders e testar o ambiente real.
