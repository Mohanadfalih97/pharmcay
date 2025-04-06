<template>
  <v-app>
   

    <v-layout>
      <SideBar  v-if="!hideNavRoutes.includes(route.name)" style="direction: rtl;" />

      <v-main style="direction: rtl;">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'

const route = useRoute()
const hideNavRoutes = ['Signup', 'Register']
const drawer = ref(true)

function toggleDrawer() {
  drawer.value = !drawer.value
}
</script>
