<template>
  <div>
    <div id="padding" style="padding-top:40px"></div>
    <q-markdown :src="markdown" toc @data="onToc" no-line-numbers />
  </div>
</template>

<script>
export default {
  name: 'Markdown',
  data () {
    return {
      markdown: ''
    }
  },
  computed: {
    toc:
      {
        get () {
          return this.$store.state.common.toc
        },
        set (toc) {
          this.$store.commit('common/toc', toc)
        }
      }
  },
  methods: {
    onToc (toc) {
      this.toc = toc
    }
  },
  mounted () {
    // todo: get this workind so we don't have millions of pages
    import(this.$route.meta.markdownSrc).then(data => {
      this.markdown = data
    })
  }
}
</script>
