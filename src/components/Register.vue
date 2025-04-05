<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form style="padding: 10px 15px;"
      class="w-full max-w-sm bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-4 text-right direction-rtl"
      @submit.prevent="handleRegister"
    >
      <!-- لوجو -->
      <div class="flex justify-center">
        <img :src="logo" alt="logo" style="width: 150px; height: 150px;" />
      </div>

      <p class="text-2xl font-bold text-blue-600 text-center relative">
        إنشاء حساب
      </p>

      <p class="text-sm text-gray-600 text-center">
        مرحبًا بك، الرجاء إنشاء حساب جديد للتمتع بخدماتنا.
      </p>

      <!-- الاسم الأول والاسم الثاني -->
      <div class="flex items-center justify-between w-full gap-2">
        <el-input
          v-model="firstName"
          placeholder="الاسم الأول"
          required
          class="w-full"
        />
        <el-input
          v-model="lastName"
          placeholder="الاسم الثاني"
          required
          class="w-full"
        />
      </div>



      <!-- كلمة المرور -->
      <el-input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="كلمة المرور"
        required
        class="w-full"
      >
        <template #suffix>
          <el-button
            type="text"
            @click="togglePassword"
            class="text-blue-600 text-sm"
          >
            {{ showPassword ? "إخفاء" : "إظهار" }}
          </el-button>
        </template>
      </el-input>

      <!-- تأكيد كلمة المرور -->
      <el-input
        :type="showConfirmPassword ? 'text' : 'password'"
        v-model="confirmPassword"
        placeholder="تأكيد كلمة المرور"
        required
        class="w-full"
      >
        <template #suffix>
          <el-button
            type="text"
            @click="toggleConfirmPassword"
            class="text-blue-600 text-sm"
          >
            {{ showConfirmPassword ? "إخفاء" : "إظهار" }}
          </el-button>
        </template>
      </el-input>

      <!-- أيقونات يوزر وأدمن -->
      <div class="flex flex-col gap-4">
        <div class="flex p-3 gap-4">
          <el-tooltip content="مستخدم" placement="top">
          <el-button icon class="!p-2" circle>
            <i class="mdi mdi-account text-xl text-gray-600"></i>
          </el-button>
        </el-tooltip>
    <!-- زر صيدلاني مع tooltip -->
    <el-tooltip content="صيدلاني" placement="top">
      <el-button icon class="!p-2" circle @click="togglePharmacistSection">
        <i class="mdi mdi-shield-account text-xl text-gray-600"></i>
      </el-button>
    </el-tooltip>
        </div>


    <!-- قسم الصيدلاني يظهر عند الضغط -->
    <transition name="fade-slide">
      
    <div v-if="showPharmacist" class="flex flex-col gap-3" >
      <p class="text-lg font-bold mb-2 text-right text-blue-600">معلومات الصيدلية</p>

      <!-- اسم الصيدلية -->
      <el-input
        v-model="pharmacyName"
        placeholder="اسم الصيدلية"
        class="mb-3 w-full"
      />
      <!-- البريد الإلكتروني -->
      <el-input
        v-model="email"
        type="email"
        placeholder="البريد الإلكتروني"
        required
        class="mb-3 w-full"
      />
      <!-- رقم الشهادة -->
      <el-input
        v-model="certificateNumber"
        placeholder="رقم الشهادة"
        class="mb-3 w-full"
      />

      <!-- تحميل صورة الصيدلية -->
      <el-upload
        class="w-full"
        action="#"
        :auto-upload="false"
        :on-change="handlePharmacyImage"
        accept="image/*"
      >
      <el-button type="primary" class="text-white text-center" >
  <i class="mdi mdi-upload text-lg "></i>
 
</el-button>
      </el-upload>
    </div>
  </transition>
  </div>

      <!-- الموافقة على الشروط -->
      <div class="flex justify-between items-center text-sm text-gray-700 mt-1">
        <el-checkbox v-model="acceptTerms" class="gap-2"
          >أوافق على الشروط والأحكام</el-checkbox
        >
      </div>

      <!-- زر تسجيل الحساب -->
      <el-button type="primary" class="text-white" @click="handleRegister">
  إنشاء الحساب
</el-button>

      <!-- رابط تسجيل الدخول -->
      <p class="text-center text-sm text-gray-600">
        لديك حساب بالفعل؟
        <router-link to="/" class="text-blue-600 hover:underline">
          تسجيل الدخول  </router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton, ElInput, ElCheckbox, ElTooltip } from 'element-plus'
import logo from '../assets/Imges/Icon.png'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

function handleRegister() {
  if (password.value !== confirmPassword.value) {
    alert('كلمات المرور غير متطابقة.')
  } else if (!acceptTerms.value) {
    alert('يجب الموافقة على الشروط والأحكام.')
  } else {
    alert(
      `تم إنشاء الحساب باسم: ${firstName.value} ${lastName.value}\nالبريد: ${email.value}`
    )
  }
}

const showPharmacist = ref(false)
const pharmacyName = ref('')
const certificateNumber = ref('')
const pharmacyImage = ref(null)

function togglePharmacistSection() {
  showPharmacist.value = !showPharmacist.value
}

function handlePharmacyImage(file) {
  pharmacyImage.value = file.raw
  // يمكنك الآن رفع الصورة أو عرضها
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
