<template>
  <div class="calendar">
    <BaseTabs/>
    <div class="calendar__title-card">
      <h1 class="calendar__title">Календарь</h1>
      <div class="calendar__description mt-12">4 места</div>
    </div>

    <div class="calendar__booking-title">
      <div class="calendar__title">Бронирования за 2 недели</div>
      <nuxt-link to="">Все бронирования</nuxt-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
}
</script>

<style lang="scss" scoped>
.calendar {
  max-width: $max-width;
  width: calc(100% - 32px);
  padding: 48px 16px;
  margin: 0 auto;

  &__title-card {
    background: #FFFFFF;
    border-radius: 0 12px 12px 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__title {
    font-size: $fs__middle;
  }

  &__description {
    font-size: $fs__default;
    color: $color__font-secondary;
  }

  &__booking-title {
    margin-top: 32px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media(max-width: $break-point__mobile) {
      flex-direction: column;
    }
  }
}
</style>
