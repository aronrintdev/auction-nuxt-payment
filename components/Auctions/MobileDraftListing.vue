<template>
  <div class="drafts-listing">
    <div v-for="(item, index) in data" :key="index" class="auction-item d-md-none">
      <div v-if="item.type === AUCTION_TYPE_SINGLE" class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
        <div class="position-relative d-flex flex-column justify-content-between">
          <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
            <template #button-content >
              <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
            </template>
            <b-dropdown-item @click="deleteItem(item.id)">{{ $t('common.delete') }}</b-dropdown-item>
          </b-dropdown>
          <div class="detail-section d-flex flex-grow-1">
            <b-row>
              <b-col sm="3" md="2">
                <ProductThumb :product="item.auction_items[0].inventory.product" />
              </b-col>
              <b-col sm="9" md="10" class="pl-2 pr-4">
                <b-row class="mb-2 d-block">
                  <div class="body-4-bold mb-2 product-name">{{ item.auction_items[0].inventory.product.name }}</div>
                  <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.auction_items[0].inventory.product.sku }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-color">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.auction_items[0].inventory.color }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.auction_items[0].inventory.size.size }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-condition">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{item.auction_items[0].inventory.packaging_condition.name}}
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
            <div v-if="item.time_limit" class="value">{{ item.time_limit }} {{ $tc('common.day', item.time_limit) }}</div>
            <div v-else>-</div>
          </div>
          <div class="d-flex align-items-center justify-content-between px-3 py-2">
            <div class="label">{{ $t('create_listing.details.table_columns.reserve') }}:</div>
            <div class="value">{{ item.is_reserved ? `$${item.reserve_price / 100}` :  $t('create_listing.confirm.no_reserve') }}</div>
          </div>
          <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
            <div class="label">{{ $t('create_listing.details.table_columns.starting_bid') }}:</div>
            <div class="value">${{ item.start_bid_price | formatPrice }}</div>
          </div>
        </div>
      </div>
      <div v-else class="item d-flex flex-column bg-white h-md-100 w-100 rounded-md">
        <div class="position-relative d-flex flex-column justify-content-between">
          <b-dropdown id="dropdown-right" right variant="link" no-caret class="d-md-none position-absolute more-btn">
            <template #button-content >
              <img src="~/assets/img/icons/vertical-three-dots-icon.svg" />
            </template>
            <b-dropdown-item @click="deleteItem(item.id)">{{ $t('common.delete') }}</b-dropdown-item>
          </b-dropdown>
          <div class="text-center pt-3 text-capitalize body-4-bold">
            <img class="collection-image mr-2" :src="require('~/assets/img/icons/draft-list-image.svg')" />
            <span>{{ item.name }} ({{item.auction_items.length}})</span>
          </div>
          <div class="detail-section d-flex flex-grow-1">
            <b-row>
              <b-col sm="3" md="2">
                <ProductThumb :product="item.auction_items[0].inventory.product" />
              </b-col>
              <b-col sm="9" md="10" class="pl-2 pr-4">
                <b-row class="mb-2 d-block">
                  <div class="body-4-bold mb-2 product-name">{{ item.auction_items[0].inventory.product.name }}</div>
                  <div class="body-4-normal mb-2 text-gray-6 text-uppercase product-sku">
                    {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.auction_items[0].inventory.product.sku }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-color">
                    {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.auction_items[0].inventory.color }}, {{ $t('shopping_cart.size') }}&colon;&nbsp;{{item.auction_items[0].inventory.size.size }}
                  </div>
                  <div class="body-4-normal mb-2 text-gray-6 product-condition">
                    {{ $t('products.box_condition') }}&colon;&nbsp;{{item.auction_items[0].inventory.packaging_condition.name}}
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
            <div v-if="item.time_limit" class="value">{{ item.time_limit }} {{ $tc('common.day', item.time_limit) }}</div>
            <div v-else>-</div>
          </div>
          <div class="d-flex align-items-center justify-content-between px-3 py-2">
            <div class="label">{{ $t('create_listing.details.table_columns.reserve') }}:</div>
            <div class="value">{{ item.is_reserved ? `$${item.reserve_price / 100}` :  $t('create_listing.confirm.no_reserve') }}</div>
          </div>
          <div class="d-flex align-items-center justify-content-between px-3 background-gray py-2">
            <div class="label">{{ $t('create_listing.details.table_columns.starting_bid') }}:</div>
            <div class="value">${{ item.start_bid_price | formatPrice }}</div>
          </div>
        </div>
      </div>
    </div>
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
import { Pagination } from '~/components/common'
import { AUCTION_TYPE_SINGLE, COMBINATIONS_PER_PAGE_ITEMS } from '~/static/constants'

// Auction Mobile Draft Listing
export default {
  name: 'AuctionsMobileDraftListing',
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
      loading: true,
      totalRows: null,
      currentPage: 1,
      perPage: 2,
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

  .auction-item
    padding-top: 20px
    &-title
      font-weight: $medium
      font-size: 14px
      line-height: 17px
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
              font-size: 14px
              font-weight: $medium
            &-sku,
            &-size,
            &-color,
            &-condition
              font-weight: $regular
              font-size: 13px
              line-height: 16px
              color: $color-gray-6
      .background-gray
        background: $color-white-5
      .label
        font-weight: $medium
        font-size: 12px
        line-height: 15px
        color: $black
      .value
        font-weight: $normal
        font-size: 12px
        line-height: 15px
        color: $color-gray-6
        text-transform: capitalize
    .add-more-mobile-btn.btn
      width: 42px
      height: 42px
    .bottom-text
      font-weight: $normal
      font-size: 12px
      line-height: 140%
      background: $color-white-5
      padding: 6px 12px
    .mobile-btns
      font-weight: $medium
      font-size: 13px
      line-height: 16px
      &.save-as-draft
        background: $color-blue-20
        border-color: $color-blue-20

  .collection-image
    width: 20px
</style>
