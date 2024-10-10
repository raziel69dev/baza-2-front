<template>
  <div class="products-carousel">
    <div class="top-carousel-navigation">
      <div class="products-carousel-swapper">
        <span class="recommended"
              :class="{active: currentState === 'random'}"
              @click="changeState('random')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M17.0716 7.04338C16.9251 6.90098 16.7195 6.83627 16.5183 6.86935C16.3168 6.90231 16.1427 7.02885 16.0492 7.21044C15.7276 7.83516 15.3191 8.40927 14.8386 8.91677C14.8865 8.55016 14.9106 8.18136 14.9106 7.81157C14.9106 7.10203 14.8155 6.37186 14.6279 5.64109C14.0109 3.24082 12.3931 1.21093 10.1895 0.0719562C9.99764 -0.0271727 9.76904 -0.0236923 9.58028 0.0812374C9.39152 0.18621 9.2679 0.378667 9.25097 0.593941C9.07918 2.77521 7.95563 4.75968 6.16671 6.0398C6.14304 6.05686 6.11954 6.07413 6.09603 6.09132C6.04735 6.12694 6.00146 6.16063 5.95857 6.1889C5.95187 6.19337 5.94521 6.19793 5.93868 6.20261C4.81359 7.00814 3.88525 8.08193 3.25391 9.30822C2.61238 10.5556 2.28711 11.8941 2.28711 13.2865C2.28711 13.9958 2.3822 14.726 2.56976 15.4569C3.55954 19.3093 7.02643 21.9999 11.0006 21.9999C15.805 21.9999 19.7136 18.0911 19.7136 13.2865C19.7136 10.9172 18.7753 8.7 17.0716 7.04338Z" fill="#FFC700"/>
          </svg>
          Рекомендованные</span>
        <span class="fresh"
              :class="{active: currentState === 'fresh'}"
              @click="changeState('fresh')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M17.7728 8.48243C17.7329 8.41189 17.6749 8.35322 17.6048 8.31239C17.5348 8.27157 17.4552 8.25006 17.3741 8.25006H11.3699L12.3765 0.558879C12.3873 0.455945 12.3632 0.352371 12.308 0.264833C12.2527 0.177295 12.1697 0.110887 12.0721 0.0763024C11.9746 0.0417173 11.8682 0.0409673 11.7702 0.074173C11.6722 0.107379 11.5882 0.172608 11.5317 0.259358L4.23 13.0517C4.1873 13.1211 4.1639 13.2007 4.16221 13.2822C4.16052 13.3637 4.18059 13.4442 4.22037 13.5154C4.26015 13.5865 4.31819 13.6458 4.3885 13.687C4.45882 13.7283 4.53886 13.75 4.62039 13.7501H10.5348L9.7371 21.4528C9.72927 21.5554 9.75596 21.6576 9.81294 21.7433C9.86991 21.829 9.9539 21.8931 10.0515 21.9255C10.1492 21.9579 10.2548 21.9568 10.3517 21.9222C10.4486 21.8877 10.5312 21.8217 10.5863 21.7348L17.7673 8.94386C17.809 8.8743 17.8314 8.79495 17.8324 8.71389C17.8334 8.63283 17.8128 8.55296 17.7728 8.48243Z" fill="#7773FB"/>
          </svg>
          Новые</span>
      </div>

      <div class="exchangers">
        <TheExchanger />
      </div>
    </div>
    <ProductsCarousel :sort="currentState"/>
  </div>
</template>

<script>
import TheExchanger from "@/components/Blocks/TheExchanger.vue";
import ProductsCarousel from "@/components/Blocks/ProductsCarousel.vue";
export default {
  name: "ProductsCarouselMenu.vue",
  data() {
    return {
      currentState: 'random'
    }
  },

  components: {
    TheExchanger,
    ProductsCarousel
  },
  cardsSort: 'random',

  methods: {
    changeState(state) {
      this.currentState = state
    }
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.products-carousel {
  .top-carousel-navigation {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    .exchanger {
      border-radius: 44.5px;
      padding: 7px;
      background: #FFF;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    }
  }
  .products-carousel-swapper {
    display: flex;
    gap: 10px;
    align-items: center;
    height: 35px;
    box-sizing: border-box;


    span {
      border-radius: 28px;
      padding: 14px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: .3s ease;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      box-sizing: border-box;


      svg {
        transition: .3s ease;
        opacity: .5;
      }

      &.recommended {
        border-radius: 28px;
        background: rgba(255, 220, 80, .15);
        color: #d2c1ff;

        &.active {
          background: rgba(255, 220, 80, .65);
          color: #5D599F;
          cursor: default;
          svg {

            opacity: 1;
          }
        }

        &:hover {
          background: rgba(255, 220, 80, .65);
          color: #5D599F;
          svg {
            opacity: 1;
          }
        }
      }

      &.fresh {
        border-radius: 28px;
        background: rgba(119, 115, 251, 0.15);
        color: #d2c1ff;

        &.active {
          background: rgba(119, 115, 251, 0.65);
          color: #FFFFFF;
          cursor: default;
          svg {
            opacity: 1;
          }
        }

        &:hover {
          background: rgba(119, 115, 251, 0.65);
          color: #FFFFFF;
          svg {
            opacity: 1;
          }
        }
      }
    }
  }
}

@media screen  and (max-width: 768px){
  .products-carousel {
    .top-carousel-navigation {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
    }
    .products-carousel-swapper {
      justify-content: space-between;
      display: flex;
      order: 2;
      width: 100%;
      height: 28px;

      span {
        font-size: 12px;
        padding: 8px 16px;
      }
    }

  }

  .exchanger-box {
    order: 1;
  }
}
</style>