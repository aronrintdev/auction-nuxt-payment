import {
  SHIPPING_FEE,
  PROCESSING_FEE,
  FALLBACK_SHIPPING_FEE_AMOUNT,
  FALLBACK_PROCESSING_FEE_AMOUNT,
  FALLBACK_TRADING_FEE_AMOUNT,
  TRADING_FEE
} from '~/static/constants'

/**
 * Retrieve the order setting for shipping fee.
 * @param state
 * @returns {object}
 */
export function getShippingFee(state) {
    const shippingFee = state.orderSettings.find((setting) => {
      return setting.key === SHIPPING_FEE
    })

    if (shippingFee) {
      return shippingFee.value * 100
    }

    return FALLBACK_SHIPPING_FEE_AMOUNT
}

/**
 * Retrieve the order setting for processing fee.
 * @param state
 * @returns {object}
 */
export function getProcessingFee(state) {
  const processingFee = state.orderSettings.find((setting) => {
    return setting.key === PROCESSING_FEE
  })

  if (processingFee) {
    return processingFee.value / 100
  }

  return FALLBACK_PROCESSING_FEE_AMOUNT
}

/**
 * Retrieve the order setting for trading fee.
 * @param state
 * @returns {object}
 */
export function getTradingFee(state) {
  const tradingFee = state.orderSettings.find((setting) => {
    return setting.key === TRADING_FEE
  })

  if (tradingFee) {
    return tradingFee.value
  }

  return FALLBACK_TRADING_FEE_AMOUNT
}

/**
 * Retrieve the order statuses
 * @param state
 * @returns {object}
 */
export function getOrderStatuses(state){
  return state.orderStatuses
}
