<script lang="ts" setup>
import { ref, watch } from "vue"
import { useUserStore } from "@/store/modules/user"

const emit = defineEmits<{
  (e: "change"): void
}>()

const userStore = useUserStore()
const switchRoles = ref(userStore.roles[0])
watch(switchRoles, async (value) => {
  await userStore.changeRoles(value)
  emit("change")
})
</script>

<template>
  <div>
    <div>Your Authority：{{ userStore.roles }}</div>
    <div class="switch-roles">
      <span>Switch permissions：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="editor" />
        <el-radio-button label="admin" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
