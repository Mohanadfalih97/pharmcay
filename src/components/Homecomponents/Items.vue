<template>
    <div class="card-wrapper">
      <Itemcard />
    </div>
  </template>
  
  <script setup>
  import Itemcard from './Itemcard.vue';
  </script>
  
  <style scoped>
  .card-wrapper {
    background-color: #fff; /* خلفية بيضاء */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* شادو خفيف */
    border-radius: 12px; /* زوايا ناعمة */
    padding: 16px; /* مسافة داخلية */
    margin: 16px; /* مسافة خارجية */
    width: 1000px;
  }
  </style>
  