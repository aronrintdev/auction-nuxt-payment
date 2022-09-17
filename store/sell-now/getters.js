/**
 * Retrieve the shopping cart products.
 * @param state
 * 
 */
export function getSellingItem(state) {
  return state.sellNowItem
}

/**
 * Get the selected items inventory/ listing details
 * @param state 
 * @returns 
 */
export function getSelectedItem(state) {
  return state.selectedItem
}