const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

class ContratoController {
  async listar(req, res) {
    try {
      const contratos = await prisma.contrato.findMany({
        include: {
          cliente: true,
          responsavel: true, 
          documentos: true,
          aditivos: true
        }
      })
      res.json(contratos)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        erro: 'Erro ao listar contratos',
        mensagem: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }

  async obter(req, res) {
    try {
      const { id } = req.params

      const contrato = await prisma.contrato.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          cliente: true,
          responsavel: true,
          documentos: true,
          aditivos: true
        }
      })

      if (!contrato) {
        return res.status(404).json({
          erro: 'Contrato não encontrado'
        })
      }

      res.json(contrato)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        erro: 'Erro ao buscar contrato',
        mensagem: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }

  async criar(req, res) {
  try {
    // Validação dos dados
    const {
      numero,
      orgao,
      objeto,
      valor_global,
      valor_empenhado,
      data_inicio,
      data_termino,
      tipo_reajuste,
      clienteId,
      usuarioId
    } = req.body

    if (!numero || !orgao || !objeto || !valor_global || !valor_empenhado || !data_inicio || !data_termino || !tipo_reajuste || !clienteId || !usuarioId) {
      return res.status(400).json({
        erro: 'Dados incompletos'
      })
    }

    // Sanitização
    const dados = {
      numero: String(numero).trim(),
      orgao: String(orgao).trim(),
      objeto: String(objeto).trim(),
      valor_global: Number(valor_global),
      valor_empenhado: Number(valor_empenhado),
      data_inicio: new Date(data_inicio),
      data_termino: new Date(data_termino),
      tipo_reajuste: String(tipo_reajuste).trim(),
      clienteId: Number(clienteId),
      usuarioId: Number(usuarioId)
    }

    const contrato = await prisma.contrato.create({
      data: dados
    })

    res.status(201).json(contrato)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      erro: 'Erro ao criar contrato',
      mensagem: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
}

  async atualizar(req, res) {
    try {
      const { id } = req.params

      const {
        numero,
        orgao,
        objeto,
        valor_global,
        valor_empenhado,
        data_inicio,
        data_termino,
        tipo_reajuste,
        clienteId,
        usuarioId
      } = req.body

      // Sanitização
      const dados = {
        numero: String(numero).trim(),
        orgao: String(orgao).trim(),
        objeto: String(objeto).trim(),
        valor_global: Number(valor_global),
        valor_empenhado: Number(valor_empenhado),
        data_inicio: new Date(data_inicio),
        data_termino: new Date(data_termino),
        tipo_reajuste: String(tipo_reajuste).trim(),
        clienteId: Number(clienteId),
        usuarioId: Number(usuarioId)
      }

      const contrato = await prisma.contrato.update({
        where: {
          id: Number(id)
        },
        data: dados
      })

      res.json(contrato)
    } catch (error) {
      console.error(error)
      res.status(500).json({
        erro: 'Erro ao atualizar contrato',
        mensagem: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }
  async deletar(req, res) {
    try {
      const { id } = req.params

      await prisma.contrato.delete({
        where: {
          id: Number(id)
        }
      })

      res.status(204).send()
    } catch (error) {
      console.error(error)
      res.status(500).json({
        erro: 'Erro ao deletar contrato',
        mensagem: process.env.NODE_ENV === 'development' ? error.message : undefined
      })
    }
  }
}

module.exports = new ContratoController()