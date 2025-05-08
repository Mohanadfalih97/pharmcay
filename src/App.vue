<template>
  <v-app>
    <!-- إشعار تنبيهي -->
    <div style="position: fixed; top: 20px; right: 20px; z-index: 9999;" v-if="alertVisible">
      <el-alert
        :title="alertMessage"
        :type="alertType"
        show-icon
        closable
        @close="alertVisible = false"
      />
    </div>

    <v-layout>
      <SideBar v-if="!hideNavRoutes.includes(route.name)" style="direction: rtl;" />

      <v-main style="direction: rtl;">
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from './components/SideBar.vue'
import { HubConnectionBuilder } from '@microsoft/signalr'

// الراوتر الحالي
const route = useRoute()

// إخفاء الـ sidebar في بعض الصفحات
const hideNavRoutes = ['Signup', 'Register', '404page']
const drawer = ref(true)

// متغيرات الإشعار
const alertMessage = ref('');
const alertType = ref('');
const alertVisible = ref(false);

function toggleDrawer() {
  drawer.value = !drawer.value
}

// الاتصال بـ SignalR
onMounted(() => {
  const connection = new HubConnectionBuilder()
    .withUrl("/api/notificationHub")
    .withAutomaticReconnect()
    .build()

  connection.on("ReceiveNotification", (message) => {
    alertMessage.value = message
    alertType.value = 'info'
    alertVisible.value = true

    // إخفاء الإشعار بعد 5 ثوانٍ
    setTimeout(() => {
      alertVisible.value = false
    }, 5000)
  })

  connection.start()
    .then(() => console.log("✅ SignalR Connected"))
    .catch(err => console.error("❌ SignalR Error: ", err))
})
</script>

<style scoped>
.el-alert {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 300px;
}
</style>
