<template>
  <div class="convenience">
    <div class="convenience__wrapper">
      <div class="convenience__description">
        <h1 class="convenience__title">Планировка и цены</h1>
        <span>Расскажите о своем первом номере. Когда вы введете всю необходимую информацию, вы сможете добавить данные других номеров.</span>
      </div>

      <RoomCard
        v-for="room in rooms"
      />

      <nuxt-link class="convenience__card convenience__add" :to="`/my-business/edit/${id}/steps/convenience/add`">
        <span>Добавить номер</span>
        <base-icon class="ic-24">add-blue</base-icon>
      </nuxt-link>

      <div class="convenience__actions">
        <base-button variant="cancel"><- Назад</base-button>
        <base-button :url="`/my-business/edit/${id}/steps/services`" variant="next">Продолжить</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import RoomCard from "@/components/common/cards/RoomCard";
import {mapActions, mapGetters} from "vuex";
export default {
  name:'convenience',

  components: {RoomCard},

  computed: {
    id(){
      return this.$route.params.id
    },
    ...mapGetters({
      rooms: "hotel/info/getRooms"
    })
  },

  methods:{
    ...mapActions({
      getRoomList: "hotel/info/fetchRooms"
    })
  },

  async mounted(){
    await this.getRoomList({id:this.id})
  }
}
</script>

<style scoped lang="scss">
.convenience {

  &__title {
    font-size: $fs__middle;
    font-weight: 700;
    margin-bottom: 8px;
    color: black;
  }

  &__wrapper {
    width: 100%;
    max-width: 726px;
  }


  &__description {
    font-size: $fs__default;
    margin-bottom: 24px;
    margin-top: 40px;
    color: $color__font-secondary;
  }

  &__card {
    background: #FFFFFF;
    border-radius: $border-radius__middle;
    margin-bottom: 16px;
    padding: 24px;
    text-decoration: none;
    outline: none;
  }

  &__add {
    cursor: pointer;
    color: $color__font-link;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .15s;
    *:first-child {margin-right: 14px;}
    &:hover { opacity: .6 }
  }

  &__actions {
    display: flex;
    flex-direction: row;
    *:first-child {
      margin-right: 10px;
    }
  }

}
</style>
