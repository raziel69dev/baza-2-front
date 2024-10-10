<template>

  <div class="popup"
       @mousedown="closePopup">
    <div class="popup-body" @mousedown.stop>

          <transition name="fadeHeight" mode="out-in" tag="div" class="popup-body_content">
            <component
                :is="component"
                :key="component"
                @changeState="emit => swapComponent(emit)"
            >

            </component>
          </transition>

    </div>
    <div class="backdrop"></div>
  </div>

</template>

<script>
import {closePopup, popup} from "@/js/controllers/popupController.js";
import TheLoader from "@/components/ReUsable/TheLoader.vue";
import InlineSvg from 'vue-inline-svg';
import AddPlaceholders from "@/components/popups/AddPlaceholders.vue";
import AddReview from "@/components/popups/AddReview.vue";
import ApproveReview from "@/components/popups/ApproveReview.vue";
import DeletePlaceholder from "@/components/popups/DeletePlaceholder.vue";
import DeleteProject from "@/components/popups/DeleteProject.vue";
import DeleteReview from "@/components/popups/DeleteReview.vue";
import DisapproveReview from "@/components/popups/DisapproveReview.vue";
import EditPlaceholders from "@/components/popups/EditPlaceholders.vue";
import EditReview from "@/components/popups/EditReview.vue";
import ExternalLink from "@/components/popups/ExternalLink.vue";
import LinkProjectToPlaceholder from "@/components/popups/LinkProjectToPlaceholder.vue";
import ProjectLinks from "@/components/popups/ProjectLinks.vue";
import SignIn from "@/components/popups/SignIn.vue";
import SignUp from "@/components/popups/SignUp.vue";
import SignOut from "@/components/popups/SignOut.vue";
import UnlinkProjectToPlaceholder from "@/components/popups/UnlinkProjectToPlaceholder.vue";

export default {
  components: {
    InlineSvg,
    TheLoader,

    AddPlaceholders,
    AddReview,
    ApproveReview,
    DeletePlaceholder,
    DeleteProject,
    DeleteReview,
    EditPlaceholders,
    DisapproveReview,
    EditReview,
    ExternalLink,
    LinkProjectToPlaceholder,
    ProjectLinks,
    SignIn,
    SignUp,
    SignOut,
    UnlinkProjectToPlaceholder
  },
  data() {
    return {
      popup,
      closePopup,
      component: null
    }
  },

  watch: {
    'popup.component': function (newVal, oldVal) {

    },

  },

  methods: {
    swapComponent(component) {
      this.component = component

    },
    closeModalByEsc(e) {
      if (e.key  === 'Escape') {
        closePopup()
      }
    }
  },
  mounted() {
    window.addEventListener("keydown", this.closeModalByEsc)
    document.body.style.overflow = 'hidden hidden'
    document.body.style.paddingRight = '15px'
    this.swapComponent(popup.component)
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.closeModalByEsc)
    document.body.style.overflow = 'scroll scroll'
    document.body.style.paddingRight = '0px'
  }
}


</script>

<style scoped lang="scss">
.popup {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: transparent;

  .popup-body {
    position: fixed;
    z-index: 51;
    border-radius: 10px;
    border: 1px solid #D8D8D8;
    background: #fff;
    padding: 15px;
    width: 100%;
    max-width: 630px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: height .15s ease;
    display: flex;

    justify-content: center;
    align-items: center;

    .icon {
      margin-bottom: 20px;
      height: 50px;
      display: flex;
      align-items: start;
      justify-content: space-between;
      width: 100%;

      img {
        width: 100%;
        height: auto;
      }

      .popup_heading-close {
        cursor: pointer;
      }
    }


    .popup-body_content {
      min-height: 120px;
      width: 100%;
    }

    .popup_heading {
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 10px;
      margin-top: 10px;


    }

  }
}

.backdrop {
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: 50;
  background: rgba(217, 217, 217, 0.60);
  -webkit-backdrop-filter: blur(3px);
  backdrop-filter: blur(3px);
}


.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.1s;
  max-height: 450px;
}
.fadeHeight-enter,
.fadeHeight-leave-to
{
  max-height: 300px;
}

@media screen and (max-width: 500px){
  .popup {
    .popup-body {
      width: 80%;
    }
  }
}
</style>