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
    </div>

    <b-table
      :busy="loading"
      class="mt-3 auctions-table auctions-delisted-table"
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
            <br />
            <span
              class="text-primary relist-item"
              @click="relistItem(row.item.id)"
            >
              {{
                type === 'single'
                  ? $t('auctions.list.relist_item')
                  : $t('auctions.list.relist_collection')
              }}
            </span>
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
            <br />
            <span
              class="text-primary relist-item"
              @click="relistItem(row.item.id)"
            >
              {{
                type === 'single'
                  ? $t('auctions.list.relist_item')
                  : $t('auctions.list.relist_collection')
              }}
            </span>
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
      <template #cell(status)>
        <span class="cell-wrapper size">{{
          $t('auctions.list.ended_status')
        }}</span>
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
      <template #cell(current_bid)="row">
        <div class="cell-wrapper my-bid">
          <div class="mt-1">
            <div class="current-bid-price text-center">
              ${{ row.item.highest_bid | formatPrice }}
            </div>
          </div>
          <div class="mt-1">
            <NuxtLink
              :to="`/auctions/${row.item.id}/bids`"
              class="btn btn-sm btn-outline-dark my-bid-update-btn"
            >
              {{ $t('auctions.bidding_history.view_bids') }}
            </NuxtLink>
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
import SwitchTabBar from '../SwitchTabBar.vue'
import ProductThumb from '../product/Thumb.vue'

// Delisted Auctions View
export default {
  name: 'DelistedAuctions',
  components: {
    SwitchTabBar,
    ProductThumb,
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
          key: 'status',
          label: this.$t('auctions.list.table_columns.status'),
        },
        {
          key: 'number_of_bids',
          label: this.$t('auctions.list.table_columns.number_of_bids'),
        },
        {
          key: 'current_bid',
          label: this.$t('auctions.list.table_columns.set_bid'),
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
          key: 'status',
          label: this.$t('auctions.list.table_columns.status'),
        },
        {
          key: 'number_of_bids',
          label: this.$t('auctions.list.table_columns.number_of_bids'),
        },
        {
          key: 'current_bid',
          label: this.$t('auctions.list.table_columns.set_bid'),
        },
      ],
      loading: true,
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
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
    // Get delisted auctions from API
    loadPage() {
      this.loading = true
      this.$axios
        .get('/auctions/inventory', {
          params: {
            type: this.type,
            page: this.currentPage,
            take: this.perPage,
            search: this.keyword,
            status: 'delisted',
          },
        })
        .then((response) => {
          this.loading = false
          // Check if response has data property
          if (response.data) {
            this.totalRows = response.data.total
            if (this.totalRows > 0) {
              const auctions = response.data.data
              const items = []
              auctions.forEach((auction) => {
                const newAuction = {
                  ...auction,
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
        .catch(() => {
          this.loading = false
          this.$toasted.error(
            this.$t('auctions.bidding_history.load_error_msg')
          )
        })
    },
    // Show collection products
    showItemDetails(idx) {
      const updated = this.bids.slice()
      updated[idx].showDetails = !updated[idx].showDetails
      this.bids = updated
    },
    // Relist selected item
    relistItem(id) {
      this.$axios
        .post(`/auctions/${id}/status`, {
          status: 'live',
        })
        .then(() => {
          // Show an "Relisting item" success alert
          this.$toasted.success(
            this.$t('auctions.bidding_history.relist_inventory_success_msg')
          )
          this.currentPage = 0
          this.loadPage()
        })
        .catch(() => {
          this.$toasted.error(
            this.$t('auctions.bidding_history.relist_inventory_error_msg')
          )
        })
    },
  },
}
</script>
