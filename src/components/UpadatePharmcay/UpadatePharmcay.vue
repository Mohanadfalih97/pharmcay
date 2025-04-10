<template>
  <div class="flex gap-4 p-4">
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

          <el-form-item label="رقم الشهادة">
            <el-input v-model="form.certificateNumber" placeholder="ادخل رقم الشهادة" />
          </el-form-item>

          <el-form-item label="وقت الافتتاح">
            <el-time-picker
              v-model="form.openTime"
              placeholder="اختر وقت الافتتاح"
              format="HH:mm"
            />
          </el-form-item>

          <el-form-item label="وقت الإغلاق">
            <el-time-picker
              v-model="form.closeTime"
              placeholder="اختر وقت الإغلاق"
              format="HH:mm"
            />
          </el-form-item>

          <el-form-item label="تحميل صورة الشهادة">
            <el-upload
              class="upload-demo"
              action="#"
              :auto-upload="false"
              :on-change="handleUpload"
            >
              <el-button type="primary">اختر صورة</el-button>
              <template #tip>
                <div class="el-upload__tip">يرجى تحميل صورة بصيغة JPG</div>
              </template>
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
            <el-button type="success" @click="submitForm">حفظ</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <!-- رفع ملفات إضافية -->
    <div class="w-1/2">
      <v-file-upload v-model="model" clearable multiple show-size>
        <template v-slot:item="{ props: itemProps }">
          <v-file-upload-item v-bind="itemProps" lines="one" nav>
            <template v-slot:prepend>
              <v-avatar size="32" rounded></v-avatar>
            </template>

            <template v-slot:clear="{ props: clearProps }">
              <v-btn color="primary" v-bind="clearProps"></v-btn>
            </template>
          </v-file-upload-item>
        </template>
      </v-file-upload>
    </div>
  </div>
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="وقت الافتتاح " prop="date" />
      <el-table-column label="وقت الاغلاق " prop="date" />
      <el-table-column label="اسم الصيدلية" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="بحث عن صيدلية" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
            تعديل
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            حذف 
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script lang="ts" setup>
  import { computed, ref } from 'vue'
  
const form = ref({
  name: '',
  address: '',
  certificateNumber: '',
  openTime: '',
  closeTime: '',
  description: '',
  certificateImage: null,
})
import { shallowRef } from 'vue'

  const model = shallowRef(null)
const handleUpload = (file) => {
  form.value.certificateImage = file.raw
}

const submitForm = () => {
  console.log('Form Data:', form.value)
  // هنا تضيف كود إرسال البيانات إلى API أو تخزينها
}
  interface User {
    date: string
    name: string
    address: string
  }
  
  const search = ref('')
  const filterTableData = computed(() =>
    tableData.filter(
      (data) =>
        !search.value ||
        data.name.toLowerCase().includes(search.value.toLowerCase())
    )
  )
  const handleEdit = (index: number, row: User) => {
    console.log(index, row)
  }
  const handleDelete = (index: number, row: User) => {
    console.log(index, row)
  }
  
  const tableData: User[] = [
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'John',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-04',
      name: 'Morgan',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-01',
      name: 'Jessy',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ]
  </script>
  <style scoped>
  .upload-demo {
    display: block;
  }
  </style>