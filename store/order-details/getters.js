import { FREE_SHIPPING, FREE_SNEAKERS } from '~/static/constants'

/**
 * Retrieve the user's order details.
 * @param state
 * @returns {object}
 */
export function getOrderDetails(state) {
  return state.orderDetails
}

/**
 * Retrieve the user's purchased products.
 * @param state
 * @returns {array}
 */
export function getProducts(state) {
  return state.orderDetails.products
}

/**
 * Get the user's free sneakers redeemed reward.
 * @param state
 * @returns Object|false
 */
export function getFreeSneakersRedeemedReward(state) {
  if (Object.keys(state.orderDetails.redeemedReward).length && state.orderDetails.redeemedReward.reward_threshold.reward_type === FREE_SNEAKERS) {
    return state.orderDetails.redeemedReward.listing_item
  }

  return false
}

/**
 * Get the user's free shipping redeemed reward.
 * @param state
 * @returns Object|false
 */
export function getFreeShippingRedeemedReward(state) {
  if (Object.keys(state.orderDetails.redeemedReward).length && state.orderDetails.redeemedReward.reward_threshold.reward_type === FREE_SHIPPING) {
    return state.orderDetails.redeemedReward
  }

  return false
}

/**
 * Retrieve the user's payment token.
 * @param state
 * @returns {string}
 */
export function getPaymentToken(state) {
  return state.paymentToken
}

/**
 * Retrieve the user's applied gift card.
 * @param state
 * @returns {boolean|string}
 */
export function getGiftCard(state) {
  if (state.giftCard.number) {
    return state.giftCard
  }

  return false
}

/**
 * Retrieve the user's promo code.
 * @param state
 * @returns {string|boolean}
 */
export function getPromoCode(state) {
  if (state.promoCode.code) {
    return state.promoCode
  }

  return false
}

/**
 * Retrieve the installment payment details.
 * @param state
 * @return {object}
 */
export function getInstallmentDetails(state) {
  return state.installmentPlans
}

/**
 * Retrieve the user's selected crypto details.
 * @param state
 * @returns {string|boolean}
 */
export function getCryptoDetails(state) {
  return state.crypto
}
