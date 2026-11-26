
const express = require('express');
const router = express.Router();
const aprovacaoController = require('../controllers/aprovacaoController');

router.get('/pendentes', aprovacaoController.listarPendentes);

router.patch('/:id/aprovar', aprovacaoController.aprovarTransacao);

router.patch('/:id/negar', aprovacaoController.negarTransacao);

module.exports = router;
