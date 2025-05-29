const express = require('express')
const router = express.Router()
const ContratoController = require('../controllers/ContratoController')
const authMiddleware = require('../middlewares/auth')

router.use(authMiddleware)

router.get('/', ContratoController.listar)
router.get('/:id', ContratoController.obter)
router.post('/', ContratoController.criar)
router.put('/:id', ContratoController.atualizar)

module.exports = router

