import Toasted from 'vue-toasted'
import Vue from 'vue'

// todo: figure out toast design
Vue.use(Toasted, {
  duration: 5000,
  theme: 'toasted-primary',
  position: 'top-right',
})
