<template>
  <div>
    <h1 class="overview-heading">{{ $t('orders.overview') }}</h1>
    <div class="row justify-content-between">
      <overview-box :label="$t('orders.total_sales').toString()" :value="(totalSales/100)"
                    :icon="require('~/assets/img/orders/total-sales.svg')"></overview-box>
      <overview-box :label="$t('orders.commission_pending').toString()" :value="(totalCommissionPending/100)"
                    :icon="require('~/assets/img/orders/commission-pending.svg')"></overview-box>
      <overview-box :label="$t('orders.inventory').toString()" :value="inventoryCount"
                    :icon="require('~/assets/img/orders/inventory.svg')"></overview-box>
      <overview-box :label="$t('orders.offers').toString()" :value="totalOffers"
                    :icon="require('~/assets/img/orders/offers.svg')"></overview-box>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import OverviewBox from '~/components/orders/OverviewBox'

export default {
  name: 'OverviewComponent',
  components: {
    OverviewBox
  },
  computed: {
    ...mapGetters('vendors', [
      'totalSales',
      'totalCommissionPending',
      'inventoryCount',
      'totalOffers'
    ])
  },
}
</script>

<style lang="sass" scoped>
@import '/assets/css/variables'

.overview-heading
  font-family: $font-family-sf-pro-display
  @include body-15-bold
  text-transform: uppercase
  margin: 30px 0

.box-gap
  gap: 30px

@media (max-width: 992px)
  .overview-heading
    font-family: $font-montserrat
    @include body-5
    text-transform: capitalize

  ::v-deep .overview-box:nth-child(1) .box-value
    color: $color-blue-20

  ::v-deep .overview-box:nth-child(2) .box-value
    color: $color-orange-11

  ::v-deep .overview-box:nth-child(3) .box-value
    color: $color-blue-19

  ::v-deep .overview-box:nth-child(4) .box-value
    color: $color-red-24
</style>
