/**
 * Copies the provided value to clipboard.
 * @see https://github.com/chantouchsek/nuxt-clipboard
 * @type {{methods: {copyToClipboard(*): void}}}
 */
const clipboardMixin = {
  methods: {
    copyToClipboard(value) {
      this.$copyText(value).then(() => {
        this.$toasted.success(this.$t('shopping_cart.copied_to_clipboard').toString())
      })
    },
  },
}

export default clipboardMixin
