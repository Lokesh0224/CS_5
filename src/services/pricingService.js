import api from './api'

export const pricingService = {
  getAll: () => api.get('/pricing'),
}
