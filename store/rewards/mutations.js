/**
 * Add the provided reward thresholds to the store.
 * @param state
 * @param rewardThresholds
 */
export function addRewardThresholds(state, rewardThresholds) {
  state.rewardThresholds = rewardThresholds
}

/**
 * Add the provided redeemable rewards stages to the store.
 * @param state
 * @param redeemableRewardsStages
 */
export function addRedeemableRewardsStages(state, redeemableRewardsStages) {
  state.redeemableRewardsStages = redeemableRewardsStages
}
