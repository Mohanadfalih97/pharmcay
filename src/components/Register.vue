<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        class="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4 text-right direction-rtl"
        @submit.prevent="handleRegister"
      >
        <!-- لوجو -->
        <div class="flex justify-center">
          <img :src="logo" alt="logo" style="width: 150px; height: 150px;"  />
        </div>
  
        <p class="text-2xl font-bold text-blue-600 text-center relative">
          إنشاء حساب
        </p>
  
        <p class="text-sm text-gray-600 text-center">
          مرحبًا بك، الرجاء إنشاء حساب جديد للتمتع بخدماتنا.
        </p>
  
        <!-- الاسم الأول -->
        <el-input
          v-model="firstName"
          placeholder="الاسم الأول"
          required
          class="w-full"
        />
  
        <!-- الاسم الثاني -->
        <el-input
          v-model="lastName"
          placeholder="الاسم الثاني"
          required
          class="w-full"
        />
  
        <!-- البريد الإلكتروني -->
        <el-input
          v-model="email"
          type="email"
          placeholder="البريد الإلكتروني"
          required
          class="w-full"
        />
  
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
  
        <!-- الخيارات -->
        <div class="flex justify-between items-center text-sm text-gray-700 mt-1">
          <el-checkbox v-model="acceptTerms">أوافق على الشروط والأحكام</el-checkbox>
        </div>
  
        <!-- زر تسجيل الحساب -->
        <el-button
          type="primary"
          class="w-full"
          @click="handleRegister"
        >
          إنشاء الحساب
        </el-button>
  
        <!-- رابط تسجيل الدخول -->
        <p class="text-center text-sm text-gray-600">
          لديك حساب بالفعل؟ <a href="#" class="text-blue-600 hover:underline">تسجيل الدخول</a>
        </p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElButton, ElInput, ElCheckbox } from 'element-plus'
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
      alert(`تم إنشاء الحساب باسم: ${firstName.value} ${lastName.value}\nالبريد: ${email.value}`)
    }
  }
  </script>
  