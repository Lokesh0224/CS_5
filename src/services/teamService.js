import api from './api'

export const teamService = {
  getAll: () => api.get('/team'),
}
