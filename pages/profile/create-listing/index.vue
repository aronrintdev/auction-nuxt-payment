<template>
  <div class="create-listing-page h-100">
    <div class="wrapper" :class="isScreenXS && 'bg-white'">
      <section class="content p-3 p-md-4">
        <div v-if="vendorPayoutMethod" class="content-header border-0">
          <div
            class="
              content-head
              d-flex
              align-items-center
              justify-content-between
              m-auto
            "
          >
            <!-- Heading -->
            <span class="content-header-title">
              {{ $t('create_listing.index.title') }}
            </span>
            <!-- ./Heading -->
            <!-- Drafts -->
            <span
              class="text-decoration-underline drafts-btn"
              role="button"
              @click="showDraft"
              >{{ $t('common.drafts') }} &#040;{{
                draftListingItem.length + getTradeDraftCount || 0
              }}&#041;
            </span>
            <!-- ./Drafts -->
          </div>
        </div>

        <div v-if="vendorPayoutMethod" class="content-main">
          <div
            class="
              d-flex
              flex-column flex-md-row
              justify-content-between
              listing-types
            "
          >
            <!-- Selling -->
            <div
              class="d-flex flex-row flex-md-column listing-type p-0 border-0"
              @click="routeTo('selling')"
            >
              <div class="position-relative listing-type-img">
                <img
                  src="~/assets/img/create-listing/selling1.png"
                  class="position-absolute w-100"
                />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title selling">
                  {{ $t('create_listing.index.selling') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.selling_desc') }}
                </div>
                <div class="d-md-none mt-1 ml-auto arrow-icon">
                  <img
                    class="w-100"
                    src="~/assets/img/icons/arrow-right-in-circle.svg"
                  />
                </div>
              </div>
            </div>
            <!-- ./Selling -->
            <!-- Auction -->
            <div
              class="d-flex flex-row flex-md-column listing-type  p-0 border-0"
              @click="routeTo('auction')"
            >
              <div class="position-relative listing-type-img">
                <img
                  src="~/assets/img/create-listing/auctions1.png"
                  class="position-absolute w-100"
                />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title auction">
                  {{ $t('create_listing.index.auction') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.auction_desc') }}
                </div>
                <div class="d-md-none mt-1 ml-auto arrow-icon">
                  <img
                    class="w-100"
                    src="~/assets/img/icons/arrow-right-in-circle.svg"
                  />
                </div>
              </div>
            </div>
            <!-- ./Auction -->
            <!-- Trade -->
            <div
              class="d-flex flex-row flex-md-column listing-type  p-0 border-0"
              @click="routeTo('trade')"
            >
              <div class="position-relative listing-type-img">
                <img
                  src="~/assets/img/create-listing/trade1.png"
                  class="position-absolute w-100"
                />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title trade">
                  {{ $t('create_listing.index.trade') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.trade_desc') }}
                </div>
                <div class="d-md-none mt-1 ml-auto arrow-icon">
                  <img
                    class="w-100"
                    src="~/assets/img/icons/arrow-right-in-circle.svg"
                  />
                </div>
              </div>
            </div>
            <!-- ./Trade -->
          </div>
        </div>

        <div
          v-if="!vendorPayoutMethod"
          :class="`content-main-new-user d-flex justify-content-center ${
            isScreenXS ? mobileClass : 'web m-auto'
          }`"
        >
          <div :class="`row ${isScreenXS ? mobileClass : 'web-row'}`">
            <div class="col-12 d-flex">
              <span
                :class="`first-name ${
                  isScreenXS ? mobileClass : 'web'
                } d-flex align-items-center text-center `"
              >
                {{ $t('createlisting.hello') }} {{ $auth.user.first_name }}
              </span>
              <span
                :class="`hand-wave-icon ${isScreenXS ? mobileClass : 'web'}`"
              >
                <img
                  :src="require('~/assets/img/icons/hand-wave.svg')"
                  alt="hand-wave-icon"
                />
              </span>
            </div>
            <div class="col-12 mt-3">
              <div
                :class="`no-payout-text d-flex align-items-center ${
                  isScreenXS ? mobileClass : 'web'
                }`"
              >
                {{ $t('createlisting.new_user_no_payout') }}
              </div>
            </div>

            <div class="col-12 mt-3">
              <div
                :class="`connect-to-payout d-flex align-items-center ${
                  isScreenXS ? mobileClass : 'web '
                }`"
              >
                {{ $t('createlisting.connect_to_payout') }}
              </div>
            </div>

            <div class="col-12 mt-5 d-flex justify-content-center">
              <Button
                variant="connect d-flex"
                :class="isScreenXS ? mobileClass : 'web'"
                :to="`/profile/vendor-hub`"
              >
                {{ $t('sell_now.connect_payout') }}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { LISTING_TYPES } from '~/static/constants/create-listing'
import screenSize from '~/plugins/mixins/screenSize'
import { Button } from '~/components/common'
export default {
  name: 'CreateListingPage',
  components: {
    Button,
  },
  mixins: [screenSize],
  layout: 'Profile',
  middleware: ['auth', 'vendor'],
  computed: {
    ...mapGetters({
      draftListingItem: 'listingItems/listingSavedAsDraft',
      getVendorPayoutMethod: 'auth/getVendorPayoutMethod',
    }),
    ...mapGetters('trades', ['getTradeDraftCount']),

    vendorPayoutMethod: (vm) => {
      return vm.getVendorPayoutMethod
    },
  },
  created() {
    this.addVendorPayoutMethod()
  },
  methods: {
    ...mapActions({
      addVendorPayoutMethod: 'auth/addVendorPayoutMethod',
    }),
    // Show the drafts page
    showDraft() {
      this.$router.push({ path: '/profile/create-listing/drafts' })
    },
    routeTo(type) {
      // If not a vendor
      if (!this.$store.state.auth.user.roles_name.includes('Vendor')) {
        this.$toasted.error(this.$t('createlisting.user_not_valid'))
      } else if (type === LISTING_TYPES.SELLING) {
        // If the type is selling
        this.$router.push({
          path: '/profile/create-listing/selling',
        })
      } else if(type === LISTING_TYPES.TRADE) { // If the type is trade
          this.$store.commit('trades/removeAllWantItems')
          this.$store.commit('trades/clearTradeItems')
          this.$store.commit('trades/setTradeForEditing',null)
          this.$router.push('/profile/create-listing/trades/create')
      } else if (type === LISTING_TYPES.AUCTION) {
        // If the type is auction
        this.$router.push({
          path: '/create-listing/selectproducttype',
        })
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@import '~/assets/css/_typography'
.create-listing-page
  background: $color-white-4
  .content-header
    border: none
    &-title
      @media (max-width: 576px)
        font-size: 14px
        line-height: 17px
    span
      @media (max-width: 576px)
        font-size: 14px
        line-height: 17px
    @media (max-width: 576px)
      margin-bottom: 0
  .listing-type
    border: none
    margin-right: 100px
    margin-bottom: 36px
    padding: 0
  .drafts-btn
    font-weight: $medium
  .content-main-new-user
    .web-row
      padding: 4rem
    &.web
      width: 816px
      height: 450px
      left: 444px
      top: 166px
      background: $color-white-1
      border-radius: 38px
    &.mobile
      margin: 10rem 1.5rem

    .first-name
      &.mobile
        font-family: $font-family-montserrat
        font-style: normal
        @include body-3-medium
        color: $color-black-1
      &.web
        font-family: $font-montserrat
        font-style: normal
        @include body-1-medium
        color: $color-black-1
    .no-payout-text
      &.mobile
        font-family: $font-montserrat
        font-style: normal
        @include body-4-normal
        color: $color-gray-6
      &.web
        font-family: $font-montserrat
        font-style: normal
        @include body-7-normal
        color: $color-gray-6
    .connect-to-payout
      &.mobile
        font-family: $font-montserrat
        font-style: normal
        @include body-4-medium
        color: $color-blue-20
      &.web
        font-family: $font-montserrat
        font-style: normal
        @include body-1-medium
        color: $color-blue-20
    .btn-connect
      @include body-4-medium
      color: $color-white-1
      &.mobile
        background: $color-black-1
        border-radius: 20px
        font-family: $font-montserrat
        font-style: normal
        color: $color-white-1
      &.web
        background: $color-blue-20
        border-radius: 20px
        font-family: $font-montserrat
        font-style: normal
        @include body-4-medium
        color: $color-white-1

  .content-header
    &-title
      @media (max-width: 576px)
        @include body-5
    span
      @media (max-width: 576px)
        @include body-5
    @media (max-width: 576px)
      margin-bottom: 0
  .listing-type
    margin-right: 100px
    margin-bottom: 36px
    background: transparent
    &-title
      font-family: $font-family-sf-pro-text
      &.selling
        color: $color-orange-11
      &.auction
        color: $color-blue-19
      &.trade
        color: $color-blue-20
    &-desc
      font-family: $font-family-sf-pro-text
      font-weight: $normal
    &-img
      width: 100%
      height: 0
      padding-top: 100%
      img
        top: 0
        left: 0
        width: 100%
        height: 100%
    @media (max-width: 576px)
      margin-right: 15px
      align-items: flex-end
      &-img
        width: 140px
        padding-top: 140px
        margin-right: 15px
      &-content
        flex: 1
      &-title
        font-size: 15px
        line-height: 18px
        margin-bottom: 8px
        &.selling
          color: $black
        &.auction
          color: $black
        &.trade
          color: $black
      &-desc
        font-size: 12px
        line-height: 15px
      .arrow-icon
        width: 44px
    @media (min-width: 577px)
      .arrow-icon
        display: none
</style>
