<template>
  <div class="image">
    <img :src="api.url + image"
         v-show="loading.success"
         @load="whenImageLoaded()"
         @error="whenImageLoadError()"
         alt="Ошибка загрузки изображения">

    <img :src="LoadingErrorImage"
         v-if="loading.error"
         alt="">

    <TheLoader v-if="!loading.success && !loading.error" />
  </div>
</template>

<script>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {api} from "@/API/apiurl.js";
import LoadingErrorImage from "@/assets/images/error.png"
export default {

  name: "TheImage.vue",
  props: {
    image: null
  },
  data() {
    return {
      api,
      LoadingErrorImage,
      loading: {
        success: false,
        error: false
      }
    }
  },

  components: {
    TheLoader
  },
  methods: {
    whenImageLoaded() {
      this.loading.success = true
      this.loading.error = false
      this.$emit('ImageStatusChanged', false)
    },
    whenImageLoadError() {
      this.loading.success = false
      this.loading.error = true
      this.$emit('ImageStatusChanged', true)
    }
  }

}
</script>

<style scoped lang="scss">
.image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;

  img {
    height: 100%;
    border-radius: 10px;
  }
}
</style>