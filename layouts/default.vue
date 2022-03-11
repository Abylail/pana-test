<template>
    <div class="default-layout">
        <CommonMainHeader class="default-layout__header"/>
        <Nuxt/>
    </div>
</template>
<script>
export default {
  middleware: "auth",
}
</script>
<style lang="scss" scoped>
.default-layout {
  $breakPoint: $break-point__header;

  @media(max-width: $breakPoint) {
    padding-top: 94px;
    &__header {
      position: fixed;
      width: 100%;
      top: 0;
      z-index: $z_header;
    }
  }
}
</style>
