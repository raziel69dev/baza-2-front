<template>
<div>
  <div>
    <DefaultHeader>
      Редактор отзыва
    </DefaultHeader>
    <div class="form">
      <input-rating :input="{
        name: 'Оцените проект:',
        data: popup.review.rating }"
        @dataChanged="emit => popup.review.rating = emit"
      />
      <input-text
          class="mb15"
          :data="{
          placeholder: 'Текст отзыва',
          }"
          :input-data-prop="popup.review.comment"
          @dataChanged="emit => popup.review.comment = emit" />
    </div>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          @click="() => {
            this.loading = true
            onEditReview()
          }">
        <TheLoader v-if="loading"/>
        <span>Изменить</span>
      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
        <span>Отмена</span>
      </ButtonSecondary>



    </div>


  </div>

</div>
</template>

<script>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import projectIcon from '@/assets/icons/projectIcon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup} from "@/js/controllers/popupController.js";
import inputText from "@/components/Inputs/InputText.vue";
import {popup} from "@/js/controllers/popupController.js";
import {addNotice} from "@/js/notifications.js";
import {editReview} from "@/API/reviews.js";
import {reviewsStore} from "@/Stores/reviewsStore.js";
import inputRating from "@/components/Inputs/InputRating.vue";

export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputRating
  },
  data() {
    return {
      projectIcon,
      lockIcon,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      addNotice,
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    onEditReview() {
      editReview(popup.review)
        .then(result => {
          reviewsStore.find(item => item.id === popup.review.id).rating = popup.review.rating
          reviewsStore.find(item => item.id === popup.review.id).comment = popup.review.comment
          addNotice({name: `Отзыв от ${popup.review.anonId || popup.review.userData.username} успешно изменен`, type: 'success'})
          popup.show = false
        })
        .catch(error => {
          addNotice({name: 'Произошла ошибка', type: 'danger'})
        })

    },

  }
}



</script>

<style scoped lang="scss">
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}
</style>