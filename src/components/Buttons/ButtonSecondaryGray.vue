<template>
  <button class="base-button"
          :class="$props.style"
          @click="$emit('pressed', false)"
  >
      <span>
        <slot></slot>
      </span>
  </button>
</template>

<script>

export default {
  name: "ButtonPrimary.vue",
  props: {
    style: 'outlined',
    username: 'USER'
  },

  data() {
    return {}
  },

  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">
.base-button {
  padding: 9px 13px;
  width: auto;
  max-width: 120px;
  text-overflow: clip;
  overflow: hidden;
  position: relative;
  z-index: 16;
  border-radius: 10px;
  background-color: transparent;
  border: 2px solid var(--gray-2, #D8D8D8);

  display: flex;
  align-items: center;
  justify-content: end;
  opacity: .8;
  gap: 10px;

  span {
    color: #A8A8A8;
    text-align: center;

    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    svg {
      position: absolute;
      right: 0;
    }
  }

  &:hover {
    border: 2px solid var(--gray, #A8A8A8);
    transform: translateY(-2px);
    box-shadow: 0px 3px 6px 0px rgba(39, 37, 37, 0.20);
  }

}
@media screen and (max-width: 500px){
  .base-button {
    gap: 5px;
    svg {

    }
  }
}

</style>