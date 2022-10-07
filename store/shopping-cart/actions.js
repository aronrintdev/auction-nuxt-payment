/**
 * Add product to shopping cart.
 * @param commit
 * @param state
 * @param product
 */
export function addProduct({ commit, state }, product) {
  const found = state.shoppingCart.find((p) => {
    return p.listing_item_id === product.listing_item_id
      && p.price === product.price
      && p.size.id === product.size.id
  })

  if (!found) {
    commit('addProduct', product)
  }
}

/**
 * Add alternative products to the shopping cart.
 * @param commit
 * @param products
 */
export function addAlternativeProducts({ commit }, products) {
  commit('removeProvidedProducts', products)

  products.forEach(product => {
      commit('addProduct', product)
  })
}

/**
 * Remove the provided product from the shopping cart.
 * @param commit
 * @param product
 */
export function removeProduct({ commit }, product) {
  commit('removeProduct', product)
}

/**
 * Remove all products from the shopping cart.
 * @param commit
 * @param product
 */
export function removeProducts({ commit }, product) {
  commit('removeProducts', product)
}

/**
 * Increment the provided product's quantity.
 * @param commit
 * @param product
 * @param quantity
 */
export function incrementQuantity({ commit }, product) {
  commit('incrementQuantity', product)
}

/**
 * Decrement the provided product's quantity.
 * @param commit
 * @param product
 * @param quantity
 */
export function decrementQuantity({ commit }, product) {
  if (product.quantity > 1) {
    commit('decrementQuantity', product)
  } else {
    commit('removeProduct', product)
  }
}

/**
 * Checkout the shopping cart with card.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function cardCheckout({ commit }, payload) {
  return this.$axios.post(process.env.API_URL + '/checkout/card', {
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
      is_default: payload.paymentMethod.isDefault
    },
    shipping: {
      first_name: payload.shippingAddress.firstName,
      last_name: payload.shippingAddress.lastName,
      email: payload.shippingAddress.email,
      address_line_1: payload.shippingAddress.addressLine,
      city: payload.shippingAddress.city,
      state: payload.shippingAddress.state,
      zip: payload.shippingAddress.zipCode,
      country: payload.shippingAddress.country,
      type: payload.shippingAddress.type,
      is_default: payload.paymentMethod.isDefault
    },
    payment_method: {
      card_holder_name: payload.paymentMethod.cardHolderName,
      card_last_digits: payload.paymentMethod.cardLastDigits,
      card_expiry_date: payload.paymentMethod.cardExpiryDate,
      card_brand: payload.paymentMethod.cardBrand,
      payment_type: payload.paymentMethod.paymentType,
      is_default: payload.paymentMethod.isDefault
    },
    order: {
      payment_token: payload.paymentToken,
      gift_card_number: payload.giftCardNumber,
      gift_card_amount: payload.giftCardAmount,
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
    reward_item: payload.redeemedReward,
    auction_id: payload.auction_id,
  }, { handleError: false }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

/**
 * Checkout the shopping cart with card with an installment plan.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function installmentCheckout({ commit }, payload) {
  return this.$axios.post(process.env.API_URL + '/checkout/installment', {
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
      is_default: payload.paymentMethod.isDefault
    },
    shipping: {
      first_name: payload.shippingAddress.firstName,
      last_name: payload.shippingAddress.lastName,
      email: payload.shippingAddress.email,
      address_line_1: payload.shippingAddress.addressLine,
      city: payload.shippingAddress.city,
      state: payload.shippingAddress.state,
      zip: payload.shippingAddress.zipCode,
      country: payload.shippingAddress.country,
      type: payload.shippingAddress.type,
      is_default: payload.paymentMethod.isDefault
    },
    payment_method: {
      card_holder_name: payload.paymentMethod.cardHolderName,
      card_last_digits: payload.paymentMethod.cardLastDigits,
      card_expiry_date: payload.paymentMethod.cardExpiryDate,
      card_brand: payload.paymentMethod.cardBrand,
      payment_type: payload.paymentMethod.paymentType,
      is_default: payload.paymentMethod.isDefault
    },
    order: {
      payment_token: payload.paymentToken,
      gift_card_number: payload.giftCardNumber,
      gift_card_amount: payload.giftCardAmount,
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
    reward_item: payload.redeemedReward,
    installment_details: payload.installmentDetails
  }, { handleError: false }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

/**
 * Checkout the shopping cart with crypto.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
export function cryptoCheckout({ commit }, payload) {
  return this.$axios.post(process.env.API_URL + '/checkout/crypto', {
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
      is_default: payload.paymentMethod.isDefault
    },
    shipping: {
      first_name: payload.shippingAddress.firstName,
      last_name: payload.shippingAddress.lastName,
      email: payload.shippingAddress.email,
      address_line_1: payload.shippingAddress.addressLine,
      city: payload.shippingAddress.city,
      state: payload.shippingAddress.state,
      zip: payload.shippingAddress.zipCode,
      country: payload.shippingAddress.country,
      type: payload.shippingAddress.type,
      is_default: payload.paymentMethod.isDefault
    },
    payment_method: {
      payment_type: payload.paymentMethod.paymentType,
      payment_id: payload.paymentMethod.paymentId,
      purchase_id: payload.paymentMethod.purchaseId,
    },
    order: {
      gift_card_number: payload.giftCardNumber,
      gift_card_amount: payload.giftCardAmount,
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
    reward_item: payload.redeemedReward,
  }, { handleError: false }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}
