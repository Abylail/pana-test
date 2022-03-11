<template>
  <div class="photo-upload">
    <label :for="type" class="custom-file-upload"> Добавить фото</label>
    <input
      type="file"
      :name="type"
      :id="type"
      ref="files"
      accept="image/*"
      multiple
      @change="handleFilesUpload"
    />
    <img src="@/static/icons/plus-circle.svg" alt="" />
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  props: {
    type: {
      type: String,
      default: "photosOfTheObject",
    },
  },

  data: () => ({
    files: [],
    imagePreview: [],
  }),

  computed: {
    ...mapGetters({
      images:"photoUpload/getphotosOfTheRoom"
    }),
    id(){
      return this.$route.params.id
    }
  },
  methods: {
     handleFilesUpload() {
      this.files = [];
      let uploadedFiles = this.$refs.files.files;
      for (var i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      this.getImagePreviews();
      this.fetchImages({id:this.id})
    },

    ...mapActions({
      sendImages:"hotel/info/sendImages",
      fetchImages:"hotel/info/fetchImages"
    }),

     getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          let reader = new FileReader();
          reader.addEventListener(
            "load",
            function () {
              const image = reader.result
              this.$store.commit(`photoUpload/addingPhotos`, {
                image,
                type: this.type,
              });
              this.sendImages({
                id: this.id,
                data: this.images
              }
              )
            }.bind(this),
            false
          );
          reader.readAsDataURL(this.files[i]);
        }
      }
       // this.fetchImages({id:this.id})

    },
  },
};
</script>

<style lang="scss" scoped>
.photo-upload {
  display: flex;
  flex-direction: row;
  input{
    display: none;
  }
  label {
    margin-right: 10px;
    color: #5684fb;
    cursor: pointer;
  }
}
</style>
