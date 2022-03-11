<template>
  <div class="main">
    <div class="main__wrap">
      <h1 class="main__wrap-title">{{profile.first_name}}, добро пожаловать!</h1>
      <p class="main__wrap-description">Для начала укажите название и адрес вашего объекта, а также контактные данные.</p>
    </div>
    <div class="main__wrap">
      <BaseInput
        v-model="form.title"
        placeholder="Введите название"
        title="Как называется ваш объект?"
        message="Это название будут видеть гости при поиске варианта проживания."
      />
      <BaseTextArea
        v-model="form.description"
        :row="4"
        title="Описание объекта"
        placeholder="Например: Отель расположен в Алматы, в 11 км от высокогорного спортивного комплекса"
      />
      <BaseSelect
        v-model="form.stars"
        :options="hotelStars"
        label="value"
        placeholder="Не применяется"
        title="Количество звезд"
        name="options"
        @input="selectStar"
      />
    </div>
    <div class="main__wrap">
      <h1 class="main__wrap-title">Контактные данные</h1>
      <BaseInput
        v-model="form.contact_person"
        title="Контактное лицо"
        placeholder="Введите название"
      />
      <BaseInput
        v-model="form.contact_number"
        title="Контактный номер телефона"
        is-mask
        :placeholder="'+7 (___) ___ __ __'"
      />
      <BaseInput
        v-model="form.alt_contact_number"
        title="Альтернативный номер телефона"
        placeholder="Введите название"
        status
        is-mask
        :placeholder="'+7 (___) ___ __ __'"
      />
      <h1 class="main__wrap-radio">Вы представляете управляющую компанию, или ваш объект размещения — часть группы или сети?</h1>
      <div class="main__radio">
        <base-radio-button
          :unique-key="true"
          name="yes"
          label="Да"
          v-model="form.is_manager"
        />
        <base-radio-button
          :unique-key="false"
          label="Нет"
          name="no"
          v-model="form.is_manager"
        />
      </div>
      <slide>
        <BaseInput
          v-if="form.is_manager == true"
          v-model="form.company_name"
          :title="'Название компании, группы или сети'"
          :placeholder="'Введите название'"
        />
      </slide>
<!--      <BaseRadioButton-->

<!--      />-->
<!--      <BaseInput-->
<!--        title="Название компании, группы или сети"-->
<!--        placeholder="Введите название"-->
<!--      />-->
    </div>
    <div class="main__wrap">
      <h1 class="main__wrap-title">Где находится ваш объект?</h1>
      <BaseInput
        v-model="form.address.address"
        title="Улица и номер дома"
        placeholder="Введите название"
      />
      <BaseInput
        v-model="form.address.address2"
        title="Адрес строка 2"
        placeholder="Введите название"
      />
      <BaseSelect
        placeholder="Введите название"
        title="Страна/территория"
        valueField=""
        :dictionary="Dictionary.countries"
        :value="form.address.country"
        @input="selectCountry"
      />
      <Slide>
      <BaseSelect
        v-if="form.address.country"
        placeholder="Введите название"
        title="Город"
        :dictionary="Dictionary.cities"
        :dictionaryPayload="{country: form.address.countryId}"
        valueField=""
        :value="form.address.city"
        @input="selectCity"
      />
      </Slide>
<!--      <BaseInput-->
<!--        :title="'Город'"-->
<!--        :placeholder="'Например: Алматы'"-->
<!--      />-->
      <BaseInput
        v-model="form.address.post_index"
        :title="'Почтовый индекс'"
        :placeholder="'Например: Алматы'"
      />
