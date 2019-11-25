<template>
  <q-layout view="hHh lpR ffr">
    <q-header>
    </q-header>

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
          <router-link to="/governance-and-guidance">Governance</router-link>
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <keep-alive include="Patterns">
        <router-view />
      </keep-alive>
    </q-page-container>

    <div class="full-width text-center bg-cyan-1">
      <q-separator></q-separator>
      <div class="row q-pa-sm" style="font-size:0.9em">
        <div class="col-6 col-md-4 col-sm-3" dense>
          <q-list>
            <q-item clickable class="justify-center" dense>
              <a href="mailto:contact@tauri-apps.org">Email</a>
            </q-item>
            <q-item clickable class="justify-center" dense>
              <a href="https://discord.gg/SpmNs4S">Discord</a>
            </q-item>
            <q-item clickable class="justify-center" dense>
              <a href="https://twitter.com/tauriapps">Twitter</a>
            </q-item>
          </q-list>
        </div>
        <div class="col-6 col-md-4 col-sm-3" dense>
          <q-list>
            <q-item clickable class="justify-center" dense>
              <a href="https://dev.to/tauri">Dev.to</a>
            </q-item>
            <q-item clickable class="justify-center" dense>
            <a href="https://opencollective.com/tauri">Open Collective</a>
            </q-item>
            <q-item clickable class="justify-center" dense>
              <a href="https://github.com/tauri-apps/tauri">Github</a>
            </q-item>
          </q-list>
        </div>
        <div class="col-10 col-md-2 col-sm-2 text-left" dense>
          Tauri-Apps is an Open Source project licensed under MIT. Please get in touch with us if you have any questions.
        </div>
        <div class="col"></div>
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
      activeToc: 0
    }
  },

  computed: {
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
    }
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
