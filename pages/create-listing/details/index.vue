<template>
  <b-container fluid class="container-auction-details h-100">
    <div class="d-flex h-100">
      <!-- Auction List -->
      <div class="items-list pt-4 px-3 flex-grow-1">
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
          <template #head(reserve)="">
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
              {{$t('create_listing.details.reserve_fee_desc1')}}&nbsp;${{ row.item.reserve_price * RESERVE_PRICE_FEE * 100 | formatPrice }}&nbsp;{{$t('create_listing.details.reserve_fee_desc2')}}
            </div>
          </template>
        </b-table>
        <div class="m-auto text-center w-75 body-4-normal">{{ $t('create_listing.details.transaction_fee_desc', [SELLER_FEE, TRANSACTION_FEE]) }}</div>
      </div>
      <!-- Order summary -->
      <ShoppingCartOrder class="bg-white order-summary" />
    </div>
  </b-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ShoppingCartOrder from '~/components/checkout/auction/ShoppingCartOrder'
import infoIcon from '~/assets/img/icons/info-blue.svg';
import { RESERVE_PRICE_FEE, SELLER_FEE, TRANSACTION_FEE } from '~/static/constants';

export default {
  name: 'CreateListingDetails',
  components: {
    ShoppingCartOrder,
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
      RESERVE_PRICE_FEE,
      SELLER_FEE,
      TRANSACTION_FEE,
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

.btn-back
  span
    line-height: 1em
</style>
