<script lang="ts" setup>
import { ref, onUnmounted } from "vue"
import { ElMessage } from "element-plus"
import screenfull from "screenfull"

const props = defineProps({
  /** full screen element, the default is html */
  element: {
    type: String,
    default: "html"
  },
  /** Open full screen prompt */
  openTips: {
    type: String,
    default: "full screen"
  },
  /** Turn off full screen prompt */
  exitTips: {
    type: String,
    default: "Exit Full Screen"
  }
})

const tips = ref<string>(props.openTips)
const isFullscreen = ref<boolean>(false)

const click = () => {
  const dom = document.querySelector(props.element) || undefined
  if (!screenfull.isEnabled) {
    ElMessage.warning("your browser is not working")
    return
  }
  screenfull.toggle(dom)
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
  tips.value = screenfull.isFullscreen ? props.exitTips : props.openTips
}

screenfull.on("change", change)

onUnmounted(() => {
  if (screenfull.isEnabled) {
    screenfull.off("change", change)
  }
})
</script>

<template>
  <div @click="click">
    <el-tooltip effect="dark" :content="tips" placement="bottom">
      <svg-icon :name="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  font-size: 20px;
  &:focus {
    outline: none;
  }
}
</style>
