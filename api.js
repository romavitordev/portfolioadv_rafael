const express = require('express');
const { body, query, validationResult } = require('express-validator');

const contatosCtrl = require('./contatosController');
const agendamentosCtrl = require('./agendamentosController');
const depoimentosCtrl = require('./depoimentosController');

const router = express.Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Revise os campos enviados.',
      errors: errors.array().map((error) => ({
        field: error.path,
        message: error.msg,
      })),
    });
  }
  return next();
}

function requireAdmin(req, res, next) {
  const configuredKey = process.env.ADMIN_API_KEY;
  if (!configuredKey) {
    return res.status(403).json({ success: false, message: 'ADMIN_API_KEY nao configurada.' });
  }

  const receivedKey = req.get('x-admin-key');
  if (receivedKey !== configuredKey) {
    return res.status(401).json({ success: false, message: 'Acesso administrativo negado.' });
  }

  return next();
}

const contactValidators = [
  body('website').optional({ values: 'falsy' }).isEmpty().withMessage('Envio bloqueado.'),
  body('nome').trim().isLength({ min: 3, max: 150 }).withMessage('Informe seu nome completo.'),
  body('email').trim().isEmail().normalizeEmail().withMessage('Informe um e-mail valido.'),
  body('telefone').optional({ values: 'falsy' }).trim().isLength({ max: 30 }).withMessage('Telefone invalido.'),
  body('assunto').trim().isLength({ min: 3, max: 120 }).withMessage('Informe o assunto.'),
  body('mensagem').trim().isLength({ min: 20, max: 3000 }).withMessage('Descreva seu caso com um pouco mais de detalhe.'),
  body('areaDireito').optional({ values: 'falsy' }).trim().isLength({ max: 80 }),
  body('modalidade').optional({ values: 'falsy' }).trim().isIn(['Online', 'Presencial']).withMessage('Modalidade invalida.'),
  body('consentimento').equals('true').withMessage('E necessario aceitar a politica de privacidade.'),
];

router.post('/contatos', contactValidators, validate, contatosCtrl.criarContato);
router.get('/contatos', requireAdmin, [
  query('status').optional({ values: 'falsy' }).trim().isLength({ max: 20 }),
], validate, contatosCtrl.listarContatos);

router.post('/agendamentos', requireAdmin, [
  body('nome').trim().isLength({ min: 3, max: 150 }),
  body('email').trim().isEmail().normalizeEmail(),
  body('telefone').trim().isLength({ min: 8, max: 30 }),
  body('dataHora').isISO8601().withMessage('Data/hora invalida.'),
  body('modalidade').optional().isIn(['Online', 'Presencial']),
  body('areaDireito').optional({ values: 'falsy' }).trim().isLength({ max: 80 }),
  body('observacoes').optional({ values: 'falsy' }).trim().isLength({ max: 2000 }),
], validate, agendamentosCtrl.criarAgendamento);
router.get('/agendamentos', requireAdmin, agendamentosCtrl.listarAgendamentos);

router.get('/depoimentos', requireAdmin, depoimentosCtrl.listarDepoimentos);
router.post('/depoimentos', requireAdmin, [
  body('nome').trim().isLength({ min: 2, max: 150 }),
  body('texto').trim().isLength({ min: 10, max: 1000 }),
  body('nota').optional().isInt({ min: 1, max: 5 }),
], validate, depoimentosCtrl.criarDepoimento);

router.get('/health', (_req, res) => {
  res.json({ success: true, status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
