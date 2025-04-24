<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form style="padding: 10px 15px;"
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
      <div class="flex justify-between items-center text-sm text-gray-700 mt-1 gap-4">
        <el-checkbox v-model="rememberMe" class="gap-2">تذكرني</el-checkbox>
        <router-link  to="/404page" class="text-blue-600 hover:underline">نسيت كلمة المرور؟</router-link >
      </div>

      <!-- زر تسجيل -->
      <el-button
        type="primary"
        class="w-full text-white"
        @click="handleLogin"
      >
        تسجيل الدخول
      </el-button>

      <!-- رابط إنشاء حساب -->
      <p class="text-center text-sm text-gray-600">
  ليس لديك حساب؟ 
  <router-link to="/register" class="text-blue-600 hover:underline">
    إنشاء حساب
  </router-link>
</p>

    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import logo from '../assets/Imges/Icon.png'
import { useRouter } from 'vue-router'
import { useLoginUser } from '../js/useLoginUser'

// البيانات
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)

// التنقل
const router = useRouter()

// TanStack Mutation
const { mutate: loginUser } = useLoginUser()

// عرض وإخفاء كلمة المرور
function togglePassword() {
  showPassword.value = !showPassword.value
}

// تنفيذ تسجيل الدخول
function handleLogin() {
  loginUser(
    {
      userName: email.value,
      password: password.value,
    },
    {
      onSuccess: (data) => {
        const storage = localStorage;


        // 🧠 تخزين القيم المهمة
        storage.setItem('token', data.token)
        storage.setItem('userId', data.userId)
        storage.setItem('roleId', data.roleId)
        storage.setItem('practitionerId', data.practitionerId ?? '')
        storage.setItem('practitionerName', data.practitionerName ?? '')
        storage.setItem('pharmacy', JSON.stringify(data.pharmacy ?? {}))

        ElMessage({
          message: 'تم تسجيل الدخول بنجاح!',
          type: 'success',
        })

        // تحويل المستخدم للصفحة الرئيسية
        router.push('/home')
      },
      onError: (error) => {
        ElMessage({
          message: 'فشل تسجيل الدخول. تحقق من البيانات.',
          type: 'error',
        })
        console.error('❌ Login Error:', error)
      },
    }
  )
}
</script>



<style>


@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@700&display=swap');

  
</style>