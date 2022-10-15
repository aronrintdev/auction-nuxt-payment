<template>
  <b-row
    v-if="inventory.product"
    class="position-relative mt-3 text-center ml-n1 font-weight-bold w-100 bg-white single-item"
  >
    <div
      class="position-absolute tag-bid d-flex align-items-center justify-content-center text-white"
      :class="bid.place"
    >
      {{ $t('bids.bid_status.' + bid.place) }}
    </div>
    <b-col sm="12" md="5" class="text-left">
      <b-row>
        <b-col md="4">
          <div @click.stop>
            <b-form-checkbox
              v-if="selectable"
              :checked="selected"
              class="position-absolute ml-n4 chekbox"
              @change="$emit('selected', bid.id)"
            >
            </b-form-checkbox>
          </div>
          <ProductThumb :product="inventory.product" />
          <div class="auction-id">{{ $t('bids.auction_id') }}: {{ auction.id }}</div>
        </b-col>
        <b-col md="8" class="pl-4 d-flex align-items-center">
          <b-row class="mb-2 d-block">
            <div class="body-5-medium mb-2">{{ inventory.product.name }}</div>
            <div class="body-5-medium mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{
                inventory.product.sku
              }}
            </div>
            <div class="body-5-medium mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                inventory.product.colorway
              }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                inventory.size.size
              }}
            </div>
            <div class="body-5-medium mb-2 text-gray-6">
              {{ $t('products.box_condition') }}&colon;&nbsp;{{ inventory.packaging_condition.name }}
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium">
      {{ $t('bids.auction_types.' + auction.type) }}
    </b-col>
    <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium">
      {{ $t('bids.outbid_types.' + (haveAutoBidOn ? 'on' : 'off')) }}
    </b-col>
    <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium">
     {{ bid.price / 100 }}
    </b-col>
    <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-medium">
      {{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}
    </b-col>
    <b-col
      v-if="bidType === BID_TYPE_OUTGOING"
      sm="12"
      md="2"
      class="d-flex justify-content-start align-items-center flex-column"
    >
      <Button class="bg-blue-2 mt-4" pill @click="$emit('edit', bid)">
        <span>
          {{
            isExpiredOrDelisted ? $t('bids.view') : $t('bids.edit_bid')
          }}</span
        >
      </Button>
      <span
        role="button"
        class="view-similar mt-2"
        @click="viewSimilarAuction"
        >{{ $t('bids.view_similar') }}</span
      >
    </b-col>

    <b-col
      v-if="acceptable"
      sm="12"
      md="2"
      class="d-flex justify-content-center align-items-center flex-column"
    >
      <Button variant="success" pill @click="$emit('accept', bid)" class="w-100">
        <div class="px-0 px-md-1 px-lg-2 px-xl-3 body-4-medium"> {{ $t('bids.accept') }}</div>
      </Button>
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import ProductThumb from '~/components/product/Thumb'
import { Button } from '~/components/common'
import {
  BID_TYPE_INCOMING,
  BID_TYPE_OUTGOING,
  DELISTED_STATUS,
  EXPIRED_STATUS,
} from '~/static/constants'

export default {
  name: 'BidSingleItem',
  components: { ProductThumb, Button },
  props: {
    bid: {
      type: Object,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    acceptable: {
      type: Boolean,
      default: false,
    },
    bidType: {
      type: String,
      default: BID_TYPE_INCOMING,
    },
  },
  data() {
    return {
      BID_TYPE_INCOMING,
      BID_TYPE_OUTGOING,
    }
  },
  computed: {
    inventory() {
      return this.auction.auction_items[0].inventory
    },
    auction() {
      return this.bid.auction
    },
    haveAutoBidOn() {
      return this.auction?.autoBidSetting?.is_disabled
    },
    /**
     * Checking if the bid is expired or delisted.
     * @returns {boolean}
     */
    isExpiredOrDelisted() {
      return (
        this.bid.auction.status === EXPIRED_STATUS ||
        this.bid.auction.status === DELISTED_STATUS
      )
    },
  },
  methods: {
    ...mapActions({
      setProductFilter: 'auction/setProductFilter'
    }),
    viewSimilarAuction() {
      const product = this.bid.auction.auction_items[0].inventory.product
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.$router.push('/auction')
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.highest_bid
    background-color: $color-green-15
.outbid
    background-color: $color-red-15
.winner
    background-color: $color-blue-1


.tag-bid
  @include body-4
  font-weight: $regular
  height: 30px
  width: 120px
  left: 0
  top: 0
  z-index: 10
  border-top-left-radius: 0px
  border-bottom-right-radius: 10px

.view-similar
  @include body-4
  color: $color-blue-2
  width: 200px
  font-weight: $normal

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none
.chekbox
  margin-top: 35px

.single-item
  #border: 1px solid $color-gray-60
  padding: 15px 10px

.auction-id
  color: $color-blue-31
  text-decoration: underline
  text-align: center
  font-size: 14px
</style>
