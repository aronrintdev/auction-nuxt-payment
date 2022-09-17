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
