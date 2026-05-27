require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { getPool } = require('./database');
const apiRoutes = require('./api');

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || `http://localhost:${PORT}`;

app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
      "style-src": ["'self'", "'unsafe-inline'", 'fonts.googleapis.com', 'cdn.jsdelivr.net'],
      "font-src": ["'self'", 'fonts.gstatic.com', 'cdn.jsdelivr.net'],
      "img-src": ["'self'", 'data:', 'https:'],
      "connect-src": ["'self'", FRONTEND_URL, `http://localhost:${PORT}`],
      "frame-src": ["'self'", 'https://www.google.com', 'https://maps.google.com'],
    },
  },
  crossOriginEmbedderPolicy: false,
}));

const allowedOrigins = new Set([
  FRONTEND_URL,
  `http://localhost:${PORT}`,
  'http://localhost:3001',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
]);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origem nao permitida pelo CORS.'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true,
}));

app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 80,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Muitas requisicoes. Tente novamente em alguns minutos.' },
}));

app.use('/api/contatos', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 12,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Limite de envios atingido. Use o WhatsApp para falar conosco.' },
}));

app.use(express.json({ limit: '150kb' }));
app.use(express.urlencoded({ extended: true, limit: '150kb' }));

app.use('/images', express.static(path.join(__dirname, 'images'), {
  maxAge: process.env.NODE_ENV === 'production' ? '7d' : 0,
}));

app.use('/api', apiRoutes);

app.get('/robots.txt', (_req, res) => {
  res.type('text/plain').sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/sitemap.xml', (_req, res) => {
  res.type('application/xml').sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('/privacy-policy.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

app.get('/terms.html', (_req, res) => {
  res.sendFile(path.join(__dirname, 'terms.html'));
});

app.use('/api', (_req, res) => {
  res.status(404).json({ success: false, message: 'Rota da API nao encontrada.' });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Erro interno.' : err.message,
  });
});

async function start() {
  try {
    await getPool();
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
      console.log(`API disponivel em http://localhost:${PORT}/api`);
    });
  } catch (err) {
    console.error('Falha ao conectar no banco:', err.message);
    process.exit(1);
  }
}

start();
