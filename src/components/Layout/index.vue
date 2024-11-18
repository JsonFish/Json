<template>
  <div>
    <NoiseBg class="fixed top-0 left-0 -z-10"></NoiseBg>
    <Header></Header>
    <Main></Main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/Layout/Header/index.vue";
import Main from "@/components/Layout/Main/index.vue";
import NoiseBg from "@/components/NoiseBg/index.vue";
import Footer from "@/components/Footer/index.vue";
</script>
