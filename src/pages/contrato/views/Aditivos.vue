<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h5 class="card-title mb-0">Histórico de Aditivos</h5>
            <button class="btn btn-primary">
              <i class="bi bi-plus me-1"></i>
              Novo Aditivo
            </button>
          </div>

          <!-- Lista de Aditivos -->
          <div class="list-group">
            <div class="list-group-item">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center">
                  <i class="bi bi-clock-history me-2 text-muted"></i>
                  <div>
                    <strong>Aditivo de Valor</strong>
                    <small class="text-muted d-block">15/03/2023</small>
                  </div>
                </div>
              </div>

              <div class="row g-3">
                <div class="col-md-6 mb-3">
                  <label class="text-muted small d-block mb-1">Valor Anterior</label>
                  <div>R$ 159.999.999,20</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="text-muted small d-block mb-1">Novo Valor</label>
                  <div>R$ 199.999.999,00</div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="text-muted small d-block mb-1">Percentual de Reajuste</label>
                  <div>20%</div>
                </div>
                <div class="col-12">
                  <label class="text-muted small d-block mb-1">Motivo</label>
                  <div>Acréscimo de quantitativo devido à inclusão de novas escolas no programa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup> 
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

.list-group-item {
  border-radius: 8px !important;
  border: 1px solid #dee2e6;
  padding: 1rem;
  margin-bottom: 1rem;
}

.list-group-item:last-child {
  margin-bottom: 0;
}
</style>