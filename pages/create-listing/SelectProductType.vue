<template>
  <b-container fluid class="create-listing-page h-100 p-3 p-md-4">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">
        {{
          `${$t('create_listing.index.select')} ${$t('common.auction')} ${$t(
            'create_listing.index.type'
          )}`
        }}
      </h2>
    </div>
    <div class="py-3 m-0 py-md-5 d-flex flex-column flex-md-row justify-content-around listing-types">
      <div class="d-flex flex-row flex-md-column mx-auto listing-type" @click="selectAuctionType('single')">
        <div class="position-relative listing-type-img">
          <img src="~/assets/img/create-listing/auction-single-type.png" class="position-absolute" />
        </div>
        <div class="listing-type-content">
          <div class="mt-0 mt-md-4 listing-type-title single">
            {{ $t('create_listing.index.auction_single') }}
          </div>
          <div class="listing-type-desc">
            {{ $t('create_listing.index.auction_single_desc') }}
          </div>
          <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
            <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
          </div>
        </div>
      </div>
      <div class="d-flex flex-row flex-md-column mx-auto listing-type" @click="selectAuctionType('collection')">
        <div class="position-relative listing-type-img">
          <img src="~/assets/img/create-listing/auctionhousedoubled 2.png" class="position-absolute" />
        </div>
        <div class="listing-type-content">
          <div class="mt-0 mt-md-4 listing-type-title collection">
            {{ $t('create_listing.index.auction_collection') }}
          </div>
          <div class="listing-type-desc">
            {{ $t('create_listing.index.auction_collection_desc') }}
          </div>
          <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
            <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
          </div>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SelectProductType',
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      listingType: null,
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    ...mapActions({
      setAuctionType: 'create-listing/setAuctionTypeAction',
      setCollectionState: 'create-listing/setCollectionStateAction',
      setSelectedInventoryProducts: 'create-listing/setSelectedInventoryProductsAction',
      setAuctionItems: 'create-listing/setAuctionItemsAction',
      setActiveInventoryProduct: 'create-listing/setActiveInventoryProductAction',
      setEditProductInventory: 'create-listing/setEditProductInventoryAction',
      setNonInventoryAuctionItems: 'create-listing/setNonInventoryAuctionItemsAction',
      setNonInventoryCollectionAuction: 'create-listing/setNonInventoryCollectionAuctionAction',
    }),
    // Select type of new auction
    selectAuctionType(type) {
      this.setAuctionType(type)
      this.setCollectionState('add')
      this.setSelectedInventoryProducts([])
      this.setAuctionItems([])
      this.setActiveInventoryProduct({})
      this.setEditProductInventory({})
      this.setNonInventoryAuctionItems([])
      this.setNonInventoryCollectionAuction({})
      this.$router.push('/create-listing/search/inventory')
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.scale-up
  transform: scale(1.6)
.create-listing-page
  padding: 47px 54px
  background-color: $color-white-5
  h2.title
    @include heading-3
    color: $color-black-1
  @media (max-width: 576px)
    h2.title
      font-size: 14px
      line-height: 17px
  .listing-type
    border: none
    margin-right: 100px
    margin-bottom: 36px
    padding: 0
    max-width: 460px
    background: transparent
    &:last-child
      margin-right: 0
    &-title
      font-family: $font-family-sf-pro-text
      &.single
        color: $color-orange-4
      &.collection
        color: $color-blue-1
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
        width: 190px
        padding-top: 190px
        margin-right: 15px
      &-content
        flex: 1
      &-title
        font-size: 15px
        line-height: 18px
        margin-bottom: 8px
        &.single
          color: $black
        &.collection
          color: $black
      &-desc
        font-size: 12px
        line-height: 15px
      .arrow-icon
        width: 44px
</style>
