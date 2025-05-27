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
            <label class="form-label">Número do Contrato</label>
            <input v-model="form.numero" type="text" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Contratante</label>
            <input v-model="form.contratante" type="text" class="form-control" required />
          </div>

          <div class="col-md-12">
            <label class="form-label">Objeto do Contrato</label>
            <textarea v-model="form.objeto" class="form-control" rows="3" required></textarea>
          </div>

          <div class="col-md-6">
            <label class="form-label">Valor</label>
            <input v-model="form.valor" type="number" step="0.01" class="form-control" required />
          </div>

          <div class="col-md-3">
            <label class="form-label">Data de Início</label>
            <input v-model="form.dataInicio" type="date" class="form-control" required />
          </div>

          <div class="col-md-3">
            <label class="form-label">Data de Término</label>
            <input v-model="form.dataTermino" type="date" class="form-control" required />
          </div>

          <div class="col-md-6">
            <label class="form-label">Situação</label>
            <select v-model="form.situacao" class="form-select" required>
              <option value="">Selecione</option>
              <option value="vigente">Vigente</option>
              <option value="encerrado">Encerrado</option>
              <option value="suspenso">Suspenso</option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Anexar Arquivo (PDF)</label>
            <input type="file" class="form-control" accept=".pdf" @change="handleArquivo" />
          </div>

        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn-primary">Salvar Contrato</button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref } from 'vue'
import AppLayout from '../layouts/AppLayout.vue'


const form = ref({
  numero: '',
  contratante: '',
  objeto: '',
  valor: '',
  dataInicio: '',
  dataTermino: '',
  situacao: '',
  arquivo: null
})

function handleArquivo(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    form.value.arquivo = file
  } else {
    alert('Por favor, selecione um arquivo PDF válido.')
  }
}

function salvarContrato() {
  console.log('Dados do contrato:', form.value)

  // Aqui você pode usar FormData se for enviar via API com arquivos:
  // const data = new FormData()
  // Object.entries(form.value).forEach(([key, value]) => data.append(key, value))

  // Simulação de envio
  alert('Contrato salvo com sucesso!')
}
</script>
