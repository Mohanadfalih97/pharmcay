<!-- components/SideBar.vue -->
<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/myfiles" style="text-decoration: none; color: inherit;">
        <v-list-item value="myfiles">
          <template v-slot:prepend>
            <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-folder</v-icon>
          </template>
          <v-list-item-title>ملفاتي</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/shared" style="text-decoration: none; color: inherit;">
        <v-list-item value="shared">
          <template v-slot:prepend>
            <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-account-multiple</v-icon>
          </template>
          <v-list-item-title>مشارك معي</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/starred" style="text-decoration: none; color: inherit;">
        <v-list-item value="starred">
          <template v-slot:prepend>
            <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-star</v-icon>
          </template>
          <v-list-item-title>المميزة</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/orders" style="text-decoration: none; color: inherit;">
        <v-list-item value="orders">
          <template v-slot:prepend>
            <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-cart</v-icon>
          </template>
          <v-list-item-title>الطلبات</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider class="my-2"></v-divider>

      <router-link to="/" style="text-decoration: none; color: inherit;">
        <v-list-item value="logout">
          <template v-slot:prepend>
            <v-icon :style="{ color: 'tomato' }">mdi-logout</v-icon>
          </template>
          <v-list-item-title>تسجيل الخروج</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
// لا حاجة لكود إضافي الآن
</script>

<style scoped>
/* لا توجد تنسيقات مخصصة */
</style>
