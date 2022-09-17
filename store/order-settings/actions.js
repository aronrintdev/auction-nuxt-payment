/**
 * Add user's order details.
 * @param commit
 * @param payload
 */
export function getOrderSettings({ commit }, payload) {
  return this.$axios.get('order-settings', {}).then((response) => {
    commit('addOrderSettings', response.data.data)

    return Promise.resolve(response.data.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}
