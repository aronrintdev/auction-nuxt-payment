<template>
  <div class="dashboard pt-5 p-4">
    <div class="d-flex justify-content-between align-items-baseline">
      <h1 class="fs-24 fw-7 mb-0 font-primary">
        {{ $t('vendor_dashboard.title') }}
      </h1>
      <div class="d-flex gap-2 align-items-center">
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
          class="font-secondary fs-14 fw-5 mb-0 border-bottom border-primary font-primary"
          href="#"
          >{{ $t('vendor_dashboard.view_details') }}</a
        >
      </div>
    </div>

    <!-- stats cards -->
    <section class="row my-5">
      <div class="col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/total-sales.svg')"
          :title="$t('vendor_dashboard.total_sales')"
          value="$234,076"
        />
      </div>
      <div class="col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/commision-pending.svg')"
          :title="$t('vendor_dashboard.commision_pending')"
          value="$234,076"
        />
      </div>
      <div class="col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
          :title="$t('vendor_dashboard.inventory')"
          value="$234,076"
        />
      </div>
      <div class="col-md-3">
        <StatsCard
          :icon="require('~/assets/img/icons/profile/item-sold.svg')"
          :title="$t('vendor_dashboard.items_sold')"
          value="$234,076"
        />
      </div>
    </section>
    <!-- charts  -->
    <VendorDashboardCharts />
    <!-- top products  -->
    <section>
      <div class="row my-5">
        <div class="col-md-3">
          <h1 class="font-secondary fs-24 fw-7 mb-0">
            {{ $t('vendor_dashboard.top_products') }}
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
        <TopProducts />
      </div>
    </section>
    <!-- orders  -->
    <section>
      <div class="row my-5">
        <div class="col-md-3">
          <h1 class="font-secondary fs-24 fw-7 mb-0">
            {{ $t('vendor_dashboard.orders') }}
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
