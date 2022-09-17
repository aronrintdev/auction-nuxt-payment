/**
 * Fetch auctions
 * @param commit
 * @param payload  Object {
 *   take: number,
 *   page: number,
 *   search: string,
 *   sort_by: string,
 *   types: [],
 *   start_date: date,
 *   end_date: date,
 *   status: enum(all, live, expired),
 * }
 */
export async function fetchAuctions({commit},payload) {
  return await this.$axios.get('/auctions', {params: {...payload}})
}
/**
 * Delete bulk for auctions
 * @param commit
 * @param payload  Object {
 *   ids: []
 * }
 */

export async function deleteAuctions({commit},payload) {
  return await this.$axios.delete('/auctions', {data: {...payload}})
}


/**
 * Accept highest bid for auction.
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   bid_id: number
 * }
 */

export async function acceptAuctionBid({commit},payload) {
  return await this.$axios.post(`/auctions/${payload.id}/accept-bid`, {...payload})
}

/**
 * Change auction status
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   status: enum('live', 'delisted')
 * }
 */

export async function changeAuctionStatus({commit},payload) {
  return await this.$axios.post(`/auctions/${payload.id}/status`, {...payload})
}

/**
 * Get single auction
 * @param commit
 * @param payload  Object {
 *   id: number,
 * }
 */
export async function getSingleAuction({commit},payload) {
  return await this.$axios.get(`/auctions/${payload.id}`)
}

/**
 * Remove reserve Price
 * @param commit
 * @param payload  Object {
 *   id: number,
 * }
 */
export async function removeReservePrice({commit},payload) {
  return await this.$axios.delete(`/auctions/${payload.id}/reserve`)
}

/**
 * Remove expired Auctions
 * @param commit
 * @param payload  Object {
 *   id: number,
 * }
 */
export async function deleteExpiredAuctions({commit},payload) {
  return await this.$axios.delete('/auctions/expired')
}


/**
 * Edit reserve Price
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   price: number
 * }
 */
export async function editReservePrice({commit},payload) {
  return await this.$axios.put(`/auctions/${payload.id}/reserve`, {...payload})
}

/**
 * Send Final Offers
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   items: bids[]
 * }
 * bid: {
 *   bid_id: number,
 *   duration: number
 * }
 */
export async function sendFinalOffers({commit},payload) {
  return await this.$axios.post(`/auctions/${payload.id}/final-offers`, {...payload})
}

/**
 * Edit auctions
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   items: auctions[]
 * }
 * auction: {
 *   id: number,
 *   status: enum('live', 'delisted')
 * }
 */
export async function editAuction({commit},payload) {
  return await this.$axios.put('/auctions', {...payload})
}


/**
 * Edit auctions
 * @param commit
 * @param payload  Object {
 *   id: number,
 *   take: number,
 *   page: number
 * }
 */
export async function getAuctionBids({commit},payload) {
  return await this.$axios.get(`/auctions/${payload.id}/bids`, {params: {...payload}})
}
