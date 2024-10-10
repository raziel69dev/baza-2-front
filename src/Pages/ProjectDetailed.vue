<template >
  <div class="project" v-if="project">
    <div class="project-banner" v-if="project.bannerFilePath">
      <img :src="api.url + project.bannerFilePath" alt="">
    </div>
    <div class="project-info">
      <div class="favorite-wrapper" v-if="userStore.token" >
        <button class="favorite"
                :class="{'in-favorite': project.favorite === 1}"
                @click="onFavorite(project.id, project.name)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21.6188 14.7186C20.5594 16.0029 15.9 19.8467 13.4766 21.8154C12.6141 22.5186 11.3813 22.5186 10.5188 21.8154C8.09531 19.8467 3.44063 16.0029 2.37656 14.7186C0.754688 12.7639 0 10.9029 0 8.87793C0 6.8998 0.675 5.08105 1.90313 3.7498C3.15 2.40449 4.85156 1.65918 6.70313 1.65918C8.09063 1.65918 9.35625 2.0998 10.4719 2.9623C11.0531 3.41699 11.5688 3.95137 11.9953 4.55605C12.4266 3.95605 12.9375 3.41699 13.5188 2.9623C14.6344 2.09512 15.9047 1.65918 17.2922 1.65918C19.1484 1.65918 20.85 2.40449 22.0922 3.7498C23.3156 5.08105 23.9953 6.89512 23.9953 8.87793C24 10.9029 23.2453 12.7639 21.6188 14.7186Z" fill="#D9D6E6"/>
          </svg>
        </button>
      </div>

      <div class="project-info-stats">
        <img :src="api.url + project.avatarFilePath" alt="">
        <div class="project-info-stats_stats" v-if="stats">
          <ProjectStatsItem v-for="stat of stats"
                            v-show="stat.data"
                            :key="stat"
                            :data="stat"/>
        </div>
      </div>
      <div class="project-info-description">

        <div class="project-info-stats_name">
          {{ project.name }}
        </div>
        <div class="project-info-description_text">
          <p>
            {{ project.description }}
          </p>
        </div>
        <div class="project-info-description_links">
          <div>
            <project-link-item :data="link"
                               v-for="(link, index) of project.links"
                               :key="link"
                               v-show="index < 2"
                               @click.stop
            >
            </project-link-item>
          </div>
        </div>

      </div>
    </div>

    <div class="project-products" v-if="products.length > 0">
      <div class="product" v-for="item of products">
        <ProductCard :item="item" />

      </div>

      <Waypoint v-if="hasMore"
                @change="way => {
                  if (way.going === 'IN') {
                    onGetProducts()
                  }
              }">
        <button-black
            @click="onGetProducts()"
            :style="'outline'">
          <div class="button-content">
            Еще
          </div>
        </button-black>

      </Waypoint>
    </div>
    <div class="project-reviews">
      <ProjectReviews :id="project.id" :project="project"/>
    </div>


  </div>
</template>
<script>
import {getProject} from "@/API/projectsController.js";
import {addNotice} from "@/js/notifications.js";
import {api} from "@/API/apiurl.js";
import ProjectStatsItem from "@/components/Layout/Project/ProjectStatsItem.vue";
import ProjectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";
import ProjectReviews from "@/components/Layout/Project/ProjectReviews.vue";
import iconStar from "@/assets/icons/icon-star.svg";
import iconView from "@/assets/icons/icon-views.svg";
import iconReview from "@/assets/icons/icon-review.svg";
import iconMoney from "@/assets/icons/icon-money.svg";
import {addFavorite, removeFavorite} from "@/API/favoriteController.js";
import {userStore} from "@/Stores/userStore.js";
import ProductCard from "@/components/Layout/Product/ProductCard.vue";
import {getProducts} from "@/API/productsController.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {Waypoint} from "vue-waypoint";


