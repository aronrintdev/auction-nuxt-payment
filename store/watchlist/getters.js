export function getWatchlists(state) {
  return state.watchlists
}

export function getWatchlistsType(state) {
  return state.watchlistsType
}

export function getSingleAuctionsCount(state) {
  return state.singleAuctionItems.length
}

export function getCollectionAuctionsCount(state) {
  return state.collectionAuctionItems.length
}
