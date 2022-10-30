<template>
  <div>
    <h1 class="overview-heading">{{ $t('orders.overview') }}</h1>
    <div class="row justify-content-between">
      <overview-box :label="$t('orders.total_sales').toString()" :value="totalSalesStr"
                    :icon="require('~/assets/img/orders/total-sales.svg')"></overview-box>
      <overview-box :label="$t('orders.commission_pending').toString()" :value="commissionPendingStr"
                    :icon="require('~/assets/img/orders/commission-pending.svg')"></overview-box>
      <overview-box :label="$t('orders.inventory').toString()" :value="inventoryCount.toString()"
                    :icon="require('~/assets/img/orders/inventory.svg')"></overview-box>
      <overview-box :label="$t('orders.offers').toString()" :value="totalOffers.toString()"
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
      'totalCommissionPending',
      'totalCommissionPaid',
      'inventoryCount',
      'totalOffers'
    ]),
    totalSalesStr(){
      return '$'+(this.totalCommissionPaid / 100).toFixed(2)
    },
    commissionPendingStr(){
      return '$'+(this.totalCommissionPending / 100).toFixed(2)
    }
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
    color: $color-red-26

  .justify-content-between
    justify-content: stretch !important
    align-content: stretch

  .row
    flex-wrap: nowrap !important
</style>
