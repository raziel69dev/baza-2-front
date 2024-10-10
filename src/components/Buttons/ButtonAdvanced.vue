<template>
  <button class="button secondary" :disabled="props.disabled" @click="$emit('buttonPressed', true)">
    <slot />
  </button>
</template>

<script setup>
  import {watch} from "vue";

  const props = defineProps({
    disabled: false
  })

  watch(() => props.disabled, (e) => {

  })

</script>

<style scoped lang="scss">
.button {
  background: #7773FB;
  border: 1px solid transparent;
  box-sizing: border-box;
  color: #ffffff;

  &:disabled {
    opacity: .5;
  }

}
</style>