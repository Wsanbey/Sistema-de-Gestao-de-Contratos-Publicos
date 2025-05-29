````markdown
# 📑 Sistema de Gestão de Contratos Públicos

Painel web para cadastro, controle e monitoramento de contratos públicos com aditivos, alertas automáticos e relatórios gerenciais.

## 🚀 Visão Geral

Este sistema foi criado para ajudar na **gestão de contratos com órgãos públicos**, focando em:
- Controle de vigência e reajustes
- Automação de alertas e notificações
- Relatórios auditáveis
- Interface amigável para não técnicos

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** [Vue 3](https://vuejs.org/) + [Vite](https://vitejs.dev/)
- **UI:** BootstrapVue 3
- **Validação:** VeeValidate + Yup
- **Autenticação:** JWT + RBAC
- **Armazenamento:** AWS S3 (arquivos)
- **Notificações:** Nodemailer (e-mail), WhatsApp API (Evolution)
- **Orquestração / Jobs:** n8n ou Laravel + Redis + Bull
- **Banco de Dados:** PostgreSQL

---

## 📦 Instalação e Execução

```bash
# Clone o projeto
git clone https://github.com/seu-usuario/sistema-gestao-contratos.git
cd sistema-gestao-contratos

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
````

---

## 📁 Estrutura Inicial (Frontend)

```
sistema-gestao-contratos/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── router/
│   ├── services/
│   ├── App.vue
│   └── main.js
├── .gitignore
├── index.html
├── package.json
└── README.md
```

---

## 👥 Perfis de Usuário

| Perfil          | Permissões principais                   |
| --------------- | --------------------------------------- |
| **Admin**       | Controle total, relatórios globais      |
| **Gestor**      | Cadastrar contratos, aditivos, alertas  |
| **Operacional** | Visualizar e anexar documentos          |
| **Leitura**     | Acesso somente a relatórios e dashboard |

---

## ✅ Funcionalidades

* Cadastro completo de contratos e documentos
* Gerenciamento de aditivos de prazo/valor
* Configuração de alertas automáticos (email, SMS)
* Painel com indicadores e timeline de vencimentos
* Exportação de relatórios em Excel e PDF
* Controle de acesso por perfil (RBAC)
* Log completo de alterações (auditoria)

---

## 📅 Roadmap

* [x] Estrutura do projeto com Vue + Vite
* [ ] Tela de cadastro de contrato
* [ ] Tela de aditivos com histórico
* [ ] Alertas automáticos (integração com backend)
* [ ] Exportação de relatórios
* [ ] Autenticação e controle de acesso

---
## Documentação adicional

- 📌 [Tarefas do Projeto](docs/README_TAREFAS.md)
- 🔐 [Variáveis de Ambiente / Credenciais](docs/README_CREDENCIAIS.md)
- 🏗️ [Arquitetura e Estrutura do Sistema](docs/README_ARQUITETURA.md)

---

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```

---

MIT License

Copyright (c) 2025 LGC Consultoria Empresarial e Administrativa

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


```
