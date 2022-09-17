import _ from 'lodash'

/**
 * Set selected bid
 * @param state
 * @param val bid
 */
export function setSelectedBid(state, val) {
  state.selectedBid = val
}

/**
 * Set bids of selected bid's auction
 * @param state
 * @param val bids[]
 */
export function setSelectedAuctionBids(state, val) {
  state.selectedBid.auction = {...state.selectedBid.auction, bids: val}
}

/**
 * Set bids of selected bid's auction
 * @param state
 * @param {Object} data
 * @param {number} data.take
 * @param {number} data.page
 * @param {string} data.search
 * @param {number} data.sort_by
 * @param {enum(single,collection)[]} data.auction_type
 * @param {enum(on,off)[]} data.autobid
 * @param {enum(incoming,outgoing)[]} data.bid_type
 * @param {date} data.bid_end_date
 * @param {date} data.bid_start_date
 * @param {enum(highest_bid,winner,outbid)} data.status
 */
export function setFilters(state, data) {
  state.filters = _.cloneDeep(data)
}
