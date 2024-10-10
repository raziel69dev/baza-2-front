<template>
  <router-link class="project-wrapper"
     :to="'/project/' + $props.project.id"
     :class="{
           'fake-placeholder': !loading.success && !loading.error,
           'payed': $props.project.payed === true}"
  >
      <div class="project"
           >
        <div class="favorite-wrapper" v-if="userStore.token"  @click.prevent>
          <button class="favorite"
                  @click.prevent
                  :class="{'in-favorite': $props.project.favorite === 1}"
                  @click="onFavorite($props.project.id, $props.project.name)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M21.6188 14.7186C20.5594 16.0029 15.9 19.8467 13.4766 21.8154C12.6141 22.5186 11.3813 22.5186 10.5188 21.8154C8.09531 19.8467 3.44063 16.0029 2.37656 14.7186C0.754688 12.7639 0 10.9029 0 8.87793C0 6.8998 0.675 5.08105 1.90313 3.7498C3.15 2.40449 4.85156 1.65918 6.70313 1.65918C8.09063 1.65918 9.35625 2.0998 10.4719 2.9623C11.0531 3.41699 11.5688 3.95137 11.9953 4.55605C12.4266 3.95605 12.9375 3.41699 13.5188 2.9623C14.6344 2.09512 15.9047 1.65918 17.2922 1.65918C19.1484 1.65918 20.85 2.40449 22.0922 3.7498C23.3156 5.08105 23.9953 6.89512 23.9953 8.87793C24 10.9029 23.2453 12.7639 21.6188 14.7186Z" fill="#D9D6E6"/>
            </svg>
          </button>
        </div>

        <div class="pin-wrapper" v-if="$props.project.payed">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M0.74984 18.0001C0.948736 18 1.13947 17.921 1.28009 17.7803L6.24434 12.8161L7.18034 13.7851C7.88581 14.5306 8.85813 14.9659 9.88409 14.9956C10.2261 14.9966 10.5658 14.939 10.8883 14.8253C11.3867 14.6537 11.8246 14.3411 12.1488 13.9255C12.473 13.5098 12.6695 13.009 12.7146 12.4838C12.796 11.7232 12.7396 10.9541 12.5481 10.2136L12.3876 9.43205C12.3572 9.30708 12.3594 9.17639 12.3941 9.05253C12.4288 8.92868 12.4947 8.81582 12.5856 8.7248L13.7758 7.5338C13.8228 7.48667 13.8863 7.45975 13.9528 7.4588C13.9762 7.45446 14.0003 7.45672 14.0224 7.46533C14.0445 7.47395 14.0638 7.48857 14.0781 7.50755C14.4548 7.90704 14.9616 8.15912 15.5075 8.21851C16.0534 8.27789 16.6025 8.14069 17.0563 7.83155C17.3226 7.64172 17.5443 7.39612 17.706 7.11186C17.8677 6.8276 17.9655 6.51151 17.9925 6.1856C18.0196 5.8597 17.9753 5.53181 17.8627 5.22478C17.7501 4.91775 17.5719 4.63895 17.3406 4.4078L13.6498 0.715552C13.2709 0.327128 12.7674 0.0842654 12.2275 0.0294264C11.6877 -0.0254126 11.1457 0.111261 10.6963 0.415552C10.43 0.605327 10.2082 0.85088 10.0465 1.13511C9.88473 1.41934 9.78688 1.73542 9.75975 2.06133C9.73262 2.38723 9.77686 2.71514 9.88939 3.0222C10.0019 3.32926 10.18 3.6081 10.4113 3.8393L10.4683 3.8963C10.5113 3.93957 10.5354 3.99808 10.5354 4.05905C10.5354 4.12003 10.5113 4.17853 10.4683 4.2218L9.26834 5.4218C9.17629 5.51366 9.06192 5.58001 8.93649 5.61433C8.81105 5.64865 8.67884 5.64976 8.55284 5.61755L7.94009 5.4608C7.18638 5.26396 6.40333 5.20476 5.62859 5.28605C5.07911 5.34296 4.55735 5.55578 4.12482 5.89941C3.69229 6.24304 3.36702 6.70317 3.18734 7.22555C2.99126 7.76237 2.9526 8.34402 3.0759 8.90207C3.1992 9.46011 3.47934 9.97132 3.88334 10.3756L5.20184 11.7406L0.21959 16.7198C0.114733 16.8247 0.0433283 16.9583 0.0144026 17.1038C-0.014523 17.2492 0.00032918 17.4 0.0570817 17.537C0.113834 17.6741 0.209939 17.7912 0.333246 17.8736C0.456554 17.956 0.601528 18 0.74984 18.0001ZM4.60109 7.72505C4.68561 7.46954 4.84238 7.24401 5.05242 7.07575C5.26247 6.9075 5.51679 6.80375 5.78459 6.77705C5.95726 6.75908 6.13074 6.75007 6.30434 6.75005C6.72983 6.75007 7.15355 6.80477 7.56509 6.9128L8.18234 7.0703C8.5605 7.16598 8.95701 7.16203 9.33319 7.05885C9.70938 6.95567 10.0524 6.75677 10.3288 6.48155L11.5288 5.28155C11.8526 4.95679 12.0345 4.5169 12.0345 4.0583C12.0345 3.5997 11.8526 3.15981 11.5288 2.83505L11.4718 2.77805C11.3942 2.70058 11.3345 2.60701 11.2969 2.50396C11.2593 2.4009 11.2448 2.29085 11.2544 2.18158C11.264 2.0723 11.2974 1.96646 11.3524 1.87152C11.4073 1.77657 11.4824 1.69483 11.5723 1.63205C11.7324 1.53517 11.9209 1.49644 12.1062 1.5224C12.2915 1.54836 12.4621 1.63742 12.5893 1.77455L16.2823 5.46755C16.36 5.54503 16.4197 5.63859 16.4573 5.74165C16.4948 5.84471 16.5094 5.95475 16.4998 6.06403C16.4902 6.1733 16.4567 6.27914 16.4018 6.37409C16.3469 6.46904 16.2718 6.55078 16.1818 6.61355C16.0201 6.71176 15.8291 6.7505 15.6419 6.72313C15.4546 6.69575 15.2827 6.60396 15.1558 6.46355C15.0015 6.30444 14.8169 6.17787 14.6129 6.0913C14.4088 6.00474 14.1895 5.95994 13.9678 5.95955C13.5003 5.96168 13.0519 6.14566 12.7176 6.47255L11.5281 7.6628C11.258 7.93309 11.0612 8.26771 10.9562 8.63512C10.8512 9.00253 10.8416 9.39062 10.9281 9.7628L11.0923 10.5563C11.2437 11.1349 11.2897 11.7359 11.2281 12.3308C11.2102 12.5734 11.1213 12.8054 10.9727 12.9979C10.824 13.1905 10.622 13.3351 10.3918 13.4138C10.0082 13.5147 9.60379 13.5048 9.2255 13.3853C8.84721 13.2659 8.51049 13.0417 8.25434 12.7388L4.95434 9.3263C4.74857 9.12108 4.60593 8.86118 4.54332 8.57739C4.48071 8.29359 4.50076 7.9978 4.60109 7.72505Z" fill="#A6A2B6"/>
            </svg>
        </div>

        <div class="project_image" v-if="$props.project.avatarFilePath">
          <TheImage
              :image="$props.project.avatarFilePath"
              @ImageStatusChanged="(emit) => {
                loading.success = !emit
                loading.error = emit
              }"
          />

          <div class="admin-menu" v-if="userStore.role === 'admin'">
            <AdminMenu @click.prevent
                       @editProject="console.log()"
                       @deleteProject="console.log()"
                       @pinProject="console.log()"
                       :project="$props.project"
                       v-if=" userStore.role === 'admin'"
            />
          </div>
        </div>

        <div class="project_data">
          <div class="project_name">
            <span v-if="$props.project.name">{{ $props.project.name }}</span>
          </div>
          <div class="project_links">
            <project-link-item :data="link"
                               v-for="(link, index) of $props.project.links"
                               :key="link"
                               v-show="index < 2"
                               @click.stop
            >
            </project-link-item>
            <div class="show-more" @click.prevent
                 @click="() => {
                   popup.show = true
                   popup.project = $props.project
                   popup.component = 'ProjectLinks'
                 }"
                 v-if="$props.project.links.length > 2">
              ...
            </div>


          </div>

          <div class="project_stats" v-if="$props.project.viewCount || $props.project.reviewCount || $props.project.reserve || $props.project.ratingAvg">
            <div class="project_stat"
                 v-for="stat of stats"
                 v-show="stat.data"
                 :key="stat">

              <ProjectStatsItem
                  :data="stat"
              />
            </div>


          </div>
        </div>


      </div>

  </router-link>
