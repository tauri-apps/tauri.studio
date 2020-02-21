<template>
  <q-layout view="hHh lpR ffr">
    <q-drawer
      ref="drawer"
      v-model="rightDrawerOpen"
      side="right"
      bordered
      behavior="mobile"
      :content-style="contentStyle"
    >
      <q-scroll-area
        id="scrollHolder"
        style="height:calc(100% - 80px)"
        :thumb-style="{ right: '3px', borderRadius: '2px', background: '#ffaa00', width: '6px', opacity: 0.5 }"
      >
        <q-list dense class="q-pt-lg">
          <q-item
            v-for="item in toc"
            :key="item.id"
            clickable
            v-ripple
            dense
            @click="scrollTo(item.id)"
            :active="activeToc === item.id"
          >
          <!--<q-item-section v-if="item.level > 1" side> • </q-item-section>-->
            <q-item-section
              :class="`toc-item toc-level-${item.level}`"
            >{{ item.label }}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
      <div class="absolute-bottom full-width text-center" :class="$q.dark.isActive ? 'bg-blue-grey-6' : 'bg-cyan-1'">
        <q-separator></q-separator>
        <div  class="absolute-left" style="margin:6px 0 0 10px">
          <q-btn flat round type="a" href="https://github.com/tauri-apps/tauri" icon="fab fa-github" />
        </div>
        <div class="q-pa-sm" style="font-size:0.9em">
          Tauri is an Open Source Project<br/>
          <a href="https://github.com/tauri-apps/tauri" target="_blank" rel="noreferrer">GitHub</a>
          &nbsp;|&nbsp;
          <router-link :to="{name: 'partners'}">
            Partners
          </router-link>
          &nbsp;|&nbsp;
          <router-link :to="{name: 'governance-and-guidance'}">Governance</router-link>
        </div>
        <div  class="absolute-right" style="margin:5px 10px 0 0">
          <q-btn type="a" flat round @click="$q.dark.toggle()" :icon="$q.dark.isActive ? 'brightness_2' : 'brightness_5'" />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive include="Patterns">
        <hero>
          <router-view />
        </hero>
      </keep-alive>
      <UpScroller />
    </q-page-container>

    <div class="full-width" :class="$q.dark.isActive ? 'bg-blue-grey-8' : 'bg-cyan-1'">
      <q-separator></q-separator>
      <div class="row q-pa-sm q-ml-lg" style="font-size:0.9em">
        <div class="col-8 col-md-4 col-sm-3">
          <div class="q-pt-md">
            <span class="text-weight-bold">
              <q-icon name="ti-comment-alt"></q-icon>
              CONTACT
            </span>
            <q-separator></q-separator>
            <div class="row q-mt-xs">
              <q-btn flat round class="footer-item">
                <a href="mailto:contact@tauri.studio" target="_blank">
                  <q-icon name="mail"></q-icon>
                </a>
              </q-btn>
              <q-btn flat round class="footer-item">
                <a href="https://discord.gg/SpmNs4S" target="_blank" rel="noreferrer">
                <q-icon :name="$q.dark.isActive ? 'img:statics/discord.svg' : 'img:statics/discord-light.svg'" />
                </a>
              </q-btn>
              <q-btn flat round class="footer-item">
                <a href="https://twitter.com/tauriapps" target="_blank" rel="noreferrer">
                  <q-icon name="fab fa-twitter"></q-icon>
                </a>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col-1 col-md-1 col-sm-1"></div>
        <div class="col-8 col-md-4 col-sm-3">
          <div class="q-pt-md">
            <span class="text-weight-bold">
              <q-icon name="ti-direction-alt"></q-icon>
              NETWORK
            </span>
            <q-separator></q-separator>
            <div class="row q-mt-xs">
              <q-btn flat round class="footer-item">
                <a href="https://dev.to/tauri" target="_blank" rel="noreferrer">
                  <q-icon name="fab fa-dev"></q-icon>
                </a>
              </q-btn>
              <q-btn flat round class="footer-item">
              <a href="https://opencollective.com/tauri" target="_blank" rel="noreferrer">
                <q-icon :name="$q.dark.isActive ? 'img:statics/open-collective.svg' : 'img:statics/open-collective-light.svg'" />
              </a>
              </q-btn>
              <q-btn flat round class="footer-item">
                <a href="https://github.com/tauri-apps/tauri" target="_blank" rel="noreferrer">
                  <q-icon name="fab fa-github"></q-icon>
                </a>
              </q-btn>
            </div>
          </div>
        </div>
        <div class="col"></div>
      </div>
    </div>
  </q-layout>
