<template>
    <div class="page-container">
    
      <div class="content">
        <Items />
      </div>
      <div class="contentPharmcy">
        <pharmcaies />
      </div>
      <div class="Footer-seciton">
        <Footer />
      </div>
    </div>
  </template>
  
  <script setup>

  import Items from '../components/Homecomponents/Items.vue';
  import pharmcaies from '../components/Homecomponents/pharmcaies.vue';
  import Footer from '../components/Footer.vue';
  </script>
  
  <style scoped>

  
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
  .contentPharmcy{
    display: flex;
    align-items: center;
    padding: 10px;
    padding-top: 30px; /* أو حسب ارتفاع NavBar */
  }
  </style>
  
  