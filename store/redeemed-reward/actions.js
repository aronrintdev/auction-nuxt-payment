/**
 * Redeem the specified user reward.
 * @param commit
 * @param payload
 * @return Promise
 */
export function redeemUserReward({ commit }, payload) {
  return this.$axios.get(`redeemed-rewards/${payload.selectedRewardId}/redeem`).then((response) => {
    commit('addRedeemedReward', response.data)

    return Promise.resolve(response.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}

/**
 * Retrieve the user's redeemed reward.
 * @param commit
 * @param payload
 * @return Promise
 */
export function getUserRedeemedReward({ commit }) {
  return this.$axios.get('redeemed-rewards/active', { handleError: false }).then((response) => {
    commit('addRedeemedReward', response.data)

    return Promise.resolve(response.data)
  }).catch((error) => {
    commit('addRedeemedReward', {})

    return Promise.reject(error)
  })
}

/**
 * Clear out the user's redeemed reward.
 * @param commit
 * @param payload
 * @return Promise
 */
export function clearRedeemedReward({ commit }) {
  commit('addRedeemedReward', {})
}

/**
 * Remove the user's redeemed reward.
 * @param commit
 * @param payload
 * @return Promise
 */
export function removeRedeemedReward({ commit }) {
  return this.$axios.delete('redeemed-rewards/').then((response) => {
    commit('addRedeemedReward', {})

    return Promise.resolve(response.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}
