<template>
  <hero>
    <div id="padding" style="padding-top:240px"></div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      autoplay
      navigation
      control-color="cyan-1"
      height="420px"
      style="overflow:hidden;width:100%;background:transparent;color:black!important;border-radius:5px"
    >
      <q-carousel-slide v-for="(slideItem) in slides" v-bind:key="slideItem.id" :name="slideItem.title" class="column no-wrap" :img-src="slideItem.img" @mouseover="credits = true" @mouseleave="credits = false">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:300px;opacity:0.8;padding-top:220px;"> {{ slideItem.title }}</div>
        <h6 class="q-pa-sm bg-yellow-2 full-width text-center" style="margin:270px -25px 0 0!important;z-index:1;font-size:1.2em">
          {{ slideItem.text }}
        </h6>
        <q-btn v-if="credits" size="xs" dense class="absolute-top-right q-ma-lg" style="width:180px;z-index:1" color="blue-grey-9" text-color="white" type="a" :href="`https://unsplash.com/${slideItem.unsplashLink}`">
          <span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Image by: {{ slideItem.unsplashName }}</span>
        </q-btn>
      </q-carousel-slide>
    </q-carousel>
    <q-markdown>
## Introduction
Tauri is a framework agnostic toolchain for building highly secure native apps that have tiny binaries and are very fast. You can use any frontend-framework to build apps with it, and it can be integrated into any CI pipeline.

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
      credits: false,
      markdown: markdown,
      json: json,
      slides: [
        {
          title: 'AGNOSTIC',
          text: 'compatibility with any front-end framework means you don\'t have to change your stack.',
          img: 'statics/images/vegetables.jpg',
          unsplashLink: '@freestockpro',
          unsplashName: 'Alexandr Podvalny'
        },
        {
          title: 'SECURITY',
          text: 'is the Tauri-Team\'s biggest priority and drives our innovation.',
          img: 'statics/images/keys.jpg',
          unsplashLink: '@chunlea',
          unsplashName: 'Chunlea Ju'
        },
        {
          title: 'MEMORY',
          text: 'footprint of a Tauri App is less than half of the size of an Electron app.',
          img: 'statics/images/lightning.jpg',
          unsplashLink: '@ian_froome_photography',
          unsplashName: 'Ian Froome'
        },
        {
          title: 'BUNDLE',
          text: 'size of a Tauri App can be less than 600KB.',
          img: 'statics/images/snowflake.jpg',
          unsplashLink: '@dariuscotoi',
          unsplashName: 'Darius Cotoi'
        },
        {
          title: 'RELIABILITY',
          text: 'of the underlying code base is why critical libraries have been forked.',
          img: 'statics/images/bigben.jpg',
          unsplashLink: '@@louisk_',
          unsplashName: 'Louis. K'
        },
        {
          title: 'FLOSS',
          text: 'licensing is possible with Tauri, but impossible with Chromium consumers, like Electron.',
          img: 'statics/images/boat.jpg',
          unsplashLink: '@jplenio',
          unsplashName: 'Johannes Plenio'
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
