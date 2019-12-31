<template>
<div style="z-index:200000;">
  <q-select
    v-if="longStyle"
    v-model="tempLocale"
    :options="locales"
    :label="$t('labels.interfaceLanguage')"
    stack-label
    outlined
    dense
    options-dense
    :option-value="opt => opt.lang"
    :option-label="opt => opt.langNative"
    @input="val => changeLang(val.lang)"
    popup-content-style="border-radius: 0 0 5px 5px, margin: 0 10px;"
  />
  <q-btn
    v-else
    ref="selectLanguages"
    icon="fal fa-globe"
    :label="$t('langLabel')"
    flat
    dense
    class="justify-right"
    style="width:60px;text-align:right!important"
  >
    <q-menu
      style="width:250px;"
      anchor="bottom right"
      self="top right"
      :offset="[0,-1]"
      content-class="menuCaret"
      square
      flat
    >
      <q-list dense separator>
        <q-item
          clickable
          v-close-popup
          v-for="(language, index) in locales"
          :key="index"
          @click="changeLang(language.lang)"
          :disable="routeLocale === language.lang"
        >
          <q-item-section>
            <div class="row">
              <q-icon class="col-1"
                v-if="routeLocale === language.lang"
                name="fal fa-check-circle"
                color="primary"
              />
              <q-icon class="col-1" v-else name="fal fa-circle" color="grey-6" />
              <div class="col-2"></div>
              <div class="col-8"> {{ language.langNative }} </div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</div>
</template>

<script>
import * as locales from '../../../i18n/localesObj.json'
/**
 * @category i18n
 * @component
 */
export default {
  name: 'LangSwitcher',
  props: {
    lang: {
      type: String,
      default: 'en'
    },
    longStyle: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      locales: locales.default,
      tempLocale: ''
    }
  },
  computed: {
    routeLocale () {
      return this.$q.cookies.get('locale') || this.$route.params.locale
    },
    locale: {
      get: function () {
        const val = this.$q.cookies.get('locale') || this.$route.params.locale || 'en'
        return val
      },
      set (val) {
        return val
      }
    }
  },
  mounted () {
    this.$nextTick(async () => {
      const userLocale = this.$q.cookies.get('locale')
      this.locales.forEach(obj => {
        if (obj.lang === userLocale) {
          this.tempLocale = obj
        }
      })
    })
  },
  methods: {
    reroute (val) {
      // const hostName = window.location.hostname.substring(window.location.hostname.lastIndexOf('.', window.location.hostname.lastIndexOf('.') - 1) + 1)
      let route = document.location.pathname.split('/')
      route[1] = val
      route = route.join('/')
      if (location.search) route = route + location.search
      return route
    },
    changeLang: async function (val) {
      if (val === this.$route.params.locale) { return }
      const route = this.reroute(val)
      this.$q.cookies.set('locale', val)
      // mutate if we have an ID
      await this.$router.push(route)
    }
  }
}
</script>
