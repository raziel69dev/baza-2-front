<template>
  <div class="placeholder" >

    <project-card
        :style="placeholder.style"
        v-if="placeholder.project"
        :project="placeholder.project"
    />


    <div class="project-dropdown-box-dropper"  :style="placeholder.style" v-else>

      <div class="dropper-box">
        <p>
          {{ placeholder.text }}
        </p>
      </div>

      <button-black-outline
          @buttonPressed=""
      >
        <div class="button-content">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M10.5455 21.0909C16.3695 21.0909 21.0909 16.3695 21.0909 10.5455C21.0909 4.72136 16.3695 0 10.5455 0C4.72136 0 0 4.72136 0 10.5455C0 16.3695 4.72136 21.0909 10.5455 21.0909Z" fill="#B3B4C9"/>
            <path d="M4.82542 10.317L14.993 6.3967C15.4649 6.22621 15.8771 6.51182 15.7242 7.22539L15.725 7.22452L13.9938 15.3805C13.8655 15.9588 13.5219 16.0994 13.0412 15.827L10.4048 13.884L9.13324 15.109C8.99264 15.2496 8.874 15.3682 8.60158 15.3682L8.78876 12.6853L13.6748 8.27115C13.8875 8.08397 13.6274 7.97852 13.347 8.16482L7.30888 11.9665L4.70591 11.1545C4.14085 10.9752 4.12855 10.5894 4.82542 10.317Z" fill="white"/>
          </svg>
          Забронировать
        </div>
      </button-black-outline>



    </div>

    <div class="admin-menu">
      <the-placeholder-card-admin-menu
          v-if="userStore.role === 'admin' && this.$route.path === '/payed-editor'"
          :isProjectLinked="placeholder.project"
          @removeProjectToPlaceholder="callUnlinkProjectModal($props.placeholder.id, placeholder.project.id)"
          @addProjectToPlaceholder="callLinkProjectModal($props.placeholder.id)"
          @deletePlaceholder="onDeletePlaceholder($props.placeholder)"
          @editPlaceholder="onEditPlaceholder($props.placeholder)"
      />
    </div>
  </div>
</template>
<script>
import projectCard from "@/components/Layout/Project/ProjectCard.vue";


import {deletePlaceholder, placeholders} from "@/API/placeholders.js";
import {addNotice} from "@/js/notifications.js";
import thePlaceholderCardAdminMenu from "@/components/Layout/Project/ThePlaceholderCardAdminMenu.vue";
import {popup} from "@/js/controllers/popupController.js";
import buttonBlackOutline from "@/components/Buttons/ButtonBlackOutline.vue";
import {userStore} from "@/Stores/userStore.js";

export default {
  name: 'ThePlaceholder',
  props: {
    placeholder: {}
  },
  components: {
    thePlaceholderCardAdminMenu,
    projectCard,
    buttonBlackOutline
  },
  data  () {
    return {
      userStore
    }
  },
  methods: {
    onDeletePlaceholder(placeholder) {
      popup.show = true
      popup.placeholder = placeholder
      popup.component = 'DeletePlaceholder'
    },
    onEditPlaceholder(placeholder) {
      popup.show = true
      popup.placeholder = placeholder
      popup.component = 'EditPlaceholders'
      console.log(popup)
    },
    callLinkProjectModal(placeholderId) {
      popup.show = true
      popup.placeholderId = placeholderId
      popup.component = 'LinkProjectToPlaceholder'
    },

    callUnlinkProjectModal(placeholderId, projectId) {
      popup.show = true
      popup.placeholderId = placeholderId
      popup.projectId = projectId
      popup.component = 'UnlinkProjectToPlaceholder'
    }
  }
}
</script>
<style scoped lang="scss">

.button-content {
  display: flex;
  align-items: center;
  gap: 20px;

  color: #B3B4C9;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;

  svg {
    path {
      stroke-width: 0;
    }
  }

}
.placeholder {
  width: 100%;
  border-radius: 20px;
  position: relative;

  .project-dropdown-box-dropper {
    width: 100%;
    height: 410px;
    box-sizing: border-box;
    border-radius: 20px;
    //background: radial-gradient(175.11% 210.61% at 131.64% -20.57%, rgba(242, 242, 248, 0.50) 0%, rgba(233, 233, 242, 0.50) 31.1%);
    //box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    display: flex;
    text-align: center;
    border: 2px solid transparent;
    position: relative;
    padding: 20px;
    flex-wrap: wrap;
    background-size: 100% 100%;

    background-color: #FFFFFF;
    box-shadow: -10px -12px 51.7px -40px #FFF, 24px 21px 64.8px -23px #C1BFDA;
    animation: BgGrad 5s ease-in-out infinite;

    @keyframes BgGrad {
      0% {
        background-size: 100% 100%;
      }
      50% {
        background-size: 1000% 1000%;
      }
      100% {
        background-size: 100% 100%;
      }
    }

  }

  .dropper-box {
    border-radius: 13px;
    border: 2px dashed #B3B4C9;
    color: #B3B4C9;
    text-align: center;
    font-size: 33px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 80%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    p {
      width: 100%;
    }
  }

  svg {
    width: 100%;

    path {
      stroke: #7c7c7c;
    }
  }

  .admin-menu {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }

}

@media screen and (max-width: 500px){
  .placeholder {
    height: auto;

    .project-dropdown-box-dropper {
      height: auto;
    }
    .dropper-box {
      height: 30px;
      width: 100%;
      padding: 10px;
      p {
        font-size: 18px;
      }
    }
  }
}
</style>