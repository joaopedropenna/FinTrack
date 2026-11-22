const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.get('/', metaController.listarMetas);
router.post('/', metaController.criarMeta);

module.exports = router;
