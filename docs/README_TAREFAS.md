# Lista de tarefas e progresso

---
**uma lista de tarefas (to-do list)** em etapas claras e progressivas.

---

## ✅ **TO-DO LIST – Sistema de Gestão de Contratos Públicos**

### 🗂️ 1. Organização Inicial do Projeto

* [ x ] Criar repositório Git para controle de versão
* [ x ] Criar estrutura de pastas do projeto (backend, frontend, docs, etc.)
* [ x ] Criar um README explicando o objetivo do sistema e tecnologias
* [ x ] Definir `.env` com variáveis de ambiente para desenvolvimento

---

### ⚙️ 2. Backend – Estrutura com Express e Prisma

#### Banco de Dados

* [ x ] Configurar o PostgreSQL via Docker
* [ x ] Criar schema do Prisma com as tabelas: `Aditivo`, `Alerta`, `Cliente`, `Contrato`, `Documento`, `Usuario`
* [ x ] Rodar `npx prisma migrate dev --name init` para criar as tabelas

#### API REST

* [ x ] Criar servidor Express
* [ x ] Configurar o Prisma Client
* [ ] Criar middleware de autenticação JWT
* [ ] Criar controle de permissões (RBAC) com base no perfil do usuário

#### Rotas básicas

* [ ] Auth: login e validação JWT
* [ ] Usuários: CRUD básico + filtro por perfil
* [ ] Contratos:

  * [ ] Criar novo contrato com upload de PDF (MinIO)
  * [ ] Listar contratos por status (vigente, vencido etc.)
  * [ ] Detalhes do contrato (dados + documentos)
* [ ] Aditivos:

  * [ ] Adicionar aditivo de prazo ou valor
  * [ ] Visualizar histórico de aditivos por contrato
* [ ] Alertas:

  * [ ] Criar alerta de vigência ou reajuste
  * [ ] Listar alertas futuros
  * [ ] Enviar alerta (simular via console/email)
  
### Backend Prioritário
* [ ] Implementar serviços básicos
  * [ ] UserService
  * [ ] ContractService
  * [ ] ClientService
* [ ] Criar middleware de autenticação
* [ ] Implementar validações de dados

### Frontend Prioritário
* [ ] Criar layouts base
* [ ] Implementar rotas protegidas
* [ ] Desenvolver componentes reutilizáveis
* [ ] Integrar com API

### Funcionalidades Core
* [ ] Sistema de autenticação completo
* [ ] CRUD de usuários
* [ ] CRUD de contratos
* [ ] CRUD de clientes
---

### ☁️ 3. Armazenamento com MinIO

* [ ] Subir MinIO via Docker
* [ ] Criar bucket para documentos
* [ ] Integrar upload de arquivos no backend
* [ ] Gerar URLs públicas/privadas dos documentos

---

### 🎨 4. Frontend com Vue 3

* [ ] Criar projeto Vue 3 com Vite
* [ ] Configurar roteamento com Vue Router
* [ ] Configurar autenticação JWT
* [ ] Tela de login com validação
* [ ] Tela Dashboard com cards (vigentes, vencidos, próximos alertas)
* [ ] Tela de cadastro de contrato
* [ ] Tela de detalhes do contrato com abas:

  * [ ] Aba Detalhes (dados e arquivos)
  * [ ] Aba Aditivos (lista + botão novo aditivo)
  * [ ] Aba Alertas (lista + novo alerta)
* [ ] Tela de usuários (apenas para Admin)
* [ ] Tela de relatórios simples (por status, período)

---

### 🔔 5. Alertas e Notificações

* [ ] Criar job scheduler com `node-cron` ou `bull` + Redis
* [ ] Verificar alertas a serem enviados diariamente
* [ ] Enviar e-mail com Nodemailer
* [ ] \[Opcional] Enviar via WhatsApp com Evolution API

---

### 📊 6. Relatórios e Exportações

* [ ] Criar filtros de contratos por status/data
* [ ] Gerar PDF/Excel de relatórios
* [ ] Exportar histórico de aditivos e custos

---

### 🛡️ 7. Segurança e Controle de Acesso

* [ ] Middleware RBAC por perfil de usuário
* [ ] Validação de ações sensíveis (como delete, update)
* [ ] Logs de ações (quem criou/editou o quê e quando)

---

### 🧪 8. Testes e Validação

* [ ] Testar cada rota da API com Postman
* [ ] Validar formulários no frontend
* [ ] Testar upload e download de arquivos
* [ ] Simular alertas e recebimento de e-mails

---

### 🚀 9. Deploy e Hospedagem

* [ ] Criar Dockerfile e docker-compose com frontend, backend e banco
* [ ] Configurar Portainer para gerenciar containers
* [ ] Configurar variáveis `.env` em produção
* [ ] Verificar portas expostas: API, MinIO, Frontend

---

## 📚 Tecnologias a Usar

| Categoria      | Tecnologia                           |
| -------------- | ------------------------------------ |
| Frontend       | Vue 3, Vite, Vue Router, Axios       |
| Backend        | Node.js, Express, Prisma ORM         |
| Banco de Dados | PostgreSQL + Docker                  |
| Autenticação   | JWT                                  |
| RBAC           | Middleware personalizado             |
| Armazenamento  | MinIO (S3-compatible)                |
| Notificações   | Nodemailer, Evolution API (WhatsApp) |
| Agendador      | Bull + Redis ou node-cron            |
| Hospedagem     | Portainer                            |

---


