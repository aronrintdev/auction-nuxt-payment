/**
 * Fetch bids
 * @param commit
 * @param {Object} payload
 * @param {number} payload.take
 * @param {number} payload.page
 * @param {string} payload.search
 * @param {number} payload.sort_by
 * @param {enum(single,collection)[]} payload.auction_type
 * @param {enum(on,off)[]} payload.autobid
 * @param {enum(incoming,outgoing)[]} payload.bid_type
 * @param {date} payload.bid_end_date
 * @param {date} payload.bid_start_date
 * @param {enum(highest_bid,winner,outbid)} payload.status
 * @return {Promise<AxiosResponse<any>>}
 */
export function fetchBids({commit}, payload){
  return this.$axios.get('/bids', {params: payload})
}

/**
 * Delete bulk for bids
 * @param commit
 * @param { Object } payload
 * @param { number[] } payload.ids
 * @return {Promise<AxiosResponse<any>>}
 */
export async function deleteBids({commit},payload) {
  return await this.$axios.delete('/bids', {data: payload})
}

/**
 * Edit bids
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @param {bids[]} payload.items
 * @param {number} payload.items.id
 * @param {enum('live', 'deleted')} payload.items.status
 * @return {Promise<AxiosResponse<any>>}
 */
export async function editBids({commit},payload) {
  return await this.$axios.put('/bids', payload)
}

/**
 * Edit Auto bid
 * @param commit
 * @param {Object} payload
 * @param {number} payload.auction_id
 * @param {number} payload.user_id
 * @param {boolean} payload.is_disabled
 * @param {number} payload.price
 *
 * @example {
 *   auction_id: 1,
 *   user_id: 1,
 *   is_disabled: true,
 *   price: 2000
 * }
 *
 * @return {Promise<AxiosResponse<any>>}
 */
export async function editAutoBid({commit},payload) {
  return await this.$axios.post('/auctions/auto-bid', payload)
}

/**
 * Cancel bid from auction
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @example{
 *   id: number,
 * }
 *
 */
export async function cancelBid({commit},payload) {
  return await this.$axios.post(`/bids/${payload.id}/cancel`)
}

/**
 * Get Auction Bids
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @param {number} payload.take
 * @param {number} payload.page
 * @example{
 *   id: number,
 *   take: number,
 *   page: number
 * }
 */
export async function getAuctionBids({commit},payload) {
  return await this.$axios.get(`/auctions/${payload.id}/bids`, {params: payload})
}

/**
 * Get My Bids for selected auction
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @param {number} payload.take
 * @param {number} payload.page
 * @example{
 *   id: number,
 *   take: number,
 *   page: number
 * }
 * @return {Promise<AxiosResponse<any>>}
 */
export async function getMyAuctionBids({commit},payload) {
  return await this.$axios.get(`/auctions/${payload.id}/my-bids`, {params: payload})
}

/**
 * Get Single Bid information
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @return {Promise<AxiosResponse<any>>}
 */
export async function getSingleBid({commit},payload) {
  return await this.$axios.get(`/bids/${payload.id}`)
}

/**
 * Accept highest bid for auction.
 * @param commit
 * @param {Object} payload
 * @param {number} payload.id
 * @param {number} payload.bid_id
 * @return {Promise<AxiosResponse<any>>}
 */

export async function acceptAuctionBid({commit},payload) {
  return await this.$axios.post(`/auctions/${payload.id}/accept-bid`, payload)
}
