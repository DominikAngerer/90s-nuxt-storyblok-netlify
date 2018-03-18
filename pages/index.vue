<template>
  <div class="index">
    <ul v-for="item in stories">
      <li>
        <nuxt-link :to="item.full_slug">{{item.name}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return { stories: [] }
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  },
  asyncData (context) {
    return context.app.$storyapi.get('cdn/stories', {
      starts_with: 'posts',
      version: 'draft'
    }).then((res) => {
      return res.data
    }).catch((res) => {
      context.error({ statusCode: res.response.status, message: res.response.data })
    })
  }
}
</script>

<style>
.index {
  background: #ccc;
  color: #000;
  padding: 30px;
}
</style>
