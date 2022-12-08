<template>
  <div class="dashboard-products" :class="mobileClass">
    <div
        v-if="isScreenXS"
        class="d-flex align-items-center justify-content-between mb-29"
    >
      <MobileSearchInput
          :value="searchValue"
          class="w-100"
          @input="handleSearch"
      />
      <filter-svg
          class="ml-3"
          role="button"
          @click="mobileFiltersOpen = !mobileFiltersOpen"
      ></filter-svg>
    </div>

    <div v-if="isScreenXS" class="body-5-bold font-primary text-black mb-23">
      {{$t('vendor_dashboard.breakdown.overview')}}
    </div>
    <section :class="mobileClass" class="row">
      <div class="col-3 col-md-3">
        <StatsCard
            :show-icon="!isScreenXS"
            :coloredText="isScreenXS"
            :icon="require('~/assets/img/icons/profile/total-sales.svg')"
            :title="$tc('vendor_dashboard.total_sales', 1).toString()"
            :value="totalSales"
            color="#667799"
        />
      </div>
      <div class="col-3 col-md-3">
        <StatsCard
            :show-icon="!isScreenXS"
            :coloredText="isScreenXS"
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
            :show-icon="!isScreenXS"
            :coloredText="isScreenXS"
            :icon="require('~/assets/img/icons/profile/inventory-icon.svg')"
            :title="$t('vendor_dashboard.inventory')"
            :value="'' + analytics.inventory_amount"
            color="#7196B1"
        />
      </div>
      <div class="col-3 col-md-3">
        <StatsCard
            :show-icon="!isScreenXS"
            :coloredText="isScreenXS"
            :icon="require('~/assets/img/icons/profile/item-sold.svg')"
            :title="$t('vendor_dashboard.items_sold')"
            :value="'' + analytics.items_sold"
            color="#909090"
        />
      </div>
    </section>

    <DashboardTopMovers :class="{
      'mt-29': !isScreenXS,
      'mt-46': isScreenXS
    }"/>

    <DashboardVendorProducts :filter-search="searchValue" :filter-sort="sortbySelected"/>
    <MobileBottomSheet
        :height="'60%'"
        :open="mobileFiltersOpen"
        :title="$t('common.filter_by').toString()"
        @closed="mobileFiltersOpen = false"
        @opened="mobileFiltersOpen = true"
    >
      <template #default>
        <div
            class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters"
        >
          <div class="d-flex flex-column w-100">
            <FilterAccordion
                :open="true"
                :title="$t('orders.sort').toString()"
            >
              <b-form-radio-group
                  v-model="sortbySelected"
                  :options="sortOptions"
                  class="d-flex flex-column mt-2 sort-filters"
                  @change="mobileFiltersOpen = false"
              >
              </b-form-radio-group>
            </FilterAccordion>
          </div>
        </div>
      </template>
    </MobileBottomSheet>
  </div>
</template>

<script>
import StatsCard from '~/components/common/DashbaordStatsCard'
import screenSize from '~/plugins/mixins/screenSize'
import DashboardTopMovers from '~/components/profile/vendor-dashboard/DashboardTopMovers';
import DashboardVendorProducts from '~/components/profile/vendor-dashboard/DashboardProducts';
import MobileSearchInput from '~/components/mobile/MobileSearchInput';
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet';
import FilterAccordion from '~/components/mobile/FilterAccordion';

export default {
  name: 'Products',
  components: {
    FilterAccordion,
    MobileBottomSheet, MobileSearchInput, DashboardVendorProducts, DashboardTopMovers, StatsCard, filterSvg },
  mixins: [screenSize],
  layout: 'Profile',
  data() {
    return {
      mobileFiltersOpen: false,
      analytics: {
        total_sales: 0,
        pending_commission: 0,
        inventory_amount: 0,
        items_sold: 0,
      },
      sortbySelected: 'recent_to_old',
      searchValue: '',
      sortOptions: [
        {
          value: 'recent_to_old',
          text: this.$t('vendor_purchase.purchase_recent_to_old'),
        },
        {
          value: 'old_to_recent',
          text: this.$t('vendor_purchase.purchase_oldest_to_recent'),
        },
      ]
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
    handleSearch(value) {
      this.searchValue = value
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
  },
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.mb-29
  margin-bottom: 29px

.filters
  padding: 28px 21px

::v-deep.sort-filters
  .custom-control
    display: flex
    align-items: center

    label
      @include body-5-normal
      padding-top: 3px
      font-family: $font-family-sf-pro-display
      font-style: normal
      color: $color-black-9

      &:before
        color: $color-black-1
        border-color: $color-black-1
        background-color: $color-white-1
        box-shadow: none

::v-deep.sort-filters
  .custom-control-input
    &:checked ~ .custom-control-label::after
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='4' fill='%23000'/%3E%3C/svg%3E")

.mb-23
  margin-bottom: 23px

.mt-29
  margin-top: 29px

.mt-46
  margin-top: 46px

.dashboard-products
  padding: 39px 30px

  &.mobile
    padding: 20px 16px
</style>
