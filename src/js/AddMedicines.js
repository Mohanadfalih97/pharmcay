// src/composables/useCreateMedicine.ts
import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

export function useCreateMedicine() {
  return useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token')
      return await axios.post('/api/Medicine', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })
}
