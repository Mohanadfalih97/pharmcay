<template>
  <div class="flex gap-4 p-6" style="padding: 25px;">
    <!-- نموذج إضافة صيدلية -->
    <div class="w-1/2">
      <el-card>
        <h2 class="text-xl font-bold mb-4">إضافة صيدلية</h2>
        <el-form :model="form" label-position="top">
          <el-form-item label="اسم الصيدلية">
            <el-input v-model="form.name" placeholder="ادخل اسم الصيدلية" />
          </el-form-item>

          <el-form-item label="العنوان">
            <el-input v-model="form.address" placeholder="ادخل العنوان" />
          </el-form-item>

          <el-form-item label="المدينة">
            <el-input v-model="form.city" placeholder="ادخل المدينة" />
          </el-form-item>
          <el-form-item label="وقت الافتتاح">
            <el-input v-model="form.OpenTime" placeholder="وقت الافتتاح" />
          </el-form-item>
          <el-form-item label="وقت الاغلاق">
            <el-input v-model="form.CloseTime" placeholder="وقت الاغلاق" />
          </el-form-item>

        

          <el-form-item label="تحديد الموقع على الخريطة">
            <div id="map" style="height: 300px; width: 100%; border: 1px solid #ccc; border-radius: 8px;"></div>
            <div class="text-sm mt-2 text-gray-600">
              الإحداثيات الحالية: {{ form.latitude }}, {{ form.longitude }}
            </div>
          </el-form-item>

          <el-form-item label="رقم الشهادة">
            <el-input v-model="form.certificateNumber" placeholder="ادخل رقم الشهادة" />
          </el-form-item>

          <el-form-item label="تحميل صورة الشهادة">
            <el-upload
              class="upload-demo"
              action=""
              :http-request="dummyRequest"
              :on-change="handleUpload"
              :auto-upload="false"
              :limit="1"
              :file-list="fileList"
              accept="image/*"
              drag
            >
              <el-icon><upload-filled /></el-icon>
              <div class="el-upload__text">اسحب الصورة هنا أو <em>اختر صورة</em></div>
              <div class="el-upload__text" style="color: red;">يرجى اختيار صيغة <em>jpg</em> </div>
            </el-upload>
          </el-form-item>

          <el-form-item label="الوصف">
            <el-input
              type="textarea"
              v-model="form.description"
              placeholder="اكتب وصفًا للصيدلية"
            />
          </el-form-item>

          <el-form-item>
            <el-button type="success" :loading="isLoading" @click="submitForm" style="color: white;">حفظ</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- جدول عرض الصيدليات -->
     
    <div class="w-1/2">
    <div class="shadow-lg rounded overflow-auto max-h-[400px]">
      <el-table
        :data="filteredDataGet"
        class="rounded w-full text-center mx-auto"
        height="auto"
        style="min-width: 600px; direction: rtl;"
      >
        <el-table-column label="اسم الصيدلية" prop="name" />
        <el-table-column label="المدينة" prop="city" />
        <el-table-column label="وقت الافتتاح" prop="openTime">
       <template #default="scope">
      <span style="color: green; font-weight: bold;">
      {{ scope.row.openTime }}
    </span>
    </template>
  </el-table-column>

<el-table-column label="وقت الاغلاق" prop="closeTime">
  <template #default="scope">
    <span style="color: red; font-weight: bold;">
      {{ scope.row.closeTime }}
    </span>
  </template>
</el-table-column>


        <el-table-column>
          <template #default="scope">
            <div class="flex justify-center items-center gap-2">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                تعديل
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" style="color: white;">
                حذف
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { useRegisterPractitioner } from '../../js/Pharmacics'
import axios from 'axios';
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// نموذج البيانات
const form = ref({
  name: '',
  address: '',
  city: '',
  latitude: '',
  longitude: '',
  certificateNumber: '',
  certificateImage: null,
  description: '',
  OpenTime:'',
  CloseTime:'',
})

const fileList = ref([])
const search = ref('')
const pharmacies = ref([])
const { mutate: registerPharmacy, isLoading } = useRegisterPractitioner()

const dummyRequest = () => Promise.resolve()

const handleUpload = (file) => {
  form.value.certificateImage = file.raw
}

