<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex h-100">
      <!-- Collection Auction Details -->
      <b-container class="pl-4 ml-2 pr-3 py-5">
        <b-row>
          <b-col md="12"><div class="heading-1-bold mb-5">{{ $t('create_listing.product.confirm_collection_title') }}</div></b-col>
        </b-row>
        <b-row class="mt-3 px-5">
          <b-col cols="12" sm="12" md="10">
            <span class="body-4-bold">{{$t('create_listing.collection.details')}}</span>
          </b-col>
          <b-col cols="12" sm="12" md="2" class="text-center">
            <span class="body-4-bold">{{$t('create_listing.collection.quantity')}}</span>
          </b-col>
        </b-row>

        <div class=" d-flex  align-items-center overflow-hidden justify-content-between">
          <div class="w-100 h-100 overflow-auto auction-items">
            <b-row v-for="item in selectedAuctionItems" :key="item.id"  class="w-100 p-2" >
              <AuctionItemHorizontal :item="item" showQuantityText editDisabled />
            </b-row>
          </div>
        </div>
        <div class="mt-4 w-100 h-25" >
          <AuctionDetailsCard :item="selectedAuction" editDisabled />
        </div>
      </b-container>
      <!-- Order summary -->
      <ShoppingCartOrder class="bg-white order-summary" />
    </div>
  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import AuctionDetailsCard from '~/components/createListing/AuctionDetailsCard';
import ShoppingCartOrder from '~/components/checkout/auction/ShoppingCartOrder';
import infoIcon from '~/assets/img/icons/info-blue.svg';

export default {
  name: 'CreateListingDetails',
  components: {
    ShoppingCartOrder,
    AuctionItemHorizontal,
    AuctionDetailsCard,
  },
  layout: 'Profile',
  data(){
    return {
      infoIcon,
      uploading: false,
      tableColumns: [
        {
          key: 'details',
          label: this.$t('create_listing.details.table_columns.details'),
          class: 'text-left details',
        },
        {
          key: 'duration',
          label: this.$t('create_listing.details.table_columns.duration'),
          class: 'text-center',
        },
        {
          key: 'reserve',
          label: this.$t('create_listing.details.table_columns.reserve'),
          class: 'text-center',
        },
        {
          key: 'starting_bid',
          label: this.$t('create_listing.details.table_columns.starting_bid'),
          class: 'text-center',
        },
        {
          key: 'status',
          label: this.$t('create_listing.details.table_columns.status'),
          class: 'text-center',
        },
        {
          key: 'reserve_notice',
          label: '',
          class: 'reserve-notice-cell',
        }
      ],
    }
  },
  computed:{
    ...mapGetters({
      auctionItems: 'create-listing/getAuctionItems',
      getCollectionState: 'create-listing/getCollectionState',
    }),
    selectedAuction(){
      return _.cloneDeep(this.auctionItems[0])
    },
    selectedAuctionItems(){
      return this.selectedAuction ? this.selectedAuction.items : []
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.w-90
  width: 90%

.auction-items
  height: 75vh
  overflow: auto

.container-auction-details
  padding: 0
  background-color: $color-white-5

  h2.title
    @include heading-3
    color: $color-black-1
</style>
