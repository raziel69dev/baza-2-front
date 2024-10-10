<template>
<div>
  <form

      @submit.prevent="null"

  >
    <auth-header />
    <input-text
        class="mb15"
        :data="{
          placeholder: 'Введите ваш логин',
          icon: userIcon,
          name: 'username'
        }"
        @dataChanged="emit => data.username = emit" />

    <input-password
        :data="{
          placeholder: 'Введите ваш пароль',
          icon: lockIcon,
          name: 'password'
        }"
        @passwordData="emit => data.password = emit" />

    <div class="buttons-group">
      <ButtonPrimary
          :type="'button'"
          style="margin-top: 10px;"
          :disabled="loading || data.password === '' || data.username === '' "
          @click="() => {
            loading = true
            onSubmit(this.data)
          }">
        <TheLoader v-if="loading"/>
        <span>Войти</span>
      </ButtonPrimary>

      <ButtonSecondary
          style="margin-top: 10px;"
          :disabled="loading"
          @click.stop
          @click="$emit('changeState', 'SignUp')">
        <span>Нет аккаунта?</span>
      </ButtonSecondary>



    </div>


  </form>



</div>
</template>

<script>
import InputText from "@/components/Inputs/InputText.vue";
import InputPassword from "@/components/Inputs/InputPassword.vue";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.vue";
import ButtonSecondary from "@/components/Buttons/ButtonSecondary.vue";
import {ref} from "vue";
import {signIn} from "@/API/authController.js";
import {closePopup, popup} from "@/js/controllers/popupController.js";
import userIcon from '@/assets/icons/user-icon.svg'
import lockIcon from '@/assets/icons/lock-icon.svg'
import AuthHeader from "@/components/Blocks/AuthHeader.vue";
import {addNotice, removeAllNotices} from "@/js/notifications.js";
import {setUserData} from "@/Stores/userStore.js";


export default {
  components: {
    InputText,
    InputPassword,
    TheLoader,
    ButtonPrimary,
    ButtonSecondary,
    AuthHeader
  },
  data() {
    return {
      userIcon,
      lockIcon,
      data: {
        username: null,
        password: null
      },
      loading: ref(false)
    }
  },
  methods: {
    async onSubmit(userData) {
      removeAllNotices()
      signIn(userData).then(result => {
        addNotice({name: 'Вы успешно авторизовались', type: 'success'})
        setUserData({username: this.data.username, token: result.data.token})
        this.loading = false
        closePopup()
      }).catch(err => {
        if (err.response) {
          if (err.response.data.message === 'User not found') {
            addNotice({name: 'Пользователь не найден', type: 'danger'})

          } else if (err.response.data.message === 'Invalid credentials') {
            addNotice({name: 'Неверный пароль', type: 'danger'})
          } else {
            addNotice({name: err.response.status + ', ' + err.response.statusText, type: 'danger'})
          }
        } else {
          if (err.code === "ECONNABORTED") {
            addNotice({name: 'Таймаут соединения, попробуйте позже', type: 'danger'})
          } else if ( err.code === "ERR_NETWORK"){
            addNotice({name: 'Нет соединения', type: 'danger'})
          } else {
            addNotice({name: err, type: 'danger'})
          }
        }
        this.loading = false


      })

    }
  }
}



</script>

<style scoped>

</style>