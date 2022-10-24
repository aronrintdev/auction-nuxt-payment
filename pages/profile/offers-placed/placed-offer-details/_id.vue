<template>
  <div
    class="product-summary-details responsive-offer-placed-mobile p-3"
    :class="mobileClass"
  >
    <b-row v-if="isScreenXS" class="heading-row responsive-offer-placed-mobile">
      <!-- Heading -->
      <div
        class="
          col-12
          mt-md-4 mt-2
          vd-selling-heading
          mobile
          d-flex
          justify-content-between
          border-bottom
          py-2
        "
      >
        <span role="button" @click="moveBack()">
          <img
            :src="require('~/assets/img/icons/back.svg')"
            alt="back-arrow"
            class="float-left"
          />
        </span>
        <span class="placed-offer-heading-mobile d-flex align-items-center">{{
          $t('placed_offers.responsive_detailed_heading')
        }}</span>
        <span class="filter-wrapper" role="button">
          <img
            class="mobile-filter"
            :src="require('~/assets/img/icons/filter-icon.svg')"
            alt="filter-icon"
          />
        </span>
      </div>
      <!-- ./Heading -->
    </b-row>

    <!-- Product summary heading -->
    <div v-if="isScreenXS" class="row vd-product-summary-listing my-4">
      <div
        class="
          col-12
          product-summary-heading
          d-flex
          justify-content-start
          text-center
        "
      >
        {{ $t('placed_offers.placed_offers_product_summary') }}
      </div>
    </div>
    <!-- ./Product summary heading -->

    <!-- Product summary details -->
    <div v-if="isScreenXS" 
      id="product-summary"
      class="
        single-live-reserve-section-box-collections
        d-md-none d-lg-none
        w-100
      "
    >
      <div class="row">
        <div class="col-md-12">
          <div class="carousel-auctions-collections">
            <div class="carousel slide">
              <div
                class="
                  carousel-inner
                  auction-inner-carousels-box
                  position-relative
                  w-100
                  overflow-hidden
                "
              >
                <div class="carousel-item active d-block">
                  <div class="row product-details-row d-flex flex-1 px-3">
                    <div class="col-xs-4">
                      <div
                        class="float-left single-img-prodct-reserve-jordon-mbl"
                      >
                        <img
                          :src="productImg || fallBackImg"
                          alt="product-image"
                          @error="imageLoadError"
                        />
                      </div>
                    </div>
                    <div class="col-xs-7 product-details">
                      <div
                        class="info-single-reserve-info-prodct-mbl float-left"
                      >
                        <div
                          class="
                            name-prodct-single-live-reserve-jordon
                            mb-1
                            d-flex
                          "
                        >
                          <span
                            id="product-name"
                            class="product-name float-left mr-2"
                            >{{ productName }}</span
                          >

                          <span
                            v-if="productStatus"
                            class="detailed-product-status text-capitalize"
                          >
                            {{ productStatus }}
                          </span>
                        </div>
                        <div class="product-sku mb-1 mt-2">
                          <span class="font-secondary"
                            >{{ $t('common.sku') }}&colon;
                            <span v-if="productSku">{{ productSku }}</span>
                            <span v-else>&minus;</span>
                          </span>
                        </div>
                        <div
                          class="
                            name-prodct-single-live-reserve-jordon-info-desc
                            mb-1
                          "
                        >
                          {{ $t('common.colorway') }}&colon;
                          <span v-if="productColorWay">{{
                            productColorWay
                          }}</span>
                          <span v-else>&minus;</span>

                          &comma;
                          {{ $t('placed_offers.size') }}&colon;
                          <span v-if="productSize">{{ productSize }}</span>
                          <span v-else>&minus;</span>
                        </div>
                        <div
                          class="
                            name-prodct-single-live-reserve-jordon-info-desc
                            mb-1
                          "
                        >
                          {{ $t('common.box_condition') }}&colon;
                          <span v-if="productBoxCondition">{{
                            productBoxCondition
                          }}</span>
                          <span v-else>&minus;</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="single-live-auction-summary-reserve-mbls mt-2 w-100 float-left"
      >
        <div class="single-live-auctions-id-informtion">
          {{ $t('placed_offers.list_id') }}:
          <nuxt-link
            v-if="list"
            :to="`/profile/vendor-selling/details/${list.id}`"
            class="float-right listingId text-decoration-underline"
            >{{ list.id }}</nuxt-link
          >
          <span v-else class="float-right listingId text-decoration-underline"
            >&minus;</span
          >
        </div>
        <div class="single-live-auctions-listed-on-heading-mbl">
          {{ $t('placed_offers.listed_on') }}:
          <span v-if="list" class="float-right sub-text text-right">
            {{
              list.created_at
                | formatDateTimeString('dd-mm-yyyy|hh:mm ampm timezone')
            }}
          </span>
          <span v-else class="float-right sub-text text-right"> &minus; </span>
        </div>
        <div class="single-live-auctions-id-informtion">
          {{ $t('placed_offers.expires_on') }}:
          <!-- TODO offer expiry -->
          <span v-if="list" class="float-right sub-text text-right">
            {{
              offer.created_at
                | formatDateTimeString('dd-mm-yyyy|hh:mm ampm timezone')
            }}
          </span>
          <span v-else class="float-right sub-text text-right"> &minus; </span>
        </div>
        <div class="single-live-auctions-listed-on-heading-mbl">
          {{ $t('placed_offers.priced_at') }}:
          <span v-if="list" class="float-right sub-text text-right">
            {{ list.min_bid_price | toCurrency('USD', 'N/A') }}
          </span>
          <span v-else class="float-right sub-text text-right"> &minus; </span>
        </div>
        <div class="single-live-auctions-id-informtion">
          {{ $t('placed_offers.status') }}:
          <span v-if="showHighestOffer" class="float-right sub-text text-right offer-text-tag">{{
            $t('placed_offers.highest_offer')
          }}</span>
          <span v-else class="float-right sub-text text-right offer-text-tag">&minus;</span>
        </div>
      </div>
    </div>
    <!-- Product summary details ending -->

    <div v-if="isScreenXS" class="row vd-product-summary-listing my-4">
      <div
        class="
          col-12
          product-summary-heading
          d-flex
          justify-content-start
          text-center
        "
      >
        {{ $t('placed_offers.placed_offers_your_placed_offers') }}
      </div>
      <div class="min-offer-section mb-1 ml-2 float-right">
        {{ $t('placed_offers.min_offer') }}
        <span v-if="minOffer" class="min-offer">{{
          minOffer.bid_price | toCurrency('USD', 'N/A')
        }}</span>
        <span v-else>&minus;</span>
      </div>
    </div>
    <template v-for="(placedOffer, index) in placedOffers">
      <div
        v-if="placedOffer.user_id === $auth.user.id && isScreenXS"
        :key="index"
        class="
          single-live-reserve-section-box
          mt-3
          d-md-none d-lg-none
          w-100
          px-2
          bottom-offer-detail
        "
      >
        <div class="row">
          <div class="col-md-12">
            <div class="carousel-auctions-collections">
              <div class="slide">
                <div
                  class="
                    carousel-inner
                    auction-inner-carousels-box
                    position-relative
                    w-100
                    overflow-hidden
                  "
                >
                  <div class="carousel-item active d-block">
                    <div class="row product-details-row d-flex flex-1">
                      <div class="col-xs-2">
                        <div class="float-left offer-image-tag ml-2px">
                          <img
                            :src="require('~/assets/img/icons/offer-price.svg')"
                            alt="back-arrow"
                            class="offer-price-icon"
                          />
                        </div>
                      </div>
                      <div class="col-xs-4 mt-2 highest-offer-tag">
                        <div v-if="highestOffer && highestOffer.id === placedOffer.id" class="offer-text-tag d-flex justify-content-center">
                          {{ $t('placed_offers.highest_offer') }}
                        </div>
                      </div>
                      <div class="col-xs-2 mt-2">
                        <div class="offer-value-tag d-flex justify-content-center">
                          {{ placedOffer.bid_price | toCurrency('USD', 'N/A') }}
                        </div>
                      </div>
                      <div class="col-xs-3 mt-2">
                        <div
                        class="offer-date-tag d-flex justify-content-center"
                      >{{ placedOffer.created_at | formatDate('MM-DD-YYYY') }}</div>
                      </div>
                      <div class="col-xs-1 m-auto">
                        <div
                          class="
                            three-dots-icon-single-reserve-mbl
                            text-center
                            justify-content-end
                          "
                        >
                          <span
                            class="view-more-option d-flex justify-content-center"
                            role="button"
                            @click="editOffer(placedOffer)"
                          >
                            <img
                              :src="require('~/assets/img/icons/extra_dot.png')"
                              alt="view more"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <EditOffer
      :open="viewEditOffer"
      :highestOfferAmount="selectedOfferAmount"
      :offerId="selectedOfferId"
      @closed="viewEditOffer = false"
      @reload="reloadData"
    />
    <!-- popup for edit offer -->
  </div>
