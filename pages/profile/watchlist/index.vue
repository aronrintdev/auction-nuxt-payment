<template>
  <b-container fluid class="container-watchlists">
    <div class="d-none d-sm-flex justify-content-between align-items-start header">
      <div v-if="!!currentWatchlist" class="title">
        <h2 class="text-truncate mw-800px watch-list-name">{{ currentWatchlist.name }}</h2>
        <div class="watch-list-counter">({{ totalCount }} {{ $t('common.items') }})</div>
      </div>
      <div v-else>&nbsp;</div>

      <div class="py-1 d-flex align-items-center">
        <span
          role="button"
          class="watchlists-type"
          :class="{ active: watchlistsType === WATCHLIST_TYPE_TRADE }"
          @click="changeListType(WATCHLIST_TYPE_TRADE)"
        >
          {{ $t('home.trades') }}
        </span>
        <span
          role="button"
          class="text-underline watchlists-type"
          :class="{ active: watchlistsType === WATCHLIST_TYPE_AUCTION }"
          @click="changeListType(WATCHLIST_TYPE_AUCTION)"
        >
          {{ $t('home.auctions') }}
        </span>
      </div>
      <div v-if="!!currentWatchlist" class="checkbox-switch-wrapper">
        <CheckboxSwitch
          class="justify-content-end"
          :value="currentWatchlist.privacy === WATCHLIST_PRIVACY_PUBLIC"
          :label-on="$t('common.public')"
          :label-off="$t('common.private')"
          @change="togglePrivacy"
        />
      </div>
      <div v-else>&nbsp;</div>
    </div>
    <div class="d-block d-sm-none">
      <NavGroup
        v-model="watchlistsType"
        nav-key="list-type"
        class="d-flex d-sm-none mb-4 pt-2"
        :data="tabs"
        @change="handleTabs"
      />
    </div>
    <div v-if="watchlists.length > 0 && currentWatchlist">
      <div class="row">
        <div class="col-12 col-sm-3 section-lists-wrapper">
          <section class="d-none d-sm-block section-lists">
            <h5>
              {{ 
                watchlistsType !== WATCHLIST_TYPE_AUCTION ? $t('watchlists.trade_watchlists'): $t('watchlists.auction_watchlists') 
              }} 
              <span v-b-modal.create-watchlist-modal class="plus-sign">
                +
              </span>
            </h5>
            
            <div v-for="list in watchlists" :key="list.id">
              <Button
                :pressed="list.id === currentWatchlist.id"
                variant="link"
                class="text-truncate mw-300px"
                @click="selectWatchlist(list)"
              >
                {{ list.name }}
              </Button>
            </div>

            <div
              v-if="
                currentWatchlist.id &&
                currentWatchlist.privacy === WATCHLIST_PRIVACY_PUBLIC
              "
              class="share-block"
            >
              <h6>{{ $t('common.share').toUpperCase() }}</h6>
              <ShareButton
                :url="shareUrl + currentWatchlist.id"
                :title="currentWatchlist.name"
                :description="shareDescription"
              />
            </div>
          </section>
          <div class="wishlist-mobile d-block d-sm-none">
            <div v-for="list in watchlists" :key="list.id" class="mb-4">
              <div class="d-flex">
                <div class="thumb-wrapper">
                  <Thumb :src="list.image" />
                </div>
                <div
                  class="w-100 d-flex flex-column justify-content-between ml-3 watchlist-details"
                >
                  <div class="d-flex justify-content-between">
                    <div class="w-100">
                      <h4 class="fs-14 fw-6 font-secondary mb-1">
                        {{ list.name }}
                      </h4>
                      <h6
                        class="fs-12 fw-5 text-gray-5 font-secondary text-capitalize"
                      >
                        {{ list.privacy }} List
                      </h6>
                    </div>
                    <div :id="`popover-share-${list.id}`">
                      <ShareIcon />
                    </div>
                  </div>
                  <nuxt-link
                    class="btn btn-outline-dark w-100 rounded-pill fs-13 fw-6 font-primary mb-4 text-black"
                    :to="`/profile/watchlist/${list.id}`"
                  >
                    {{ $t('watchlists.view_list') }}
                  </nuxt-link>
                </div>
              </div>
              <button
                class="fs-14 fw-5 font-secondary text-gray-47 btn btn-link p-0 mt-3"
              >
                {{ $t('watchlists.edit') }}
              </button>
              <b-popover
                ref="sharePopover"
                :target="`popover-share-${list.id}`"
                triggers="click"
                placement="bottom"
                container="body"
                custom-class="wishlist-popover"
                delay="200"
                @show="shareShow = true"
                @hidden="shareShow = false"
              >
                <ShareButton
                  :url="shareUrl + list.id"
                  :title="list.name"
                  :description="shareDescription"
                />
              </b-popover>
            </div>
          </div>
        </div>

        <div
          v-if="!!currentWatchlist && watchlistsType === WATCHLIST_TYPE_AUCTION"
          class="section-items col-12 col-sm-9 d-none d-sm-block"
        >
          <div class="accordion" role="tablist">
            <AuctionItems
              :key="`single-${currentWatchlist.id}`"
              :currentWatchlist="currentWatchlist"
              type="single"
              :auctionsCount="singleAuctionsCount"
              accordionId="accordion-1"
            />
            <div class="title">
              <h2 class="text-truncate mw-800px watch-list-name">{{ currentWatchlist.name }}</h2>
            </div>
            <hr />
            <AuctionItems
              :key="`collection-${currentWatchlist.id}`"
              :currentWatchlist="currentWatchlist"
              type="collection"
              :auctionsCount="collectionAuctionsCount"
              accordionId="accordion-2"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="section-no-list text-center py-5">
        <p class="mb-4">
          {{ $t('watchlists.no_watchlist') }}
        </p>

        <Button
          v-b-modal.create-watchlist-modal
          variant="dark-blue"
          class="mx-auto"
          pill
        >
          {{ $t('watchlists.create_new_list') }}
        </Button>
      </div>
    </div>
    <Portal to="page-title"> Watchlist </Portal>
    <CreateWatchlistModal @created="handleCreated" />
  </b-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CheckboxSwitch from '~/components/common/CheckboxSwitch.vue'
