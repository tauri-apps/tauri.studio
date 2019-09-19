<template>
  <hero>
    <div id="padding" style="padding-top:260px"></div>
    <q-btn @click="pattern = 'Cloudish'">Cloudish</q-btn>
    <q-btn @click="pattern = 'Trollbridge'">Trollbridge</q-btn>
    <q-btn @click="pattern = 'Cloudbridge'">Cloudbridge</q-btn>
    <q-btn @click="pattern = 'Hermit'">Hermit</q-btn>
    <q-card>
      <q-card-section class="full-width" style="height:400px">
        <!--<div id="mermaid" v-html="clearfix"></div>-->
        <div id="tryout" v-html="pattern"></div>
        <div id="temp" v-html="graph"></div>
      </q-card-section>
    </q-card>

    <!-- <q-markdown :src="markdown" toc @data="onToc" /> -->

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
// import markdown from '../markdown/patterns.md'
// import * as mermaid from 'mermaid'

export default {
  name: 'PageIndex',

  components: {
    Hero
  },

  data () {
    return {
      // markdown: markdown,
      mermaidHTML: '',
      graph: '',
      clearfix: ' ',
      pattern: '',
      patterns: [
        {
          name: 'Trollbridge',
          intro: 'The Trollbridge recipe is a pattern for the highest degree of operational security.',
          bestWhen: 'You are paranoid about security but still need the power of Rust',
          features: [
            'render UI securely at bootstrap',
            'promise based message passing',
            'RW access to filesystem',
            'STDOUT access to other binaries',
            'extensible with Rust functions',
            'whitelist for functional codegen',
            'runtime message salting',
            'fASLR & AoT Compiling'
          ],
          pros: [
            'highly configurable',
            'infinitely extensible'
          ],
          cons: [
            'rust skills virtually required'
          ]
        }
      ]
    }
  },
  watch: {
    pattern: {
      handler (val, oldVal) {
        oldVal = !oldVal ? 'none' : oldVal
        this.goMermaid(`${val}`)
      }
    }
  },
  computed: {
    toc: {
      get () {
        return this.$store.state.common.toc
      },
      set (toc) {
        this.$store.commit('common/toc', toc)
      }
    }
  },
  mounted () {
  },
  methods: {
    onToc (toc) {
      // add anything not picked uip by the markdown processor
      // toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      // toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    },
    goMermaid (val) {
      const thing = `graph LR\nA --> B\nA(${val})`
      this.graph = null
      this.$nextTick(() => {
        this.graph = this.$mermaid.render('mermaid', thing)
      })
    }
  }
}
</script>
