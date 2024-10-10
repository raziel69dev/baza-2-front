<template>

  <div
       ref="carouselWrapper"

       class="products-carousel">

    <transition-group

        name="list">
      <div
          @mousedown="(e) => {

            this.position = e.screenX
            this.dragSlide()

          }"
          v-if="!loading && Object.keys(productsStore.products).length > 0"
          @touchstart="e => this.position = e.targetTouches[0].screenX"
          @touchend="stopDrag"
          @touchmove="e => mobileDrag(e)"
          @mouseup="stopDrag"
          @mouseleave="stopDrag"
          :key="1"
          ref="carouselItemsWrapper"
          :style="carousel.styles"
          class="products-carousel_items"


      >
        <router-link
            :to="`/project/${item.ProjectId}`"
            @click="() => {
              highlightedProject.push(item)
            }"
            :class="colClass"
            v-for="(item, index) in productsStore.products"
            v-show="index < visibleItems"
            :key="index"
            class="products-carousel_items_item">
          <div ref="sliderItem">
            <ProductCard

                :item="item"

            >
            </ProductCard>
          </div>

        </router-link>
      </div>
    </transition-group>

    <the-loader v-if="loading" />
    <div v-else-if="!loading && loadingError">
      <h4 style="text-align: center; margin-top: 85px;">Произошла ошибка получения витрин, пожалуйста повторите попытку позже или перезагрузите страницу</h4>

    </div>

    <div class="products-carousel_navigation">
      <div class="next"
           v-if="!loading && Object.keys(productsStore.products).length > 0"
           @click="next">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M1 1L11 11L1 21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>

      <div class="prev"
           v-if="!loading && Object.keys(productsStore.products).length > 0"
           @click="prev">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="22" viewBox="0 0 12 22" fill="none">
          <path d="M11 21L1 11L11 1" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>


    </div>
  </div>

</template>

<script>
import {ref, watch} from 'vue'
import ProductCard from "@/components/Layout/Product/ProductCard.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import {productsStore} from "@/Stores/productsStore.js";
import {getProducts} from "@/API/productsController.js";

