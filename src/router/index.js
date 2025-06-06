import { createRouter, createWebHashHistory } from 'vue-router'
import ContratoLista from '../pages/ContratoLista.vue'
import ContratoCadastro from '../pages/ContratoCadastro.vue'
import Dashboard from '../pages/Dashboard.vue'
import Alertas from '../pages/Alertas.vue'
import Calendario from '../pages/Calendario.vue'
import Relatorios from '../pages/Relatorios.vue'
import Usuarios from '../pages/Usuarios.vue'
import Configuracoes from '../pages/Configuracoes.vue'
import AppLayout from '../layouts/AppLayout.vue' // Importar o AppLayout como componente pai


import Formularios_para_testes from '../pages/Formularios_para_testes.vue'



const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/contratos', name: 'Contratos', component: ContratoLista },
  { path: '/contratos/cadastro', name: 'ContratoCadastro', component: ContratoCadastro },
  { path: '/alertas', name: 'Alertas', component: Alertas },
  { path: '/calendario', name: 'Calendario', component: Calendario },
  { path: '/relatorios', name: 'Relatorios', component: Relatorios },
  { path: '/usuarios', name: 'Usuarios', component: Usuarios },
  { path: '/configuracoes', name: 'Configuracoes', component: Configuracoes },
  {
    path: '/contratos/:id',
    name: 'ContratoDetalhes',
    component: () => import('@/pages/ContratoDetalhes.vue')
  },
  
  {path: '/formulario_teste', name: 'Formularios_para_testes', component: Formularios_para_testes}

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router