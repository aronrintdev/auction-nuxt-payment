/**
 * Get the Offer Details
 * @param commit, state
 */
 export function fetchOfferDetails({ commit }, { offerId }) {
  this.$axios.get('trades/offer/' + offerId)
      .then(response => {
          const lastSubmittedOffer = response.data.latest_offer ?? response.data
          commit('setOffer', response.data)
          commit('setLastSubmittedOffer', lastSubmittedOffer)
          commit('setTheirVendorId', lastSubmittedOffer.theirs_items[0].vendor_id)
          commit('setTheirItems', lastSubmittedOffer.theirs_items.map((item) => {
            item.quantity = 1
            return item
          }))
          commit('setYourVendorId', lastSubmittedOffer.yours_items[0].vendor_id)
          commit('setYourItems', lastSubmittedOffer.yours_items.map((item) => {
            item.quantity = 1
            return item
          }))

          return response.data
      })
}
