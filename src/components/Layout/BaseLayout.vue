<template>
  <main class="main">
    <header>
      <slot name="header" />
    </header>
    <section>
      <slot name="main" />
    </section>
    <footer>
      <slot name="footer" />
    </footer>
  </main>
</template>

<script>

export default {
  name: 'BaseLayout.vue'
}

</script>

<style scoped lang="scss">
main {
  width: 100%;
  max-width: 1280px;
  padding-left: 10px;
  padding-right: 10px;
  box-sizing: border-box;
  margin: 0 auto;
}
header, footer, section {

}

</style>