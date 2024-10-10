<template>
  <div class="project-form">
    <h2 class="heading2">Добавить проект</h2>
    <div class="project-banner">
      <input-file @dataChanged="emit => project.bannerFilePath = emit">
        Загрузите баннер профиля вашего проекта в размере 1600x220px или оставьте поле пустым
      </input-file>
    </div>
    <div class="project-info">
      <div class="project-avatar">
        <input-file @dataChanged="emit => project.avatarFilePath = emit">
          Загрузите аватар вашего сервиса макс размер 400x400px
        </input-file>
      </div>
      <div class="project-name-description">
        <div class="project-name">
          <input-text
              :placeholder="'Введите название проекта....'"
              @dataChanged="emit => project.name = emit">

          </input-text>
        </div>

        <div class="project-description">
          <input-textarea
              :placeholder="'Введите описание проекта...'"
              @dataChanged="emit => project.description = emit"
          >

          </input-textarea>
        </div>
      </div>

    </div>
    <div class="project-categories">
      <h4>Выбор категории проекта</h4>
      <div class="categories">

        <div class="category"
             v-for="category of categories.allCategories"
             :class="{selected: project.categoryIds.includes(category.id)}"
             :key="category.id"
             @click="categoryControl(category.id)">
          <div class="category-icon">
            <inline-svg class="categoryIcon" :src="category.icon" />
          </div>
          <div class="category-name">
            {{ category.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="exchanger-data" v-if="this.project.categoryIds.includes(categories.exchangerCategory[0].id)">
      <div class="fields-name">
        Доп информация для обмеников:
      </div>
      <div class="exchanger-input">
        <input-text :placeholder="'Минимальный обмен в рублях...'"
                    @dataChanged="emit => project.minValueToExchange = emit" />
      </div>
      <div class="exchanger-input">
        <input-text :placeholder="'Резерв валюты в рублях...'"
                    @dataChanged="emit => project.reserve = emit" />
      </div>

    </div>

    <div class="add-links">
      <h4>Ссылки на проект</h4>
      <div class="adder">
        <input-links @dataChanged="emit => project.links.push(emit)"/>
      </div>
      <div class="links">
        <project-link-item :data="link"
                           v-for="(link, index) of project.links"
                           :key="link"
                           v-show="index < 2"
        >
        </project-link-item>
      </div>
    </div>

    <button-advanced @buttonPressed="checkForm()" style="margin-top: 20px;">
      <div class="button-content">
        Добавить проект
      </div>
    </button-advanced>
  </div>
</template>

<script>
import InputFile from "@/components/Inputs/InputFile.vue";
import InputText from "@/components/Inputs/InputText.vue";
import InputTextarea from "@/components/Inputs/InputTextarea.vue";
import ButtonAdvanced from "@/components/Buttons/ButtonAdvanced.vue"
import {categories} from "@/Stores/categories.js";
import {addNotice} from "@/js/notifications.js";
import projectLinkItem from "@/components/Layout/Project/ProjectLinkItem.vue";
import InputLinks from "@/components/Inputs/InputLinks.vue";
import {addProject} from "@/API/projectsController.js";
import {userStore} from "@/Stores/userStore.js";
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "Project_Add.vue",
  components: {
    ButtonAdvanced,
    InputFile,
    InputText,
    InputTextarea,
    projectLinkItem,
    InputLinks
  },

  data () {
    return {
      error: false,
      categories,
      project: {
        name: null,
        categoryIds: [3],
        description: null,
        avatarFilePath: null,
        bannerFilePath: null,
        links: []
      }
    }
  },

  methods: {
    categoryControl (categoryId) {
      if (!this.project.categoryIds.includes(categoryId)) {
        this.project.categoryIds.push(categoryId)
      } else {
        this.project.categoryIds.splice(this.project.categoryIds.indexOf(categoryId), 1)
      }

    },
    checkForm() {
      this.error = false

      if (!this.project.name || this.project.name.length < 3) {
        addNotice({name: 'Имя проекта должно быть больше 3х символов', type: 'warning'})
        this.error = true
      }
      if (!this.project.name || this.project.description.length < 15) {
        addNotice({name: 'Описание проекта должно быть больше 15и символов', type: 'warning'})
        this.error = true
      }
      if (this.project.categoryIds.length <= 0) {
        addNotice({name: 'Не выбрана категория', type: 'warning'})
        this.error = true
      }
      if (this.project.links.length <= 0) {
        addNotice({name: 'Не добавлено ни одной ссылки', type: 'warning'})
        this.error = true
      }
      if (!this.project.avatarFilePath) {
        addNotice({name: 'Не загружен аватар', type: 'warning'})
        this.error = true
      }

      if (!this.error) {
        addProject(this.project)
        this.$router.replace('/')
      }

    }

  },
  mounted() {
    if (!userStore.token) {
      this.$router.replace('/')
      popup.show = true
      popup.component = 'SignIn'
    }
  }
}
</script>

<style scoped lang="scss">
.project-form {
  .project-banner {
    width: 100%;
    margin-bottom: 20px;
    min-height: 80px;
  }
  .project-info {
    display: flex;
    gap: 20px;
    align-items: stretch;

    .project-avatar {
      width: 180px;
      height: 180px;

    }

    .project-name-description {
      width: 84%;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .project-name, .project-description {
        width: 100%;
        height: 50px;
      }
      .project-description {
        height: 120px;
      }
    }

  }

  .project-categories {
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;
    h4 {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .categories {
      display: flex;
      gap: 10px;
      justify-content: space-around;
      align-items: stretch;

      .category {
        cursor: pointer;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 20px;
        transition: .3s ease;
        opacity: .5;
        background-color: transparent;
        align-items: center;
        text-align: center;

        .category-name {
          color: #5D599F;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        &.selected {
          background-color: #FFFFFF;
          opacity: 1;
          box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
        }
      }

    }
  }
  .exchanger-data {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    justify-content: space-around;
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;

    .fields-name {
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .exchanger-input {
      width: 391px;
      height: 56px;
      flex-shrink: 0;
    }

  }
  .add-links {
    margin-top: 20px;
    border-radius: 20px;
    border: 2px dashed #B3B4C9;
    background: #F8F7FC;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;

    h4 {
      margin-bottom: 10px;
      width: 100%;
      text-align: center;
      color: #B3B4C9;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    .adder {
      display: flex;

      .links-input-wrapper {
        height: 40px;
      }


    }
  }
}
</style>