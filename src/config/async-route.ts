/** 动态路由配置 */
interface IAsyncRouteSettings {
  /**
   * Is the dynamic routing function enabled?
   * 1. After opening, the cooperation of the backend is required. In the Search user details interface, the fields that the current user can use to judge and load dynamic routes are returned (this project uses the roles field)
   * 2. If the project does not need to display different pages according to different users, you should set open: false
   */
  open: boolean
  /** When dynamic routing is disabled:
   * 1. All routes should be written in the resident route (indicating that all logged-in users can access the same pages)
   * 2. The system automatically assigns a default role to the currently logged in user (the default is admin, which has all page permissions)
   */
  defaultRoles: Array<string>
}

const asyncRouteSettings: IAsyncRouteSettings = {
  open: true,
  defaultRoles: ["admin"]
}

export default asyncRouteSettings
