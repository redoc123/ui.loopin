<script lang="ts" setup>
import { useTheme } from "@/hooks/useTheme"

const { initTheme } = useTheme()
initTheme()

</script>

<template>
  <ElConfigProvider>
    <router-view />
  </ElConfigProvider>
</template>
