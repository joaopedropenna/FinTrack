const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');

// Middleware para validar os dados da transação
const validarTransacao = (req, res, next) => {
  const { descricao, valor } = req.body;

  const valorNumerico = Number(valor);

  if (
    typeof descricao !== 'string' ||
    !descricao.trim() ||
    valor === undefined ||
    valor === null ||
    valor === '' ||
    !Number.isFinite(valorNumerico) ||
    valorNumerico <= 0
  ) {
    return res.status(400).json({
      error: 'Valor inválido.'
    });
  }

  next();
};

// Rotas de transações
router.get('/', transacaoController.listarTransacoes);
router.post('/', validarTransacao, transacaoController.criarTransacao);

module.exports = router;