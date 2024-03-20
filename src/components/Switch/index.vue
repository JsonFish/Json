<template>
    <el-switch v-model="themeStore.lightOrDark" inline-prompt active-icon="Moon" inactive-icon="Sunny" />
</template>

<script setup lang='ts'>
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
defineOptions({
    name: "ThemeSwitch"
})
</script>

<style scoped></style>