<template>
  <div class="convenience">
    <div class="convenience__wrap">
      <h1 class="convenience__wrap-title">Информация о комнате</h1>
<!--      <div class="base-select">-->
<!--        <div class="base-select__title">Информация о комнате</div>-->
<!--&lt;!&ndash;        <v-select&ndash;&gt;-->
<!--&lt;!&ndash;          class="base-select__select"&ndash;&gt;-->
<!--&lt;!&ndash;          :options="roomTypes"&ndash;&gt;-->
<!--&lt;!&ndash;          :label="'name'"&ndash;&gt;-->
<!--&lt;!&ndash;          v-model="form.type"&ndash;&gt;-->
<!--&lt;!&ndash;        />&ndash;&gt;-->
<!--        <BaseSelect-->
<!--          :options="roomTypes"-->
<!--          -->
<!--        />-->
<!--      </div>-->
      <BaseSelect
        :options="roomTypes"
        placeholder="Введите название"
        v-model="form.typeName"
        title="Информация о комнате"
        @input="selectRoomType"
      />
      <BaseInput
        :title="'Название номера'"
        :placeholder="'Одноместный с видом на горы'"
        v-model="form.title"
      />
      <BaseInput
        :title="'Размер номера '"
        :placeholder="'Квадратные метры м²'"
        status
        is-only-number
        v-model="form.area"
      />
      <BaseInput
        :title="'Базовая цена за ночь'"
        :placeholder="'Цена за 1 человека/КZT'"
        is-only-number
        v-model="form.price"
      />
      <div class="convenience__input-title">Курение в номере</div>
      <div class="convenience__radio">
        <base-radio-button
          label="Разрешенно"
          :unique-key="true"
          name="one"
          v-model="form.smoking"
        />
        <base-radio-button
          label="Запрещенно"
          :unique-key="false"
          name="two"
          v-model="form.smoking"
        />
      </div>
    </div>
    <div class="convenience__wrap">
      <h1 class="convenience__wrap-title">Кровати</h1>
      <p class="convenience__wrap-description">Расскажите только об основных кроватях в номере. Не включайте информацию о дополнительных кроватях.</p>
      <div class="base-select">
        <div class="base-select__title">Кровати какого типа доступны в этом номере?</div>
        <v-select
          class="base-select__select"
          :options="bedTypes"
          :label="'name'"
          v-model="selectedBedType"
        />
      </div>
      <BaseInput
        :placeholder="'Кол-во кроватей данного типа'"
        v-model="bedNumber"
      />
    </div>
    <div class="convenience__wrap">
      <h1 class="convenience__wrap-title">Фотографии номера</h1>
      <p class="convenience__wrap-description">Расскажите только об основных кроватях в номере. Не включайте информацию о дополнительных кроватях.</p>
      <CommonPhotoUpload type="photosOfTheRoom" />
      <CommonAddedPhotos mt="26" type="photosOfTheRoom" />
    </div>
    <div class="convenience__wrap">
      <h1 class="convenience__wrap-title">Удобства</h1>
      <p class="convenience__wrap-description">Расскажите только об основных кроватях в номере. Не включайте информацию о дополнительных кроватях.</p>
      <div class="convenience__facilities">
        <BaseCheckbox
          v-for="service in services"
          type="checkbox"
          :value="service.id"
          :name="service.name"
          @change="allServices(service.id)"
        >
          {{service.name}}
        </BaseCheckbox>
      </div>
    </div>
    <div class="convenience__wrap">
      <div class="select-number">
        <div class="select-number__title">Сколько гостей могут остановиться в этой комнате</div>
        <div class="select-number__options">
          <div
            class="select-number__option"
            v-for="number in 10"
            :class="{active:number === form.amount_of_visitors}"
            @click="selectNumber(number)"
          >
            {{ number }}
          </div>
        </div>
      </div>
      <BaseInput
        :title="'Количество номеров (этого типа)'"
        :placeholder="'Введите значение'"
        v-model="form.amount_of_room"
      />
    </div>
    <div class="convenience__wrap">
      <h1 class="convenience__wrap-title">Базовая цена за ночь</h1>
      <p class="convenience__wrap-description">Это самая низкая цена, которую мы автоматический применяем к этому номеру на все даты. Прежде чем ваш объект будет запущен, вы можете установить сезонные цены на панели управления имуществом.</p>
      <BaseInput
        :title="`Цена для ${this.form.amount_of_visitors} человек (Тенге/сутки)`"
        :placeholder="'Введите цену'"
        v-model="form.price_alt"
      />
      <div class="convenience__input-title">Предлагаете ли вы более низкую цену если гостей меньше 2?</div>
      <div class="convenience__radio ">
        <base-radio-button
          label="Да"
          :unique-key="true"
          name="one"
          v-model="form.is_discount"
        />
        <base-radio-button
          label="Нет"
          :unique-key="false"
          name="two"
          v-model="form.is_discount"
        />
      </div>
      <slide>
        <BaseInput
          v-if="form.is_discount == true"
          :title="'Скидка на 1 человека ( в процентах)'"
          :placeholder="'20%'"
          v-model="form.discount"
        />
      </slide>
    </div>
    <div class="convenience__actions">
      <base-button :url="`/my-business/edit/${id}/steps/convenience`" variant="cancel"><- Назад</base-button>
      <base-button @click="createRoom" variant="next">Сохранить комнату</base-button>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import {mapActions, mapGetters} from "vuex";
