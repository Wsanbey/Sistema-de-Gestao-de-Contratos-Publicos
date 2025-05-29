const Contrato = require('../models/Contrato')

class ContratoController {
  async listar(req, res) {
    try {
      const contratos = await Contrato.listarTodos()
      res.json(contratos)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar contratos' })
    }
  }

  async obter(req, res) {
    try {
      const contrato = await Contrato.buscarPorId(req.params.id)
      if (!contrato) {
        return res.status(404).json({ erro: 'Contrato não encontrado' })
      }
      res.json(contrato)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar contrato' })
    }
  }

  async criar(req, res) {
    try {
      const contrato = await Contrato.criar(req.body)
      res.status(201).json(contrato)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar contrato' })
    }
  }

  async atualizar(req, res) {
    try {
      const contrato = await Contrato.atualizar(req.params.id, req.body)
      if (!contrato) {
        return res.status(404).json({ erro: 'Contrato não encontrado' })
      }
      res.json(contrato)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar contrato' })
    }
  }
}

module.exports = new ContratoController()

