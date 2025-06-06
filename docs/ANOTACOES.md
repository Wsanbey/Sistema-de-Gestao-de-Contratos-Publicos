Coloquei os .env do Postigres Local!

Rodar o servidor 
Para rodar o servidor você tem duas opções:

1. Modo Desenvolvimento (Recomendado durante o desenvolvimento)
´


Para rodar o servidor você tem duas opções:

> cd backend

> npm run dev

Este comando usa o nodemon que reinicia automaticamente o servidor quando você faz alterações no código.

2. Modo Produção
> npm start

---
> Trabalhando com o Prisma [PAGINA](/docs/Capitulos/01-PRISMA.md)

---
> Configurando o Prisma Client [PAGINA](docs/Capitulos/02-CONFIGURANDO_PRISMA_CLIENT.md)




Conectando front e backend:
- Contrato:

    - [ x ] id: UUID
    - [ x ] numero: String
    - [ x ] orgao: String
    - [ x ] objeto: Text
    - [ x ] valor_global: Decimal
    - [ x ] valor_empenhado: Decimal
    - [ x ] data_inicio: Date
    - [ x ] data_termino: Date
    - [ x ] tipo_reajuste: Enum
    - [ x ] arquivo_contrato: URL
    - [ x ] arquivo_empenho: URL
    - [ x ] criado_por: FK(Usuario)
    - [ x ] criado_em: Timestamp