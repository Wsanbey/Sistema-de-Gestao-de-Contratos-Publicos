const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

class UsuarioController {
  async registrar(req, res) {
    try {
      const usuarioExistente = await Usuario.buscarPorEmail(req.body.email)
      if (usuarioExistente) {
        return res.status(400).json({ erro: 'Email já cadastrado' })
      }

      const usuario = await Usuario.criar(req.body)
      res.status(201).json(usuario)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar usuário' })
    }
  }

  async login(req, res) {
    try {
      const usuario = await Usuario.buscarPorEmail(req.body.email)
      if (!usuario) {
        return res.status(401).json({ erro: 'Credenciais inválidas' })
      }

      const senhaValida = await bcrypt.compare(req.body.senha, usuario.senha)
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
      res.status(500).json({ erro: 'Erro no login' })
    }
  }
}

module.exports = new UsuarioController()

