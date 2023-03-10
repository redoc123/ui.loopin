const SYSTEM_NAME = "v3-admin-vite"

/** Key used when caching data */
class CacheKey {
  static TOKEN = `${SYSTEM_NAME}-token-key`
  static SIDEBAR_STATUS = `${SYSTEM_NAME}-sidebar-status-key`
  static ACTIVE_THEME_NAME = `${SYSTEM_NAME}-active-theme-name-key`
}

export default CacheKey
