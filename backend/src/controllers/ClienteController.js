const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ClienteController {
  // Listar todos os clientes
  async listar(req, res) {
    try {
      const clientes = await prisma.cliente.findMany();
      res.json(clientes);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar clientes' });
    }
  }

  // Obter um cliente por ID
  async obter(req, res) {
    try {
      const cliente = await prisma.cliente.findUnique({
        where: { id: parseInt(req.params.id) }
      });

      if (!cliente) {
        return res.status(404).json({ erro: 'Cliente não encontrado' });
      }

      res.json(cliente);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao buscar cliente' });
    }
  }

  // Criar um novo cliente
  async criar(req, res) {
    console.log('Dados recebidos para criar cliente:', req.body);
    try {
            const cliente = await prisma.cliente.create({
                
                data: req.body
            });
        
        res.status(201).json(cliente);
    } catch (error) {
        console.error('Erro ao criar cliente:', error);
        res.status(500).json({ erro: 'Erro ao criar cliente' });
      
    }
  } 

  // Atualizar um cliente
  async atualizar(req, res) {
    try {
      const cliente = await prisma.cliente.update({
        where: { id: parseInt(req.params.id) },
        data: req.body
      });
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar cliente' });
    }
  }

  // Deletar um cliente
  async deletar(req, res) {
    try {
      await prisma.cliente.delete({
        where: { id: parseInt(req.params.id) }
      });
      res.json({ mensagem: 'Cliente excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao excluir cliente' });
    }
  }
}

module.exports = new ClienteController();
