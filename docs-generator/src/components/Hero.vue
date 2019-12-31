<template>
  <div class="full-width q-pa-md">
    <q-page-sticky id="hero" expand class="page-header fixed-top shadow-8 scroll-determined z-top" style="position:fixed!important;">
      <div class="bg-container scroll-determined q-pa-md q-ml-lg"></div>
      <div>
        <router-link to="/">
          <div id="tauri-name--holder">
            <img src="statics/tauri.svg" class="animateLeft tauri-name scroll-determined" style="cursor:pointer" alt="Tauri Wordmark" title="Tauri">
          </div>
        </router-link>
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
        <div class="absolute-right" style="margin:18px 24px 0 0;">
          <router-link v-if="$route.name === 'landing'" :to="{name: 'introduction'}">
            <q-btn dense outline text-color="cyan-1" no-caps class="q-mr-xl">Introduction</q-btn>
          </router-link>
          <q-btn-dropdown v-else outline dense text-color="cyan-1" :label="current" no-caps class="q-mr-lg">
            <q-list color="yellow-2" >
              <q-item dense clickable v-close-popup :to="{name: 'introduction'}" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Introduction</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup :to="{name: 'security'}" v-if="showDocs">
                <q-item-section>
                  <q-item-label>Security</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup :to="{name: 'patterns'}">
                <q-item-section>
                  <q-item-label>Patterns</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup>
                <q-item-section>
                  <q-item-label><a href="https://github.com/tauri-apps/tauri/wiki" target="_blank">Documentation</a></q-item-label>
                </q-item-section>
              </q-item>

              <q-separator />
              <q-item dense clickable v-close-popup :to="{name: 'book'}" v-if="showDocs">
                <q-item-section>
                    <q-item-label>Book</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup :to="{name: 'partners'}" v-if="showDocs">
                <q-item-section>
                    <q-item-label>Partners</q-item-label>
                </q-item-section>
              </q-item>

              <q-item dense clickable v-close-popup :to="{name: 'governance-and-guidance'}">
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
    // this.scrolled(document.offsetTop)
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
    }
    /*
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
    // }
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
  height 30px
  min-height 30px
  max-width 50%
  position fixed
  text-align center
  margin 0 30%
  top 21px
  left 0
.page-header
  height 70px
  border-bottom 2px solid #212111
.bg-container
  background-image url(/statics/thetaTauri_logo.png)
  background-repeat no-repeat
  background-size contain
  position absolute
  left -10px
  top 5px
  height 60px
  width 60px
  max-height 250px
  max-width 250px
  min-height 60px
  min-width 60px
.animateLeft
  animation-duration 1s
  animation-delay 5s
  animation-name slideover
  animation-iteration-count 1
  animation-fill-mode forwards
@keyframes slideover
  from
    margin-left 30%
  to
    margin-left 80px
</style>
