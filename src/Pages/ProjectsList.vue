<template>

  <div class="projects-list">
    <div class="carousel">
      <productsCarouselMenu />
    </div>
    <div class="projects-nav">
      <ProjectsMenu />
      <sort :sorts="projectsSortsStore" @sortChanged="(emit) => {
        this.requestOptions.sort = emit.slug
        // this.projects.splice(0, this.projects.length)
        removeItems()
        this.requestOptions.offset = 0
        getProjectsList(requestOptions)
      }"/>
    </div>

    <div class="projects" v-if="projects.length > 0 && !loading">
      <transition-group name="cross-fade">
        <div class="project-box"
             v-for="project of projects"
             :key="project"
        >
          <ThePlaceholder :placeholder="project"
                          v-if="!project.type"
          />
          <project-card
              v-else-if="project.type"
              :project="project"
          />
        </div>
      </transition-group>


      <Waypoint @change="onChange" v-if="hasMore">
        <button-black @buttonPressed="getProjectsList(requestOptions)">
          <div class="button-content">
            Загрузить еще проекты
          </div>
        </button-black>
      </Waypoint>


    </div>

    <empty-store
        v-else-if="projects.length <= 0 && !loading"
        :show-button="true"
        :show-button-for-users="true"
        :showButtonForUnauthorised="true"
        @buttonPressed="this.$router.push('/add-project')">
      <template #header>
        В этой категории нет проектов
      </template>
      <template #text>
        но вы всегда можете добавить свой
      </template>
      <template #buttonText>
        <span>
          Добавить проект
        </span>

      </template>
    </empty-store>
  </div>

</template>

<script>
import {defineAsyncComponent} from "vue";
import {getProjects} from "@/API/projectsController.js";
import {projects} from "@/Stores/projectsStore.js";
import {allSorts} from "@/Stores/allSorts.js";
import { Waypoint } from "vue-waypoint";
import productsCarouselMenu from "@/components/Blocks/ProductsCarouselMenu.vue";
import thePlaceholder from "@/components/Layout/Project/ThePlaceholder.vue";
import {placeholders} from "@/API/placeholders.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
export default {
  name: 'ProjectsList.vue',
  components: {
    ProjectCard: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectCard.vue"),
      delay: 200,
      timeout: 3000
    }),
    ButtonBlack: defineAsyncComponent({
      loader: () => import("@/components/Buttons/ButtonBlack.vue"),
      delay: 200,
      timeout: 3000
    }),
    ProjectsMenu: defineAsyncComponent({
      loader: () => import("@/components/Menus/ProjectsMenu.vue"),
      delay: 200,
      timeout: 3000
    }),
    Sort: defineAsyncComponent({
      loader: () => import("@/components/ReUsable/BaseSort.vue"),
      delay: 200,
      timeout: 3000
    }),

    EmptyStore: defineAsyncComponent({
      loader: () => import("@/components/Blocks/EmptyStore.vue"),
      delay: 200,
      timeout: 3000
    }),
    productsCarouselMenu: defineAsyncComponent({
      loader: () => import("@/components/Blocks/ProductsCarouselMenu.vue"),
      delay: 200,
      timeout: 3000
    }),
    ThePlaceholder: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ThePlaceholder.vue"),
      delay: 200,
      timeout: 3000
    }),
    Waypoint
  },
  watch: {
    $route: function (newVal, oldVal) {
      if (newVal.query.categoryIds !== oldVal.query.categoryIds) {

        if (!newVal.query.categoryIds) {
          delete this.requestOptions.categoryIds
          this.requestOptions.offset = 0

          projects.splice(0, projects.length)
          this.getProjectsList(this.requestOptions)
        } else {
          this.requestOptions.categoryIds = `[${newVal.query.categoryIds}]`
          this.requestOptions.offset = 0

          projects.splice(0, projects.length)
          this.getProjectsList(this.requestOptions)
        }

      }
    }
  },
  data() {
    return {
      loading: true,
      requestOptions: {
        limit: 8,
        offset: 0,
        isPayedFirst: true,
        sort: null
      },
      placeholders,
      projectsSortsStore: allSorts,
      result: null,
      projects,
      hasMore: true
    }
  },
  methods: {
    onChange(e) {
      if (e.direction === 'UP' && e.going) {
        this.getProjectsList(this.requestOptions)
      }
    },
    removeItems() {
      this.projects.splice(0, this.projects.length)
    },
    getProjectsList(options) {

      if (options['sort']) {
        try {
          getProjects(options).then(result => {
            this.hasMore = result.hasMore
            for (const project of result.projects) {
              projects.push(project)
            }
          })

          this.requestOptions.offset += options.limit

        } catch (err) {
          this.result = err
        }
        this.loading = false
      }

    }
  },
  mounted() {
    if (window.innerWidth > 1053) {
      this.requestOptions.limit = 8
    } else if (window.innerWidth >= 768 && window.innerWidth <= 1053) {
      this.requestOptions.limit = 4
    } else {
      this.requestOptions.limit = 4
    }
    this.removeItems()
    this.getProjectsList(this.requestOptions)
  }
}

</script>

<style scoped lang="scss">
.projects {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 2.5%;
  align-items: stretch;
  min-height: 500px;

  .project-box {
    width: 23%;
    box-sizing: border-box;
    margin-bottom: 1.5%;
    border-radius: 20px;

  }
}

.projects-nav {
  border-radius: 44.5px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  width: 100%;
  margin-bottom: 25px;
  margin-top: 25px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

@media screen and (max-width: 1052px){
  .projects {
    .project-box {
      width: 31%;
    }
  }
}
@media screen and (max-width: 768px){
  .projects {
    .project-box {
      width: 48%;
    }
  }

}
@media screen and (max-width: 576px){
  .projects-nav {

  }
  .projects {
    gap: 15px;
    .project-box {
      width: 100%;
    }
  }
}

@media screen and (max-width: 356px){
  .projects {
    .project-box {
      width: 100%;
    }
  }
}

</style>