<template>
  <div>
    <button @click="callModal({
    show: !popup.show,
    component: 'SignIn',
  })" >Show SignIn</button>

    <button @click="callModal({
    show: !popup.show,
    component: 'SignUp'
  })" >Show SignUp</button>

    <button @click="addNotice({name: 'notice', type: 'danger'})" >Show danger</button>
    <button @click="addNotice({name: 'notice', type: 'success'})" >Show success</button>
    <button @click="addNotice({name: 'notice', type: 'warning'})" >Show warning</button>
    <button @click="getProjects({isPayedFirst: true, offset: 4, limit: 4})" >GET PROJECTS</button>
  </div>
</template>

<script setup>
import {defineAsyncComponent} from "vue";
import {addNotice, notifications} from "@/js/notifications.js";
import {popup} from "@/js/controllers/popupController.js";
import {getProjects} from "@/API/projectsController.js";

const TheNotifications = defineAsyncComponent({
  loader: () => import("@/components/Blocks/TheNotifications.vue"),
  delay: 200,
  timeout: 3000
})
function callModal(settings) {
  for (const option in settings) {
    popup[option] = settings[option]
  }
}
</script>

<style scoped lang="scss">

</style>