<template>
  <div class="projects-menu">
    <div class="projects-menu_categories">
      <div class="projects-menu_categories_category"
           @click="swapCategory(category.id)"
           v-for="category of categories.allCategories"
           :class="{active: category.id === parseInt(this.$route.query.categoryIds)}"
           :key="category.id">
        <InlineSvg :src="category.icon" class="categoryIcon"/>
        <span class="projects-menu_categories_category_name">{{ category.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {getCategories, changeCategory} from "@/API/categoriesController.js";
import {categories} from "@/Stores/categories.js";
import InlineSvg from "vue-inline-svg";

export default {
  name: "ProjectsMenu",
  data() {
    return {
      categories,
    }
  },

  components: {
    InlineSvg
  },

  methods: {
    swapCategory(id) {
      if (id === parseInt(this.$route.query.categoryIds)) {
        changeCategory(undefined)
      } else {
        changeCategory(id)
      }
    }

  },

  mounted() {


  }

}
</script>

<style scoped lang="scss">
@import "@/assets/categories.scss";

.projects-menu {



}

</style>