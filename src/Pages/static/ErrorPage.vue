<template>
  <div>
    <h1>Ошибка 404</h1>
    <h3>Запрашиваемая страница не найдена</h3>
    <p>Попробуйте повторить запрос или вернитесь на
      <router-link to="/">главную</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: "errorPage.vue",
  data() {
    return {}
  },
  components: {},
  mounted() {

  },
}
</script>

<style scoped lang="scss">

</style>