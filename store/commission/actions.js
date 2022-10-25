/**
 * Get the vendors commission
 * @param commit
 * @returns 
 */
export function getVendorCommission({ commit }, payload) {
  return this.$axios
    .get(`/vendor/${payload}/commission`, { handleError: false })
    .then((res) => {
      commit('setVendorCommission', res.data.data)
      return Promise.resolve(res.data.data)
    })
    .catch((error) => {
      commit('setVendorCommission', {})
      this.$logger.logToServer('vendor commission error', error.response)
      return Promise.reject(error)
    })
}

/**
 * Get global commission
 */
export function getGlobalCommission({ commit }) {
  return this.$axios
    .get('/commissions/global/active', { handleError: false })
    .then((response) => {
      commit('setGlobalCommission', response.data)
      return Promise.resolve(response.data.data)
    })
    .catch((err) => {
      commit('setGlobalCommission', {})
      this.$logger.logToServer('Global commission error', err.response)
      return Promise.reject(err)
    })
}
