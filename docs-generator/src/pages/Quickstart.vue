<template>
  <div>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown :src="markdown" toc @data="onToc" line-number-alt="$" />
  </div>
</template>

<script>
import markdown from '../markdown/quickstart.md'

export default {
  name: 'PageIndex',
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
          // console.log('toc:', toc)
          this.$store.commit('common/toc', toc)
        }
      }
  },

  methods: {
    onToc (toc) {
      // add anything not picked uip by the markdown processor
      // toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      // toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    }
  }

}
</script>
<style lang="stylus">
.q-markdown--line-numbers-wrapper
  margin-bottom 14px
</style>
