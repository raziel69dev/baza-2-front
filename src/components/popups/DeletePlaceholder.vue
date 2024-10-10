<template>
<div>
  <div>
    <DefaultHeader>
      Удалить заглушку?
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы уверены что хотите удалить заглушку {{ popup.placeholder.id }}?
      <br />
      <span v-if="popup.placeholder.project">Обратите внимание что к заглушке привязан проект {{popup.placeholder.project.name}}!</span>
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          @click="() => {
            this.loading = true
            deletePlaceholder(popup.placeholder.id).then(result => {
              addNotice({name: 'Заглушка удалена', type: 'success'})
              popup.show = false
              placeholders.categoryPlaceholders.splice(placeholders.categoryPlaceholders.findIndex(item => item.id === popup.placeholder.id), 1)
            })
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
import {deletePlaceholder, placeholders, unlinkProjectWithPlaceholder} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";

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
      placeholders,
      projectId: null,
      data: {
        username: null,
        password: null
      },
      addNotice,
      deletePlaceholder,
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {

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