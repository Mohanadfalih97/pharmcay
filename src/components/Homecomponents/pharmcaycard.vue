<template>
  <div class="pharmacy-list" style="direction: rtl; padding: 20px;">
    <fwb-card
      v-for="pharmacy in pharmacies"
      :key="pharmacy.id"
      variant="horizontal"
      :img-src="pharmacy.imagePharmacics ? `https://medicines-production.up.railway.app${pharmacy.imagePharmacics}` : 'https://via.placeholder.com/300x200?text=No+Image'"
      img-alt="Pharmacy Image"
      class="pharmacy-card"
    >
      <div class="p-5">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ pharmacy.name }}
        </h5>

        <p class="font-normal text-gray-700 dark:text-gray-300">
          <v-icon>mdi-map-marker</v-icon>
          <strong>العنوان:</strong> {{ pharmacy.address }}
        </p>

        <p class="font-normal text-gray-700 dark:text-gray-300 mt-2">
          <v-icon>mdi-clock-outline</v-icon>
          <strong>وقت الافتتاح:</strong>
          <span style="color: green;">
            {{ pharmacy.openTime || 'غير متوفر' }}
          </span>
        </p>

        <p class="font-normal text-gray-700 dark:text-gray-300 mt-2">
          <v-icon>mdi-clock-out</v-icon>
          <strong>وقت الإغلاق:</strong>
          <span  style="color: red;">
            {{ pharmacy.closeTime || 'غير متوفر' }}
          </span>
        </p>
      </div>
    </fwb-card>

    <div v-if="pharmacies.length === 0" class="no-data">
      <p>لا توجد بيانات لعرضها</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { FwbCard } from 'flowbite-vue';

const pharmacies = ref([]);

const fetchPharmacies = async () => {
  try {
    const response = await axios.get( `${import.meta.env.VITE_API_BASE_URL}/api/Medicine`, {
      params: {
        pageNumber: 1,
        pageSize: 10,
        Pharmacice: 1,
      },
    });

    if (response.status === 200 && response.data?.data) {
      pharmacies.value = response.data.data.map(pharmacy => pharmacy.pharmacy);
    } else {
      console.error('Failed to fetch data:', response.status);
    }
  } catch (error) {
    console.error('Error fetching pharmacies:', error);
  }
};

onMounted(fetchPharmacies);
</script>

<style scoped>
.pharmacy-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.pharmacy-card {
  width: 100%;
  max-width: 600px;
  background-color: #f8f9fa;
}

.no-data {
  text-align: center;
  color: red;
  font-size: 18px;
  width: 100%;
}
</style>