export default {
  name: "ProductsCarousel.vue",
  components: {
    ProductCard,
    TheLoader
  },
  props: {
    sort: 'random'
  },
  data() {
    return {
      position: null,
      carousel: {
        wrapperWidth: 0,
        slideStep: 0,
        styles: {}
      },

      loading: false,
      loadingError: false,
      currentSort: null,
      productsStore,
      height: null,
      visibleItems: 5,
      colClass: 'col-5',
    }
  },
  setup() {
    watch(productsStore, (value, oldValue) => {
    }, {immediate: true})

  },
  watch: {
    '$props.sort': function (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.collectProducts()
      }
    }
  },
  methods: {

    mobileDrag(e) {
      if (e.targetTouches[0].screenX - 200 > this.position) {
        this.prev()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      } else if (e.targetTouches[0].screenX< this.position -200) {
        this.next()
        this.stopDrag()
        this.position = e.targetTouches[0].screenX
      }
      this.stopDrag()
    },
    dragSlide() {
      window.addEventListener('mousemove', this.dragToSlide)

    },
    stopDrag() {
      window.removeEventListener('mousemove', this.dragToSlide)
    },
    dragToSlide(event) {
      if (window.innerWidth > 768) {
        if (event.screenX - 200 > this.position) {
          this.prev()
          this.position = event.screenX

        } else if (event.screenX < this.position -200) {
          this.next()
          this.position = event.screenX

        }

      } else {
        if (event.screenX - 50 > this.position) {
          this.prev()
          this.position = event.screenX

        } else if (event.screenX < this.position - 50) {
          this.next()
          this.position = event.screenX

        }
      }


    },
    next() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.sliderItem[1].scrollWidth + 20
      this.$refs.sliderItem[0].style.display = "none"

      this.carousel.styles = {
        transform: `translateX(-${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.shift()
        productsStore.products.push(product)
        this.resetTranslate()
        this.$refs.sliderItem[0].style.display = "flex"
      })

    },
    prev() {
      this.carousel.wrapperWidth = this.$refs.carouselItemsWrapper.scrollWidth
      this.carousel.slideStep = this.$refs.sliderItem[1].scrollWidth + 20
      this.$refs.sliderItem[4].style.display = "none"

      this.carousel.styles = {
        transform: `translateX(${this.carousel.slideStep}px)`,
        transition: `.15s ease`
      }

      this.afterTransition(() => {
        const product = productsStore.products.pop()
        productsStore.products.unshift(product)
        this.resetTranslate()
        this.$refs.sliderItem[4].style.display = "flex"
      })
    },

    afterTransition (callback) {
      const listener = () => {
        callback()
        this.$refs.carouselItemsWrapper.removeEventListener('transitionend', listener)
      }
      this.$refs.carouselItemsWrapper.addEventListener('transitionend', listener)
    },

    resetTranslate () {
      this.carousel.slideStep = 0
      this.carousel.styles = {
        transform: `translateX(${this.carousel.slideStep}px)`,
        transition: `none`
      }
    },

    collectProducts () {
      this.getHeight()
      this.loading = true
      this.loadingError = false


      productsStore.products.splice(0, productsStore.products.length)

      if (Object.keys(productsStore.products).length <= 0) {
        getProducts({sort: this.$props.sort || 'random', limit: 50}).then(result => {

          for (const item of result.data.products) {
            productsStore.products.push(item)
          }
          this.loading = false
          this.loadingError = false

        }).catch(e => e)
      }
    },

    getHeight() {
      if (this.$refs.carouselItemsWrapper) {
        this.height = this.$refs.carouselWrapper.offsetHeight.toString() + 'px'
        this.$refs.carouselItemsWrapper.style.display = 'none'
      }


    },

    setVisibleItems(width) {
      if (width >= 1000) {
        this.visibleItems = 5
        this.colClass = 'col-5'
      } else if (width < 1000 && width >= 800) {
        this.visibleItems = 4
        this.colClass = 'col-4'
      } else if (width < 800 && width >= 500) {
        this.visibleItems = 3
        this.colClass = 'col-3'
      } else if (width < 500) {
        this.visibleItems = 2
        this.colClass = 'col-2'
      }
    }

  },
  mounted() {
    this.collectProducts()

    window.addEventListener("resize", e => this.setVisibleItems(e.target.innerWidth));
    this.setVisibleItems(window.innerWidth)
  },
  beforeUnmount() {
    window.removeEventListener("resize", e => this.setVisibleItems(e.target.innerWidth));
  }

}
</script>

<style scoped lang="scss">

.products-carousel {
  margin-top: 20px;
  width: 100%;
  position: relative;
  min-height: v-bind(height);

  .products-carousel_switch {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-bottom: 10px;
  }

  .products-carousel_items {
    margin-top: 10px;
    display: flex;
    position: relative;
    align-items: stretch;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: space-between;
    box-sizing: border-box;
    gap: 10px;
    cursor: grab;

    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */


    .products-carousel_items_item {
      box-sizing: border-box;
      min-width: 0;

      &.col-5 {
        flex-basis: 18%;
      }
      &.col-4 {
        flex-basis: 23%;
      }
      &.col-3 {
        width: 32%;
      }
      &.col-2 {
        flex-basis: 48%;
      }

    }
  }
  .products-carousel_navigation {


    .prev, .next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(255,255,255, .7);
      z-index: 1;
      padding: 5px 10px 5px 10px;
      box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 20px;
      transition: .15s ease;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;

      svg {
        width: 11px;
      }

      &:hover {
        background-color: rgba(255,255,255, 1);
      }
    }
    .prev {
      left: -8px;
    }
    .next {
      right: -8px;
    }
  }
}

@media screen and (max-width: 900px){
  .products-carousel {
    width: 100%;
    .products-carousel_items {
      width: 100%;
      box-sizing: border-box;
      justify-content: space-between;

    }
  }
}

@media screen and (max-width: 500px){

}
</style>