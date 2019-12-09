<template>
  <hero>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown :src="markdown" toc @data="onToc" />

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import markdown from '../markdown/governance.md'

export default {
  name: 'Governance',

  components: {
    Hero
  },

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
