<!-- src/layouts/AppLayout.vue -->
<template>
  <div class="app-wrapper">
    <!-- Sidebar -->
    <Navbar />
    <!-- Conteúdo principal -->
    <div class="main-content">
      <!-- Topbar -->
      <header class="d-flex justify-content-between align-items-center px-4 py-3 border-bottom bg-white">
        <h5 class="mb-0 text-primary fw-bold">LGC Consultoria</h5>
        <div class="d-flex align-items-center gap-3">
          <!-- <input class="form-control" type="search" placeholder="Buscar contratos..." /> -->
          <i class="bi bi-bell"></i>
          <i class="bi bi-person-circle"></i>
        </div>
      </header>

      <!-- Conteúdo da página -->
      <main class="p-4">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style>
.app-wrapper {
  display: flex;
  min-height: 100vh;
  background-color: #F7FAFC;
}

.main-content {
  flex: 1;
  margin-left: 250px;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}
</style>
