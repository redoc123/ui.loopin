import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { type ILoginData, loginApi, getUserInfoApi } from "@/api/login"
import { type RouteRecordRaw } from "vue-router"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const email = ref<string>("")

  /** set role array */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
  /** Log in */
  const login = (loginData: ILoginData) => {
    return new Promise((resolve, reject) => {
      loginApi({
        email: loginData.email,
        password: loginData.password
      })
        .then((res: any) => {
          setToken(res.data.token)
          token.value = res.data.token
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** Get user details */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getUserInfoApi()
        .then((res: any) => {
          roles.value = res.data.roles
          email.value = res.data.email
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** Switch roles */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    const permissionStore = usePermissionStore()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
  }
  /** Sign out */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
  }
  /** reset Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles, email, setRoles, login, getInfo, changeRoles, logout, resetToken }
})

/** exist setup outside use */
export function useUserStoreHook() {
  return useUserStore(store)
}
