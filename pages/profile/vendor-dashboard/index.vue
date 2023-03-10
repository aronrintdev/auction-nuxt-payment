<template>
  <client-only>
    <div class="dashboard" :class="mobileClass">
      <div class="d-flex justify-content-between align-items-baseline">
        <h1 class="heading-1-bold d-none d-sm-block">
          {{ $t('vendor_dashboard.title') }}
        </h1>
        <div
          class="d-flex gap-2 align-items-center justify-content-sm-start full-width-sm"
          :class="{
            'justify-content-between': isScreenXS,
          }"
        >
          <h3
            :class="mobileClass"
            class="medal-badge body-5-medium mb-0 bg-white br-10 px-3 py-2 d-flex align-items-center"
          >
            <img
              :src="
                require(`~/assets/img/icons/${
                  vendor.rank ? vendor.rank.toLowerCase() : 'bronze'
                }-badge.svg`)
              "
              aria-hidden="true"
              class="mr-2"
            />
            {{ vendor.rank }} {{ $t('vendor_dashboard.seller') }}
          </h3>
          <a
            class="font-secondary fs-14 fw-5 mb-0 text-decoration-underline text-link-blue-mobile font-primary"
            role="button"
            @click="detailsMenu = true"
            >{{ $t('vendor_dashboard.view_details') }}</a
          >
        </div>
      </div>

      <!-- stats cards -->
      <section :class="mobileClass" class="row my-3 my-sm-5">
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
      <!-- charts  -->
      <VendorDashboardCharts />
      <!-- top products  -->
      <section>
        <TopProducts />
      </section>
      <!-- orders  -->
      <section>
        <Orders />
      </section>
      <Portal to="page-title"> Dashboard </Portal>
      <Portal to="cart-icon-slot">
        <img
          height="22px"
          :src="require('~/assets/img/home/sidebar/cart-outline-rounded.svg')"
          alt="..."
        />
      </Portal>
      <Portal to="back-icon-slot">
        <b-navbar-toggle target="top-menu-sidebar">
          <template #default>
            <img
              width="17px"
              height="16px"
              :src="
                require('~/assets/img/icons/side-menu/hamburger-menu-rounded.svg')
              "
              alt="..."
            />
          </template>
        </b-navbar-toggle>
      </Portal>

      <VendorDetails
        v-if="vendor && !isScreenXS"
        :is-open="detailsMenu"
        :vendor="vendor"
        @closed="detailsMenu = false"
        @opened="detailsMenu = true"
      />
      <MobileVendorDetails
        v-if="vendor && isScreenXS"
        :is-open="detailsMenu"
        :vendor="vendor"
        @closed="detailsMenu = false"
        @opened="detailsMenu = true"
      /></div
  ></client-only>
</template>
<script>
import StatsCard from '~/components/common/DashbaordStatsCard'
import TopProducts from '~/components/profile/vendor-dashboard/TopProductsTable'
import VendorDashboardCharts from '~/components/profile/vendor-dashboard/VendorDashboardCharts'
import Orders from '~/components/profile/vendor-dashboard/Orders'
import VendorDetails from '~/components/profile/vendor-dashboard/VendorDetails'
import MobileVendorDetails from '~/components/profile/vendor-dashboard/MobileVendorDetails'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'VendorDashboard',
  components: {
    MobileVendorDetails,
    VendorDetails,
    TopProducts,
    StatsCard,
    Orders,
    VendorDashboardCharts,
  },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      detailsMenu: false,
      // Menus for tabs
      analytics: {
        total_sales: 0,
        pending_commission: 0,
        inventory_amount: 0,
        items_sold: 0,
      },
      vendor: {},
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
    this.getVendor()
  },
  methods: {
    // On Tab Change (All/ Footwear/ Apparel/ Accessories)
    navItem(val) {
      this.activeNav = val
    },
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
    getVendor() {
      this.$axios
        .get('/vendors')
        .then((res) => {
          this.vendor = res.data.data
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
.dashboard
  padding: 65px 30px 0 30px
  &.mobile
    padding: 10px 16px 0px 16px
    margin-bottom: -60px

.medal-badge
  &.mobile
    box-shadow: 0px 1px 4px rgba($color-black-1, 0.25)
    border-radius: 8px

.row
  &.mobile
    .col-3
      padding-inline: 4px

@media (max-width: 576px)
  .view-details-link
    font-size: 10px
    font-weight: $medium
  .orders-heading
    font-size: 14px
    font-family: $font-family-base
    font-weight: $medium
</style>
