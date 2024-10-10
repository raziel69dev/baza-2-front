<template>
<div>
  <div>
    <DefaultHeader>
      {{ popup.project.name }}
    </DefaultHeader>
    <h2 class="heading2">Ссылки на проект</h2>
    <div class="links">
      <project-link-item :data="link"
                         v-for="(link, index) of popup.project.links"
                         :key="link"
                         v-show="index < 2"
                         @click.stop
      >
      </project-link-item>
    </div>
    <div class="buttons-group">

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="closePopup()">
        <div class="button-content">
          Закрыть окно
        </div>
      </ButtonSecondary>

    </div>


  </div>

</div>
</template>

<script>
import InputText from "@/components/Inputs/InputText.vue";
import InputPassword from "@/components/Inputs/InputPassword.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import ProjectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";

export default {
  components: {
    InputText,
    InputPassword,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    DefaultHeader,
    closePopup,
    ProjectLinkItem
  },
  data() {
    return {
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
  box-sizing: border-box;
  .button-wrapper {
    width: 50%;
  }
}
h2 {
  margin-top: 10px;
}


.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}
</style>