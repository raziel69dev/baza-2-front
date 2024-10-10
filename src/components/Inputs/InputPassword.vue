<template>
  <label class="input-wrapper"
         :class="{active: active || inputData}"
         @focus="active = true"
  >

    <InlineSvg :src="data.icon" />
    <input type="password"
           :name="data.name"
           autocomplete
           :placeholder="data.placeholder"
           v-model="inputData"
           @input="$emit('passwordData', inputData)"
    >
  </label>
</template>

<script>
import {ref} from "vue";
import InlineSvg from 'vue-inline-svg';

export default {
  name: 'InputPassword.vue',
  components: {
    InlineSvg
  },

  props:{
    data: {

    }
  },
  data () {
    return {
      inputData: ref(''),
      active: false
    }
  }
}
</script>

<style scoped>

</style>