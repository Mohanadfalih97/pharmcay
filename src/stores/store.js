import { defineStore } from 'pinia'

export const useRouterStore = defineStore('router', {
  state: () => ({
    notFoundUrl: '/404page', // رابط صفحة 404
  }),
})