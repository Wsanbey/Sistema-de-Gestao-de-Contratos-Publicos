<template>
  <AppLayout>
    <h4 class="mb-4"><b>Novo Contrato</b></h4>
    <div class="card p-4 shadow-sm">
      <form @submit.prevent="salvarContrato">
        <!-- Informações do Contrato -->
        <div class="row g-3">
          <div class="col-md-12">
            <h5><b>Informações do Contrato</b></h5>
          </div>

          <div class="col-md-6">
            <label class="form-label">Número do Contrato*</label>
            <input v-model="form.numero" type="text" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Órgão*</label>
            <input v-model="form.orgao" type="text" class="form-control" required />
          </div>

          <div class="col-md-12">
            <label class="form-label">Objeto do Contrato*</label>
            <textarea v-model="form.objeto" class="form-control" rows="3" required></textarea>
          </div>

          <div class="col-md-6">
            <label class="form-label">Valor Global*</label>
            <input v-model="form.valor_global" type="number" step="0.01" min="0" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Valor Empenhado*</label>
            <input v-model="form.valor_empenhado" type="number" step="0.01" min="0" class="form-control" required />
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
            <input
              ref="arquivoContratoInput"
              type="file"
              class="form-control"
              accept=".pdf"
              name="arquivo_contrato"
              @change="handleArquivoContrato"
            />
            <small v-if="form.arquivo_contrato" class="text-muted">
              Arquivo selecionado: {{ form.arquivo_contrato.name }}
            </small>
          </div>

          <div class="col-md-6">
            <label class="form-label">Arquivo do Empenho (PDF)</label>
            <input
              ref="arquivoEmpenhoInput"
              type="file"
              class="form-control"
              accept=".pdf"
              name="arquivo_empenho"
              @change="handleArquivoEmpenho"
            />
            <small v-if="form.arquivo_empenho" class="text-muted">
              Arquivo selecionado: {{ form.arquivo_empenho.name }}
            </small>
          </div>
        </div>

        <!-- Documentos -->
        <div class="mt-4">
          <h5><b>Documentos Adicionais</b></h5>
          <div v-for="(doc, index) in form.documentos" :key="index" class="card p-3 mb-2">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">Nome do Documento*</label>
                <input v-model="doc.nome" type="text" class="form-control" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Tipo do Documento*</label>
                <select v-model="doc.tipo" class="form-select" required>
                  <option value="">Selecione</option>
                  <option value="Anexo">Anexo</option>
                  <option value="Relatório">Relatório</option>
                  <option value="Comprovante">Comprovante</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>
              <div class="col-md-4">
                <label class="form-label">Arquivo (PDF)*</label>
                <input
                  type="file"
                  class="form-control"
                  accept=".pdf"
                  @change="event => handleDocumentoArquivo(event, index)"
                  required
                />
                <small v-if="doc.file" class="text-muted">
                  Arquivo selecionado: {{ doc.file.name }}
                </small>
              </div>
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click="removerDocumento(index)"
                >
                  Remover Documento
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary mt-2"
            @click="adicionarDocumento"
          >
            Adicionar Documento
          </button>
        </div>

        <!-- Aditivos -->
        <div class="mt-4">
          <h5><b>Aditivos</b></h5>
          <div v-for="(aditivo, index) in form.aditivos" :key="index" class="card p-3 mb-2">
            <div class="row g-3">
              <div class="col-md-4">
                <label class="form-label">Número do Aditivo*</label>
                <input v-model="aditivo.numero" type="text" class="form-control" required />
              </div>
              <div class="col-md-8">
                <label class="form-label">Descrição*</label>
                <input v-model="aditivo.descricao" type="text" class="form-control" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Valor*</label>
                <input
                  v-model="aditivo.valor"
                  type="number"
                  step="0.01"
                  min="0"
                  class="form-control"
                  required
                />
              </div>
              <div class="col-md-4">
                <label class="form-label">Data de Início*</label>
                <input v-model="aditivo.dataInicio" type="date" class="form-control" required />
              </div>
              <div class="col-md-4">
                <label class="form-label">Data de Término*</label>
                <input v-model="aditivo.dataFim" type="date" class="form-control" required />
              </div>
              <div class="col-md-12">
                <label class="form-label">Arquivo (PDF)*</label>
                <input
                  type="file"
                  class="form-control"
                  accept=".pdf"
                  @change="event => handleAditivoArquivo(event, index)"
                  required
                />
                <small v-if="aditivo.file" class="text-muted">
                  Arquivo selecionado: {{ aditivo.file.name }}
                </small>
              </div>
              <div class="col-md-12">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-danger"
                  @click="removerAditivo(index)"
                >
                  Remover Aditivo
                </button>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-sm btn-outline-primary mt-2"
            @click="adicionarAditivo"
          >
            Adicionar Aditivo
          </button>
        </div>

        <!-- Painel de Debug -->
        <div v-if="debugMode" class="mt-4 p-3 bg-light rounded">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">Informações de Debug</h6>
            <button @click="preencherDadosTeste" class="btn btn-sm btn-outline-secondary">
              Preencher com Dados Teste
            </button>
          </div>
          <div class="mb-3">
            <h6>Dados Enviados:</h6>
            <pre>{{ JSON.stringify(form, null, 2) }}</pre>
          </div>
        </div>

        <!-- Mensagens de Feedback -->
        <div v-if="error" class="alert alert-danger mt-3">
          <h6>Erro:</h6>
          <p><strong>{{ error }}</strong></p>
        </div>

        <div v-if="mensagem" class="alert alert-success mt-3">
          <h6>Sucesso:</h6>
          <p><strong>{{ mensagem }}</strong></p>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Salvando...' : 'Salvar Contrato' }}
          </button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from '../layouts/AppLayout.vue';

