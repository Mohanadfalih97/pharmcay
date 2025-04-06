<template>
    <v-sheet class="mx-auto" max-width="1200" style="border-radius: 10px;direction: ltr;">
      <div class="d-flex align-center text-truncate justify-content-center p-3 mt-4"
           style="font-size:25px;font-weight: bold;direction: rtl;justify-content: center;">
        <v-icon size="25" class="me-2" color="#8bbcc0">mdi-medical-bag</v-icon>
        أفضل الصيدليات
      </div>
  
      <v-slide-group
        v-model="currentIndex"
        show-arrows
        class="pa-3"
      >
        <v-slide-group-item
          v-for="n in totalItems"
          :key="n"
          :value="n - 1"  
        >
          <div
            class="ma-2"
            :style="{
              cursor: 'pointer',
              minWidth: '400px',
              transition: '0.3s',
              transform: currentIndex === (n - 1) ? 'scale(1.03)' : 'scale(1)',
              boxShadow: currentIndex === (n - 1) ,
              borderRadius: '12px'
            }"
          >
            <pharmcaycard />
          </div>
        </v-slide-group-item>
      </v-slide-group>
    </v-sheet>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import pharmcaycard from '../Homecomponents/pharmcaycard.vue'
  
  const currentIndex = ref(0)
  const totalItems = 10
  let intervalId = null
  
  onMounted(() => {
    intervalId = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % totalItems
    }, 3000)
  })
  
  onBeforeUnmount(() => {
    clearInterval(intervalId)
  })
  </script>
  
  <style scoped>
  .v-slide-group {
    overflow-x: auto;
  }
  </style>
  