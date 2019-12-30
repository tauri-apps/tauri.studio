<template lang="pug">
  div(style="z-index:20000000;")
    q-select(
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
    )

    q-btn(
      v-else
      ref="selectLanguages"
      icon="fal fa-globe"
      :label="$t('langLabel')"
      flat
      dense
      class="justify-right"
      style="width:60px;text-align:right!important"
    )
      q-menu(
        style="width:250px;"
        anchor="bottom right"
        self="top right"
        :offset="[0,-1]"
        content-class="menuCaret"
        square
        flat
      )
        q-list(dense, separator)
          q-item(
            clickable
            v-close-popup
            v-for="(language, index) in locales"
            :key="index"
            @click="changeLang(language.lang)"
            :disable="routeLocale === language.lang"
          )
            q-item-section
              .row
                q-icon.col-1(
                  v-if="routeLocale === language.lang"
                  name="fal fa-check-circle"
                  color="primary"
                )
                q-icon.col-1(v-else name="fal fa-circle" color="grey-6")
                .col-2
                .col-8 {{ language.langNative }}
</template>

<script>
  import * as locales from '../i18n/localesObj.json'

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
        return this.$route.params.locale
      },
      locale: {
        get: async function () {
          const val = await this.$forage.getKeyValue({ key: 'user', value: 'locale' })() || this.$route.params.locale || 'en'
          return val
        },
        set (val) {
          return val
        }
      }
    },
    mounted () {
      this.$nextTick(async () => {
        const userLocale = await this.$forage.getKeyValue({ key: 'user', value: 'locale' })()
        this.locales.forEach(obj => {
          if (obj.lang === userLocale) {
            this.tempLocale = obj
          }
        })
      })
    },
    methods: {
      reroute (val) {
        let hostName = window.location.hostname
        hostName = hostName.substring(hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1)
        let route = document.location.pathname.split('/')
        route[1] = val
        route = route.join('/')
        if (location.search) route = route + location.search
        return route
      },
      changeLang: async function (val) {
        if (val === this.$route.params.locale) { return }
        const route = this.reroute(val)
        this.$forage.mergeItem({ key: 'user', value: { locale: val } })()
        // mutate if we have an ID
        if (await this.$meGet('id')) {
          this.$apollo
            .mutate({
              mutation: gql`
            mutation updateUser(
              $change: String!
            ) {
              updateUser (data: {
                locale: $change
              }) {
                locale
              }
            }`,
              variables: {
                change: val
              }
            })
            .catch(() => {})
        }
        await this.$router.push(route)
      }
    }
  }
</script>
