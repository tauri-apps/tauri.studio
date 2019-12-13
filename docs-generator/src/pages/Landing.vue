<template>
  <div>
    <div id="padding" style="padding-top:240px"></div>
    <q-carousel
      animated
      v-model="slide"
      infinite
      :autoplay="5000"
      navigation
      control-color="cyan-1"
      height="420px"
      style="overflow:hidden!important;width:100%;background:transparent;color:black!important;border-radius:5px"
    >
      <q-carousel-slide v-for="(slideItem) in slides" v-bind:key="slideItem.id" :name="slideItem.title" class="column no-wrap" :img-src="slideItem.img" @mouseover="credits = true" @mouseleave="credits = false">
        <div class="text-h3 text-weight-thin bg-amber-3 absolute-left q-pa-md text-center" style="width:350px;opacity:0.8;padding-top:220px;"> {{ slideItem.title }}</div>
        <h6 class="q-pa-sm bg-yellow-1 full-width text-center" style="margin:270px -25px 0 0!important;z-index:1;font-size:1.2em; border-radius:4px;">
          {{ slideItem.text }}
        </h6>
        <q-btn v-if="credits" size="xs" dense class="absolute-top-right q-ma-lg" style="width:180px;z-index:1" color="blue-grey-9" text-color="white" type="a" :href="`https://unsplash.com/${slideItem.unsplashLink}`">
          <span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-2px;fill:white" viewBox="0 0 32 32"><path d="M10 9V0h12v9H10zm12 5h10v18H0V14h10v9h12v-9z"></path></svg></span><span style="display:inline-block;padding:2px 3px">Image by: {{ slideItem.unsplashName }}</span>
        </q-btn>
      </q-carousel-slide>
    </q-carousel>

    <div id="testimonials">
      <br><br>
      <q-markdown>
