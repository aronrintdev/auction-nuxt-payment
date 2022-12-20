<template>
  <div class="mt-5">
    <div
      v-if="action === 'none'"
      class="d-flex align-items-start justify-content-between mb-2"
    >
      <div class="position-relative">
        <div class="header-title position-absolute">{{ $t('bids.filter_by') }}</div>
        <CustomSelectwithCheckbox
          id="auction-status-selector"
          class="mr-4 dropdown-filters"
          :value="statusFilter"
          :options="STATUSES"
          :title="$t('bids.status')"
          :updateFilters="activeStatusFilters"
        />
      </div>
      <div v-if="activeStatusFilters.length" class="d-flex flex-grow-1 align-items-center">
        <div v-for="(tag, idx) in activeStatusFilters" :key="idx" class="apply-filters-tag">
          <span>{{ tag.text }}</span>
          <CloseIcon role="button" @click="removeFilter(idx)" />
        </div>
        <span class="ml-3 text-primary" role="button" @click="activeStatusFilters=[]">
          <u>{{ $t('auctions.frontpage.filterbar.clear_all_filters') }}</u>
        </span>
      </div>
      <div class="btn-edit">
        <b-dropdown
          variant="link"
          toggle-class="text-decoration-none py-0 my-0"
          no-caret
          right
        >
          <template #button-content>
            {{ $t('watchlists.edit_list') }}
          </template>
          <b-dropdown-item
            :disabled="
              listProducts.length === 0 || getMovableWatchlists().length === 0
            "
            @click="setAction('move')"
          >
            {{ $t('watchlists.move_items') }}
          </b-dropdown-item>
          <b-dropdown-item
            :disabled="listProducts.length === 0"
            @click="setAction('remove')"
          >
            {{ $t('watchlists.remove_items') }}
          </b-dropdown-item>
          <b-dropdown-item v-b-modal.create-watchlist-modal>
            <img src="~/assets/img/icons/plus_blue.svg" />
            {{ $t('watchlists.create_list') }}
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <b-card no-body class="mb-2">
      <b-card-header
        class="py-2 px-3 d-flex align-items-center justify-content-between"
        role="tab"
      >
        <span class="body-2-bold flex-grow-1"
          >{{ type === 'single' ? $t('auction.auction_types.single') :  $t('auctions.list.collection') }} ({{
            auctionCount
          }})</span
        >
        <div
          v-b-toggle="''+accordionId"
          class="d-flex align-items-center justify-content-center p-1 collapase-icon"
        >
          <UpArrowIcon />
        </div>
      </b-card-header>
      <b-collapse
        :id="accordionId"
        visible
        accordion="my-accordion"
        role="tabpanel"
      >
        <b-card-body class="px-0">
          <div v-if="!!currentWatchlist" class="section-items py-4 px-1 flex-grow-1">
            <div
              v-if="action !== 'none'"
              class="bulk-select-section"
            >
              <BulkSelectToolbar
                ref="bulkSelectToolbar"
                :active="action !== 'none'"
                :selected="selected"
                :unitLabel="$tc('common.product', selected.length)"
                :successLabel="$tc('watchlists.products_removed_from_watchlist')"
                :total="listProducts.length"
                @close="cancelAction()"
                @selectAll="handleSelectAll()"
                @deselectAll="handleDeselectAll()"
                @undo="handleUndoBulkAction()"
              />
            </div>

            <Loader v-if="loading" class="py-5" />

            <div v-else class="py-3">
              <div v-if="listProducts.length > 0" class="row">
                <WatchlistAuctionCard
                  v-for="item in listProducts"
                  :key="item.id"
                  :item="item"
                  :selectable="action === 'move' || action === 'remove'"
                  :selected="!!selected.find((id) => id == item.id)"
                  class="col-12 col-md-4 col-lg-6 col-xl-4"
                  @select="selectItem"
                ></WatchlistAuctionCard>
              </div>

              <div v-else class="text-center">
                <p class="pt-5">
                  {{ $t('watchlists.no_items_info') }}
                </p>

                <Button
                  variant="primary"
                  class="mt-4 mx-auto"
                  pill
                  @click="handleBrowseClick"
                >
                  {{ $t('watchlists.browse_items') }}
                </Button>
              </div>

              <div>
                <div
                  v-if="action === 'remove' && listProducts.length > 0"
                  class="action-container"
                >
                  <Button
                    variant="primary"
                    :disabled="selected.length === 0"
                    @click="removeSelected"
                  >
                    {{ $t('watchlists.remove_selected') }}
                  </Button>
                </div>

                <div
                  v-if="action === 'move' && listProducts.length > 0"
                  class="action-container"
                >
                  <Button
                    v-for="(list, index) in getMovableWatchlists()"
                    :key="`move-to-watchlist-${list.id}`"
                    :disabled="selected.length === 0"
                    :variant="BUTTON_VARIANTS[index % 4]"
                    @click="moveSelected(list)"
                  >
                    {{ $t('watchlists.move_to_list', { list: list.name }) }}
                  </Button>
                </div>

                <Pagination
                  v-if="listProducts.length > 0"
                  v-model="currentPage"
                  :total="totalCount"
                  :per-page="perPage"
                  :per-page-options="[5, 10, 15, 20, 25]"
                  class="mt-2"
                  @page-click="handlePageClick"
                  @per-page-change="handlePerPageChange"
                />
              </div>
            </div>
          </div>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>


