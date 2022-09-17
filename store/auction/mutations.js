// Set the selected auction details to activeAuction array
export function setActiveAuction(state, val) {
  state.activeAuction = val
}

// Set the results to auctions
export function setAuctions(state, val) {
  state.auctions = val
}

// Set the selected auction price
export function updateActiveAuctionPrice(state, val) {
  state.activeAuction = {
    ...state.activeAuction,
    bid_price: val
  }
}

// Set the selected auction details
export function updateActiveAuction(state, updatedValues) {
  state.activeAuction = {
    ...state.activeAuction,
    ...updatedValues
  }
}

// Add item to Watchlist
export function addItemToWatchlist(state, id) {
  const newList = state.watchlist.slice()
  const idx = newList.findIndex(item => item === id)
  if (idx > -1) {
    newList.splice(idx, 1)
  } else {
    newList.push(id)
  }
  state.watchlist = newList
}

// Set the selected auction details
export function updateCheckoutStatus(state, value) {
  state.checkoutStatus = value
}

export function setProductFilter(state, value) {
  state.productFilter = value
}