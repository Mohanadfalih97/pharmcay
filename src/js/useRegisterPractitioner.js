// src/api/useRegisterPractitioner.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useRegisterPractitioner() {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/Practitioner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
  })
}
