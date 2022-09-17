import {
  ADDRESS_TYPE_BILLING,
  PAYMENT_METHOD_TYPE_CARD,
  SAVED,
  NEW
} from '~/static/constants'
/**
 * Update the card status for edit or add with id
 * @param commit
 * @param payload
 */
export function updateCardStatus({ commit }, payload) {
  commit('editCardsStatus', payload.editStatus)
  commit('editCardID', payload.cardID)
}

/**
 * Update the modal header content
 * @param commit
 * @param payload
 */
export function updateModalHeader({ commit }, payload) {
  commit('updateModalHeader', payload)
}

/**
 * Update the selected GiftCard Type and details when view all is clicked.
 * @param commit
 * @param payload
 */
export function updateSelectedGiftCardType({ commit }, payload) {
  commit('updatedGiftCardTypeSelected', payload)
}

/**
 * Select any gift card from view
 * @param commit
 * @param payload
 */
export function selectGiftCard({ commit }, payload) {
  commit('updatedSelectedGiftCard', payload)
}

/**
 * Get the available gift cards
 * @param commit
 */
export function getAvailableGiftCards({ commit }) {
  this.$axios
    .get('/preferences/payments/gift-cards')
    .then((res) => {
      commit('addAvailableGiftCards', res.data)
    })
    .catch((err) => {
      this.$logger.logToServer(err.response)
    })
}

/**
 * Update the gift card details
 * @param commit
 * @param payload
 */
export function updateGiftCardDetails({ commit }, payload) {
  commit('updateGiftCards', payload)
}

/**
 * Do the gift Card purchase
 * @param commit
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export function giftCardCheckoutWithCard({ commit }, payload) {
  return this.$axios
    .post(process.env.API_URL + '/purchase-giftcard/card', {
      billing: {
        first_name: payload.data.billingInfo.inputFirstName,
        last_name: payload.data.billingInfo.inputLastName,
        address_line_1: payload.data.billingInfo.billingAddress,
        city: payload.data.billingInfo.city,
        state: payload.data.billingInfo.state,
        address_line_2: payload.data.billingInfo.aptSuite,
        country: payload.data.billingInfo.country,
        zip: payload.data.billingInfo.zip,
        type: ADDRESS_TYPE_BILLING,
        email: payload.data.billingInfo.email,
        is_default: payload.payment.saveforNextTime
      },
      giftcard_details: {
        selected_cardID: payload.data.cardDetails.selectedCardID,
        delivery_date: payload.data.cardDetails.deliveryDate,
        to: payload.data.cardDetails.to,
        from: payload.data.cardDetails.from,
        message: payload.data.cardDetails.message,
        giftCardAmount: payload.data.cardDetails.giftCardAmount
      },
      payment_method: {
        card_holder_name: payload.payment.cardholderName,
        card_last_digits: payload.payment.cardNumber,
        card_expiry_date: payload.payment.cardExp,
        card_brand: payload.payment.cardBrand,
        payment_type: PAYMENT_METHOD_TYPE_CARD,
        is_default: payload.payment.saveforNextTime,
        customer_vault_id: payload.customerVaultId
      },
      order: {
        payment_token: payload.payment.paymentToken,
        sub_total: payload.data.cardDetails.giftCardAmount,
        total: payload.total,
        shipping_fee: payload.shippingFee,
        processing_fee: payload.processingFee,
        tax: payload.tax,
        payment_type: PAYMENT_METHOD_TYPE_CARD
      }
    })
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      this.$logger.logToServer('Purchase GiftCard Error', error.response)
      return Promise.reject(error)
    })
}

/**
 * Save the purchase response.
 * @param commit
 * @param payload
 */
export function savePurchaseResponse({ commit }, payload) {
  commit('storePurchaseResponse', payload)
}

/**
 * Remove the stored values.
 * @param commit
 * @param dispatch
 */
export function removeGiftCardValues({ commit, dispatch }) {
  commit('removeGiftCardDetails')
  dispatch('getUserGiftCards')
}

/**
 * Get the users giftcard and details.
 * @param commit
 *
 */
