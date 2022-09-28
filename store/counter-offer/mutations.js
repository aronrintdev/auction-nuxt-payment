/**
 * This mutation is used to set offer
 * @param state
 * @param offer
 */
 export function clearStates(state) {
  state.offer = null
  state.lastSubmittedOffer = null
  state.yourItems = []
  state.theirItems = []
}

/**
 * This mutation is used to set offer
 * @param state
 * @param offer
 */
 export function setOffer(state, offer) {
  state.offer = offer
}

/**
 * This mutation is used to set last submitted offer
 * @param state
 * @param offer
 */
 export function setLastSubmittedOffer(state, offer) {
  state.lastSubmittedOffer = offer
}

/**
 * This mutation is used to set your vendor id
 * @param state
 * @param vendorId
 */
 export function setYourVendorId(state, vendorId) {
  state.yourVendorId = vendorId
}

/**
 * This mutation is used to set your list items
 * @param state
 * @param items
 */
 export function setYourItems(state, items) {
  state.yourItems = items
}

/**
 * This mutation is used to add items in yours list
 * @param state
 * @param item
 */
export function addYourItem(state, item) {
  const inventory = {
    inventory: item,
    quantity: 1
  }
  state.yourItems.push(inventory)
}

/**
 * This mutation is used to remove item from your list
 * @param state
 * @param itemId
 */
export function removeYourItem(state, itemIndex) {
  state.yourItems = state.yourItems.splice(itemIndex, 1)
}

/**
 * This mutation is used to set their list items
 * @param state
 * @param items
 */
 export function setTheirItems(state, items) {
  state.theirItems = items
}

/**
 * This mutation is used to set their vendor id
 * @param state
 * @param vendorId
 */
 export function setTheirVendorId(state, vendorId) {
  state.theirVendorId = vendorId
}

/**
 * This mutation is used to add items in their list
 * @param state
 * @param item
 */
 export function addTheirItem(state, item) {
  const inventory = {
    inventory: item,
    quantity: 1
  }
  state.theirItems.push(inventory)
}

/**
* This mutation is used to remove item from their list
* @param state
* @param itemId
*/
export function removeTheirItem(state, itemIndex) {
    console.log(itemIndex)
  state.theirItems = state.theirItems.splice(itemIndex, 1)
}
