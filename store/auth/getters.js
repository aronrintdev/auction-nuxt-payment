/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function authenticated(state) {
  return state.loggedIn
}

/**
 * Get the currently authenticated user.
 * @param state
 * @returns {*}
 */
export function user(state) {
  return state.user
}

/**
 *  Check if current user is "Vendor" or "Super Admin".
 * @param state
 * @returns boolean
 */
export function isVendor(state) {
  return state.user && ((state.user.roles.filter(role => role.name === 'Super Admin').length > 0)
    || (state.user.roles.filter(role => role.name === 'Vendor').length > 0 && state.user.vendor_status === 'Approved'))
}

/**
 * Get the current authenticated user's details.
 * @param state
 * @returns {boolean|*}
 */
export function userDetails(state) {
  return state.userDetails
}

/**
 * Retrieve the user's billing address.
 * @param state
 * @returns {{}}
 */
export function getBillingAddress(state) {
  if (state.userDetails.billingAddress) {
    const billingAddress = {}
    billingAddress.firstName = state.userDetails.billingAddress.first_name
    billingAddress.lastName = state.userDetails.billingAddress.last_name
    billingAddress.email = state.userDetails.billingAddress.email
    billingAddress.addressLine = state.userDetails.billingAddress.address_line_1
    billingAddress.city = state.userDetails.billingAddress.city
    billingAddress.state = state.userDetails.billingAddress.state
    billingAddress.zipCode = state.userDetails.billingAddress.zip.toString()
    billingAddress.country = state.userDetails.billingAddress.country
    billingAddress.type = state.userDetails.billingAddress.type
    billingAddress.isDefault = state.userDetails.billingAddress.is_default
    billingAddress.id = state.userDetails.billingAddress.id
    return billingAddress
  }

  return false
}

/**
 * Retrieve the user's shipping address.
 * @param state
 * @returns {{}}
 */
export function getShippingAddress(state) {
  if (state.userDetails.shippingAddress) {
    const shippingAddress = {}
    shippingAddress.firstName = state.userDetails.shippingAddress.first_name
    shippingAddress.lastName = state.userDetails.shippingAddress.last_name
    shippingAddress.email = state.userDetails.shippingAddress.email
    shippingAddress.addressLine = state.userDetails.shippingAddress.address_line_1
    shippingAddress.city = state.userDetails.shippingAddress.city
    shippingAddress.state = state.userDetails.shippingAddress.state
    shippingAddress.zipCode = state.userDetails.shippingAddress.zip.toString()
    shippingAddress.country = state.userDetails.shippingAddress.country
    shippingAddress.type = state.userDetails.shippingAddress.type
    shippingAddress.isDefault = state.userDetails.shippingAddress.is_default
    shippingAddress.id = state.userDetails.shippingAddress.id

    return shippingAddress
  }

  return false
}

/**
 * Retrieve the user's payment method.
 * @param state
 * @returns {{}}
 */
export function getPaymentMethod(state) {
  if (state.userDetails.paymentMethod) {
    const paymentMethod = {}
    paymentMethod.cardHolderName = state.userDetails.paymentMethod.card_holder_name
    paymentMethod.cardExpiryDate = state.userDetails.paymentMethod.card_expiry_date
    paymentMethod.cardLastDigits = state.userDetails.paymentMethod.card_last_digits
    paymentMethod.cardBrand = state.userDetails.paymentMethod.card_brand
    paymentMethod.paymentType = state.userDetails.paymentMethod.payment_type
    paymentMethod.isDefault = state.userDetails.paymentMethod.is_default
    paymentMethod.id = state.userDetails.paymentMethod.id
    return paymentMethod
  }

  return false
}

/**
 * Retrieve the user's reward points.
 * @param state
 * @returns Number
 */
export function getRewardPoints(state) {
  return state.user.reward_points
}

/**
 * Get the vendors payout details
 * @param state 
 * @returns 
 */
export function getVendorPayoutMethod(state) {
  return state.vendorPayoutMethod
}