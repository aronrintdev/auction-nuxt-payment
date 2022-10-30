/**
 * Get the current authenticated user's details.
 * @param commit
 * @returns {Promise<void>}
 */
export async function getUserDetails({ commit }) {
  try {
    const result = await this.$axios.get('/user-details')
    if (result && result.data) {
      commit('setUserDetails', result.data)
    } else {
      commit('setUserDetails', '')
    }
  } catch (error) {
    commit('setUserDetails', '')
  }
}

/**
 * Remove the current authenticated user's details.
 * @param commit
 * @returns {Promise<void>}
 */
export function removeUserDetails({ commit }) {
  commit('removeUserDetails')
}

/**
 * Update the address with the provided address.
 * @param commit
 * @param payload
 */
export function updateAddress({ commit }, payload) {
  commit('updateAddress', payload)
}

/**
 * Add payment method to user details.
 * @param commit
 * @param payload
 */
export function addPaymentMethod({ commit }, payload) {
  commit('addPaymentMethod', payload)
}

/**
 * Remove user's payment method.
 * @param commit
 */
export function removePaymentMethod({ commit }) {
  commit('removePaymentMethod')
}

/**
 * Add the vendors payout method
 * @param commit
 * @returns {Promise<void>}
 */
export function addVendorPayoutMethod({ commit }){
  return new Promise((resolve, reject) => {
    this.$axios.get('/vendors/default-payout-method')
      .then((response) => {
        commit('addDefaultVendorPayoutMethod', response.data.data)
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}


export function billingAddresses({ commit }){
  commit('setBillingaddress')
}

export function shippingAddresses({ commit }){
  commit('setShippingAddress')
}