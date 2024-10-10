<template>
  <div class="items">
    <div class="item" @click="onEdit()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M1.27237 12.5486C1.30565 12.2491 1.32229 12.0994 1.3676 11.9594C1.4078 11.8352 1.4646 11.7171 1.53646 11.6081C1.61745 11.4853 1.72399 11.3787 1.93707 11.1656L11.5027 1.60005C12.3027 0.799984 13.5999 0.799985 14.4 1.60005C15.2 2.40011 15.2 3.69727 14.4 4.49734L4.83436 14.0629C4.62127 14.276 4.51473 14.3826 4.39191 14.4635C4.28295 14.5354 4.16477 14.5922 4.04059 14.6324C3.90062 14.6777 3.75087 14.6943 3.45137 14.7276L1 15L1.27237 12.5486Z" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Редактировать</span>
    </div>

    <div class="item" @click="onRemove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16" fill="none">
        <path d="M9.66667 3.8V3.24C9.66667 2.45593 9.66667 2.06389 9.52134 1.76441C9.39351 1.50099 9.18954 1.28681 8.93865 1.15259C8.65344 1 8.28007 1 7.53333 1H6.46667C5.71993 1 5.34656 1 5.06135 1.15259C4.81046 1.28681 4.60649 1.50099 4.47866 1.76441C4.33333 2.06389 4.33333 2.45593 4.33333 3.24V3.8M1 3.8H13M11.6667 3.8V11.64C11.6667 12.8161 11.6667 13.4042 11.4487 13.8534C11.2569 14.2485 10.951 14.5698 10.5746 14.7711C10.1468 15 9.58677 15 8.46667 15H5.53333C4.41323 15 3.85318 15 3.42535 14.7711C3.04903 14.5698 2.74307 14.2485 2.55132 13.8534C2.33333 13.4042 2.33333 12.8161 2.33333 11.64V3.8" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Удалить</span>
    </div>

    <div class="item" @click="onDisapprove()">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none">
        <path d="M6.23357 2.27864C6.48128 2.24192 6.73681 2.22222 7 2.22222C10.1115 2.22222 12.1532 4.97518 12.8392 6.06417C12.9222 6.19597 12.9637 6.26188 12.9869 6.36352C13.0044 6.43986 13.0044 6.56029 12.9869 6.63663C12.9636 6.73827 12.9218 6.80461 12.8382 6.93729C12.6555 7.22731 12.3768 7.6349 12.0077 8.07695M3.78423 3.2703C2.46645 4.16659 1.57183 5.41184 1.16143 6.06323C1.07804 6.19559 1.03634 6.26177 1.0131 6.36341C0.99564 6.43974 0.995633 6.56016 1.01308 6.6365C1.03631 6.73814 1.07782 6.80404 1.16084 6.93583C1.84677 8.02482 3.88851 10.7778 7 10.7778C8.25459 10.7778 9.33527 10.3302 10.2233 9.72459M1.51452 1L12.4855 12M5.70706 5.20364C5.37617 5.53541 5.1715 5.99374 5.1715 6.5C5.1715 7.51252 5.99015 8.33333 7 8.33333C7.50492 8.33333 7.96205 8.12813 8.29294 7.79636" stroke="#B3B4C9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Снять с публикации</span>
    </div>
  </div>
</template>

<script>
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "ReviewMenu.vue",
  data() {
    return {}
  },
  props: {
    review: {}
  },

  components: {},

  methods: {
    onRemove() {
      popup.show = true
      popup.component = 'DeleteReview'
      popup.review = this.$props.review
    },
    onEdit() {
      popup.show = true
      popup.component = 'EditReview'
      popup.review = this.$props.review
    },
    onDisapprove() {
      popup.show = true
      popup.component = 'DisapproveReview'
      popup.review = this.$props.review
    }
  },

  mounted() {


  }

}
</script>

<style scoped lang="scss">
.items {
  display: flex;
  gap: 10px;

  .item {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;

    span {
      color: #B3B4C9;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      transition: .3s ease;
    }
    svg {
      path {
        transition: .3s ease;
      }
    }

    &:hover {
      span {
        color: #191B2A;
      }
      svg {
        path {
          stroke: #191B2A;
        }
      }
    }
  }
}
</style>