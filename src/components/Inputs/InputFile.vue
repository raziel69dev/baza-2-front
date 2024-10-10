<template>
  <div class="image-input">
    <div class="image-upload" v-if="!imageFilePath && !loading">
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.66797 4.24984C4.88557 4.24984 4.2513 4.88411 4.2513 5.6665V28.3332C4.2513 29.1156 4.88557 29.7498 5.66797 29.7498H28.3346C29.1171 29.7498 29.7513 29.1156 29.7513 28.3332V21.9582H32.5846V28.3332C32.5846 30.6804 30.6819 32.5832 28.3346 32.5832H5.66797C3.32076 32.5832 1.41797 30.6804 1.41797 28.3332V5.6665C1.41797 3.3193 3.32076 1.4165 5.66797 1.4165H12.043V4.24984H5.66797Z" fill="#B3B4C9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0959 21.4978C11.4555 19.4788 8.40249 19.394 6.65264 21.3189L1.78639 26.6717C1.31806 27.187 1.29348 27.966 1.7284 28.5097L4.56174 32.0514C4.83059 32.3874 5.23761 32.5831 5.66797 32.5831H19.1263C19.6729 32.5831 20.1705 32.2687 20.4054 31.7753C20.6403 31.2817 20.5705 30.6972 20.2258 30.2731L13.0959 21.4978Z" fill="#B3B4C9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.2524 24.9556C24.6701 23.3737 22.1323 23.2891 20.4485 24.7626L16.7768 27.9753C16.2917 28.3998 16.1543 29.0984 16.4426 29.675L17.1509 31.0917C17.3909 31.5716 17.8815 31.8748 18.418 31.8748H29.7513C30.3244 31.8748 30.8409 31.5297 31.0602 31.0003C31.2795 30.4709 31.1582 29.8616 30.753 29.4564L26.2524 24.9556Z" fill="#B3B4C9"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.9609 1.4165C16.093 1.4165 11.3359 6.17347 11.3359 12.0415C11.3359 17.9095 16.093 22.6665 21.9609 22.6665C27.8289 22.6665 32.5859 17.9095 32.5859 12.0415C32.5859 6.17347 27.8289 1.4165 21.9609 1.4165ZM20.5443 9.79497V16.2915H23.3776V9.79497L25.2092 11.6266L27.2127 9.6231L22.9627 5.3731C22.4095 4.81986 21.5124 4.81986 20.9592 5.3731L16.7092 9.6231L18.7127 11.6266L20.5443 9.79497Z" fill="#B3B4C9"/>
      </svg>
      <p>
        <slot />
      </p>

      <input type="file" @change="uploadImage">
    </div>
    <the-loader v-else-if="loading"/>
    <div class="uploaded-image" v-else-if="imageFilePath && !loading">
      <img :src="api.url + imageFilePath" alt="">
      <div class="delete-icon" @click="emptyImage()">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M16 6V5.2C16 4.0799 16 3.51984 15.782 3.09202C15.5903 2.71569 15.2843 2.40973 14.908 2.21799C14.4802 2 13.9201 2 12.8 2H11.2C10.0799 2 9.51984 2 9.09202 2.21799C8.71569 2.40973 8.40973 2.71569 8.21799 3.09202C8 3.51984 8 4.0799 8 5.2V6M10 11.5V16.5M14 11.5V16.5M3 6H21M19 6V17.2C19 18.8802 19 19.7202 18.673 20.362C18.3854 20.9265 17.9265 21.3854 17.362 21.673C16.7202 22 15.8802 22 14.2 22H9.8C8.11984 22 7.27976 22 6.63803 21.673C6.07354 21.3854 5.6146 20.9265 5.32698 20.362C5 19.7202 5 18.8802 5 17.2V6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>

import {uploadImage} from "@/API/imageUploader.js";
import {api} from "@/API/apiurl.js";
import {addNotice} from "@/js/notifications.js";
import TheLoader from "@/components/ReUsable/TheLoader.vue";

export default {
  name: "InputText.vue",
  props: {
    data: null
  },
  data() {
    return {
      imageFilePath: null,
      api,
      loading: false
    }
  },
  components: {
    TheLoader
  },

  methods: {
    uploadImage(e) {
      this.loading = true
      if(e.target.files[0].type.includes('image/')) {
        uploadImage(e.target.files[0]).then(result => {
          this.imageFilePath = result.data.filePath
          this.loading = false
          this.$emit('dataChanged', this.imageFilePath)
        }).catch(error => this.loading = false)
      } else {
        addNotice({name: 'Не поддерживаемый формат изображения', type: 'warning'})
        this.loading = false
      }
    },
    emptyImage() {
      this.imageFilePath = null
      this.$emit('dataChanged', null)
    }
  },
  watch: {
    data: function () {
      this.imageFilePath = this.$props.data
    }
  },
  mounted() {
    this.imageFilePath = this.$props.data
  }

}
</script>

<style scoped lang="scss">
.image-input {
  border-radius: 20px;
  border: 1px dashed #B3B4C9;
  background: #F8F7FC;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  min-height: 80px;
  height: 100%;
  position: relative;

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}
.image-upload {
  padding: 20px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  justify-content: center;



  svg {

  }
  p {
    color: #B3B4C9;
    text-align: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
.uploaded-image {
  width: 100%;
  position: relative;

  img {
    width: 100%;
    border-radius: 25px;
  }

  .delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #FFFFFF;
    border-radius: 20px;
    padding: 2px 6px;
    box-sizing: border-box;
    width: 35px;
    height: 35px;

    svg {
      width: 100%;
      height: 100%;


    }
  }
}

</style>