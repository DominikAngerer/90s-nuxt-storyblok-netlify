<template>
  <div v-editable="blok">
    <h1>{{ blok.headline }}</h1>
  </div>
</template>

<script>
export default {
  props: ['blok']
}
</script>

<style scoped>
  h1 {
    text-align: center;
    padding-bottom: 40px;
    font-family: "Gill Sans";
  }
</style>
