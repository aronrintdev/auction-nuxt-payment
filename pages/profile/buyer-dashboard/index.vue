<template>
  <div class="pt-2 pt-sm-5 px-4">
    <div class="d-sm-flex d-none">
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
          :value="'$' + analytics.total_purchases"
          color="#667799"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/commision-pending.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.rewards_points')"
          :value="'' + analytics.reward_points"
          color="#CE745F"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.items_bought')"
          :value="'' + analytics.items_bought"
          color="#7196B1"
        />
      </div>
      <div class="col-6 col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/item-sold.svg')"
          :title="$t('buyer_dashboard.dashobard_buyer.offers_placed')"
          :value="'' + analytics.offers_placed"
          color="#909090"
        />
      </div>
    </section>
    <section>
      <BuyerDashboardCharts />
    </section>
    <section class="my-sm-5">
      <Promotions />
    </section>
    <section>
      <Purchases />
    </section>
  </div>
</template>
<script>
import StatsCard from '~/components/common/DashbaordStatsCard'
import Purchases from '~/components/profile/buyer-dashboard/Purchases'
import BuyerDashboardCharts from '~/components/profile/buyer-dashboard/BuyerDashboardCharts'
import Promotions from '~/components/profile/buyer-dashboard/Promotions'
export default {
  name: 'BuyerDashboard',
  components: {
    Promotions,
    Purchases,
    StatsCard,
    BuyerDashboardCharts,
  },
  layout: 'Profile',
  meta: {
    pageTitle: 'Dashboard',
  },
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: 'all',
      analytics: {
        total_sales: 0,
        pending_commission: 0,
        inventory_amount: '2116448',
        items_sold: 0,
      },
      rewards: [],
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
  mounted() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.$axios
        .get('/dashboard/buyer/analytics')
        .then((res) => {
          this.analytics = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 576px)
  .purchases
    font-size: 14px
    font-weight: $bold
    color: $color-gray-69
    width: 100%
</style>
