<template>
  <div class="menu-items">
    <router-link :to="item.link" class="menu-items-item"
         v-for="item of adminMenu"
                 active-class="active"
                 v-show="userStore.role === 'admin'"
                 @click="$emit('close', true)"
    >
      <inline-svg :src="item.icon" class="categoryIcon" />
      {{ item.name }}
    </router-link>
  </div>
</template>
<script>
import {userStore} from "@/Stores/userStore.js";

export default {
  name: 'AdminMenu',
  components: {

  },

  props: {
    adminMenu: {}
  },

  data() {
    return {
      userStore
    }
  }

}
</script>
<style lang="scss" scoped >
.menu-items {
  max-width: fit-content;
  width: 220px;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  gap: 10px;

  .menu-items-item {
    transition: .3s ease;
    color: #B3B4C9;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      color: #191B2A;
    }
  }
}
</style>