export function getUserGiftCards({ commit }) {
  this.$axios
    .get('/user-giftcards')
    .then((res) => {
      commit('userGiftCards', res.data)
    })
    .catch((err) => {
      this.$logger.logToServer(err.response)
    })
}

/**
 * Save the redeem gift card success.
 * @param commit
 * @param payload
 */
export function saveRedeemedResponse({ commit }, payload) {
  commit('storeRedeemedResponse', payload)
}

/**
 * Store the users payment methods
 * @param commit
 * @param payload
 */
export function savePaymentMethods({ commit }, payload) {
  commit('storePaymentMethods', payload)
}

/**
 * Clear the stored values.
 * @param commit
 */
export function clearGiftCardValues({ commit }) {
  commit('removeGiftCardDetails')
}

/**
 * Save paid card details.
 * @param commit
 */

export function storePaymentVia({ commit }, payload) {
  commit('savePaymentVia', payload)
}

/**
 * Same the giftcard details on view giftcard button click
 **/

export function saveGiftCardDetails({ commit }, payload) {
  return new Promise((resolve, reject) => {
    this.$axios
      .get(`/preferences/giftcard/${payload}`)
      .then((response) => {
        commit('saveGiftCardDetails', response.data)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

/**
 * Clear the selected value
 * @param $commit
 */
export function removeSelectedGiftCard({ commit }) {
  commit('clearSelectedGiftCard')
}

/**
 * Toggle content visibility in view details page
 * @param commit
 * @param payload
 */
export function toggleContent({ commit }, payload) {
  commit('toggleContentVisibility', payload)
}

/**
 * Add amount in denomination
 * @param commit
 * @param payload
 */
export function addAmount({ commit }, payload) {
  commit('addAmount', payload)
}

/**
 * Store the user card billing details for payment
 * @param param0
 * @param payload
 */
export function addPaymentDetails({ commit }, payload) {
  commit('storeCardPaymentDetails', payload)
}

/**
 * Add funds to giftcard with saved payments
 * @param commit
 * @param state
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addFundsToGiftCard({ commit, state }, payload) {
  return new Promise((resolve, reject) => {
    this.$axios
    .post(process.env.API_URL + '/preferences/giftcard/reload', {
      paymentType: SAVED,
      paymentMethodId: payload.paymentId.selectedId,
      userGiftCardId: state.giftCardSelected.id,
      order: {
        total: payload.total,
        shipping_fee: payload.shippingFee,
        processing_fee: payload.processingFee,
        tax: payload.tax,
        sub_total: payload.subTotal
      }
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

/**
 * Add funds with new payment method
 * @param commit
 * @param state
 * @param payload
 * @returns {Promise<AxiosResponse<any>>}
 */
export function addFundsToGiftCardWithNewPayment({ commit, state }, payload) {
  return new Promise((resolve, reject) => {
  this.$axios
    .post(process.env.API_URL + '/preferences/giftcard/reload/new-payment', {
      paymentType: NEW,
      order: {
        total: payload.total,
        shipping_fee: payload.shippingFee,
        processing_fee: payload.processingFee,
        tax: payload.tax,
        sub_total: payload.subTotal,
        payment_token: payload.payment.paymentToken
      },
      userGiftCardId: state.giftCardSelected.id,
      billing: {
        first_name: payload.billing.inputFirstName,
        last_name: payload.billing.inputLastName,
        email: payload.email,
        address_line_1: payload.billing.inputAddressLine,
        city: payload.billing.inputCity,
        state: payload.billing.inputState,
        zip: payload.billing.inputZipCode,
        country: payload.billing.inputCountry,
        is_default: payload.payment.saveforNextTime,
        type: ADDRESS_TYPE_BILLING
      },
      payment_method: {
        card_holder_name: payload.payment.cardholderName,
        card_last_digits: payload.payment.cardNumber,
        card_expiry_date: payload.payment.cardExp,
        card_brand: payload.payment.cardBrand,
        is_default: payload.payment.saveforNextTime
      }
    })
    .then((res) => {
      resolve(res.data)
    })
    .catch((error) => {
      reject(error)
    })
  })
}

/**
 * Update the page title of view giftcard
 */
export function viewPageTitle({ commit }, payload) {
  commit('updatePageTitle', payload)
}
