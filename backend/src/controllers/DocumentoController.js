const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar documento
  async criar(req, res) {
    try {
      const { nome, tipo, url, contratoId } = req.body;

      const documento = await prisma.documento.create({
        data: {
          nome,
          tipo,
          url,
          contratoId
        }
      });

      return res.status(201).json(documento);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao criar documento.' });
    }
  },

  // Listar todos os documentos
  async listar(req, res) {
    try {
      const documentos = await prisma.documento.findMany({
        include: {
          contrato: true
        },
        orderBy: {
          criadoEm: 'desc'
        }
      });

      return res.status(200).json(documentos);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao listar documentos.' });
    }
  },

  // Buscar documento por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const documento = await prisma.documento.findUnique({
        where: { id },
        include: {
          contrato: true
        }
      });

      if (!documento) {
        return res.status(404).json({ mensagem: 'Documento não encontrado.' });
      }

      return res.status(200).json(documento);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar documento.' });
    }
  },

  // Atualizar documento
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, tipo, url, contratoId } = req.body;

      const documento = await prisma.documento.update({
        where: { id },
        data: {
          nome,
          tipo,
          url,
          contratoId
        }
      });

      return res.status(200).json(documento);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar documento.' });
    }
  },

  // Deletar documento
  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.documento.delete({ where: { id } });

      return res.status(200).json({ mensagem: 'Documento deletado com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar documento.' });
    }
  }
};