<template>
  <label class="input-wrapper">
    <inline-svg :src="$props.data.icon" v-if="$props.data"/>
    <input type="text"
           v-model="inputData"
           :placeholder="$props.placeholder || $props.data.placeholder"
           @change="$emit('dataChanged', inputData)"
           @input="$emit('dataChanged', inputData)"
    >
  </label>
</template>

<script>

export default {
  components: {},
  props:{
    placeholder: null,
    data: {},
    inputDataProp: null
  },
  data () {
    return {
      inputData: null
    }
  },
  watch: {
    data: function () {
      this.inputData = this.$props.inputDataProp
    }
  },
  mounted() {
    this.inputData = this.$props.inputDataProp
  }
}

</script>

<style scoped>

</style>