<template>
  <div class="px-3 col-12 bids-history">
    <div class="d-flex">
      <div class="col-12 col-md-3"></div>
      <div class="col-12 col-md-6 text-center">
        <switch-tab-bar
          :tabs="switchData"
          :current="type"
          @change="typeChanged"
        ></switch-tab-bar>
      </div>
      <div class="col-12 col-md-3 text-right">
        <status-select-box
          :options="statuses"
          :value="selectedStatus"
          @change="changeStatus"
        ></status-select-box>
      </div>
    </div>

    <b-table
      :busy="loading"
      class="mt-3 auctions-table"
      :items="bids"
      :fields="type === 'single' ? tableColumns : tableColumnsForCollection"
    >
      <template #table-busy>
        <div class="text-center text-dark my-2">
          <b-spinner class="align-middle"></b-spinner>
        </div>
      </template>
      <template #cell(details)="row">
        <div
          v-if="row.item.details"
          class="d-flex align-items-center text-left"
        >
          <ProductThumb :product="row.item.details.inventory.product" />
          <div class="ml-4">
            <span class="product-name">{{ row.item.details.inventory.product.name }}</span>
            <br />
            <span class="product-sku"
              >{{ $t('sell.inventory.sku') }}: {{ row.item.details.inventory.product.sku }}</span
            >
            <br />
            <span class="item-number">{{ `#${row.item.id}` }}</span>
          </div>
        </div>
      </template>
      <template #cell(collection_number)="row">
        <div
          v-if="row.item.details"
          class="d-flex align-items-center text-left"
        >
          <ProductThumb :product="row.item.details.inventory.product" />
          <div class="ml-4">
            <span class="product-name">{{ row.item.details.inventory.product.name }}</span>
            <img
              :src="require('~/assets/img/icons/down-arrow.svg')"
              class="icon-down-arrow"
              :class="{ open: row.item.showDetails }"
              @click="showItemDetails(row.index)"
            />
            <br />
            <span class="product-sku"
              >{{ $t('sell.inventory.sku') }}: {{ row.item.details.inventory.product.sku }}</span
            >
            <br />
            <span class="item-number">{{ `#${row.item.id}` }}</span>
          </div>
        </div>
        <div
          v-for="(item, idx) in row.item.auction_items"
          :key="idx"
          class="d-flex align-items-center text-left"
        >
          <template v-if="row.item.showDetails && idx > 0">
            <ProductThumb :product="item.inventory.product" />
            <div class="ml-4">
              <span class="product-name">{{ item.inventory.product.name }}</span>
              <br />
              <span class="product-sku"
                >{{ $t('sell.inventory.sku') }}: {{ item.inventory.product.sku }}</span
              >
              <br />
              <span class="item-number">{{ `#${row.item.id}` }}</span>
            </div>
          </template>
        </div>
      </template>
      <template #cell(size)="row">
        <span class="cell-wrapper size"
          >{{ $t('auctions.list.table_columns.size') }}:&nbsp;{{
            row.item.details.inventory.size.size
          }}</span
        >
      </template>
      <template #cell(items_in_collection)="row">
        <span class="cell-wrapper size">{{
          row.item.auction_items.length
        }}</span>
      </template>
      <template #cell(color)="row">
        <span class="cell-wrapper color">{{ row.item.details.inventory.color }}</span>
      </template>
      <template #cell(time_remaining)="row">
        <span class="cell-wrapper time_remaining">{{
          row.item | remainingTime
        }}</span>
      </template>
      <template #cell(number_of_bids)="row">
        <span class="cell-wrapper quantity">{{ row.item.bids.length }}</span>
      </template>
      <template #cell(my_bid)="row">
        <div class="cell-wrapper my-bid">
          <div v-if="row.item.is_highest" class="my-bid-alert">
            {{ $t('auctions.bidding_history.your_highest_bid_alert') }}
          </div>
          <div v-else class="my-bid-alert danger">
            {{ $t('auctions.bidding_history.your_outbid_alert') }}
          </div>
          <div class="mt-1">
            <input
              v-model="row.item.my_bid"
              class="my-bid-price text-center"
              @focus="removePriceFormat(row.index)"
              @blur="formatPrice(row.index)"
            />
          </div>
          <div class="mt-1">
            <button
              class="btn btn-sm btn-outline-dark my-bid-update-btn"
              @click="updateBid(row.index)"
            >
              {{ $t('auctions.bidding_history.update_bid') }}
            </button>
          </div>
        </div>
      </template>
    </b-table>
    <b-pagination
      v-if="totalRows"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      class="auctions-pagination"
      @change="paginationChanged"
    ></b-pagination>
  </div>
</template>
<script>
import ProductThumb from '../product/Thumb.vue'
import SwitchTabBar from '../SwitchTabBar.vue'
import StatusSelectBox from './StatusSelectBox.vue'

