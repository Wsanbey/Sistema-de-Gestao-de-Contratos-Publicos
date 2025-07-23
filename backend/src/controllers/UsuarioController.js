const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UsuarioController {
  async registrar(req, res) {
    try {
      const { nome, email, senha, cargo } = req.body

      // Verifica se já existe um usuário com esse email
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email }
      })

      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email já cadastrado' })
      }

      // Criptografa a senha
      const senhaCriptografada = await bcrypt.hash(senha, 10)

      // Cria novo usuário
      const novoUsuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
          cargo
        }
      })

      res.status(201).json(novoUsuario)
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro ao criar usuário' })
      console.log('Dados do novo usuário:', { nome, email, senha: senhaCriptografada, cargo })

    }
  }

  
  async login(req, res) {
    try {
      const { email, senha } = req.body

      const usuario = await prisma.usuario.findUnique({
        where: { email }
      })

      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha)
      if (!senhaValida) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
      }

      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      res.json({ token })
    } catch (error) {
      console.error(error)
      res.status(500).json({ erro: 'Erro no login' })
    }
  }
}

module.exports = new UsuarioController()
