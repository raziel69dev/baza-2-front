<template>
  <div class="notices">
    <div class="notices-wrapper" v-if="notifications.length > 0">
      <transition-group>
        <div v-for="notice of notifications" :key="notice.id">
          <div
              :style="notice.animate"
              @click="onRemoveNotice(notice.id)"
              class="notice"
              :class="notice.type"
              v-if="notice.name">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15V11M11 7H11.01M21 11C21 16.5228 16.5228 21 11 21C5.47715 21 1 16.5228 1 11C1 5.47715 5.47715 1 11 1C16.5228 1 21 5.47715 21 11Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            {{ notice.name }}
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script setup>
import {notifications, removeNotice} from "@/js/notifications.js";
import {defineAsyncComponent} from "vue";

function onRemoveNotice(id) {
  setTimeout(() => {
    removeNotice(id)
  }, 200)
}
</script>

<style scoped lang="scss">
.notices {
  position: fixed;
  left: 20px;
  bottom: 20px;
  z-index: 100;

  .notice {
    width: fit-content;
    margin-top: 10px;
    padding: 10px;
    box-sizing: border-box;
    color: #FFFFFF;
    background-color: #7c7c7c;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    border-radius: 20px;
    cursor: pointer;
    transition: .3s ease;
    animation: 5s ease slideUp;

    @keyframes slideUp {
      0% { transform: translateY(100px)}
      15% { transform: translateY(0px)}
      85% { transform: translateX(0px)}
      100% { transform: translateX(-1000px)}

    }
    .hide-notice {
      animation: .2s ease hideNotice;
    }

    @keyframes hideNotice {
      0% { transform: translateX(0px)}
      100% { transform: translateX(-1000px)}
    }


    svg {
      path {
        stroke: #FFFFFF;
      }
    }
    &.danger {
      background-color: #ce7474;
    }
    &.warning {
      background-color: #d5c278;
    }
    &.success {
      background-color: #85b470;
    }


  }
}

</style>