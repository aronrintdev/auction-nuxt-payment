export default (ctx, inject) => {
  // inject the logger in the context (ctx.app.$logger)
  // And in the Vue instances (this.$logger in your components)
  inject('logger', logger(ctx.$axios));
}

const logger = $axios => ({
  logToServer(message, error = {}, level = 'error') {
    $axios
      .post('/logs', {message, error, level})
      // eslint-disable-next-line no-console
      .catch(console.error)
  }
})
