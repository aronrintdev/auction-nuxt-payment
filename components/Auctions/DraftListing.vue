<template>
  <div class="px-3 col-12 drafts-listing">
    <b-table
      :busy="loading"
      class="mt-3 drafts-table"
      :items="data"
      :fields="tableColumns"
    >
      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(details)="row">
        <div v-if="row.item.type === AUCTION_TYPE_SINGLE" class="d-flex align-items-center align-middle">
          <ProductThumb :product="row.item.auction_items[0].inventory.product" />
          <div class="ml-4">
            <div class="product-name">{{ row.item.auction_items[0].inventory.product.name }}</div>
            <div class="product-details">{{ $t('sell.inventory.sku') }}: {{ row.item.auction_items[0].inventory.product.sku }}</div>
            <div class="product-details">
              <span>{{ $t('common.colorway') }}: {{ row.item.auction_items[0].inventory.color ? row.item.auction_items[0].inventory.color : '-' }}</span>,&nbsp;
              <span class="product-details">{{ $tc('common.size', 1) }}: {{ row.item.auction_items[0].inventory.size ? row.item.auction_items[0].inventory.size.size : '-' }}</span>
            </div>
            <div class="product-details">{{ $t('products.box_condition') }}&colon;&nbsp;{{row.item.auction_items[0].inventory.packaging_condition.name}}</div>
          </div>
        </div>
        <div v-else class="d-flex align-items-center">
          <img class="collection-image" :src="require('~/assets/img/icons/draft-list-image.svg')" />
          <span class="text-capitalize product-name" role="button" @click="row.toggleDetails">
            <img class="arrow-image mr-3" :src="require('~/assets/img/icons/up-arrow-gray.svg')"  />
            <span>{{ row.item.name }} ( {{ row.item.auction_items.length }} {{ $t('common.items') }} )</span>
          </span>
        </div>
        
      </template>
      <template #cell(type)="row">
        <span class="text-capitalize align-middle">{{ row.item.type }}</span>
      </template>
      <template #cell(reserve)="row">
        <span v-if="row.item.is_reserved" class="text-capitalize align-middle">
          ${{ row.item.reserve_price | formatPrice }}
        </span>
        <span v-else class="reserve align-middle">-</span>
      </template>
      <template #cell(duration)="row">
        <span v-if="row.item.time_limit" class="text-capitalize">{{ row.item.time_limit }} {{ $tc('common.day', row.item.time_limit) }}</span>
        <span v-else>-</span>
      </template>
      <template #cell(status)="row">
        <div class="text-capitalize">{{ row.item.status }}</div>
        <div v-if="row.item.status === 'scheduled'">{{ row.item.scheduled_date | formatDate }}</div>
      </template>
      <template #cell(last_updated)="row">
        <span class="text-capitalize">{{ row.item.updated_at | formatDate }}</span>
      </template>
      <template #cell(actions)="row">
        <div class="d-flex align-items-center justify-content-center">
          <!-- <img src="~/assets/img/box-pencil.svg" class="mr-3" role="button" /> -->
          <img src="~/assets/img/box-delete.svg" role="button" @click="deleteItem(row.item)" />
        </div>
      </template>
      <template #row-details="row">
        <b-row class="items">
          <b-col
            v-for="(item, idx) in row.item.auction_items"
            :key="idx"
            md="6"
            class="d-flex align-items-center text-left item"
          >
            <ProductThumb :product="item.inventory.product" />
            <div class="ml-4">
              <div class="product-name">{{ item.inventory.product.name }}</div>
              <div class="product-details">{{ $t('sell.inventory.sku') }}: {{ item.inventory.product.sku }}</div>
              <div class="product-details">
                <span>{{ $t('common.colorway') }}: {{ item.inventory.color ? item.inventory.color : '-' }}</span>
                <span class="product-details">{{ $tc('common.size', 1) }}: {{ item.inventory.size ? item.inventory.size.size : '-' }}</span>
              </div>
              <div class="product-details">{{ $t('products.box_condition') }}&colon;&nbsp;{{item.inventory.packaging_condition.name}}</div>
            </div>
          </b-col>
        </b-row>
      </template>
    </b-table>
    <b-row class="col-md-12 my-4 justify-content-center" >
      <Pagination
        v-if="data.length > 0"
        :value="currentPage"
        :total="totalRows"
        :per-page="perPage"
        :per-page-options="COMBINATIONS_PER_PAGE_ITEMS"
        class="mt-2"
        @page-click="paginationChanged"
        @per-page-change="handlePerPageChange"
      />
    </b-row>
  </div>
