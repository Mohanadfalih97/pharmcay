<template>
    <div>
      <h2 style="margin-bottom: 20px; color: #409EFF;">قائمة الطلبات</h2>
  
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="name" label="اسم الطلب" width="200" />
  
        <el-table-column label="العمليات" width="180">
          <template #default="scope">
            <el-button type="success" size="small" @click="acceptOrder(scope.row)">
              قبول
            </el-button>
            <el-button type="danger" size="small" @click="rejectOrder(scope.row)">
              رفض
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-alert
        v-if="alertVisible"
        :title="alertMessage"
        :type="alertType"
        show-icon
        closable
        @close="alertVisible = false"
        style="position: fixed; top: 20px; right: 20px; z-index: 9999; max-width: 300px;"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { HubConnectionBuilder } from '@microsoft/signalr'
  
  const orders = ref([
    { id: 1, name: 'طلب دواء 1' },
    { id: 2, name: 'طلب دواء 2' },
    { id: 3, name: 'طلب جهاز طبي' }
  ])
  
  const alertMessage = ref('');
  const alertType = ref('info');
  const alertVisible = ref(false);
  
  function acceptOrder(order) {
    console.log('تم قبول الطلب:', order)
    // منطق القبول
  }
  
  function rejectOrder(order) {
    console.log('تم رفض الطلب:', order)
    // منطق الرفض
  }
  
  // الربط مع SignalR
  onMounted(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("/api/notificationHub")
      .withAutomaticReconnect()
      .build()
  
    connection.on("ReceiveNotification", (message) => {
      alertMessage.value = message
      alertVisible.value = true
  
      // إخفاء الإشعار بعد 5 ثوانٍ
      setTimeout(() => {
        alertVisible.value = false
      }, 5000)
    })
  
    connection.on("NewOrder", (order) => {
      orders.value.push(order);
      alertMessage.value = `تم إضافة طلب جديد: ${order.name}`
      alertType.value = 'success'
      alertVisible.value = true
  
      setTimeout(() => {
        alertVisible.value = false
      }, 5000)
    })
  
    connection.start()
      .then(() => console.log("✅ SignalR Connected (Orders Component)"))
      .catch(err => console.error("❌ SignalR Error: ", err))
  })
  </script>
  