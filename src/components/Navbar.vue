<template>
  <div class="sidebar d-flex flex-column flex-shrink-0 p-3 text-bg-light">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-decoration-none">
      <span class="fs-4 fw-bold text-primary">LGC</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li v-for="item in menu" :key="item.label" class="nav-item">
        <router-link
          :to="item.path"
          class="nav-link text-dark d-flex align-items-center"
          :class="{ active: $route.path.startsWith(item.path) && item.path !== '/' || $route.path === item.path }"
        >
          <i :class="item.icon + ' me-2'"></i> {{ item.label }}
        </router-link>
      </li>
    </ul>
    <hr />
    <div class="d-flex align-items-center">
      <div class="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center me-2" style="width: 40px; height: 40px;">
        <span>JS</span>
      </div>
      <div>
        <strong>João Silva</strong>
        <div class="text-muted" style="font-size: 0.85rem;">Administrador</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const menu = [
  { label: 'Dashboard', path: '/', icon: 'bi-house' },
  { label: 'Contratos', path: '/contratos', icon: 'bi-file-earmark-text' },
  { label: 'Alertas', path: '/alertas', icon: 'bi-bell' },
  { label: 'Calendário', path: '/calendario', icon: 'bi-calendar' },
  { label: 'Relatórios', path: '/relatorios', icon: 'bi-bar-chart' },
  { label: 'Usuários', path: '/usuarios', icon: 'bi-people' },
  { label: 'Configurações', path: '/configuracoes', icon: 'bi-gear' }
]
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  height: 100vh;
  overflow-y: auto;
  border-right: solid #e6e6e6 1px;
  background-color: #fff;
  z-index: 1000;
}

.active {
  background-color: #0d6efd !important;
  color: white !important;
}
</style>