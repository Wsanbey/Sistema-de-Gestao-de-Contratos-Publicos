<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title mb-4">Alertas e Notificações</h5>

          <!-- Mensagem quando não há alertas -->
          <div v-if="!hasAlerts" class="text-center text-muted my-5">
            Nenhum alerta registrado para este contrato.
          </div>

          <!-- Configurações de Alerta -->
          <div class="mt-4">
            <h6 class="mb-3">Configurações de Alerta</h6>

            <div class="list-group">
              <!-- Alerta de vencimento -->
              <div class="list-group-item d-flex justify-content-between align-items-center p-3">
                <div>
                  <div class="fw-medium">Alerta de vencimento</div>
                  <small class="text-muted">30 dias antes do término</small>
                </div>
                <button class="btn btn-link text-decoration-none">Editar</button>
              </div>

              <!-- Alerta de reajuste -->
              <div class="list-group-item d-flex justify-content-between align-items-center p-3">
                <div>
                  <div class="fw-medium">Alerta de reajuste</div>
                  <small class="text-muted">15 dias antes da data de reajuste</small>
                </div>
                <button class="btn btn-link text-decoration-none">Editar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hasAlerts = ref(false) // Controla se há alertas ou não

const alertConfigs = ref([
  {
    type: 'vencimento',
    title: 'Alerta de vencimento',
    description: '30 dias antes do término'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  },
  {
    type: 'reajuste',
    title: 'Alerta de reajuste',
    description: '15 dias antes da data de reajuste'
  }
])
</script>

<style scoped>
.card {
  box-shadow: 0 1px 3px rgba(0,0,0,0.12);
}

.list-group-item {
  border: 1px solid #dee2e6;
  margin-bottom: 0.5rem;
  border-radius: 6px !important;
}

.list-group-item:last-child {
  margin-bottom: 0;
}

.btn-link {
  color: #0d6efd;
  padding: 0;
}

.btn-link:hover {
  color: #0a58ca;
}
</style>