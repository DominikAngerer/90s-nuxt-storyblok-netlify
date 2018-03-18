<template>
  <div class="post" v-bind:style="postStyle">
    <h1>{{story.name}}</h1>
    <div v-html="markdown"></div>
  </div>
</template>

<script>
import marked from 'marked'
import invert from 'invert-color'

export default {
  data () {
    return { story: { name: '', content: { markdown: '' }} }
  },
  computed: {
    markdown () {
      return marked(this.story.content.markdown)
    },
    postStyle() {
      let color = '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
      return { 
        backgroundColor: color,
        color: invert(color, true),
        fontSize: `${14 + Math.floor(Math.random()*10)}px`
      }
    }
  },
  mounted () {
    if (this.$storyblok.inEditor) {
      this.$storyblok.init()

      this.$storyblok.on('change', () => {
        location.reload(true)
      })
    }

    document.querySelectorAll('p').forEach((item)=>{
      let fonts = ["Al Bayan","American Typewriter","Andalé Mono","Apple Casual","Apple Chancery","Apple Garamond","Apple Gothic","Apple LiGothic","Apple LiSung","Apple Myungjo","Apple Symbols",".AquaKana","Arial","Arial Hebrew","Ayuthaya","Baghdad","Baskerville","Beijing","BiauKai","Big Caslon","Brush Script","Chalkboard","Chalkduster","Charcoal","Charcoal CY","Chicago","Cochin","Comic Sans","Cooper","Copperplate","Corsiva Hebrew","Courier","Courier New","DecoType Naskh","Devanagari","Didot","Euphemia UCAS","Futura","Gadget","Geeza Pro","Geezah","Geneva","Geneva CY","Georgia","Gill Sans","Gujarati","Gung Seoche","Gurmukhi","Hangangche","HeadlineA","Hei","Helvetica","Helvetica CY","Helvetica Neue","Herculanum","Hiragino Kaku Gothic Pro","Hiragino Kaku Gothic ProN","Hiragino Kaku Gothic Std","Hiragino Kaku Gothic StdN","Hiragino Maru Gothic Pro","Hiragino Maru Gothic ProN","Hiragino Mincho Pro","Hiragino Mincho ProN","Hoefler Text","Inai Mathi","Impact","Jung Gothic","Kai","Keyboard","Krungthep","KufiStandard GK","LastResort","LiHei Pro","LiSong Pro","Lucida Grande","Marker Felt","Menlo","Monaco","Monaco CY","Mshtakan","Nadeem","New Peninim","New York","NISC GB18030","Optima","Osaka","Palatino","Papyrus","PC Myungjo","Pilgiche","Plantagenet Cherokee","Raanana","Sand","Sathu","Seoul","Shin Myungjo Neue","Silom","Skia","Song","ST FangSong","ST Heiti","ST Kaiti","ST Song","Symbol","Tae Graphic","Tahoma","Taipei","Techno","Textile","Thonburi","Times","Times CY","Times New Roman","Trebuchet MS","Verdana","Zapf Chancery","Zapf Dingbats","Zapfino"]
      item.style.fontFamily = fonts[Math.floor(Math.random()*fonts.length)]
    })

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
.post {
  padding: 20px;
}
.post * + * {
  margin-bottom: 10px;
}
</style>
