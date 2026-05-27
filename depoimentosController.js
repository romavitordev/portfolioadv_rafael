const { getPool, sql } = require('./database');

async function listarDepoimentos(_req, res) {
  try {
    const pool = await getPool();
    const result = await pool.request().query(`
      SELECT TOP (100) Id, Nome, Texto, Nota, Ativo, CriadoEm
      FROM Depoimentos
      ORDER BY CriadoEm DESC
    `);

    return res.json({ success: true, data: result.recordset });
  } catch (err) {
    console.error('Erro ao listar depoimentos:', err);
    return res.status(500).json({ success: false, message: 'Erro ao listar depoimentos.' });
  }
}

async function criarDepoimento(req, res) {
  try {
    const { nome, texto, nota = 5 } = req.body;
    const pool = await getPool();

    const result = await pool.request()
      .input('Nome', sql.NVarChar(150), nome)
      .input('Texto', sql.NVarChar(sql.MAX), texto)
      .input('Nota', sql.TinyInt, Number(nota))
      .query(`
        INSERT INTO Depoimentos (Nome, Texto, Nota, Ativo)
        OUTPUT INSERTED.Id
        VALUES (@Nome, @Texto, @Nota, 0)
      `);

    return res.status(201).json({ success: true, id: result.recordset[0].Id });
  } catch (err) {
    console.error('Erro ao criar depoimento:', err);
    return res.status(500).json({ success: false, message: 'Erro ao criar depoimento.' });
  }
}

module.exports = { listarDepoimentos, criarDepoimento };
