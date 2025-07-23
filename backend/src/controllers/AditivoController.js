const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar aditivo
  async criar(req, res) {
    try {
      const { numero, descricao, valor, dataInicio, dataFim, contratoId } = req.body;

      const aditivoExistente = await prisma.aditivo.findUnique({ where: { numero } });
      if (aditivoExistente) {
        return res.status(400).json({ mensagem: 'Já existe um aditivo com esse número.' });
      }
 
      const novoAditivo = await prisma.aditivo.create({
        data: {
          numero,
          descricao,
          valor,
          dataInicio: new Date(dataInicio),
          dataFim: new Date(dataFim),
          contratoId
        }
      });

      return res.status(201).json(novoAditivo);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao criar aditivo.' });
    }
  },

  // Listar todos os aditivos
  async listar(req, res) {
    try {
      const aditivos = await prisma.aditivo.findMany();
      return res.status(200).json(aditivos);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao listar aditivos.' });
    }
  },

  // Buscar por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const aditivo = await prisma.aditivo.findUnique({ where: { id } });

      if (!aditivo) {
        return res.status(404).json({ mensagem: 'Aditivo não encontrado.' });
      }

      return res.status(200).json(aditivo);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar aditivo.' });
    }
  },

  // Atualizar aditivo
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { numero, descricao, valor, dataInicio, dataFim, contratoId } = req.body;

      const aditivoAtualizado = await prisma.aditivo.update({
        where: { id },
        data: {
          numero,
          descricao,
          valor,
          dataInicio: new Date(dataInicio),
          dataFim: new Date(dataFim),
          contratoId
        }
      });

      return res.status(200).json(aditivoAtualizado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar aditivo.' });
    }
  },

  // Deletar aditivo
  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.aditivo.delete({ where: { id } });

      return res.status(200).json({ mensagem: 'Aditivo deletado com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar aditivo.' });
    }
  }
};