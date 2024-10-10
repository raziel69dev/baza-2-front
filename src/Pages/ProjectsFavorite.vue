<template>
  <div class="projects-wrapper" >
    <h2 class="heading2">Ваши любимые проекты</h2>
    <div class="projects-list" v-if="favoriteProjects.projects">

      <div class="project-wrapper-card" v-for="project of favoriteProjects.projects">
        <project-card
            :project="project"
        />
      </div>


      <empty-store
          :show-button="true"
          :show-button-for-users="false"
          @buttonPressed="this.$router.push('/')"
          v-if="favoriteProjects.projects.length <= 0">
        <template #header>
          Вы еще не добавили проектов в избранное
        </template>
        <template #text>
          добавьте нужные проекты в избранное, что бы находить их быстрее
        </template>
        <template #buttonText>
          Посмотреть проекты
        </template>
      </empty-store>

      <div class="projects">
        <div class="project" v-for="project of favoriteProjects">


        </div>
      </div>

    </div>
  </div>

</template>

<script>
import { Waypoint } from "vue-waypoint";
import emptyStore from "@/components/Blocks/EmptyStore.vue";
import projectCard from "@/components/Layout/Project/ProjectCard.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {favoriteProjects} from "@/Stores/favoriteProjects.js";
import {getFavoriteProjects} from "@/API/projectsController.js";

export default {
  name: "FavoriteProjects.vue",
  components: {
    projectCard,
    Waypoint,
    TheLoader,
    emptyStore
  },
  emits: ['updated', 'projectDeleted'],

  data () {
    return {
      favoriteProjects

    }
  },

  watch: {
    favoriteProjects: function (newVal, oldVal) {

    }
  },

  mounted() {

    getFavoriteProjects()
  },
  created() {

  },




  methods: {
    changeStatus(projectId) {
      // projectsStore.projects.find(item => item.id === projectId).favorite = 0
    }


  }
}
</script>

<style scoped lang="scss">
.projects-list {
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  gap: 10px;

  .project-wrapper-card {
    width: 24%;
  }
}
@media screen and (max-width: 992px){

  .projects-list {
    .project-wrapper-card {
      width: 32%;
    }
  }
}

@media screen and (max-width: 768px){

  .projects-list {
    .project-wrapper-card {
      width: 49%;
    }
  }
}

@media screen and (max-width: 500px){

  .projects-list {
    .project-wrapper-card {
      width: 100%;
    }
  }
}
</style>