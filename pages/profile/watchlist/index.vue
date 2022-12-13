<template>
  <b-container fluid class="container-watchlists">
    <div class="d-none d-sm-flex justify-content-between align-items-start header">
      <div v-if="!!currentWatchlist" class="title">
        <h2 class="text-truncate mw-800px">{{ currentWatchlist.name }}</h2>
        <span>({{ totalCount }} {{ $t('common.items') }})</span>
      </div>
      <div v-else>&nbsp;</div>

      <div class="py-1 d-flex align-items-center">
        <span
          role="button"
          class="mx-5 watchlists-type"
          :class="{ active: watchlistsType === WATCHLIST_TYPE_TRADE }"
          @click="changeListType(WATCHLIST_TYPE_TRADE)"
        >
          {{ $t('home.trades') }}
        </span>
        <span
          role="button"
          class="text-underline mx-5 watchlists-type"
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
        v-model="activeTab"
        nav-key="list-type"
        class="d-flex d-sm-none mb-4 pt-2"
        :data="tabs"
        @change="handleTabs"
      />
    </div>
    <div v-if="watchlists.length > 0 && currentWatchlist">
      <div class="row">
        <div v-if="watchlistsType !== WATCHLIST_TYPE_AUCTION" class="col-12 col-sm-3">
          <section class="d-none d-sm-block section-lists">
            <h5>{{ $t('watchlists.buying_lists') }}</h5>
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
                  class="w-100 d-flex flex-column justify-content-between ml-3"
                >
                  <div class="d-flex justify-content-between">
                    <div>
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
          class="section-items mt-4 col-12 d-none d-sm-block"
        >
          <div class="accordion" role="tablist">
            <b-row>
              <b-col cols="3"></b-col>
              <b-col cols="9">
                <AuctionItems
                  :key="currentWatchlist.id"
                  :currentWatchlist="currentWatchlist"
                  type="single"
                  :auctionsCount="singleAuctionsCount"
                  accordionId="accordion-1"
                />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3">
                <div class="title">
                  <h2 class="text-truncate mw-800px">{{ currentWatchlist.name }}</h2>
                </div>
              </b-col>
              <b-col cols="9" class="pt-4">
                <hr />
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="3"></b-col>
              <b-col cols="9">
                <AuctionItems
                  :key="currentWatchlist.id"
                  :currentWatchlist="currentWatchlist"
                  type="collection"
                  :auctionsCount="collectionAuctionsCount"
                  accordionId="accordion-2"
                />
              </b-col>
            </b-row>
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
          variant="primary"
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
      activeTab: 'trades',
      tabs: [
        { label: 'Trades', value: 'trades' },
        { label: 'Auctions', value: 'auctions' },
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

    handleTabs(tab) {
      this.activeTab = tab
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
.container-watchlists
  background: $white
  .section-lists
    max-width: 250px
    margin-right: 20px
    btn
      font-size: 16px
      font-weight: $medium
    h5
      padding-left: 10px
  .title
    flex: 3
  .checkbox-switch-wrapper
    margin-top: 2px
    flex: 3
</style>
