<!-- components/SideBar.vue -->
<template>
  <v-navigation-drawer expand-on-hover rail class="custom-scroll">
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        subtitle="sandra_a88@gmail.com"
        title="Sandra Adams"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/home" style="text-decoration: none; color: inherit;">
        <v-list-item value="home">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-home</v-icon>
          </template>
          <v-list-item-title>الرئيسية</v-list-item-title>
        </v-list-item>
      </router-link>
      <router-link to="/Pharmacics" style="text-decoration: none; color: inherit;">
        <v-list-item value="pharmacies">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-hospital-building</v-icon>
          </template>
          <v-list-item-title>صيدلاتي</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/AddMedicines" style="text-decoration: none; color: inherit;">
        <v-list-item value="medicines">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-pill</v-icon>
          </template>
          <v-list-item-title>ادويتي</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/404page" style="text-decoration: none; color: inherit;">
        <v-list-item value="pharmacies-all">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-store</v-icon>
          </template>
          <v-list-item-title>الصيدليات</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/404page" style="text-decoration: none; color: inherit;">
        <v-list-item value="medicines-all">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-pill</v-icon>
          </template>
          <v-list-item-title>الادوية</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/404page" style="text-decoration: none; color: inherit;">
        <v-list-item value="contact">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-phone</v-icon>
          </template>
          <v-list-item-title>تواصل معنا</v-list-item-title>
        </v-list-item>
      </router-link>

      <router-link to="/Orderlist" style="text-decoration: none; color: inherit;">
        <v-list-item value="orders">
          <template v-slot:prepend>
            <v-icon style="color: #95bfc3">mdi-cart</v-icon>
          </template>
          <v-list-item-title>الطلبات</v-list-item-title>
        </v-list-item>
      </router-link>

      <v-divider class="my-2"></v-divider>

      <router-link to="/" style="text-decoration: none; color: inherit;">
        <v-list-item value="logout"  @click="handleLogout">
          <template v-slot:prepend>
            <v-icon style="color: tomato">mdi-logout</v-icon>
          </template>
          <v-list-item-title>تسجيل الخروج</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>


<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  localStorage.removeItem('token')
  localStorage.removeItem('pharmacy')
  localStorage.removeItem('practitionerId')
  localStorage.removeItem('practitionerName')
  localStorage.removeItem('roleId')
  localStorage.removeItem('userId')
  router.push('/') // إعادة توجيه للمسار الرئيسي أو صفحة تسجيل الدخول
}
</script>


<style scoped>
/* لا توجد تنسيقات مخصصة */
</style>
