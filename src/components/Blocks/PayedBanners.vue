<template>
  <div class="banners" v-if="this.$route.path === '/'">
    <a class="payed-banner" href="https://Bitmafia.io" target="_blank">
      <video data-v-ca4db2f6="" autoplay="" loop="" playsinline="">
        <source data-v-ca4db2f6="" :src="banner2">
      </video>
    </a>
    <a class="payed-banner" href="https://t.me/kremlintop" target="_blank"><img data-v-ca4db2f6=""
                                                                                                   :src="banner1"
                                                                                                   alt=""></a>
  </div>
</template>

<script>
import banner1 from '@/assets/payed_banners/design_ads-C3hEbYrH.gif'
import banner2 from '@/assets/payed_banners/BitMafia x MixMafiaCROP-CXmqE8dO.webm'
export default {
  name: "PayedBanners.vue",
  data() {
    return {
      banner1,
      banner2
    }
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
}
.payed-banner {
  max-height: 165px;
  width: 100%;
  margin-bottom: 14px;
  position: relative;
  display: block;
  overflow: hidden;

  video, img {
    border-radius: 30px;
    height: 100%;
    width: 100%;
  }
}
</style>