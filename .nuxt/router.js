import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _217a357b = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _0766e120 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _e504b210 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _0452cd10 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _15ab5bbe = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _4e3ca634 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _36be4676 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _217a357b,
    children: [{
      path: "",
      component: _0766e120,
      name: "home"
    }, {
      path: "/register",
      component: _e504b210,
      name: "register"
    }, {
      path: "/login",
      component: _e504b210,
      name: "login"
    }, {
      path: "/profile/:username",
      component: _0452cd10,
      name: "profile"
    }, {
      path: "/profile/:username/favorites",
      component: _0452cd10,
      name: "profileFavorites"
    }, {
      path: "/editor/:slug",
      component: _15ab5bbe,
      name: "editorArticle"
    }, {
      path: "/editor",
      component: _15ab5bbe,
      name: "editor"
    }, {
      path: "/settings",
      component: _4e3ca634,
      name: "settings"
    }, {
      path: "/article/:slug",
      component: _36be4676,
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
