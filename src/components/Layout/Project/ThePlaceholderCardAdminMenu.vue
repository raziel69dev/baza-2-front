<template>

  <div class="admin-menu" ref="target" :data-id="dropdown.id">
    <div class="dropdown"
         :class="{show: dropdown.show}"
         v-if="dropdown.show"

    >
      <div class="item" v-if="!isProjectLinked">
        <button class="admin-button link" @click="$emit('addProjectToPlaceholder', true); dropdown.show = false">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.7076 17.3639L10.2933 18.7781C8.34072 20.7308 5.1749 20.7308 3.22228 18.7781C1.26966 16.8255 1.26966 13.6597 3.22228 11.7071L4.63649 10.2929M17.3644 11.7071L18.7786 10.2929C20.7312 8.34024 20.7312 5.17441 18.7786 3.22179C16.826 1.26917 13.6602 1.26917 11.7076 3.22179L10.2933 4.636M7.50045 14.4999L14.5005 7.49994" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="item" v-else-if="isProjectLinked">
        <button class="admin-button unlink" @click="$emit('removeProjectToPlaceholder', true); dropdown.show = false">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V1M14 19V21M3 8H1M19 14H21M3.91421 3.91421L2.5 2.5M18.0858 18.0858L19.5 19.5M11 16.6569L8.87868 18.7782C7.31658 20.3403 4.78392 20.3403 3.22183 18.7782C1.65973 17.2161 1.65973 14.6834 3.22183 13.1213L5.34315 11M16.6569 11L18.7782 8.87868C20.3403 7.31658 20.3403 4.78392 18.7782 3.22183C17.2161 1.65973 14.6834 1.65973 13.1213 3.22183L11 5.34315" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>

      <div class="item">
        <button class="admin-button edit" @click="$emit('editPlaceholder', true); dropdown.show = false">
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
            <path d="M16.5282 2.77621L15.5438 3.76788L13.2621 1.46949L14.181 0.543841C14.7775 -0.0570095 15.7508 -0.172529 16.4039 0.366061C17.1552 0.984914 17.1962 2.10335 16.5275 2.77696L16.5282 2.77621ZM12.2091 2.53017L8.26526 6.50283C7.65984 7.11268 7.32026 7.93932 7.32026 8.80122V9.37806C7.32026 9.5851 7.48707 9.75313 7.6926 9.75313H8.26526C9.1209 9.75313 9.94153 9.41032 10.547 8.80122L14.4908 4.82855L12.2091 2.53017ZM14.9696 10.417L14.6338 10.222C14.7097 9.81388 14.7477 9.40582 14.7477 9.003C14.7477 8.60018 14.7097 8.19211 14.6338 7.78405L14.4178 7.02267L11.5999 9.86114C10.7093 10.7583 9.52526 11.2526 8.26526 11.2526H7.69186C6.66494 11.2526 5.83016 10.4117 5.83016 9.37731V8.79972C5.83016 7.53125 6.3209 6.33856 7.21154 5.44066L10.2789 2.35089V2.25038C10.2789 1.00967 9.27654 0 8.04484 0C6.81314 0 5.8108 1.00967 5.8108 2.25038V2.64194C5.03112 2.91949 4.30952 3.33881 3.68325 3.8789L3.34814 3.68461C2.83208 3.38606 2.23038 3.30655 1.65251 3.46333C1.07687 3.61935 0.595805 3.99292 0.298678 4.5135C0.0008063 5.03409 -0.0773851 5.64094 0.078253 6.22154C0.233146 6.80138 0.603997 7.28596 1.12155 7.58601L1.4574 7.7803C1.38144 8.18836 1.34346 8.59643 1.34346 9C1.34346 9.40357 1.38144 9.81164 1.4574 10.2197L1.12155 10.414C0.603997 10.714 0.233891 11.1986 0.078253 11.7785C-0.0773851 12.3591 0.000806367 12.9659 0.297934 13.4857C0.595061 14.0071 1.07612 14.3806 1.65251 14.5367C2.23038 14.6942 2.83208 14.6147 3.34814 14.3154L3.68325 14.1211C4.30952 14.6619 5.03112 15.0805 5.8108 15.3581V15.7496C5.8108 16.9903 6.81314 18 8.04484 18C9.27654 18 10.2789 16.9903 10.2789 15.7496V15.3581C11.0586 15.0805 11.7801 14.6612 12.4064 14.1211L12.7415 14.3154C13.2591 14.6147 13.8608 14.6942 14.4372 14.5367C15.0128 14.3806 15.4939 14.0071 15.7917 13.4857C16.4061 12.4101 16.0367 11.0321 14.9689 10.4132L14.9696 10.417Z" fill="white"/>
          </svg>
        </button>
      </div>

        <div class="item">
          <button class="admin-button delete" @click="$emit('deletePlaceholder', true); dropdown.show = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="20" viewBox="0 0 17 20" fill="none">
              <path d="M15.8333 3.33332H13.25C12.8513 1.39465 11.1459 0.0025 9.16664 0H7.49996C5.5207 0.0025 3.81531 1.39465 3.41664 3.33332H0.83332C0.373086 3.33332 0 3.70641 0 4.16664C0 4.62687 0.373086 5 0.83332 5H1.66664V15.8333C1.66941 18.1334 3.53328 19.9973 5.83332 20H10.8333C13.1334 19.9973 14.9972 18.1334 15 15.8333V5H15.8333C16.2936 5 16.6666 4.62691 16.6666 4.16668C16.6666 3.70645 16.2936 3.33332 15.8333 3.33332ZM7.5 14.1667C7.5 14.6269 7.12691 15 6.66668 15C6.20641 15 5.83332 14.6269 5.83332 14.1667V9.16668C5.83332 8.70645 6.20641 8.33336 6.66664 8.33336C7.12687 8.33336 7.49996 8.70645 7.49996 9.16668V14.1667H7.5ZM10.8333 14.1667C10.8333 14.6269 10.4602 15 10 15C9.53976 15 9.16668 14.6269 9.16668 14.1667V9.16668C9.16668 8.70645 9.53976 8.33336 10 8.33336C10.4602 8.33336 10.8333 8.70645 10.8333 9.16668V14.1667ZM5.1425 3.33332C5.49695 2.33523 6.44086 1.66793 7.5 1.66664H9.16668C10.2258 1.66793 11.1697 2.33523 11.5242 3.33332H5.1425Z" fill="white"/>
            </svg>
          </button>
        </div>

    </div>
    <button class="admin-button toggle"
            :class="{active: this.dropdown.show, animate: this.animate}"
            @click="toggleDropdown()">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
        <path d="M0.299474 13.3368C0.912343 14.4005 2.27148 14.766 3.33517 14.1531C3.3359 14.1527 3.33659 14.1523 3.33732 14.1518L3.66702 13.9614C4.28941 14.4939 5.0048 14.9069 5.77719 15.1795V15.5596C5.77719 16.7872 6.77239 17.7824 8 17.7824C9.22761 17.7824 10.2228 16.7872 10.2228 15.5596V15.1795C10.9953 14.9064 11.7107 14.493 12.333 13.9599L12.6642 14.1511C13.7281 14.7649 15.0882 14.4 15.702 13.3361C16.3158 12.2721 15.9509 10.912 14.887 10.2982L14.558 10.1086C14.7061 9.30275 14.7061 8.4767 14.558 7.67087L14.887 7.4812C15.9509 6.86739 16.3158 5.50731 15.702 4.44335C15.0882 3.37943 13.7281 3.01451 12.6642 3.62831L12.3345 3.81874C11.7115 3.2869 10.9956 2.87471 10.2228 2.6029V2.22281C10.2228 0.995191 9.22761 0 8 0C6.77239 0 5.77719 0.995191 5.77719 2.22281V2.6029C5.0047 2.876 4.28927 3.28944 3.66702 3.8225L3.33583 3.6306C2.27187 3.01676 0.911787 3.38169 0.297981 4.44561C-0.315826 5.50953 0.0490611 6.86965 1.11302 7.48346L1.442 7.67312C1.2939 8.47892 1.2939 9.30497 1.442 10.1108L1.11302 10.3005C0.0520133 10.9159 -0.311693 12.2734 0.299474 13.3368ZM8 5.92749C9.63682 5.92749 10.9637 7.2544 10.9637 8.89122C10.9637 10.528 9.63682 11.8549 8 11.8549C6.36318 11.8549 5.03627 10.528 5.03627 8.89122C5.03627 7.2544 6.36318 5.92749 8 5.92749Z" fill="#7773FB"/>
      </svg>
    </button>



  </div>


