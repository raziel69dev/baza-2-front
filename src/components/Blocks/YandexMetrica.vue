<template>
  <div v-html="ymetrika">

  </div>
</template>

<script>
import {ymetrika} from "@/js/ymetrika.js";

export default {
  name: "YandexMetrica.vue",
  data() {
    return {
      ymetrika
    }
  },

  components: {},

  methods: {
    setMetrica() {

    }
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">

</style>