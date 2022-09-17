<template>
  <b-container fluid class="create-listing-page h-100 px-5">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">
        {{
          `${$t('create_listing.index.select')} auction ${$t(
            'create_listing.index.type'
          )}`
        }}
      </h2>
    </div>
    <div class="mt-4 d-flex listing-types">
      <ListingType
        :title="$t('create_listing.index.auction_single')"
        :description="$t('create_listing.index.auction_single_desc')"
        :image="Single"
        :title-class="'selling'"
        class="mr-3"
        @click="selectAuctionType('single')"
      />
      <ListingType
        :title="$t('create_listing.index.auction_collection')"
        :description="$t('create_listing.index.auction_collection_desc')"
        :image="Collection"
        :title-class="'trade'"
        class="mr-3"
        @click="selectAuctionType('collection')"
      />
    </div>
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import ListingType from '~/components/createListing/ListingType';
import Single from '~/assets/img/icons/single-auction.svg'
import Collection from '~/assets/img/icons/collection-auction.svg'
export default {
  name: 'SelectProductType',
  components: {ListingType},
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      Single,
      Collection,
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
</style>
