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
        <input class="form-control w-25" type="search" placeholder="Buscar por número, órgão ou objeto..." />
        <div>
          <button class="btn btn-outline-secondary me-2">Filtros</button>
          <button class="btn btn-outline-secondary me-2">Ordenar</button>
        </div>
      </div>
    </div>
    
    <div class="card p-4 shadow-sm mt-3">
      <table class="table table-hover">
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
          <tr v-for="contrato in contratos" :key="contrato.id">
            <td>{{ contrato.numero }}</td>
            <td>{{ contrato.orgao }}</td>
            <td class="truncate">{{ contrato.objeto }}</td>
            <td>{{ formatCurrency(contrato.valor_global) }}</td>
            <td>Início: {{ formatDate(contrato.data_inicio) }} <br>Fim: {{ formatDate(contrato.data_termino) }}</td>
            <td>
              <span class="badge bg-success" v-if="contrato.status=='Ativo'"><b>Ativo</b></span>
              <span class="badge bg-danger" v-else=>Ativo<b>Expírado</b></span>
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
import { onMounted, ref } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import api from '../services/api'
 
const contratos = ref([])

const buscarContratos = async () =>{
  try {
    const response = await api.get('/contratos/lista')
    contratos.value = response.data
  } catch (error) {
    console.error('Erro ao buscar contratos:', error)
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

onMounted(() => {
  buscarContratos()
})

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

// const contratos = ref([
//   { 
//     numero: 'CONT-2023/1', 
//     orgao: 'Secretaria de Educação', 
//     objeto: 'Aquisição de material escolar', 
//     valor: 'R$ 120.000,00', 
//     inicio: '31/12/2022', 
//     fim: '14/06/2023' 
//   },
//   { 
//     numero: 'CONT-2023/2', 
//     orgao: 'Secretaria de Saúde', 
//     objeto: 'Serviços de manutenção predial', 
//     valor: 'R$ 450.000,00', 
//     inicio: '31/01/2023', 
//     fim: '31/01/2024' 
//   },
//   { 
//     numero: 'CONT-2023/3', 
//     orgao: 'Secretaria de Obras', 
//     objeto: 'Pavimentação de vias urbanas', 
//     valor: 'R$ 1.200.000,00', 
//     inicio: '14/01/2023', 
//     fim: '14/07/2023' 
//   },
//   { 
//     numero: 'CONT-2023/4', 
//     orgao: 'Secretaria de Administração', 
//     objeto: 'Serviços de TI', 
//     valor: 'R$ 320.000,00', 
//     inicio: '09/01/2023', 
//     fim: '30/04/2023' 
//   },
//   { 
//     numero: 'CONT-2023/5', 
//     orgao: 'Secretaria de Cultura', 
//     objeto: 'Organização de eventos cultura...', 
//     valor: 'R$ 180.000,00', 
//     inicio: '04/01/2023', 
//     fim: '04/07/2023' 
//   },
//   { 
//     numero: 'CONT-2023/6', 
//     orgao: 'Secretaria de Esportes', 
//     objeto: 'Manutenção de quadras espor...', 
//     valor: 'R$ 250.000,00', 
//     inicio: '14/12/2022', 
//     fim: '14/06/2023' 
//   },
//   { 
//     numero: 'Vine testes', 
//     orgao: 'Secretaria de Saúde', 
//     objeto: 'Testar se a suade esta okay', 
//     valor: 'R$ 251.557,00', 
//     inicio: '12/05/2025', 
//     fim: '30/05/2025' 
//   }
// ])
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