</template>

<script>
import iconMoney from '@/assets/icons/icon-money.svg'
import iconView from '@/assets/icons/icon-views.svg'
import iconReview from '@/assets/icons/icon-review.svg'
import iconStar from '@/assets/icons/icon-star.svg'
import {defineAsyncComponent} from "vue";
import {projects} from "@/Stores/projectsStore.js";
import {addFavorite, removeFavorite} from "@/API/favoriteController.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";


export default {
  name: "ProjectCard.vue",
  components: {
    TheLoader: defineAsyncComponent({
      loader: () => import("@/components/ReUsable/TheLoader.vue"),
      delay: 200,
      timeout: 3000
    }),
    ProjectStatsItem: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectStatsItem.vue"),
      delay: 200,
      timeout: 3000
    }),
    ProjectLinkItem: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectLinkItem.vue"),
      delay: 200,
      timeout: 3000
    }),

    AdminMenu: defineAsyncComponent({
      loader: () => import("@/components/Layout/Project/ProjectCardAdminMenu.vue"),
      delay: 200,
      timeout: 3000
    }),

    TheImage: defineAsyncComponent({
      loader: () => import("@/components/Blocks/TheImage.vue")
    }),
  },
  props: {
    project: {

      name: null,
      id: null,
      avatarFilePath: null,
      ratingAvg: null,
      viewCount: null,
      reviewCount: null,
      reserve: null
    }
  },
  data() {
    return {
      popup,
      loading: {
        error: false,
        success: false
      },
      userStore,
      stats: {
        rating: {
          icon: iconStar,
          data: this.$props.project.ratingAvg
        },
        views: {
          icon: iconView,
          data: this.$props.project.viewCount
        },
        reviews: {
          icon: iconReview,
          data: this.$props.project.reviewsCount
        },
        money: {
          icon: iconMoney,
          data: this.$props.project.reserve
        }
      }
    }
  },

  methods: {
    onFavorite(id, name) {

      let project;

      if (projects.find(item => item.id === id)) {
        project = projects.find(item => item.id === id)
      } else {
        project = projects.find(item => item.project.id === id)
      }

      project.favorite === 0 ? project.favorite = 1 : project.favorite = 0

      if (project.favorite === 1) {
        addFavorite(id, name).then((result) => result)

      } else {
        removeFavorite(id, name).then(() => project.favorite = 0)
      }


    },
    onPin(id) {
      const project = projects.find(item => item.id === id)
      project.payed === false ? project.payed = true : project.payed = false
    },

  },

  mounted() {

  }
}
</script>

