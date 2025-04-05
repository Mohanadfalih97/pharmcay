<template>
    <div class="page-container">
      <NavBar />
      <div class="content">
        <Items />
      </div>
    </div>
  </template>
  
  <script setup>
  import NavBar from '../components/NavBar.vue';
  import Items from '../components/Homecomponents/Items.vue';
  </script>
  
  <style scoped>
  /* اجعل NavBar ثابتًا في الأعلى */
  :deep(.navbar) {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
  }
  
  /* خلفية الصفحة */
  .page-container {
    background-image: url('../assets/Imges/Background1.jpg'); /* ضع مسار الصورة هنا */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    min-height: 100vh; /* لتغطية الشاشة بالكامل */
  }
  
  /* محتوى الصفحة */
  .content {
    display: flex;
    align-items: center;
    padding: 10px;
    padding-top: 60px; /* أو حسب ارتفاع NavBar */
  }
  </style>
  
  