import Vue from 'vue'
import TawkMessengerVue from '@tawk.to/tawk-messenger-vue-2'

Vue.use(TawkMessengerVue, {
  propertyId: process.env.PROPERTY_ID,
  widgetId: process.env.WIDGET_ID,
})
