## 🗂️ Anotações de Setup do Prisma com PostgreSQL Local

### ✅ 1. Instalar o Prisma no projeto

```bash
npm install prisma --save-dev
npm install @prisma/client
```

### ✅ 2. Inicializar o Prisma

```bash
npx prisma init
```

> Isso vai criar a pasta `/prisma` com o arquivo `schema.prisma`, além de um arquivo `.env`.

### ✅ 3. Configurar o `.env`

No arquivo `.env`, adicione a conexão com seu PostgreSQL local:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5433/prisma_app?schema=public"
```

> Ajuste `admin`, `5433` e `prisma_app` conforme seu setup local.

### ✅ 4. Criar o schema no `prisma/schema.prisma`

Crie ou edite os modelos (`model Usuario`, `Cliente`, `Contrato`, etc.)

---

### 🚀 5. Criar o banco com base no schema (primeira vez)

```bash
npx prisma migrate dev --name init
```

> Isso:
>
> * Cria a pasta `prisma/migrations`
> * Aplica o schema no banco
> * Gera o Prisma Client automaticamente

---

### 🔄 6. Se der erro ou precisar resetar (atenção: apaga os dados)

```bash
npx prisma migrate reset
```

> Isso:
>
> * Apaga o schema atual
> * Recria o banco do zero com base nas migrações existentes

---

### 🧠 7. Dica extra: gerar o Prisma Client manualmente

```bash
npx prisma generate
```

> Útil se você mudar apenas o `schema.prisma` mas não quiser rodar migrações ainda.

---

### 👀 8. Visualizar dados via interface web

```bash
npx prisma studio
```

> Abre uma interface para visualizar e editar os dados no navegador.

---

### ✅ 9. **Como atualizar o schema sem perder os dados**

Se você **adicionar**, **remover** ou **alterar campos** em seu `schema.prisma`, faça o seguinte:

1. **Edite o `schema.prisma` normalmente**
2. Rode o comando:

```bash
npx prisma migrate dev --name nome_da_mudanca
```

> Exemplo:
>
> ```bash
> npx prisma migrate dev --name add-coluna-status-cliente
> ```

Esse comando:

* Gera uma nova **migração incremental**
* **Mantém os dados existentes**
* Atualiza o banco com base na mudança
* Gera o novo Prisma Client

---

### ✅10. Dica profissional: use migrações incrementais

O nome da migration, como create-cliente, é um identificador descritivo que você escolhe para explicar a alteração feita no banco de dados. Ele não interfere tecnicamente na execução da migration, mas serve para organização e rastreabilidade do histórico.

Sempre que fizer uma mudança no schema, gere uma nova migração com um nome que ajude a entender o que mudou. Isso facilita:

* Controle de versão do banco
* Colaboração com outras pessoas
* Voltar atrás em caso de erro

✅ Como escolher o nome da migration?

A ideia é responder à pergunta:
✅ Como escolher o nome da migration?

A ideia é responder à pergunta:

    “O que estou mudando no schema?”

Veja alguns exemplos:

| Alteração feita no `schema.prisma`                           | Nome sugerido para a migration         |
|--------------------------------------------------------------|----------------------------------------|
| Criação do modelo Cliente                                    | create-cliente                         |
| Adição do campo telefone no modelo Cliente                   | add-telefone-cliente                   |
| Remoção da tabela Contrato                                   | remove-contrato                        |
| Alteração do tipo do campo cnpj de String para Int           | change-cnpj-type                       |
| Criação de relação entre Cliente e Contrato                  | add-relacao-cliente-contrato           |
    
---

[INÍCIO](/docs/ANOTACOES.md)