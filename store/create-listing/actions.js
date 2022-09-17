export function fetchPublicInventories({ commit }, payload) {
  return this.$axios.get('/inventories/public', { params: payload }).then((res) => {
    return res.data
  })
}

export function saveDraft({ commit }, payload) {
  return this.$axios.post('/auctions/draft', payload).then((res) => {
    return res.data
  })
}

export function auctionCreate({ commit }, payload) {
  return this.$axios.post('/auctions', payload).then((res) => {
    return res.data
  })
}

/**
 * Checkout the shopping cart with card.
 * @param commit
 * @param payload
 * @return {Promise<AxiosResponse<any>>}
 */
 export function cardCheckout({ commit }, payload) {
  return this.$axios.post(process.env.API_URL + '/auctions/checkout/card', {
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
    auction_items: payload.shoppingCart,
    auction_id: payload.auction_id,
  }).then(response => {
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
  return this.$axios.post(process.env.API_URL + '/installment-checkout', {
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
    auction_items: payload.shoppingCart,
    installment_details: payload.installmentDetails
  }).then(response => {
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
  return this.$axios.post(process.env.API_URL + '/crypto-checkout', {
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
    auction_items: payload.shoppingCart,
  }).then(response => {
    return response.data
  }).catch(error => {
    return Promise.reject(error)
  })
}

export function setAuctionTypeAction({ commit }, payload) {
  commit('setAuctionType', payload)
}

export function setCollectionStateAction({ commit }, payload) {
  commit('setCollectionState', payload)
}

export function setSelectedInventoryProductsAction({ commit }, payload) {
  commit('setSelectedInventoryProducts', payload)
}

export function setAuctionItemsAction({ commit }, payload) {
  commit('setAuctionItems', payload)
}

export function setActiveInventoryProductAction({ commit }, payload) {
  commit('setActiveInventoryProduct', payload)
}

export function setEditProductInventoryAction({ commit }, payload) {
  commit('setEditProductInventory', payload)
}

export function setNonInventoryAuctionItemsAction({ commit }, payload) {
  commit('setNonInventoryAuctionItems', payload)
}

export function setNonInventoryCollectionAuctionAction({ commit }, payload) {
  commit('setNonInventoryCollectionAuction', payload)
}