> I never understood why HTML/JS etc. should not be separated from rust and processed into a separate area. All frameworks I tested and tried always wanted to squeeze the HTML or design area IN Rust. What if I have a UI team and a backend team? With Tauri it's incredibly easy, I can separate the UI from the code and the frontend developers don't even have to know Rust. - **PeShor**
      </q-markdown>
    </div>

    <div id="Quicklinks" class="row full-width wrap justify-center items-center content-center items-start q-mt-xl">
      <q-card :class="{ 'q-ma-md col-md-3 col-sm-5 q-mt-sm': true, 'bg-cyan-1': !$q.dark.isActive, 'bg-grey-8': $q.dark.isActive }"  flat bordered v-for="(item, index) in actions" :key="index">
        <q-icon :name="item.icon" class="float-left q-pa-lg q-ma-xs text-h5" style="margin: 11px 5px -1px 10px"></q-icon>
        <q-card-section>
          {{ item.claim }}
        </q-card-section>
        <q-card-actions align="center">
          <q-btn color="yellow-2" text-color="black" :to="item.btnTarget" :label="item.btnLabel"></q-btn>
        </q-card-actions>
      </q-card>
    </div>

    <!-- roadmap -->
    <q-card id="Roadmap" class="q-ma-xl full-width"  flat>
      <q-card-section class="justify-center items-center content-center text-center">
        <q-activity
          dense
          :bar-color="$q.dark.isActive ? '#ccd' : '#223'"
          bar-width="3px"
          bar-distance="15px"
          style="margin-top:110px"
        >
          <q-activity-item
            v-for="(item, index) in timeline"
            :key="index"
            :icon="item.icon"
            :icon-color="item.iconColor"
            :icon-text-color="item.iconTextColor"
            icon-size="2.5em"
            icon-font-size="0.55em"
            style="padding-bottom:5px;padding-top:5px;margin-left:-9px;"
          >
            <q-item class="inline-block vertical-middle text-left">
              <q-item-section>
                <q-item-label class="text-weight-bold">{{ item.label }}</q-item-label>
                <q-item-label caption lines="2">{{ item.caption }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-chip dense class="vertical-middle side-text">
              {{ item.time }}
            </q-chip>
          </q-activity-item>
        </q-activity>
        <small class="text-weight-light">Notice: This roadmap is subject to change.</small>
        <q-parallax
          :height="130"
          src="statics/images/skycave.jpg"
          class="full-width"
          style="position:absolute;top:0;left:0;"
        />
        <div style="position:absolute;left:0;top:0;right:0;height:130px;background: linear-gradient(0deg, rgba(224,247,250,1) 5%, rgba(224,247,250,0.9) 30%, rgba(224,247,250,0.7) 60%, rgba(224,247,250,0.45) 80%, rgba(224,247,250,0) 100%);z-index:10"></div>
        <h2 class="text-weight-thin" style="position:absolute;top:-4px;z-index:100;left:10px; right:10px;margin:auto;text-shadow:0 0 5px white,0 0 2px white; color:#253239">ROADMAP</h2>
      </q-card-section>
    </q-card>

    <q-markdown :src="markdown" toc @data="onToc" />
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn
        fab
        icon="keyboard_arrow_up"
        :class="{ 'text-black bg-grey-4': $q.dark.isActive, 'text-white bg-primary': !$q.dark.isActive }"
      />
    </q-page-scroller>
  </div>
</template>

<script>
import markdown from '../markdown/landing.md'

const images = [
  'statics/images/locks.jpg',
  'statics/images/hammers.jpg',
  'statics/images/lightning.jpg',
  'statics/images/feather.jpg',
  'statics/images/bigben.jpg',
  'statics/images/boat.jpg'
]

export default {
  name: 'LandingPage',
  serverCacheKey: () => 'landing',
  mounted () {
    // have to do this to squeeze perf on slow connections because the
    // method that quasar uses to change the slide actually forces a
    // request from the server because of background:url() call
    // which is TONS of useless traffic - and makes a flash of white
    // between slides on some browsers (iOS for example)
    for (let x = 0; x < images.length; x++) {
      const img = new Image()
      img.crossOrigin = 'Anonymous'
      img.onload = () => {
        let canvas = document.createElement('CANVAS')
        const ctx = canvas.getContext('2d')
        canvas.height = img.naturalHeight
        canvas.width = img.naturalWidth
        ctx.drawImage(img, 0, 0)
        const res = canvas.toDataURL('image/jpeg')
        if (res.length >= 1) {
          this.slides[x].img = res
        }
        canvas = null
      }
      img.src = images[x]
    }
  },
  data () {
    return {
      bundle: false,
      mermTex: '',
      slide: 'SECURITY',
      credits: false,
      markdown: markdown,
      slides: [
        {
          title: 'SECURITY',
          text: 'is the Tauri-Team\'s biggest priority and drives our innovation.',
          img: 'statics/images/locks.jpg',
          unsplashLink: '@dynamicwang',
          unsplashName: 'Dynamic Wang'
        },
        {
          title: 'BROWNFIELD',
          text: 'compatibility with any front-end framework means you don\'t have to change your stack.',
          img: 'statics/images/hammers.jpg',
          unsplashLink: '@Sucrebrut',
          unsplashName: 'Sucrebrut'
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
          img: 'statics/images/feather.jpg',
          unsplashLink: '@_javardh_001',
          unsplashName: 'Javardh'
        },
        {
          title: 'RELIABILITY',
          text: 'of the underlying code base is why we forked critical libraries.',
          img: 'statics/images/bigben.jpg',
          unsplashLink: '@louisk_',
          unsplashName: 'Louis. K'
        },
        {
          title: 'FLOSS',
          text: 'licensing is possible with Tauri, but not with Chromium consumers, like Electron.',
          img: 'statics/images/boat.jpg',
          unsplashLink: '@jplenio',
          unsplashName: 'Johannes Plenio'
        }
      ],
      actions: [
        {
          icon: 'ti-crown',
          claim: 'Tauri is a polyglot toolchain for building more secure native apps with both tiny and fast binaries.',
          btnLabel: 'Get Setup!',
          btnTarget: '/docs/quickstart'
        },
        {
          icon: 'ti-settings',
          claim: 'Tauri lets you use any frontend-framework to build apps, and it can be integrated into any pipeline.',
          btnLabel: 'Learn How!',
          btnTarget: '/docs/examples'
        },
        {
          icon: 'ti-package',
          claim: 'Tauri helps you build and bundle binaries for major desktop platforms (mobile & wasm coming soon).',
          btnLabel: 'Ship It!',
          btnTarget: '/docs/bundler'
        },
        {
          icon: 'ti-key',
          claim: 'Tauri has many design patterns to help you choose important features with simple configuration.',
          btnLabel: 'Discover!',
          btnTarget: '/docs/patterns'
        },
        {
          icon: 'ti-shield',
          claim: 'With security features baked in and many additional tools available, your code will be safer than ever.',
          btnLabel: 'Be Safer!',
          btnTarget: '/docs/security'
        },
        {
          icon: 'ti-gift',
          claim: 'As a sustainable FLOSS project, we do our best to mitigate bus-factor and are open to everyone.',
          btnLabel: 'Join Us!',
          btnTarget: '/governance-and-guidance'
        }
      ],
      timeline: [
        {
          icon: 'ti-target',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'CLI',
          caption: 'Generate, develop and build Tauri apps from the command line.',
          time: 'Q4 2019'
        },
        {
          icon: 'ti-crown',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'API',
          caption: 'Finalize, audit, write documentation and create examples for the smoke-tests.',
          time: 'Q4 2019'
        },
        {
          icon: 'ti-pulse',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Testing & CI',
          caption: 'Implement CI with testing and bundle-pipeline validation.',
          time: 'Q4 2019'
        },
        {
          icon: 'ti-desktop',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Desktop Bundler',
          caption: 'Bundle for all major desktops from native systems.',
          time: 'Q4 2019'
        },
        {
          icon: 'ti-flag-alt',
          iconColor: 'red',
          iconTextColor: 'white',
          label: 'Alpha Release',
          caption: 'Mostly stable on desktop, edge cases and bugs acceptable.',
          time: 'Q4 2019'
        },
        {
          icon: 'ti-cup',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'DENO',
          caption: 'Enable alternative DENO CLI.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-bolt',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'WASM Bundler',
          caption: 'Manufacture WASM bundler for use in websites.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-shine',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'PureOS App Store',
          caption: 'Verified builds for PureOS.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-panel',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'App Tray',
          caption: 'Desktop Cross-platform Icon Tray.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-announcement',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Native Notifications',
          caption: 'Cross-platform notifications using polyfilled WEB API.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-mobile',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Mobile Bundler',
          caption: 'Bundle to all major mobile device operating systems.',
          time: 'Q1 2020'
        },
        {
          icon: 'ti-flag-alt',
          iconColor: 'red',
          iconTextColor: 'white',
          label: 'Beta Release',
          caption: 'Mostly stable on Desktop & Mobile.',
          time: 'Q2 2020'
        },
        {
          icon: 'ti-control-shuffle',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Cross Compiler',
          caption: 'Generate bundled binaries from select operating system environments.',
          time: 'Q3 2020'
        },
        {
          icon: 'ti-direction-alt',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Alternative Renderer',
          caption: 'Candidate presentation for Webview Alternatives, including GL windowing.',
          time: 'Q3 2020'
        },
        {
          icon: 'ti-slice',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Tauri-Frida',
          caption: 'A decompiler and threat analyzer for Tauri Apps, using Frida.',
          time: 'Q4 2020'
        },
        {
          icon: 'ti-flag-alt',
          iconColor: 'red',
          iconTextColor: 'white',
          label: 'Stable Release',
          caption: 'Stable on On all Platforms.',
          time: 'Q4 2020'
        },
        {
          icon: 'ti-world',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'Other Bindings',
          caption: 'Go, Nim, Python, C++ and other bindings are possible with the stable API.',
          time: 'Q1 2021'
        },
        {
          icon: 'ti-infinite',
          iconColor: 'blue',
          iconTextColor: 'white',
          label: 'The Future',
          caption: 'Something missing? Got a great idea? We want you to help us make it happen.',
          time: '& BEYOND'
        }
      ]
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
  methods: {
    onToc (toc) {
      toc.unshift({ id: 'Roadmap', label: 'Roadmap', level: 2, children: Array(0) })
      toc.unshift({ id: 'Quicklinks', label: 'Quick Links', level: 2, children: Array(0) })
      this.toc = toc
    },
    extendMarkdown (md) {
      md.use(this.mermaid)
    },
    mermaid (md, options) {
      md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
        const token = tokens[idx]
        const code = token.content.trim()
        return `<div class="mermaid">\n${code}\n</div>\n`
      }
    }
  }
}
</script>
<style lang="stylus">
  #Donations-and-Sponsoring
    text-align: center
  i.themify-icon.ti-star::before
    margin-top -4px!important
</style>
