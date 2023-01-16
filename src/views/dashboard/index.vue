<script lang="ts" setup>
import { h, ref } from "vue"
import { useUserStore } from "@/store/modules/user"
import AdminDashboard from "./admin/index.vue"
import EditorDashboard from "./editor/index.vue"
import { ElNotification } from "element-plus"

type CurrentRoleType = "admin" | "editor"

const userStore = useUserStore()
const currentRole = ref<CurrentRoleType>("admin")
if (!userStore.roles.includes("admin")) {
  currentRole.value = "editor"
}

ElNotification({
  title: "Hello",
  message: h(
    "a",
    { style: "color: teal", target: "_blank", href: "https://github.com/un-pany/v3-admin-vite" },
    "It is not easy to get a star for a project, if you like this project, please click here to support a star! This is the author's sole motivation for continued maintenance (whispers: it's free after all)"
  ),
  duration: 0,
  position: "bottom-right"
})
</script>

<template>
  <component :is="currentRole === 'admin' ? AdminDashboard : EditorDashboard" />
</template>
