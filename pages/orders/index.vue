<template>
  <div class="container-fluid p-md-5 p-3">
    <div class="row">
      <div class="orders-heading w-100 order-md-0 order-3">
        {{ $t('orders.orders') }} ({{ totalOrders }})
      </div>
      <div class="w-100 order-md-1 order-1">
        <overview-component></overview-component>
      </div>
      <div class="w-100 pt-20 order-md-2 order-2">
        <top-movers-carousel></top-movers-carousel>
      </div>
      <div class="w-100 py-20 order-md-3 order-0">
        <top-movers-filter></top-movers-filter>
      </div>
      <div class="w-100 py-20 order-md-4 order-4">
        <top-movers-list-component></top-movers-list-component>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
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
  computed: {
    ...mapGetters('vendors', [
      'totalOrders'
    ])
  },
  async mounted() {
    this.loadingFilter = true
    await this.getVendorsOrders(1)
    await this.fetchCategories()
    await this.fetchFilters()
    this.loadingFilter = false
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
  @include body-16
  letter-spacing: -0.02em
  text-transform: capitalize

.pt-20
  padding-top: 20px

.py-20
  padding: 20px 0

@media (max-width: 992px)
  .orders-heading
    font-family: $font-montserrat
    padding-top: 16px
    @include body-11-bold

  .py-20
    padding: 0
  .pt-20
    padding-top: 0

</style>
