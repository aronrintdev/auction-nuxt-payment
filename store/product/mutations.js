// Set the selected product detials to activeproduct array
export function setActiveProduct(state, val) {
  state.activeProduct = val
}
// Set the selected products sizes array to activesizes[]
export function setActiveProductSizes(state, val) {
  state.activeSizes = val
}
// Set the selected sku
export function activeSku(state, val) {
  state.activeSku = val
}
// set the selected category
export function activeCategory(state, val) {
  state.activeCategory = val
}
// Set the results to products[]
export function setProducts(state, val) {
  state.products = val
}

// Set the results to apparel[]
export function setApparel(state, val) {
  state.apparel = val
}

// Set the results to accessories[]
export function setAccessories(state, val) {
  state.accessories = val
}

// Set the search history
export function setRecentSearchHistory(state, val) {
  state.recentSearchHistory = val
}

// add the items to search history
export function addToRecentSearchHistory(state, val) {
  if (state.recentSearchHistory.length === 3)
    state.recentSearchHistory.splice(2, 1)
  state.recentSearchHistory.unshift(val)
}
