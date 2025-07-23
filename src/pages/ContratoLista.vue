<template>
  <AppLayout>
    <div>
      <div class="d-flex justify-content-between mb-3">
        <h4 class="mb-4"><b>Contratos</b></h4>
        <div>
          <button class="btn btn-primary" @click="$router.push('/contratos/cadastro')">Novo Contrato</button>
        </div>
      </div>
    </div>
    
    <div class="card p-4 shadow-sm">
      <div class="d-flex justify-content-between mb-3">
        <input class="form-control w-25" type="search" placeholder="Buscar por número, órgão ou objeto..." v-model="searchQuery" />
        <div>
          <button class="btn btn-outline-secondary me-2">Filtros</button>
          <button class="btn btn-outline-secondary me-2">Ordenar</button>
        </div>
      </div>
    </div>
    
    <div class="card p-4 shadow-sm mt-3">
      <div v-if="loading">Carregando...</div>
      <div v-else-if="contratos.length === 0">Nenhum contrato cadastrado.</div>
      <table v-else class="table table-hover">
        <thead>
          <tr>
            <th>Número</th>
            <th>Órgão</th>
            <th>Objeto</th>
            <th>Valor</th>
            <th>Vigência</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contrato in filteredContratos" :key="contrato.id">
            <td>{{ contrato.numero }}</td>
            <td>{{ contrato.orgao }}</td>
            <td class="truncate">{{ contrato.objeto }}</td>
            <td>{{ formatCurrency(contrato.valor_global) }}</td>
            <td>Início: {{ formatDate(contrato.data_inicio) }} <br>Fim: {{ formatDate(contrato.data_termino) }}</td>
            <td>
              <span class="badge bg-success" v-if="contrato.status === 'Ativo'"><b>Ativo</b></span>
              <span class="badge bg-danger" v-else><b>Inativo</b></span>
            </td>
            <td>
              <router-link :to="{ name: 'ContratoDetalhes', params: { id: contrato.id } }">Detalhes</router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import api from '../services/api'

const contratos = ref([])
const loading = ref(false)
const searchQuery = ref('')

const buscarContratos = async () => {
  loading.value = true
  try {
    const response = await api.get('contract/listar')
    contratos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar contratos:', error)
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
}

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const filteredContratos = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return contratos.value.filter(contrato => {
    return contrato.numero.toLowerCase().includes(query) ||
           contrato.orgao.toLowerCase().includes(query) ||
           contrato.objeto.toLowerCase().includes(query)
  })
})

onMounted(() => {
  buscarContratos()
})
</script>

<style scoped>
.table th, .table td {
  vertical-align: middle;
}
.badge {
  font-size: 0.85rem;
  padding: 0.35em 0.65em;
}
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px; /* Ajuste conforme necessário */
}
</style>