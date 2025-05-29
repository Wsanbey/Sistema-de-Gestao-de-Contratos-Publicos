const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const app = express()

// Middlewares
app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Rotas
app.use('/api/contratos', require('./routes/contratos'))
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/alertas', require('./routes/alertas'))
app.use('/api/documentos', require('./routes/documentos'))

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    erro: 'Erro interno do servidor',
    mensagem: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})