</template>

<script>
/* eslint quotes: 0 */

import { mapGetters } from 'vuex'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import { slugify, makeUrl } from 'assets/page-utils'
import Hero from '../components/Hero'
import UpScroller from 'src/components/UpScroller'

export default {
  name: 'MainLayout',
  components: {
    Hero: Hero,
    UpScroller: UpScroller
  },
  data () {
    return {
      activeToc: 0
    }
  },
  meta () {
    return {
      title: this.metaRoute.page_title,
      meta: {
        ogUrl: { name: 'og:url', content: `https://tauri.studio/en/${this.$route.name}` },
        ogTitle: { name: 'og:title', content: this.metaRoute.page_title },
        twitterTitle: { name: 'twitter:title', content: this.metaRoute.page_title },
        ogSiteName: { name: 'og:site_name', content: 'Tauri Studio' },
        desc: { name: 'description', content: this.metaRoute.description },
        ogDesc: { name: 'og:description', content: this.metaRoute.description },
        twitterDesc: { name: 'twitter:description', content: this.metaRoute.description },
        keywords: { name: 'keywords', content: this.metaRoute.tags }
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: `
{
  "@context": "http://schema.org",
  "@type": "Article",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://tauri.studio/en/${this.$route.name}"
  },
  "name": "${this.metaRoute.page_title}",
  "author": {
    "@type": "Organization",
    "name": "Tauri"
  },
  "image": [
    "https://tauri.studio/statics/thetaTauri_logo.png"
  ],
  "description": "${this.metaRoute.description}",
  "keywords": "${this.metaRoute.tags}"
}`
        }
      },
      noscript: {
        default: `Welcome to tauri.studio: ${this.metaRoute.page_title} This website requires JavaScript - and here you would have learned about the following: ${this.metaRoute.description}`
      }
    }
  },
  computed: {
    metaRoute () {
      return this.$route.meta
    },
    ...mapGetters({
      toc: 'common/toc'
    }),
    rightDrawerOpen: {
      get () {
        return this.$store.state.common.rightDrawerOpen
      },
      set (rightDrawerOpen) {
        // console.log('toc:', toc)
        this.$store.commit('common/rightDrawerOpen', rightDrawerOpen)
      }
    },
    contentStyle () {
      return {
        background: this.$q.dark.isActive ? '' : '#FDFADE',
        paddingTop: '70px'
      }
    }
  },

  mounted () {
    // todo: fade the landing logo out instead of this brutal hack
    document.getElementById('tauri-studio-logo').setAttribute('style', 'display:none')
    // code to handle anchor link on refresh/new page, etc
    if (location.hash !== '') {
      const id = location.hash.substring(1, location.hash.length)
      this.scrollTo(id)
    }
  },

  methods: {
    scrollTo (id) {
      this.$refs.drawer.hide()
      this.activeToc = id
      const el = document.getElementById(id)
      if (el) {
        setTimeout(() => {
          this.scrollPage(el)
          makeUrl(slugify(id))
        }, 200)
      }
    },
    scrollPage (el) {
      const target = getScrollTarget(el)
      const current = window.pageYOffset || document.documentElement.scrollTop
      let offset = el.offsetTop - 80
      if (current <= 50) offset = el.offsetTop - 250
      setScrollPosition(target, offset, 500)
    }
  }
}
</script>

<style lang="stylus">
.footer-item
  font-size 16px
h2
  margin-left -10px!important
.toc-level
  &-2
    margin-left 0
    font-weight 800
  &-3
    margin-left 10px
</style>
