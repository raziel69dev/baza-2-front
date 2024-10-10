<template>
  <label class="input-wrapper"
         @click="dropdown.show = !dropdown.show"
         data-dropdown="selectOptions"
         :class="{active: active || inputData}"
         @focus="active = true"
  >

    <inline-svg :src="data.icon" />
    <span class="name" v-if="selected">
      {{ selected.name }}
    </span>

    <span class="name" v-if="!selected">
      {{ $props.data.name }}
    </span>
<!--    <input type="text"-->
<!--           :name="data.name"-->
<!--           autocomplete-->
<!--           :placeholder="data.placeholder"-->
<!--           v-model="inputData"-->
<!--           @input="$emit('textData', inputData)"-->
<!--    >-->
    <dropdownBox v-if="dropdown.show === true"
                 :selector="'selectOptions'"
                 @closeDropdown="dropdown.show = false"
    >
      <div class="colors">
        <div class="color" v-for="data of $props.data.data" @click="selectData(data)">
          {{ data.name }}
<!--          <svg data-v-c7770d1f="" width="18" height="13" viewBox="0 0 18 13" fill="none"-->
<!--               xmlns="http://www.w3.org/2000/svg">-->
<!--            <path data-v-c7770d1f="" d="M17 1L6 12L1 7" stroke="black" stroke-width="2" stroke-linecap="round"-->
<!--                  stroke-linejoin="round"></path>-->
<!--          </svg>-->
        </div>
      </div>
    </dropdownBox>
  </label>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import {ref} from "vue";
import dropdownBox from "@/components/ReUsable/DropdownBox.vue";

export default {
  name: 'InputSelectOption.vue',
  components: {
    InlineSvg,
    dropdownBox
  },

  props:{
    data: {

    }
  },
  data () {
    return {
      inputData: ref(''),
      active: false,
      dropdown: {
        show: false
      },

      selected: this.$props.data.data[0]
    }
  },
  methods: {
    selectData(data) {
      console.log(data)
      this.selected = data
      this.$emit('dataChanged', this.selected)
    }
  }

}
</script>

<style scoped lang="scss">
.input-wrapper {
  padding: 13px 10px;
  box-sizing: border-box;
  position: relative;

  span {
    color: #B3B4C9;
    font-size: 16px;
    font-style: normal;
  }
  .colors {
    max-width: 350px;

    .color {
      margin-bottom: 10px;
      display: flex;
      align-items: center;

      &.active {

      }
    }

  }
}
</style>