<template>
  <div class="dashboard-products" :class="mobileClass">
    <section :class="mobileClass" class="row">
      <div class="col-3 col-md-3">
        <StatsCard
          :coloredText="false"
          :icon="require('~/assets/img/icons/profile/total-sales.svg')"
          :title="$tc('vendor_dashboard.total_sales', 1).toString()"
          :value="totalSales"
          color="#667799"
        />
      </div>
      <div class="col-3 col-md-3">
        <StatsCard
          :coloredText="false"
          :icon="require('~/assets/img/icons/profile/commision-pending.svg')"
          :title="
            $t(
              isScreenXS
                ? 'vendor_dashboard.pending_percentage'
                : 'vendor_dashboard.commision_pending'
            ).toString()
          "
          :value="commissionPending"
          color="#CE745F"
        />
      </div>
      <div class="col-3 col-md-3">
        <StatsCard
          :coloredText="false"
          :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
          :title="$t('vendor_dashboard.inventory')"
          :value="'' + analytics.inventory_amount"
          color="#7196B1"
        />
      </div>
      <div class="col-3 col-md-3">
        <StatsCard
          :coloredText="false"
          :icon="require('~/assets/img/icons/profile/item-sold.svg')"
          :title="$t('vendor_dashboard.items_sold')"
          :value="'' + analytics.items_sold"
          color="#909090"
        />
      </div>
    </section>

    <DashboardTopMovers :class="{
      'mt-29': !isScreenXS
    }"/>

    <DashboardVendorProducts/>
  </div>
</template>

<script>
import StatsCard from '~/components/common/DashbaordStatsCard'
import screenSize from '~/plugins/mixins/screenSize'
import DashboardTopMovers from '~/components/profile/vendor-dashboard/DashboardTopMovers';
import DashboardVendorProducts from '~/components/profile/vendor-dashboard/DashboardProducts';

export default {
  name: 'Products',
  components: {DashboardVendorProducts, DashboardTopMovers, StatsCard },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      analytics: {
        total_sales: 0,
        pending_commission: 0,
        inventory_amount: 0,
        items_sold: 0,
      },
    }
  },
  computed: {
    totalSales() {
      return this.$options.filters.toCurrency(
        parseInt(this.analytics.total_sales)
      )
    },
    commissionPending() {
      return this.$options.filters.toCurrency(
        parseInt(this.analytics.pending_commission)
      )
    },
  },
  mounted() {
    this.getAnalytics()
  },
  methods: {
    getAnalytics() {
      this.$axios
        .get('/dashboard/vendor/analytics')
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

<style scoped lang="sass">
@import "~/assets/css/variables"
.mt-29
  margin-top: 29px

.dashboard-products
  padding: 39px 30px

  &.mobile
    padding: 20px 16px
</style>
