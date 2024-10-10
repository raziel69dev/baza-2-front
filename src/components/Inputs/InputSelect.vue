<template>
  <label :for="$props.input.name">
    {{ $props.input.name }}
    <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" v-tippy="{content: $props.input.tooltip, theme: 'light'}" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </label>

  <select class="links-select"
         :class="{error: $props.error === true}"
         v-model="inputData"
         @change="checkField()"
         :id="$props.input.name"
         >
    <option v-for="category of linksCategories" selected>{{ category }}</option>
  </select>

</template>

<script>


export default {
  name: "InputText.vue",
  props: {
    input: {
      name: null,
      placeholder: null,
      tooltip: null,
      min: 0,
      max: 255,

    },

    error: null,
  },
  data() {
    return {
      inputData: null,
      checkInputData,
      error: false,
      linksCategories,
    }
  },

  watch: {
    data: function (newVal, oldVal) {
      this.setData()
    },
    error: function (newVal, oldVal) {

    },
    linksCategories: function (newVal, oldVal) {

    }

  },



  components: {},

  methods: {
    setData () {
      this.$props.input.data ? this.inputData = this.$props.input.data : null
    },
    checkField() {
      const checkData = checkInputData(this.$props.input.min, this.$props.input.max, this.inputData, this.$props.input.name)

      if (checkData === true) {
        this.error = false
        this.$emit('data', this.inputData)
      } else {
        this.error = true
        this.$emit('error', checkData)
      }
    }
  },

  mounted() {
    !this.inputData ? this.inputData = linksCategories[3] : null
    this.setData()

  }

}
</script>

<style scoped lang="scss">
label {
  color: #000;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 5px;
}

input {
  color: var(--gray-2, #000);

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #D8D8D8;
  }

  &.error {
    border-color: #9A2929;
  }
}
@media screen and (max-width: 1015px){
  .links-select {
    padding: 10px;
    font-size: 14px;
  }
}
@media screen and (max-width: 940px) {
  .links-select {
    width: 100%;
  }
}
</style>