export default {
  components: {
    AppLayout
  },
  data() {
    return {
      loading: false,
      error: null,
      mensagem: null,
      debugMode: true,
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
        clienteId: 1, // Ajustar para contexto de autenticação
        usuarioId: 1, // Ajustar para contexto de autenticação
        documentos: [], // Array de { nome, tipo, file }
        aditivos: [] // Array de { numero, descricao, valor, dataInicio, dataFim, file }
      }
    };
  },
  methods: {
    handleArquivoContrato(event) {
      const file = event.target.files[0];
      if (file && file.type !== 'application/pdf') {
        this.error = 'O arquivo do contrato deve ser um PDF';
        this.form.arquivo_contrato = null;
        this.$refs.arquivoContratoInput.value = '';
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        this.error = 'O arquivo do contrato deve ter no máximo 10MB';
        this.form.arquivo_contrato = null;
        this.$refs.arquivoContratoInput.value = '';
        return;
      }
      this.form.arquivo_contrato = file || null;
    },
    handleArquivoEmpenho(event) {
      const file = event.target.files[0];
      if (file && file.type !== 'application/pdf') {
        this.error = 'O arquivo do empenho deve ser um PDF';
        this.form.arquivo_empenho = null;
        this.$refs.arquivoEmpenhoInput.value = '';
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        this.error = 'O arquivo do empenho deve ter no máximo 10MB';
        this.form.arquivo_empenho = null;
        this.$refs.arquivoEmpenhoInput.value = '';
        return;
      }
      this.form.arquivo_empenho = file || null;
    },
    handleDocumentoArquivo(event, index) {
      const file = event.target.files[0];
      if (file && file.type !== 'application/pdf') {
        this.error = `O documento ${index + 1} deve ser um PDF`;
        this.form.documentos[index].file = null;
        event.target.value = '';
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        this.error = `O documento ${index + 1} deve ter no máximo 10MB`;
        this.form.documentos[index].file = null;
        event.target.value = '';
        return;
      }
      this.form.documentos[index].file = file || null;
      this.form.documentos[index].nome = this.form.documentos[index].nome || file.name;
    },
    handleAditivoArquivo(event, index) {
      const file = event.target.files[0];
      if (file && file.type !== 'application/pdf') {
        this.error = `O aditivo ${index + 1} deve ser um PDF`;
        this.form.aditivos[index].file = null;
        event.target.value = '';
        return;
      }
      if (file && file.size > 10 * 1024 * 1024) {
        this.error = `O aditivo ${index + 1} deve ter no máximo 10MB`;
        this.form.aditivos[index].file = null;
        event.target.value = '';
        return;
      }
      this.form.aditivos[index].file = file || null;
      this.form.aditivos[index].numero = this.form.aditivos[index].numero || file.name;
    },
    adicionarDocumento() {
      this.form.documentos.push({
        nome: '',
        tipo: '',
        file: null
      });
    },
    removerDocumento(index) {
      this.form.documentos.splice(index, 1);
    },
    adicionarAditivo() {
      this.form.aditivos.push({
        numero: '',
        descricao: '',
        valor: '',
        dataInicio: '',
        dataFim: '',
        file: null
      });
    },
    removerAditivo(index) {
      this.form.aditivos.splice(index, 1);
 personally
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
        arquivo_contrato: null,
        arquivo_empenho: null,
        clienteId: 1,
        usuarioId: 1,
        documentos: [
          {
            nome: 'Documento Teste 1',
            tipo: 'Anexo',
            file: null
          },
          {
            nome: 'Documento Teste 2',
            tipo: 'Relatório',
            file: null
          }
        ],
        aditivos: [
          {
            numero: 'ADITIVO-' + Math.floor(Math.random() * 1000),
            descricao: 'Aditivo de teste',
            valor: 5000.0,
            dataInicio: '2025-06-06',
            dataFim: '2025-07-06',
            file: null
          }
        ]
      };
    },
    async salvarContrato() {
      try {
        this.loading = true;
        this.error = null;
        this.mensagem = null;

        // Validação
        const missingFields = [];
        if (!this.form.numero) missingFields.push('Número do Contrato');
        if (!this.form.orgao) missingFields.push('Órgão');
        if (!this.form.objeto) missingFields.push('Objeto do Contrato');
        if (!this.form.valor_global || this.form.valor_global <= 0) missingFields.push('Valor Global');
        if (!this.form.valor_empenhado || this.form.valor_empenhado <= 0) missingFields.push('Valor Empenhado');
        if (!this.form.data_inicio) missingFields.push('Data de Início');
        if (!this.form.data_termino) missingFields.push('Data de Término');
        if (!this.form.tipo_reajuste) missingFields.push('Tipo de Reajuste');
        if (!this.form.clienteId) missingFields.push('Cliente');
        if (!this.form.usuarioId) missingFields.push('Usuário');

        // Validar documentos
        this.form.documentos.forEach((doc, index) => {
          if (!doc.nome) missingFields.push(`Nome do Documento ${index + 1}`);
          if (!doc.tipo) missingFields.push(`Tipo do Documento ${index + 1}`);
          if (!doc.file) missingFields.push(`Arquivo do Documento ${index + 1}`);
        });

        // Validar aditivos
        this.form.aditivos.forEach((aditivo, index) => {
          if (!aditivo.numero) missingFields.push(`Número do Aditivo ${index + 1}`);
          if (!aditivo.descricao) missingFields.push(`Descrição do Aditivo ${index + 1}`);
          if (!aditivo.valor || aditivo.valor <= 0) missingFields.push(`Valor do Aditivo ${index + 1}`);
          if (!aditivo.dataInicio) missingFields.push(`Data de Início do Aditivo ${index + 1}`);
          if (!aditivo.dataFim) missingFields.push(`Data de Término do Aditivo ${index + 1}`);
          if (!aditivo.file) missingFields.push(`Arquivo do Aditivo ${index + 1}`);
        });

        if (missingFields.length > 0) {
          throw new Error(`Preencha os campos obrigatórios: ${missingFields.join(', ')}`);
        }

        // Criar FormData
        const formData = new FormData();
        formData.append('numero', this.form.numero);
        formData.append('orgao', this.form.orgao);
        formData.append('objeto', this.form.objeto);
        formData.append('valor_global', this.form.valor_global);
        formData.append('valor_empenhado', this.form.valor_empenhado);
        formData.append('data_inicio', this.form.data_inicio);
        formData.append('data_termino', this.form.data_termino);
        formData.append('tipo_reajuste', this.form.tipo_reajuste);
        formData.append('clienteId', this.form.clienteId);
        formData.append('usuarioId', this.form.usuarioId);

        if (this.form.arquivo_contrato) {
          formData.append('arquivo_contrato', this.form.arquivo_contrato);
        }
        if (this.form.arquivo_empenho) {
          formData.append('arquivo_empenho', this.form.arquivo_empenho);
        }

        // Documentos
        const documentosMetadata = this.form.documentos.map(doc => ({
          nome: doc.nome,
          tipo: doc.tipo
        }));
        formData.append('documentos_metadata', JSON.stringify(documentosMetadata));
        this.form.documentos.forEach(doc => {
          formData.append('documentos', doc.file);
        });

        // Aditivos
        const aditivosMetadata = this.form.aditivos.map(aditivo => ({
          numero: aditivo.numero,
          descricao: aditivo.descricao,
          valor: aditivo.valor,
          dataInicio: aditivo.dataInicio,
          dataFim: aditivo.dataFim
        }));
        formData.append('aditivos_metadata', JSON.stringify(aditivosMetadata));
        this.form.aditivos.forEach(aditivo => {
          formData.append('aditivos', aditivo.file);
        });

        // Enviar para API
        const response = await fetch('http://localhost:3000/api/v1/contratos', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.erro || 'Erro ao salvar contrato');
        }

        const data = await response.json();
        this.mensagem = `Contrato ${data.numero} criado com sucesso!`;

        // Limpar formulário
        setTimeout(() => {
          this.resetForm();
        }, 2000);
      } catch (err) {
        console.error('Erro:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    resetForm() {
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
        documentos: [],
        aditivos: []
      };
      this.$refs.arquivoContratoInput.value = '';
      this.$refs.arquivoEmpenhoInput.value = '';
      this.mensagem = null;
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 8px;
  border: 1px solid #dee2e6;
}

.form-label {
  font-weight: 500;
  color: #333;
}

.form-control,
.form-select {
  border-radius: 6px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 10px 20px;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-outline-primary {
  border-color: #007bff;
  color: #007bff;
}

.btn-outline-primary:hover {
  background-color: #007bff;
  color: #fff;
}

.btn-outline-danger {
  border-color: #dc3545;
  color: #dc3545;
}

.btn-outline-danger:hover {
  background-color: #dc3545;
  color: #fff;
}

.alert {
  border-radius: 6px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

pre {
  font-size: 0.8em;
  white-space: pre-wrap;
  background: #f8f9fa;
  padding: 10px;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
}

.text-muted {
  font-size: 0.85em;
}
</style>