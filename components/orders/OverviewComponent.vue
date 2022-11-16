<template>
  <div>
    <h1 class="overview-heading px-md-2">{{ $t('orders.overview') }}</h1>
    <div class="row mx-0 justify-content-between box-gap">
      <overview-box :label="$t('orders.total_sales').toString()" :value="totalSalesStr"
                    :icon="require('~/assets/img/orders/total-sales.svg')"></overview-box>
      <overview-box :label="labelCommissionPending" :value="commissionPendingStr"
                    :icon="require('~/assets/img/orders/commission-pending.svg')"></overview-box>
      <overview-box :label="$t('orders.inventory').toString()" :value="inventoryCount.toString()"
                    :icon="require('~/assets/img/orders/inventory.svg')"></overview-box>
      <overview-box :label="$t('orders.items_sold').toString()" :value="totalOffers.toString()"
                    :icon="require('~/assets/img/orders/offers.svg')"></overview-box>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import OverviewBox from '~/components/orders/OverviewBox'
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'OverviewComponent',
  components: {
    OverviewBox
  },
  mixins:[screenSize],
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
    },
    labelCommissionPending(){
      if(this.isScreenXS){
        return this.$t('orders.pending').toString()
      }
      return this.$t('orders.commission_pending').toString()
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
  margin-top: 26px
  margin-bottom: 15px

@media (max-width: 992px)
  .overview-heading
    font-family: $font-montserrat
    @include body-5
    text-transform: capitalize

  .justify-content-between
    justify-content: stretch !important
    align-content: stretch

  .row
    flex-wrap: nowrap !important

@media (min-width: 993px)
  .box-gap
    gap: 25px

</style>
