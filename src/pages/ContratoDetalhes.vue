<template>
  <AppLayout>
    <!-- Cabeçalho -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h4 class="mb-1">Contrato {{ contrato.numero }}</h4>
        <div class="text-muted">{{ contrato.orgao }} 
          <span class="badge bg-danger ms-2">Expirado</span>
        </div>
      </div>
      <div>
        <button class="btn btn-outline-primary me-2">
          <i class="bi bi-pencil me-1"></i> Editar
        </button>
        <button class="btn btn-primary">
          <i class="bi bi-plus me-1"></i> Novo Aditivo
        </button>
      </div>
    </div>

    <!-- Navegação -->
    <ul class="nav nav-tabs mb-4">
      <li v-for="tab in tabs" :key="tab.id" class="nav-item">
        <a class="nav-link" 
           :class="{ active: currentTab === tab.id }"
           href="#"
           @click.prevent="currentTab = tab.id">
          {{ tab.name }}
        </a>
      </li>
    </ul>

    <!-- Conteúdo Dinâmico -->
    <component :is="currentView" :contrato="contrato"></component>
  </AppLayout>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'

const currentTab = ref('visao-geral')

const tabs = [
  { 
    id: 'visao-geral', 
    name: 'Visão Geral', 
    component: defineAsyncComponent(() => import('./contrato/views/VisaoGeral.vue')) 
  },
  { 
    id: 'documentos', 
    name: 'Documentos', 
    component: defineAsyncComponent(() => import('./contrato/views/Documentos.vue')) 
  },
  { id: 'aditivos', 
  name: 'Aditivos', 
  component: defineAsyncComponent(()=> import('./contrato/views/Aditivos.vue'))
  },
  { id: 'alertas', 
  name: 'Alertas', 
  component: defineAsyncComponent(() => import('./contrato/views/Alertas.vue')) 
  }
]

const currentView = computed(() => {
  const tab = tabs.find(t => t.id === currentTab.value)
  return tab?.component || VisaoGeral
})

const contrato = ref({
  numero: 'CONT-2023/1',
  orgao: 'Secretaria de Educação',
  objeto: 'Aquisição de material escolar',
  valor: 'R$ 120.000,00',
  inicio: '31/12/2022',
  fim: '14/06/2023'
})
</script>

<style scoped>
.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.progress {
  height: 8px;
  margin-bottom: 4px;
}

.nav-tabs .nav-link {
  color: #666;
}

.nav-tabs .nav-link.active {
  font-weight: 500;
  color: #0d6efd;
}
</style>