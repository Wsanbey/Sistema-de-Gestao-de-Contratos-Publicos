const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/ClienteController');

router.post('/criar', ClienteController.criar);
router.get('/listar', ClienteController.listar);
router.get('/:id', ClienteController.buscarPorId);
router.put('/:id', ClienteController.atualizar);
router.delete('/:id', ClienteController.deletar);

module.exports = router;