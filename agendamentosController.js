const { getPool, sql } = require('./database');

async function criarAgendamento(req, res) {
  try {
    const { nome, email, telefone, dataHora, modalidade, areaDireito, observacoes } = req.body;
    const pool = await getPool();

    const result = await pool.request()
      .input('Nome', sql.NVarChar(150), nome)
      .input('Email', sql.NVarChar(200), email)
      .input('Telefone', sql.NVarChar(30), telefone)
      .input('DataHora', sql.DateTime2, new Date(dataHora))
      .input('Modalidade', sql.NVarChar(20), modalidade || 'Online')
      .input('AreaDireito', sql.NVarChar(80), areaDireito || null)
      .input('Observacoes', sql.NVarChar(sql.MAX), observacoes || null)
      .query(`
        INSERT INTO Agendamentos (Nome, Email, Telefone, DataHora, Modalidade, AreaDireito, Observacoes)
        OUTPUT INSERTED.Id
        VALUES (@Nome, @Email, @Telefone, @DataHora, @Modalidade, @AreaDireito, @Observacoes)
      `);

    return res.status(201).json({ success: true, id: result.recordset[0].Id });
  } catch (err) {
    console.error('Erro ao criar agendamento:', err);
    return res.status(500).json({ success: false, message: 'Erro ao criar agendamento.' });
  }
}

async function listarAgendamentos(_req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT TOP (200)
        Id, Nome, Email, Telefone, DataHora, Modalidade, AreaDireito,
        Observacoes, Status, CriadoEm, AtualizadoEm
      FROM Agendamentos
      ORDER BY DataHora DESC
    `);

    return res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Erro ao listar agendamentos:', err);
    return res.status(500).json({ success: false, message: 'Erro ao listar agendamentos.' });
  }
}

module.exports = { criarAgendamento, listarAgendamentos };