</template>
<script>
import ProductThumb from '../product/Thumb.vue'
import { AUCTION_TYPE_SINGLE, COMBINATIONS_PER_PAGE_ITEMS } from '~/static/constants'
import { Pagination } from '~/components/common'

// Auction Draft Listing
export default {
  name: 'AuctionsDraftListing',
  components: {
    ProductThumb,
    Pagination,
  },
  props: {
    searchText: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      data: [],
      tableColumns: [
        {
          key: 'details',
          label: this.$t('auctions.list.table_columns.details'),
          class: 'text-left',
        },
        {
          key: 'type',
          label: this.$tc('common.type', 1),
          class: 'text-center',
        },
        {
          key: 'reserve',
          label: this.$t('create_listing.confirm.reserve'),
          class: 'text-center',
        },
        {
          key: 'duration',
          label: this.$t('auctions.bid_details.duration'),
          class: 'text-center',
        },
        {
          key: 'status',
          label: this.$t('create_listing.confirm.status'),
          class: 'text-center',
        },
        {
          key: 'last_updated',
          label: this.$t('createlisting.last_updated'),
          class: 'text-center',
        },
        {
          key: 'actions',
          label: this.$t('common.actions'),
          class: 'text-center',
        },
      ],
      loading: true,
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
      activeAuction: null,
      AUCTION_TYPE_SINGLE,
      COMBINATIONS_PER_PAGE_ITEMS,
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    // Pagination "Change" event listener
    paginationChanged(_, page) {
      this.currentPage = page
      this.loadPage()
    },
    handlePerPageChange(value) {
      this.perPage = value
      this.currentPage = 1
      this.loadPage()
    },
    // Get auctions list from API
    loadPage() {
      this.loading = true
      this.$axios
        .get('/auctions/draft', {
          params: {
            page: this.currentPage,
            take: this.perPage,
            search: this.searchText,
          },
        })
        .then((response) => {
          this.loading = false
          if (response.data) {
            this.totalRows = response.data.total
            this.data = response.data.data
          }
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(error.message)
        })
    },
    // Get bids history based on search keyword
    keywordChanged(value) {
      this.keyword = value
      this.loadPage()
    },
    // Show items list in collection auction
    showDetails(id) {
      this.activeAuction = id
    },
    // Delete a draft item
    deleteItem(item) {
      this.$axios
        .delete('/auctions', {
          data: {
            ids: [item.id],
          }
        })
        .then(() => {
          this.$toasted.success(this.$t('createlisting.draft.remove_success_message'))
          this.currentPage = 1
          this.loadPage()
        })
        .catch((error) => {
          this.$toasted.error(error.message)
        })
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.drafts-listing
  .drafts-table::v-deep
    tbody
      tr
        border-bottom: 11px solid $color-white-5
        &.b-table-has-details
          border-bottom-color: $white
          .arrow-image
            transform: rotate(180deg)
    th
      font-family: $font-sp-pro
      font-weight: $normal
      @include body-12
      color: $black
      border: none
    td
      @include body-13
      font-family: $font-sp-pro
      font-weight: $regular
      text-align: center
      color: $black
      border: none
      background: $white
      height: 120px
      vertical-align: middle
      .product-name
        font-family: $font-sf-pro-text
        font-weight: $bold
        @include body-5
        color: $black
      .product-details
        font-family: $font-sf-pro-text
        font-weight: $normal
        @include body-5
        color: $color-gray-6
      .thumb-wrapper
        width: 65px !important
      .collection-image
        width: 40px
        margin: 15px 35px 15px 15px
      .arrow-image
        width: 12px
        transform-origin: center
    .b-table-details
      .items
        max-width: 80%
        margin: auto
        .item
          margin: 16px 0

</style>
