<template>
  <div class="create-listing-page h-100">
    <div class="wrapper">
      <section class="content p-3 p-md-4">
        <div class="content-header">
          <div class="content-head d-flex align-items-center justify-content-between m-auto">
            <!-- Heading -->
            <span class="content-header-title">
              {{ $t('create_listing.index.title') }}
            </span>
            <!-- ./Heading -->
            <!-- Drafts -->
            <span
              class="text-bold text-decoration-underline"
              role="button"
              @click="showDraft"
              >{{ $t('common.drafts') }} &#040;{{
                (draftListingItem.length + getTradeDraftCount) || 0
              }}&#041;
            </span>
            <!-- ./Drafts -->
          </div>
        </div>

        <div class="content-main">
          <div class="d-flex flex-column flex-md-row justify-content-between listing-types">
            <!-- Selling -->
            <div class="d-flex flex-row flex-md-column listing-type" @click="routeTo('selling')">
              <div class="position-relative listing-type-img">
                <img src="~/assets/img/create-listing/selling1.png" class="position-absolute" />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title selling">
                  {{ $t('create_listing.index.selling') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.selling_desc') }}
                </div>
                <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
                  <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
                </div>
              </div>
            </div>
            <!-- ./Selling -->
            <!-- Auction -->
            <div class="d-flex flex-row flex-md-column listing-type" @click="routeTo('auction')">
              <div class="position-relative listing-type-img">
                <img src="~/assets/img/create-listing/auctions1.png" class="position-absolute" />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title auction">
                  {{ $t('create_listing.index.auction') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.auction_desc') }}
                </div>
                <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
                  <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
                </div>
              </div>
            </div>
            <!-- ./Auction -->
            <!-- Trade -->
            <div class="d-flex flex-row flex-md-column listing-type" @click="routeTo('trade')">
              <div class="position-relative listing-type-img">
                <img src="~/assets/img/create-listing/trade1.png" class="position-absolute" />
              </div>
              <div class="listing-type-content">
                <div class="mt-0 mt-md-4 listing-type-title trade">
                  {{ $t('create_listing.index.trade') }}
                </div>
                <div class="listing-type-desc">
                  {{ $t('create_listing.index.trade_desc') }}
                </div>
                <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
                  <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
                </div>
              </div>
            </div>
            <!-- ./Trade -->
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { LISTING_TYPES } from '~/static/constants/create-listing'

export default {
  name: 'CreateListingPage',

  layout: 'Profile',

  middleware: ['auth', 'vendor'],

  computed: {
    ...mapGetters({
      draftListingItem: 'listingItems/listingSavedAsDraft',
    }),
    ...mapGetters('trades',['getTradeDraftCount']),
  },

  methods: {
    // Show the drafts page
    showDraft() {
      this.$router.push({ path: '/profile/create-listing/drafts' })
    },

    routeTo(type) {
      // If not a vendor
      if (!this.$store.state.auth.user.roles_name.includes('Vendor')) {
        this.$toasted.error(this.$t('createlisting.user_not_valid'))
      } else if (type === LISTING_TYPES.SELLING) { // If the type is selling
          this.$router.push({
            path: '/profile/create-listing/selling',
          })
      } else if(type === LISTING_TYPES.TRADE) { // If the type is trade
          this.$store.commit('trades/removeAllWantItems')
          this.$store.commit('trades/clearTradeItems')
          this.$store.commit('trades/setTradeForEditing',null)
          this.$router.push('/profile/create-listing/trades/create')
      } else if (type === LISTING_TYPES.AUCTION) { // If the type is auction
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
    background: transparent
    &:last-child
      margin-right: 0
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
      
</style>