<!--      <h1 class="main__wrap-radio">Вы представляете управляющую компанию, или ваш объект размещения — часть группы или сети?</h1>-->
<!--      <div class="main__radio">-->
<!--        <base-radio-button-->
<!--          :unique-key="true"-->
<!--          name="one"-->
<!--          label="Да"-->
<!--          v-model="form.address.is_manager"-->
<!--        />-->
<!--        <base-radio-button-->
<!--          :unique-key="false"-->
<!--          label="Нет"-->
<!--          name="zero"-->
<!--          v-model="form.address.is_manager"-->
<!--        />-->
<!--      </div>-->
<!--      <BaseInput-->
<!--        v-model="form.address.name"-->
<!--        :title="'Название компании, группы или сети'"-->
<!--        :placeholder="'Введите название'"-->
<!--      />-->
    </div>

    <div class="main__actions">
      <base-button class="main__actions__back" variant="cancel"><- Назад</base-button>
      <base-button variant="next" @click="next">Продолжить</base-button>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { required, minLength } from 'vuelidate/lib/validators'


import BaseInput from "@/components/base/BaseInput";
import BaseTextArea from "@/components/base/BaseTextArea";
import BaseSelect from "@/components/base/BaseSelect";
import BaseRadioButton from "@/components/base/BaseRadioButton";
import Slide from "../../../../../../components/transitions/Slide";
import {Dictionary} from "@/store/dictionary";

export default {
  name: "main",

  components: {Slide, BaseRadioButton, BaseSelect, BaseTextArea, BaseInput},

  computed: {
    ...mapGetters({
      profile: "auth/getProfile",
      mainInfo: "hotel/info/getMainInfo",
      countries: "hotel/regions/getCountries",
      cities: "hotel/regions/getCities"
    }),
    id() {
      return this.$route.params.id
    },
    hotelStars() {
      let options = [];
      for (let i=1; i<=5; i++)
        options.push({id: i, value: i});

      return options;
    },
  },

  data: () => ({
    Dictionary,
    loading: true,
    form: {
      company_name: null,
      description: null,
      stars: null,
      contact_person: null,
      contact_number: null,
      alt_contact_number: null,
      address: {
        address: null,
        address2: null,
        city: null,
        country: null,
        countryId: null,
        city_name: null,
        country_name: null,
        post_index: null,
        name: null,
        is_manager: null
      },
      title: null,
      is_manager: null
    },
  }),
  validations: {
    form: {
      company_name: { required },
      description: { required },
      stars: { required },
      contact_person: { required },
      contact_number: { required },
      // alt_contact_number: { required },
      title: { required },
      address: {
        address: { required },
        address2: { required },
        city: {required},
        country: {required},
        // city_name: {required},
        // country_name:{required},
        post_index: {required},
        name: { required },
        is_manager: { required },
        // countryId: { required }
      },
      is_manager : { required }
    }
    // selectedHotelStar: null
  },
  methods: {
    ...mapActions({
      fetchMain: "hotel/info/fetchMain",
      changeMain: "hotel/info/changeMain",
      fetchCountries: "hotel/regions/fetchCountries",
      fetchCities: "hotel/regions/fetchCities"
    }),
    async getMainInfo() {
      this.loading = true;
      await this.fetchMain({id:this.id});
      this.form = JSON.parse(JSON.stringify(this.mainInfo));
      this.loading = false;
    },
    async next() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        alert("Заполните все поля");
        console.log(this.$v.form);
        console.log(this.form);
        return;
      }
      await this.changeMain({
        id: this.id,
        data: this.form,
        successCallback: () => {
          this.$router.push(`/my-business/edit/${this.id}/steps/convenience`)
        },
        errorCallback: () => {
          alert("Ошибка сохранения");
        }
      })
    },
    selectCountry({id, name}){
      this.form.address.countryId = id;
      this.form.address.country = name;
    },
    selectCity({id, name}){
      // this.form.address.city = id;
      this.form.address.city = name;
    },
    async selectStar(e){
      this.form.stars = e
    }
  },

  mounted() {
    this.getMainInfo();
    // this.fetchCountries()
    // this.fetchCities({id:1})
  }

}
</script>

<style scoped lang="scss">
.main{
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
    }
    &-radio{
      font-family: Inter;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: #111111;
      margin-top: 34px;
    }
  }

  &__actions {
    display: flex;
    flex-direction: row;

    &__back {
      margin-right: 10px;
    }
  }
  &__radio {
    display: flex;
    flex-direction: row;
    margin: 15px 0;
  }
}
</style>
