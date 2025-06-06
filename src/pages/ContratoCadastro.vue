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

        <!-- Painel de Debug (opcional) -->
        <div v-if="debugMode" class="mt-4 p-3 bg-light rounded">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">Informações de Debug</h6>
            <button @click="preencherDadosTeste" class="btn btn-sm btn-outline-secondary">
              Preencher com Dados Teste
            </button>
          </div>
          
          <div class="mb-3">
            <h6>Dados Enviados:</h6>
            <pre>{{ form }}</pre>
          </div>
        </div>

        <div v-if="error" class="alert alert-danger mt-3">
          <h6>Erro:</h6>
          <p><strong>{{ error }}</strong></p>
        </div>

        <div v-if="mensagem" class="alert alert-success mt-3">
          <h6>Sucesso:</h6>
          <p><strong>{{ mensagem }}</strong></p>
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

<script>
import AppLayout from '../layouts/AppLayout.vue'

export default {
  components: {
    AppLayout
  },
  data() {
    return {
      loading: false,
      error: null,
      mensagem: null,
      debugMode: true, // Altere para false para desativar o debug
      form: {
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
      }
    }
  },
  methods: {
    handleArquivoContrato(event) {
      this.form.arquivo_contrato = event.target.files[0] || null
    },
    handleArquivoEmpenho(event) {
      this.form.arquivo_empenho = event.target.files[0] || null
    },
    preencherDadosTeste() {
      this.form = {
        numero: 'TESTE-' + Math.floor(Math.random() * 1000),
        orgao: 'Órgão Teste',
        objeto: 'Objeto de teste simplificado',
        valor_global: 39237.11,
        valor_empenhado: 22906.28,
        data_inicio: '2025-06-06',
        data_termino: '2025-07-06',
        tipo_reajuste: 'IPCA',
        clienteId: 1,
        usuarioId: 1,
        status: 'Ativo',
        arquivo_contrato: null,
        arquivo_empenho: null
      }
    },
    async salvarContrato() {
      try {
        this.loading = true
        this.error = null
        this.mensagem = null

        // Validação simples
        if (!this.form.numero || !this.form.orgao || !this.form.objeto) {
          throw new Error('Preencha os campos obrigatórios')
        }

        // Preparar dados para envio (sem os arquivos)
        const dadosParaEnvio = {
          numero: this.form.numero,
          orgao: this.form.orgao,
          objeto: this.form.objeto,
          valor_global: parseFloat(this.form.valor_global),
          valor_empenhado: parseFloat(this.form.valor_empenhado),
          data_inicio: this.form.data_inicio,
          data_termino: this.form.data_termino,
          tipo_reajuste: this.form.tipo_reajuste,
          clienteId: this.form.clienteId,
          usuarioId: this.form.usuarioId,
          status: this.form.status
        }

        // Enviar para a API (usando o endpoint do seu código que funciona)
        const response = await fetch('http://localhost:3000/api/contratos/novo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dadosParaEnvio)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Erro ao salvar contrato')
        }

        this.mensagem = 'Contrato salvo com sucesso!'
        
        // Limpar formulário após 2 segundos
        setTimeout(() => {
          this.form = {
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
          }
          this.mensagem = null
        }, 2000)

      } catch (err) {
        console.error('Erro:', err)
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
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