const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar alerta
  async criar(req, res) {
    try {
      const { titulo, descricao, tipo, data, status, contratoId, usuarioId } = req.body;

      const alerta = await prisma.alerta.create({
        data: {
          titulo,
          descricao,
          tipo,
          data: new Date(data),
          status,
          contratoId,
          usuarioId
        }
      });

      return res.status(201).json(alerta);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao criar alerta.' });
    }
  },

  // Listar todos os alertas
  async listar(req, res) {
    try {
      const alertas = await prisma.alerta.findMany({
        include: {
          contrato: true,
          usuario: true
        },
        orderBy: {
          data: 'asc'
        }
      });
      return res.status(200).json(alertas);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao listar alertas.' });
    }
  },

  // Buscar por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const alerta = await prisma.alerta.findUnique({
        where: { id },
        include: {
          contrato: true,
          usuario: true
        }
      });

      if (!alerta) {
        return res.status(404).json({ mensagem: 'Alerta não encontrado.' });
      }

      return res.status(200).json(alerta);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar alerta.' });
    }
  },

  // Atualizar alerta
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { titulo, descricao, tipo, data, status, contratoId, usuarioId } = req.body;

      const alertaAtualizado = await prisma.alerta.update({
        where: { id },
        data: {
          titulo,
          descricao,
          tipo,
          data: new Date(data),
          status,
          contratoId,
          usuarioId
        }
      });

      return res.status(200).json(alertaAtualizado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar alerta.' });
    }
  },

  // Deletar alerta
  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.alerta.delete({ where: { id } });

      return res.status(200).json({ mensagem: 'Alerta deletado com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar alerta.' });
    }
  }
};