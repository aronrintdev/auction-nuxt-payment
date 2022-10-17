/**
 * Set deadstockExchanges
 * @param state
 * @param {Object[]} deadstockExchanges
 */
export function setDeadstockExchanges(state, deadstockExchanges) {
  state.deadstockExchanges = deadstockExchanges
}

/**
 * Set deadstockExchanges
 * @param state
 * @param {Object[]} deadstockExchanges
 */
 export function setCurrentType(state, type) {
  state.currentType = type
}
/**
 * Set activeFilters
 * @param state
 * @param {Object[]} deadstockExchanges
 */
 export function setActiveFilters(state, activeFilters) {
  state.activeFilters = activeFilters
}


/**
 * Remove all activeFilters.
 * @param state
 * @param product
 */
 export function removeActiveFilters(state) {
  state.activeFilters = []
}
