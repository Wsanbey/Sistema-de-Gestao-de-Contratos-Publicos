const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  // Criar cliente
  async criar(req, res) {
    try {
      const { nome, cnpj, telefone, email, endereco } = req.body;

      const clienteExistente = await prisma.cliente.findUnique({ where: { cnpj } });
      if (clienteExistente) {
        return res.status(400).json({ mensagem: 'Cliente com esse CNPJ já existe.' });
      }

      const novoCliente = await prisma.cliente.create({
        data: { nome, cnpj, telefone, email, endereco }
      });

      return res.status(201).json(novoCliente);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao criar cliente.' });
    }
  },

  // Listar todos os clientes ativos
  async listar(req, res) {
    try {
      const clientes = await prisma.cliente.findMany({ where: { ativo: true } });
      return res.status(200).json(clientes);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao listar clientes.' });
    }
  },

  // Buscar cliente por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      const cliente = await prisma.cliente.findUnique({ where: { id } });

      if (!cliente || !cliente.ativo) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado.' });
      }

      return res.status(200).json(cliente);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao buscar cliente.' });
    }
  },

  // Atualizar cliente
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, cnpj, telefone, email, endereco } = req.body;

      const clienteAtualizado = await prisma.cliente.update({
        where: { id },
        data: { nome, cnpj, telefone, email, endereco }
      });

      return res.status(200).json(clienteAtualizado);
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao atualizar cliente.' });
    }
  },

  // Exclusão lógica (inativar cliente)
  async deletar(req, res) {
    try {
      const { id } = req.params;

      await prisma.cliente.update({
        where: { id },
        data: { ativo: false }
      });

      return res.status(200).json({ mensagem: 'Cliente inativado com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ mensagem: 'Erro ao deletar cliente.' });
    }
  }
};
