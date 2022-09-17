/**
 * This getter is used to get last submitted offer
 * @param state
 * @returns {null|*}
 */
 export function getLastSubmittedOffer(state) {
  return state.lastSubmittedOffer
}

/**
 * This getter is used to get offer
 * @param state
 * @returns {null|*}
 */
export function getOffer(state) {
    return state.offer
}

/**
 * This getter is used to get your items
 * @param state
 * @returns {[]|*}
 */
 export function getYourItems(state) {
  return state.yourItems
}

/**
 * This getter is used to get your user id
 * @param state
 * @returns {[]|*}
 */
 export function getYourVendorId(state) {
  return state.yourVendorId
}

/**
 * This getter is used to get their items
 * @param state
 * @returns {[]|*}
 */
 export function getTheirItems(state) {
  return state.theirItems
}

/**
 * This getter is used to get their user id
 * @param state
 * @returns {[]|*}
 */
 export function getTheirVendorId(state) {
  return state.theirVendorId
}
