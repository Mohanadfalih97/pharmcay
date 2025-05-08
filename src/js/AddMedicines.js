// src/composables/useCreateMedicine.ts
import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

export function useCreateMedicine() {
  return useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token')
      return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Medicine`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      )
    },
  })
}
