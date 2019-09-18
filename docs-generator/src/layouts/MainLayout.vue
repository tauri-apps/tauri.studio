<template>
  <q-layout view="hHh lpR ffr">
    <q-btn
      flat
      dense
      round
      @click="rightDrawerOpen = !rightDrawerOpen"
      aria-label="Menu"
      color="cyan-1"
      class="fixed-right"
      style="margin:16px 12px 0 0;z-index:1000001"
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
        <q-card class="q-ma-md col-md-3 col-sm-5 q-mt-sm bg-cyan-1" flat bordered v-for="(item, index) in actions" :key="index">
          <q-icon :name="item.icon" class="float-left q-pa-lg q-ma-xs text-h5" style="margin: 11px 5px -1px 10px"></q-icon>
          <q-card-section>
            {{ item.claim }}
          </q-card-section>
          <q-card-actions align="center">
            <q-btn color="yellow-2" text-color="black" :to="item.btnTarget" :label="item.btnLabel"></q-btn>
          </q-card-actions>
        </q-card>
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

    <div class="full-width text-center bg-cyan-1">
      <q-separator></q-separator>
      <div class="row q-pa-sm" style="font-size:0.9em">
        <div class="col-6 col-md-4 col-sm-3" dense>
          <q-item to="/contact" class="text-center" dense>Email</q-item>
          <q-item to="/contact" class="text-center" dense>Discord</q-item>
          <q-item to="/contact" class="text-center" dense>Github</q-item>
        </div>
      </div>
    </div>
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
      const target = getScrollTarget(el)
      const current = window.pageYOffset || document.documentElement.scrollTop
      let offset = el.offsetTop - 50
      if (current <= 50) offset = el.offsetTop - 250
      setScrollPosition(target, offset, 500)
    }
  }
}
</script>

<style lang="stylus">
h2
  margin-left -10px!important
.toc-level
  &-2
    margin-left 0
    font-weight 800
  &-3
    margin-left 10px
</style>