</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import Loader from '~/components/common/Loader.vue'
import BulkSelectToolbar from '~/components/common/BulkSelectToolbar'
import Pagination from '~/components/common/Pagination'
import {CustomSelectwithCheckbox} from '~/components/common';
import CloseIcon from '~/assets/img/icons/close.svg?inline'
import { WATCHLIST_TYPE_AUCTION } from '~/static/constants'
import Button from '~/components/common/Button.vue'
import WatchlistAuctionCard from '~/components/watchlist/AuctionCard'
import UpArrowIcon from '~/assets/img/icons/up-arrow.svg?inline'

export default {
  name: 'WatchlistAuctionItems',
  components: {
    Loader,
    BulkSelectToolbar,
    Pagination,
    Button,
    CustomSelectwithCheckbox,
    CloseIcon,
    WatchlistAuctionCard,
    UpArrowIcon,
  },
  props: {
    currentWatchlist: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: '',
    },
    auctionCount: {
      type: Number,
      default: 0,
    },
    accordionId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      action: 'none', // 'move' or 'remove'
      BUTTON_VARIANTS: ['primary', 'info', 'warning', 'dark'],
      listProducts: [],
      STATUSES: Object.keys(this.$t('auctions.status')).map(a => {
        return {
          text: this.$t('auctions.status.' + a),
          value: a
        }
      }),
      activeStatusFilters: [],
      statusFilter: null,
      selected: [],
      removed: [],
      moved: [],
      movedWatchlist: null,
      currentPage: 1,
      perPage: 15,
      loading: false,
      totalCount: 0,
    }
  },

  computed: {
    ...mapGetters({
      watchlists: 'watchlist/getWatchlists',
      watchlistsType: 'watchlist/getWatchlistsType',
    }),
  },

  watch: {
    activeStatusFilters() {
      this.getWatchlistItems()
    }
  },

  mounted() {
    this.getWatchlistItems()
  },

  methods: {
    ...mapActions({
      fetchWatchlistItems: 'watchlist/fetchWatchlistItems',
      removeItemsFromWatchlist: 'watchlist/removeItemsFromWatchlist',
      moveWatchlistItems: 'watchlist/moveWatchlistItems',
      addItemsToWatchlist: 'watchlist/addItemsToWatchlist',
    }),
    // Called when user click move/delete item buttons
    setAction(mode) {
      if (this.listProducts.length > 0) {
        this.selected = []
        this.action = mode
      }
    },

    // Called when user select products to move/delete products from watchlist
    selectItem(id, checked) {
      if (checked) {
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },

    // Cancel moving/deleting products
    cancelAction() {
      this.action = 'none'
      this.selected = []
    },

    removeFilter(idx) {
      this.activeStatusFilters.splice(idx, 1)
    },

    // Get target watchlists to move products from current watchlist
    getMovableWatchlists() {
      return this.watchlists.filter(
        (list) => list.id !== this.currentWatchlist.id
      )
    },
    handleSelectAll() {
      this.selected = this.listProducts.map((p) => p.id)
    },

    handleDeselectAll() {
      this.selected = []
    },

    async handleUndoBulkAction() {
      if (this.action === 'remove') {
        await this.addItemsToWatchlist({
          watchlist: this.currentWatchlist,
          ids: this.removed.map((p) => p.watchlist_itemable_id),
          type: WATCHLIST_TYPE_AUCTION,
        })
        this.listProducts.push(...this.removed)
        this.removed = []
      } else if (this.action === 'move') {
        await this.moveWatchlistItems({
          watchlist: this.movedWatchlist,
          ids: this.moved.map((p) => p.watchlist_itemable_id),
          targetId: this.currentWatchlist.id,
        })
        this.listProducts.push(...this.moved)
        this.moved = []
        this.movedWatchlist = null
      }
      this.$refs.bulkSelectToolbar.showSuccess(null)
    },
    // Remove selected products from current watchlist
    async removeSelected() {
      if (this.selected.length > 0) {
        await this.removeItemsFromWatchlist({
          watchlist: this.currentWatchlist,
          ids: this.selected,
        })
        this.removed = this.listProducts.filter((product) =>
          this.selected.includes(product.id)
        )
        this.listProducts = this.listProducts.filter(
          (product) => !this.selected.includes(product.id)
        )
        this.selected = []
        this.$refs.bulkSelectToolbar.showSuccess(
          this.$tc(
            'watchlists.products_removed_from_watchlist',
            this.removed.length,
            {
              n: this.removed.length,
            }
          )
        )
      }
    },
    // Move selected products from current watchlist to another
    async moveSelected(watchlist) {
      if (this.selected.length > 0) {
        await this.moveWatchlistItems({
          watchlist: this.currentWatchlist,
          ids: this.selected,
          targetId: watchlist.id,
        })
        this.movedWatchlist = watchlist
        this.moved = this.listProducts.filter((product) =>
          this.selected.includes(product.id)
        )
        this.listProducts = this.listProducts.filter(
          (product) => !this.selected.includes(product.id)
        )
        this.selected = []
        this.$refs.bulkSelectToolbar.showSuccess(
          this.$tc('watchlists.products_moved', this.moved.length, {
            n: this.moved.length,
            watchlist: watchlist.name,
          })
        )
      }
    },
    // Called when user navigate from current page to another
    handlePageClick(bvEvent, page) {
      if (this.currentPage !== page) {
        this.currentPage = page
        this.getWatchlistItems()
      }
    },
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.currentPage = 1
        this.getWatchlistItems()
      }
    },
    handleBrowseClick() {
      this.$router.push({
        path: this.watchlistsType === WATCHLIST_TYPE_AUCTION ? '/auction' : '/trades',
      })
    },
    // Fetch watchlist products and pagination information
    async getWatchlistItems() {
      this.loading = true
      const res = await this.fetchWatchlistItems({
        watchlist: this.currentWatchlist,
        page: this.currentPage,
        perPage: this.perPage,
        type: WATCHLIST_TYPE_AUCTION,
        auctionType: this.type,
        status: this.activeStatusFilters.map(filter => filter.value),
      })
      this.listProducts = res.data
      this.totalCount = res.total
      this.loading = false
    },
  },
}
</script>
