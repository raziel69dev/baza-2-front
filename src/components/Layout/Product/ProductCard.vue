<template>
  <div class="service-card" :class="{highlighted: $props.highlighted}">
    <div class="service-card_image">
      <img :src="api.url + $props.item.avatarFilePath"
           alt="name"
           v-show="imgLoaded && !errorImageLoad"
           @error="() => {
             this.imgLoaded = true
             this.errorImageLoad = true
           }"
           @load="imgLoaded = true">
      <img src="/src/assets/images/error.png"
           v-show="imgLoaded && errorImageLoad"
           alt="sorry"
           @load="imgLoaded = true">
<!--      <loader-small v-if="!imgLoaded" />-->
    </div>
    <div class="service-card_text">
      {{ normalizeText($props.item.name) }}
    </div>

  </div>
</template>

<script>
import { ref, watch } from "vue";
import {api} from "@/API/apiurl.js";
import {productsStore} from "@/Stores/productsStore.js";

export default {
  name: "ServicesCard.vue",
  props: {
    item: {
      projectId: ref(Number) ,
      UserId: ref(Number),
      avatarFilePath: ref(String),
      createdAt: ref(Date),
      updatedAt: ref(Date),
      description: ref(String),
      id: ref(Number),
      name: ref(String),

    },
    highlighted: ref(Boolean)
  },
  components: {

  },

  data() {
    return {
      errorImageLoad: false,
      imgLoaded: false,
      text: null,
      api,
      productsStore
    }
  },
  mounted() {

  },
  watch: {
    item: function(newVal, oldVal) {

    }
  },
  methods: {
    normalizeText(text) {
      if (text) {
        return text
      }
    }
  }
}
</script>

<style scoped lang="scss">
.service-card {
  box-sizing: border-box;
  width: 100%;
  cursor: pointer;
  border-radius: 20px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  padding: 14px;

  &.highlighted {
    background: #fff7d6;
  }

  .service-card_image {

    aspect-ratio: 1/1;
    border-radius: 10px;
    height: 100%;
    overflow: hidden;
    margin-bottom: 10px;
    background: #fff 50% / cover no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;



    img {
      height: 100%;
      position: relative;
      scale: 1;
      transition: .15s ease;
    }


  }
  .service-card_text {
    -webkit-line-clamp: 2;
    position: relative;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #191B2A;
    height: 35px;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    text-overflow: ellipsis;
    display: -moz-box;
    -moz-box-orient: vertical;
    display: -webkit-box;
    line-clamp: 3;
  }

  &:hover {
    .service-card_image {
      img {
        scale: 1.05;
      }
    }
  }

}

@media screen and (max-width: 768px){
  .service-card {
    width: 100%;
  }
}
</style>