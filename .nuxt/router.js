import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45648ba6 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _1f84cebc = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _17adc406 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _45648ba6,
    children: [{
      path: "",
      component: _1f84cebc,
      name: "home"
    }, {
      path: "/register",
      component: _17adc406,
      name: "register"
    }, {
      path: "/login",
      component: _17adc406,
      name: "login"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
