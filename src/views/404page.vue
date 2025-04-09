<template>
    <v-empty-state
      headline="عذرًا، 404"
      title="الصفحة غير موجودة"
      text="الصفحة التي تبحث عنها غير متوفرة"
      image="https://cdn-icons-png.flaticon.com/512/2965/2965567.png"
    >
      <template #actions>
        <v-btn color="primary" to="/">
          العودة إلى الصفحة الرئيسية
        </v-btn>
      </template>
    </v-empty-state>
  </template>
  
  <script setup>
  // لا حاجة لكود هنا الآن، إلا إذا كنت تريد منطق برمجي إضافي لاحقًا
  </script>
  