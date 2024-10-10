<template>
  <div>
    <h1>Контакты</h1>

    <a href="https://t.me/mxBaza" class="image-link" target="_blank">
      <img :src="image" alt="">
    </a>


    <div class="project-links">
      <a href="https://t.me/mxBaza" class="link-btn" target="_blank">

        Связаться с нами
      </a>
      <a href="https://t.me/+KP0MMZ2fcqA3YzQy" class="link-btn" target="_blank">

        Наш канал в Telegram
      </a>


    </div>
  </div>

</template>

<script>
import image from '@/assets/pages-images/contacts.webp'
export default {
  name: "ContactsView.vue",
  data() {
    return {
      image
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 30px;
}
img {
  width: 100%;
  margin-top: 30px;
  margin-bottom: 30px;
}
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: start;
  margin-bottom: 30px;

  a {
    margin-top: 0;
  }
}
</style>