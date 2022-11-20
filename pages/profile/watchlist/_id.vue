<template>
  <b-container fluid class="container-watchlists">
    <div
      v-if="listProducts.length === 0"
      class="section-no-list text-center py-5"
    >
      <p class="mb-3">
        {{ $t('wish_lists.no_wish_lists') }}
      </p>

      <Button variant="primary" class="mx-auto" pill>
        {{ $t('wish_lists.create_new_list') }}
      </Button>
    </div>
    <div v-else class="row watchlist-mobile clear-fix">
      <div class="col-12 d-block">
        <NavGroup
          v-model="activeTab"
          nav-key="list-type"
          class="d-flex mb-4 pt-2"
          :data="tabs"
          @change="handleTabs"
        />
      </div>
      <WatchlistAuctionCard
        v-for="item in listProducts"
        :key="item.id"
        :item="item"
        :selectable="action === 'move' || action === 'remove'"
        :selected="!!selected.find((id) => id == item.id)"
        class="w-50 col-12 col-sm-6 col-md-4 col-lg-6 col-xl-4 "
        @select="selectItem"
      ></WatchlistAuctionCard>
    </div>

    <Portal to="back-icon-slot">
      <nuxt-link to="/profile/watchlist">
        <img src="~/assets/img/icons/back.svg" />
      </nuxt-link> </Portal
    ><Portal to="page-title">
      {{ currentWatchList ? currentWatchList.name : 'Watchlist' }}
    </Portal>
    <Portal to="notification-icon-slot">
      <div :id="`popover-share-watchlist`">
        <ShareIcon class="share-icon" />
      </div>
      <b-popover
        ref="sharePopover"
        :target="`popover-share-watchlist`"
        triggers="click"
        placement="bottom"
        container="body"
        custom-class="watchlist-popover"
        delay="200"
        @show="shareShow = true"
        @hidden="shareShow = false"
      >
        <ShareButton
          :url="`${shareUrl}${currentWatchList ? currentWatchList.id : ''}`"
          :title="currentWatchList ? currentWatchList.name : ''"
          :description="shareDescription"
        />
      </b-popover>
    </Portal>
    <div class="border-top my-2 divider"></div>
    <div class="section inspirtaion-list">
      <h1 class="fs-16 fw-6 font-primary my-3">
        {{ $t('wish_lists.inspired_by_you') }}
      </h1>
      <ProductCarousel class="mt-4 mb-5" :products="products" loop />
    </div>
    <CreateWatchListModal />
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import CreateWatchListModal from '~/components/modal/CreateWatchlist'
import ShareIcon from '~/assets/icons/ShareIcon'
import ShareButton from '~/components/common/ShareButton.vue'
import Button from '~/components/common/Button.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import WatchlistAuctionCard from '~/components/watchlist/AuctionCard'
import { WATCHLIST_TYPE_AUCTION } from '~/static/constants'

export default {
  name: 'WatchListsId',
  components: { CreateWatchListModal, ShareIcon, ShareButton, Button, NavGroup, WatchlistAuctionCard  },
  layout: 'IndexLayout',
  data() {
    return {
      category: 'all',
      CATEGORIES: [
        {
          label: this.$t('watch_lists.categories.all'),
          value: 'all',
        },
        {
          label: this.$t('watch_lists.categories.footwear'),
          value: 'sneakers',
        },
        {
          label: this.$t('watch_lists.categories.apparel'),
          value: 'apparel',
        },
        {
          label: this.$t('watch_lists.categories.accessories'),
          value: 'accessories',
        },
      ],
      tabs: [
        { label: 'Single', value: 'single' },
        { label: 'Collection', value: 'collection' },
      ],
      currentWatchList: null,
      listProducts: [],
      currentPage: 1,
      perPage: 15,
      totalCount: 0,
      loading: false,
      shareDescription: this.$t('watchlists.share_description'),
      shareUrl: process.env.APP_URL + '/watch-lists/',
      products: [],
      action: 'none', // 'move' or 'remove'
      BUTTON_VARIANTS: ['primary', 'info', 'warning', 'dark'],
      STATUSES: Object.keys(this.$t('auctions.status')).map(a => {
        return {
          text: this.$t('auctions.status.' + a),
          value: a
        }
      }),
      activeStatusFilters: [],
      statusFilter: null,
      activeTab: 'single',
      selected: [],
      removed: [],
      moved: [],
      movedWatchlist: null,
    }
  },

  async fetch() {
    this.loading = true
    if (this.$route.params?.id) {
      this.currentWatchList = await this.findWatchList({
        id: this.$route.params.id,
      })
    }
    if (this.currentWatchList) {
      await this.getWatchListItems()
    }
    await this.getProducts()
    this.loading = false
  },

  computed: {
    isMyWatchList() {
      return this.$store.state?.auth?.user?.id === this.currentWatchList.user_id
    },
  },
  watch: {
    activeStatusFilters() {
      this.getWatchlistItems()
    }
  },
  methods: {
    ...mapActions({
      findWatchList: 'watchlist/findWatchList',
      fetchWatchListItems: 'watchlist/fetchWatchlistItems',
      searchProducts: 'product/searchProducts',
      suggestProduct: 'product/suggestProduct',
    }),
    async getProducts(value) {
      const productRes = await this.searchProducts({ search: value })
      this.products = productRes
    },

    async getWatchListItems() {
      this.loading = true
      const res = await this.fetchWatchListItems({
        watchlist: this.currentWatchList,
        page: this.currentPage,
        perPage: this.perPage,
        type: WATCHLIST_TYPE_AUCTION,
        auctionType: this.activeTab,
        category: this.category !== 'all' ? this.category : null,
      })
      this.perPage = parseInt(res.per_page)
      this.totalCount = res.total
      this.listProducts = res.data
      this.loading = false
    },
    handleTabs(tab) {
      this.activeTab = tab
      this.getWatchListItems()
    },
    // Cancel moving/deleting products
    cancelAction() {
      this.action = 'none'
      this.selected = []
    },

    removeFilter(idx) {
      this.activeStatusFilters.splice(idx, 1)
    },

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
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.watchlist-mobile
  width: 100%
  clear: both
.thumb-wrapper
  width: 164px
.add-to-bag
  border: 1px solid $color-blue-20
.divider
  margin: 0 -16px
  border-color: $color-gray-47  !important
::v-deep .share-icon
  .strokeColor
    stroke: $color-gray-47
  .fillColor
    fill: $color-gray-47
</style>
