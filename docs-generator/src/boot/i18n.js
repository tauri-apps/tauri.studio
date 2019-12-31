/**
 * @module i18n
 * @category i18n
 * @description The i18n module serves a few important purposes:
 *  - Collect available locales
 *  - Collect common translation strings in all locales
 *  - Map quasar native i18n en-us to en
 *  - Rig vue-i18n
 *  - Detect and apply translation
 *    - Detect route parameter
 *    - Detect browser preference (default to en)
 *    - Detect user setting stored with forage (site & app) - even without a signup
 *  - Provide route guards
 *  - Provide components for language switching
 *  - Provide methods for direct language switching
 */

// todo: add Meta

import Quasar, { Cookies } from 'quasar'
import VueI18n from 'vue-i18n'
import localesList from '../../../i18n/localesList.json'
// import LangSwitcher from '../components/LangSwitcher.vue'

/**
 * Get and set the locale cookie
 * @category i18n
 * @type {function}
 * @property {object} ssrContext - required for isomorphism
 * @returns {string|boolean}
 */
const getLocaleCookie = function (ssrContext) {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
  const cookie = cookies.get('locale')
  if (cookie) {
    // guard to make sure the cookie IS a real value
    if (localesList.includes(cookie)) {
      return cookie.toLowerCase()
    }
  } else {
    return false
  }
}

/**
 * Get the Locale that the Browser defines
 * @category i18n
 * @type {function}
 * @param ssrContext
 * @returns {undefined|*}
 */
const getBrowserLocale = function (ssrContext) {
  // native Quasar version
  if (!ssrContext) {
    const language = Quasar.lang.getLocale()
    if (language) {
      // todo: fix it. what the heck does this really do?
      for (const locales of localesList) {
        if (locales.startsWith(language.split('-')[0])) {
          return locales
        }
      }
    } else {
      return undefined
    }
  }
}

/**
 * Detect that route locale param is a member of the set of locales
 *
 * @category i18n
 * @type {function}
 * @property {object} routeLocale - :locale param to check
 * @returns {string}  lower-cased locale
 *
 */
const getRoute = function (routeLocale) {
  // this guard makes sure only valid langs are served
  try {
    const validRoute = localesList.includes(routeLocale)
    if (validRoute) {
      return routeLocale
    }
  } catch (e) {
    // fallback to
    return 'en'
  }
}

/**
 * Replace locale in route
 *
 * @category i18n
 * @type {function}
 * @property {string} route - just the slashed route after the main URL
 * @property {string} locale - as determined by replaceLocal
 * @returns {string} new route
 */
const replaceLocale = function (route, locale) {
  route = route.split('/')
  route[1] = locale
  return route.join('/')
}

/**
 * Waterfall for Locale Discovery
 *
 * FLOW:
 *
 *  1. check if there's a forage
 *  2. if not, look for browser pref
 *  3. otherwise revert to route
 *
 * @category i18n
 * @function
 * @property {object} ssrContext - required for isomorphism
 * @property {object} router - object for route detection
 * @returns {string} Decision tree result
 */
const getLocale = function (ssrContext, routeLocale) {
  const locale = getLocaleCookie(ssrContext)
  if (typeof locale !== 'undefined') {
    return getRoute(locale)
  } else {
    return 'en'
  }
}

/*
const reroute = function (val) {
  let hostName = window.location.hostname
  hostName = hostName.substring(hostName.lastIndexOf('.', hostName.lastIndexOf('.') - 1) + 1)
  let route = document.location.pathname.split('/')
  route[1] = val
  route = route.join('/')
  if (location.search) route = route + location.search
  return route
}
*/

export default async ({ app, Vue, ssrContext, router }) => {
  // Vue.component('LangSwitcher', LangSwitcher)
  Vue.use(VueI18n)
  app.i18n = new VueI18n({
    silentTranslationWarn: true,
    fallbackLocale: 'en',
    messages: {},
    dateTimeFormats: {},
    numberFormats: {}
  })
  // always make sure that the fallback is loaded
  app.loadedLanguages = ['en']
  app.i18n.setLocaleMessage('en', require('../../../i18n/locales/en.json'))

  router.beforeEach(async (to, from, next) => {
    // guard against non-available locales
    if (to.params.locale) {
      try {
        localesList.includes(to.params.locale)
      } catch (e) {
        next({
          name: to.name,
          params: { locale: 'en' },
          query: { to: to.query.to || null }
        })
      }
    }

    try {
      const userLocale = Cookies.get('locale') || 'en' // app.$q.cookies.get('en') // Cookies.get('locale')
      if (typeof userLocale !== 'function' && to.params.locale !== userLocale) {
        next({
          name: to.name,
          params: { locale: userLocale || 'en' },
          query: () => {
            if (to.query.to) {
              return { to: to.query.to }
            } else {
              return null
            }
          }
        })
      }
    } catch (err) {
      console.log(err)
    }

    const routeLocale = to.params.locale
    const cookieLocale = getLocale(ssrContext)

    if (to.params.locale !== cookieLocale) {
      // here we need to reroute
    }
    // const cookieLocale = getLocaleCookie(ssrContext)
    // const browserLocale = getRoute(getBrowserLocale(ssrContext))
    // if (app.userSelectedLocale === true) {
    // cookie or route
    let locale
    if (cookieLocale) {
      locale = cookieLocale
    } else {
      locale = routeLocale
    }

    locale = getRoute(locale) // => MUST BE EN

    // }
    /*
      else {
      if (browserLocale) {
        locale = browserLocale
      } else { locale = routeLocale }
    }
    */

    /*
    // this is for when the lang routing is done in the browser
    if (routeLocale !== locale) {
      next({
        path: replaceLocale(to.path, locale)
      })
    }
    */

    // needed to set quasar locale because short code
    let qLocale
    if (locale === 'en') {
      qLocale = 'en-us'
    } else {
      qLocale = locale
    }

    // app.$q.cookies.set('locale', locale)
    // on first load this will always be true
    if (!app.loadedLanguages.includes(locale)) {
      app.loadedLanguages.push(locale)
      app.i18n.setLocaleMessage(locale, require(`../../../i18n/locales/${locale}.json`))
      try {
        await import(`quasar/lang/${qLocale}`)
          .then((lang) => {
            Quasar.lang.set(lang.default)
          })
      } catch (err) {
        console.log(err)
      }
    } else {
      try {
        await import(`quasar/lang/${qLocale}`)
          .then((lang) => {
            Quasar.lang.set(lang.default)
          })
      } catch (err) {
        console.log(err)
      }
    }
    app.i18n.locale = locale
    next()
  })

  Vue.mixin({
    /**
     * prefetch as a mixin for global access
     * @category i18n
     * @description Check the route
     * @type {function}
     * @param currentRoute
     * @param redirect
     * @param ssrContext
     * @returns {Promise<*>}
     */
    async preFetch ({ currentRoute, redirect, ssrContext }) {
      if (ssrContext) {
        const locale = getRoute(currentRoute.params.locale)
        let qLocale
        if (locale === 'en') {
          qLocale = 'en-us'
        } else {
          qLocale = locale
        }
        if (localesList.includes(locale)) {
          await import(`quasar/lang/${qLocale}`)
            .then((loc) => {
              this.$q.lang.set(loc.default)
            })
        }
      }
    }
  })
}

// we are exporting for convenience JUST in case
export {
  getLocaleCookie,
  getBrowserLocale,
  getRoute,
  replaceLocale,
  getLocale
}
