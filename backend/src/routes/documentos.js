const express = require('express');
const router = express.Router();
const DocumentoController = require('../controllers/DocumentoController');

router.post('/criar', DocumentoController.criar);
router.get('/listar', DocumentoController.listar);
router.get('/:id', DocumentoController.buscarPorId);
router.put('/:id', DocumentoController.atualizar);
router.delete('/:id', DocumentoController.deletar);

module.exports = router;
