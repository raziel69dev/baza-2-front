<template>
  <div>
    <div class="form-wrapper">


      <div class="categories">
        <h2>
          Активные категории
        </h2>

        <div class="category-list" v-if="categories.allCategories">


          <div class="category"
               v-for="category of categories.allCategories">
            <div class="category-name">
              <svg xmlns="http://www.w3.org/2000/svg" v-if="category.name === 'Маркетплейсы'" width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M14.1625 8V5C14.1625 2.79086 12.3716 1 10.1625 1C7.95334 1 6.16248 2.79086 6.16248 5V8M1.75448 9.35196L1.15448 15.752C0.983885 17.5717 0.898586 18.4815 1.20053 19.1843C1.46578 19.8016 1.9306 20.3121 2.5205 20.6338C3.192 21 4.10585 21 5.93353 21H14.3914C16.2191 21 17.133 21 17.8045 20.6338C18.3944 20.3121 18.8592 19.8016 19.1244 19.1843C19.4264 18.4815 19.3411 17.5717 19.1705 15.752L18.5705 9.35197C18.4264 7.81535 18.3544 7.04704 18.0088 6.46616C17.7045 5.95458 17.2548 5.54511 16.7171 5.28984C16.1065 5 15.3348 5 13.7914 5L6.53353 5C4.99017 5 4.21849 5 3.6079 5.28984C3.07014 5.54511 2.62049 5.95458 2.31614 6.46616C1.97057 7.04704 1.89854 7.81534 1.75448 9.35196Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Услуги'"  width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M10.5 4H10.9344C13.9816 4 15.5053 4 16.0836 4.54729C16.5836 5.02037 16.8051 5.71728 16.6702 6.39221C16.514 7.17302 15.2701 8.05285 12.7823 9.81253L8.71772 12.6875C6.2299 14.4471 4.98599 15.327 4.82984 16.1078C4.69486 16.7827 4.91642 17.4796 5.41636 17.9527C5.99474 18.5 7.51836 18.5 10.5656 18.5H11.5M7 4C7 5.65685 5.65685 7 4 7C2.34315 7 1 5.65685 1 4C1 2.34315 2.34315 1 4 1C5.65685 1 7 2.34315 7 4ZM21 18C21 19.6569 19.6569 21 18 21C16.3431 21 15 19.6569 15 18C15 16.3431 16.3431 15 18 15C19.6569 15 21 16.3431 21 18Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Форумы'"  width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5.09436 10.2288C5.03221 9.82823 4.99996 9.41786 4.99996 9C4.99996 4.58172 8.60525 1 13.0526 1C17.4999 1 21.1052 4.58172 21.1052 9C21.1052 9.99807 20.9213 10.9535 20.5852 11.8345C20.5154 12.0175 20.4804 12.109 20.4646 12.1804C20.4489 12.2512 20.4428 12.301 20.4411 12.3735C20.4394 12.4466 20.4493 12.5272 20.4692 12.6883L20.8717 15.9585C20.9153 16.3125 20.9371 16.4895 20.8782 16.6182C20.8266 16.731 20.735 16.8205 20.6211 16.8695C20.4911 16.9254 20.3146 16.8995 19.9617 16.8478L16.7765 16.3809C16.6101 16.3565 16.527 16.3443 16.4512 16.3448C16.3763 16.3452 16.3245 16.3507 16.2511 16.3661C16.177 16.3817 16.0823 16.4172 15.893 16.4881C15.0097 16.819 14.0524 17 13.0526 17C12.6344 17 12.2237 16.9683 11.8227 16.9073M6.63158 21C9.59648 21 12 18.5376 12 15.5C12 12.4624 9.59648 10 6.63158 10C3.66668 10 1.26316 12.4624 1.26316 15.5C1.26316 16.1106 1.36028 16.6979 1.53955 17.2467C1.61533 17.4787 1.65322 17.5947 1.66566 17.6739C1.67864 17.7567 1.68091 17.8031 1.67608 17.8867C1.67145 17.9668 1.65141 18.0573 1.61134 18.2383L1 21L3.9948 20.591C4.15827 20.5687 4.24 20.5575 4.31137 20.558C4.38652 20.5585 4.42641 20.5626 4.50011 20.5773C4.5701 20.5912 4.67416 20.6279 4.88227 20.7014C5.43059 20.8949 6.01911 21 6.63158 21Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else-if="category.name === 'Обменники'"  width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M5 5L7 3M7 3L5 1M7 3H5C2.79086 3 1 4.79086 1 7M17 17L15 19M15 19L17 21M15 19H17C19.2091 19 21 17.2091 21 15M9.18903 5.5C9.85509 2.91216 12.2042 1 15 1C18.3137 1 21 3.68629 21 7C21 9.79574 19.0879 12.1449 16.5001 12.811M13 15C13 18.3137 10.3137 21 7 21C3.68629 21 1 18.3137 1 15C1 11.6863 3.68629 9 7 9C10.3137 9 13 11.6863 13 15Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" v-else  width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M1.5 9H4.88197C5.56717 9 6.19357 9.38713 6.5 10C6.80643 10.6129 7.43283 11 8.11803 11H13.882C14.5672 11 15.1936 10.6129 15.5 10C15.8064 9.38713 16.4328 9 17.118 9H20.5M7.96656 1H14.0334C15.1103 1 15.6487 1 16.1241 1.16396C16.5445 1.30896 16.9274 1.5456 17.2451 1.85675C17.6043 2.2086 17.8451 2.6902 18.3267 3.65337L20.4932 7.9865C20.6822 8.36449 20.7767 8.55348 20.8434 8.75155C20.9026 8.92745 20.9453 9.10847 20.971 9.29226C21 9.49923 21 9.71053 21 10.1331V12.2C21 13.8802 21 14.7202 20.673 15.362C20.3854 15.9265 19.9265 16.3854 19.362 16.673C18.7202 17 17.8802 17 16.2 17H5.8C4.11984 17 3.27976 17 2.63803 16.673C2.07354 16.3854 1.6146 15.9265 1.32698 15.362C1 14.7202 1 13.8802 1 12.2V10.1331C1 9.71053 1 9.49923 1.02897 9.29226C1.05471 9.10847 1.09744 8.92745 1.15662 8.75155C1.22326 8.55348 1.31776 8.36448 1.50675 7.9865L3.67331 3.65337C4.1549 2.69019 4.3957 2.2086 4.75495 1.85675C5.07263 1.5456 5.45551 1.30896 5.87589 1.16396C6.35125 1 6.88969 1 7.96656 1Z" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>


              <input type="text"
                     @keydown.enter="editCategory(category.id, category.name).then(result => this.editMode = false)"
                     v-if="editMode === category.id"
                     v-model="category.name"
              >
              <span class="name"
                    @click="editMode = category.id"
                    v-else>
              {{ category.name }}
            </span>
            </div>



            <div class="edit-menu">
              <div class="edit" @click="() => {
              this.editMode = category.id
              // this.$refs.cat[category.id].focus()
            }" v-if="editMode !==  category.id">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                  <path d="M1.13619 6.77432C1.15283 6.62457 1.16115 6.54969 1.1838 6.47971C1.2039 6.41761 1.2323 6.35853 1.26823 6.30404C1.30873 6.24263 1.362 6.18936 1.46854 6.08282L6.25134 1.30002C6.65137 0.899992 7.29995 0.899992 7.69998 1.30002C8.10001 1.70006 8.10001 2.34864 7.69998 2.74867L2.91718 7.53146C2.81064 7.638 2.75737 7.69128 2.69596 7.73177C2.64147 7.7677 2.58238 7.7961 2.52029 7.8162C2.45031 7.83885 2.37543 7.84717 2.22568 7.86381L1 8L1.13619 6.77432Z" stroke="#D8D8D8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Редактировать
              </div>

              <div class="edit" @click="editCategory(category.id, category.name).then(result => this.editMode = false)" v-if="editMode === category.id">
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 1V4.4C5 4.96005 5 5.24008 5.10899 5.45399C5.20487 5.64215 5.35785 5.79513 5.54601 5.89101C5.75992 6 6.03995 6 6.6 6H13.4C13.9601 6 14.2401 6 14.454 5.89101C14.6422 5.79513 14.7951 5.64215 14.891 5.45399C15 5.24008 15 4.96005 15 4.4V2M15 19V12.6C15 12.0399 15 11.7599 14.891 11.546C14.7951 11.3578 14.6422 11.2049 14.454 11.109C14.2401 11 13.9601 11 13.4 11H6.6C6.03995 11 5.75992 11 5.54601 11.109C5.35785 11.2049 5.20487 11.3578 5.10899 11.546C5 11.7599 5 12.0399 5 12.6V19M19 7.32548V14.2C19 15.8802 19 16.7202 18.673 17.362C18.3854 17.9265 17.9265 18.3854 17.362 18.673C16.7202 19 15.8802 19 14.2 19H5.8C4.11984 19 3.27976 19 2.63803 18.673C2.07354 18.3854 1.6146 17.9265 1.32698 17.362C1 16.7202 1 15.8802 1 14.2V5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H12.6745C13.1637 1 13.4083 1 13.6385 1.05526C13.8425 1.10425 14.0376 1.18506 14.2166 1.29472C14.4184 1.4184 14.5914 1.59135 14.9373 1.93726L18.0627 5.06274C18.4086 5.40865 18.5816 5.5816 18.7053 5.78343C18.8149 5.96237 18.8957 6.15746 18.9447 6.36154C19 6.59171 19 6.8363 19 7.32548Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                Сохранить
              </div>

              <div class="delete" @click="() => {
              modal.show = true
              modal.deleteCatName = category.name
              modal.deleteCatId = category.id
            }">
                <svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
                  <path d="M5.33333 2.4V2.12C5.33333 1.72796 5.33333 1.53194 5.26067 1.38221C5.19676 1.25049 5.09477 1.14341 4.96933 1.0763C4.82672 1 4.64004 1 4.26667 1H3.73333C3.35996 1 3.17328 1 3.03067 1.0763C2.90523 1.14341 2.80324 1.25049 2.73933 1.38221C2.66667 1.53194 2.66667 1.72796 2.66667 2.12V2.4M1 2.4H7M6.33333 2.4V6.32C6.33333 6.90806 6.33333 7.20208 6.22434 7.42669C6.12847 7.62426 5.97549 7.78489 5.78732 7.88556C5.57341 8 5.29339 8 4.73333 8H3.26667C2.70661 8 2.42659 8 2.21268 7.88556C2.02451 7.78489 1.87153 7.62426 1.77566 7.42669C1.66667 7.20208 1.66667 6.90806 1.66667 6.32V2.4" stroke="#D8D8D8" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Удалить
              </div>
            </div>



          </div>
        </div>

        <div v-else-if="!categoriesStore.categories">
          <h4 style="text-align: center; width: 100%; margin-top: 20px;">Произошла ошибка получения списка категорий, пожалуйста повторите попытку позже или перезагрузите страницу</h4>

        </div>

      </div>


      <h2 class="mt">
        Добавить категорию
      </h2>

      <div class="form">
        <div>
          <input-text
              :inputDataProp="null"
              :placeholder="'Введите название категории....'"
              @returnData="emit => this.categoryName  = emit"
          />
        </div>
        <div>
