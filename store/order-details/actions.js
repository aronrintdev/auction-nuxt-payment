/**
 * Add user's order details.
 * @param commit
 * @param payload
 */
export function addOrderDetails({ commit }, payload) {
  commit('addOrderDetails', payload)
}

/**
 * Add the payment token which will be used to settle the payment.
 * @param commit
 * @param payload
 */
export function addPaymentToken({ commit }, payload) {
  commit('addPaymentToken', payload)
}

/**
 * Add order products.
 * @param commit
 * @param payload
 */
export function addOrderProducts({ commit }, payload) {
  commit('addOrderProducts', payload)
}

/**
 * Add applied gift card for the current purchase.
 * @param commit
 * @param payload
 */
export function addGiftCard({ commit }, payload) {
  commit('addGiftCard', payload)
}

/**
 * Remove the applied gift card.
 * @param commit
 */
export function removeGiftCard({ commit }) {
  commit('removeGiftCard')
}

/**
 * Add promo code for the current purchase.
 * @param commit
 * @param payload
 */
export function addPromoCode({ commit }, payload) {
  commit('addPromoCode', payload)
}

/**
 * Remove promo code from the current purchase.
 * @param commit
 */
export function removePromoCode({ commit }) {
  commit('removePromoCode')
}

/**
 * Add installment plans if any selected.
 * @param commit
 * @param payload
 */
export function addInstallmentPlans({ commit }, payload) {
  commit('addInstallmentPlanDetails', payload)
}

/**
 * Remove installment plan.
 * @param commit
 * @param payload
 */
export function removeInstallmentPlan({ commit }) {
  commit('removeInstallmentPlanDetails')
}

/**
 * Remove payment token after a transaction
 * @param commit
 */
export function removePaymentToken({ commit }) {
  commit('removePaymentToken')
}

/**
 * Add the user's selected cryptocurrency to the store.
 * @param commit
 * @param payload
 */
export function addCryptoCurrency({ commit }, payload) {
  commit('addCryptoCurrency', payload)
}

/**
 * Add crypto deposit address.
 * @param commit
 * @param payload
 */
export function addCryptoDepositAddress({ commit }, payload) {
  commit('addCryptoDepositAddress', payload)
}

/**
 * Remove crypto details.
 * @param commit
 */
export function removeCryptoDetails({ commit }) {
  commit('removeCryptoDetails')
}

/**
 * Calculate approximate price in cryptocurrency for a given value.
 * @param commit
 * @param payload
 */
export function getEstimatedCryptoPrice({ commit }, payload) {
  const url =
    process.env.API_URL +
    '/checkout/crypto/check-estimate/' +
    payload.cryptoCurrency +
    '/' +
    payload.total

  return this.$axios
    .get(url, { handleError: false })
    .then((response) => {
      commit('addCryptoDetails', response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}

/**
 * Create a crypto payment and retrieve the deposit address.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function createCryptoPayment({ commit }, payload) {
  return this.$axios
    .post(process.env.API_URL + '/checkout/crypto/payment', {
      payment_method: {
        crypto_currency: payload.paymentMethod.currency,
        estimated_amount: payload.paymentMethod.estimatedAmount,
      },
      order: {
        total: payload.total,
      },
    }, { handleError: false })
    .then((response) => {
      commit('updateCryptoDetails', response.data)
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
