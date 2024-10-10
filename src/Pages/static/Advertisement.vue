<template>
  <div>
    <h1>Реклама</h1>

    <a href="https://t.me/mxBaza" class="image-link" target="_blank">
      <img :src="image" alt="">
    </a>


    <a href="https://t.me/mxBaza" class="link-btn" target="_blank">

      Реклама на проекте BAZA
    </a>
  </div>

</template>

<script>
import image from '@/assets/pages-images/ads.png'
export default {
  name: "AdvertisementView.vue",
  data () {
    return {
      image
    }
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 30px;
}
.image-link {
  transition: .3s ease;
  width: 100%;
  display: block;
  img {
    transition: .3s ease;
  }

  &:hover {
    img {
      transform: scale(1.02);
    }
  }
}
.btn {
  padding: 10px;
  font-weight: 600;
  max-width: 300px;
}
img {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}

</style>