import router from "@/router"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { ElMessage } from "element-plus"
import { whiteList } from "@/config/white-list"
import { getToken } from "@/utils/cache/cookies"
import asyncRouteSettings from "@/config/async-route"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  // Determine if the user is logged in
  if (getToken()) {
    if (to.path === "/login") {
      // If already logged in, and ready to enter the Login page, redirect to the home page
      next({ path: "/" })
      NProgress.done()
    } else {
      // Check if the user has been granted its permission role
      if (userStore.roles.length === 0) {
        try {
          if (asyncRouteSettings.open) {
            // Note: roles must be an array! For example: ['admin'] or ['developer', 'editor']
            await userStore.getInfo()
            const roles = userStore.roles
            // Generate accessible Routes based on roles (accessible routes = resident routes + dynamic routes with access rights)
            permissionStore.setRoutes(roles)
          } else {
            // If the dynamic routing function is not enabled, the default role is enabled
            userStore.setRoles(asyncRouteSettings.defaultRoles)
            permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
          }
          // Add 'Dynamic Routing with Access' to Router
          permissionStore.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // Make sure adding route is done
          // Set replace: true, so navigation will not leave history
          next({ ...to, replace: true })
        } catch (err: any) {
          // If any error occurs during the process, Reset Token directly and redirect to the login page
          userStore.resetToken()
          ElMessage.error(err.message || "路由守卫过程发生错误")
          next("/login")
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // If it is in the white list without login, enter directly
      next()
    } else {
      // Other pages without access will be redirected to the login page
      next("/login")
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
