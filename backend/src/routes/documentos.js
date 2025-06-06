 // backend/src/routes/documentos.js
const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ mensagem: 'Rota de documentos funcionando!' })
})

module.exports = router
