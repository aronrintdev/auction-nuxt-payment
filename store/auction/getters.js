// Get the selected auctions details
export function activeAuction(state) {
  return state.activeAuction
}

// Get all the items in auction array
export function auctions(state) {
  return state.auctions
}

// Get cart info
export function watchlist(state) {
  return state.watchlist
}

export function getCheckoutStatus(state) {
  return state.checkoutStatus
}

export function getProductFilter(state) {
  return state.productFilter
}
