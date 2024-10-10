<template>
  <div class="empty-store">
    <h3>
      <slot name="header"/>
    </h3>
    <span>
      <slot name="text"/>
    </span>

    <div class="button-wrapper">
      <button-black
          v-show="$props.showButton"
          @buttonPressed="$emit('buttonPressed', true)"
          :style="'filled'">
        <template #default>
          <slot name="buttonText" />
        </template>
      </button-black>
    </div>
    



    <div class="bg-icons">
      <div class="left">
        <slot name="left-icon" />

      </div>
      <div class="right">
        <slot name="right-icon" />
      </div>

    </div>


  </div>
</template>

<script>
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {userStore} from "@/Stores/userStore.js";


export default {
  name: "EmptyStore.vue",
  props: {
    showButton: false,
    showButtonForUsers: true,
    showButtonForUnauthorised: false,
    hideReviewButton: false

  },
  data() {
    return {
      userStore
    }
  },

  components: {
    ButtonBlack
  },

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.empty-store {
  width: 100%;
  text-align: center;
  box-sizing: border-box;

  border-radius: 10px;
  background: #FFF;
  border: 1px dashed #D8D8D8;
  padding: 25px;
  position: relative;
  z-index: 1;

  h3 {
    width: 100%;
    color: #C9C9C9;

    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-bottom: 0px;
  }

  .button-wrapper {
    width: 20%;
    margin: 12px auto 0;

  }
  span {
    color: #000;
    font-size: 16px;
    font-style: normal;
    word-break: break-word;
    font-weight: 700;
    line-height: normal;
  }

  .bg-icons {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: -4px;
    z-index: -1;
    overflow: hidden;

    display: flex;
    align-items: end;
    padding: 0;
    .left {
      position: absolute;
      left: 0;
      bottom: 0;
    }
    .right {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}

@media screen and (max-width: 768px) {
  .empty-store .button-wrapper {
    width: 50%;
  }
  .empty-store {
    h3 {
      font-size: 12px!important;
    }
    span {
      font-size: 13px;
    }
  }
}
</style>