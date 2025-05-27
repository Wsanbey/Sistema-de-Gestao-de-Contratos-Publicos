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
              <div>R$ 120.000,00</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Valor Empenhado</label>
              <div>R$ 96.000,00</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Data de Início</label>
              <div>{{ contrato.inicio }}</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Data de Término</label>
              <div>{{ contrato.fim }}</div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <label class="text-muted small mb-1">Tipo de Reajuste</label>
              <div>Não definido</div>
            </div>
            <div class="col-md-6">
              <label class="text-muted small mb-1">Status</label>
              <div><span class="badge bg-danger">Expirado</span></div>
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
            <div>R$ 120.000,00</div>
          </div>

          <div class="mb-3">
            <label class="text-muted small mb-1">Valor Empenhado</label>
            <div>R$ 96.000,00</div>
          </div>

          <div class="mb-3">
            <label class="text-muted small mb-1">Percentual Utilizado</label>
            <div class="progress">
              <div class="progress-bar" role="progressbar" style="width: 80%"></div>
            </div>
            <small class="text-muted">80%</small>
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
defineProps({
  contrato: {
    type: Object,
    required: true
  }
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