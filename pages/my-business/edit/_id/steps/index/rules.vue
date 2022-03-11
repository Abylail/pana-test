<template>
  <div class="rules">
<!--    {{ rules }}-->
    <div class="rules__wrap">
      <h1 class="rules__wrap-title">Порядок проживания</h1>
      <p class="rules__wrap-description">Укажите базовые правила (например, в отношении отмены бронирований или проживания с домашними животными).</p>
    </div>
    <div class="rules__wrap">
      <BaseSelect
        :options="days"
        :title="'За сколько дней гости могут отменить бронирование без уплаты штрафа?'"
        :label="'name'"
        v-model="form.cancel_booking.name"
      />
      <BaseSelect
        :title="'Или гостям будет необходимо оплатить 100%'"
        :options="guestsPay"
        :label="'name'"
        v-model="form.booking_fine.name"
      />
    </div>
    <div class="rules__wrap">
      <h1 class="rules__wrap-title">Дети</h1>
      <p class="rules__wrap-description">Размещение детей разрешено? (Возраст и цены можно указать позже)</p>
      <h1 class="rules__wrap-radio">Курение в номере</h1>
<!--      <div style="display: flex;flex-direction: row; margin-bottom: 14px">-->
<!--        <BaseRadioButton-->
<!--          :title="'Курение в номере'"-->
<!--          v-for="smoke in smoking"-->
<!--          :label="smoke.label"-->
<!--          name="'options'"-->
<!--        />-->
<!--      </div>-->
      <div class="rules__radio rules__input-box">
        <base-radio-button
          :unique-key="true"
          label="Да"
          name="one"
          v-model="form.children"
        />
        <base-radio-button
          :unique-key="false"
          label="Нет"
          name="two"
          v-model="form.children"
        />
      </div>
    </div>
    <div class="rules__wrap">
      <h1 class="rules__wrap-title">Домашние животные</h1>
      <p class="rules__wrap-description">Некоторым путешественникам нравится брать с собой пушистых питомцев. Укажите, разрешены ли домашние животные в вашем объекте и взимается ли за это дополнительная плата.</p>
      <h1 class="rules__wrap-radio">Домашние животные разрешены?</h1>
      <div class="rules__radio rules__input-box">
        <base-radio-button
          :unique-key="1"
          label="Да"
          name="one"
          v-model="form.pets"
        />
        <base-radio-button
          :unique-key="2"
          label="Нет"
          name="two"
          v-model="form.pets"
        />
        <base-radio-button
          :unique-key="3"
          label="По запросу"
          name="two"
          v-model="form.pets"
        />
      </div>
      <h1 class="rules__wrap-radio">За проживание с домашними животными взимается дополнительная плата?</h1>
      <div class="rules__radio rules__input-box">
        <base-radio-button
          :unique-key="true"
          label="Да"
          name="one"
          v-model="form.pay_for_pet"
        />
        <base-radio-button
          :unique-key="false"
          label="Нет"
          name="two"
          v-model="form.pay_for_pet"
        />
      </div>
      <BaseInput
        :title="'Какая ценая взимается за домашних животных?'"
        :placeholder="'Введите значение в тенге'"
        v-model="form.payment_for_pet"
      />
    </div>
    <div class="rules__wrap">
      <div style="display: flex; flex-direction: row">
        <BaseInput
          style="margin-right: 16px"
          :title="'Регистрация заезда  с'"
          :placeholder="'С 14:00'"
          v-model="form.check_in_from"
        />
        <BaseInput
          :title="'Регистрация отъезда с'"
          :placeholder="'До 20:00'"
          v-model="form.check_in_to"
        />
      </div>
      <div style="display: flex; flex-direction: row">
        <BaseInput
          style="margin-right: 16px"
          :title="'Регистрация заезда  До'"
          :placeholder="'С 17:00'"
          v-model="form.check_out_from"
        />
        <BaseInput
          :title="'Регистрация отъезда До'"
          :placeholder="'До 12:00'"
          v-model="form.check_out_to"
        />
      </div>
    </div>
    <div class="rules__actions">
      <base-button variant="cancel"><- Назад</base-button>
      <base-button variant="next" @click="next">Продолжить</base-button>
    </div>
  </div>
</template>

<script>
import BaseSelect from "@/components/base/BaseSelect";
import BaseRadioButton from "@/components/base/BaseRadioButton";
import {mapActions, mapGetters} from "vuex";
import BaseInput from "@/components/base/BaseInput";
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  name:'rules',

  components: {BaseInput, BaseRadioButton, BaseSelect},

  computed:{
    id(){
      return this.$route.params.id
    },
    ...mapGetters({
      rules: "hotel/info/getRules"
    }),
  },

  data:() => ({
    loading: true,
    guestsPay:[
      {
        id:1,
        name:"от полной стоимости проживания"
      },
      {
        id:2,
        name:"от стоимости первой ночи"
      },
      {
        id:3,
        name:"Нет"
      }
    ],
    days:[
      {
        id:0,
        name:"В день заезда (до 18:00)",
      },
      {
        id:1,
        name:"1 день",
      },
      {
        id:2,
        name:"2 дня",
      },
      {
        id:3,
        name:"3 дня",
      },
      {
        id:7,
        name:"7 дней"
      },
      {
        id:14,
        name:"14 дней"
      }
    ],
    form: {
      booking_fine: {
        id: null,
        name: null
      },
      cancel_booking: {
        id: null,
        name: null
      },
      check_in_to: null,
      check_in_from: null,
      check_out_to: null,
      check_out_from: null,
      children: null,
      pay_for_pet: null,
      payment_for_pet: null,
      pets: null
    }
  }),
  validations: {
    form: {
      booking_fine: {
        id: { required },
        name: { required }
      },
      cancel_booking: {
        id: { required },
        name: { required }
      },
      check_in_to: { required },
      check_in_from: { required },
      check_out_to: { required },
      check_out_from: { required },
      children: { required },
      pay_for_pet: { required },
      payment_for_pet: { required },
      pets: { required }
    }
  },

  methods: {
    ...mapActions({
      fetchRules: "hotel/info/fetchRules",
      addRules: "hotel/info/addRules"
    }),
    async getRules(){
      this.loading = true;
      await this.fetchRules({id:this.id})
      console.log(this.rules)
      this.form = JSON.parse(JSON.stringify(this.rules))
      this.loading = false
    },

    selectPet(e){
      console.log(e)
    },

    selectBooking(e){
      this.form.cancel_booking = e.id
    },
    selectBookingFine(e){
      this.form.booking_fine = e.id
    },

    async next(){
      console.log(this.form)
      await this.addRules({id:this.id,data:this.form})
    }
  },

  async mounted(){
    await this.getRules()
  }
}
</script>

<style scoped lang="scss">
.rules{
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

    &-radio{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #111111;
      margin: 22px 0;
    }

    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #777777;
    }
  }
  &__radio {
    display: flex;
    flex-direction: row;
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
