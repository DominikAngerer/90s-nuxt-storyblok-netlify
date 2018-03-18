<template>
  <div>
    <app-header/>
    <main id="main" role="main">
      <nuxt/>
    </main>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  }
}
</script>

<style>
*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
