import { api } from './client.js'

export const getTransactions = () => api.get('/api/transactions')
export const getTransaction = (id) => api.get(`/api/transactions/${id}`)
export const createTransaction = (transaction) => api.post('/api/transactions', transaction)
export const updateTransaction = (id, transaction) => api.put(`/api/transactions/${id}`, transaction)
export const deleteTransaction = (id) => api.delete(`/api/transactions/${id}`)
