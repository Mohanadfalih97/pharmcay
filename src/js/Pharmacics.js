import axios from 'axios'
import { useMutation } from '@tanstack/vue-query'

export function useRegisterPractitioner() {
  return useMutation({
    mutationFn: async (formData) => {
      const token = localStorage.getItem('token')
      return await axios.post( `${import.meta.env.VITE_API_BASE_URL}/api/Pharmacics`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
    },
  })
}
