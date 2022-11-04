/**
 * Store thr offer details before the placing.
 * @param commit
 * @param payload
 */
export function storeOfferDetails({ commit }, payload) {
  commit('saveOfferDetails', payload)
}

/**
 * Do the place offer.
 * @param param
 * @param payload
 * @returns
 */
export function offerSubmit({ commit }, payload) {
  return new Promise((resolve, reject) => {
    this.$axios.post('/offers', {
      billing_address: {
        first_name: payload.billingAddress.firstName,
        last_name: payload.billingAddress.lastName,
        email: payload.billingAddress.email,
        address_line_1: payload.billingAddress.addressLine,
        address_line_2: payload.billingAddress.inputAptSuite,
        city: payload.billingAddress.city,
        state: payload.billingAddress.state,
        zip: payload.billingAddress.zipCode,
        country: payload.billingAddress.country,
        type: payload.billingAddress.type,
        is_default: payload.paymentMethod.isDefault
      },
      shipping_address: {
        first_name: payload.shippingAddress.firstName,
        last_name: payload.shippingAddress.lastName,
        email: payload.shippingAddress.email,
        address_line_1: payload.shippingAddress.addressLine,
        address_line_2: payload.shippingAddress.inputAptSuite,
        city: payload.shippingAddress.city,
        state: payload.shippingAddress.state,
        zip: payload.shippingAddress.zipCode,
        country: payload.shippingAddress.country,
        type: payload.shippingAddress.type,
        is_default: payload.paymentMethod.isDefault
      },
      payment_method: {
        card_last_digits: payload.paymentMethod.cardLastDigits,
        card_holder_name: payload.paymentMethod.cardHolderName,
        card_expiry_date: payload.paymentMethod.cardExpiryDate,
        card_brand: payload.paymentMethod.cardBrand,
        payment_type: payload.paymentMethod.paymentType,
        is_default: payload.paymentMethod.isDefault,
        id: payload.paymentMethod.id,
      },
      payment_token: payload.paymentToken,
      offer_details: payload.offerDetails,
      price_details: payload.priceDetails
    }).then((res) => {
      commit('saveOrderDetails', res.data)

      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}
