import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { configure } from 'vee-validate'

Vue.use(VueI18n)

export default ({ app, store }) => {
  // inject our i18n instance into the app root to be used in middleware
  // we assume a store/index.js file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet
  app.i18n = new VueI18n({
    // construction a new VueI18n
    locale: store.state.locale,
    fallbackLocale: 'en', // always displays english if other not available if English translation is not available
    messages: {
      // 'locales' directory contains all the translations in the form of json files
      en: require('~/static/locales/en.json'), // All the translations in english is listed here
      fr: require('~/static/locales/fr.json'), // All the translations in french is listed here
      sp: require('~/static/locales/sp.json'), // All the translations in spanish is listed here
    },
  })

  configure({
    defaultMessage: (_, values) =>
      app.i18n.t(`validations.${values._rule_}`, values),
  })
}
