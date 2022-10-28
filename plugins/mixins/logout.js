import {mapActions} from 'vuex';
import realtime from '~/plugins/mixins/realtime';

/**
 * Copies the provided value to clipboard.
 * @see https://github.com/chantouchsek/nuxt-clipboard
 * @type {{methods: {postLogout(): void}}}
 */
const logoutMixin = {
  mixins: [realtime],
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
      this.disconnectSocket() // disconnect realtime notification channels
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
