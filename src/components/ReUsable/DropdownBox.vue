<template>
  <div class="dropdown" ref="dropdown">
    <slot />
  </div>
</template>

<script>
export default {
  name: "DropdownBox.vue",
  props: {
    selector: null,
  },
  data() {
    return {}
  },

  components: {},

  methods: {
    clickOutside(e) {

      if (this.$refs.dropdown !== undefined && !this.$refs.dropdown.contains(e.target) && e.target.dataset.dropdown !== this.$props.selector) {
        this.closeDropDown()
      }
    },

    closeByEsc(e) {
      if (e.key === 'Escape') {
        this.$emit('closeDropdown', true)
        removeEventListener('keydown', this.closeByEsc)
      }
    },
    closeDropDown() {
      this.$emit('closeDropdown', true)
      removeEventListener('mousedown', this.clickOutside)
    }
  },

  created() {
    addEventListener('mousedown', this.clickOutside)
    addEventListener('keydown', this.closeByEsc)
  },
  unmounted() {
    removeEventListener('mousedown', this.clickOutside)
    removeEventListener('keydown', this.closeByEsc)
  }

}
</script>

<style scoped lang="scss">
.dropdown {
  position: absolute;
  box-sizing: border-box;
  right: 10px;
  top: 45px;
  min-width: 180px;
  width: fit-content;
  background-color: #FFFFFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  padding: 10px;
  border-radius: 20px;
  z-index: 15;
  max-height: 600px;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: border-box;



}

@media screen and (max-width: 500px){
  .dropdown {
    right: 0;
    min-width: 80px;
    max-width: 220px;
  }
}

</style>