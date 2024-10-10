<template>
  <a class="button primary" @click="$emit('buttonPressed')" href="https://t.me/mxBaza" target="_blank">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'ButtonBlack.vue'
}

</script>

<style scoped lang="scss">
.button {
  background: #F8F7FC;
  color: #191B2A;
  box-sizing: border-box;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  height: auto;
  max-height: 50px;
  border-radius: 378.5px;
  border: 1px solid #B3B4C9;

  &:hover {
    color: #F8F7FC;
  }

  &:disabled {
    opacity: .5;
  }

}
</style>