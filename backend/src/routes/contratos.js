// backend/src/routes/contratos.js
const express = require('express');
const router = express.Router(); 
const ContratoController = require('../controllers/ContratoController')

// Rota base para testar
router.get('/', (req, res) => {
  res.json({ mensagem: 'Rota de contratos funcionando!' })
})

// Rotas CRUD
router.get('/lista', ContratoController.listar);
router.get('/:id', ContratoController.obter);
router.post('/novo', ContratoController.criar);
router.put('/:id', ContratoController.atualizar);
router.delete('/:id', ContratoController.deletar);

module.exports = router