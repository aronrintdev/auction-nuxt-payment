<template>
  <b-container fluid class="create-listing-page h-100">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title mb-0">
        {{
          `${$t('create_listing.index.select')} ${$t('common.auction')} ${$t(
            'create_listing.index.type'
          )}`
        }}
      </h2>
    </div>
    <div class="d-flex flex-column flex-md-row justify-content-between listing-types">
      <div class="d-flex flex-row flex-md-column listing-type" @click="selectAuctionType('single')">
        <div class="position-relative listing-type-img">
          <img src="~/assets/img/create-listing/auction-single-type.png" class="position-absolute" />
        </div>
        <div class="listing-type-content">
          <div class="d-none d-md-block listing-type-title single">
            {{ $t('create_listing.index.auction_single') }}
          </div>
          <div class="d-md-none listing-type-title single">
            {{ $tc('common.single_item', 1) }}
          </div>
          <div class="listing-type-desc">
            {{ $t('create_listing.index.auction_single_desc') }}
          </div>
          <div class="d-block d-md-none mt-1 ml-auto arrow-icon">
            <img class="w-100" src="~/assets/img/icons/arrow-right-in-circle.svg" />
          </div>
        </div>
      </div>
      <div class="d-flex flex-row flex-md-column listing-type" @click="selectAuctionType('collection')">
        <div class="position-relative listing-type-img">
          <img src="~/assets/img/create-listing/auctionhousedoubled-2.png" class="position-absolute" />
        </div>
        <div class="listing-type-content">
          <div class="d-none d-md-block listing-type-title collection">
            {{ $t('create_listing.index.auction_collection') }}
          </div>
          <div class="d-md-none listing-type-title collection">
            {{ $tc('common.collection', 1) }}
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
@import '~/assets/css/_typography'
.scale-up
  transform: scale(1.6)
.create-listing-page
  padding: 36px 22px
  background-color: $color-white-5
  h2.title
    font-weight: $bold
    font-family: $font-sp-pro
    @include body-1
    color: $black
  @media (max-width: 576px)
    padding: 48px 16px
    background-color: $white
    h2.title
      @include body-5
      font-family: $font-montserrat
  .listing-types
    padding: 76px 56px
    margin: 0
    @media (max-width: 576px)
      padding: 30px 0
  .listing-type
    border: none
    margin-left: 0
    margin-right: 108px
    margin-bottom: 36px
    height: auto
    max-width: unset
    padding: 0
    flex: 1
    background: transparent
    &:last-child
      margin-right: 0
    &-title
      font-family: $font-family-sf-pro-text
      font-weight: $bold
      @include body-2
      letter-spacing: -0.02em
      margin: 31px 0 9px
      &.single
        color: $color-orange-4
      &.collection
        color: $color-blue-1
    &-desc
      font-family: $font-family-sf-pro-text
      font-weight: $regular
      margin-right: 50px
    &-img
      width: 100%
      height: 0
      padding-top: 77.65%
      img
        top: 0
        left: 0
        width: 100%
        height: 100%
        object-fit: cover
    @media (max-width: 576px)
      margin-right: 0
      margin-bottom: 30px
      align-items: flex-end
      &-img
        width: 195px
        padding-top: 195px
        margin-right: 16px
      &-content
        flex: 1
        display: flex
        flex-direction: column
        height: 195px
      &-title
        @include body-8
        font-weight: $medium
        margin: 0
        padding: 16px 0 30px
        font-family: $font-montserrat
        &.single
          color: $black
        &.collection
          color: $black
      &-desc
        @include body-9
        font-weight: $regular
        font-family: $font-montserrat
        flex: 1
        margin-right: 0
      .arrow-icon
        width: 44px
</style>
