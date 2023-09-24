<template>
    <el-switch v-model="themeStore.lightOrDark" inline-prompt active-icon="MoonNight" inactive-icon="Sunny" active-color="#000"
        inactive-color="skyblue" />
</template>
    
<script setup lang='ts'>
import useThemeStore from '@/store/modules/theme.ts'
const themeStore = useThemeStore()
</script>
    
<style scoped></style>