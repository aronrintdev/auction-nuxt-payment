import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

const { autoSetContainer = false } = {} || {}

VueClipboard.config.autoSetContainer = autoSetContainer
Vue.use(VueClipboard)
