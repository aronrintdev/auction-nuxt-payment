<template>
  <div class="pt-5 p-4">
    <div class="d-flex">
      <h1 class="fs-24 fw-7 mb-0 font-primary">
        {{ $t('buyer_dashboard.dashobard_buyer.dashboard') }}
      </h1>
    </div>
    <!-- stats cards -->
    <section class="row my-3 my-sm-5">
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/total-sales.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.total_purchases')"
          value="$234,076"
          color="#667799"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/commision-pending.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.rewards_points')"
          value="600"
          color="#CE745F"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.items_bought')"
          value="412"
          color="#7196B1"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/item-sold.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.offers_placed')"
          value="620"
          color="#909090"
        />
      </div>
    </section>
    <section>
      <BuyerDashboardCharts />
    </section>
    <section class="my-5">
      <Promotions />
    </section>
    <section>
      <div class="row my-5">
        <div class="col-md-3">
          <h1 class="font-secondary fs-24 fw-7 mb-0">
            {{ $t('buyer_dashboard.purchases.title') }}
          </h1>
        </div>
        <div class="col-md-6 d-flex justify-content-center">
          <NavGroup :value="activeNav" :data="menus" @change="navItem" />
        </div>
        <div class="col-md-3 d-flex justify-content-end align-items-center">
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
            >{{ $t('vendor_dashboard.view_all') }}</a
          >
        </div>
      </div>
      <div class="my-5">
        <Purchases />
      </div>
    </section>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import StatsCard from '~/components/common/DashbaordStatsCard'
import Purchases from '~/components/profile/buyer-dashboard/Purchases'
import BuyerDashboardCharts from '~/components/profile/buyer-dashboard/BuyerDashboardCharts'
import Promotions from '~/components/profile/buyer-dashboard/Promotions'
export default {
  name: 'BuyerDashboard',
  components: {
    NavGroup,
    Promotions,
    Purchases,
    StatsCard,
    BuyerDashboardCharts,
  },
  layout: 'Profile',
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: 'all',
      // Menus for tabs
      menus: [
        { label: this.$t('vendor_dashboard.all'), value: 'all' },
        { label: this.$t('vendor_dashboard.footwear'), value: 'footwear' },
        { label: this.$t('vendor_dashboard.apparel'), value: 'apparel' },
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: 'accessories',
        },
      ],
    }
  },
  methods: {
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
    },
  },
}
</script>
