<template>
  <div class="photos" :style="{ 'margin-top': mt + 'px' }" v-if="images && images.images.length">
    <div class="photo-wrp" v-for="(img, index) in images.images" :key="index">
      <img class="photo" :src="`http://45.136.56.44:8001/media/${img.image}`" alt="" />
      <span class="photo-delete" @click="removeImg(img.id)">
        <img src="@/static/icons/delete.svg" alt="" />
      </span>
    </div>
  </div>
  <div v-else :style="{ 'margin-top': mt + 'px' }">
    <p class="text --title">Нет фотографии</p>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    type: {
      type: String,
      default: () => "photosOfTheObject",
    },
    mt: {
      type: String,
      default: 0,
    },
  },

  computed: {
    // photos() {
    //   return this.$store.getters[`photoUpload/get${this.type}`];
    // },
    ...mapGetters({
      images:"hotel/info/getImages"
    }),
    id(){
      return this.$route.params.id
    }
  },

  methods: {
    // deletePhoto(index) {
    //   this.$store.commit("photoUpload/deletePhoto", { index, type: this.type });
    // },
    ...mapActions({
      deleteImage:"hotel/info/deleteImage"
    }),
    async removeImg(e){
      await this.deleteImage({id:this.id,image_id:e})
      await this.$store.dispatch("hotel/info/fetchImages", {id: this.id})
    }
  },
};
</script>

<style lang="scss" scoped>
.photos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  .photo-wrp {
    position: relative;
    .photo {
      border-radius: 12px;
      width: 165px;
      height: 113px;
      //background: linear-gradient(15.42deg, #000000 -51.64%, rgba(0, 0, 0, 0.08) 59.54%), url(.png);
    }
    .photo-delete {
      position: absolute;
      right: 10px;
      top: 10px;
      cursor: pointer;
    }
  }
}
</style>
