// Get the selected products details
export function activeProduct(state) {
  return state.activeProduct
}
// Get the selected products size array
export function activeProductsize(state) {
  return state.activeSizes
}
// Get the selected sku
export function activeSku(state) {
  return state.activeSku
}
// Get the selected active category
export function activeCategory(state) {
  return state.activeCategory
}
// Get all the items in product array, (items in sneakers category)
export function products(state) {
  return state.products
}

// Get the items in apparel[]
export function apparel(state) {
  return state.apparel
}

// Get the items in accessories []
export function accessories(state) {
  return state.accessories
}

// Get the search history
export function getRecentSearchHistory(state) {
  return state.recentSearchHistory
}
