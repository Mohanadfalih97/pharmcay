<template>
  
    <v-card
      :disabled="loading"
      :loading="loading"
      class="mx-auto my-12"
      max-width="374"
      dir="rtl"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        cover
      ></v-img>
  
      <v-card-item>
        <v-card-title>صيدلية الشفاء</v-card-title>
  
        <v-card-subtitle>
          <span class="me-1">بغداد الشعب </span>
  
          <v-icon
  color="error"
  icon="mdi-map-marker"
  size="small"
/>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>
  
          <div class="text-grey ms-4">
            4.5 (413)
          </div>
        </v-row>
  
        <div class="my-4 text-subtitle-1">
     
        </div>
  
        <div>تقديم افضل الادويه بانسب الاسعار بالاضافه الى مواد التجميلية.</div>
      </v-card-text>
  
      <v-divider class="mx-4 mb-1"></v-divider>
  
      <v-card-title>اوقات العمل</v-card-title>
  
      <div class="px-4 mb-2">
        <v-chip-group v-model="selection" selected-class="bg-deep-purple-lighten-2">
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
      
        </v-chip-group>
      </div>
  
  
    </v-card>
  </template>
  <script setup>
  import { ref } from 'vue'

  const loading = ref(false)
  const selection = ref(1)
  function reserve () {
    loading.value = true
    setTimeout(() => (loading.value = false), 2000)
  }
</script>
<style >
  .mdi-chevron-right::before {
    content: "\F0142";
    color: white !important;
    background-color: #93c2c6;
    /* height: 50px; */
    border-radius: 10px;}

.mdi-chevron-left::before {
    content: "\F0141";
    color: white;
    border-radius: 10px;
    background-color: #92c1c5;
}
</style>