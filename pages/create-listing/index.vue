<template>
  <b-container fluid class="container-auction-search h-100 px-5">
    <div class="d-flex justify-content-between align-items-center">
      <h2 class="title">{{$t('create_listing.index.title')}}</h2>
    </div>
    <div class="mt-4">
      <div
        class="d-flex align-items-center listing-types"
      >
        <ListingType
          :title="$t('create_listing.index.selling')"
          :description="$t('create_listing.index.selling_desc')"
          :image="sellingImage"
          :title-class="'selling'"
          class="mr-3"
          @click="selectType('selling')"
        />

        <ListingType
          :title="$t('create_listing.index.auction')"
          :description="$t('create_listing.index.auction_desc')"
          :image="auctionImage"
          :title-class="'auction'"
          class="mr-3"
          @click="selectType('auction')"
        />

        <ListingType
          :title="$t('create_listing.index.trade')"
          :description="$t('create_listing.index.trade_desc')"
          :image="tradeImage"
          :title-class="'trade'"
          class="mr-3"
          @click="selectType('trade')"
        />
      </div>
    </div>
  </b-container>
</template>
<script>
import ListingType from '~/components/createListing/ListingType';
import sellingImage from '~/assets/img/icons/selling-outline.png'
import auctionImage from '~/assets/img/icons/auction-outline.svg'
import tradeImage from '~/assets/img/icons/trade-outline.svg'
export default {
  name: 'CreateListingPage',
  components: {ListingType},
  layout: 'Profile',
  middleware: ['vendor'],
  data() {
    return {
      sellingImage,
      auctionImage,
      tradeImage,
    }
  },
  methods: {
    // Select type of new listing
    selectType(type) {
      if (type === 'auction'){
        this.$router.push({path: '/create-listing/selectproducttype'})
      }
    }
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'

.container-auction-search
  padding: 47px 54px
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1
</style>
