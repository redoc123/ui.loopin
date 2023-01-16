<script lang="ts" setup>
import { useSettingsStore } from "@/store/modules/settings"

const settingsStore = useSettingsStore()
</script>

<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">System layout configuration</h3>
      <div class="drawer-item">
        <span>Show tab bar</span>
        <el-switch v-model="settingsStore.showTagsView" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show sidebar logo</span>
        <el-switch v-model="settingsStore.showSidebarLogo" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Fixed Header</span>
        <el-switch v-model="settingsStore.fixedHeader" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show message notification</span>
        <el-switch v-model="settingsStore.showNotify" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show switch theme button</span>
        <el-switch v-model="settingsStore.showThemeSwitch" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show fullscreen button</span>
        <el-switch v-model="settingsStore.showScreenfull" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show gray mode</span>
        <el-switch v-model="settingsStore.showGreyMode" class="drawer-switch" />
      </div>
      <div class="drawer-item">
        <span>Show Color Weakness Mode</span>
        <el-switch v-model="settingsStore.showColorWeakness" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-title {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 22px;
  }
  .drawer-item {
    font-size: 14px;
    padding: 12px 0;
  }
  .drawer-switch {
    float: right;
  }
}
</style>