</template>

<script>
import {uuid} from "vue3-uuid";
import {addNotice} from "@/js/notifications.js";
import iconDollar from '@/assets/icons/icon-dollar.svg'
import {popup} from "@/js/controllers/popupController.js";

export default {
  name: "ProjectCardAdminMenu.vue",
  data() {
    return {
      dropdown: {
        show: false,
        id: uuid.v1()
      },
      addNotice,
      animate: false,
    }
  },
  props: {
    isProjectLinked: false
  },
  methods: {
    setAnimation() {
      this.animate = true
      setTimeout(() => this.animate = false, 300)
    },
    toggleDropdown() {
      this.dropdown.show = !this.dropdown.show
      this.setAnimation()
      if (this.dropdown.show === true) {
        window.addEventListener('keydown', this.closeByEsc)
        window.addEventListener('mousedown', this.clickOutside)
      }
    },
    closeByEsc(e){
      this.setAnimation()
      e.key === 'Escape' ? this.dropdown.show = false : false
      window.removeEventListener('keydown', this.closeByEsc)
    },
    clickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.setAnimation()
        this.dropdown.show = false
        window.removeEventListener('mousedown', this.clickOutside)
      }

    },

    callLinkProjectModal(placeholderId) {
      popup.show = true
      popup.component = 'LinkProjectToPlaceholder'
    }
  },

  beforeUnmount() {
    window.removeEventListener('keydown', this.closeByEsc)
    window.removeEventListener('mousedown', this.clickOutside)
  }

}
</script>

