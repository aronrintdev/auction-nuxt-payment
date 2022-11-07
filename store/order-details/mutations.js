import { PAYMENT_METHOD_TYPE_CRYPTO } from '~/static/constants'

/**
 * Add user's order details.
 * @param state
 * @param payload
 */
export function addOrderDetails(state, payload) {
  state.orderDetails.products = payload.products
  state.orderDetails.redeemedReward = payload.redeemedReward
  state.orderDetails.orderId = payload.orderid
    ? payload.orderid
    : payload.order_id
  state.orderDetails.transactionId = payload.transactionid
    ? payload.transactionid
    : payload.transaction_id
}

/**
 * Add order products.
 * @param state
 * @param payload
 */
export function addOrderProducts(state, payload) {
  state.orderDetails.products = payload
}

/**
 * Add the payment token which will be used to settle the payment.
 * @param state
 * @param payload
 */
export function addPaymentToken(state, payload) {
  state.paymentToken = payload.paymentToken
}

/**
 * Add applied gift card for the current purchase.
 * @param state
 * @param payload
 */
export function addGiftCard(state, payload) {
  state.giftCard.number = payload.giftCard.number
  state.giftCard.amount = payload.giftCard.amount
  state.giftCard.remainingAmount = payload.giftCard?.remainingAmount
  state.giftCard.pin = payload.giftCard.pin
  state.giftCard.image = payload.giftCard.image
}

/**
 * Remove the applied gift card.
 * @param state
 */
export function removeGiftCard(state) {
  state.giftCard.number = ''
  state.giftCard.amount = ''
  state.giftCard.pin = 0
  state.giftCard.image = ''
}

/**
 * Add promo code for the current purchase.
 * @param state
 * @param payload
 */
export function addPromoCode(state, payload) {
  state.promoCode.code = payload.promoCode.name
  state.promoCode.type = payload.promoCode.type
  state.promoCode.sku = payload.promoCode.sku
  state.promoCode.amount = payload.promoCode.amount
}

/**
 * Remove promo code from the current purchase.
 * @param state
 */
export function removePromoCode(state) {
  state.promoCode.code = ''
  state.promoCode.type = ''
  state.promoCode.sku = ''
  state.promoCode.amount = ''
}

/**
 * Add Installment plans details if any selected.
 * @param state
 * @param payload
 */
export function addInstallmentPlanDetails(state, payload) {
  state.installmentPlans.selected = payload.isSelected
  state.installmentPlans.type = payload.type
  state.installmentPlans.date = payload.date
}

/**
 * Remove Installment plan details.
 * @param state
 */
export function removeInstallmentPlanDetails(state) {
  state.paymentToken = ''
  state.installmentPlans.selected = false
  state.installmentPlans.type = ''
  state.installmentPlans.date = ''
}

/**
 * Remove the payment token after a transaction.
 */
export function removePaymentToken(state) {
  state.paymentToken = ''
}

/**
 * Add the user's selected cryptocurrency to the store.
 * @param state
 * @param payload
 */
export function addCryptoCurrency(state, payload) {
  state.crypto.currency = payload.cryptoCurrency
}

/**
 * Add user's selected crypto details.
 * @param state
 * @param payload
 */
export function addCryptoDetails(state, payload) {
  state.crypto.amount = payload.amount_from
  state.crypto.estimatedAmount = payload.estimated_amount
  state.crypto.paymentType = PAYMENT_METHOD_TYPE_CRYPTO
  state.crypto.isDefault = false
}

/**
 * Add crypto deposit address.
 * @param state
 * @param payload
 */
export function updateCryptoDetails(state, payload) {
  state.crypto.address = payload.pay_address
  state.crypto.purchaseId = payload.purchase_id
  state.crypto.paymentId = payload.payment_id
}

/**
 * Remove crypto details.
 * @param state
 */
export function removeCryptoDetails(state) {
  const crypto = {}

  crypto.address = null
  crypto.currency = null
  crypto.estimatedAmount = null
  crypto.amount = null
  crypto.paymentId = null
  crypto.purchaseId = null
  crypto.paymentType = null

  state.crypto = crypto
}

/**
 * Reset user's order details.
 * @param state
 * @param payload
 */
 export function resetOrderDetails(state) {
  state.orderDetails = {
    products: null,
    redeemedReward: {},
    orderId: null,
    transactionId: null
  }
}
