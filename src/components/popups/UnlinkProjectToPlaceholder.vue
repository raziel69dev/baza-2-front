<template>
<div>
  <div>
    <DefaultHeader>
      Привязка проекта
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      Вы уверены что хотите отвязать проект от заглушки? {{ popup.projectId }} / {{ popup.placeholderId }}
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.removeProjectFromPlaceholder()
          }">
        <TheLoader v-if="loading"/>
        <span>Отвязать</span>
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
import {placeholders, unlinkProjectWithPlaceholder} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";
import {projects} from "@/Stores/projectsStore.js";

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
      popup,
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    removeProjectFromPlaceholder() {
      unlinkProjectWithPlaceholder(popup.placeholderId, popup.projectId)
          .then(result => {
            addNotice({name: `Проект ${this.projectId} успешно отвязан от заглушки`, type: 'success'})
            delete projects.find(item => item.id === popup.placeholderId).project
            this.loading = false
            closePopup()
          })
          .catch(error => {
            addNotice({name: `${error.response.data.message}`, type: 'danger'})
            this.loading = false
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