// Auction Bids View
export default {
  name: 'AuctionBids',
  components: {
    SwitchTabBar,
    StatusSelectBox,
    ProductThumb,
  },
  props: {
    status: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      bids: [],
      type: 'single',
      switchData: [
        {
          id: 'single',
          label: this.$t('auctions.list.single_item'),
        },
        {
          id: 'collection',
          label: this.$t('auctions.list.collection'),
        },
      ],
      tableColumns: [
        {
          key: 'details',
          label: this.$t('auctions.list.table_columns.details'),
          class: 'text-left',
        },
        {
          key: 'size',
          label: this.$t('auctions.list.table_columns.size'),
        },
        {
          key: 'color',
          label: this.$t('auctions.list.table_columns.colorway'),
        },
        {
          key: 'time_remaining',
          label: this.$t('auctions.list.table_columns.time_remaining'),
        },
        {
          key: 'number_of_bids',
          label: this.$t('auctions.list.table_columns.number_of_bids'),
        },
        {
          key: 'my_bid',
          label: this.$t('auctions.bidding_history.table_columns.my_bid'),
        },
      ],
      tableColumnsForCollection: [
        {
          key: 'collection_number',
          label: this.$t('auctions.list.table_columns.collection_number'),
          class: 'text-left',
        },
        {
          key: 'items_in_collection',
          label: this.$t('auctions.list.table_columns.items_in_collection'),
        },
        {
          key: 'time_remaining',
          label: this.$t('auctions.list.table_columns.time_remaining'),
        },
        {
          key: 'number_of_bids',
          label: this.$t('auctions.list.table_columns.number_of_bids'),
        },
        {
          key: 'my_bid',
          label: this.$t('auctions.bidding_history.table_columns.my_bid'),
        },
      ],
      loading: true,
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
      keyword: null,
      statuses: [
        {
          id: 'active_bids',
          label: this.$t('auctions.bidding_history.active_bids'),
        },
        {
          id: 'past_bids',
          label: this.$t('auctions.bidding_history.past_bids'),
        },
        {
          id: 'ending_soon',
          label: this.$t('auctions.bidding_history.ending_soon'),
        },
      ],
      selectedStatus: {
        label: this.$t('auctions.bidding_history.statuses'),
      },
    }
  },
  mounted() {
    this.loadPage()
  },
  methods: {
    // Set current type
    typeChanged(active) {
      this.type = active
      this.loadPage()
    },
    // Pagination "Change" event listener
    paginationChanged(page) {
      this.currentPage = page
      this.loadPage()
    },
    // Get auctions list from API
    loadPage() {
      this.loading = true
      this.$axios
        .get('/auctions/bids', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            search: this.keyword,
          },
        })
        .then((response) => {
          this.loading = false
          if (response.data) {
            this.totalRows = response.data.total
            if (this.totalRows > 0) {
              const auctions = response.data.data
              const items = []
              // Generate my_bid, is_highest, and details fields from auctions array
              auctions.forEach((auction) => {
                const newAuction = {
                  ...auction,
                  my_bid: `$${this.$root.$options.filters.formatPrice(
                    auction.my_bid
                  )}`,
                  is_highest: auction.my_bid === auction.highest_bid,
                  details: auction.auction_items[0],
                }
                items.push(newAuction)
              })
              this.bids = items
            } else {
              this.bids = []
            }
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
    showItemDetails(idx) {
      const updated = this.bids.slice()
      updated[idx].showDetails = !updated[idx].showDetails
      this.bids = updated
    },
    // Convert price string to number
    removePriceFormat(idx) {
      const updated = this.bids.slice()
      if (updated[idx].my_bid) {
        updated[idx].my_bid = Number(
          updated[idx].my_bid.replace(/[^0-9.-]+/g, '')
        )
      }
      this.bids = updated
    },
    // Convert number to price string
    formatPrice(idx) {
      const updated = this.bids.slice()
      const value = parseFloat(updated[idx].my_bid) * 100
      updated[idx].my_bid = `$${this.$root.$options.filters.formatPrice(value)}`
      this.bids = updated
    },
    // Update bid price
    updateBid(idx) {
      const updated = this.bids.slice()
      let price = 0
      if (updated[idx].my_bid) {
        price = Number(updated[idx].my_bid.replace(/[^0-9.-]+/g, '')) * 100
      }
      this.$axios
        .put('/auctions/bids/price', {
          auction_id: updated[idx].id,
          price,
        })
        .then((response) => {
          const { highest } = response.data
          this.$toasted.success(
            this.$t('auctions.bidding_history.update_bid_success_msg')
          )
          updated[idx].my_bid = `$${this.$root.$options.filters.formatPrice(
            price
          )}`
          updated[idx].is_highest = price === highest
          this.bids = updated
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toasted.error(
              this.$t('auctions.bidding_history.update_bid_error_msg')
            )
          } else {
            this.$toasted.error(this.$t(error.response.data.message))
          }
        })
    },
    // Change bids status
    changeStatus(option) {
      this.selectedStatus = option
    },
  },
}
</script>
