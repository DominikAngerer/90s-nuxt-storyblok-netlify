<template>
  <div class="index">
    <div class="nested">
      <component v-if="story.content.component" :key="story.content._uid" :blok="story.content" :is="story.content.component"></component>
    </div>
    <ul v-for="post in posts">
      <li>
        <nuxt-link :to="post.full_slug">{{post.name}}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return { 
      story: { content: {} }, posts: [] }
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()
      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }
  },
  async asyncData (context) {
    const version = context.query._storyblok ? 'draft' : 'published'
    const homeResponse = await context.app.$storyapi.get('cdn/stories/home', {
      version: version
    })
    const postsResponse = await context.app.$storyapi.get('cdn/stories', {
      starts_with: 'posts',
      version: version
    })
    return { story: homeResponse.data.story, posts: postsResponse.data.stories }
  }
}
</script>

<style>
.index {
  background: #ccc;
  color: #000;
  padding: 30px;
}
.nested {
  padding-bottom: 30px;
}
</style>
