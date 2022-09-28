import Vue from 'vue'

export default function ({$axios, app}) {
  $axios.onError((error) => {
    // It doesn't handle error here if handleError is set to false in request
    // Example: this.$axios.get('/listing-items', { handleError: false })
    if (
      Object.prototype.hasOwnProperty.call(error.config, 'handleError') &&
      error.config.handleError === false
    ) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401) {
      app.router.push('/login')
    }

    // Show toast for error response
    // todo: should figure out proper locale structure
    if (error.response?.data?.error) {
      Vue.toasted.error(app.i18n.t(error.response.data.error))
    } else if (error.response?.data?.message) {
      Vue.toasted.error(app.i18n.t(error.response.data.message))
    }
  })
}
