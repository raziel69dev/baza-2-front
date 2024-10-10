<template>
  <div class="reviews">
    <div class="reviews-navigation">
      <div class="reviews-navigation_buttons">
        <button-black
            @buttonPressed="() => {
              popup.show = true
              popup.component = 'AddReview'
              popup.project = $props.project
            }"
            :style="'filled'">
          <div class="button-text">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M11.9478 2.05081C9.21358 -0.683398 4.78814 -0.683809 2.05355 2.05081C-0.145162 4.24949 -0.560642 7.51876 0.739241 10.1223L0.0185891 13.2922C-0.0750806 13.7043 0.29418 14.0737 0.706349 13.98L3.87626 13.2594C8.48529 15.5605 13.997 12.229 13.997 6.99796C13.997 5.12922 13.2693 3.37228 11.9478 2.05081ZM8.46011 8.74017H4.08174C3.76437 8.74017 3.50708 8.48288 3.50708 8.1655C3.50708 7.84813 3.76437 7.59084 4.08174 7.59084H8.46011C8.77749 7.59084 9.03477 7.84813 9.03477 8.1655C9.03477 8.48288 8.77749 8.74017 8.46011 8.74017ZM9.91959 6.40504H4.08174C3.76437 6.40504 3.50708 6.14776 3.50708 5.83038C3.50708 5.51301 3.76437 5.25572 4.08174 5.25572H9.91959C10.237 5.25572 10.4942 5.51301 10.4942 5.83038C10.4942 6.14776 10.2369 6.40504 9.91959 6.40504Z" fill="white"/>
            </svg>
            Оставить отзыв
          </div>
        </button-black>

        <div class="count">
          Отзывов: <span>{{project.reviewsCount}}</span>
        </div>
      </div>
      <div class="reviews-navigation_stars">

      </div>
      <div class="reviews-navigation_filter">
        <base-sort :sorts="projectReviewsSort" @sortChanged="(emit) => {
          this.options.sort = emit.slug
          this.reviewsStore.splice(0, reviewsStore.length)
          this.onGetReviews()
          }"/>
      </div>
    </div>

    <div class="reviews-list">
      <project-review v-for="review of reviewsStore"
                      v-if="reviewsStore.length > 0"
                      :key="review"
                      :review="review" />
    </div>

    <Waypoint v-if="hasMore"
              @change="way => {
                  if (way.going === 'IN') {
                    onLoadMore()
                  }
              }">
      <button-black
          @click="onLoadMore()"
          :style="'outline'">
        <div class="button-content">
          Еще
        </div>
      </button-black>

    </Waypoint>
  </div>
</template>
<script>
import projectReview from "@/components/Layout/Review/ProjectReview.vue";
import {ref} from "vue";
import {getReviews} from "@/API/reviewsController.js";
import BaseSort from "@/components/ReUsable/BaseSort.vue";
import {projectReviewsSort} from "@/Stores/allSorts.js";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";
import {addNotice} from "@/js/notifications.js";
import {popup} from "@/js/controllers/popupController.js";
import {reviewsStore} from "@/Stores/reviewsStore.js";
import {Waypoint} from "vue-waypoint";


export default {
  name: 'ProjectReviews',
  props: {
    id: ref(Number),
    project: ref(Object)
  },
  components: {
    BaseSort,
    projectReview,
    ButtonBlack,
    Waypoint
  },
  data() {
    return {
      popup,
      projectReviewsSort,
      options: {
        offset: 0,
        limit: 10
      },
      reviewsStore,
      hasMore: true
    }
  },
  methods: {
    onLoadMore() {
      this.options.offset = this.options.limit + this.options.offset
      this.onGetReviews()
    },
    onGetReviews() {
      this.options.projectId = this.$props.id
      getReviews(this.options)
          .then(result => {
            for(let review of  result.data.reviews) {
              reviewsStore.push(review)
            }
            result.data.reviews.length < this.options.limit ? this.hasMore = false : this.hasMore = true

          })
          .catch(error => {
            addNotice({name: 'Произошла ошибка, повторите позже', type: 'danger'})
          })
    }
  },
  mounted() {

  }
}
</script>
<style scoped lang="scss">

.button-text {
  color: #F8F7FC;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 15px;
  align-items: center;

}
.reviews-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
}
.reviews {
  margin-top: 20px;
  gap: 20px;
  width: 100%;

  .reviews-navigation {
    border-radius: 20px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;

    .reviews-navigation_buttons {
      display: flex;
      align-items: center;
      gap: 10px;

      .count {
        width: fit-content;
        display: block;
        white-space: nowrap;
        color: #B3B4C9;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        span {
          color: #191B2A;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
        }
      }
    }
  }
}
@media screen and (max-width: 992px) {
}

@media screen and (max-width: 500px) {
  .button-text {
    font-size: 13px;
  }
  .reviews .reviews-navigation .reviews-navigation_buttons .count {
    font-size: 13px;
  }
}
</style>