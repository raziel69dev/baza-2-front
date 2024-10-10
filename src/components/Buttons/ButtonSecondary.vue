<template>
  <button class="button secondary" :disabled="props.disabled">
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
  background-color: transparent;
  border: 1px solid var(--yellow, #B3B4C9);
  box-sizing: border-box;
  width: 100%;

  &:disabled {
    opacity: .5;
  }

}
</style>