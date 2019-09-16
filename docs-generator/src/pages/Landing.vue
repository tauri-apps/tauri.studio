<template>
  <hero>
    <div id="padding" style="padding-top:240px"></div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      autoplay
      controls
      height="280px"
      style="overflow:hidden;width:100%;background:transparent;color:black!important;"
    >
      <q-carousel-slide v-for="(slideItem) in slides" v-bind:key="slideItem.id" :name="slideItem.title" class="column no-wrap" :img-src="slideItem.title">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:50px;"> {{ slideItem.title }}</div>
        <h6 class="q-pa-sm q-mb-lg bg-white q-pa-sm" style="opacity:0.8;margin-top:100px;z-index:1">
          {{ slideItem.text }}
        </h6>
        <q-btn size="xs" dense class="absolute-bottom-left q-ma-md" style="width:150px;z-index:1;opacity:0.8" color="black" text-color="white" type="a" :href="`https://unsplash.com/${slideItem.unsplashLink}`">
          <span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">{{ slideItem.unsplashName }}</span>
        </q-btn>
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
      slide: 'AGNOSTIC',
      markdown: markdown,
      json: json,
      slides: [
        {
          title: 'AGNOSTIC',
          text: 'compatibility with any front-end framework means you don\'t have to change your stack.',
          img: '',
          unsplashLink: '@ethanmabunay',
          unsplashName: 'Ethan Mabunay'
        },
        {
          title: 'BUNDLE',
          text: 'size of a vanilla Tauri App can be less than 1MB',
          img: ''
        },
        {
          title: 'MEMORY',
          text: 'footprint of a Tauri App is less than half of the size of an Electron app',
          img: ''
        },
        {
          title: 'SECURITY',
          text: 'is the Tauri-Team\'s biggest priority and it drives our innovation',
          img: ''
        },
        {
          title: 'RELIABILITY',
          text: 'of the underlying code base is why critical libraries have been forked',
          img: ''
        },
        {
          title: 'FLOSS',
          text: 'licensing is possible with Tauri, but impossible with Chromium consumers, like Electron.',
          img: ''
        }
      ]
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
