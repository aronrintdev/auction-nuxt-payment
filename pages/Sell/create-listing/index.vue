<template>
  <div>
    <!-- Content Header (Page header) -->
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-12">
            <create-listing-tabbar
              :current="currentTab"
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
            <sell-create-listing v-if="currentTab == 'create_listing'" />
            <sell-sell-now v-if="currentTab == 'sell_now'" />
            <sell-create-inventory v-if="currentTab == 'create_inventory'" />
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

// Sell Pages
import SellCreateListing from './CreateListing.vue'
import SellSellNow from './SellNow.vue'
import SellCreateInventory from './CreateInventory.vue'
import CreateListingTabbar from '~/components/Sell/CreateListingTabbar.vue'

export default {
  components: {
    SellCreateListing,
    SellSellNow,
    CreateListingTabbar,
    SellCreateInventory,
  },
  layout: 'Profile', // Layout
  middleware: 'auth', // only authenticated users
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      currentTab: 'create_listing', // Current active tab
    }
  },
  computed: {
    ...mapGetters(['getLang']),
  },
  methods: {
    // Tabs changed
    tabChanged(current) {
      this.currentTab = current
    },
  },
}
</script>
