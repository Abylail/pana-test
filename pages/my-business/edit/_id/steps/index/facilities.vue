<template>
  <div class="facilities">
    <div class="facilities__wrapper">

      <div class="facilities__description">
        <h1 class="facilities__title">Удобства и услуги</h1>
        <span>Укажите общую информацию о своем объекте (например, удобства, интернет, парковка и языки, на которых говорит ваш персонал).</span>
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Парковка</div>
        <p class="facilities__under-title">Гостям предоставляется парковка?</p>
        <div class="facilities__parking">
          <base-select
            v-model="form.parking.choice"
            placeholder="Тип парковки"
            :options="parkingChoice"
            label="name"
          />
          <base-select
            v-model="form.parking.type"
            placeholder="Выберите услугу"
            :options="parkingType"
          />
          <base-select
            v-model="form.parking.location"
            placeholder="Выберите услугу"
            :options="parkingLocation"
          />
        </div>
        <Slide
          v-if="form.parking.choice == 2"
        >
          <BaseInput
            :title="'Цена за парковочное место в KZT (тенге)'"
            :placeholder="'19 234 тг'"
            v-model="form.parking.price"
          />
        </Slide>
        <p class="facilities__card-description">Эта информация особенно важна тем, кто путешествует на автомобиле.</p>
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Завтрак</div>
        <div class="facilities__under-title">Для гостей сервируется завтрак?</div>
        <base-select
          v-model="form.breakfast"
          :options="breakfastType"
          fullInput
        />
        <Slide
          v-if="form.breakfast.id == 2"
        >
          <BaseInput
            :title="'Цена за завтрак в тенге (KZT) (с человека в сутки с учетом всех налогов и сборов)'"
            :placeholder="'19 234 тг'"
            v-model="form.breakfast_price"
          />
        </Slide>
        <div class="facilities__under-title">Завтрак какого типы вы подаете?</div>
        <base-select
          v-model="form.breakfast_type"
          :dictionary="Dictionary.breakfasts"
          fullInput
        />
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Языки</div>
        <p class="facilities__card-description">На каких языках говорят у вас в заведении?</p>
        <BaseSelect
          :options="languages"
          @input="selectLanguage"
        />
      </div>

      <div class="facilities__card">
        <div class="facilities__title">Удобства</div>
        <p class="facilities__under-title">Какие удобства есть в вашем заведении? </p>

        <div class="facilities__checkboxes">
          <base-confirm
            :value="haveConveniences(service)"
            v-for="(service, index) in facilityServices" :key="index"
            black-text
            @input="toggleConveniences(service)"
          >{{ service.name }}</base-confirm>
        </div>

<!--        <div class="facilities__services">-->
<!--          <div-->
<!--            class="facilities__service"-->
<!--            v-for="(convenience, index) in form.conveniences" :key="index"-->
<!--          >-->
<!--            <div class="facilities__service__head">-->
<!--              <div class="facilities__service__title">{{ convenience.service_name }}</div>-->
<!--              <photo-upload @input="addImageConveniences(index, $event)"/>-->
<!--            </div>-->
<!--            <base-text-area-->
<!--              v-model="convenience.description"-->
<!--              placeholder="Описание"-->
<!--            />-->
<!--            <photo-list v-model="convenience.images"/>-->
<!--          </div>-->
<!--        </div>-->
      </div>

      <div class="facilities__actions">
        <base-button variant="cancel"><- Назад</base-button>
        <base-button variant="next" @click="next">Продолжить</base-button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseSelect from "@/components/base/BaseSelect";
import BaseConfirm from "../../../../../../components/base/BaseConfirm";
import {mapActions, mapGetters} from "vuex";
import {Dictionary} from "@/store/dictionary";
import BaseTextArea from "../../../../../../components/base/BaseTextArea";
import BaseButton from "../../../../../../components/base/BaseButton";
import BaseIcon from "../../../../../../components/base/BaseIcon";
import PhotoUpload from "../../../../../../components/common/photo/photoUpload";
import PhotoList from "../../../../../../components/common/photo/photoList";
import BaseInput from "@/components/base/BaseInput";
import Slide from "@/components/transitions/Slide";

