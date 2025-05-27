Para essa tarefa, você precisará criar **diversas páginas (ou seções)** no sistema web, cada uma voltada para um aspecto essencial da gestão de contratos públicos. Abaixo está a análise com **todas as páginas que precisam ser criadas** para cobrir os requisitos:

---

### 📌 **1. Página de Login e Autenticação**

* **Objetivo:** Permitir acesso seguro com base no perfil do usuário.
* **Componentes:** Login, recuperação de senha, autenticação JWT, redirecionamento com base no papel (RBAC).

---

### 📊 **2. Dashboard (Home)**

* **Objetivo:** Visão geral com informações importantes de forma rápida.
* **Componentes:**

  * Cards: Contratos vigentes, a vencer, vencidos
  * Linha do tempo dos próximos alertas
  * Lista de pendências (to-do list)
  * Filtros por status e datas

---

### 📄 **3. Página de Contratos**

#### 3.1 Listagem de Contratos

* **Objetivo:** Exibir todos os contratos com filtros e busca.
* **Componentes:** Tabela com número, órgão, status, botão "ver detalhes", filtros.

#### 3.2 Página de Detalhes do Contrato

* **Objetivo:** Visualizar e editar os dados de um contrato.
* **Abas:**

  * **Detalhes:** Todos os dados + arquivos do contrato/empenho
  * **Aditivos:** Listagem + botão “Novo Aditivo”
  * **Alertas:** Visualizar e configurar alertas do contrato
  * **Histórico:** Log de alterações

---

### ➕ **4. Página de Cadastro / Edição de Contrato**

* **Objetivo:** Criar e editar contratos.
* **Componentes:**

  * Formulário completo com validação
  * Upload de arquivos (drag-and-drop)
  * Escolha do tipo de reajuste

---

### ✍️ **5. Página de Cadastro / Edição de Aditivo**

* **Objetivo:** Inserir aditivos (prazo ou valor).
* **Componentes:**

  * Escolha do tipo (prazo ou valor)
  * Formulário com validação
  * Upload de PDF
  * Motivo do aditivo
  * Cálculo automático do novo valor ou nova vigência

---

### 🔔 **6. Página de Alertas**

* **Objetivo:** Visualizar, configurar e auditar os alertas.
* **Componentes:**

  * Lista de alertas configurados
  * Botão para novo alerta
  * Histórico de alertas enviados
  * Filtros por tipo (vigência, reajuste)

---

### 📈 **7. Página de Relatórios**

* **Objetivo:** Geração e exportação de relatórios.
* **Componentes:**

  * Relatórios de contratos por status
  * Relatórios de aditivos por período
  * Exportação para Excel/PDF

---

### 🔐 **8. Página de Gestão de Usuários e Permissões (Admin)**

* **Objetivo:** Gestão de acessos por perfis.
* **Componentes:**

  * Cadastro/edição de usuários
  * Definição de perfil (Admin, Gestor, etc.)
  * Logs de ações realizadas por usuário

---

### 📝 **9. Página de Auditoria (Logs do Sistema)**

* **Objetivo:** Transparência e controle sobre alterações.
* **Componentes:**

  * Quem fez o quê e quando
  * Logs de criação, edição e exclusão

---

### 📂 **10. Página de Documentos (opcional)**

* **Objetivo:** Biblioteca de todos os arquivos anexados.
* **Componentes:** Filtro por contrato/aditivo, tipo de documento

---

## ✅ Resumo das Páginas a Criar

| Página                             | Responsável (Perfil)           |
| ---------------------------------- | ------------------------------ |
| Login e Autenticação               | Todos                          |
| Dashboard                          | Todos                          |
| Listagem de Contratos              | Gestor, Operacional, Leitura   |
| Detalhes do Contrato (com abas)    | Gestor                         |
| Cadastro / Edição de Contrato      | Gestor                         |
| Cadastro / Edição de Aditivo       | Gestor                         |
| Alertas (configuração + histórico) | Gestor                         |
| Relatórios                         | Gestor, Admin                  |
| Gestão de Usuários                 | Admin                          |
| Auditoria de Logs                  | Admin                          |
| Biblioteca de Documentos           | Todos (diferente visualização) |

---

Se quiser, posso te ajudar a **organizar isso como estrutura de rotas para Vue Router**, ou te mostrar um esboço visual (wireframe básico) de cada tela. Deseja isso?
