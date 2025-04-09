<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <form
      style="padding: 10px 15px"
      class="w-full max-w-sm bg-white p-10 rounded-2xl shadow-xl flex flex-col gap-4 text-right direction-rtl"
      @submit.prevent="handleRegister"
    >
      <!-- لوجو -->
      <div class="flex justify-center">
        <img :src="logo" alt="logo" style="width: 150px; height: 150px" />
      </div>

      <p class="text-2xl font-bold text-blue-600 text-center relative">
        إنشاء حساب
      </p>

      <p class="text-sm text-gray-600 text-center">
        مرحبًا بك، الرجاء إنشاء حساب جديد للتمتع بخدماتنا.
      </p>

      <!-- الاسم الأول والاسم الثاني -->
      <div class="flex items-center justify-between w-full gap-2">
        <el-input v-model="firstName" placeholder="الاسم الأول" required class="w-full" />
        <el-input v-model="lastName" placeholder="الاسم الثاني" required class="w-full" />
      </div>

      <!-- اسم المستخدم -->
      <el-input v-model="username" placeholder="اسم المستخدم" required class="w-full" />

      <!-- كلمة المرور -->
      <el-input
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="كلمة المرور"
        required
        class="w-full"
      >
        <template #suffix>
          <el-button type="text" @click="togglePassword" class="text-blue-600 text-sm">
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
          <el-button type="text" @click="toggleConfirmPassword" class="text-blue-600 text-sm">
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

          <el-tooltip content="صيدلاني" placement="top">
            <el-button icon class="!p-2" circle @click="togglePharmacistSection">
              <i class="mdi mdi-shield-account text-xl text-gray-600"></i>
            </el-button>
          </el-tooltip>
        </div>

     <!-- قسم الصيدلاني -->
<transition name="fade-slide">
  <div v-if="showPharmacist" class="flex flex-col gap-3">
    <p class="text-lg font-bold mb-2 text-right text-blue-600">معلومات الصيدلاني</p>

    <el-input v-model="pharmacyName" placeholder="اسم الصيدلاني" class="mb-3 w-full" />
    
    <el-input
      v-model="address"
      type="text"
      placeholder="العنوان"
      required
      class="mb-3 w-full"
    />
    
    <el-input
      v-model="phone"
      type="text"
      placeholder="رقم الهاتف"
      required
      class="mb-3 w-full"
    />
    
    <el-input
      v-model="studies"
      type="text"
      placeholder="الجامعة"
      required
      class="mb-3 w-full"
    />

    <el-upload
      class="w-full"
      action="#"
      :auto-upload="false"
      :on-change="handlePharmacyImage"
      accept="image/*"
    >
      <el-button type="primary" class="text-white text-center">
        <i class="mdi mdi-upload text-lg"></i> رفع صورة
      </el-button>
    </el-upload>
  </div>
</transition>

      </div>

      <!-- الشروط والأحكام -->
      <div class="flex justify-between items-center text-sm text-gray-700 mt-1">
        <el-checkbox v-model="acceptTerms" class="gap-2">
          أوافق على الشروط والأحكام
        </el-checkbox>
      </div>

      <!-- زر تسجيل -->
      <el-button type="primary" class="text-white" @click="handleRegister">إنشاء الحساب</el-button>

      <!-- رابط تسجيل دخول -->
      <p class="text-center text-sm text-gray-600">
        لديك حساب بالفعل؟
        <router-link to="/" class="text-blue-600 hover:underline">تسجيل الدخول</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElButton, ElInput, ElCheckbox, ElTooltip, ElMessage } from 'element-plus'
import { useRegisterUser } from '../js/useRegisterUser.js'
import { useRegisterPractitioner } from '../js/useRegisterPractitioner.js'
import logo from '../assets/Imges/Icon.png'

// بيانات المستخدم
const firstName = ref('')
const lastName = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// بيانات الصيدلاني
const showPharmacist = ref(false)
const pharmacyName = ref('')
const address = ref('')
const phone = ref('')
const studies = ref('')
const pharmacyImage = ref(null)

// vue-query mutations
const { mutate: registerUser } = useRegisterUser()
const { mutate: registerPractitioner } = useRegisterPractitioner()

function togglePassword() {
  showPassword.value = !showPassword.value
}

function toggleConfirmPassword() {
  showConfirmPassword.value = !showConfirmPassword.value
}

function togglePharmacistSection() {
  showPharmacist.value = !showPharmacist.value
}

function handlePharmacyImage(file) {
  pharmacyImage.value = file.raw
}

// تنفيذ التسجيل
function handleRegister() {
  if (password.value !== confirmPassword.value) {
    ElMessage({ message: 'كلمات المرور غير متطابقة.', type: 'error' })
    return
  }

  if (!acceptTerms.value) {
    ElMessage({ message: 'يجب الموافقة على الشروط والأحكام.', type: 'error' })
    return
  }

  if (showPharmacist.value) {
    // تحقق من الحقول الأساسية
    if (!pharmacyName.value || !address.value || !phone.value || !studies.value || !pharmacyImage.value) {
      ElMessage({ message: 'يرجى تعبئة جميع معلومات الصيدلاني ورفع صورة.', type: 'error' })
      return
    }

    const formData = new FormData()
    formData.append('namePractitioner', pharmacyName.value)
    formData.append('password', password.value)
    formData.append('address', address.value)
    formData.append('phonNumber', phone.value)
    formData.append('studies', studies.value)
    formData.append('imagePractitioner', pharmacyImage.value)

    registerPractitioner(formData, {
      onSuccess: (result) => {
        ElMessage({
          message: result?.message || 'تم إنشاء الحساب بنجاح!',
          type: 'success',
        })
        // توجيه بعد النجاح (اختياري)
        // router.push('/login')
      },
      onError: (error) => {
        console.error('❌ Error', error)

        const serverMessage =
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          error?.response?.data ||
          'حدث خطأ، يرجى المحاولة لاحقًا.'

        ElMessage({
          message: `خطأ: ${serverMessage}`,
          type: 'error',
        })
      },
    })

  } else {
    const userPayload = {
      name: firstName.value,
      lastName: lastName.value,
      userName: username.value,
      password: password.value,
    }

    registerUser(userPayload, {
      onSuccess: (result) => {
        ElMessage({
          message: result?.message || 'تم إنشاء الحساب بنجاح!',
          type: 'success',
        })
        // توجيه بعد النجاح (اختياري)
        // router.push('/login')
      },
      onError: (error) => {
        console.error('❌ Error', error)

        const serverMessage =
          error?.response?.data?.message ||
          error?.response?.data?.title ||
          error?.response?.data ||
          'حدث خطأ، يرجى المحاولة لاحقًا.'

        ElMessage({
          message: `خطأ: ${serverMessage}`,
          type: 'error',
        })
      },
    })
  }
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
