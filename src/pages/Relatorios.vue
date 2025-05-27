<template>
    <AppLayout>
      <h2 class="mb-4">Relatorios</h2>
      
    </AppLayout>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import AppLayout from '../layouts/AppLayout.vue'
  
  const contratos = ref([
    { numero: 'CONT-2023/1', orgao: 'Secretaria de Educação', objeto: 'Aquisição de material escolar', valor: 'R$ 120.000,00', vigencia: '01/12/2023 - 14/06/2023', status: 'Expirado' },
    { numero: 'CONT-2023/2', orgao: 'Secretaria de Saúde', objeto: 'Serviços de manutenção predial', valor: 'R$ 450.000,00', vigencia: '01/01/2024 - 31/01/2024', status: 'Expirado' },
    { numero: 'CONT-2023/3', orgao: 'Secretaria de Obras', objeto: 'Pavimentação de vias urbanas', valor: 'R$ 1.200.000,00', vigencia: '14/01/2023 - 14/07/2023', status: 'Expirado' },
    { numero: 'CONT-2023/4', orgao: 'Secretaria de Administração', objeto: 'Serviços de TI', valor: 'R$ 320.000,00', vigencia: '09/01/2023 - 30/04/2023', status: 'Expirado' },
    { numero: 'CONT-2023/5', orgao: 'Secretaria de Cultura', objeto: 'Organização de eventos culturais', valor: 'R$ 180.000,00', vigencia: '04/01/2023 - 04/07/2023', status: 'Expirado' },
    { numero: 'CONT-2023/6', orgao: 'Secretaria de Esportes', objeto: 'Manutenção de quadras esportivas', valor: 'R$ 250.000,00', vigencia: '14/12/2022 - 14/06/2023', status: 'Expirado' },
    { numero: 'Vine testes', orgao: 'Secretaria de Saúde', objeto: 'Testar se a saúde está okay', valor: 'R$ 251.557,00', vigencia: '12/05/2025 - 30/05/2025', status: 'Expirando' },
  ])
  </script>
  
  <style scoped>
  .table th, .table td {
    vertical-align: middle;
  }
  .badge {
    font-size: 0.85rem;
    padding: 0.35em 0.65em;
  }
  </style>