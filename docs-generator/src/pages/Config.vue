<template>
  <div>
    <div id="padding" style="padding-top:40px"></div>
    <q-markdown :src="markdown" toc @data="onToc" no-line-numbers />
  </div>
</template>

<script>
import markdown from '../markdown/config.md'

export default {
  name: 'API',

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
      // add anything not picked uip by the markdown processor
      // toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      // toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    }
  }

}
</script>
