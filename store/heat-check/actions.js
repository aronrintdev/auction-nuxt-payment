/**
 * Add product to shopping cart.
 * @param commit
 * @param product
 */
export function addMainImage({ commit }, product) {
  commit('addMainImage', product)
}

/**
 * Add product to shopping cart.
 * @param commit
 * @param product
 */
export function updateErrorClass({ commit }, rows) {
  commit('updateErrorClass', rows)
}

/**
 * Remove the provided product from the shopping cart.
 * @param commit
 * @param product
 */
export function resetData({ commit }, product) {
  commit('resetData', product)
}

/**
 * Update checkout status.
 * @param commit
 * @param processCheckout
 */
export function updateCheckoutStatus({ commit }, processCheckout) {
  commit('updateCheckoutStatus', processCheckout)
}

/**
 * Update sku.
 * @param commit
 * @param sku
 */
export function updateSku({ commit }, sku) {
  commit('updateSku', sku)
}

/**
 * Checkout the shopping cart with card.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function cardCheckout({ commit }, payload) {
  return this.$axios
    .post(process.env.API_URL + '/heatchecks/card-checkout', {
      billing: {
        first_name: payload.billingAddress.firstName,
        last_name: payload.billingAddress.lastName,
        address_line_1: payload.billingAddress.addressLine,
        email: payload.billingAddress.email,
        city: payload.billingAddress.city,
        state: payload.billingAddress.state,
        zip: payload.billingAddress.zipCode,
        country: payload.billingAddress.country,
        type: payload.billingAddress.type,
        is_default: payload.paymentMethod.isDefault,
      },
      payment_method: {
        card_holder_name: payload.paymentMethod.cardHolderName,
        card_last_digits: payload.paymentMethod.cardLastDigits,
        card_expiry_date: payload.paymentMethod.cardExpiryDate,
        card_brand: payload.paymentMethod.cardBrand,
        payment_type: payload.paymentMethod.paymentType,
        is_default: payload.paymentMethod.isDefault,
      },
      order: {
        payment_token: payload.paymentToken,
        gift_card_code: payload.giftCardCode,
        promo_code: payload.promoCode,
        processing_fee: payload.processingFee,
        shipping_fee: payload.shippingFee,
        tax: payload.tax,
        sub_total: payload.subTotal,
        total: payload.total,
        discount: payload.discount,
        payment_type: payload.paymentMethod.paymentType,
      },
      listing_items: payload.shoppingCart,
      heatcheckId: payload.id,
    })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
