<template>
  <section class="content p-4">
    <div class="container-fluid">
      <div
        class="row justify-content-between align-items-end has-border auctions-header"
      >
        <div class="mb-1 auctions-header-title">
          {{
            `${$t('auctions.bid_details.current_bids_on')} #${
              $route.params.id
            }`
          }}
        </div>
        <div>
          <NuxtLink
            to="/auctions"
            class="btn btn-outline-dark px-5 back-auctions-btn"
            >{{ $t('auctions.bid_details.back_to_auctions') }}</NuxtLink
          >
        </div>
      </div>
      <div v-if="auction" class="row auctions-bids-details">
        <div class="col-5">
          <div
            v-for="(item, idx) in auction.auction_items"
            :key="idx"
            class="auction-product"
          >
            <span class="product-name">{{ item.inventory.product.name }}</span>
            <br />
            <span class="cell-wrapper size">{{ $t('auctions.list.table_columns.size') }}:&nbsp;{{ item.inventory.size.size }}</span>
            <div
              v-if="item.inventory.product.category && item.inventory.product.sku"
              class="d-flex align-items-center justify-content-center"
            >
              <ProductThumb :product="item.inventory.product" />
            </div>
          </div>
        </div>
        <div class="col-2"></div>
        <div class="col-5">
          <div class="bids-status">
            <div class="bids-status-time">
              <strong
                >{{ $t('auctions.bid_details.time_left') }}:&nbsp;</strong
              ><strong class="remaining">{{
                auction | remainingTime
              }}</strong
              >&nbsp;&nbsp;{{
                $t('auctions.bid_details.duration')
              }}&nbsp;{{ auction.time_limit }}&nbsp;{{
                $t('auctions.bid_details.days')
              }}
            </div>
            <!-- Stats -->
            <div class="bids-status-stats">
              <div class="bids-status-stats-left">
                {{ $t('auctions.bid_details.active_bidders') }}
              </div>
              <div class="bids-status-stats-right">
                {{ $t('auctions.bid_details.number_of_bids') }}
              </div>
            </div>
            <div class="bids-status-stats numbers-only">
              <div class="bids-status-stats-left">
                {{ auction.number_of_bidders }}
              </div>
              <div class="bids-status-stats-right">
                {{ auction ? auction.bids.length : 0 }}
              </div>
            </div>
            <div
              v-if="auction.highest_bid"
              class="text-center current-bid"
            >
              <div class="current-bid-label">
                {{ $t('auctions.bid_details.current_bid') }}
              </div>
              <div>${{ auction.highest_bid | formatPrice }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="auction" class="mt-4 auctions-bids-history">
        <div class="d-flex align-items-center justify-content-between">
          <div class="auctions-bids-history-title">
            {{ $t('auctions.bid_details.recent_bidding_history') }}
          </div>
          <select-box
            :options="filterOptions"
            :value="selectedOption"
            @change="changeFilterOption"
          ></select-box>
        </div>
        <b-table
          :busy="loading"
          show-empty
          class="mt-3 auctions-table"
          :items="auction.bids"
          :fields="tableColumns"
        >
          <template #table-busy>
            <div class="text-center text-dark my-2">
              <b-spinner class="align-middle"></b-spinner>
            </div>
          </template>
          <template #cell(bidder)="row">
            <NuxtLink :to="`/users/${row.item.user.id}`">{{
              row.item.user.id
            }}</NuxtLink>
          </template>
          <template #cell(bid_amount)="row">
            <div class="text-center">
              ${{ row.item.price | formatPrice }}
            </div>
          </template>
          <template #cell(bid_time)="row">
            <span class="text-center">{{
              new Date(row.item.created_at)
            }}</span>
          </template>
          <template #empty>
            <div class="text-center">
              {{ $t('auctions.bid_details.no_bid') }}
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from 'vuex'
import SelectBox from '~/components/Auctions/StatusSelectBox.vue'
import ProductThumb from '~/components/product/Thumb.vue'

export default {
  name: 'AuctionBidsPage',
  components: {
    SelectBox,
    ProductThumb,
  },
  layout: 'Profile', // Layout
  middleware: 'auth',
  data() {
    return {
      auction: null,
      loading: false,
      filterOptions: [
        {
          id: 'latest',
          label: this.$t('auctions.bid_details.latest_bid'),
        },
        {
          id: 'highest',
          label: this.$t('auctions.bid_details.highest_bid'),
        },
      ],
      selectedOption: {
        label: this.$t('auctions.bid_details.filter'),
      },
      tableColumns: [
        {
          key: 'bidder',
          label: this.$t('auctions.bid_details.bidder'),
          class: 'text-left',
        },
        {
          key: 'bid_amount',
          label: this.$t('auctions.bid_details.bid_amount'),
          class: 'text-center',
        },
        {
          key: 'bid_time',
          label: this.$t('auctions.bid_details.bid_time'),
          class: 'text-center',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  mounted() {
    this.loadAuction()
  },
  methods: {
    // Set current active tab
    tabChanged(value) {
      this.currentTab = value
    },
    // Change filter option
    changeFilterOption(opt) {
      this.selectedOption = opt
      this.loadAuction()
    },
    // Load auction details
    loadAuction() {
      this.loading = true
      const { id: auctionId } = this.$route.params
      this.$axios
        .get(`/auctions/${auctionId}`, {
          params: {
            order_by: this.selectedOption.id, // latest | highest
          },
        })
        .then((response) => {
          this.loading = false
          this.auction = response.data
        })
        .catch((error) => {
          this.loading = false
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
  },
}
</script>
