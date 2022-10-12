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

/**
 * Get all the available reward tier stages.
 * @param commit
 * @return Promise
 */
export function getStages({commit}) {
  this.$axios.get('reward-thresholds/stages').then((res) => {
    commit('addRedeemableRewardsStages', res.data.data)
    return Promise.resolve(res.data.data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}


/**
 * Get all the available reward tier stages.
 * @param commit
 * @return Promise
 */
export function fetchRewardHistory({commit}) {
  this.$axios.get('rewards-history').then((res) => {
    commit('setRewardHistory', res.data.data)
    return Promise.resolve(res.data.data)
  }).catch((err) => {
    return Promise.reject(err)
  })
}

