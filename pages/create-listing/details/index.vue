<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex flex-column flex-md-row h-100">
      <!-- Auction List -->
      <div class="d-none d-md-block items-list pt-4 px-3 flex-grow-1">
        <div>
          <nuxt-link to="/create-listing/confirm" class="mb-3 btn-back d-flex align-items-center">
            <img
              :src="require('~/assets/img/icons/pagination-arrow-left.svg')"
              :alt="$t('common.back')"
              class="mr-2"
            />
            <span class="text-dark ml-n1">{{ $t('shopping_cart.back') }}</span>
          </nuxt-link>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <h2 class="title">{{ $t('create_listing.details.title') }}</h2>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <span class="title text-gray-25">{{ $t('create_listing.details.subtitle') }}</span>
        </div>
        <b-table
          class="mt-4 mb-5 auction-details-table"
          :items="auctionItems"
          :fields="tableColumns"
        >
          <template #head(reserve)>
            <div class="reserve-info">
              {{ $t('create_listing.details.reserve') }}
              <img :src="infoIcon" class="icon-info position-absolute mt-n2 mr-n5 scale-2" alt="Info icon" />
            </div>
          </template>
          <template #cell(details)="row">
            <div class="d-flex align-items-center text-left">
              <ProductThumb :product="row.item.item.product" />
              <div class="ml-4">
                <div class="product-name">{{ row.item.item.product.name }}</div>
                <div class="product-sku text-capitalize">
                  {{ $t('sell.confirm_listing.sku') }}: {{ row.item.item.product.sku }}
                </div>
                <div class="product-sku text-capitalize">
                  {{ $t('common.colorway') }}: {{ row.item.item.color ? row.item.item.color : row.item.item.product.colorway }}, {{ $t('common.size') }}: {{ row.item.item.size.size }}
                </div>
                <div class="product-sku text-capitalize">
                  {{ $t('common.box_condition') }}: {{ row.item.item.packaging_condition.name }}
                </div>
              </div>
            </div>
          </template>
          <template #cell(status)="row">
            <div v-if="row.item.status === 'scheduled'">
              <span>{{ $t(`create_listing.details.status.scheduled`) }}</span>&nbsp;<span class="schedule-date">{{ row.item.scheduled_date }}</span>
            </div>
            <div v-else>{{ $t(`create_listing.details.status.${row.item.status}`) }}</div>
          </template>
          <template #cell(starting_bid)="row">
            <span>{{ `$${row.item.start_bid_price}` }}</span>
          </template>
          <template #cell(reserve)="row">
            <div v-if="row.item.is_reserved">
              <span>{{ `$${row.item.reserve_price}` }}</span>
            </div>
            <div v-else>{{ $t('create_listing.details.no_reserve') }}</div>
          </template>
          <template #cell(duration)="row">
            {{
              `${row.item.time_limit} ${$t(
                'trades.create_listing.days'
              )}`
            }}
          </template>
          <template #cell(reserve_notice)="row">
            <div v-if="row.item.is_reserved" class="position-absolute d-flex align-items-start reserve-notice" >
              <img :src="infoIcon" class="icon-info scale-2" alt="Info icon" />
              {{$t('create_listing.details.reserve_fee_desc1')}}&nbsp;${{ calculateFee(row.item.reserve_price).toFixed(2) }}&nbsp;{{$t('create_listing.details.reserve_fee_desc2')}}
            </div>
          </template>
        </b-table>
        <div class="m-auto text-center w-75 body-4-normal">{{ $t('create_listing.details.transaction_fee_desc', [SELLER_FEE, TRANSACTION_FEE]) }}</div>
      </div>
      <!-- Mobile auction items -->
      <div v-for="(item, index) in auctionItems" :key="index" class="auction-item d-md-none">
        <div class="auction-item-title">{{$t('create_listing.confirm.auction_number')}}{{index+1}}</div>
        <div class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
          <div class="position-relative d-flex flex-column justify-content-between">
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
            <div class="d-flex align-items-center justify-content-between px-3 py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.status') }}:</div>
              <div class="value">{{ item.status }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.duration') }}:</div>
              <div class="value">{{ item.time_limit }} {{ $t('create_listing.details.days') }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.reserve') }}:</div>
              <div class="value">{{ item.is_reserved ? `$${item.reserve_price}` :  $t('create_listing.confirm.no_reserve') }}</div>
            </div>
            <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
              <div class="label">{{ $t('create_listing.details.table_columns.starting_bid') }}:</div>
              <div class="value">${{ item.start_bid_price }}</div>
            </div>
          </div>
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
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ShoppingCartOrder from '~/components/checkout/auction/ShoppingCartOrder'
import infoIcon from '~/assets/img/icons/info-blue.svg';
import { SELLER_FEE, TRANSACTION_FEE } from '~/static/constants';
import DeleteSvg from '~/assets/img/icons/delete-icon-white.png';
import { Modal, Button } from '~/components/common'
import Thumb from '~/components/product/Thumb';
import createListingAuction from '~/plugins/mixins/create-listing-auction';

export default {
  name: 'CreateListingDetails',
  components: {
    ShoppingCartOrder,
    Modal,
    Thumb,
    Button,
  },
  mixins: [createListingAuction],
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
      SELLER_FEE,
      TRANSACTION_FEE,
      deletableItem: {
        item: null,
        index: -1
      },
      DeleteSvg,
    }
  },
  computed:{
    ...mapGetters({
      auctionItems: 'create-listing/getAuctionItems',
    }),
  },
  methods: {
    ...mapActions({
      postAuction: 'create-listing/auctionPost',
    }),
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
    min-height: calc(100vh - 269px)

    .order-summary::v-deep
      min-width: 0
      width: 100%
      .custom-card .card-body
        padding: 12px
      .heading-1-medium
        @include body-13
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
.btn-back
  span
    line-height: 1em
</style>
