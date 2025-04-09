// src/js/useRegisterUser.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post('/api/Home/Register', userData)
      return response.data
    },
  })
}
