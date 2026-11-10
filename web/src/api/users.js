import { api } from './client.js'

export const getUsers = () => api.get('/api/users')
export const getUser = (id) => api.get(`/api/users/${id}`)
export const createUser = (user) => api.post('/api/users', user)
export const updateUser = (id, user) => api.put(`/api/users/${id}`, user)
export const deleteUser = (id) => api.delete(`/api/users/${id}`)
