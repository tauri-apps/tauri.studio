<template>
  <div class="full-width q-pa-md">
    <q-page-sticky expand class="page-header fixed-top shadow-8 scroll-determined" v-scroll="scrolled" style="position:fixed!important">
      <q-chip outline dense square class="claim text-weight-light text-black bg-cyan-1 shadow-8" style="top: 84%">
        <q-icon name="star"></q-icon>
        <span>Build more secure native apps with fast, tiny binaries.</span>
        <q-icon name="star"></q-icon>
      </q-chip>
      <div class="bg-container scroll-determined q-pa-md q-ml-lg"></div>
      <div>
        <router-link to="/">
          <img src="statics/tauri-wordmark.png" class="tauri-name scroll-determined" style="cursor:pointer">
        </router-link>
        <div v-if="buttons" class="row" style="margin-top:90px">
          <q-btn dense size="small" to="/docs/quickstart"  class="btn" label="Quick Start" no-caps color="yellow-2" text-color="black"/>
          <q-btn dense size="small" to="/docs/patterns" class="btn" label="Patterns" no-caps  color="yellow-2" text-color="black"/>
          <q-btn v-if="showDocs" dense size="small" to="/docs" class="btn" label="Docs" no-caps  color="yellow-2" text-color="black"/>
        </div>
      <div class="absolute-right" style="margin:18px 35px 0 0;">
        <q-btn-dropdown dense color="yellow-2" :label="current" no-caps text-color="black" class="q-mr-lg">
          <q-list color="yellow-2" >
            <q-item clickable v-close-popup to="/docs" v-if="showDocs" @click="current='Docs'">
              <q-item-section>
                <q-item-label>Docs</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/book" v-if="showDocs" @click="current='Book'">
              <q-item-section>
                  <q-item-label>Book</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/docs/api" v-if="showDocs" @click="current='API'">
              <q-item-section>
                  <q-item-label>API</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/docs/quickstart">
              <q-item-section>
                <q-item-label>Quick Start</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/docs/patterns">
              <q-item-section>
                <q-item-label>Patterns</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup to="/docs/environment">
              <q-item-section>
                <q-item-label>Environment</q-item-label>
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
      current: 'Menu',
      height: 270,
      heightName: 140,
      heightPic: 250,
      heightClaim: 100,
      rightDrawerOpen: this.$q.platform.is.desktop
    }
  },
  mounted () {
    // this.scrolled(document.offset().top)
  },
  computed: {
    showDocs () {
      const { showDocslink } = this.$route.meta
      return typeof showDocslink === 'undefined' || showDocslink
    }
  },
  methods: {
    scrolled (position) {
      const pos = position / 4
      this.height = 270 - (pos)
      this.heightName = 140 - (pos)
      this.heightPic = 250 - (pos)
      this.heightClaim = 220 - (pos)

      // todo: cleanup, use vuex, be faster!
      // the buttons
      if (pos >= 50 && this.buttons !== false) {
        this.buttons = false
        document.getElementsByClassName('scroll-determined')[0].setAttribute('style', `height: 70px`)
        // the icon
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: 55px;width: 55px;transform: rotate(${position}deg)`)
        // the name
        document.getElementsByClassName('tauri-name')[0].setAttribute('style', `
      height: 35px;
      `)
        // claim
        // document.getElementById('claim').setAttribute('style', `top: 58px`)
        // the sidebar id="scrollHolder" style="height:50%"
        document.getElementsByClassName('q-drawer__content')[0].setAttribute('style', `background-color: #FDFADE;margin-top: 60px;padding-top:20px`)
        document.getElementById('scrollHolder').setAttribute('style', `height: calc(100% - 132px)`)
        document.getElementById('padding').setAttribute('style', `height: 40px`)
      } else if (this.buttons === false) {
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `height: 55px;width: 55px;transform: rotate(${position}deg)`)
      } else {
        document.getElementsByClassName('scroll-determined')[1].setAttribute('style', `transform: rotate(${position}deg)`)
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
.tauri-name
  max-height 100px
  min-height 20px
  max-width 50%
  height inherit
  position fixed
  margin auto
  top 15px
  left 0
  right 0
.page-header
  height 270px
  z-index 1000000
  border-bottom 2px solid #212111
.bg-container
  background-image url(/statics/thetaTauri_logo.png)
  background-repeat no-repeat
  background-size contain
  position absolute
  left -5px
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
  width 363px
  text-align center
  color darkred
  i
    color #0099dd
    text-shadow 0 0 1px rebeccapurple
</style>
