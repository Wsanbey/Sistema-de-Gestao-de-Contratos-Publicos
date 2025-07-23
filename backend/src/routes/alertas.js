const express = require('express');
const router = express.Router();
const AlertaController = require('../controllers/AlertaController');

router.post('/criar', AlertaController.criar);
router.get('/listar', AlertaController.listar);
router.get('/:id', AlertaController.buscarPorId);
router.put('/:id', AlertaController.atualizar);
router.delete('/:id', AlertaController.deletar);

module.exports = router;


