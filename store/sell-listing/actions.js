/**
 * Store the sell listing data.
 * @param commit
 * @param product
 */
 export function addListingData({ commit }, payload) {
    commit('saveListingData', payload.data)
  }