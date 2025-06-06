<template>
  <div class="row">
    <!-- Informações do Contrato -->
    <div class="col-md-6 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">Informações do Contrato</h5>
          
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Número</label>
              <div>{{ contrato.numero }}</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Órgão</label>
              <div>{{ contrato.orgao }}</div>
            </div>
          </div>

          <div class="mb-3">
            <label class="text-muted small mb-1">Objeto</label>
            <div>{{ contrato.objeto }}</div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Valor Global</label>
              <div>{{ formatCurrency(contrato.valor_global) }}</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Valor Empenhado</label>
              <div>{{ formatCurrency(contrato.valor_empenhado) }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Data de Início</label>
              <div>{{ formatDate(contrato.data_inicio) }}</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Data de Término</label>
              <div>{{ formatDate(contrato.data_termino) }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Tipo de Reajuste</label>
              <div>{{ contrato.tipo_reajuste }}</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Status</label>
              <div><span :class="{'badge bg-success': contrato.status === 'Ativo', 'badge bg-danger': contrato.status !== 'Ativo'}">{{ contrato.status }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumo Financeiro -->
    <div class="col-md-6">
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title mb-4">Resumo Financeiro</h5>
          
          <div class="mb-3">
            <label class="text-muted small mb-1">Valor Total</label>
            <div>{{ formatCurrency(contrato.valor_global) }}</div>
          </div>

          <div class="mb-3">
            <label class="text-muted small mb-1">Valor Empenhado</label>
            <div>{{ formatCurrency(contrato.valor_empenhado) }}</div>
          </div>

          <div class="mb-3">
            <label class="text-muted small mb-1">Percentual Utilizado</label>
            <div class="progress">
              <div class="progress-bar" role="progressbar" :style="{ width: getPercentualUtilizado + '%' }"></div>
            </div>
            <small class="text-muted">{{ getPercentualUtilizado }}%</small>
          </div>
        </div>
      </div>

      <!-- Aditivos Recentes -->
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">Aditivos Recentes</h5>
          
          <div class="d-flex align-items-center mb-3">
            <i class="bi bi-clock-history me-2 text-muted"></i>
            <div>
              <div>Aditivo de Valor</div>
              <small class="text-muted">15/03/2023</small>
            </div>
          </div>

          <button class="btn btn-light w-100">
            <i class="bi bi-plus me-1"></i> Adicionar Aditivo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router';
import api from '../../../services/api'

const route = useRoute();
const contratoId = route.params.id;

const contrato = ref({})

const buscarContrato = async (id) => {
  try {
    const response = await api.get(`/contratos/${id}`)
    contrato.value = response.data
  }catch (error) {
    console.error('Erro ao buscar contrato:', error)
  }
}

const formatCurrency = (value) => {
  if (value === null || value === undefined) return 'R$ 0,00';
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString)
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getPercentualUtilizado = computed(() => {
  if (!contrato.value.valor_global || !contrato.value.valor_empenhado) return 0;
  const percentual = (contrato.value.valor_empenhado / contrato.value.valor_global) * 100;
  return percentual.toFixed(0);
})

onMounted(() =>{
  buscarContrato(contratoId)
})
</script>

<style scoped>
.progress {
  height: 8px;
  margin-bottom: 4px;
}

.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.card-body label {
  color: #6c757d;
  font-size: 0.875rem;
}
</style>