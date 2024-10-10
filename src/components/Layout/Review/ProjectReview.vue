<template>
  <div class="review">
    <div class="review-avatar">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 21C20 19.6044 20 18.9067 19.8278 18.3389C19.44 17.0605 18.4395 16.06 17.1611 15.6722C16.5933 15.5 15.8956 15.5 14.5 15.5H9.5C8.10444 15.5 7.40665 15.5 6.83886 15.6722C5.56045 16.06 4.56004 17.0605 4.17224 18.3389C4 18.9067 4 19.6044 4 21M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <div class="review-body">
      <div class="info">
        <div class="review-body-info">
          <div class="review-body_username" v-if="$props.review.userData || $props.review.anonId">
            <span v-if="$props.review.userData">{{$props.review.userData.username}}</span>
            <span v-else-if="$props.review.anonId">{{$props.review.anonId}}</span>


          </div>
          <div class="review-body_rate">
            <svg v-for="count of this.$props.review.rating" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13.9634 5.06925C13.8712 4.78577 13.6198 4.58507 13.3235 4.55826L9.28209 4.19135L7.68491 0.452034C7.56698 0.17731 7.29867 0 7.00002 0C6.70137 0 6.43295 0.17731 6.31577 0.452034L4.71859 4.19135L0.676564 4.55826C0.380264 4.5856 0.129359 4.7863 0.0366454 5.06925C-0.0555345 5.35274 0.0295957 5.66367 0.25369 5.86021L3.30866 8.53898L2.4079 12.5062C2.342 12.7979 2.45522 13.0996 2.69726 13.2745C2.82736 13.3691 2.98021 13.4163 3.13359 13.4163C3.2654 13.4163 3.39731 13.3813 3.51513 13.3108L7.00002 11.227L10.4843 13.3108C10.7399 13.4635 11.0613 13.4495 11.3028 13.2745C11.5448 13.0996 11.658 12.7979 11.5921 12.5062L10.6914 8.53898L13.7463 5.86021C13.9703 5.66367 14.0556 5.35338 13.9634 5.06925Z" fill="#191B2A"/>
            </svg>

          </div>
          <div class="review-body_time">
            {{ normalizeTime($props.review.createdAt) }}
          </div>
          <div class="admin-menu">
            <review-menu :review="$props.review" />
          </div>
        </div>


      </div>

      <div class="review-body_text">
        {{ $props.review.comment }}
      </div>
    </div>
  </div>
</template>

<script>
import ReviewMenu from "@/components/Menus/ReviewMenu.vue";


export default {
  name: "ProjectReview.vue",
  props: {
    review: {}
  },
  data() {
    return {
      months: ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'],

    }
  },
  components: {ReviewMenu},
  methods: {
    normalizeTime(time) {
      let reviewDate = Date.parse(time)
      return new Date(reviewDate).getDate() + ' ' + this.months[new Date(reviewDate).getMonth()] + ' ' + new Date(reviewDate).getFullYear()

    }
  }
}
</script>

<style scoped lang="scss">
.review {
  border-radius: 20px;
  background: #FFF;
  box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  display: flex;
  gap: 20px;
  align-items: center;


  .review-avatar {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f3f3;
    border-radius: 16px;
    svg {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      path {
        stroke-width: 1px;
        stroke: #d0d0d0;
      }
    }
  }
  .review-body {
    width: 95%;
    .info {
      width: 100%;
    }
    .admin-menu {
      margin-left: auto;
    }
    .review-body-info {
      display: flex;
      align-items: center;
      gap: 15px;
      width: 100%;

      .review-body_username {
        color: #191B2A;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
      .review-body_time {
        color: #B3B4C9;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 154.183%; /* 21.586px */
      }
      .review-body_rate {
        display: flex;
        gap: 5px;
      }
    }
    .review-body_text {
      word-break: break-word;
      margin-top: 5px;
      color: #191B2A;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 154.183%; /* 21.586px */
    }


  }
}

@media screen and (max-width: 768px){
  .review .review-body {

    .review-body-info {

      .review-body_rate {
        width: 90px;
        gap: 5px;
      }

      .review-body_username {
        width: 80px;
        padding: 0;
        overflow: hidden;
        display: inline-block;
        text-decoration: none;
        text-overflow: ellipsis;
        white-space: nowrap;

      }
    }
  }
}
</style>