<!--          <input-checkbox-->
<!--              :input="inputs.front"-->
<!--              :data="inputs.front.data"-->
<!--              @checkboxChanged="emit => this.allowShopfront = emit"-->
<!--          />-->
        </div>

        <button-black

            :style="'filled'">
          <div class="button-content">
            Добавить категорию
          </div>
        </button-black>

      </div>

    </div>
  </div>

</template>

<script>
import {categories} from "@/Stores/categories.js";
import {userStore} from "@/Stores/userStore.js";
import InputText from "@/components/Inputs/InputText.vue";
import ButtonBlack from "@/components/Buttons/ButtonBlack.vue";

export default {
  name: "CategoryEditor.vue",
  components: {
    InputText,
    ButtonBlack
  },

  emits: [],

  data () {
    return {
      editMode: 0,
      allowShopfront: true,
      modal: {
        show: false,
        deleteCatName: null,
        deleteCatId: null
      },
      notice: {
        show: false,
        color: null,
        text: {}
      },
      errors: {},
      categoryName: null,
      categories,
      userStore
    }
  },
  mounted() {

  },
  created() {

  },

  methods: {
    addCategory() {
      if (!this.categoryName || this.categoryName.length < 0) {
        this.notice.show = true
        this.notice.text.lengthErr = 'Введите название категории'
      } else {
        // addCategory(this.categoryName, this.allowShopfront).then(result => {
        //   getCategories()
        // }).catch(err => {
        //   this.notice.show = true
        //   err.response.data.message === "Invalid token" ? this.notice.text.axiosErr = "Токен не валдиный, перелогиньтесь" : this.notice.text.axiosErr = err.response.data.message
        //
        // })
      }
    }
  }
}
</script>

