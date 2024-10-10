<template>
  <label class="input-wrapper" style="height: 100%">
    <textarea
        v-model="inputData"
        :placeholder="$props.placeholder"
        @change="$emit('dataChanged', inputData)">
    </textarea>
  </label>

</template>

<script>

export default {
  name: "InputTextarea.vue",
  props: {
    placeholder: null,
    inputDataProp: null
  },
  data() {
    return {
      inputData: null,
    }
  },
  watch: {
    '$props.data': function () {
      this.inputData = this.$props.inputDataProp
    }
  },
  mounted() {

    this.inputData = this.$props.inputDataProp
  }

}
</script>

<style scoped lang="scss">

</style>