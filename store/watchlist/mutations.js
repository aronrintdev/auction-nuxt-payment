export function setWatchlists(state, watchlists) {
  state.watchlists = watchlists
}

export function addWatchlist(state, watchlist) {
  state.watchlists.push(watchlist)
}

export function updateWatchlist(state, watchlist) {
  const found = state.watchlists.find((list) => list.id === watchlist.id)
  if (found) {
    Object.assign(found, watchlist)
  }
}

export function updatePrivacy(state, { watchlist, privacy }) {
  const found = state.watchlists.find((list) => list.id === watchlist.id)
  if (found) found.privacy = privacy
}

export function setWatchlistsType(state, type) {
  state.watchlistsType = type
}

export function setSingleAuctionItems(state, watchlists) {
  state.singleAuctionItems = watchlists
}

export function setCollectionAuctionItems(state, watchlists) {
  state.collectionAuctionItems = watchlists
}