export default function () {
  return {
    bids: [],
    selectedBid: null,
    filters: {
      activeTypeFilters: [],
      activeStatusFilters: [],
      activeOnOffBidFilters: [],
      search: '',
      sortBy: null,
      auctionType: null,
      statusType: null,
      outbidTypes: null,
      start_date: null,
      end_date: null,
    }
  }
}
