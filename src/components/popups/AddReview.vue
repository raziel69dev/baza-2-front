<template>
<div>
  <div>
    <DefaultHeader>
      Добавить отзыв к проекту {{popup.project.name}}
    </DefaultHeader>
    <div class="rating">
      <input-rating :input="{
        name: 'Оцените проект:',
        data: null }"
                    @dataChanged="emit => this.data.rating = emit"
      />
    </div>
    <div class="comment-add">
      <input-textarea
          class="mb15 h30"
          :placeholder="'Текст отзыва (не обязательно)'"

          @dataChanged="emit => this.data.comment = emit" />


    </div>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.onReviewAdd()
          }">
        <TheLoader v-if="loading"/>
        <span>Добавить отзыв</span>
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
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import inputSelectOption from "@/components/Inputs/InputSelectOption.vue";
import {addNotice} from "@/js/notifications.js";
import {categories} from "@/Stores/categories.js";
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import InputRating from "@/components/Inputs/InputRating.vue";
import {addReview} from "@/API/reviews.js";

export default {
  components: {
    InputTextarea,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputSelectOption,
    InputRating
  },
  data() {
    return {
      popup,
      projectId: null,
      data: {
        rating: null,
        comment: null,
        projectId: null
      },
      addReview,
      placeholder: {
        placeholdersParams: [{
          style: null,
          text: null
        }],
        categoryId: null
      },
      categories,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    onReviewAdd() {
      this.data.projectId = popup.project.id
      if (!this.data.rating) {
        addNotice({name: 'Оцените проект!', type: 'warning'})
      } else {
        addReview(this.data).then(() => {
          addNotice({name: 'Отзыв добавлен! Ожидайте модерации!', type: 'success'})
        })
      }

      this.loading = false
    }

  }
}



</script>

<style scoped lang="scss">
.comment-add {
  display: flex;
  gap: 10px;
  height: 120px;
}
.buttons-group {
  display: flex;
  flex-flow: row;
  box-sizing: border-box;
}

.h30 {
  height: 50px;
}
</style>