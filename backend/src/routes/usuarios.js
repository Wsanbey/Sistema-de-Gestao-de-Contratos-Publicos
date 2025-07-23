const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/UsuarioController')

router.post('/registrar', UsuarioController.registrar)
router.post('/login', UsuarioController.login)
// router.get('/', UsuarioController.listar)
// router.get('/:id', UsuarioController.buscarPorId)
// router.put('/:id', UsuarioController.atualizar)
// router.delete('/:id', UsuarioController.deletar)

module.exports = router
