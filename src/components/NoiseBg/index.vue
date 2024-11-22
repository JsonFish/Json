<template>
  <div class="main">
    <div class="noise"></div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  background-color: var(--main-box-background-color);
  .noise {
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        var(--home-background-color),
        var(--home-background-color)
      ),
      url("@/assets/icons/noise.svg");
  }
}
</style>
