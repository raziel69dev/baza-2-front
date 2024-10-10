<template>
  <div class="links-input-wrapper">
    <div class="link-input">
      <select :value="names[0]" >
        <option v-for="name of names" @change="link.name = name" :value="name">{{name}}</option>
      </select>
      <div class="text-input-wrapper">
        <input-text :placeholder="'https://exapmle.com'"
                    @dataChanged="emit => link.link = emit" />
      </div>
    </div>

    <button-advanced @buttonPressed="checkField()">
      <div class="button-content">
        вставить ссылку в проект
      </div>
    </button-advanced>
  </div>
</template>

<script>
import inputText from "@/components/Inputs/InputText.vue";
import ButtonAdvanced from '@/components/Buttons/ButtonAdvanced.vue'
import {addNotice} from "@/js/notifications.js";

export default {
  name: "InputLinks.vue",
  data() {
    return {
      names: ['Зеркало', 'Зеркало VPN', 'Контакты','Onion', 'Блокчейн', 'Бот', 'Канал'],
      link: {
        name: 'Зеркало',
        link: null,
      }
    }
  },

  components: {
    inputText,
    ButtonAdvanced
  },

  methods: {
    checkField() {
      if (this.link.link < 10 ) {
        addNotice({name: 'Что-то ссылка коротковата', type: 'warning'})
      } else {
        if (/^(?:(?:(?:https?|ftp|http):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(this.link.link) === false) {
          addNotice({name: 'Ссылка не валидна, начните с http:// ', type: 'danger'})
        } else {
          this.$emit('dataChanged', this.link)
          this.link.link = null
        }
      }

    },
  },

  mounted() {

  }

}
</script>

<style scoped lang="scss">
.links-input-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  gap: 20px;

  .link-input {
    display: flex;
    gap: 20px;
    width: 60%;
    align-items: stretch;

    .text-input-wrapper {
      height: 45px;
    }
  }
}
</style>