const sql = require('mssql');
require('dotenv').config();

const config = {
  server: process.env.DB_SERVER || 'localhost',
  port: Number(process.env.DB_PORT) || 1433,
  database: process.env.DB_NAME || 'RafaelPedrosoAdv',
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD,
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE !== 'false',
    enableArithAbort: true,
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

let pool = null;

async function getPool() {
  if (!process.env.DB_PASSWORD) {
    throw new Error('DB_PASSWORD nao configurado.');
  }

  if (!pool) {
    pool = await sql.connect(config);
    console.log('SQL Server conectado:', config.database);
  }

  return pool;
}

module.exports = { getPool, sql };
