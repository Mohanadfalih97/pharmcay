// src/api/useRegisterPractitioner.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useRegisterPractitioner() {
  return useMutation({
    mutationFn: async (formData) => {
      const response = await axios.post('/api/Practitioner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    },
  })
}
