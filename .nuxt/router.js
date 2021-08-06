import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2dcacc9c = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _1e569567 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _a697403e = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _2a42bc21 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _45688016 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _a1564eaa = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _110cff6e = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _2dcacc9c,
    children: [{
      path: "",
      component: _1e569567,
      name: "home"
    }, {
      path: "/register",
      component: _a697403e,
      name: "register"
    }, {
      path: "/login",
      component: _a697403e,
      name: "login"
    }, {
      path: "/profile/:username",
      component: _2a42bc21,
      name: "profile"
    }, {
      path: "/editor",
      component: _45688016,
      name: "editor"
    }, {
      path: "/settings",
      component: _a1564eaa,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _110cff6e,
      name: "article"
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
