<template>
  <div>
    <b-row
      v-if="inventory.product"
      :class="{'border shadow-sm' : isMobileSize}"
      class="position-relative mt-3 text-center ml-n1 font-weight-bold w-100 bg-white single-item"
    >
      <div
        class="position-absolute tag-bid d-flex align-items-center justify-content-center text-white"
        :class="bid.place"
      >
        {{ $t('bids.bid_status.' + bid.place) }}
      </div>
      <b-col sm="12" md="5"  class="text-left">
        <b-row>
          <b-col cols="4" md="4">
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
            <div v-if="!isMobileSize" class="auction-id">{{ $t('bids.auction_id') }}: {{ auction.id }}</div>
          </b-col>
          <b-col cols="8" md="8" class="pl-4 d-flex align-content-md-center">
            <b-row class="mb-2 d-block" :class="{ 'flex-grow-1' : isMobileSize }">
              <div class="mb-2 d-flex justify-content-between">
                <span :class="isMobileSize ? 'body-5-medium': 'body-8-medium'">{{ inventory.product.name }}</span>
                <template v-if="isMobileSize">
                  <!-- MOBILE BID MENU BEGIN -->
                  <div v-if="bidType === BID_TYPE_OUTGOING" @click="showMobileMenu" class="px-2">
                    <img src="~/assets/img/icons/mobile-3-dot-menu.svg">
                  </div>
                  <!-- MOBILE BID MENU END -->
                  <!-- MOBILE ACCEPT BUTTON BEGIN -->
                  <div v-if="acceptable">
                    <Button size="sm" variant="primary" class="btn-dark-blue px-2 mr-1" @click="$emit('accept', bid)">
                      <div class="body-9-medium"> {{ $t('bids.accept') }}</div>
                    </Button>
                  </div>
                  <!-- MOBILE ACCEPT BUTTON END -->
                </template>
              </div>
              <div class=" mb-2 text-gray-6 text-uppercase" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{
                  inventory.product.sku
                }}
              </div>
              <div class="mb-2 text-gray-6" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                  inventory.product.colorway
                }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{
                  inventory.size.size
                }}
              </div>
              <div class="mb-2 text-gray-6" :class="isMobileSize ? 'body-6-medium' : 'body-5-medium'">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{ inventory.packaging_condition.name }}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column py-1 py-md-0 mt-3">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.auction_id') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-underline text-blue-30' : 'body-4-medium'">
          {{ $t('bids.auction_types.' + auction.type) }}
        </span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auto_bid') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">{{ $t('bids.outbid_types.' + (haveAutoBidOn ? 'on' : 'off')) }}</span>
        </div>
      </b-col>
      <b-col sm="12" md="1" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.auction_type') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">{{ bid.price / 100 }}</span>
        </div>
      </b-col>
      <b-col sm="12" md="2" class="d-flex justify-content-around flex-column body-4-medium py-1 py-md-0"
             :class="{'bg-lightgrey': isMobileSize}">
        <div class="d-flex justify-content-between d-md-block">
          <span class="d-sm-block d-md-none body-9-medium">{{ $t('bids.headers.time_remaining') }}:</span>
          <span :class="isMobileSize ? 'body-9-regular text-gray-6' : 'body-4-medium'">{{ !isExpiredOrDelisted ? bid.auction.remaining_time : 'Expired' }}</span>
        </div>
      </b-col>
      <b-col
        v-if="bidType === BID_TYPE_OUTGOING && !isMobileSize"
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
          class="view-similar mt-2 body-8-normal"
          @click="viewSimilarAuction"
        >{{ $t('bids.view_similar') }}</span
        >
      </b-col>
      <b-col
        v-if="acceptable && !isMobileSize"
        sm="12"
        md="2"
        class="d-flex justify-content-center align-items-center flex-column"
      >
        <Button variant="success" pill class="w-100" @click="$emit('accept', bid)">
          <div class="px-0 px-md-1 px-lg-2 px-xl-3 body-4-medium"> {{ $t('bids.accept') }}</div>
        </Button>
      </b-col>
    </b-row>
    <vue-bottom-sheet
      ref="mobileMenu"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <MobileMenu
        :inventory="inventory"
        :is-expired-or-delisted="isExpiredOrDelisted"
        @viewSimilar="viewSimilarAuction"
        @edit="$emit('edit', bid)"
        @close="hideMobileMenu"
      />
    </vue-bottom-sheet>
  </div>

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
import screenSize from '~/plugins/mixins/screenSize'
import MobileMenu from '~/components/profile/bids/MobileMenu'

export default {
  name: 'BidSingleItem',
  components: {MobileMenu, ProductThumb, Button },
  mixins: [screenSize],
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
    isMobileSize() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  methods: {
    ...mapActions({
      setProductFilter: 'auction/setProductFilter'
    }),
    viewSimilarAuction() {
      const product = this.bid.auction.auction_items[0].inventory.product
      this.setProductFilter({ sku: product.sku, name: product.name })
      this.$router.push('/auction')
    },
    showMobileMenu() {
      const { mobileMenu } = this.$refs
      if (mobileMenu) {
        mobileMenu.open()
      }
    },
    hideMobileMenu() {
      const { mobileMenu } = this.$refs
      if (mobileMenu) {
        mobileMenu.close()
      }
    },
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
  color: $color-blue-2

.bg-blue-2.btn.btn-primary
  background-color: $color-blue-2
  border: none
.chekbox
  margin-top: 35px

.single-item
  padding: 10px

.border
  border: 1px solid $color-gray-60
  border-radius: 12px !important
  overflow: hidden

.auction-id
  color: $color-blue-31
  text-decoration: underline
  text-align: center
  font-size: 14px

.text-blue-30
  color: $color-blue-30
  text-decoration: underline

.btn-dark-blue.btn.btn-primary
  background: $color-blue-20
  border-color: $color-blue-20
  font-weight: $normal
  font-size: 12px
  boorder-radisu: 8px
</style>
