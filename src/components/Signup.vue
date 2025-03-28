<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      class="w-full max-w-sm bg-white p-6 rounded-2xl shadow-xl flex flex-col gap-4 text-right direction-rtl"
      @submit.prevent="handleLogin"
    >
      <!-- لوجو -->
      <div class="flex justify-center">
        <img :src="logo" alt="logo" style="width: 150px; height: 150px;"  />
      </div>

      <p class="text-2xl font-bold text-blue-600 text-center relative">
        تسجيل الدخول
      </p>

      <p class="text-sm text-gray-600 text-center">
        مرحبًا بك مجددًا، الرجاء تسجيل الدخول إلى حسابك.
      </p>

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

      <!-- الخيارات -->
      <div class="flex justify-between items-center text-sm text-gray-700 mt-1">
        <el-checkbox v-model="rememberMe">تذكرني</el-checkbox>
        <a href="#" class="text-blue-600 hover:underline">نسيت كلمة المرور؟</a>
      </div>

      <!-- زر تسجيل -->
      <el-button
        type="primary"
        class="w-full"
        @click="handleLogin"
      >
        تسجيل الدخول
      </el-button>

      <!-- رابط إنشاء حساب -->
      <p class="text-center text-sm text-gray-600">
        ليس لديك حساب؟ <a href="#" class="text-blue-600 hover:underline">إنشاء حساب</a>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton, ElInput, ElCheckbox } from 'element-plus'
import logo from '../assets/Imges/Icon.png'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

function togglePassword() {
  showPassword.value = !showPassword.value
}

function handleLogin() {
  alert(`تم تسجيل الدخول بالبريد: ${email.value}\nتذكرني: ${rememberMe.value ? 'نعم' : 'لا'}`)
}
</script>
