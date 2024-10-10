<template>
<div>
  <div>
    <DefaultHeader>
      Привязка проекта
    </DefaultHeader>
    <p style="text-align: center; color: #5D599F">
      <span>

        <input-text
            class="mb15"
            :data="{
                placeholder: 'Введите id проекта',
                icon: projectIcon
              }"
            @keydown.enter="() => {
              this.loading = true
              this.addProjectToPlaceholder()
              }"
            @dataChanged="emit => this.projectId = emit" />
      </span>
    </p>
    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :link="'https://t.me/bitmafia_bot'"
          @click="() => {
            this.loading = true
            this.addProjectToPlaceholder()
          }">
        <TheLoader v-if="loading"/>
        <span>Привязать</span>
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
import {linkProjectWithPlaceholder, placeholders} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";
import {getProject} from "@/API/projectsController.js";
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
      closePopup,
      loading: ref(false)
    }
  },
  methods: {
    addProjectToPlaceholder() {
      console.log(this.projectId)

      linkProjectWithPlaceholder(popup.placeholderId, parseInt(this.projectId))
          .then(result => {
            addNotice({name: `Проект ${this.projectId} успешно привязан к заглушке #${popup.placeholderId}`, type: 'success'})
            getProject(this.projectId).then(result => {
              projects.find(item => item.id === popup.placeholderId).project = result.data.project
              this.loading = false
              closePopup()
            })

          })
          .catch(error => {
            let message;
            if (error.response.data.message === 'Specified project already assigned to placeholder') {
              message = 'Этот проект уже привязан к заглушке'
            } else if (error.response.data.message === 'Project not found') {
              message = 'Проект с этим айди не найден'
            } else if (error.response.data.message === 'projectId or placeholderId must be specified') {
              message = 'ID проекта не найдено'
            } else {
              message = 'Произошла ошибка'
            }
            addNotice({name: `${message}`, type: 'danger'})
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