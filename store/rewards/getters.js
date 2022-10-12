/**
 * Get all the available reward thresholds.
 * @param state
 * @returns Array
 */
export function getRewardThresholds(state) {
  return state.rewardThresholds
}

/**
 * Get all the redeemable rewards stages.
 * @param state
 * @returns Array
 */
export function getRedeemableRewardsStages(state) {
  return state.redeemableRewardsStages
}

/**
 * get reward history
 * @param state
 * @returns Array
 */
export function getRewardHistory(state) {
  return state.rewardHistory
}

/**
 * get last positive reward history
 * @param state
 * @returns Array
 */
export function getLastCreditHistoryItem(state) {
  return state.rewardHistory.filter(item => item.points > 0).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}
