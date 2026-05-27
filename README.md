# Rafael Pedroso Advocacia

Site institucional para advogado, com landing page responsiva, API Node/Express e banco SQL Server para captacao organizada de contatos.

## Estado atual

O projeto ja possui uma primeira rodada de melhorias aplicada:

- SEO on-page com title, description, keywords, canonical, Open Graph e Twitter Card.
- Schema JSON-LD `LegalService`.
- `sitemap.xml` e `robots.txt`.
- Politica de Privacidade e Termos de Uso.
- CTA principal mais claro.
- Faixa e secao de confianca com sigilo, atendimento online e metodo de analise.
- Aviso de sigilo profissional antes do formulario.
- Formulario com validacao, honeypot anti-spam, consentimento LGPD e fallback para WhatsApp.
- E-mail automatico de confirmacao para o lead quando SMTP estiver configurado.
- Rotas administrativas protegidas por `ADMIN_API_KEY`.
- Rate limit para reduzir spam e abuso.
- Schema SQL com campos de origem, modalidade e consentimento.

## Configuracao local

1. Instale as dependencias:

```bash
npm install
```

2. Crie o arquivo `.env` a partir do exemplo:

```bash
copy env.example.txt .env
```

3. Configure no `.env`:

- `DB_SERVER`, `DB_USER`, `DB_PASSWORD`
- `ADMIN_API_KEY`
- `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`, `EMAIL_TO`, se quiser receber e-mails
- `FRONTEND_URL` com o dominio final em producao

4. Execute o `schema.sql` no SQL Server.

5. Inicie o servidor:

```bash
npm start
```

O site ficara em `http://localhost:3001` e a API em `http://localhost:3001/api`.

## Rotas principais

- `GET /`: landing page.
- `GET /privacy-policy.html`: Politica de Privacidade.
- `GET /terms.html`: Termos de Uso.
- `GET /sitemap.xml`: sitemap para buscadores.
- `GET /robots.txt`: regras de rastreamento.
- `POST /api/contatos`: recebe leads do formulario publico.
- `GET /api/health`: verifica se a API esta respondendo.
- `GET /api/contatos`: rota interna, exige header `x-admin-key`.
- `GET /api/agendamentos`: rota interna, exige header `x-admin-key`.
- `GET /api/depoimentos`: rota interna, exige header `x-admin-key`.

## Personalizacao obrigatoria

Antes de publicar, substitua:

- `[NUMERO_OAB]`
- `[CIDADE]`
- `[ENDERECO_COMPLETO]`
- `[CEP]`
- `[WHATSAPP_NUMBER]`
- `[TELEFONE_SEM_FORMATACAO]`
- `[DDD]`
- `[NUMERO]`
- `[EMAIL]`
- `[INSTAGRAM]`
- `https://www.seudominio.com/`

Tambem ajuste o mapa, telefone, e-mail, dominio, fotos profissionais e dados do Schema.

## Publicacao

Antes de colocar no ar:

- Validar o site em ambiente com Node.js instalado.
- Testar banco SQL Server.
- Testar SMTP real.
- Publicar com HTTPS.
- Validar `sitemap.xml` e `robots.txt`.
- Enviar sitemap ao Google Search Console.
- Configurar GA4 ou Google Tag Manager.
- Validar Schema no Rich Results Test.

## Publicidade na advocacia

O front foi ajustado para evitar promessas de resultado, linguagem apelativa e depoimentos promocionais. A secao de confianca usa sinais objetivos como sigilo, clareza e metodo de atendimento.

Antes de publicar, confirme OAB, cidade, telefone, endereco, politica de privacidade, termos de uso e qualificacoes reais do advogado.

## Documentos de apoio

- `ACOES_IMEDIATAS.md`: status do que foi implementado e proximos passos.
- `ANALISE_MELHORIAS.md`: analise profissional atualizada.
- `CHECKLIST_QUALIDADE.md`: checklist de qualidade pos-melhorias.
- `COMPARATIVO_CONCORRENTES.md`: comparativo atualizado com concorrentes.
- `PITCH_CLIENTE.md`: proposta atualizada para apresentacao ao cliente.
