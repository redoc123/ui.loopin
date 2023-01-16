<script lang="ts" setup>
import { ref } from "vue"
import { checkPermission } from "@/utils/permission" // checkPermission permission judgment function
import SwitchRoles from "./components/SwitchRoles.vue"

/** key is to reinitialize the command every time the permission is switched */
const key = ref(1)
const handleRolesChange = () => {
  key.value++
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <div :key="key" class="margin-top">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          only
          <el-tag>admin</el-tag> can see this
        </span>
        <el-tag v-permission="['admin']" class="permission-code" type="info" size="large">
          v-permission="['admin']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['editor']" class="permission-alert">
          only
          <el-tag>editor</el-tag> can see this
        </span>
        <el-tag v-permission="['editor']" class="permission-code" type="info" size="large">
          v-permission="['editor']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['admin', 'editor']" class="permission-alert">
          both Both <el-tag>admin</el-tag> and <el-tag>editor</el-tag> can see this
        </span>
        <el-tag v-permission="['admin', 'editor']" class="permission-code" type="info" size="large">
          v-permission="['admin', 'editor']"
        </el-tag>
      </div>
    </div>
    <div :key="'checkPermission' + key" class="margin-top">
      <el-tag type="info" size="large">
        In some cases, v-permission is not suitable. For example: el-tab-pane or el-table-column of Element Plus and
        other dynamic rendering Dom scene. You can only do that by setting v-if manually.
      </el-tag>
      <el-tabs type="border-card" class="margin-top">
        <el-tab-pane v-if="checkPermission(['admin'])" label="admin">
          admin can see this
          <el-tag class="permission-code" type="info"> v-if="checkPermission(['admin'])" </el-tag>
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['editor'])" label="editor">
          editor can see this
          <el-tag class="permission-code" type="info"> v-if="checkPermission(['editor'])" </el-tag>
        </el-tab-pane>
        <el-tab-pane v-if="checkPermission(['admin', 'editor'])" label="admin and editor">
          Both admin and editor can see this
          <el-tag class="permission-code" type="info"> v-if="checkPermission(['admin', 'editor'])" </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-code {
  margin-left: 15px;
}

.margin-top {
  margin-top: 30px;
}
</style>
