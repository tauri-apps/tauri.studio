<template>
  <div>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown :src="markdown" toc @data="onToc" />
  </div>
</template>

<script>
import markdown from '../markdown/contribute.md'

export default {
  name: 'Contribute',
  data () {
    return {
      markdown: markdown
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
  }

}
</script>
