/**
 * Set auctions
 * @param state
 * @param val auctions
 */
export function setAuctions(state, val) {
  state.auctions = val
}

/**
 * Set selected auction
 * @param state
 * @param val selected auction
 */
export function setSelectedAuction(state, val) {
  state.selectedAuction = val
}


/**
 * Set selected bids
 * @param state
 * @param val bids
 */
export function setSelectedBids(state, val) {
  state.selectedBids = val
}

/**
 * Remove bid from selected bids
 * @param state
 * @param val bid
 */
export function removeBidFromSelected(state, val) {
  state.selectedBids = state.selectedBids.filter(bid => bid.id!==val)
}

/**
 * Update bids of auction
 * @param state
 * @param payload Object {
 *   id: number,
 *   bids: bid[]
 * }
 */
export function setBidsOfAuction(state, payload) {
  state.auctions = state.auctions.map(a => {
    if (a.id === payload.id){
      a.bids = payload.bids
    }
    return a
  })
}
