import Vue from 'vue'

import './styles/quasar.scss'
import 'quasar/dist/quasar.ie.polyfills'
import lang from 'quasar/lang/zh-hant.js'
import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import 'quasar/dist/quasar.addon.css'
import { Quasar, Notify, Loading } from 'quasar'

Vue.use(Quasar, {
  config: {},
  plugins: {
    Notify,
    Loading
  },
  lang: lang
 })