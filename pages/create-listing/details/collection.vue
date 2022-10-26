<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex flex-column flex-md-row h-100">
      <!-- Collection Auction Details -->
      <b-container class="d-none d-md-block pl-4 ml-2 pr-3 py-5">
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
      <!-- Mobile auction items -->
      <div v-for="(item, index) in selectedAuctionItems" :key="index" class="auction-item d-md-none">
        <div class="auction-item-title">{{$t('create_listing.confirm.auction_number')}}{{index+1}}</div>
        <div class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
          <div class="position-relative d-flex flex-column justify-content-between">
            <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
              <template #button-content >
                <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
              </template>
              <b-dropdown-item @click="deleteSingleItem(item, index)">{{ $t('common.delete') }}</b-dropdown-item>
            </b-dropdown>
            <div class="detail-section d-flex flex-grow-1">
              <b-row>
                <b-col sm="3" md="2">
                  <Thumb :product="item.item.product" />
                </b-col>
                <b-col sm="9" md="10" class="pl-2 pr-4">
                  <b-row class="mb-2 d-block">
                    <div class="body-4-bold mb-2 product-name">{{ item.item.product.name }}</div>
                    <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                      {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.item.product.sku }}
                    </div>
                    <div class="body-4-normal mb-2 text-gray-6 product-color">
                      {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.item.product.colorway }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.item.size.size }}
                    </div>
                    <div class="body-4-normal mb-2 text-gray-6 product-condition">
                      {{ $t('products.box_condition') }}&colon;&nbsp;{{item.item.packaging_condition.name}}
                    </div>
                  </b-row>
                </b-col>
              </b-row>
            </div>
            <div class="px-3 d-flex align-items-center">
              <div class="label">{{ $t('vendor_purchase.quantity') }}:</div>
              <div class="value ml-2">{{ item.quantity }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-md-none mt-4 collection-details-info">
        <div class="d-flex justify-content-between">
          <span class="collection-details-info-label">{{ $t('common.name') }}</span>
          <span class="collection-details-info-value">{{ selectedAuction.name }}</span>
        </div>
        <div class="d-flex justify-content-between gray">
          <span class="collection-details-info-label">{{ $t('create_listing.confirm.duration') }}</span>
          <span class="collection-details-info-value">{{ selectedAuction.time_limit }} {{ $t('create_listing.details.days') }}</span>
        </div>
        <div class="d-flex justify-content-between">
          <span class="collection-details-info-label">{{ $t('create_listing.confirm.reserve') }}</span>
          <span class="collection-details-info-value">{{ selectedAuction.is_reserved ? '$' + selectedAuction.reserve_price : $t('create_listing.confirm.no_reserve') }}</span>
        </div>
        <div class="d-flex justify-content-between gray">
          <span class="collection-details-info-label">{{ $t('create_listing.details.table_columns.starting_bid') }}</span>
          <span class="collection-details-info-value">${{ selectedAuction.start_bid_price }}</span>
        </div>
      </div>
      <!-- Order summary -->
      <ShoppingCartOrder class="bg-white order-summary" />
    </div>

    <Modal
      id="delete-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-0 py-0">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.delete_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              pill
              @click="deleteSingeItemModalOk"
            >
              {{ $t('create_listing.confirm.delete') }}
            </Button>
            <Button
              variant="outline-dark"
              pill
              @click="$bvModal.hide('delete-auction-item-modal')"
            >
              {{ $t('create_listing.confirm.cancel') }}
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>

    <Modal
      id="deleted-auction-item-modal"
      centered
      no-header-border
      no-footer-border
      hide-footer
    >
      <template  #default>
        <div class="px-5">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.deleted_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              iconOnly
              variant="primary"
              pill
            >
              <img :src="DeleteSvg"/>
            </Button>
          </b-row>
        </div>

      </template>
    </Modal>
    <vue-bottom-sheet
      ref="deleteItemBottomSheet"
      max-width="auto"
      max-height="100vh"
      :rounded="true"
    >
      <div class="d-flex flex-column h-100 filters-sheet">
        <div class="filters-sheet-title text-center">{{ $t('auctions.frontpage.filterbar.filter_by') }}</div>
        <div class="flex-shrink-1 overflow-auto filters-sheet-content">
          <b-row class="mb-4">
            <b-col md="12" >
              {{ $t('create_listing.confirm.delete_text') }}
            </b-col>
          </b-row>
          <b-row class="d-flex justify-content-around">
            <Button
              variant="primary"
              pill
              @click="deleteSingeItemModalOk"
            >
              {{ $t('create_listing.confirm.delete') }}
            </Button>
            <Button
              variant="outline-dark"
              pill
              @click="$bvModal.hide('delete-auction-item-modal')"
            >
              {{ $t('create_listing.confirm.cancel') }}
            </Button>
          </b-row>
        </div>
      </div>
    </vue-bottom-sheet>
  </b-container>
</template>

<script>
import _ from 'lodash';
import {mapGetters} from 'vuex';
import AuctionItemHorizontal from '~/components/createListing/AuctionItemHorizontal';
import AuctionDetailsCard from '~/components/createListing/AuctionDetailsCard';
import ShoppingCartOrder from '~/components/checkout/auction/ShoppingCartOrder';
import infoIcon from '~/assets/img/icons/info-blue.svg';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import { Modal, Button } from '~/components/common'
import Thumb from '~/components/product/Thumb'

export default {
  name: 'CreateListingDetails',
  components: {
    ShoppingCartOrder,
    AuctionItemHorizontal,
    AuctionDetailsCard,
    Modal,
    Thumb,
    Button,
  },
  layout: 'Profile',
  data(){
    return {
      infoIcon,
      DeleteSvg,
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
      deletableItem: {
        item: null,
        index: -1
      },
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
  methods: {
    deleteSingeItemModalOk(){
      this.$bvModal.hide('delete-auction-item-modal')
      this.$bvModal.show('deleted-auction-item-modal')
      this.$store.commit('create-listing/setAuctionItems', this.auctionItems.filter((a, ind) => ind !==this.deletableItem.index))
    },
    deleteSingleItem(item,index){
      this.deletableItem = {
        index,
        item
      }
      this.$bvModal.show('delete-auction-item-modal')
    },
  }
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

  @media (max-width: 576px)
    padding: 0 16px
    background: transparent

    .order-summary::v-deep
      min-width: 0
      width: 100%
      .custom-card .card-body
        padding: 12px
      .heading-1-medium
        @include body-4
      .body-4-medium
        @include body-9
      
    .auction-item
      padding-top: 20px
      &-title
        @include body-5
        font-weight: $medium
        color: $black
        margin-bottom: 12px
      .item
        box-shadow: 0px 1px 4px rgba($black, 0.25)
        border-radius: 10px
        padding-bottom: 10px
        .more-btn
          top: 0
          right: 0
          z-index: 10
          .btn-link
            padding: 0
        .detail-section
          padding: 12px
          .col-sm-3
            flex: 3
          .col-sm-9
            flex: 9
            padding-right: 1em
            .product
              &-name
                @include body-5
                font-weight: $medium
              &-sku,
              &-size,
              &-color,
              &-condition
                @include body-21
                font-weight: $regular
                color: $color-gray-6
        .background-gray
          background: $color-white-5
        .label
          @include body-9
          font-weight: $medium
          color: $black
        .value
          @include body-9
          font-weight: $normal
          color: $color-gray-6
          text-transform: capitalize
    .collection-details-info
      box-shadow: 0px 1px 4px rgba($black, 0.25)
      border-radius: 10px
      padding: 12px 0
      & > div
        padding: 4px 12px
      .gray
        background: $color-white-5
      &-label
        @include body-9
        font-weight: $medium
        color: $black
      &-value
        @include body-9
        font-weight: $normal
        color: $color-gray-6
        text-transform: capitalize
</style>
