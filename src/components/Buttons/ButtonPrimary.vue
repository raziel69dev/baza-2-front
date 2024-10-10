<template>
  <div style="width: 100%">
    <button class="button primary" :disabled="props.disabled" v-if="props.type === 'button'">
      <slot />
    </button>

    <a :href="props.link" class="button primary" v-else-if="props.type === 'link'" target="_blank">
      <slot />
    </a>

  </div>
</template>

<script setup>
  import {watch} from "vue";

  const props = defineProps({
    disabled: false,
    type: 'button',
    link: null
  })

  watch(() => props.disabled, (e) => {

  })

</script>

<style scoped lang="scss">
.button {
  background: #7773FB;
  box-sizing: border-box;

  &:disabled {
    opacity: .5;
  }

}
a {
  padding: 0 10px;
  width: 100%;
}
</style>