<template>
  <div class="post" v-bind:style="postStyle">
    <h1>{{story.name}}</h1>
    <div v-html="markdown"></div>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  data () {
    return { story: { name: '', content: { markdown: '' }} }
  },
  computed: {
    markdown () {
      return marked(this.story.content.markdown)
    }
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
    console.log(`cdn/stories/${context.params.post}`);
    return context.app.$storyapi.get(`cdn/stories/posts/${context.params.post}`, {
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
.post * + * {
  margin-bottom: 10px;
}
</style>
