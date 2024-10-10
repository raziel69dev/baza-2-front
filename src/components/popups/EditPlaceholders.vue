<template>
<div>
  <div>
    <DefaultHeader>
      Изменить заглушку
    </DefaultHeader>
    <div class="placeholder-add">
      <input-text
          class="mb15 h30"
          :data="{
                placeholder: 'Надпись',
                icon: nameIcon
              }"
          @keydown.enter="() => {
              this.loading = true
              this.onEditPlaceholder()
              }"
          :inputDataProp="popup.placeholder.text"
          @dataChanged="emit => this.placeholder.placeholdersParams.text = emit" />

<!--      <input-select-option-->
<!--          class="mb15"-->
<!--          :data="{-->
<!--                placeholder: 'Цвет',-->
<!--                icon: colorIcon,-->
<!--                name: 'Цвет',-->
<!--                data: placeholderColors-->
<!--              }"-->
<!--          @dataChanged="emit => this.placeholder.placeholdersParams.style = emit.value" />-->

<!--      <input-select-option-->
<!--          class="mb15"-->
<!--          :data="{-->
<!--                placeholder: 'Категория',-->
<!--                icon: colorIcon,-->
<!--                name: 'Категория',-->
<!--                data: allCats-->
<!--              }"-->
<!--          @dataChanged="emit => this.placeholder.placeholdersParams.categoryId = emit.id" />-->

    </div>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.onEditPlaceholder()
          }">
        <TheLoader v-if="loading"/>
        <span>Изменить заглушку</span>
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
import nameIcon from '@/assets/icons/icon-edit-4.svg'
import colorIcon from '@/assets/icons/icon-color.svg'
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import inputText from "@/components/Inputs/InputText.vue";
import inputSelectOption from "@/components/Inputs/InputSelectOption.vue";
import {addPlaceholders, editPlaceholder, linkProjectWithPlaceholder, placeholders} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";
import {categories} from "@/Stores/categories.js";
import {placeholderColors} from "@/js/placeholderColors.js";

export default {
  components: {
    inputText,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    inputSelectOption
  },
  data() {
    return {
      nameIcon,
      colorIcon,
      popup,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      placeholder: {
        placeholdersParams: {
          text: null
        },
        categoryId: null
      },
      allCats: [],
      closePopup,
      placeholderColors,
      loading: ref(false)
    }
  },
  methods: {
    onEditPlaceholder() {

      editPlaceholder(this.placeholder.placeholdersParams)
          .then(result => {
            addNotice({name: 'Заглушка успешно изменена', type: 'success'})
            this.loading = false

            placeholders.categoryPlaceholders.find(item => item.id === popup.placeholder.id).text = this.placeholder.placeholdersParams.text

            popup.show = false

          })
          .catch(error => {
            popup.show = false
            this.loading = false
          })
    }

  },
  mounted() {
    this.placeholder.placeholdersParams.placeholderId = popup.placeholder.id
    for (let cats of categories.allCategories) {
      this.allCats.push(cats)
    }

    this.allCats.push({
      name: 'Главная'
    })
  }
}



</script>

<style scoped lang="scss">
.placeholder-add {
  display: flex;
  gap: 10px;
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