<script setup>
import {popup} from "@/js/controllers/popupController.js";
import {defineAsyncComponent, reactive} from "vue";
import {notifications} from "@/js/notifications.js";
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { RouterView } from 'vue-router'

const ThePopup = defineAsyncComponent({
  loader: () => import("@/components/popups/ThePopup.vue"),
  delay: 200,
  timeout: 10000
})

const BaseHeader = defineAsyncComponent({
  loader: () => import("@/components/Layout/TemplateParts/BaseHeader.vue"),
})

const BaseFooter = defineAsyncComponent({
  loader: () => import("@/components/Layout/TemplateParts/BaseFooter.vue"),
})

const TheNotifications = defineAsyncComponent({
  loader: () => import("@/components/Blocks/TheNotifications.vue"),
})

const PayedBanners = defineAsyncComponent({
  loader: () => import("@/components/Blocks/PayedBanners.vue"),
})

const YandexMetrica = defineAsyncComponent({
  loader: () => import("@/components/Blocks/YandexMetrica.vue"),
})

import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()

let scrollTopButton = reactive({show: false})

function scrollToTop() {
  document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
}

function handleScroll() {
  window.scrollY > 200 ? scrollTopButton.show = true : scrollTopButton.show = false
}
window.addEventListener('scroll', handleScroll);

</script>

<template>
  <base-layout>
    <template #header>
      <base-header />
      <payed-banners />
    </template>

    <template #main>
      <RouterView />
    </template>

    <template #footer>
      <base-footer />
    </template>

  </base-layout>

  <ThePopup v-if="popup.show" />

  <yandex-metrica />

  <TheNotifications v-if="notifications.length > 0" />

  <div class="scroll-to-top-wrapper">
    <div class="scroll-to-top" v-show="scrollTopButton.show" ref="scrollToTop" @click="scrollToTop">
      <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7L7 1L1 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>

</template>

<style scoped lang="scss">
.scroll-to-top-wrapper {
  max-width: 1250px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  height: 0;
  right: 0;
  left: 0;
  z-index: 30;
  position: fixed;
  bottom: 80px;
  display: flex;
  justify-content: end;
}

.scroll-to-top {
  box-sizing: border-box;
  transition: .3s ease;
  border: 1px solid black;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;



  svg {
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    width: 15px;
    height: 15px;
    position: relative;
    left: 3px;
    top: 2px;

    path {
      stroke: black;
      background-color: #FFC700;
      border-radius: 20px;
    }
  }

}
</style>
