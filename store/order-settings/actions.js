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

/**
 * Add user's order statuses.
 * @param commit
 * @param payload
 */
export function fetchOrderStatuses({ commit }, payload) {
  return this.$axios.get('order-statuses').then((response) => {
    commit('saveStatuses', response.data.data)
    return Promise.resolve(response.data.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}
