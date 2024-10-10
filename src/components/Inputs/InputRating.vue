<template>
  <div class="rating-setter">
    <label :for="$props.input.name">
      {{ $props.input.name }}
      <svg v-show="input.tooltip" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.95281 10.8V8M7.95281 5.2H7.95993M15.0758 8C15.0758 11.866 11.8868 15 7.95281 15C4.01886 15 0.829773 11.866 0.829773 8C0.829773 4.13401 4.01886 1 7.95281 1C11.8868 1 15.0758 4.13401 15.0758 8Z" stroke="#A8A8A8" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </label>

    <div class="stars-rating" >
      <div class="star"
           v-for="(star, index) of stars"
           :class="{
             active: index < rating,
             hovered: index < hovered
           }"
           @mouseover="changeHover(index)"
           @mouseleave="changeHover(-1)"
           @click="changeRating(index)">
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="18" viewBox="0 0 19 18" fill="none">
          <path d="M8.63477 0.823678C8.86331 0.356738 8.97757 0.123269 9.1327 0.0486752C9.26767 -0.0162251 9.42447 -0.0162251 9.55944 0.0486752C9.71456 0.123269 9.82883 0.356738 10.0574 0.823677L12.2255 5.25364C12.293 5.3915 12.3267 5.46042 12.3761 5.51394C12.4197 5.56132 12.4721 5.59971 12.5302 5.62698C12.5959 5.65778 12.6713 5.6689 12.8221 5.69113L17.672 6.40607C18.1827 6.48135 18.4381 6.519 18.5563 6.6448C18.6591 6.75425 18.7074 6.90466 18.6879 7.05414C18.6654 7.22594 18.4805 7.40754 18.1108 7.77074L14.6027 11.2168C14.4933 11.3242 14.4386 11.3779 14.4033 11.4418C14.3721 11.4984 14.3521 11.5606 14.3443 11.6249C14.3356 11.6975 14.3485 11.7734 14.3743 11.9251L15.2021 16.7925C15.2894 17.3059 15.333 17.5625 15.251 17.7149C15.1796 17.8474 15.0527 17.9403 14.9057 17.9678C14.7367 17.9994 14.5081 17.8782 14.051 17.6358L9.71528 15.3362C9.58019 15.2645 9.51264 15.2287 9.44148 15.2146C9.37847 15.2022 9.31366 15.2022 9.25066 15.2146C9.17949 15.2287 9.11195 15.2645 8.97686 15.3362L4.64111 17.6358C4.184 17.8782 3.95545 17.9994 3.78645 17.9678C3.63942 17.9403 3.51254 17.8474 3.44116 17.7149C3.35913 17.5625 3.40278 17.3058 3.49008 16.7925L4.31783 11.9251C4.34364 11.7734 4.35654 11.6975 4.34781 11.6249C4.34008 11.5606 4.32004 11.4984 4.2888 11.4418C4.25352 11.3779 4.19884 11.3242 4.08948 11.2168L0.581381 7.77074C0.211639 7.40754 0.0267676 7.22594 0.0042711 7.05414C-0.0153021 6.90466 0.0330528 6.75425 0.135873 6.6448C0.254049 6.519 0.509407 6.48135 1.02012 6.40607L5.87002 5.69113C6.02084 5.6689 6.09626 5.65778 6.16193 5.62698C6.22008 5.59971 6.27243 5.56132 6.31608 5.51394C6.36539 5.46042 6.39912 5.3915 6.46659 5.25364L8.63477 0.823678Z" fill="#D8D8D8"/>
        </svg>
      </div>
    </div>
  </div>

  <input type="number"
         hidden
         :minlength="$props.input.min"
         :maxlength="$props.input.max"
         :class="{error: this.$props.error === true}"
         v-model="this.rating"
         @change="this.$emit('dataChanged', this.rating)"
         :id="$props.input.name"
         :placeholder="$props.input.placeholder">
</template>

<script>

export default {
  name: "InputText.vue",
  emits: ['dataChanged'],
  props: {
    input: {
      name: null,
      data: null

    },
    error: null,
    data: null
  },

  data() {
    return {
      inputData: null,
      hasError: false,
      stars: 5,
      rating: 0,
      hovered: 0
    }
  },

  watch: {
    data: function (newVal, oldVal) {
      this.setData()
      this.changeRating(newVal - 1)
    },
    input: function (newVal, oldVal) {
      this.setData()

    },
    error: function (newVal, oldVal) {

    }
  },

  components: {},

  methods: {
    setData () {
      this.$props.input.data ? this.inputData = this.$props.input.data : null
    },
    changeRating(count){
      this.rating = count + 1
      this.$emit('dataChanged', this.rating)
    },
    changeHover(count) {
      this.hovered = count + 1
    }
  },

  mounted() {
    if (this.$props.input.data) {
      this.setData()

      this.changeRating(this.$props.input.data - 1)
    }

  },
  updated() {

  }

}
</script>

<style scoped lang="scss">
label {
  color: #000;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  display: flex;
  gap: 5px;
  align-items: center;
  margin-bottom: 5px;
  justify-content: center;
}

input {
  color: var(--gray-2, #000);
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &::placeholder {
    color: #D8D8D8;
  }

  &.error {
    border-color: #9A2929;
  }
}
.rating-setter {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  gap: 20px;

}
.stars-rating {
  display: flex;
  justify-content: end;
  .star {
    cursor: pointer;
    padding: 0 3px;
    svg {

      path {
        transition: .15s ease;
        fill: #D8D8D8;
      }
    }

    &.active {
      svg {
        path {
          fill: black;
        }
      }
    }

    &.hovered {
      svg {
        path {
          fill: #838383;
        }
      }

      &.active {
        svg {
          path {
            fill: #575757;
          }
        }
      }
    }
  }
}
</style>