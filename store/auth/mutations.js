import { ADDRESS_TYPE_BILLING } from '~/static/constants'

/**
 * Store the user details in the state.
 * @param state
 * @param val
 */
export function setUserDetails(state, val) {
  state.userDetails = val
}

/**
 * Remove the user details from the state.
 * @param state
 */
export function removeUserDetails(state) {
  state.userDetails = {
    billingAddress: null,
    shippingAddress: null,
    paymentMethod: null
  }
}

/**
 * Set the current user's authenticated status in the state.
 * @param state
 * @param val
 */
export function setLoggedIn(state, val) {
  state.loggedIn = val
  if (!val) {
    removeUserDetails()
  }
}

/**
 * Update the address with the provided address.
 * @param state
 * @param payload
 */
export function updateAddress(state, payload) {
  const address = {}
  address.first_name = payload.addressForm.inputFirstName
  address.last_name = payload.addressForm.inputLastName
  address.email = payload.addressForm.inputEmail
  address.address_line_1 = payload.addressForm.inputAddressLine
  address.address_line_2 = ''
  address.city = payload.addressForm.inputCity
  address.state = payload.addressForm.inputState
  address.zip = payload.addressForm.inputZipCode
  address.country = payload.addressForm.inputCountry
  address.type = payload.addressType

  if (payload.addressType === ADDRESS_TYPE_BILLING) {
    state.userDetails.billingAddress = address

    return
  }

  state.userDetails.shippingAddress = address
}

/**
 * Add payment method to the user details.
 * @param state
 * @param payload
 */
export function addPaymentMethod(state, payload) {
  const paymentMethod = {}
  paymentMethod.card_holder_name = payload.paymentMethod.inputCardHolderName
  paymentMethod.card_last_digits = payload.paymentMethod.inputCardNumber
  paymentMethod.card_expiry_date = payload.paymentMethod.inputCardExpiryDate
  paymentMethod.card_brand = payload.paymentMethod.inputCardBrand
  paymentMethod.payment_type = payload.paymentMethodType
  paymentMethod.is_default = payload.paymentMethod.saveForNextTime

  state.userDetails.paymentMethod = paymentMethod
}

/**
 * Remove user's payment method.
 * @param state
 */
export function removePaymentMethod(state) {
  state.userDetails.paymentMethod = null
}

/**
 * Store the default vendor payout method.
 * @param state 
 * @param payload 
 */
export function addDefaultVendorPayoutMethod(state, payload) {
  state.vendorPayoutMethod = payload
}