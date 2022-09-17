<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <top-tab-bar
              :current="currentTab"
              :tabs="tabsData"
              @tabChanged="tabChanged"
            />
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <section class="content">
      <div class="container-fluid">
        <!-- Small boxes (Stat box) -->

        <!-- /.row -->
        <!-- Main row -->
        <div class="row">
          <!-- Left col -->
          <section class="col-lg-12 connectedSortable">
            <sell-summary v-if="currentTab === 'summary'" />
            <sell-inventory v-if="currentTab === 'inventory'" />
            <sell-orders v-if="currentTab === 'orders'" />
            <sell-settings v-if="currentTab === 'settings'" />
          </section>
        </div>
        <!-- /.row (main row) -->
      </div>
      <!-- /.container-fluid -->
    </section>
    <!-- /.content -->
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

import SellSummary from '~/pages/Sell/Summary.vue'
import SellOrders from '~/pages/Sell/Orders.vue'
import SellInventory from '~/pages/Sell/Inventory.vue'
import SellSettings from '~/pages/Sell/Settings.vue'
import TopTabBar from '~/components/Sell/TopTabBar.vue'

/* Sell page */
export default {
  name: 'Sell',
  components: {
    TopTabBar,
    SellOrders,
    SellSummary,
    SellInventory,
    SellSettings,
  },
  layout: 'Profile', // Layout
  middleware: 'auth', // only authenticated users
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      currentTab: 'summary', // Current active tab
      tabsData: [
        {
          id: 'summary',
          label: this.$t('sell.top_tab_bar.summary'),
        },
        {
          id: 'inventory',
          label: this.$t('sell.top_tab_bar.inventory'),
        },
        {
          id: 'orders',
          label: this.$t('sell.top_tab_bar.orders'),
        },
        {
          id: 'settings',
          label: this.$t('sell.top_tab_bar.settings'),
        },
      ],
    }
  },
  // get current language
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    // tabbar "Change" event listener
    tabChanged(current) {
      this.currentTab = current
    },
  },
}
</script>