import ShareButton from '~/components/common/ShareButton.vue'
import AuctionItems from '~/components/watchlist/AuctionItems'
import CreateWatchlistModal from '~/components/modal/CreateWatchlist'
import Button from '~/components/common/Button.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import {
  WATCHLIST_TYPE_AUCTION,
  WATCHLIST_TYPE_TRADE,
  WATCHLIST_PRIVACY_PRIVATE,
  WATCHLIST_PRIVACY_PUBLIC,
} from '~/static/constants'
import Thumb from '~/components/product/Thumb'
import ShareIcon from '~/assets/icons/ShareIcon'
export default {
  name: 'Watchlists',

  components: {
    CheckboxSwitch,
    ShareButton,
    CreateWatchlistModal,
    Button,
    AuctionItems,
    Thumb,
    ShareIcon,
    NavGroup,
  },

  layout: 'Profile',

  middleware: 'auth',

  fetchOnServer: false,

  data() {
    return {
      currentWatchlist: null,
      shareDescription: this.$t('watchlists.share_description'),
      shareUrl: process.env.APP_URL + '/watchlist/',
      tabs: [
        { label: 'Trades', value: WATCHLIST_TYPE_TRADE },
        { label: 'Auctions', value: WATCHLIST_TYPE_AUCTION },
      ],
      WATCHLIST_TYPE_AUCTION,
      WATCHLIST_TYPE_TRADE,
      WATCHLIST_PRIVACY_PUBLIC,
      WATCHLIST_PRIVACY_PRIVATE,
    }
  },

  async fetch() {
    await this.fetchWatchlists({ type: this.watchlistsType })
    await this.selectWatchlist(this.watchlists[0])
  },

  computed: {
    ...mapGetters({
      watchlists: 'watchlist/getWatchlists',
      watchlistsType: 'watchlist/getWatchlistsType',
      singleAuctionsCount: 'watchlist/getSingleAuctionsCount',
      collectionAuctionsCount: 'watchlist/getCollectionAuctionsCount',
    }),
    totalCount() {
      return this.singleAuctionsCount + this.collectionAuctionsCount
    },
  },

  methods: {
    ...mapActions({
      fetchWatchlists: 'watchlist/fetchWatchlists',
      updateWatchlistPrivacy: 'watchlist/updateWatchlistPrivacy',
      changeWatchlistsType: 'watchlist/changeWatchlistsType',
    }),

    async handleTabs(tab) {
      this.changeWatchlistsType(tab)
      await this.fetchWatchlists({ type: tab })
      await this.selectWatchlist(this.watchlists[0])
    },

    handleCreated(watchlist) {
      this.selectWatchlist(watchlist)
      this.$forceUpdate()
    },

    async changeListType(type) {
      this.changeWatchlistsType(type)
      await this.fetchWatchlists({ type: this.watchlistsType })
      await this.selectWatchlist(this.watchlists[0])
    },

    // Fetch list products and pagination details for selected watchlist
    selectWatchlist(watchlist) {
      if (watchlist) {
        this.currentWatchlist = watchlist
      } else {
        this.currentWatchlist = null
      }
    },

    // Update privacy of current watchlist
    togglePrivacy(privacy) {
      this.updateWatchlistPrivacy({
        watchlist: this.currentWatchlist,
        privacy: privacy ? WATCHLIST_PRIVACY_PUBLIC : WATCHLIST_PRIVACY_PRIVATE,
      })
    },
  },
}
</script>
<style scoped lang="sass">
@import '~/assets/css/_variables'
.text-gray-5
  color: $color-gray-5

