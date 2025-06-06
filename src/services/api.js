import axios from 'axios'

localStorage.setItem('token', 'TOKEN_TESTE_123') // Remova isso quando tiver o login real

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// // Interceptor para adicionar token em todas as requisições
// api.interceptors.request.use(config => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export default api