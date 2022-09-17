<template>
  <b-container fluid class="container-watchlists">
    <div class="d-flex justify-content-between align-items-start header">
      <div v-if="!!currentWatchlist" class="title">
        <h2 class="text-truncate mw-800px">{{ currentWatchlist.name }}</h2>
        <span>({{ totalCount }} {{ $t('common.items') }})</span>
      </div>
      <div v-else>&nbsp;</div>

      <div class="py-1 d-flex align-items-center">
        <span
          role="button"
          class="body-2-medium mx-5 watchlists-type"
          :class="{ 'active': watchlistsType === WATCHLIST_TYPE_TRADE }"
          @click="changeListType(WATCHLIST_TYPE_TRADE)"
        >
          {{ $t('home.trades') }}
        </span>
        <span
          role="button"
          class="body-2-medium text-underline mx-5 watchlists-type"
          :class="{ 'active': watchlistsType === WATCHLIST_TYPE_AUCTION }"
          @click="changeListType(WATCHLIST_TYPE_AUCTION)"
        >
          {{ $t('home.auctions') }}
        </span>
      </div>

      <CheckboxSwitch
        v-if="!!currentWatchlist"
        :value="currentWatchlist.privacy === WATCHLIST_PRIVACY_PUBLIC"
        :label-on="$t('common.public')"
        :label-off="$t('common.private')"
        @change="togglePrivacy"
      />
      <div v-else>&nbsp;</div>
    </div>
      
    <div v-if="watchlists.length > 0 && currentWatchlist">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column flex-shrink-0">
          <section
            :class="`section-lists`"
          >
            <h5>{{ $t('watchlists.buying_lists') }}</h5>

            <div v-for="list in watchlists" :key="list.id" class="px-2">
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
              v-if="currentWatchlist.id &&
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
        </div>

        <div v-if="!!currentWatchlist && watchlistsType === WATCHLIST_TYPE_AUCTION" class="section-items mt-4 flex-grow-1">
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header class="py-2 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span class="body-2-bold flex-grow-1">{{ $t('auction.auction_types.single') }} ({{ singleAuctionsCount }})</span>
                <div v-b-toggle.accordion-1 class="d-flex align-items-center justify-content-center p-1 collapase-icon">
                  <UpArrowIcon />
                </div>
              </b-card-header>
              <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                <b-card-body class="px-0">
                  <AuctionItems :key="currentWatchlist.id" :currentWatchlist="currentWatchlist" type="single" />
                </b-card-body>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header class="py-2 px-3 d-flex align-items-center justify-content-between" role="tab">
                <span class="body-2-bold flex-grow-1">{{ $t('auctions.list.collection') }}  ({{ collectionAuctionsCount }})</span>
                <div v-b-toggle.accordion-2 class="d-flex align-items-center justify-content-center p-1 collapase-icon">
                  <UpArrowIcon />
                </div>
              </b-card-header>
              <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                <b-card-body class="px-0">
                  <AuctionItems :key="currentWatchlist.id" :currentWatchlist="currentWatchlist" type="collection" />
                </b-card-body>
              </b-collapse>
            </b-card>
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
import { WATCHLIST_TYPE_AUCTION, WATCHLIST_TYPE_TRADE, WATCHLIST_PRIVACY_PRIVATE, WATCHLIST_PRIVACY_PUBLIC } from '~/static/constants'
import UpArrowIcon from '~/assets/img/icons/up-arrow.svg?inline'

export default {
  name: 'Watchlists',

  components: {
    CheckboxSwitch,
    ShareButton,
    CreateWatchlistModal,
    Button,
    UpArrowIcon,
    AuctionItems,
  },

  layout: 'Profile',

  middleware: 'auth',

  fetchOnServer: false,

  data() {
    return {
      currentWatchlist: null,
      shareDescription: this.$t('watchlists.share_description'),
      shareUrl: process.env.APP_URL + '/watchlist/',
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
    }
  },

  methods: {
    ...mapActions({
      fetchWatchlists: 'watchlist/fetchWatchlists',
      updateWatchlistPrivacy: 'watchlist/updateWatchlistPrivacy',
      changeWatchlistsType: 'watchlist/changeWatchlistsType',
    }),

    handleCreated(watchlist) {
      this.selectWatchlist(watchlist);
      this.$forceUpdate();
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
.mw-300px
  max-width: 300px

.mw-800px
  max-width: 800px
</style>
