<template>
  <v-sheet class="mx-auto" max-width="1200" style="border-radius: 10px; direction: ltr;">
    <div class="d-flex align-center text-truncate justify-content-center p-3 mt-4"
         style="font-size: 25px; font-weight: bold; direction: rtl; justify-content: center;">
      <v-icon size="25" class="me-2" color="#8bbcc0">mdi-medical-bag</v-icon>
      أفضل الصيدليات
    </div>

    <div>
      <pharmcaycard />
    </div>
  </v-sheet>
</template>

<script setup>
import pharmcaycard from '../Homecomponents/pharmcaycard.vue';
</script>

<style scoped>
.v-slide-group {
  overflow-x: auto;
}
</style>
