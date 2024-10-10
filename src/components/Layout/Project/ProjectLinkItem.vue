<template>
  <a v-if="$props.data" class="link"
     :class="{
        yellow: $props.data.name === 'Зеркало',
        green: $props.data.name === 'Зеркало VPN',
        red: $props.data.name === 'Контакты',
        blue: $props.data.name === 'Канал' || $props.data.name === 'Бот',
        violet: $props.data.name === 'Onion',
        purple: $props.data.name === 'Блокчейн' || $props.data.name === 'Blockchain',
     }"
     :href="projectLink()"
     target="_blank">
    {{ normalizeLinkName($props.data.name) }}
  </a>
</template>

<script>
export default {
  name: "ProjectLinkItem.vue",
  props: {
    data: {
      name: null,
      link: null
    }
  },
  methods: {
    normalizeLinkName(text) {
      const pattern = /^(http|https)/;
      return text
    },
    projectLink() {
      return this.$props.data.link
    }

  },

  mounted() {

  }
}
</script>

<style scoped lang="scss">

.link {
  border-radius: 12px;
  background: #F2F5F7;
  padding: 4px 8px;
  white-space: nowrap;
  color: #1E1E1E;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  transition: .3s ease;

  &.yellow { background-color: #FFF3D4FF}
  &.green { background-color: #EBFDC8FF}
  &.red { background-color: #FFD5D5FF}
  &.blue { background-color: #C1EBFFFF}
  &.violet { background-color: #E9D9FFFF}
  &.purple { background-color: #ffcee5
  }

  &:hover {
    &.yellow { background-color: #ffe4a1
    }
    &.green { background-color: #deff98
    }
    &.red { background-color: #ff8e8e
    }
    &.blue { background-color: #7fd7ff
    }
    &.violet { background-color: #b883ff
    }
    &.purple { background-color: #fc91b4
    }
  }
}

@media screen and (max-width: 500px){
  .link {
    font-size: 10px;
  }
}

</style>