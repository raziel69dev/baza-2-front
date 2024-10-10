<template>
  <div class="loader-wrapper">
    <span v-if="$props.text">{{ $props.text }}</span>
    <div class="loader">

      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 1.25V3.75M11 17V21M4.75 11H1.25M20.25 11H18.75M17.4571 17.4571L16.75 16.75M17.6642 4.41579L16.25 5.83M3.92157 18.0784L6.75 15.25M4.12868 4.20868L6.25 6.33" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

    </div>
  </div>
</template>

<script>
export default {
  name: "TheLoader.vue",
  props: {
    text: String
  },
  data() {
    return {
      active: true
    }
  }
}
</script>

<style scoped lang="scss">
.loader-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  span {
    color: #B3B4C9;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .loader {
    display: flex;
    align-items: center;
    justify-content: center;
    animation: 1.5s linear spin infinite;

    svg {
      max-width: 100%;
      max-height: 100%;
    }
  }
}


@keyframes spin {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}

</style>