<template>

  <div class="placeholders">
    <h2 class="heading2">Редактор заглушек (в разработке)</h2>

    <div class="selectCategory">

      <div class="category"
           @click="changeCategory()">
        <svg class="categoryIcon" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 20V12.6C7 12.0399 7 11.7599 7.10899 11.546C7.20487 11.3578 7.35785 11.2049 7.54601 11.109C7.75992 11 8.03995 11 8.6 11H11.4C11.9601 11 12.2401 11 12.454 11.109C12.6422 11.2049 12.7951 11.3578 12.891 11.546C13 11.7599 13 12.0399 13 12.6V20M9.0177 1.764L2.23539 7.03912C1.78202 7.39175 1.55534 7.56806 1.39203 7.78886C1.24737 7.98444 1.1396 8.20478 1.07403 8.43905C1 8.70352 1 8.9907 1 9.56505V16.8C1 17.9201 1 18.4801 1.21799 18.908C1.40973 19.2843 1.71569 19.5903 2.09202 19.782C2.51984 20 3.07989 20 4.2 20H15.8C16.9201 20 17.4802 20 17.908 19.782C18.2843 19.5903 18.5903 19.2843 18.782 18.908C19 18.4801 19 17.9201 19 16.8V9.56505C19 8.9907 19 8.70352 18.926 8.43905C18.8604 8.20478 18.7526 7.98444 18.608 7.78886C18.4447 7.56806 18.218 7.39175 17.7646 7.03913L10.9823 1.764C10.631 1.49075 10.4553 1.35412 10.2613 1.3016C10.0902 1.25526 9.9098 1.25526 9.73865 1.3016C9.54468 1.35412 9.36902 1.49075 9.0177 1.764Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

        <span class="categoryName">Главная</span>
      </div>

      <div class="category"
           @click="changeCategory(category.id)"
           v-for="category of categories.allCategories">
        <inline-svg :src="category.icon" class="categoryIcon" />
        <span class="categoryName">{{ category.name }}</span>
      </div>

    </div>

    <div class="stats">
      <div class="stats-count">
        Заглушек в категории:
        <span>{{ placeholders.categoryPlaceholders.length }}</span>
      </div>

      <button-black
          @buttonPressed="callAddPlaceholdersPopup()"
      >
        Добавить
      </button-black>

    </div>

    <div class="projects">

        <div class="project-placeholder" v-for="placeholder of placeholders.categoryPlaceholders">
          <ThePlaceholder :placeholder="placeholder"


          />
        </div>


    </div>

  </div>

</template>

<script>
import {addNotice} from "@/js/notifications.js";
import {getPlaceholders, placeholders, setPlaceholdersCount} from "@/API/placeholders.js";
import {categories} from "@/Stores/categories.js";
import ThePlaceholder from "@/components/Layout/Project/ThePlaceholder.vue";
import buttonBlack from "@/components/Buttons/ButtonBlack.vue";
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "PayedProjectsController",
  data() {
    return {
      categories,
      placeholders,
      categoryId: null,
      placeholdersCount: 0,
      editPlaceholderCount: {
        show: false,
        newCount: 0
      },
      popup
    }
  },

  components: {
    ThePlaceholder,
    buttonBlack
  },

  methods: {
    changeCategory(categoryId) {
      this.onGetPlaceholders(categoryId)
    },
    callAddPlaceholdersPopup() {
      popup.show = true
      popup.component = 'AddPlaceholders'
    },
    onGetPlaceholders(categoryId) {
      getPlaceholders(categoryId)
          .then(result => {
            placeholders.categoryPlaceholders = result.data.placeholders
          })
          .catch(error => {
            let message
            if (error.response.data.message === 'No Placeholders found for main page') {
              message = 'Нет заглушек для главной страницы'
            } else if (error.response.data.message === 'No Placeholders found for specified category') {
              message = 'Нет заглушек для этой категории'
            } else {
              message = error.response.data.message
            }

            addNotice({name: message, type: 'danger'})
            this.placeholdersCount = 0
          })
    }
  },

  mounted() {
    this.onGetPlaceholders()

  }

}
</script>

<style scoped lang="scss">

.placeholders {
  .stats {
    margin: 20px auto 0;
    width: 40%;
    text-align: center;
    color: #5D599F;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    display: flex;
    align-items: center;
    justify-content: center;

    .stats-count {
      display: block;
      width: 100%;
    }

  }
  .selectCategory {
    display: flex;
    justify-content: space-around;
    padding: 0 20px;
    border-radius: 44.5px;
    background: #FFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;

    .category {
      cursor: pointer;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 20px;
      margin-bottom: 20px;
      transition: .3s ease;

      span {
        color: #B3B4C9;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        cursor: pointer;
        transition: 0.3s ease;
        text-align: center;
        width: 100%;
        display: block;
      }
      &:hover {
        span {
          color: #1e1e1e;
        }
      }
    }


  }
}
.projects {
  display: flex;
  margin-top: 30px;
  justify-content: start;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;


  .project-placeholder {
    width: 24%;
  }
}

</style>