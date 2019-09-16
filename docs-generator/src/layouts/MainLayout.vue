<template>
  <q-layout view="hHh lpR fFr">
    <q-btn
      flat
      dense
      round
      @click="rightDrawerOpen = !rightDrawerOpen"
      aria-label="Menu"
      color="cyan-1"
      class="fixed-right"
      style="margin:15px 5px 0 0;z-index:1000001"
    >
      <q-icon name="menu" />
    </q-btn>
    <!--
    <q-header elevated reveal :reveal-offset="250">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          color=""
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          Tauri <span class="text-subtitle2">v{{ version }}</span>
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>

        <q-btn
          flat
          dense
          round
          @click="rightDrawerOpen = !rightDrawerOpen"
          aria-label="Table of Contents"
        >
          <q-icon name="menu" />
        </q-btn>

      </q-toolbar>
    </q-header>
    -->

    <q-drawer
      ref="drawer"
      v-model="rightDrawerOpen"
      side="right"
      bordered
      behavior="mobile"
      content-style="background-color: #FDFADE;margin-top: 260px;padding-top:30px;"
    >
      <q-scroll-area
        id="scrollHolder"
        style="height:calc(100% - 320px)"
        :thumb-style="{ right: '3px', borderRadius: '2px', background: '#ffaa00', width: '6px', opacity: 0.5 }"
      >
        <q-list dense>
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
      <div class="absolute-bottom full-width text-center bg-cyan-1">
        <q-separator></q-separator>
        <div class="q-pa-sm" style="font-size:0.9em">
          Tauri is an Open Source Project<br/>
          <a href="https://github.com/tauri-apps/tauri" target="_blank" rel="noreferrer">GitHub</a>
          &nbsp;||&nbsp;
          <a href="https://opencollective.com/tauri" target="_blank" rel="noreferrer">Donate</a>
          &nbsp;||&nbsp;
          <a href="https://github.com/tauri-apps/governance-and-guidance" target="_blank" rel="noreferrer">Governance</a>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { scroll } from 'quasar'
const { getScrollTarget, setScrollPosition } = scroll
import { slugify, makeUrl } from 'assets/page-utils'

export default {
  name: 'MainLayout',

  data () {
    return {
      rightDrawerOpen: false,
      activeToc: 0
    }
  },

  computed: {
    ...mapGetters({
      toc: 'common/toc'
    })
  },

  mounted () {
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
      console.log(el)
      const target = getScrollTarget(el)
      const offset = el.offsetTop - 50
      setScrollPosition(target, offset, 500)
    }
  }
}
</script>

<style lang="stylus">
.toc-level
  &-2
    margin-left 0
    font-weight 800
  &-3
    margin-left 10px
</style>
