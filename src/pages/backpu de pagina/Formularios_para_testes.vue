<template>
  <AppLayout>
    <h4 class="mb-4"><b>Teste de Contrato (Versão Debug)</b></h4>
    <div class="card p-4 shadow-sm">
      <form @submit.prevent="salvarContratoTeste">
        <!-- Seção de Controles de Teste -->
        <div class="mb-4 p-3 bg-light rounded">
          <h6>Opções de Teste:</h6>
          <div class="form-check">
            <input v-model="mockToken" type="checkbox" class="form-check-input" id="mockToken">
            <label class="form-check-label" for="mockToken">Usar token mock</label>
          </div>
          <button type="button" @click="preencherDadosTeste" class="btn btn-sm btn-outline-secondary mt-2">
            Preencher Automático
          </button>
        </div>

        <!-- Campos do Formulário -->
        <div class="row g-3">
          <!-- Campos principais -->
          <div class="col-md-6">
            <label class="form-label">Número do Contrato*</label>
            <input v-model="formTeste.numero" type="text" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Orgão*</label>
            <input v-model="formTeste.orgao" type="text" class="form-control" required />
          </div>

          <!-- ... outros campos ... -->

          <!-- Campos ocultos obrigatórios -->
          <input type="hidden" v-model="formTeste.clienteId" />
          <input type="hidden" v-model="formTeste.usuarioId" />
        </div>

        <!-- Seção de Status -->
        <div class="mt-4">
          <div v-if="loading" class="alert alert-info">
            Enviando dados ao servidor...
          </div>
          
          <div v-if="error" class="alert alert-danger mt-3">
            <h6>Erro Detalhado:</h6>
            <template v-if="error.camposFaltantes">
              <p>Campos obrigatórios faltando:</p>
              <ul>
                <li v-for="campo in error.camposFaltantes" :key="campo">{{ campo }}</li>
              </ul>
            </template>
            <p v-else>{{ error.message || error }}</p>
            <button @click="showRawError = !showRawError" class="btn btn-sm btn-outline-danger">
              {{ showRawError ? 'Ocultar' : 'Mostrar' }} detalhes técnicos
            </button>
            <pre v-if="showRawError">{{ error }}</pre>
          </div>

          <button 
            type="submit" 
            class="btn btn-primary mt-3"
            :disabled="loading"
          >
            {{ loading ? 'Testando...' : 'Testar Envio' }}
          </button>
        </div>

        <!-- Painel de Debug Avançado -->
        <div class="mt-4 p-3 bg-light rounded">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">Painel de Debug</h6>
            <button @click="refreshDebug" class="btn btn-sm btn-outline-primary">
              Atualizar
            </button>
          </div>
          
          <div class="row">
            <div class="col-md-6">
              <h6>Dados Enviados:</h6>
              <pre>{{ formatDebug(formTeste) }}</pre>
            </div>
            <div class="col-md-6">
              <h6>Resposta:</h6>
              <pre>{{ formatDebug(debugData) }}</pre>
            </div>
          </div>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'
import api from '../../services/api'

// Estado do componente
const loading = ref(false)
const error = ref(null)
const debugData = ref(null)
const showRawError = ref(false)
const mockToken = ref(true)

// Dados do formulário
const formTeste = ref({
  numero: '',
  orgao: '',
  objeto: '',
  valor_global: '',
  valor_empenhado: '',
  data_inicio: '',
  data_termino: '',
  tipo_reajuste: '',
  clienteId: 1,
  usuarioId: 1,
  status: 'Ativo'
})

// Métodos
function preencherDadosTeste() {
  formTeste.value = {
    numero: 'TESTE-' + Math.floor(Math.random() * 1000),
    orgao: 'Órgão Teste ' + Math.floor(Math.random() * 10),
    objeto: 'Objeto de teste simplificado',
    valor_global: (Math.random() * 100000).toFixed(2),
    valor_empenhado: (Math.random() * 50000).toFixed(2),
    data_inicio: new Date().toISOString().split('T')[0],
    data_termino: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tipo_reajuste: ['INPC', 'IGPM', 'IPCA', 'TR'][Math.floor(Math.random() * 4)],
    clienteId: 1,
    usuarioId: 1,
    status: 'Ativo'
  }
}

function formatDebug(data) {
  if (!data) return 'Nenhum dado disponível'
  return JSON.stringify(data, null, 2)
}

function refreshDebug() {
  debugData.value = { ...debugData.value } // Força reatividade
}

async function salvarContratoTeste() {
  try {
    loading.value = true
    error.value = null
    debugData.value = null

    // Configuração do token mock (se habilitado)
    if (mockToken.value) {
      localStorage.setItem('token', 'TOKEN_TESTE_123')
    }

    // Log dos dados sendo enviados
    console.groupCollapsed('Dados do Teste')
    console.table(formTeste.value)
    console.groupEnd()

    // Envio para API
    const startTime = performance.now()
    const response = await api.post('/contratos/novo', formTeste.value)
    const endTime = performance.now()

    debugData.value = {
      status: response.status,
      tempoResposta: `${(endTime - startTime).toFixed(2)}ms`,
      data: response.data
    }

    alert('✅ Teste realizado com sucesso! Verifique o console para detalhes.')
    
  } catch (err) {
    error.value = {
      message: err.response?.data?.erro || err.message,
      camposFaltantes: err.response?.data?.camposFaltantes,
      ...err.response?.data
    }
    debugData.value = {
      error: err.response?.data || err.message,
      status: err.response?.status
    }
    console.error('Erro completo:', err)
  } finally {
    loading.value = false
  }
}

// Preenche automaticamente ao carregar
preencherDadosTeste()
</script>

<style scoped>
pre {
  font-size: 0.8em;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  padding: 10px;
  border-radius: 4px;
}
</style>