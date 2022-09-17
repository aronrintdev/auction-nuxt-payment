/**
 * It returns the selectedBid property from the state object
 * @param state - The state of the  store.
 * @returns The selectedBid from the state.
 */
export function getSelectedBid(state) {
  return state.selectedBid
}

/**
 * It returns the filters property of the state object
 * @param state
 * @returns The filters object from the state.
 */
export function getFilters(state) {
  return state.filters
}
