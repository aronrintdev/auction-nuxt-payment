/**
 * Remove the current authenticated user's trade details.
 * @param commit
 * @returns {Promise<void>}
 */
export function removeTradeDetails({ commit }) {
  commit('removeAllOfferItems');
  commit('removeAllWantItems');
}

/**
 * Check if item already in listing item
 * @param payload
 * @returns {Promise<void>}
 */
export function checkIfItemIsInListingItem({ commit }, payload){
  return new Promise((resolve, reject) => {
    this.$axios
      .post('check/product/in/listing', payload)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Check if item already in listing item
 * @param payload
 * @returns {Promise<void>}
 */
export function searchProductsList({ commit }, payload){
  return new Promise((resolve, reject) => {
    this.$axios
          .post('/search/products', {
            filters: payload,
            page: 1
          })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Delete selected trades
 * @param payload
 * @returns {Promise<void>}
 */
export function deleteSelectedTrades({ commit }, payload){
  console.log(payload)
  return new Promise((resolve, reject) => {
    this.$axios
      .delete('/trades/multiple', {data: {...payload}})
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

/**
 * Relist trade
 * @param tradeId
 * @returns {Promise<void>}
 */
export function relistTrade({ commit }, tradeId){
  return new Promise((resolve, reject) => {
    this.$axios
      .put('/trades/' + tradeId + '/relist')
    .then((response) => {
      resolve(response)
    })
    .catch((error) => {
      reject(error)
    })
  })
}
