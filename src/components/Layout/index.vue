<script setup lang="ts">
import Header from "./Header/index.vue";
import Main from "./Main/index.vue";
import NoiseBg from "@/components/NoiseBg/index.vue";
import Footer from "./Footer/index.vue";
</script>

<template>
  <div>
    <NoiseBg class="fixed top-0 left-0 -z-10"></NoiseBg>
    <Header></Header>
    <Main class="mt-20"></Main>
    <Footer></Footer>
  </div>
</template>
