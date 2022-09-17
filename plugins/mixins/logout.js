import {mapActions} from 'vuex';

/**
 * Copies the provided value to clipboard.
 * @see https://github.com/chantouchsek/nuxt-clipboard
 * @type {{methods: {postLogout(): void}}}
 */
const logoutMixin = {
  methods: {
    ...mapActions({
      removeUserDetails: 'auth/removeUserDetails',
      removeCryptoDetails: 'order-details/removeCryptoDetails',
      removePromoCode: 'order-details/removePromoCode',
      removeGiftCard: 'order-details/removeGiftCard',
      clearWishListItems: 'wish-list/clearWishListItems',
      removeGiftCardValuesAndDetails: 'preferences/clearGiftCardValues'
    }),
    postLogout() {
      this.$auth.strategy.token.reset()
      this.removeUserDetails()
      this.removeCryptoDetails()
      this.removePromoCode()
      this.removeGiftCard()
      this.clearWishListItems()   // DVQ-31 clear wish list items on logout.
      this.removeGiftCardValuesAndDetails() // Values of giftcard store in preference section.
    },
  },
}

export default logoutMixin
