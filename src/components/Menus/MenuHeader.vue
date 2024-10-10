<template>
  <nav class="items">
    <ul>
      <li v-for="item of menuItems">
        <router-link :to="item.href" :class="item.color">
          <inline-svg class="menuIcon" v-if="item.icon" :src="item.icon" />
          <span>{{ item.name }}</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {menuItems} from "@/Stores/menuItems.js";

export default {
  name: "MenuHeader.vue",
  data() {
    return {
      menuItems
    }
  },

  components: {},

  methods: {},

  mounted() {

  }

}
</script>

<style scoped lang="scss">

.items {
  padding: 0 30px;
  box-sizing: border-box;
  ul {
    list-style: none;
    padding-left: 0;
    display: flex;
    gap: 20px;
    margin-top: 5px;

    li {
      a {
        color: #191B2A;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        display: flex;
        gap: 5px;
        align-items: center;
        transition: .3s ease;
        border-bottom: 2px solid transparent;
        padding-bottom: 5px;

        svg {
          width: 16px;
          height: 16px;


          path {
            stroke: #6B6B6B;
          }
        }

        &.router-link-active {
          border-bottom-color: #FFC700;
        }
      }
    }
  }
}

</style>