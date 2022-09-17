/**
 * Retrieve the user's redeemed reward.
 * @param commit
 * @param payload
 * @return Promise
 */
export function getTaxRateByZip({ commit }, payload) {
  return this.$axios.get(`tax-rates/?zip_code=${ payload.zip }`, { handleError: false }).then((response) => {
    if (response.data.data.length) {
      commit('addTaxRate', response.data.data.pop())
    }

    return Promise.resolve(response.data)
  }).catch((error) => {
    commit('addTaxRate', {})

    return Promise.reject(error)
  })
}
