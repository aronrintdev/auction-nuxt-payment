/**
 * Save the offer details.
 * @param state
 * @param payload
 */
export function saveOfferDetails(state, payload){
  state.offerDetails = payload
}

/**
 * Save the offer details.
 * @param state
 * @param payload
 */
export function saveOrderDetails(state, payload){
  state.offerDetails.orderId = payload.id
}
