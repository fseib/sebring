import { api } from './client.js'

export const getVehicles = () => api.get('/api/vehicles')
export const getVehicle = (id) => api.get(`/api/vehicles/${id}`)
export const createVehicle = (vehicle) => api.post('/api/vehicles', vehicle)
export const updateVehicle = (id, vehicle) => api.put(`/api/vehicles/${id}`, vehicle)
export const deleteVehicle = (id) => api.delete(`/api/vehicles/${id}`)