const submitForm = () => {
  const token = localStorage.getItem('token')
  const roleId = localStorage.getItem('roleId') // "2" أو "3"
  const practitionerId = localStorage.getItem('practitionerId') 

  if (!token) {
    ElMessage.error('يرجى تسجيل الدخول أولاً.')
    return
  }

  // السماح فقط لـ Admin أو Practitioner
  if (roleId !== '2' && roleId !== '3') {
    ElMessage.error('ليس لديك صلاحية لإضافة صيدلية.')
    return
  }

  const formData = new FormData()
  formData.append('Name', form.value.name)
  formData.append('Address', form.value.address)
  formData.append('City', form.value.city || 'بغداد')
  formData.append('Latitude', form.value.latitude || '33.3152')
  formData.append('Longitude', form.value.longitude || '44.3661')
  formData.append('LicenseNumber', form.value.certificateNumber)
  formData.append('OpenTime', form.value.OpenTime)
  formData.append('CloseTime', form.value.CloseTime)
  formData.append('PractitionerId', practitionerId) 

  if (form.value.certificateImage) {
    formData.append('ImagePharmacics', form.value.certificateImage)
  }

  registerPharmacy(formData, {
    onSuccess: (data) => {
      ElMessage.success(data?.message || 'تمت الإضافة بنجاح')
      pharmacies.value.push({ ...form.value })
      resetForm()
      fetchPractitionerData
    },
    onError: (error) => {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        error?.response?.data ||
        'حدث خطأ أثناء الإرسال'
      ElMessage.error(message)
    },
  })
}



const resetForm = () => {
  form.value = {
    name: '',
    address: '',
    city: '',
    latitude: '',
    longitude: '',
    certificateNumber: '',
    certificateImage: null,
    description: '',
    CloseTime: '',
    OpenTime: '',
  }
  fileList.value = []
}

const filteredData = computed(() => {
  if (!search.value) return pharmacies.value
  return pharmacies.value.filter((p) =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
})

// إعداد الخريطة
const map = ref<any>(null)
const marker = ref<any>(null)

onMounted(() => {
  map.value = L.map('map').setView([33.3152, 44.3661], 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap',
  }).addTo(map.value)

  marker.value = L.marker([33.3152, 44.3661], { draggable: true }).addTo(map.value)

  map.value.on('click', (e: any) => {
    const { lat, lng } = e.latlng
    marker.value.setLatLng([lat, lng])
    form.value.latitude = lat.toFixed(6)
    form.value.longitude = lng.toFixed(6)
  })

  marker.value.on('dragend', () => {
    const { lat, lng } = marker.value.getLatLng()
    form.value.latitude = lat.toFixed(6)
    form.value.longitude = lng.toFixed(6)
  })
})
// تعريف البيانات
const filteredDataGet = ref([]);

// دالة لجلب بيانات الصيدلية
const fetchPractitionerData = async () => {
  try {
    // جلب Practitioner ID من localStorage
    const practitionerId = localStorage.getItem('practitionerId');
    
    if (!practitionerId) {
      console.error("لا يوجد Practitioner ID في localStorage");
      return;
    }

    const response = await axios.get(`/api/Practitioner/${practitionerId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // استخراج بيانات الصيدلية من الاستجابة
    const pharmacyData = response.data.pharmacy;
    // تخزين بيانات الصيدلية في المتغير
    filteredDataGet.value = [pharmacyData]; // هنا نفترض أننا جلبنا صيدلية واحدة فقط
  } catch (error) {
    console.error("حدث خطأ أثناء جلب بيانات الصيدلي:", error);
  }
};

// دالة لتعديل البيانات
const handleEdit = (index, row) => {
  console.log("تعديل", index, row);
  // هنا يمكنك إضافة منطق تعديل
};

// دالة لحذف البيانات
const handleDelete = (index, row) => {
  console.log("حذف", index, row);
  // هنا يمكنك إضافة منطق الحذف
};

// جلب البيانات عند تحميل المكون
onMounted(() => {
  fetchPractitionerData();
});
</script>


<style scoped>
.upload-demo {
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
}
.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf {
  text-align: center;
}
.el-table td.el-table__cell div{
  text-align: end;
}
</style>
