import {
  SHIPPING_FEE,
  PROCESSING_FEE,
  FALLBACK_SHIPPING_FEE_AMOUNT,
  FALLBACK_PROCESSING_FEE_AMOUNT
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
