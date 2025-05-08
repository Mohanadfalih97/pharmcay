// src/api/useLoginUser.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useLoginUser() {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post(
         `${import.meta.env.VITE_API_BASE_URL}/api/Home/Login`,
        credentials
      )
      return response.data
    },
  })
}
