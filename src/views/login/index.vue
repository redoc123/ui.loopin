<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { User, Lock, Loading } from "@element-plus/icons-vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import { type FormInstance, FormRules } from "element-plus"
import { type ILoginData } from "@/api/login"

const router = useRouter()
const loginFormRef = ref<FormInstance | null>(null)

/** login button Loading */
const loading = ref(false)

/** login form data */
const loginForm: ILoginData = reactive({
  email: "",
  password: ""
})
/** Login Form Validation Rules */
const loginFormRules: FormRules = {
  email: [
    { required: true, message: "Please enter you email address", trigger: "blur" },
    { type: "email", message: "Please enter a valid email address", trigger: "blur" }
  ],
  password: [
    { required: true, message: "please enter a valid password", trigger: "blur" },
    { min: 8, max: 16, message: "8 to 16 characters in length", trigger: "blur" }
  ]
}
/** login logic */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login({
          email: loginForm.email,
          password: loginForm.password
        })
        .then(() => {
          router.push({ path: "/" })
        })
        .catch(() => {
          loginForm.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      return false
    }
  })
}
</script>

<template>
  <div class="login-container">
    <ThemeSwitch class="theme-switch" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layout/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="email">
            <el-input
              v-model.trim="loginForm.email"
              placeholder="email"
              type="email"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              placeholder="password"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
            />
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin"> Log in </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .theme-switch {
    position: fixed;
    top: 5%;
    right: 5%;
    cursor: pointer;
  }
  .login-card {
    width: 480px;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: #fff;
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        height: 100%;
      }
    }
    .content {
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
