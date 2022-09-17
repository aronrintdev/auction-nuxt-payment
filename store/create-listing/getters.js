/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getSelectedItems(state) {
  return state.selectedItems
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getSingleItemFilters(state) {
  return state.singleItemFilters
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getEditItem(state) {
  return state.editItem
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getAuctionItems(state) {
  return state.auctionItems
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getCollectionStates(state) {
  return state.collectionStates
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getCollectionState(state) {
  return state.collectionState
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getSelectedInventoryProducts(state) {
  return state.selectedInventoryProducts
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
export function getAuctionType(state) {
  return state.auctionType
}

/**
 * Get activeInventoryProduct
 * @param state
 * @returns {*}
 */
 export function getActiveInventoryProduct(state) {
  return state.activeInventoryProduct
}

/**
 * Get editProductInventory
 * @param state
 * @returns {*}
 */
 export function getEditProductInventory(state) {
  return state.editProductInventory
}

/**
 * Check if the user is authenticated.
 * @param state
 * @returns {*}
 */
 export function getNonInventoryAuctionItems(state) {
  return state.nonInventoryAuctionItems
}

/**
 * Get collection auctions with no inventories 
 * @param state
 * @returns {*}
 */
 export function getNonInventoryCollectionAuction(state) {
  return state.nonInventoryCollectionAuction
 }
