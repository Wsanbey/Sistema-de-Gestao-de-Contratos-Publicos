const express = require('express')
const contratosRoutes = require('./routes/contratos')
const usuariosRoutes = require('./routes/usuarios')
const alertasRoutes = require('./routes/alertas')
const documentosRoutes = require('./routes/documentos')
const clientesRoutes = require('./routes/clientes');
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(helmet())
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/contratos', contratosRoutes)
app.use('/api/usuarios', usuariosRoutes)
app.use('/api/alertas', alertasRoutes)
app.use('/api/documentos', documentosRoutes)
app.use('/api/clientes', clientesRoutes);

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