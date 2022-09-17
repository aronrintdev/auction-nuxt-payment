<template>
  <div>
    <div class="wrapper">
      <section class="content p-4">
        <div class="container-fluid">
          <div
            class="row justify-content-between align-items-end auctions-header"
          >
            <top-tab-bar
              :current="currentTab"
              :tabs="tabsDataForAuctioners"
              align="center"
              @change="tabChanged"
            />
          </div>
          <div class="row">
            <auctioner-bids v-if="currentTab === 'bids'"></auctioner-bids>
            <auctioner-inventory
              v-if="currentTab === 'auctioner-inventory'"
            ></auctioner-inventory>
            <auctioner-delisted
              v-if="currentTab === 'auctioner-delisted'"
            ></auctioner-delisted>
          </div>
        </div>
      </section>
      <aside class="control-sidebar control-sidebar-dark"></aside>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TopTabBar from '~/components/TopTabBar.vue'
import AuctionerBids from '~/components/Auctions/AuctionerBids.vue'
import AuctionerInventory from '~/components/Auctions/AuctionerInventory.vue'
import AuctionerDelisted from '~/components/Auctions/AuctionerDelisted.vue'

export default {
  name: 'Auctions',
  components: {
    TopTabBar,
    AuctionerBids,
    AuctionerInventory,
    AuctionerDelisted,
  },
  layout: 'Profile', // Layout
  middleware: 'auth',
  data() {
    return {
      currentTab: 'bids',
      tabsData: [
        {
          id: 'live',
          label: this.$t('auctions.tabbar.active'),
        },
        {
          id: 'bidding_history',
          label: this.$t('auctions.tabbar.bidding_history'),
        },
        {
          id: 'inventory',
          label: this.$t('auctions.tabbar.inventory'),
        },
        {
          id: 'delisted',
          label: this.$t('auctions.tabbar.delisted'),
        },
        {
          id: 'wishlist',
          label: this.$t('auctions.tabbar.wishlist'),
        },
      ],
      tabsDataForAuctioners: [
        {
          id: 'bids',
          label: this.$t('auctions.tabbar.bids'),
        },
        {
          id: 'auctioner-inventory',
          label: this.$t('auctions.tabbar.inventory'),
        },
        {
          id: 'auctioner-delisted',
          label: this.$t('auctions.tabbar.delisted'),
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    // Set current active tab
    tabChanged(value) {
      this.currentTab = value
    },
  },
}
</script>
