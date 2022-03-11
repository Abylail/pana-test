<template>
  <div class="room">
    <div class="room__image">
      <img src="@/assets/images/hotel1.png">
    </div>
    <div class="room__info">
      <div class="room__action">
        <div class="room__title">
          <h1 class="room__title-name">Стандартный номер</h1>
          <p class="room__title-description">1 кровать 18м²</p>
        </div>
        <div class="room__price">От 21 924 ₸</div>
        <BaseIcon class="ic-48">edit</BaseIcon>
        <BaseIcon class="ic-48">delete</BaseIcon>
      </div>
      <div class="room__services">
        <div class="room__services__item">
          Wi-Fi
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/base/BaseIcon";
export default {
  components: {BaseIcon},

  props:{
    roomPrice:{
      type:Number
    },
    roomTitle:{
      type:String
    },
    roomArea:{
      type:String
    }
  }
}
</script>

<style scoped lang="scss">
.room{
  border-radius: 12px;
  background: #FFFFFF;
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  //justify-content: space-between;
  &__image{
    width: 300px;
    height: 225px;
    img{
      width: 100%;
      height: 100%;
    }
  }
  &__info{
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    width: 60%;
  }
  &__action{
    display: flex;
    flex-direction: row;
    padding: 16px;
    border-bottom: 1px solid #F1F3F7;
    justify-content: space-between;
  }
  &__services{
    padding: 16px;
    &__item{
      background: #F8F8F8;
      border-radius: 12px;
      display: inline;
      padding: 12px 32px;
    }
  }
  &__title{
    display: flex;
    flex-direction: column;
    &-name{
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
      color: #111111;
    }
    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      color: #333333;
    }
  }
  &__price{
    background: rgba(86, 132, 251, 0.08);
    border-radius: 8px;
    color: #5684FB;
    padding: 4px 12px;
    height: 50%;
  }
}
</style>
