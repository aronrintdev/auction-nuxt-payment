<template>
  <div class="dashboard pt-3 pt-sm-5 p-4">
    <div class="d-flex justify-content-between align-items-baseline">
      <h1 class="fs-24 fw-7 mb-0 font-primary d-none d-sm-block">
        {{ $t('vendor_dashboard.title') }}
      </h1>
      <div
        class="d-flex gap-2 align-items-center justify-content-between justify-content-sm-start full-width-sm"
      >
        <h3
          class="font-secondary fs-14 fw-6 mb-0 bg-white br-10 px-4 py-2 d-flex align-items-center border shadow-sm"
        >
          <img
            :src="require('~/assets/img/icons/bronze-badge.svg')"
            aria-hidden="true"
            class="mr-2"
          />
          {{ $t('vendor_dashboard.bronze_seller') }}
        </h3>
        <a
          class="font-primary fs-14 fw-5 mb-0 border-bottom border-primary font-primary view-details-link"
          href="#"
          >{{ $t('vendor_dashboard.view_details') }}</a
        >
      </div>
    </div>

    <!-- stats cards -->
    <section class="row my-3 my-sm-5">
      <div class="col-6 col-sm-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/total-sales.svg')"
          :title="$tc('vendor_dashboard.total_sales', 1)"
          value="$234,076"
          color="#667799"
        />
      </div>
      <div class="col-6 col-sm-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/commision-pending.svg')"
          :title="$t('vendor_dashboard.commision_pending')"
          value="$670"
          color="#CE745F"
        />
      </div>
      <div class="col-6 col-sm-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
          :title="$t('vendor_dashboard.inventory')"
          value="1274"
          color="#7196B1"
        />
      </div>
      <div class="col-6 col-sm-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/item-sold.svg')"
          :title="$t('vendor_dashboard.items_sold')"
          value="177"
          color="#909090"
        />
      </div>
    </section>
    <!-- charts  -->
    <VendorDashboardCharts />
    <!-- top products  -->
    <section>
      <div class="row my-0 my-sm-5">
        <div class="col-6 col-md-3">
          <h1 class="font-secondary fs-24 fw-7 mb-0 d-none d-sm-block">
            {{ $t('vendor_dashboard.top_products') }}
          </h1>
          <h1 class="font-primary fs-14 fw-6 mb-0 d-block d-sm-none">
            {{ $tc('common.product', 2) }}
          </h1>
        </div>
        <div class="d-none col-md-6 d-sm-flex justify-content-center">
          <NavGroup :value="activeNav" :data="menus" @change="navItem" />
        </div>
        <div
          class="col-6 col-md-3 justify-content-end align-items-center d-none d-sm-flex"
        >
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
            >{{ $t('vendor_dashboard.view_all') }}</a
          >
        </div>
        <div
          class="col-6 col-md-3 d-flex d-sm-none justify-content-end align-items-center"
        >
          <i class="fa fa-eye text-gray mr-2" aria-hidden="true"></i>
          <a href="#" class="font-primary text-dark fs-12 fw-5 mb-0">{{
            $t('vendor_dashboard.view_all')
          }}</a>
        </div>
      </div>
      <div>
        <TopProducts />
      </div>
    </section>
    <!-- orders  -->
    <section>
      <div class="row my-sm-5">
        <div class="col-6 col-md-3">
          <h1 class="font-secondary fs-24 fw-7 mb-0 orders-heading">
            {{ $t('vendor_dashboard.orders') }}
          </h1>
        </div>
        <div class="col-md-6 d-none d-sm-flex justify-content-center">
          <NavGroup :value="activeNav" :data="menus" @change="navItem" />
        </div>
        <div
          class="col-md-3 d-none d-sm-flex justify-content-end align-items-center"
        >
          <a
            href="#"
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0"
            >{{ $t('vendor_dashboard.view_all') }}</a
          >
        </div>
        <div
          class="col-6 col-md-3 d-flex d-sm-none justify-content-end align-items-center"
        >
          <i class="fa fa-eye text-gray mr-2" aria-hidden="true"></i>
          <a href="#" class="font-primary text-dark fs-12 fw-5 mb-0">{{
            $t('vendor_dashboard.view_all')
          }}</a>
        </div>
      </div>
      <div class="my-sm-5">
        <Orders />
      </div>
    </section>
  </div>
</template>
<script>
import NavGroup from '~/components/common/NavGroup.vue'
import StatsCard from '~/components/common/DashbaordStatsCard'
import TopProducts from '~/components/profile/vendor-dashboard/TopProductsTable'
import VendorDashboardCharts from '~/components/profile/vendor-dashboard/VendorDashboardCharts'
import Orders from '~/components/profile/vendor-dashboard/Orders'
export default {
  name: 'VendorDashboard',
  meta: {
    pageTitle: 'Dashboard',
  },
  components: {
    NavGroup,
    TopProducts,
    StatsCard,
    Orders,
    VendorDashboardCharts,
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
<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 576px)
  .view-details-link
    font-size: 10px
    font-weight: $medium
  .orders-heading
    font-size: 14px
    font-family: $font-family-base
    font-weight: $medium
</style>
