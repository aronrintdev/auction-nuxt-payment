/**
 * Remove the current authenticated user's trade details.
 * @param commit
 * @returns {Promise<void>}
 */
export function removeTradeDetails({ commit }) {
  commit('removeAllOfferItems');
  commit('removeAllWantItems');
}
