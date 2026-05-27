# Rafael Pedroso Advocacia — Sistema de Atendimento e Captação

Este projeto representa a minha visão de uma advocacia moderna: **técnica, transparente e digital**. Desenvolvi este sistema não apenas como um site, mas como uma ferramenta estratégica para organizar o meu atendimento, garantir a privacidade dos meus clientes e estabelecer uma presença digital de alta autoridade.

---

## 🏛️ Como o Sistema Funciona

O sistema foi construído sobre três pilares fundamentais que guiam a minha atuação:

### 1. Experiência do Cliente (Frontend)
A interface foi desenhada para transmitir sobriedade e confiança. Utilizo uma **Landing Page de Alta Conversão** com:
- **Design Cinematográfico**: Transições suaves e micro-interações que elevam a percepção de valor.
- **Foco em Segurança**: Avisos claros de conformidade com a LGPD e sigilo profissional antes de qualquer coleta de dados.
- **Acessibilidade e Rapidez**: Otimizado para dispositivos móveis e com carregamento ultra-rápido.

### 2. Inteligência de Captação (API Backend)
Por trás da interface, existe um motor em **Node.js/Express** que processa cada contato:
- **Triagem Inteligente**: O formulário coleta dados específicos (área do direito, modalidade de atendimento) que já me preparam para a consulta inicial.
- **Proteção de Dados**: Implementação de *Rate Limit* e *Honeypot* para evitar spam, mantendo a integridade do banco de dados.
- **Automação de Retorno**: Assim que o cliente envia os dados, o sistema pode disparar confirmações automáticas (via SMTP), garantindo que o lead não fique sem resposta.

### 3. Gestão e Organização (Banco de Dados)
Utilizo um banco **SQL Server** para que nenhum caso se perca:
- **Histórico Centralizado**: Todos os contatos são armazenados com data, origem e consentimento explícito.
- **Painel Administrativo**: Rotas protegidas por chave de API (`ADMIN_API_KEY`) permitem que eu ou a minha equipe consultemos os agendamentos de forma segura.

---

## 🚀 O que já está implementado

- [x] **SEO de Elite**: Meta-tags completas, Open Graph para redes sociais e Schema JSON-LD para o Google entender que sou um serviço jurídico.
- [x] **Segurança Jurídica**: Páginas de Política de Privacidade e Termos de Uso integradas.
- [x] **Micro-interações Premium**: Efeitos de hover e scroll que diferenciam o site no mercado.
- [x] **Modo Escuro/Claro**: Transição cinematográfica de 1.5s para maior conforto visual.
- [x] **Fallback de Contato**: Se o servidor falhar, o cliente é direcionado automaticamente para o meu WhatsApp.

---

## 🛠️ Configuração Técnica (Para Desenvolvedores)

Se você estiver a ajudar-me na manutenção deste sistema, siga estes passos:

1. **Dependências**: `npm install`
2. **Ambiente**: Configure o `.env` (use o `env.example.txt` como base).
   - Chaves essenciais: `DB_SERVER`, `ADMIN_API_KEY`, `SMTP_HOST`.
3. **Banco de Dados**: Execute o script `schema.sql` no seu SQL Server.
4. **Execução**: `npm start` (O sistema rodará em `http://localhost:3001`).

---

## ⚖️ Ética e Publicidade

Este sistema foi construído respeitando rigorosamente o Código de Ética da OAB:
- **Sem promessas de resultado**: A linguagem é informativa e técnica.
- **Sem mercantilização**: O foco é na prestação de serviços e na autoridade do advogado.
- **Transparência Total**: Dados do advogado (OAB, endereço, especialidade) são facilmente verificáveis.

---

## 📂 Documentação de Apoio

Para entender a estratégia por trás de cada decisão, consulte:
- `ANALISE_MELHORIAS.md`: O meu raciocínio sobre a evolução do projeto.
- `CHECKLIST_QUALIDADE.md`: O que verifico antes de qualquer atualização.
- `PITCH_CLIENTE.md`: Como apresento o valor deste sistema para parceiros.

---
**Rafael Pedroso**  
*Advogado — OAB/SP [NUMERO_OAB]*
