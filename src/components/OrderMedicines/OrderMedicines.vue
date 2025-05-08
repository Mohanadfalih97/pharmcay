<template>
  <el-card class="max-w-xl mx-auto mt-10">
    <template #header style="background-color: rgb(131 182 185);">
      <div class="text-xl font-semibold headText">ارسال طلب دواء</div>
    </template>

    <el-form :model="form">
      <el-form-item label="اسم المريض">
        <el-input v-model="form.patientName" placeholder="ادخل اسم المريض"></el-input>
      </el-form-item>

      <div class="inputForm">
        <el-form-item label="عمر المريض">
          <el-input-number v-model="form.patientAge" :min="0"></el-input-number>
        </el-form-item>

        <el-form-item label="وزن المريض (كجم)">
          <el-input-number v-model="form.patientWeight" :min="0" ></el-input-number>
        </el-form-item>
      </div>

      <div class="formDiv">
        <el-form-item label="نوع المرض">
          <el-input v-model="form.illnessType" placeholder="ادخل نوع المرض"></el-input>
        </el-form-item>
        <el-form-item label="الحساسيه من الامراض">
          <el-input v-model="form.drugAllergy" placeholder="ادخل الحساسية من الامراض"></el-input>
        </el-form-item>
      </div>

      <el-form-item label="العنوان">
        <el-input v-model="form.address" placeholder="ادخل العنوان"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">إرسال الطلب</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import axios from 'axios';
import { useRoute } from 'vue-router'; // استخدام useRoute للوصول للـ query

const route = useRoute(); // الوصول إلى الـ query
const form = reactive({
  patientName: '',
  patientAge: null,
  patientWeight: null,
  illnessType: '',
  drugAllergy: '',
  address: '',
  pharmacyId: null, // إضافة pharmacyId هنا
  medicineIds: [] // إضافة الـ medicineIds هنا
});

// استقبال الـ id و pharmacyId من الـ query
const medicineId = route.query.id;
const pharmacyId = route.query.pharmacyId; // استقبال pharmacyId

if (medicineId) {
  form.medicineIds.push(Number(medicineId)); // إضافة الـ id إلى الـ medicineIds
}

if (pharmacyId) {
  form.pharmacyId = Number(pharmacyId); // إضافة pharmacyId إلى الـ form
}

function submitForm() {
  if (!form.patientName || !form.patientAge || !form.patientWeight || !form.illnessType || !form.drugAllergy || !form.address) {
    ElMessage.error('يرجى تعبئة جميع الحقول');
    return;
  }

  // الحصول على التوكن من localStorage
  const token = localStorage.getItem('token');

  if (!token) {
    ElMessage.error('لم يتم العثور على التوكن. يرجى تسجيل الدخول');
    return;
  }

  // إرسال البيانات إلى السيرفر مع التوكن
  const orderData = {
    age: form.patientAge,
    weight: form.patientWeight,
    chronicDiseases: form.illnessType, // استبدال هذا بالبيانات الصحيحة إذا كانت موجودة
    drugAllergy: form.drugAllergy, // استبدال هذا بالبيانات الصحيحة إذا كانت موجودة
    address: form.address, // استبدال هذا بالبيانات الصحيحة إذا كانت موجودة
    pharmacyId: form.pharmacyId, // استخدام pharmacyId هنا
    medicineIds: form.medicineIds, // استخدام الـ medicineIds هنا
  };

  axios.post('/api/Order', orderData, {
    headers: {
      'Authorization': `Bearer ${token}`, // إضافة التوكن في الرأس
    }
  })
    .then((response) => {
      ElMessage.success('تم إرسال الطلب بنجاح');
      resetForm();
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        ElMessage.error('فشل في المصادقة. يرجى تسجيل الدخول');
      } else {
        ElMessage.error('حدث خطأ أثناء إرسال الطلب');
      }
    });
}

function resetForm() {
  form.patientName = '';
  form.patientAge = null;
  form.patientWeight = null;
  form.illnessType = '';
  form.drugAllergy = '';
  form.address = '';
  form.pharmacyId = null; // إعادة تعيين pharmacyId
  form.medicineIds = []; // إعادة تعيين الـ medicineIds
}
</script>

<style scoped>
/* استخدام ::v-deep لتطبيق الأنماط على مكونات Element Plus */
::v-deep .el-form-item__label {
  text-align: right !important;
  margin-bottom: 6px !important;
}

::v-deep .el-input__wrapper {
  width: 250px !important;
}

::v-deep .el-form-item {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
}

::v-deep .el-form-item__label {
  width: 100% !important;
  text-align: right !important;
  justify-content: flex-start;
  margin-bottom: 6px !important;
}

::v-deep .inputForm {
  display: flex;
  gap: 10px;
}

::v-deep .formDiv {
  display: flex;
  flex-direction: row;
  gap: 15px;
}

::v-deep .el-button {
  background-color: rgb(131 182 185); /* تعديل اللون مثلا */
  color: white !important; /* تعديل اللون النصي */
  border-color:rgb(131 182 185);
}
::v-deep .el-button--primary {
  --el-button-hover-border-color: rgb(131 182 185);
}
.headText{
  color: white;
}
::v-deep .el-card__header {
  background-color: rgb(131 182 185);
}
</style>

