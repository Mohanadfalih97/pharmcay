// src/js/useRegisterUser.js
// src/js/useRegisterUser.js
import { useMutation } from '@tanstack/vue-query'
import axios from 'axios'

export function useRegisterUser() {
  return useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/Home/Register`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      return response.data
    },
  })
}
