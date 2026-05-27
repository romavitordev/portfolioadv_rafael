const { getPool, sql } = require('./database');
const nodemailer = require('nodemailer');

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function createTransport() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function criarContato(req, res) {
  try {
    const {
      nome,
      email,
      telefone,
      assunto,
      mensagem,
      areaDireito,
      modalidade,
      website,
    } = req.body;

    if (website) {
      return res.status(202).json({ success: true, message: 'Contato recebido.' });
    }

    const pool = await getPool();
    const result = await pool.request()
      .input('Nome', sql.NVarChar(150), nome)
      .input('Email', sql.NVarChar(200), email)
      .input('Telefone', sql.NVarChar(30), telefone || null)
      .input('Assunto', sql.NVarChar(120), assunto)
      .input('Mensagem', sql.NVarChar(sql.MAX), mensagem)
      .input('AreaDireito', sql.NVarChar(80), areaDireito || null)
      .input('Modalidade', sql.NVarChar(20), modalidade || null)
      .input('ConsentimentoLGPD', sql.Bit, true)
      .input('Origem', sql.NVarChar(120), req.get('referer') || 'site')
      .input('Ip', sql.NVarChar(64), req.ip || null)
      .input('UserAgent', sql.NVarChar(300), req.get('user-agent') || null)
      .query(`
        INSERT INTO Contatos
          (Nome, Email, Telefone, Assunto, Mensagem, AreaDireito, Modalidade, ConsentimentoLGPD, Origem, Ip, UserAgent)
        OUTPUT INSERTED.Id
        VALUES
          (@Nome, @Email, @Telefone, @Assunto, @Mensagem, @AreaDireito, @Modalidade, @ConsentimentoLGPD, @Origem, @Ip, @UserAgent)
      `);

    const transporter = createTransport();
    if (transporter) {
      const safeMensagem = escapeHtml(mensagem).replace(/\n/g, '<br>');
      const from = `"Rafael Pedroso Advocacia" <${process.env.SMTP_USER}>`;

      if (process.env.EMAIL_TO) {
        transporter.sendMail({
          from,
          to: process.env.EMAIL_TO,
          replyTo: email,
          subject: `[Novo lead juridico] ${assunto}`,
          html: `
            <h2>Novo contato pelo site</h2>
            <p><b>Nome:</b> ${escapeHtml(nome)}</p>
            <p><b>E-mail:</b> ${escapeHtml(email)}</p>
            <p><b>Telefone:</b> ${escapeHtml(telefone || '-')}</p>
            <p><b>Area:</b> ${escapeHtml(areaDireito || '-')}</p>
            <p><b>Modalidade:</b> ${escapeHtml(modalidade || '-')}</p>
            <p><b>Mensagem:</b></p>
            <p>${safeMensagem}</p>
            <hr>
            <p style="font-size:12px;color:#666">Lead com consentimento LGPD enviado pelo site.</p>
          `,
        }).catch((err) => console.error('Erro ao enviar e-mail interno:', err.message));
      }

      const firstName = String(nome).trim().split(/\s+/)[0] || nome;
      const safeFirstName = escapeHtml(firstName);
      transporter.sendMail({
        from,
        to: email,
        subject: `Recebemos seu pedido de consulta, ${firstName.replace(/[\r\n]/g, '')}`,
        html: `
          <h2>Ola, ${safeFirstName}.</h2>
          <p>Recebemos seu contato e retornaremos em ate <b>2 horas uteis</b>.</p>
          <p><b>Resumo enviado:</b></p>
          <ul>
            <li>Telefone: ${escapeHtml(telefone || '-')}</li>
            <li>Area: ${escapeHtml(areaDireito || 'Geral')}</li>
            <li>Modalidade: ${escapeHtml(modalidade || 'A definir')}</li>
            <li>Assunto: ${escapeHtml(assunto)}</li>
          </ul>
          <p>As informacoes enviadas serao tratadas com sigilo profissional e usadas apenas para retorno e analise inicial.</p>
          <p style="font-size:12px;color:#666">Este contato nao cria automaticamente relacao advogado-cliente. A contratacao depende de aceite mutuo e formalizacao.</p>
          <p>Atenciosamente,<br>Rafael Pedroso Advocacia<br>OAB/SP [NUMERO_OAB]</p>
        `,
      }).catch((err) => console.error('Erro ao enviar e-mail ao cliente:', err.message));
    }

    return res.status(201).json({
      success: true,
      id: result.recordset[0].Id,
      message: 'Contato recebido com sucesso.',
    });
  } catch (err) {
    console.error('Erro ao salvar contato:', err);
    return res.status(500).json({ success: false, message: 'Erro ao salvar contato.' });
  }
}

async function listarContatos(req, res) {
  try {
    const pool = await getPool();
    const request = pool.request();
    const where = [];

    if (req.query.status) {
      request.input('Status', sql.NVarChar(20), req.query.status);
      where.push('Status = @Status');
    }

    const result = await request.query(`
      SELECT TOP (200)
        Id, Nome, Email, Telefone, Assunto, AreaDireito, Modalidade,
        Status, CriadoEm, AtualizadoEm, Origem
      FROM Contatos
      ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
      ORDER BY CriadoEm DESC
    `);

    return res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Erro ao listar contatos:', err);
    return res.status(500).json({ success: false, message: 'Erro ao listar contatos.' });
  }
}

module.exports = { criarContato, listarContatos };
