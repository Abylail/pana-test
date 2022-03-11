<template>
  <div class="steps">
    <NavSteps :routes="routes"/>
    <nuxt-child/>
  </div>
</template>

<script>
import NavSteps from "@/components/common/NavSteps";
export default {
  name: "index",
  components: {NavSteps},
  data: () => ({
    routes: [
        {
          id:1,
          title: "Основная информация",
          url:'main',
        },
        {
          id:2,
          title: "Планировка и цены",
          url:'convenience',
        },
        {
          id:3,
          title: "Услуги",
          url: "facilities",
        },
        {
          id:4,
          title: "Удобства",
          url:'services',
        },
        {
          id:5,
          title: "Фотографии",
          url:'photos',
        },
        {
          id:6,
          title: "Порядок проживания",
          url:'rules',
        },
        {
          id:7,
          title: "Оплата",
          url: "payment",
        },
    ]
  })
}
</script>

<style scoped lang="scss">
.steps{
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 80px 16px;
  margin: 0 auto;
}
</style>
