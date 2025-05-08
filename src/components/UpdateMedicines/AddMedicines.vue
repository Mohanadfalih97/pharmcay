<template>
  <div class="flex gap-4 p-4" style="padding: 20px;">
    <!-- نموذج إضافة أدوية -->
    <div class="w-1/2">
      <el-card>
        <h2 class="text-xl font-bold mb-4">إضافة أدوية</h2>
        <el-form :model="form" label-position="top">
          <el-form-item label="الاسم التجاري">
            <el-input v-model="form.tradeName" placeholder="ادخل الاسم التجاري" />
          </el-form-item>

          <el-form-item label="الاسم العلمي">
            <el-input v-model="form.scientificName" placeholder="ادخل الاسم العلمي" />
          </el-form-item>

          <el-form-item label="الجرعة">
  <el-input
    v-model="form.dosage"
    placeholder="ادخل الجرعة"
    type="number"
  />
</el-form-item>

          <el-form-item label="أوقات الاستخدام">
            <el-input v-model="form.drugTiming" placeholder="أدخل أوقات الاستخدام" />
          </el-form-item>

          <el-form-item label="الآثار الجانبية">
            <el-input v-model="form.sideEffects" placeholder="أدخل الآثار الجانبية" />
          </el-form-item>

          <el-form-item label="الأدوية المتضادة">
            <el-input v-model="form.contraindicatedDrugs" placeholder="الأدوية المتضادة" />
          </el-form-item>

          <el-form-item label="اسم المصنع">
            <el-input v-model="form.manufacturerName" placeholder="ادخل اسم المصنع" />
          </el-form-item>

          <el-form-item label="اسم الشركة المنتجة">
            <el-input v-model="form.producingCompany" placeholder="ادخل اسم الشركة المنتجة" />
          </el-form-item>

          <el-form-item label="السعر">
  <el-input
    v-model="form.price"
    placeholder="ادخل السعر"
    type="number"
  />
</el-form-item>

          <el-form-item label="تاريخ الانتهاء">
            <el-date-picker
              v-model="form.expiryDate"
              type="date"
              placeholder="اختر تاريخ الانتهاء"
              format="YYYY-MM-DD"
              value-format="YYYY-MM-DD"
              style="width: 100%;"
            />
          </el-form-item>

          <el-form-item label="تحميل صورة الدواء">
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
              <div class="el-upload__text">اسحب صورة الدواء هنا أو <em>اختر صورة</em></div>
              <div class="el-upload__text" style="color: red;">يرجى اختيار صيغة <em>png</em></div>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="success" @click="handleSubmit">حفظ</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- جدول الأدوية -->
    <div class="w-1/2">
    <div class="mb-4">
      <!-- حقل البحث -->
      <el-input
        v-model="searchQuery"
        placeholder="ابحث عن دواء"
        clearable
        class="mb-4"
        @input="searchMedicines"
      ></el-input>
    </div>

    <div class="shadow-lg rounded overflow-auto max-h-[400px]">
      <el-table :data="filteredDataGet">
        <el-table-column label="الشركة" prop="producingCompany" />
        <el-table-column label="السعر" prop="price" />
        <el-table-column label="اسم الدواء" prop="tradeName" />

        <el-table-column>
          <template #default="scope">
            <div class="flex gap-4 p-4" style="gap: 10px;">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                تعديل
              </el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">
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

    
<script lang="ts" setup>
import { ref ,onMounted} from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'  
import { useCreateMedicine } from '../../js/AddMedicines'
import axios from 'axios'

const { mutate: createMedicine } = useCreateMedicine()

const fileList = ref([])

const form = ref({
  tradeName: '',
  scientificName: '',
  dosage: '',
  drugTiming: '',
  sideEffects: '',
  contraindicatedDrugs: '',
  manufacturerName: '',
  producingCompany: '',
  price: '',
  expiryDate: '', // تاريخ الانتهاء
  imageMedicine: null,
})

const handleUpload = (file) => {
  form.value.imageMedicine = file.raw
  fileList.value = [file]
}

const handleSubmit = () => {
  const formData = new FormData()

  formData.append('TradeName', form.value.tradeName)
  formData.append('ScientificName', form.value.scientificName)
  formData.append('Dosage', form.value.dosage)
  formData.append('DrugTiming', form.value.drugTiming)
  formData.append('SideEffects', form.value.sideEffects)
  formData.append('ContraindicatedDrugs', form.value.contraindicatedDrugs)
  formData.append('ManufacturerName', form.value.manufacturerName)
  formData.append('ProducingCompany', form.value.producingCompany)
  formData.append('Price', form.value.price)
  formData.append('ExpiryDate', form.value.expiryDate)

  const pharmacy = JSON.parse(localStorage.getItem('pharmacy') || '{}')
const pharmacyId = pharmacy.id

if (!pharmacyId) {
  ElMessage.error('لم يتم تحديد الصيدلية، تأكد من تسجيل الدخول')
  return
}

formData.append('PharmacyId', pharmacyId)

  formData.append('ImageMedicine', form.value.imageMedicine)

  createMedicine(formData, {
    onSuccess: () => {
      ElMessage.success('تم إضافة الدواء بنجاح')
    },
    onError: (error) => {
      ElMessage.error('حدث خطأ أثناء الإضافة')
      console.error(error)
    },
  })
}

// دالة وهمية لأنك تمنع الرفع التلقائي في el-upload
const dummyRequest = () => {}
// تعريف البيانات
const filteredDataGet = ref([]);
const searchQuery = ref(""); // قيمة البحث
const noData = ref([{ producingCompany: "لا يوجد أدوية", price: "-", tradeName: "لا توجد نتائج" }]); 

// دالة لجلب بيانات الصيدلية
const fetchmedicinesData = async () => {
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
    const medicines = response.data?.pharmacy?.medicines ?? [];
    filteredDataGet.value = medicines; // 🟢 هنا نحط فقط قائمة الأدوية
  } catch (error) {
    console.error("حدث خطأ أثناء جلب بيانات الصيدلي:", error);
  }
};
// دالة البحث
const searchMedicines = async () => {
  const practitionerId = localStorage.getItem("practitionerId"); // جلب practitionerId من الـ localStorage
  if (practitionerId && searchQuery.value.trim() !== "") {
    const response = await fetch(
       `${import.meta.env.VITE_API_BASE_URL}/api/Practitioner/search?practitionerId=${practitionerId}&search=${searchQuery.value}`,
      {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // استخدام الـ token من الـ localStorage
        },
      }
    );
    if (response.status === 404) {
      filteredDataGet.value = []; // إذا كانت الحالة 404، لا توجد نتائج
    } else {
     
      const data = await response.json();
      filteredDataGet.value = data; // تحديث البيانات المفلترة
    }
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
  fetchmedicinesData();
});
</script>

    
    
    <style scoped>
    .upload-demo {
      display: block;
    }
    </style>