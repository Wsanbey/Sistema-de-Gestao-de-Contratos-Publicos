const express = require('express');
const router = express.Router();
const AditivoController = require('../controllers/AditivoController');

router.post('/criar', AditivoController.criar);
router.get('/listar', AditivoController.listar);
router.get('/:id', AditivoController.buscarPorId);
router.put('/:id', AditivoController.atualizar);
router.delete('/:id', AditivoController.deletar);

module.exports = router;
