export const getters = {
  getLang(state) {
    return state
  }
}

export const mutations = {
  /**
   * Set the provided locale to the store.
   * @param state
   * @param locale
   * @constructor
   */
  SET_LANG(state, locale) {
    // If the selected localisation code is included in the locales array
    if (state.locales.includes(locale)) {
      // Set the locale to the selected one
      state.locale = locale
    }
  },
  SET_LOGGEDIN(state, val) {
    state.auth.loggedIn = val
    this.$router.push({ path: '/'} )
  },
  SET_LOGGEDOUT(state) {
    state.auth.loggedIn = false
    this.$router.push({ path: '/login'} )
  }
}

export const actions = () => ({
  /**
   * Set the provided locale to the store.
   * @param context
   * @param value
   */
  setLocale(context, value) {
    context.commit('SET_LANG', value)
  },
})

export const state = () => ({
  // List of locale codes
  locales: ['en', 'fr', 'sp'],
  locale: 'en',
})