export default {
  name: "ProjectDetailed.vue",
  components: {
    ProjectReviews,
    ProjectStatsItem,
    ProjectLinkItem,
    ProductCard,
    ButtonBlack,
    Waypoint
  },

  data() {
    return {
      project: null,
      api,
      stats: {},
      userStore,
      products: [],
      requestOptions: {
        projectId: null,
        limit: 10,
        offset: 0
      },
      hasMore: true
    }
  },
  methods: {
    onFavorite(id, name) {


      this.project.favorite === 0 ? this.project.favorite = 1 : this.project.favorite = 0

      if (this.project.favorite === 1) {
        addFavorite(id, name).then((result) => result)

      } else {
        removeFavorite(id, name).then(() => this.project.favorite = 0)
      }

    },
    onGetProducts() {
      this.requestOptions.projectId = this.project.id
      getProducts(this.requestOptions).then(result => {
        for (let product of result.data.products) {
          this.products.push(product)
        }
        this.hasMore = result.data.products.length >= this.requestOptions.limit;
        this.requestOptions.offset = this.requestOptions.offset + this.requestOptions.limit
      })
    },
    onGetProject(id) {
      getProject(id)
          .then(result => {
            this.project = result.data.project
            this.onGetProducts()
            this.stats = {
              rating: {
                icon: iconStar,
                data: this.project.ratingAvg
              },
              views: {
                icon: iconView,
                data: this.project.viewCount
              },
              reviews: {
                icon: iconReview,
                data: this.project.reviewsCount
              },
              money: {
                icon: iconMoney,
                data: this.project.reserve
              }
            }
          })
          .catch(error => {
            addNotice({name: error.response.data.message, type: 'danger'})
          })
    }
  },
  mounted() {
    this.onGetProject(this.$route.path.replace('/project/', ''))

  }
}
</script>

<style scoped lang="scss">
.project {
  width: 100%;

  .project-products {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 30px;
    margin-bottom: 20px;

    .product {
      width: 19%;
    }
  }

  .project-banner {
    width: 100%;
    img {
      border-radius: 20px;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      width: 100%;
      box-sizing: border-box;
    }
  }

  .project-info {
    display: flex;
    gap: 20px;
    margin-top: 20px;
    position: relative;
    align-items: start;

    .favorite-wrapper {
      top: 8%;
      border-radius: 0 20px 20px 0;
      padding: 5px 3px 3px 0;
      position: absolute;
      left: 0;
      background-color: #FFFFFF;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;
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

    .project-info-stats, .project-info-description {
      border-radius: 20px;
      background: #FFF;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      padding: 20px;
      box-sizing: border-box;

      color: #191B2A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 154.183%; /* 21.586px */

      h4 {
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        margin-top: 10px;
        margin-bottom: 5px;
      }

    }
    .project-info-stats {
      width: 15%;
      justify-content: center;
      flex-wrap: wrap;
      display: flex;
      padding: 5px;


      img {
        border-radius: 18px;
        width: 100%;
        aspect-ratio: 1 / 1;

      }


    }
    .project-info-description {
      width: 85%;

      p {
        word-break: break-word;
      }

      .project-info-stats_name {
        margin-top: 10px;
        width: 100%;
        color: #191B2A;
        text-align: left;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }



    }
  }
}
.project-info-stats_stats {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff;
  width: 100%;
  padding: 3px 10px;
  border-radius: 20px;

}
.project-info-description_links {
  margin-top: 10px;
  div {
    gap: 10px;
    display: flex;
    flex-wrap: wrap;
  }
}
@media screen and (max-width: 992px){
  .project {
    .project-info {

      .favorite-wrapper {
        top: 10px;
        left: 10px;
      }

      .project-info-description {
        width: 70%;
      }
      .project-info-stats {
        width: 30%;
        .project-info-stats_stats {
          gap: 15px;
        }
        .project-info-stats_name {

        }
      }
    }
  }
}

@media screen and (max-width: 500px){
  .project {
    .project-info {
      flex-wrap: wrap;
      .project-info-stats, .project-info-description {
        width: 100%;
      }
      .project-info-stats {
        .project-info-stats_name {

        }
      }
    }
  }

}
</style>