<style scoped lang="scss">


.state-message {
  color: #0b5348;
}
.form {
  width: 100%;
  gap: 30px;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 10px;
  display: flex;
  div {
    width: 100%;
  }
}


.category-list {

  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;

  .category {
    width: 47%;
    margin-top: 10px;
    display: flex;
    align-items: center;

    padding: 10px;
    justify-content: space-between;

    .category-name {
      flex-wrap: nowrap;
      display: flex;
      gap: 10px;
      align-items: center;

      span {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      input {
        width: 100%;
        padding: 2px 10px;
        position: relative;
        font-size: 12px;
        margin: 0;
      }
    }


    .edit-menu {
      gap: 20px;
      display: flex;
      cursor: pointer;


      .edit, .delete {
        color: var(--gray-2, #D8D8D8);

        font-size: 10px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        transition: .3s ease;

        &:hover {
          color: #6B6B6B;

          svg {
            path {
              stroke: #6B6B6B;
            }
          }
        }

        svg {
          path {
            stroke-width: 1px;
            stroke: var(--gray-2, #D8D8D8);
            transition: .3s ease;
          }
        }
      }
    }


    .id {
      font-weight: 300;
      opacity: .5;
    }

  }
}
@media screen and (max-width: 500px){
  .category-list {
    .category {
      width: 100%;
    }
  }

}
.allowFront {
  padding-left: 10px;
  display: flex;
  width: 100%;
  justify-content: start;
  position: relative;

  input {
    transform: scale(1.1);
    width: 25px;
    margin-right: 20px;
    height: 25px;
    display: none;
  }

  .text {
    color: #000;

    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0px 30px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #000000;
  }

  /* On mouse-over, add a grey background color */
  input ~ .checkmark {
    background-color: #c5c5c5;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: #ffdc50;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid #000000;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
}

@media screen and (max-width: 768px) {

  .form {
    flex-wrap: wrap;
    width: 100%;
  }
  .allowFront {
    width: 100%;
    label {
      font-size: 16px;
    }
  }
  .btn {
    width: 100%;
    justify-content: center;
  }



}
.mt {
  margin-top: 30px;
}
</style>