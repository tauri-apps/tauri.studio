import Vue from 'vue'
import VueRouter from 'vue-router'
// import { Cookies } from 'quasar'
import routes from './routes'
Vue.use(VueRouter)

export default function ({ Vue, ssrContext }) {
  // const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes: routes(), // routes(cookies),
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