export default {
  components: {Slide, BaseInput, PhotoList, PhotoUpload, BaseIcon, BaseButton, BaseTextArea, BaseConfirm, BaseSelect},
  data: () => ({
    Dictionary,
    loading: true,
    breakfastType: [
      {id: 1, name: "Да, это включено в стоимость"},
      {id: 2, name: "Да, по запросу"}
    ],
    parkingChoice: [
      {id:1, name:"Бесплатная"},
      {id:2, name:"Платная"},
    ],
    parkingType: [
      {id: 1, name: "Общественная"},
      {id: 2, name: "Частная"}
    ],
    parkingLocation: [
      {id: 1, name: "За пределами територии"},
      {id: 2, name: "Внутри територи"}
    ],

    form: {
      parking: {
        description: null,
        choice: null,
        type: null,
        location: null,
        price: null
      },
      breakfast:{
        id: null,
        name:null
      },
      breakfast_price: null,
      breakfast_type:{
        id:null,
        name:null
      },
      languages:[],
      conveniences:[3,4,5]
    },
  }),
  computed: {
    ...mapGetters({
      convenience: "hotel/info/getConvenience",
      dictionaries: "dictionary/getDictionaries",
      languages: "hotel/language/getLanguages",
      facilityServices:"hotel/services/getServicesFacility"
    }),
    services() {
      return this.dictionaries.services || [];
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    ...mapActions({
      fetchConvenience: "hotel/info/fetchConvenience",
      fetchDict: "dictionary/fetchDict",
      addConvenience: "hotel/info/addConveniences"
    }),
    async getInfo() {
      this.loading = true;
      await this.fetchConvenience({id: this.id});
      // this.form = JSON.parse(JSON.stringify(this.convenience));
      this.loading = false;
    },
   async next() {
      await this.addConvenience({id:this.id,data:this.form})

    },
    async fetchServices() {
      await this.fetchDict({dictionary: Dictionary.services});
    },
    toggleConveniences(service) {
      if (!this.haveConveniences(service)) {
        this.addConveniences(service);
      }
      else {
        this.removeConveniences(service);
      }
    },
    addConveniences(service) {
      this.form.conveniences.push({
        description: "",
        images: [],
        service: service.id,
        service_name: service.name,
        convenience: null
      })
    },
    removeConveniences(service) {
      let list = this.form.conveniences.slice();
      const index = list.findIndex(convenience => convenience.service === service.id)
      if (index > -1) list.splice(index, 1);
      this.form.conveniences = list;
    },
    addImageConveniences(index, image) {
      console.log(index, image);
      console.log(typeof image);
      let form = new FormData();
      form.append("image", image);
      this.$api.hotel.image.post({
        body: form
      });
    },
    haveConveniences(service) {
      return this.form.conveniences
        .some(convenience => convenience.service === service.id);
    },
    selectLanguage(e){
      this.form.languages.push(e)
    }
  },
  created() {
    this.fetchServices();
    this.getInfo();
    this.$store.dispatch("hotel/language/fetchLanguages")
    this.$store.dispatch("hotel/services/fetchServicesFacility")
  }
}
</script>

<style scoped lang="scss">
.facilities{
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

    &-description{
      font-family: Inter;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 150%;
      color: #797979;
    }
  }
  //&__text {
  //  font-size: $fs__default;
  //  color: $color__font-secondary;
  //}
  &__under-title{
    font-family: Inter;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 150%;
    color: #000000;
    margin-bottom: 12px;
  }

  &__parking{
    display: grid;
    grid-template-columns: 4fr 2fr 3fr;
    grid-gap: 10px;
    @media(max-width: $break-point__mobile) {
      display: flex;
      flex-direction: column;
    }
  }

  &__checkboxes {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 16px;
    * {margin: 0 12px 8px 0;}
    @media(max-width: $break-point__mobile) {
      display: flex;
      flex-wrap: wrap;
      * {background: $color__background-primary;}
      ::v-deep{.base-confirm {
        padding: 8px 12px;
        &__tick {background: white;}
      }}
    }
  }

  &__services {
    margin-top: 50px;
  }

  &__service {
    margin-bottom: 32px;

    &__head {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    &__title {
      font-size: $fs__default;
      font-weight: bold;
    }

    &__add-image {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      color: $color__font-link;
      &:hover {opacity: .8}
      &:active {opacity: .6}
    }

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
