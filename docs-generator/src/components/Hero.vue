<template>
  <div class="full-width q-pa-md">
    <q-page-sticky id="hero" expand class="page-header fixed-top shadow-8 scroll-determined z-top" v-scroll="scrolled" style="position:fixed!important;">
      <div id="claim">
        <q-chip v-if="$route.name === 'landing'" outline dense square class="claim text-weight-light text-black bg-cyan-1 shadow-8" style="top: 84%">
          <q-icon name="star"></q-icon>
          <span class="text-weight-light text-caption">Build more secure native apps with fast, tiny binaries.</span>
          <q-icon name="star"></q-icon>
        </q-chip>
      </div>
      <div class="bg-container scroll-determined q-pa-md q-ml-lg"></div>
      <div>
        <router-link to="/">
          <div id="tauri-name--holder">
            <img src="statics/tauri.svg" class="tauri-name scroll-determined" style="cursor:pointer" alt="Tauri Wordmark" title="Tauri">
          </div>
        </router-link>
        <div v-if="buttons" class="row" style="margin-top:90px">
          <q-btn name="Quick Start" dense size="small" to="/docs/quickstart" class="btn" label="Quick Start" no-caps color="yellow-2" text-color="black"/>
          <q-btn name="Patterns" dense size="small" to="/docs/patterns" class="btn" label="Patterns" no-caps color="yellow-2" text-color="black"/>
          <q-btn name="Docs" v-if="showDocs" dense size="small" to="/docs" class="btn" label="Docs" no-caps  color="yellow-2" text-color="black"/>
        </div>
        <q-btn
          flat
          dense
          round
          @click="sidebar"
          aria-label="Menu"
          color="cyan-1"
          class="z-top"
          style="margin:16px 12px 0 0;position:fixed;top:0;right:0"
        >
          <q-icon name="menu" />
        </q-btn>
        <div class="absolute-right" style="margin:18px 20px 0 0;">
          <q-btn-dropdown flat dense text-color="cyan-1" :label="current" no-caps class="q-mr-lg">
            <q-list color="yellow-2" >
              <q-item dense clickable v-close-popup to="/docs/introduction" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Introduction</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/quickstart">
                <q-item-section>
                  <q-item-label>Quickstart</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup to="/security" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Security</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/contribute" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Contribute</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item dense clickable v-close-popup to="/docs/config" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Config</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/api" v-if="showDocs">
                <q-item-section>
                  <q-item-label>API</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/cli" v-if="showDocs">
                <q-item-section>
                    <q-item-label>CLI</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/bundler" v-if="showDocs">
                <q-item-section>
                    <q-item-label>Bundler</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item dense clickable v-close-popup to="/docs/patterns">
                <q-item-section>
                  <q-item-label>Patterns</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/frameworks">
                <q-item-section>
                  <q-item-label>Frameworks</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/docs/no-server">
                <q-item-section>
                  <q-item-label>No Server</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/wtf">
                <q-item-section>
                  <q-item-label>WTF</q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item dense clickable v-close-popup to="/book" v-if="showDocs">
                <q-item-section>
                    <q-item-label>Book</q-item-label>
                </q-item-section>
              </q-item>
              <q-item dense clickable v-close-popup to="/governance-and-guidance">
                <q-item-section>
                  <q-item-label>Governance</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
    </q-page-sticky>
    <main class="flex flex-start justify-center">
      <div class="q-pa-sm col-12-sm col-10-md col-8-lg" style="max-width: 1024px; width: 100%;">
        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data () {
    return {
      buttons: true,
      height: 270,
      heightName: 140,
      heightPic: 250,
      heightClaim: 100,
      rightDrawerOpen: false
    }
  },
  mounted () {
    this.scrolled(document.offsetTop)
  },
  computed: {
    showDocs () {
      const { showDocslink } = this.$route.meta
      return typeof showDocslink === 'undefined' || showDocslink
    },
    current () {
      return this.$route.meta.name
    }
  },
  methods: {
    sidebar () {
      // const action = !!this.rightDrawerOpen
      this.$store.commit('common/rightDrawerOpen', true)
    },
    scrolled (position) {
      const pos = position / 4.5
      this.height = 270 - (pos)
      this.heightName = 140 - (pos)
      this.heightPic = 250 - (pos)
      this.heightClaim = 220 - (pos)

      // todo: cleanup, use vuex, be faster!
      // the buttons
      if (pos >= 110 && this.buttons !== false) {
        this.buttons = false
        document.getElementsByClassName('scroll-determined')[0].setAttribute('style', 'height: 70px')
        // the icon
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: 55px;width: 55px;transform: rotate(${position}deg)`)
        // the name
        document.getElementsByClassName('tauri-name')[0].setAttribute('style', 'height: 30px')
        document.getElementsByClassName('tauri-name')[0].classList.add('animateLeft')
        // claim
        // the sidebar id="scrollHolder" style="height:50%"
        document.getElementsByClassName('q-drawer__content')[0].setAttribute('style', 'margin-top: 60px')
        document.getElementById('scrollHolder').setAttribute('style', 'height: calc(100% - 132px)')
        document.getElementById('padding').setAttribute('style', 'height: 70px')
      } else if (this.buttons === false) {
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: 55px;width: 55px;transform: rotate(${position}deg)`)
        document.getElementById('claim').setAttribute('style', 'display: none')
      } else {
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `transform: rotate(${position}deg)`)
        document.getElementsByClassName('scroll-determined')[0].setAttribute('style', `height: ${this.height}px`)
        // the icon
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: ${this.heightPic - 5}px;width: ${this.heightPic}px;transform: rotate(${position}deg)`)
        // the name
        document.getElementsByClassName('tauri-name')[0].setAttribute('style', `height: ${this.heightName}px;`)
        // claim
        document.getElementById('claim').setAttribute('style', 'display: none')
        // the sidebar
        document.getElementsByClassName('q-drawer__content')[0].setAttribute('style', `margin-top: ${this.height + 20}px`)
      }

      /*
      document.getElementsByClassName('scroll-determined')[0].setAttribute('style', `height: ${this.height}px`)
      // the icon
      document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: ${this.heightPic - 5}px;width: ${this.heightPic}px;transform: rotate(${position}deg)`)
      // the name
      document.getElementsByClassName('tauri-name')[0].setAttribute('style', `
      height: ${this.heightName}px;
      `)
      // claim
      document.getElementById('claim').setAttribute('style', `top: ${this.heightClaim}px`)
      // the sidebar
      document.getElementsByClassName('q-drawer__content')[0].setAttribute('style', `margin-top: ${this.height + 10}px`)
      */
    }
  }
}
</script>

<style lang="stylus">
.q-menu
  z-index 1000000
.tauri-name--holder
  width 300px
  height 10px
  left 0
  right 0
  background red
.tauri-name
  max-height 110px!important
  min-height 30px
  max-width 50%
  height inherit
  position fixed
  text-align center
  margin 0 30%
  top 21px
  left 0
.page-header
  height 270px
  border-bottom 2px solid #212111
.bg-container
  background-image url(/statics/thetaTauri_logo.png)
  background-repeat no-repeat
  background-size contain
  position absolute
  left -10px
  top 5px
  height 250px
  width 250px
  max-height 250px
  max-width 250px
  min-height 60px
  min-width 60px
.claim
  position absolute
  margin 0 auto
  left 20px
  right 20px
  width 346px
  i
    margin: 0 2px
    color rebeccapurple
    text-shadow 0 0 1px #0099dd
.animateLeft
  animation-duration 1s
  animation-name slideover
  animation-iteration-count 1
  animation-fill-mode forwards
@keyframes slideover
  from
    margin-left 30%
  to
    margin-left 80px
</style>