</template>

<script>
import _ from 'lodash'
import { PRODUCT_IMG_WIDTH, PRODUCT_FALLBACK_URL } from '~/static/constants'
import EditOffer from '~/components/profile/offers-placed/EditOffer.vue'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'PlacedOfferDetails',
  components: {
    EditOffer,
  },

  mixins: [screenSize],

  layout: 'Profile',

  data() {
    return {
      fallbackImgWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      viewEditOffer: false,
      offer: null,
      selectedOfferId: 0,
      selectedOfferAmount: 0,
    }
  },

  async fetch() {
    await this.$axios
      .get(`/offer/${this.$route.params.id}`)
      .then((res) => {
        this.offer = res.data.data
      })
      .catch((err) => {
        this.$router.push('/profile/offers-placed')
        this.$logger.logToServer('Offers Placed', err.response)
      })
  },

  computed: {
    product: (vm) => {
      return vm.offer && vm.offer.product
    },

    size: (vm) => {
      return vm.offer && vm.offer.size
    },

    status: (vm) => {
      return vm.offer && vm.offer.status
    },

    bidPrice: (vm) => {
      return vm.offer && vm.offer.bid_price
    },

    packagingCondition: (vm) => {
      return vm.offer && vm.offer.packaging_condition
    },

    productName: (vm) => {
      return vm.product && vm.product.name
    },

    productImg: (vm) => {
      return vm.product && vm.product.image
    },

    productSku: (vm) => {
      return vm.product && vm.product.sku
    },

    productColorWay: (vm) => {
      return vm.product && vm.product.colorway
    },

    productSize: (vm) => {
      return vm.size && vm.size.size
    },

    productBoxCondition: (vm) => {
      return vm.packagingCondition && vm.packagingCondition.name
    },

    productStatus: (vm) => {
      const value = vm.itemList?.find(
        (i) =>
          i.inventory.packaging_condition_id === vm.packagingConditionId &&
          i.inventory.size_id === vm.sizeId
      )

      return value && value.status
    },

    packagingConditionId: (vm) => {
      return vm.packagingCondition && vm.packagingCondition.id
    },

    sizeId: (vm) => {
      return vm.size && vm.size.id
    },

    itemList: (vm) => {
      return vm.product && vm.product.listing_items
    },

    fallBackImg: (vm) => {
      return `${vm.fallbackImgUrl}${vm.fallbackImgWidth}`
    },

    offerId: (vm) => {
      return Number(vm.$route.params.id)
    },

    placedOffers: (vm) => {
      if (vm.offer) {
        const item = vm.offer.placed_offer.filter(
          (i) => i.user_id === vm.$auth.user.id
        )
        return item
      }
    },

    highestOffer: (vm) => {
      if(vm.placedOffers){
        return _.maxBy(vm.placedOffers, 'bid_price')
      }
    },

    minOffer: (vm) => {
      if(vm.placedOffers) {
        return _.minBy(vm.placedOffers, 'bid_price')
      }
    },

    showHighestOffer: (vm) => {

      return vm.highestOffer && vm.highestOffer.id === vm.$route.params.id
    },

    list: (vm) => {
      if (vm.product) {
        const item = vm.product.listing_items.filter(
          (i) =>
            i.inventory.size_id === vm.sizeId &&
            i.inventory.packaging_condition_id === vm.packagingConditionId
        )

        return item && item[0]
      }
    },
  },

  methods: {
    // Move to index page
    moveBack() {
      this.$router.push(this.$nuxt.context.from || '/profile/offers-placed')
    },

    // Make relode for offer detailed page after edit the amount
    reloadData() {
      this.$fetch()
    },

    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallBackImg
    },

    editOffer(val) {
      this.selectedOfferAmount = val.bid_price
      this.selectedOfferId = val.id
      this.viewEditOffer = !this.viewEditOffer
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.product-summary-details
  margin-bottom: 5rem
  padding: 4%
.product-summary-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
.single-live-reserve-section-box-collections
  height: 256px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb1
  border-radius: 8px
.single-live-reserve-section-box
  height: 63px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb1
  border-radius: 8px
.listingId
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-blue-30
.sub-text
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-gray-6
.carousel
  height: 145px

.single-img-prodct-reserve-jordon-mbl
  img
    width: 87.98px
    left: 32px
    top: 259px
#product-summary::v-deep
  .product-details
    .product-name
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-black-1

.name-prodct-single-live-reserve-jordon
  .status
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-normal
    color: $color-green-2
.name-prodct-single-live-reserve-jordon-info-desc
  font-family: $font-sp-pro
  font-style: normal
  @include body-6-normal
  color: $color-gray-5
.single-img-prodct-reserve-jordon-mbl
  flex: 0 0 30%
  max-width: 30%

.single-live-auction-summary-reserve-mbls
  height: auto
.single-live-auctions-id-informtion
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
  padding-left: 15px
  padding-right: 15px
  padding-top: 2px
  padding-bottom: 4px

.single-live-auctions-listed-on-heading-mbl
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
  background: $color-white-5
  padding-left: 15px
  padding-right: 15px
  padding-bottom: 4px
  padding-top: 2px
.product-details-row
  padding: 3%

.offer-image-tag
  width: 54px
  height: 31.29px
  left: 31px
  top: 488px

.offer-text-tag
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-blue-1

.offer-value-tag
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1

.offer-date-tag
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
.min-offer-section
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-gray-6
.placed-offer-heading-mobile
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  color: $color-black-1

.trade-inv-heading-mobile
  border-bottom: 1px solid $color-gray-86

.return-button
  width: 20px
  margin-top: 6px

.bottom-offer-detail
  width: 343px
  height: 63px

@media (min-width:576px)
  .responsive-offer-placed-mobile
    display: none

.highest-offer-tag
  .offer-text-tag
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-blue-1

.product-summary-details::v-deep
  &.mobile
    .product-sku
      font-family: $font-sp-pro
      font-style: normal
      @include body-6-normal
      color: $color-gray-5
    #product-summary
      .product-details
        .product-name
          font-family: $font-sp-pro
          font-style: normal
          @include body-5-medium
          color: $color-black-1
        .detailed-product-status
          font-family: $font-sp-pro
          font-style: normal
          @include body-9-normal
          color: $color-green-2
</style>