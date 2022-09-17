<template>
  <div>
    <b-popover
      ref="watchlistPopover"
      :target="target"
      triggers="hover"
      placement="bottom"
      container="body"
      custom-class="watchlist-popover"
      delay="100"
      @show="$emit('show')"
      @hidden="$emit('hidden')"
    >
      <div v-if="watchlists.length" class="list-section">
        <div
          v-for="list in watchlists"
          :key="`watchlist-${list.id}`"
          class="watchlist-item"
          @click="handleWatchlistClick(list)"
        >
          <div class="image-section">
            <ProductThumb :src="list.image" />
          </div>
          <div class="ml-2 text-truncate">{{ list.name }}</div>
          <div class="overlay"></div>
        </div>
      </div>
      <div
        class="create-section d-flex align-items-center"
        @click="createWatchlist"
      >
        <div class="image-section">
          <Icon src="plus_blue.svg" width="26" height="26" />
        </div>
        <div class="ml-2">{{ $t('wish_lists.create_list') }}</div>
      </div>
    </b-popover>

    <CreateWatchlistModal
      :id="`create-watchlist-modal-${target}`"
      @created="handleWatchlistCreated"
    />

    <NewWatchlistItemModal
      v-if="auction.auction_items"
      :id="`new-list-item-modal-${target}`"
      :product="auction.auction_items[0].inventory.product"
      :watchlist="watchlist"
    />
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreateWatchlistModal from '~/components/modal/CreateWatchlist'
import NewWatchlistItemModal from '~/components/modal/NewWatchlistItem'
import Icon from '~/components/common/Icon'
import ProductThumb from '~/components/product/Thumb.vue'
import { WATCHLIST_TYPE_AUCTION } from '~/static/constants'

export default {
  name: 'WatchlistPopover',

  components: {
    CreateWatchlistModal,
    NewWatchlistItemModal,
    Icon,
    ProductThumb,
  },

  props: {
    auction: {
      type: Object,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
  },

  data: () => {
    return {
      watchlist: {},
    }
  },

  computed: {
    ...mapGetters({
      watchlists: 'watchlist/getWatchlists',
    }),
  },

  methods: {
    ...mapActions({
      addItemsToWatchlist: 'watchlist/addItemsToWatchlist',
    }),

    createWatchlist() {
      this.$bvModal.show(`create-watchlist-modal-${this.target}`)
    },

    async handleWatchlistClick(list) {
      const data = await this.addItemsToWatchlist({
        watchlist: list,
        ids: [this.auction.id],
        type: WATCHLIST_TYPE_AUCTION,
      })
      this.$emit('watchlisted', data)
    },

    async handleWatchlistCreated(watchlist) {
      const data = await this.addItemsToWatchlist({
        watchlist,
        ids: [this.auction.id],
        type: WATCHLIST_TYPE_AUCTION,
      })
      this.$emit('wishlisted', data)
      this.watchlist = watchlist
      this.$nextTick(() =>
        this.$bvModal.show(`new-list-item-modal-${this.target}`)
      )
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.watchlist-popover::v-deep
  width: 235px
  border-radius: 10px

  .popover-body
    padding: 0
    @include body-3-normal

    >div:first-child
      border-top-left-radius: 10px
      border-top-right-radius: 10px

    .watchlist-item
      color: $color-black-1
      padding: 10px 20px
      display: flex
      align-items: center
      cursor: pointer
      position: relative

      &:first-child
        border-top-left-radius: 10px
        border-top-right-radius: 10px

      &:hover
        .overlay
          background: rgb(153,153,153,0.1)

      .overlay
        position: absolute
        top: 0px
        left: 0px
        width: 100%
        height: 100%
        background: rgb(153,153,153,0)

    .create-section
      background-color: $color-white-5
      padding: 10px 20px
      border-bottom-left-radius: 10px
      border-bottom-right-radius: 10px
      cursor: pointer

      &:hover
        background-color: $color-gray-3

    .image-section
      flex-shrink: 0
      width: 56px
      height: 37px
      display: flex
      align-items: center
      justify-content: center
      overflow: hidden

    .list-section
      max-height: 230px
      overflow-y: auto
</style>