<style scoped lang="scss">
.admin-button {
  border-radius: 35.5px;
  background: #6b6b6b;
  display: inline-flex;
  padding: 9px 15px;
  align-items: flex-start;
  gap: 13px;
  cursor: pointer;
  border: none;
  transition: .3s ease;

  svg {
    path {transition: .3s ease;}
  }

  &.animate {

    svg {
      animation: .3s ease rotate;
    }

    @keyframes rotate {
      0% {transform: rotate(0deg)}
      100% {transform: rotate(360deg)}
    }
  }

  &.edit {
    &:hover {
      background-color: #7482A7;
    }
  }
  &.delete {
    &:hover {
      background-color: #E87777;
    }
  }
  &.link {
    &:hover {
      background-color: #7AAD7F;
    }
  }

  &.unlink {
    &:hover {
      background-color: #c7bf4f;
    }
  }

  &.active {
    background-color: #FFFFFF;
    svg {
      path {fill: #5D599F;}
    }

    &:hover {
      background-color: #e8e8e8;

      svg {
        path {fill: #5D599F;}
      }
    }
  }

  svg {
    path {
      fill: transparent;
      stroke-width: 1px;
      stroke: #FFFFFF;
    }
  }

  &:hover {
    background-color: #5D599F;
  }


}
.admin-menu {
  position: relative;

  .dropdown {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    gap: 2px;
    right: 30px;
    margin-bottom: 2px;
    &.show {
      transition: .3s;
      animation: .5s ease slideIn;


      @keyframes slideIn {
        0% { max-height: 0; opacity: 0}
        100% {max-height: 200px; opacity: 1}

      }
    }
  }

}

@media screen and (max-width: 500px){
  .admin-button {
    padding: 4px 6px;

    svg {
      width: 15px;
    }
  }
}
</style>