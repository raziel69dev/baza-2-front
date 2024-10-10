<template>
  <div class="loader">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 1.25V3.75M11 17V21M4.75 11H1.25M20.25 11H18.75M17.4571 17.4571L16.75 16.75M17.6642 4.41579L16.25 5.83M3.92157 18.0784L6.75 15.25M4.12868 4.20868L6.25 6.33" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>

  </div>
</template>

<script>
export default {
  name: "LoaderSmall.vue",
  data() {
    return {}
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.loader {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 3px;
  padding-bottom: 3px;

  svg {
    width: 35px;
    height: 35px;
    animation: spin 1.5s linear infinite;
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>