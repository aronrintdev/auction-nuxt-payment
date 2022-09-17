<template>
  <div class="container-fluid vd-purchases-section p-0">
    <div class="row h-100">
      <div class="col-md-12 col-lg-12 vendor-dashboard-body px-5 py-5">
        <!-- Row (Heading/ Search Fields/ Tabs) -->
        <div class="row vd-purchase-css">
          <!-- Heading -->
          <div class="col-12 orders-heading">
            {{ $t('orders.orders') }} ({{ totalOrders }})
          </div>
          <!-- ./Heading -->
        </div>
        <div>
          <overview-component></overview-component>
        </div>
        <div class="pt-20">
          <top-movers-carousel></top-movers-carousel>
        </div>
        <div class="py-20">
          <top-movers-filter></top-movers-filter>
        </div>
        <div class="py-20">
          <top-movers-list-component></top-movers-list-component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import OverviewComponent from '~/components/orders/OverviewComponent'
import TopMoversFilter from '~/components/orders/TopMoversFilter';
import TopMoversListComponent from '~/components/orders/TopMoversListComponent';
import TopMoversCarousel from '~/components/orders/TopMoversCarousel';

export default {
  name: 'OrdersPage',
  components: {
    TopMoversListComponent,
    OverviewComponent,
    TopMoversFilter,
    TopMoversCarousel
  },
  layout: 'Profile',
  middleware: 'auth',
  async fetch() {
    this.loadingFilter = true
    await this.getVendorsOrders(1)
    await this.fetchCategories()
    await this.fetchFilters()
    this.loadingFilter = false
  },
  computed: {
    ...mapGetters('vendors', [
      'totalOrders'
    ])
  },
  methods: {
    ...mapActions({
      'getVendorsOrders': 'vendors/getVendorOrders',
      'fetchCategories': 'vendors/fetchCategories',
      'fetchFilters': 'browse/fetchFilters'
    })
  }
}
</script>

<style lang="sass" scoped>
@import '/assets/css/variables'

.orders-heading
  font-family: $font-family-base
  font-weight: $bold
  font-size: 30px
  line-height: 37px
  letter-spacing: -0.02em
  text-transform: capitalize

.pt-20
  padding-top: 20px

.py-20
  padding: 20px 0
</style>