<style scoped lang="scss">

.project-wrapper {
  width: 100%;
  box-sizing: border-box;
  display: block;
  border-radius: 20px;
  background-color: #FFFFFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  border: 2px solid transparent;
  animation: BgGrad 5s ease-in-out infinite;

  @keyframes BgGrad {
    0% {
      background-size: 100% 100%;
    }
    50% {
      background-size: 1000% 1000%;
    }
    100% {
      background-size: 100% 100%;
    }
  }

  &:hover {
    border-color: black;
  }

  &.payed {
    background: linear-gradient(#fff,#fff 0) padding-box, linear-gradient(-45deg, #743ad5, #d53a9d) border-box;
    background-size: 200% 200%;


    &:hover {
      border-color: transparent;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -38px #7752B2;
    }


  }

  .project {
    padding: 10px 10px 50px 10px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    transition: .3s ease;
    position: relative;
    overflow: hidden;


    .show-more {
      border-radius: 12px;
      background: #F2F5F7;
      padding: 4px 18px;
      white-space: nowrap;
      color: #1E1E1E;
      font-size: 12px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: .3s ease;

      &:hover {
        color: #fff;
        background-color: #7773FB;
      }
    }



    .favorite-wrapper, .pin-wrapper {
      background-color: #fff;
      position: absolute;
      z-index: 5;


      .favorite, .pin {
        background-color: transparent;
        border: none;
        cursor: pointer;

        svg {
          path {
            fill: #D9D6E5;
            transition: .3s ease;
          }
        }

        &:hover {
          svg {
            path {
              fill: #A79FCE;
            }
          }
        }

        &.in-favorite {
          svg {
            path {
              fill: #FB5A50;
            }
          }

          &:hover {
            svg {
              path {
                fill: #d2635d;
              }
            }
          }
        }
      }
    }

    .favorite-wrapper {
      top: 25px;
      border-radius: 0 25px 25px 0;
      padding: 8px 5px 5px 0;
      left: 5px;
      box-sizing: border-box;
    }
    .pin-wrapper {
      top: -3px;
      right: -3px;
      border-radius: 0 20px;
      padding: 12px 15px;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      background: #FFF;
      border: 2px solid #D9D6E5;
      box-sizing: border-box;

      svg {
        width: 18px;
        height: 18px;
        stroke-width: 2px;
      }

    }

    .admin-menu {
      position: absolute;
      bottom: 2px;
      right: 2px;
    }

    .project_image {
      border-radius: 9px;
      width: 100%;
      height: 100%;
      aspect-ratio: 1 / 1;
      position: relative;
      overflow: hidden;

      img {

        overflow: hidden;
        width: 100%;

      }
    }
    .project_name {
      margin-top: 10px;
      color: #1E1E1E;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      height: 25px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      line-clamp: 1;

    }
    .project_links {
      overflow: visible;
      border-radius: 20px;
      display: flex;
      gap: 6px;
      margin-top: 10px;
      margin-left: -5px;
      margin-right: -5px;

      .project_links-link {

      }

    }
    .project_stats {
      border-radius: 20px;
      display: flex;
      gap: 15px;
      margin-top: 15px;
      margin-bottom: 20px;
      position: absolute;

      .project_stat {

      }
    }

    &.fake-placeholder {
      .project_stats {
        display: none;
      }
      .project_image {
        background: linear-gradient(200deg, #eeeeee, #bdbdbd, #eeeeee);
        background-size: 600% 600%;
      }

      .project_name, .project_links, .project_stats {
        margin-top: 10px;
        background: linear-gradient(200deg, #eeeeee, #dedede, #eeeeee);
        background-size: 400% 400%;
        padding: 8px;

        &:after {
          content: ' ';
        }

        span {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 500px){
  .project-wrapper {
    .project {
      padding: 10px;
      display: flex;
      flex-wrap: nowrap;
      gap: 15px;
      .show-more {
        font-size: 10px;
        padding: 0 10px;
      }
      .favorite-wrapper {
        padding: 0 2px;
        top: 15px;
        .favorite {

          svg {
            width: 15px;
          }
        }
      }
      .pin-wrapper {
        padding: 8px 11px;
        svg {
          width: 14px;
        }
      }
      .project_image {
        width: 30%;
        min-width: 80px;
        img {
          width: 120px;
        }
      }
      .project_data {
        width: 90%;
      }
      .project_name {
        width: 70%;
        margin-top: 5px;
      }
      .project_links {
        margin-top: 0;
        overflow-y: hidden;
        overflow-x: auto;
      }
      .project_stats {
        margin-top: 10px;
        width: 60%;
      }
    }
  }
}

@-webkit-keyframes BgGradient {
  0%{background-position:0% 43%}
  50%{background-position:100% 58%}
  100%{background-position:0% 43%}
}
@-moz-keyframes BgGradient {
  0%{background-position:0% 43%}
  50%{background-position:100% 58%}
  100%{background-position:0% 43%}
}
@keyframes BgGradient {
  0%{background-position:0% 43%}
  50%{background-position:100% 58%}
  100%{background-position:0% 43%}
}

</style>