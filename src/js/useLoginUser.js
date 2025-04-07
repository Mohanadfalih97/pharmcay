// src/api/useLoginUser.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useLoginUser() {
  return useMutation({
    mutationFn: async (credentials) => {
      const response = await axios.post(
        '/api/api/Home/Login',
        credentials
      )
      return response.data
    },
  })
}
