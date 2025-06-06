<template>
  <AppLayout>
    <h4 class="mb-4"><b>Novo Contrato</b></h4>
    <div class="card p-4 shadow-sm">
      <form @submit.prevent="salvarContrato">
        <div class="row g-3">
          <div class="col-md-12">
            <h5><b>Informações do Contrato</b></h5>
          </div>
           
          <div class="col-md-6">
            <label class="form-label">Número do Contrato*</label>
            <input v-model="form.numero" type="text" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Orgão*</label>
            <input v-model="form.orgao" type="text" class="form-control" required />
          </div>

          <div class="col-md-12">
            <label class="form-label">Objeto do Contrato*</label>
            <textarea v-model="form.objeto" class="form-control" rows="3" required></textarea>
          </div>

          <div class="col-md-6">
            <label class="form-label">Valor Global*</label>
            <input v-model="form.valor_global" type="number" step="0.01" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Valor Empenhado*</label>
            <input v-model="form.valor_empenhado" type="number" step="0.01" class="form-control" required />
          </div>

          <div class="col-md-4">
            <label class="form-label">Data de Início*</label>
            <input v-model="form.data_inicio" type="date" class="form-control" required />
          </div>

          <div class="col-md-4">
            <label class="form-label">Data de Término*</label>
            <input v-model="form.data_termino" type="date" class="form-control" required />
          </div>

          <div class="col-md-4">
            <label class="form-label">Tipo de Reajuste*</label>
            <select v-model="form.tipo_reajuste" class="form-select" required>
              <option value="">Selecione</option>
              <option value="INPC">INPC</option>
              <option value="IGPM">IGPM</option>
              <option value="IPCA">IPCA</option>
              <option value="TR">TR</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Arquivo do Contrato (PDF)</label>
            <input type="file" class="form-control" accept=".pdf" @change="handleArquivoContrato" />
          </div>

          <div class="col-md-6">
            <label class="form-label">Arquivo do Empenho (PDF)</label>
            <input type="file" class="form-control" accept=".pdf" @change="handleArquivoEmpenho" />
          </div>
        </div>

        <!-- Painel de Debug -->
        <div class="mt-4 p-3 bg-light rounded">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">Informações de Debug</h6>
            <button @click="preencherDadosTeste" class="btn btn-sm btn-outline-secondary">
              Preencher com Dados Teste
            </button>
          </div>
          
          <div v-if="requestData" class="mb-3">
            <h6>Dados Enviados:</h6>
            <pre>{{ requestData }}</pre>
          </div>
          
          <div v-if="debugData">
            <h6>Resposta do Servidor:</h6>
            <pre>{{ debugData }}</pre>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger mt-3">
          <h6>Erro:</h6>
          <p><strong>{{ error.message }}</strong></p>
          <div v-if="error.detalhes">
            <p class="mb-1">Detalhes:</p>
            <pre class="small">{{ error.detalhes }}</pre>
          </div>
          <ul v-if="error.camposFaltantes" class="mt-2">
            <li v-for="campo in error.camposFaltantes" :key="campo">
              <strong>{{ campo }}</strong>
            </li>
          </ul>
        </div>

        <div class="mt-4">
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="loading"
          >
            {{ loading ? 'Salvando...' : 'Salvar Contrato' }}
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'
import api from '../services/api'

const router = useRouter()
const loading = ref(false)
const error = ref(null)
const debugData = ref(null)
const requestData = ref(null)

// Formulário com todos os campos necessários
const form = ref({
  numero: '',
  orgao: '',
  objeto: '',
  valor_global: '',
  valor_empenhado: '',
  data_inicio: '',
  data_termino: '',
  tipo_reajuste: '',
  arquivo_contrato: null,
  arquivo_empenho: null,
  clienteId: 1,
  usuarioId: 1,
  status: 'Ativo'
})

// Manipulação de arquivos
function handleArquivoContrato(event) {
  form.value.arquivo_contrato = event.target.files[0] || null
  console.log('Arquivo do contrato selecionado:', form.value.arquivo_contrato?.name)
}

function handleArquivoEmpenho(event) {
  form.value.arquivo_empenho = event.target.files[0] || null
  console.log('Arquivo do empenho selecionado:', form.value.arquivo_empenho?.name)
}

