import { watch, onBeforeMount, onMounted, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router"
import { useAppStore, DeviceType } from "@/store/modules/app"

/** Refer to Bootstrap's responsive design WIDTH = 992 */
const WIDTH = 992

/** Re-layout according to size change */
export default () => {
  const route = useRoute()
  const appStore = useAppStore()

  const _isMobile = () => {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  const _resizeHandler = () => {
    if (!document.hidden) {
      const isMobile = _isMobile()
      appStore.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)
      if (isMobile) {
        appStore.closeSidebar(true)
      }
    }
  }

  watch(
    () => route.name,
    () => {
      if (appStore.device === DeviceType.Mobile && appStore.sidebar.opened) {
        appStore.closeSidebar(false)
      }
    }
  )

  onBeforeMount(() => {
    window.addEventListener("resize", _resizeHandler)
  })

  onMounted(() => {
    if (_isMobile()) {
      appStore.toggleDevice(DeviceType.Mobile)
      appStore.closeSidebar(true)
    }
  })

  onBeforeUnmount(() => {
    window.removeEventListener("resize", _resizeHandler)
  })
}
