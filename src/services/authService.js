import api from './api'

export const authService = {
  login: async (email, password) => {
    const response = await api.get(`/users?email=${email}&password=${password}`)
    if (response.data.length > 0) {
      return response.data[0]
    }
    throw new Error('Invalid credentials')
  },
  register: (data) => api.post('/users', data),
}
