<template>
  <v-data-iterator
    :items="filteredMedicines"
    :items-per-page="itemsPerPage"
    :page.sync="pageNumber"
  >
    <template v-slot:header="{ page, pageCount, prevPage, nextPage }">
      <h1 class="text-h4 font-weight-bold d-flex justify-space-between mb-4 align-center">
        <div class="d-flex justify-space-between p-2 align-center gap-4">
          <div class="d-flex align-center text-truncate" style="font-size:25px">
            <v-icon size="25" class="me-2" color="#8bbcc0">mdi-pill</v-icon>
            الأدوية المقترحة
          </div>

          <div class="d-flex p-2 align-center gap-2">
            <el-input
              v-model="searchTerm"
              placeholder="ابحث هنا"
              clearable
              class="search-input"
              type="text"
            ></el-input>
            <el-button
              @click="handleSearch"
              style="background-color: color(srgb 0.57 0.76 0.77); color: white;"
            >
              <el-icon :size="20">
                <Search />
              </el-icon>
            </el-button>
          </div>
        </div>
      </h1>
    </template>

    <template v-slot:default="{ items }">
      <v-row>
        <v-col v-for="({ raw }, i) in items" :key="i" cols="12" sm="6" xl="3">
          <v-sheet border>
            <img
              :src="getImageUrl(raw.imageMedicine)"
              style="width: 100%; height: 150px; object-fit: cover;"
            />

            <v-list-item
              :title="raw.tradeName"
              density="comfortable"
              lines="two"
              :subtitle="raw.scientificName"
            >
              <template v-slot:title>
                <strong class="text-h6">{{ raw.tradeName }}</strong>
              </template>
            </v-list-item>

            <v-table class="text-caption" density="compact">
              <tbody>
                <tr align="right">
                  <th>الشركة:</th>
                  <td>{{ raw.manufacturerName }}</td>
                </tr>
                <tr align="right">
                  <th>المنتج:</th>
                  <td>{{ raw.producingCompany }}</td>
                </tr>
                <tr align="right">
                  <th>الجرعة:</th>
                  <td>{{ raw.dosage }}</td>
                </tr>
                <tr align="right">
                  <th>وقت الدواء:</th>
                  <td>{{ raw.drugTiming }}</td>
                </tr>
                <tr align="right">
                  <th>السعر:</th>
                  <td>{{ raw.price }} دينار</td>
                </tr>
                <tr align="right">
                  <th>اشتر</th>
                  <td align="right">
                    <!-- تعديل الزر ليمرر id الدواء و pharmacyId -->
                    <v-btn
                      class="ma-2"
                      @click="goToOrderPage(raw.id, raw.pharmacy.id)"
                      style="background-color: color(srgb 0.57 0.76 0.77); color: white;"
                    >
                      <v-icon icon="mdi-cart"></v-icon>
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-footer class="justify-space-between text-body-2 mt-4" color="surface-variant" style="border-radius: 10px;">
        <div>عدد الأدوية الكلي: {{ totalItems }}</div>
        <el-pagination
          style="direction: ltr;"
          background
          layout="prev, pager, next"
          :total="totalItems"
          :page-size="itemsPerPage"
          :current-page="pageNumber"
          @current-change="handlePageChange"
        />
      </v-footer>
    </template>
  </v-data-iterator>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { ElButton, ElInput, ElIcon, ElPagination } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const medicines = ref([])
const searchTerm = ref('')
const itemsPerPage = 4
const pageNumber = ref(1)
const totalItems = ref(0)
const router = useRouter()

function getImageUrl(path) {
  return `https://medicines-production.up.railway.app${path}`
}

const filteredMedicines = computed(() => {
  if (!medicines.value || medicines.value.length === 0) return []
  if (!searchTerm.value) return medicines.value
  return medicines.value.filter(med =>
    med.tradeName?.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

async function fetchMedicines() {
  try {
    const response = await axios.get( `${import.meta.env.VITE_API_BASE_URL}/api/Medicine`, {
      params: {
        pageNumber: 1,
        pageSize: 1000
      }
    })
    medicines.value = response.data.data
    totalItems.value = response.data.totalItems
    console.log('✅ Medicines fetched:', medicines.value)
  } catch (error) {
    console.error('❌ Error fetching medicines:', error)
  }
}

function handlePageChange(newPage) {
  pageNumber.value = newPage
}

function handleSearch() {
  pageNumber.value = 1
}

// دالة التوجيه إلى صفحة الطلبات مع تمرير id الدواء و pharmacyId
function goToOrderPage(medicineId, pharmacyId) {
  router.push({ path: '/OrderMedicines', query: { id: medicineId, pharmacyId: pharmacyId } })
}

onMounted(() => {
  fetchMedicines()
})
</script>
<style scoped>
::v-deep(.el-pagination.is-background .btn-next.is-active),
::v-deep(.el-pagination.is-background .btn-prev.is-active),
::v-deep(.el-pagination.is-background .el-pager li.is-active) {
  background-color: #98c8cc;
  color: var(--el-color-white);
}
</style>
