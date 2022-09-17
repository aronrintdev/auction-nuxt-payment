/* A mixin that is used in the ProfileBids. This mixin encapsulates filters options that is used on profile/bids.  */
const profileBidsMixin = {
  data(){
    return {
      SORT_BY: Object.keys(this.$t('bids.sort')).map(a => {
        return {
          label: this.$t('bids.sort.' + a),
          value: a
        }
      }),
      OUTBID_TYPES: Object.keys(this.$t('bids.outbid_types')).map(a => {
        return {
          text: this.$t('bids.outbid_types.' + a),
          value: a
        }
      }),
      AUCTION_TYPES: Object.keys(this.$t('bids.auction_types')).map(a => {
        return {
          text: this.$t('bids.auction_types.' + a),
          value: a
        }
      }),
      STATUSES: Object.keys(this.$t('bids.bid_status')).map(a => {
        return {
          text: this.$t('bids.bid_status.' + a),
          value: a
        }
      }),
      BID_TYPES: Object.keys(this.$t('bids.bid_type')).map(a => {
        return {
          label: this.$t('bids.bid_type.' + a),
          value: a
        }
      }),
    }
  }
}

export default profileBidsMixin