import vSelect from 'vue-select'
import BaseRadioButton from "@/components/base/BaseRadioButton";
import PhotoUpload from "@/components/common/PhotoUpload";
import BaseCheckbox from "@/components/base/BaseCheckBox";
import SelectNumber from "@/components/common/SelectNumber"
import Slide from "@/components/transitions/Slide";
export default {
  components: {Slide, BaseCheckbox, PhotoUpload, BaseRadioButton, BaseSelect, BaseInput, SelectNumber, vSelect},

  data:()=>({
    form:{
      smoking: null,
      is_discount: null,
      type: 9,
      typeName: null,
      title: null,
      area: null,
      price: null,
      services:[],
      amount_of_room: null,
      amount_of_visitors: 1,
      price_alt: null,
      discount: null,
      beds:[
        {
          type: 6,
          amount_beds: 2
        }
      ],
      images:[]

      // images: this.images

    },
    selectedRoomType:"Тип номера",
    selectedServices:[],
    selectedNumberGuest:"",
    roomTitle:"",
    roomSize:"",
    roomPrice:"",
    selectedBedType:"Односпальняя/ ширина 90-130 см",
    bedNumber:"",
    numberSelectedBed:"",
    priceTwoPerson:"",
    sale:"",
    selectedPrice:""
  }),

  computed: {
    ...mapGetters({
      roomTypes:"hotel/room/getRoomTypes",
      bedTypes:"hotel/beds/getBedTypes",
      images: "photoUpload/getphotosOfTheRoom",
      services: "hotel/services/getServices"
    }),
    id(){
      return this.$route.params.id
    }
  },

  methods: {
    changeValue:function (newValue){
      console.log(newValue)
      this.selectedRoomType = newValue
    },
    changeValueSale(e){
      this.selectedPrice = e
    },
    addPhotos(){
      console.log(this.images)
    },
    selectRoomType(e){
      this.form.type = e
    },
    allServices(e){
      console.log(e)
      let services = this.form.services
      if (services.includes(e)){
        services.splice(services.indexOf(e), 1);
      }else
        services.push(e)
    },
    selectNumber(e){
      this.form.amount_of_visitors = e
    },
    // selectRoomType(e){
    //   this.selectedRoomType = e
    //   console.log(this.selectedRoomType)
    // },
    selectBedType(e){
      this.selectedBedType = e
    },
    async createRoom(){
      console.log(this.form)
      await this.addRoom({
        id:this.id,
        data:this.form
      })
      await this.$router.push(`/my-business/edit/${this.id}/steps/convenience`)
    },

    ...mapActions({
      fetchRoomInfo: "hotel/room/fetchRoomInfo",
      addRoom: "hotel/room/addRoom"
    }) ,
    async getInfo(id){
      await this.fetchRoomInfo({id})
    }
  },

  created() {
     this.$store.dispatch("hotel/room/fetchRooTypes")
     this.$store.dispatch("hotel/beds/fetchBedTypes")
     this.$store.dispatch("hotel/services/fetchServices")
  },

  async mounted(){
    await this.$store.dispatch("hotel/room/fetchRooTypes")
    await this.$store.dispatch("hotel/beds/fetchBedTypes")
    await this.$store.dispatch("hotel/services/fetchServices")
    await this.getInfo(this.id)
    this.form.images = this.images
  }
}
</script>

<style scoped lang="scss">
.convenience{
  margin-top: 39px;
  &__wrap{
    background: #FFFFFF;
    border-radius: 12px;
    padding: 24px;
    max-width: 726px;
    margin-bottom: 16px;
    &-title{
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 150%;
      color: #111111;
      margin-bottom: 6px;
    }
    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #777777;
      margin-bottom: 26px;
    }
  }
  &__facilities{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
  &__radio {
    display: flex;
    flex-direction: row;
  }
  &__input-box {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
  }
  &__input-title {
    font-size: $fs__default;
    margin-bottom: 18px;
  }
  &__input {
    margin-top: 8px;
    max-width: 345px;
  }
  &__actions {
    display: flex;
    flex-direction: row;
    *:first-child {
      margin-right: 10px;
    }
  }
}
.select-number{
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__options{
    display: flex;
    flex-direction: row;
  }
  &__option{
    background: #F8F8F8;
    border-radius: 12px;
    padding: 18px 24px;
    margin-right: 8px;
    max-width: 56px;
    cursor: pointer;
    &.active{
      background: #5684FB;
      color: #ffffff;
    }
  }
}
.base-select{
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  &__title{
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    color: #111111;
    margin-bottom: 8px;
  }
  &__options{
    cursor: pointer;
    background: $color__background-primary;
    max-width: 345px;
  }
  &__select{
    border: none;
    outline: none;
  }
}
.base-select__select .vs__search::placeholder,
.base-select__select .vs__dropdown-toggle,
.base-select__select .vs__dropdown-menu {
  background: #F5F5F5;
  border: none;
  color: #394066;
}
</style>
