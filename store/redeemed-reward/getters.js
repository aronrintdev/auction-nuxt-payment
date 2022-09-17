import { FREE_SHIPPING, FREE_SNEAKERS } from '~/static/constants'

/**
 * Get the user's redeemed reward.
 * @param state
 * @returns Object|false
 */
export function getRedeemedReward(state) {
  if (Object.keys(state.redeemedReward).length) {
    return state.redeemedReward
  }

  return false
}

/**
 * Get the user's free sneakers redeemed reward.
 * @param state
 * @returns Object|false
 */
export function getFreeSneakersRedeemedReward(state) {
  if (Object.keys(state.redeemedReward).length && state.redeemedReward.reward_threshold.reward_type === FREE_SNEAKERS) {
    return state.redeemedReward.listing_item
  }

  return false
}

/**
 * Get the user's free shipping redeemed reward.
 * @param state
 * @returns Object|false
 */
export function getFreeShippingRedeemedReward(state) {
  if (Object.keys(state.redeemedReward).length && state.redeemedReward.reward_threshold.reward_type === FREE_SHIPPING) {
    return state.redeemedReward
  }

  return false
}
