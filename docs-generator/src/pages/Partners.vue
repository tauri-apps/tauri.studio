<template>
  <div>
    <div id="padding" style="padding-top:260px"></div>
    <q-markdown toc @data="onToc">

## Sponsors

### wallaby.js
The awesome folks at wallaby.js comped the core team of Tauri with their futuristic `REPL in the IDE` test runner. If you avoid testing your JS because it takes so long - with wallaby you'll appreciate the immediate inline feedback. We do.
https://wallabyjs.com

### github.com
Although not an official partner, without the awesome support of GitHub donating GitHub actions for our build pipelines, we would not be as far as we are today.

## Collaborators
### IOTA FOUNDATION
The first adopter of Tauri, close collaborators with common interests.
https://iota.org

### PureOS
It can be argued that the humble beginnings of Tauri stretch back to a conversation where it was made clear in no simple terms that Electron apps will never ship on the official PureOS store.
https://www.pureos.net/

### Meros
If PureOS planted the seed of Tauri, Kayaba from Meros really kicked the can down the road with a perfectly timed question.
https://meroscrypto.io/

### TensorProgramming
One of the most polyglot professionals out there, TensorProgramming shares his knowledge and excitement about dozens of different programming languages on his YouTube channel.
https://youtube.com/c/tensorprogramming

## Sponsors
(In alphabetic order)
- Anonymous
- Robin van Boven
- Jonathan Baginski
- Allan Gaunt

## And You?

    </q-markdown>
  </div>
</template>

<script>
export default {
  name: 'Introduction',

  data () {
    return {
      graph: '',
      flow: {
        lifecycle: `
        graph LR
          A==>H
          H==>G
          A-->D
          D-->G
        `
      }
    }
  },
  mounted () {
    this.goMermaid(this.flow.lifecycle)
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
    },
    goMermaid (pattern) {
      // null it so that we don't accidentally append
      this.graph = null

      // otherwise mermaid gets lost
      this.$nextTick(() => {
        this.graph = this.$mermaid.render('mermaid', pattern)
        // then measure height of svg
        // resize card / dom
      })
    }
  }

}
</script>
