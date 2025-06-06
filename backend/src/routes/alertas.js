// backend/src/routes/alertas.js
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mensagem: 'Rota de alertas funcionando!' })
})

module.exports = router

