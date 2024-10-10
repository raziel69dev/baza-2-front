<template>
  <div>
    <div>
      <DefaultHeader>
        Выйти из аккаунта?
      </DefaultHeader>
      <p>Вы действительно хотите выйти из аккаунта?<br> Убедитесь что вы сохранили логин и пароль.</p>

      <div class="buttons-group">
        <ButtonPrimary
            :type="'button'"
            style="margin-top: 10px;"
            @click="signOut(); closePopup()">
          <span>Выйти</span>
        </ButtonPrimary>

        <ButtonSecondary
            style="margin-top: 10px;"
            @click.stop
            @click="closePopup()">
          <span>Остаться на базе</span>
        </ButtonSecondary>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import DefaultHeader from "@/components/Blocks/DefaultHeader.vue";
import {signOut} from "@/Stores/userStore.js";
import {closePopup} from "@/js/controllers/popupController.js";

const data = {
  username: null,
  password: null,
  repeat: null
}


</script>

<style scoped>
p {
  text-align: center;
  width: 100%;
}
</style>