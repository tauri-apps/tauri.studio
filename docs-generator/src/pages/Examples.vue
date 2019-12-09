<template>
  <hero>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown>
You can add markdown to your page by surrounding it with `q-markdown` tag.
Be aware, markdown is sensitive to being on left side, otherwise will wrap it in blocks (indented).
    </q-markdown>

    Here is the imported Markdown:
    <q-markdown :src="markdown" toc @data="onToc" />

    <example-title title="Basic" />
    <example-card title="Tauri - Basic" name="TauriBasic" :tag-parts="getTagParts(require('!!raw-loader!../examples/TauriBasic.vue').default)" />
    <example-card title="Tauri - Advanced" name="TauriAdvanced" :tag-parts="getTagParts(require('!!raw-loader!../examples/TauriAdvanced.vue').default)" />

  </hero>
</template>

<script>
import Hero from '../components/Hero'
import ExampleTitle from '../components/ExampleTitle'
import ExampleCard from '../components/ExampleCard'
import { slugify } from 'assets/page-utils'
import getTagParts from '@quasar/quasar-ui-qmarkdown/src/util/getTagParts'
import markdown from '../markdown/examples.md'

export default {
  name: 'Examples',

  components: {
    Hero,
    ExampleTitle,
    ExampleCard
  },

  data () {
    return {
      tempToc: [],
      markdown: markdown
    }
  },

  mounted () {
    this.toc = []
    this.tempToc = []

    // example of top-level toc
    this.addToToc('Basic')

    // example of second-level toc
    this.addToToc('Tauri - Basic', 2)

    this.addToToc('Tauri - Advanced', 2)

    // add the toc to right drawer
    this.toc = this.tempToc
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
    getTagParts,
    addToToc (name, level = 1) {
      const slug = slugify(name)
      this.tempToc.push({
        children: [],
        id: slug,
        label: name,
        level: level
      })
    },
    onToc (toc) {
      // add anything not picked up by the markdown processor
      // toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      // toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    }
  }
}
</script>

<style>
</style>
