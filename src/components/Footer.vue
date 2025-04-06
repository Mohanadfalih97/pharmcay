<template>
    <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#90bfc3" style="direction: rtl;">
      <div class="text-subtitle-2 font-weight-medium mt-1">
        فريق العمل
      </div>
  
      <div class="d-flex align-center" style="justify-content: space-between;gap: 15px;">
        <v-avatar size="40">
          <v-img :src="mohanadImg" alt="Mohanad" width="64" height="64" />
        </v-avatar>
        <v-avatar size="40">
          <v-img :src="naelImg" alt="Nael" width="64" height="64" />
        </v-avatar>
      </div>
  
      <div class="d-flex ga-3">
        <v-btn
          v-for="icon in icons"
          :key="icon"
          :icon="icon"
          density="comfortable"
          variant="text"
        ></v-btn>
      </div>
  
      <v-divider class="my-2" thickness="2" width="50"></v-divider>
  
      <div class="text-caption font-weight-regular opacity-60" style="direction: rtl;">
        في عصر السرعة والاحتياج الفوري للخدمات الصحية، نوفر لك منصة موثوقة تساعدك في الوصول إلى أفضل الصيدليات في منطقتك بكل سهولة.
        يمكنك من خلال الموقع استعراض قائمة من الصيدليات المميزة، الاطلاع على تقييمات وآراء العملاء، معرفة ساعات العمل، أنواع الخدمات المتوفرة مثل خدمة التوصيل أو الاستشارات الدوائية، وحتى التواصل مباشرة مع الصيدلية.
        هدفنا هو تسهيل تجربتك في البحث عن الأدوية والخدمات الطبية، وتوفير كل ما تحتاجه في مكان واحد، بسرعة، وثقة، ودقة.
      </div>
  
      <v-divider></v-divider>
  
      <div dir="ltr">
        {{ new Date().getFullYear() }} — <strong>راجيتة</strong>
      </div>
    </v-footer>
  </template>
  
  <script setup>
  import mohanadImg from '../assets/Imges/mohanad.jpg'
  import naelImg from '../assets/Imges/nael.jpg'
  
  const icons = [
    'mdi-facebook',
    'mdi-twitter',
    'mdi-linkedin',
    'mdi-instagram',
  ]
  </script>
  