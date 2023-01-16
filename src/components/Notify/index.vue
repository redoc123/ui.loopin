<script lang="ts" setup>
import { ref, computed } from "vue"
import { ElMessage } from "element-plus"
import { Bell } from "@element-plus/icons-vue"
import NotifyList from "./NotifyList.vue"
import { type IListItem, notifyData, messageData, todoData } from "./data"

type TabNameType = "Notice" | "information" | "Upcoming"

interface IDataItem {
  name: TabNameType
  type: "primary" | "success" | "warning" | "danger" | "info"
  list: IListItem[]
}

/** The current value of the subscript */
const badgeValue = computed(() => {
  let value = 0
  for (let i = 0; i < data.value.length; i++) {
    value += data.value[i].list.length
  }
  return value
})
/** Maximum value of subscript */
const badgeMax = 99
/** panel width */
const popoverWidth = 350
/** current Tab */
const activeName = ref<TabNameType>("Notice")
/** all data */
const data = ref<IDataItem[]>([
  // notification data
  {
    name: "Notice",
    type: "primary",
    list: notifyData
  },
  // message data
  {
    name: "information",
    type: "danger",
    list: messageData
  },
  // pending data
  {
    name: "Upcoming",
    type: "warning",
    list: todoData
  }
])

const handleHistory = () => {
  ElMessage.success(`跳转到${activeName.value}历史页面`)
}
</script>

<template>
  <div class="notify">
    <el-popover placement="bottom" :width="popoverWidth" trigger="click">
      <template #reference>
        <el-badge :value="badgeValue" :max="badgeMax" :hidden="badgeValue === 0">
          <el-tooltip effect="dark" content="notification" placement="bottom">
            <el-icon :size="20">
              <Bell />
            </el-icon>
          </el-tooltip>
        </el-badge>
      </template>
      <template #default>
        <el-tabs v-model="activeName" class="demo-tabs" stretch>
          <el-tab-pane v-for="(item, index) in data" :name="item.name" :key="index">
            <template #label>
              {{ item.name }}
              <el-badge :value="item.list.length" :max="badgeMax" :type="item.type" />
            </template>
            <el-scrollbar height="400px">
              <NotifyList :list="item.list" />
            </el-scrollbar>
          </el-tab-pane>
        </el-tabs>
        <div class="notify-history">
          <el-button link @click="handleHistory">Check{{ activeName }}history</el-button>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<style lang="scss" scoped>
.notify {
  margin-right: 10px;
  color: var(--el-text-color-regular);
}
.notify-history {
  text-align: center;
  padding-top: 12px;
  border-top: 1px solid var(--el-border-color);
}
</style>