.mw-300px
  max-width: 300px

.mw-800px
  max-width: 800px

.wishlist-mobile
  .thumb-wrapper
    width: 164px
  .watchlist-details
    max-width: calc(100% - 180px)
    h4
      overflow-wrap: break-word
.container-watchlists
  background: $white
  .section-lists
    max-width: 250px
    padding-top: 100px
    margin: 0
    background: $white
    position: relative
    z-index: 10
    btn
      font-size: 16px
      font-weight: $medium
    h5
      padding-left: 12px
      font-family: $font-montserrat
      font-weight: $bold
      font-style: $normal
      @include body-4b
      letter-spacing: -0.02em
      text-transform: capitalize
      color: $black
  .title
    flex: 3
    max-width: calc(50vw - 368px)
    .watch-list-name
      font-family: $font-montserrat
      font-style: $normal
      @include heading-1
      text-transform: capitalize
      color: $black
      margin-bottom: 9px
    .watch-list-counter
      font-family: $font-montserrat
      font-style: $normal
      font-weight: $normal
      @include body-5
  .checkbox-switch-wrapper
    margin-top: 2px
    flex: 3
    max-width: calc(50vw - 368px)


::v-deep .checkbox-switch
  line-height: 32px
  span[role='button']
    font-family: $font-montserrat
    @include body-5
    margin-top: 7px
    font-weight: $bold
    letter-spacing: -0.02em

  .custom-switch
    height: 31px
    margin-right: 20px
    .custom-control-label::before
      background-color: rgba(120, 120, 128, 0)
      border: none
      height: 31px
      width: 51px
      box-shadow: none
      background-image: url('~/assets/img/profile/wishlist/toggle-bg.svg')
      background-repeat: no-repeat

    .custom-control-label::after
      background: $color-white
      border: 0.5px solid rgba(0, 0, 0, 0.04)
      box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 3px 1px rgba(0, 0, 0, 0.06)
      width: 27px
      height: 27px
      border-radius: 100%

    .custom-control-input:checked ~ .custom-control-label::after
      transform: translateX(1.27rem)
</style>
