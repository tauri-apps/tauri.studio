<template>
  <hero>
    <div id="padding" style="padding-top:240px"></div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      autoplay
      controls
      transition-prev="slide-up"
      transition-next="slide-down"
      height="280px"
      style="overflow:hidden;width:100%;background:transparent;color:black!important;"
    >
      <q-carousel-slide :name="1" class="column no-wrap" img-src="statics/art/Farmer.png">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;">BUNDLE</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          size of a vanilla Tauri App can be less than 1MB - about 50 times smaller than what you get with Electron
        </h6>
      </q-carousel-slide>
      <q-carousel-slide :name="2" class="column no-wrap" img-src="statics/art/Waiter.png">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;">MEMORY</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          footprint of a Tauri App is less than half of the size of an Electron app built from the same codebase.
        </h6>
      </q-carousel-slide>
      <q-carousel-slide :name="3" class="column no-wrap" img-src="statics/art/BusinessMan.png">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;">SECURITY</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          is the Tauri-Team's biggest priority and it drives our innovation.
        </h6>
      </q-carousel-slide>
      <q-carousel-slide :name="4" class="column no-wrap" img-src="statics/art/BusinessMan.png">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;">RELIABILITY</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          of the underlying code base is why critical libraries have been forked and will be perpetually maintained.
        </h6>
      </q-carousel-slide>
      <q-carousel-slide :name="5" class="column no-wrap" img-src="statics/art/BusinessMan.png">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;">FLOSS</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          licensing is possible with Tauri, but impossible with Chromium consumers, like Electron.
        </h6>
      </q-carousel-slide>
    </q-carousel>
    <q-markdown>
### Tauri is a framework agnostic toolchain for building highly secure native apps that have tiny binaries and are very fast.

## Introduction

Tauri helps you to build tiny, blazing fast binaries for all major desktop platforms. Whether you are just starting out making apps for your meetup or regularly crunch terabyte datasets, we are absolutely confident that you will love using Tauri as much as we love making and maintaining it.
    </q-markdown>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="primary" />
    </q-page-scroller>
  </hero>
</template>

<script>
import Hero from '../components/Hero'
import markdown from '../markdown/tauri.md'
import json from '../json/tauri.json'

export default {
  name: 'PageIndex',

  components: {
    Hero
  },

  data () {
    return {
      slide: 1,
      markdown: markdown,
      json: json
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
      toc.push({ id: 'Tauri-API', label: 'Tauri API', level: 1, children: Array(0) })
      toc.push({ id: 'Donate', label: 'Donate', level: 1, children: Array(0) })

      this.toc = toc
    }
  }

}
</script>
