const express = require('express')
const contratosRoutes = require('./routes/contratos')
const usuariosRoutes = require('./routes/usuarios')
const alertasRoutes = require('./routes/alertas')
const documentosRoutes = require('./routes/documentos')
const clientesRoutes = require('./routes/clientes');
const aditivosRoutes = require('./routes/aditivos');
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

app.use('/api/v1/contract', contratosRoutes)
app.use('/api/v1/usuarios', usuariosRoutes)
app.use('/api/v1/alertas', alertasRoutes)
app.use('/api/v1/documentos', documentosRoutes)
app.use('/api/v1/clientes', clientesRoutes);
app.use('/api/v1/aditivos', aditivosRoutes);


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