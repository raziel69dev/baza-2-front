<template>
  <div class="nav">
    <div class="links">
      <div class="nav_link"
           v-for="link of menuItems"
      >
<!--        <router-link-->
<!--                     :to="link.path"-->
<!--                     class="link">{{ link.name }}</router-link>-->
      </div>
    </div>



  </div>
</template>

<script>
import {menuItems} from "@/Stores/menuItems.js";

export default {
  name: "MenuHeader.vue",
  data() {
    return {
      menuItems,

    }


  },

  components: {},

  methods: {

  },

  mounted() {



  },

}
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 100%;
  margin-top: 20px;

  .links {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  a {
    color: #000;
    text-decoration: none;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border-bottom: 3px solid transparent;
    padding: 5px;

    object {
      width: 15px;
      height: 15px;

    }

    &:hover {
      border-bottom-color: rgba(0,0,0,.3);
    }

    //&.active {
    //  border-bottom-color: #FFC700;
    //}
  }
}
@media screen and (max-width: 960px){

}
</style>