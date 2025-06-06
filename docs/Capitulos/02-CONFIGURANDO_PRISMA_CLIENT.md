## ✅ Configurando o Prisma Client – Anotações de Desenvolvimento

> Coloquei os `.env` do PostgreSQL local!

---

🔗 Trabalhando com o [PRISMA](/docs/Capitulos/PRISMA.md)

---

### 📌 Tarefa: Configurar o Prisma Client

---

#### 1. Criar o arquivo que centraliza a instância do Prisma Client

📁 Local: [`backend/prisma/prisma.ts`](backend/prisma/prisma.ts)

```ts
import { PrismaClient } from '@prisma/client'

// Cria uma instância global do PrismaClient
const prisma = new PrismaClient()

export default prisma
```

---

#### 2. Atualizar a configuração do banco de dados

📁 Local: [`backend/src/config/database.js`](backend/src/config/database.js)

```js
import prisma from '../../prisma/prisma'

export default prisma
```

---

#### 3. Exemplo prático: utilizar Prisma no `ContratoController`

📁 Local: [`backend/src/controllers/ContratoController.js`](backend/src/controllers/ContratoController.js)

```js
import prisma from '../../prisma/prisma'

class ContratoController {
  async listar(req, res) {
    try {
      const contratos = await prisma.contrato.findMany({
        include: {
          cliente: true,
          responsavel: true,
          documentos: true,
          aditivos: true,
        },
      })
      res.json(contratos)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao listar contratos' })
    }
  }

  async obter(req, res) {
    try {
      const contrato = await prisma.contrato.findUnique({
        where: { id: parseInt(req.params.id) },
        include: {
          cliente: true,
          responsavel: true,
          documentos: true,
          aditivos: true,
        },
      })

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
      const contrato = await prisma.contrato.create({
        data: {
          ...req.body,
          clienteId: parseInt(req.body.clienteId),
          usuarioId: parseInt(req.body.usuarioId),
        },
      })
      res.status(201).json(contrato)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao criar contrato' })
    }
  }

  async atualizar(req, res) {
    try {
      const contrato = await prisma.contrato.update({
        where: { id: parseInt(req.params.id) },
        data: {
          ...req.body,
          clienteId: parseInt(req.body.clienteId),
          usuarioId: parseInt(req.body.usuarioId),
        },
      })
      res.json(contrato)
    } catch (error) {
      res.status(500).json({ erro: 'Erro ao atualizar contrato' })
    }
  }
}

export default new ContratoController()
```

---

#### 4. Adicionar scripts úteis no `package.json`

📁 Local: [`backend/package.json`](backend/package.json)

```json
"scripts": {
  "dev": "nodemon src/index.js",
  "prisma:generate": "prisma generate",
  "prisma:studio": "prisma studio",
  "prisma:migrate": "prisma migrate dev"
}
```

---

#### 5. Configurar a variável de ambiente no `.env`

📁 Local: [`backend/.env`](backend/.env)

```env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/gestao_contratos?schema=public"
```

---

#### 6. Finalizar a configuração

No terminal:

```bash
cd backend

# Gerar o Prisma Client
npm run prisma:generate

# Abrir o Prisma Studio para testar visualmente
npm run prisma:studio
```

---

### 💡 Dicas Importantes

* O **Prisma Client** é gerado automaticamente a partir do seu `schema.prisma`.
* Sempre execute `npx prisma generate` após **modificar o schema**.
* Utilize o **Prisma Studio** (`npm run prisma:studio`) para visualizar e manipular os dados com interface visual durante o desenvolvimento.
* Em produção, **considere usar um pool de conexões** para melhor performance e estabilidade.

---

[<- PRISMA](/docs/Capitulos/01-PRISMA.md)

🏡[INÍCIO](docs/ANOTACOES.md)

<!-- [PRÓXIMO ->](docs/ANOTACOES.md) -->