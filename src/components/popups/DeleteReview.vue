<template>
<div>
  <div>
    <DefaultHeader>
      Удалить отзыв?
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы уверены что хотите удалить отзыв {{ popup.review.comment }} от {{ popup.review.anonId || popup.review.userData.username }}?
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          @click="() => {
            this.loading = true
            onDeleteReview()
          }">
        <TheLoader v-if="loading"/>
        <span>Удалить</span>
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
import {deleteReview, disapproveReview} from "@/API/reviews.js";
import {reviewsStore} from "@/Stores/reviewsStore.js";

export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup
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
      deleteReview,
      addNotice,
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    onDeleteReview() {
      deleteReview(popup.review)
        .then(result => {
          reviewsStore.splice(reviewsStore.findIndex(item => item.id === popup.review.id), 1)
          addNotice({name: `Отзыв от ${popup.review.anonId || popup.review.userData.username} успешно удален`, type: 'success'})
        })
        .catch(error => {
          addNotice({name: 'Произошла ошибка', type: 'danger'})
        })
      popup.show = false
    },
    onDisapprove() {
      disapproveReview(popup.review)
          .then(result => {
            reviewsStore.splice(reviewsStore.findIndex(item => item.id === popup.review.id), 1)
            addNotice({name: `Отзыв от ${popup.review.anonId || popup.review.userData.username} успешно отклонен`, type: 'success'})
          })
          .catch(error => {
            addNotice({name: 'Произошла ошибка', type: 'danger'})
          })
    }

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