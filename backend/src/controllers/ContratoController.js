const { PrismaClient } = require('@prisma/client');
const { uploadBufferParaMinio, gerarUrlTemporaria } = require('../services/minioService.js');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const prisma = new PrismaClient();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Use memoryStorage para enviar ao MinIO


function gerarNomeSeguro(originalname) {
  const ext = path.extname(originalname); // pega a extensão
  return uuidv4() + ext; // exemplo: 'c1a2b3c4-5678-90ab-cdef-1234567890ab.pdf'
}

  
module.exports = {
    // Criar contrato
    async creat(req, res) {
        try {
            // Recebe arquivos (exemplo: documentos)
            const arquivosContrato = req.files ?.arquivo_contrato || [];
            const arquivosEmpenho = req.files ?.arquivo_empenho || [];

            const nomesContrato = await Promise.all(
            arquivosContrato.map(file => {
                const nomeSeguro = gerarNomeSeguro(file.originalname);
                return uploadBufferParaMinio(file.buffer, nomeSeguro, file.mimetype)
                .then(() => ({
                    nomeSeguro,
                    nomeOriginal: file.originalname,
                    deletado: false
                }));
            })
            ); 

            const nomesEmpenho = await Promise.all(
            arquivosEmpenho.map(file => {
                const nomeSeguro = gerarNomeSeguro(file.originalname);
                return uploadBufferParaMinio(file.buffer, nomeSeguro, file.mimetype)
                .then(() => ({
                    nomeSeguro,
                    nomeOriginal: file.originalname,
                    deletado: false
                }));
            })
            );

            console.log('URLs de contrato:', nomesContrato);
            console.log('URLs de empenho:', nomesEmpenho);

            const {
                numero,
                orgao,
                objeto,
                valor_global,
                valor_empenhado,
                data_inicio,
                data_termino,
                tipo_reajuste,
                arquivo_contrato,
                arquivo_empenho,
                status,
                clienteId,
                usuarioId
            } = req.body;

            const contrato = await prisma.contrato.create({
                data: {
                    numero,
                    orgao,
                    objeto,
                    valor_global: parseFloat(valor_global),
                    valor_empenhado: parseFloat(valor_empenhado),
                    data_inicio: new Date(data_inicio),
                    data_termino: new Date(data_termino),
                    tipo_reajuste,
                    arquivo_contrato: nomesContrato,
                    arquivo_empenho: nomesEmpenho,  
                    status,
                    clienteId,
                    usuarioId
                }
            });

            console.log('Requisição recebida:');
            console.error('Requisição recebida " PASSOU " foi enviado:', JSON.stringify(req.body, null, 2));
            return res.status(201).json(contrato);
        } catch (erro) {
            console.log('Requisição recebida:');
            console.error('Requisição recebida " FALHOU " foi enviado:', JSON.stringify(req.body, null, 2)); 
            
            return res.status(500).json({ mensagem: 'Erro ao criar contrato.' });
        }
    },

    async UpDate(req, res) {
        let contratoAtual;
        
        try {
            const { id } = req.params;
            
            console.error('Requisição recebida em UpDate foi:', JSON.stringify(req.body, null, 2));
            
            
            // Busca o contrato atual
            const contratoAtual = await prisma.contrato.findUnique({ where: { id } });
            if (!contratoAtual) {
                return res.status(404).json({ mensagem: 'Contrato não encontrado.' });
            } 

            // PEGUE OS ARQUIVOS DO REQUEST
            const arquivosContrato = req.files?.arquivo_contrato || [];
            const arquivosEmpenho = req.files?.arquivo_empenho || [];

            // Faz upload dos arquivos novos, se houver
            const nomesContrato = await Promise.all(
                arquivosContrato.map(file => {
                    const nomeSeguro = gerarNomeSeguro(file.originalname);
                    return uploadBufferParaMinio(file.buffer, nomeSeguro, file.mimetype)
                        .then(() => ({
                            nomeSeguro,
                            nomeOriginal: file.originalname
                        }));
                })
            );

            const nomesEmpenho = await Promise.all(
                arquivosEmpenho.map(file => {
                    const nomeSeguro = gerarNomeSeguro(file.originalname);
                    return uploadBufferParaMinio(file.buffer, nomeSeguro, file.mimetype)
                        .then(() => ({
                            nomeSeguro,
                            nomeOriginal: file.originalname
                        }));
                })
            );

            // Junta arquivos antigos e novos, evitando duplicados
            const arquivosContratoFinais = [
                ...(contratoAtual.arquivo_contrato || []),
                ...nomesContrato
                ].filter((file, idx, arr) =>
                arr.findIndex(f => f.nomeSeguro === file.nomeSeguro) === idx
            );

            const arquivosEmpenhoFinais = [
                ...(contratoAtual.arquivo_empenho || []),
                ...nomesEmpenho
                ].filter((file, idx, arr) =>
                arr.findIndex(f => f.nomeSeguro === file.nomeSeguro) === idx
            );


            // Pega os campos do body, se não vier, mantém o valor antigo
            const {
                numero,
                orgao,
                objeto,
                valor_global,
                valor_empenhado,
                data_inicio,
                data_termino,
                tipo_reajuste,
                status,
                clienteId,
                usuarioId
            } = req.body;

            // Monta o objeto de atualização, validando cada campo
            const dataUpdate = {
                numero: numero !== undefined ? numero : contratoAtual.numero,
                orgao: orgao !== undefined ? orgao : contratoAtual.orgao,
                objeto: objeto !== undefined ? objeto : contratoAtual.objeto,
                valor_global: valor_global !== undefined && valor_global !== '' ? parseFloat(valor_global) : contratoAtual.valor_global,
                valor_empenhado: valor_empenhado !== undefined && valor_empenhado !== '' ? parseFloat(valor_empenhado) : contratoAtual.valor_empenhado,
                data_inicio: data_inicio ? new Date(data_inicio) : contratoAtual.data_inicio,
                data_termino: data_termino ? new Date(data_termino) : contratoAtual.data_termino,
                tipo_reajuste: tipo_reajuste !== undefined ? tipo_reajuste : contratoAtual.tipo_reajuste,
                arquivo_contrato: arquivosContratoFinais,
                arquivo_empenho: arquivosEmpenhoFinais,
                status: status !== undefined ? status : contratoAtual.status,
                clienteId: clienteId !== undefined ? clienteId : contratoAtual.clienteId,
                usuarioId: usuarioId !== undefined ? usuarioId : contratoAtual.usuarioId
            };

            // Validação extra para datas
            if (isNaN(new Date(dataUpdate.data_inicio))) {
                dataUpdate.data_inicio = contratoAtual.data_inicio;
            }
            if (isNaN(new Date(dataUpdate.data_termino))) {
                dataUpdate.data_termino = contratoAtual.data_termino;
            }

            const contrato = await prisma.contrato.update({
                where: { id },
                data: dataUpdate
            });
            console.error('Requisição recebida " PASSOU " UpDate foi enviado:', JSON.stringify(contratoAtual, null, 2));
                
            return res.status(200).json(contrato);

        } catch (erro) {
            console.error(erro);
            console.error('Requisição recebida " FALHA-A " UpDate foi enviado:', JSON.stringify(contratoAtual, null, 2));
            
            return res.status(500).json({ mensagem: 'Erro ao atualizar contrato.' });
        }
    }, 

    // Listar todos os contratos
    async listar(req, res) {
        try {
            const contratos = await prisma.contrato.findMany({
                where: { deletado: false },
                include: {
                    cliente: true,
                    responsavel: true,
                    documentos: true,
                    aditivos: true,
                    alertas: true
                },
                orderBy: {
                    criado_em: 'desc'
                }
            });

            return res.status(200).json(contratos);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao listar contratos.' });
        }
    },

    // Buscar contrato por ID
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const contrato = await prisma.contrato.findUnique({
                where: { id, deletado: false },
                include: {
                    cliente: true,
                    responsavel: true,
                    documentos: true,
                    aditivos: true,
                    alertas: true
                }
            });

            if (!contrato) {
                return res.status(404).json({ mensagem: 'Contrato não encontrado.' });
            }

            return res.status(200).json(contrato);
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao buscar contrato.' });
        }
    },
   
    // Deletar contrato
    async deletar(req, res) {
        try {
            const { id } = req.params;

            await prisma.contrato.update({ 
                where: { id },
                data: {deletado: true } 
            });

            return res.status(200).json({ mensagem: 'Contrato deletado com sucesso.' });
        } catch (erro) {
            console.error(erro);
            return res.status(500).json({ mensagem: 'Erro ao deletar contrato.' });
        }
    },

    async gerarUrlTemporariaMinio(req, res) {

        try {
            const nomeNoBucktet = req.params.id;
            if (!nomeNoBucktet) {
                return res.status(400).json({ mensagem: 'Nome do arquivo não fornecido.' });
            }
            
            // Chama a função para gerar a URL temporária
            if (!gerarUrlTemporaria) {
                return res.status(500).json({ mensagem: 'Serviço de geração de URL temporária não disponível.' });
            } 
            
            const url = await gerarUrlTemporaria(nomeNoBucktet, 120); // 2 minutos
            res.json({ url });
        } catch (erro) {
            res.status(500).json({ mensagem: 'Erro ao gerar link temporário.' });
        }
    }
};