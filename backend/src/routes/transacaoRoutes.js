const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/transacaoController');

router.get('/', transacaoController.listarTransacoes);
router.post('/', transacaoController.criarTransacao);

module.exports = router;
