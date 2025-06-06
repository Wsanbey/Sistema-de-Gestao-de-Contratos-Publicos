<template>
  <div class="card">
    <div class="card-body">
      <div class="d-flex justify-content-between mb-4">
        <h5 class="card-title">Documentos do Contrato</h5>
        <button class="btn btn-primary btn-sm">
          <i class="bi bi-plus me-1"></i> Adicionar Documento
        </button>
      </div>

      <div class="list-group">
        <div v-for="doc in documentos" :key="doc.id" 
             class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center">
            <i class="bi bi-file-earmark-pdf me-3 text-danger"></i>
            <div>
              <div>{{ doc.nome }}</div>
              <small class="text-muted">{{ doc.tipo }} • {{ doc.data }}</small>
            </div>
          </div>
          <button class="btn btn-link">Visualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const documentos = [
  { id: 1, nome: 'Contrato Original.pdf', tipo: 'Contrato', data: '31/12/2022' },
  { id: 1, nome: 'Contrato Original.pdf', tipo: 'Contrato', data: '31/12/2022' },
  { id: 1, nome: 'Contrato Original.pdf', tipo: 'Contrato', data: '31/12/2022' },
  { id: 1, nome: 'Contrato Original.pdf', tipo: 'Contrato', data: '31/12/2022' },
  { id: 1, nome: 'Contrato Original.pdf', tipo: 'Contrato', data: '31/12/2022' },
  { id: 2, nome: 'Empenho 001.pdf', tipo: 'Empenho', data: '10/01/2023' }
]
</script>