/**
 * Store the vendor commission.
 * @param state
 * @param payload
 */
export function setVendorCommission(state, payload){
  state.vendorCommission = payload
}

/**
 * Store the global commission
 * @param state 
 * @param payload 
 */
export function setGlobalCommission(state, payload){
  state.globalCommission = payload
}