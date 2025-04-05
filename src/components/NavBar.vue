<template>
  <v-card>
    <v-layout>
      <!-- زر فتح القائمة في الشاشات الصغيرة -->
      <v-app-bar flat app v-if="isSmallScreen">
        <v-btn icon @click="drawer = !drawer">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer
        v-model="drawer"
        :rail="!isSmallScreen"
        :expand-on-hover="!isSmallScreen"
        :permanent="!isSmallScreen"
        :temporary="isSmallScreen"
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            subtitle="sandra_a88@gmail.com"
            title="ساندرا آدامز"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item value="myfiles">
            <template v-slot:prepend>
              <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-folder</v-icon>
            </template>
            <v-list-item-title>ملفاتي</v-list-item-title>
          </v-list-item>

          <v-list-item value="shared">
            <template v-slot:prepend>
              <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-account-multiple</v-icon>
            </template>
            <v-list-item-title>مشارك معي</v-list-item-title>
          </v-list-item>

          <v-list-item value="starred">
            <template v-slot:prepend>
              <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-star</v-icon>
            </template>
            <v-list-item-title>المميزة</v-list-item-title>
          </v-list-item>

          <v-list-item value="orders">
            <template v-slot:prepend>
              <v-icon :style="{ color: 'color(srgb 0.57 0.76 0.77)' }">mdi-cart</v-icon>
            </template>
            <v-list-item-title>الطلبات</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

const { smAndDown } = useDisplay()
const isSmallScreen = smAndDown
const drawer = ref(!isSmallScreen.value)  // مفتوح دائمًا في الشاشات الكبيرة، ومغلق في الشاشات الصغيرة
</script>