// Função para preencher com dados de teste
function preencherDadosTeste() {
  form.value = {
    numero: 'CT-' + Math.floor(Math.random() * 10000),
    orgao: 'Secretaria Municipal de Testes',
    objeto: 'Contrato de prestação de serviços técnicos especializados',
    valor_global: (100000 + Math.random() * 50000).toFixed(2),
    valor_empenhado: (50000 + Math.random() * 25000).toFixed(2),
    data_inicio: new Date().toISOString().split('T')[0],
    data_termino: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tipo_reajuste: ['INPC', 'IGPM', 'IPCA'][Math.floor(Math.random() * 3)],
    clienteId: 1,
    usuarioId: 1,
    status: 'Ativo',
    arquivo_contrato: null,
    arquivo_empenho: null
  }
  console.log('Formulário preenchido com dados de teste:', form.value)
}

// Função principal para salvar contrato
async function salvarContrato() {
  try {
    loading.value = true
    error.value = null
    debugData.value = null
    requestData.value = null

    // Validação dos campos obrigatórios
    const camposObrigatorios = [
      'numero', 'orgao', 'objeto', 'valor_global',
      'valor_empenhado', 'data_inicio', 'data_termino', 'tipo_reajuste'
    ]
    
    const camposFaltantes = camposObrigatorios.filter(campo => {
      const value = form.value[campo]
      return value === null || value === undefined || value === ''
    })

    if (camposFaltantes.length > 0) {
      throw {
        message: 'Preencha todos os campos obrigatórios',
        camposFaltantes,
        tipo: 'validacao_frontend'
      }
    }

    // Preparar FormData para envio
    const formData = new FormData()
    
    // Adicionar campos textuais
    formData.append('numero', form.value.numero.trim())
    formData.append('orgao', form.value.orgao.trim())
    formData.append('objeto', form.value.objeto.trim())
    formData.append('valor_global', parseFloat(form.value.valor_global))
    formData.append('valor_empenhado', parseFloat(form.value.valor_empenhado))
    formData.append('data_inicio', form.value.data_inicio)
    formData.append('data_termino', form.value.data_termino)
    formData.append('tipo_reajuste', form.value.tipo_reajuste)
    formData.append('clienteId', form.value.clienteId)
    formData.append('usuarioId', form.value.usuarioId)
    formData.append('status', form.value.status)

    // Adicionar arquivos se existirem
    if (form.value.arquivo_contrato instanceof File) {
      formData.append('arquivo_contrato', form.value.arquivo_contrato)
    }
    if (form.value.arquivo_empenho instanceof File) {
      formData.append('arquivo_empenho', form.value.arquivo_empenho)
    }

    // Criar objeto para exibição dos dados enviados
    const payloadParaExibicao = {}
    for (let [key, value] of formData.entries()) {
      payloadParaExibicao[key] = value instanceof File ? 
        `[Arquivo: ${value.name} (${value.type}, ${(value.size/1024).toFixed(2)} KB)]` : 
        value
    }
    requestData.value = payloadParaExibicao

    // Log no console para debug
    console.group('Dados sendo enviados:')
    console.table(payloadParaExibicao)
    console.groupEnd()

    // Enviar para a API
    const response = await api.post('/contratos/novo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      transformRequest: [(data) => data] // Evitar transformação automática
    })

    debugData.value = {
      status: response.status,
      data: response.data,
      headers: response.headers
    }

    if (response.status === 201) {
      router.push('/contratos')
    }

  } catch (err) {
    console.error('Erro ao salvar contrato:', err)
    
    error.value = {
      message: err.response?.data?.message || err.message || 'Erro ao salvar contrato',
      detalhes: err.response?.data || err.stack,
      camposFaltantes: err.camposFaltantes,
      tipo: err.response?.status === 400 ? 'validacao_backend' : 'outro'
    }

    debugData.value = {
      error: err.response?.data || err.message,
      status: err.response?.status
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
pre {
  font-size: 0.8em;
  white-space: pre-wrap;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
}

.alert-danger pre {
  background-color: #f8d7da;
}
</style>