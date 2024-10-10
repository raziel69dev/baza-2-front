<template>
  <div>
    <div class="wrapper">
      <h2 class="heading2">Проекты, требующие проверки: </h2>

      <div class="projects" >
        <div class="project" v-for="project of projects">
          <project-card
              :style="project.style"
              v-if="project.project"
              :project="project.project"
          />

          <div class="button">
            <button-black>
              <div class="button-content">
                <svg xmlns="http://www.w3.org/2000/svg" class="approve" width="58" height="58" viewBox="0 0 58 58" fill="none">
                  <path d="M56 26.5314V29.0154C55.9967 34.8378 54.1113 40.5031 50.6252 45.1664C47.139 49.8297 42.2389 53.2411 36.6555 54.892C31.0721 56.5428 25.1046 56.3446 19.6431 54.3268C14.1815 52.3091 9.51857 48.5799 6.34959 43.6955C3.18062 38.8111 1.67544 33.0332 2.05853 27.2235C2.44162 21.4138 4.69246 15.8835 8.47535 11.4575C12.2583 7.03156 17.3705 3.94699 23.0497 2.66385C28.7289 1.38071 34.6707 1.96776 39.989 4.33745M56 7.4L29 34.427L20.9 26.327" stroke="#2E7E36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span class="text">Опубликовать</span>
              </div>
            </button-black>
          </div>
        </div>
      </div>


      <empty-store
          @click="this.$router.push('/')"
          :show-button="true"
          :show-button-for-users="false"
          v-show="!loading && projects.length <= 0">
        <template #header>
          НЕТУ!!!
        </template>
        <template #text>
          ожидайте обновлений
        </template>
        <template #buttonText>
          Добавить
        </template>
      </empty-store>

      <the-loader v-show="loading" />


    </div>


  </div>

</template>

<script>
import ProjectCard from "@/components/Layout/Project/ProjectCard.vue";
import emptyStore from "@/components/Blocks/EmptyStore.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {getProjects} from "@/API/projectsController.js";

export default {
  name: "checkProjects.vue",
  emits: ['productAdded', 'productUpdated', 'reviewAdded',],
  data() {
    return {
      projects: [],
      loading: true,
      requestOptions: {
        limit: 8,
        offset: 0,
        "isReviewed": "false",
      },

    }
  },
  components: {
    emptyStore,
    ProjectCard,
    ButtonBlack,
    TheLoader

  },
  mounted() {
    this.onGetProjects(this.requestOptions)
  },
  methods: {
    onGetProjects (options) {
      getProjects(options).then(result => {

        this.hasMore = result.hasMore
        for (const project of result.projects) {
          if( project.type ) {
            this.projects.push(project)

          }
        }
        this.loading = false
      })
    }

  }
}
</script>

<style scoped lang="scss">
.wrapper {
  width: 100%;
  .projects {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: 10px;

    .project {
      width: 24%;

    }
  }

}
@media screen and (max-width: 1024px){
  .wrapper {
    padding: 10px;
    .projects {
      .project {
        width: 32%;
      }
    }

  }
}

@media screen and (max-width: 500px){
  .wrapper {
    .projects {
      .project {
        width: 48%;
      }
    }

  }
}

.approve {

  width: 15px;
  height: 25px;

  path {
    stroke: #A8A8A8;
    stroke-width: 3px;
  }
}
</style>