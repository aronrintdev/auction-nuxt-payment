/**
 * Get all the available reward thresholds.
 * @param commit
 * @return Promise
 */
export function getRewardThresholds({ commit }) {
  this.$axios.get('reward-thresholds', {}
  ).then((response) => {
    commit('addRewardThresholds', response.data.data)

    return Promise.resolve(response.data.data)
  }).catch((error) => {
    return Promise.reject(error)
  })
}
