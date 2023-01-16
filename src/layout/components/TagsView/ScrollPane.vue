<script lang="ts" setup>
import { computed, ref } from "vue"
import { ElScrollbar } from "element-plus"
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue"
import { useSettingsStore } from "@/store/modules/settings"
import Screenfull from "@/components/Screenfull/index.vue"

const settingsStore = useSettingsStore()

const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
const scrollbarContentRef = ref<HTMLDivElement>()

/** The distance from the current scroll bar to the left */
let currentScrollLeft = 0
/** Each scroll distance */
const translateDistance = 200

/** fires when scrolling */
const scroll = ({ scrollLeft }: { scrollLeft: number }) => {
  currentScrollLeft = scrollLeft
}

/** click to scroll */
const scrollTo = (direction: "left" | "right") => {
  let scrollLeft = 0
  /** The length of the scrollable content */
  const scrollbarContentRefWidth = scrollbarContentRef.value!.clientWidth
  /** scroll viewport width */
  const scrollbarRefWidth = scrollbarRef.value!.wrapRef!.clientWidth
  /** The last remaining scrollable width */
  const lastDistance = scrollbarContentRefWidth - scrollbarRefWidth - currentScrollLeft
  // No horizontal scroll bar, just end
  if (scrollbarRefWidth > scrollbarContentRefWidth) return
  if (direction === "left") {
    scrollLeft = Math.max(0, currentScrollLeft - translateDistance)
  } else {
    scrollLeft = Math.min(currentScrollLeft + translateDistance, currentScrollLeft + lastDistance)
  }
  scrollbarRef.value!.setScrollLeft(scrollLeft)
}
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})
</script>

<template>
  <div class="scroll-container">
    <el-icon class="arrow left" @click="scrollTo('left')">
      <ArrowLeft />
    </el-icon>
    <el-scrollbar ref="scrollbarRef" @scroll="scroll">
      <div ref="scrollbarContentRef" class="scrollbar-content">
        <slot />
      </div>
    </el-scrollbar>
    <el-icon class="arrow right" @click="scrollTo('right')">
      <ArrowRight />
    </el-icon>
    <Screenfull v-if="showScreenfull" element=".app-main" openTips="内容区全屏" class="screenfull" />
  </div>
</template>

<style lang="scss" scoped>
.scroll-container {
  height: 100%;
  user-select: none;
  display: flex;
  justify-content: space-between;
  .arrow {
    width: 40px;
    height: 100%;
    cursor: pointer;
    &.left {
      box-shadow: 5px 0 5px -6px #ccc;
    }
    &.right {
      box-shadow: -5px 0 5px -6px #ccc;
    }
  }
  .el-scrollbar {
    flex: 1;
    // 横向超出窗口长度时，显示滚动条
    white-space: nowrap;
    .scrollbar-content {
      display: inline-block;
    }
  }
  .screenfull {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
}
</style>
