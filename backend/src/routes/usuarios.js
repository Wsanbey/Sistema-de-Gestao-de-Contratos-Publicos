// backend/src/routes/usuarios.js
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mensagem: 'Rota de usuarios funcionando!' })
})

module.exports = router
