<template>
  <div>
    <div class="border round-box mb-3">
      <div class="px-5 py-4 details-box">
        <div class="pl-4 details-box-header">{{ $t('orders.order_details') }}:</div>
        <div class="pl-5 pt-3">
          <div class="text-capitalize">{{ $t('orders.order_type') }}: {{ order.type.label }}</div>
          <div>{{ $t('orders.total_earnings') }}: ${{ order.vendor_commission | formatPrice }}</div>
        </div>
      </div>
    </div>

    <div class="border round-box mb-3">
      <div class="px-5 py-4 details-box">
        <div class="pl-4 details-box-header">{{ $t('orders.commission_payout') }}:</div>
        <div class="pl-5 pt-3">
          <div>{{ $t('orders.status') }}: {{ order.status }}</div>
          <div>{{ $t('orders.total_earnings') }}: ${{ order.vendor_commission | formatPrice }}</div>
        </div>
      </div>
    </div>

    <div class="border round-box">
      <div class="px-5 py-4 details-box">
        <div class="pl-4 details-box-header">{{ $t('orders.commission_details') }}:</div>
        <div class="pl-5 pt-3">
          <!--todo values are static for now need to update after the API updated-->
          <div>{{ $t('orders.vendor_ranking') }}: 87%</div>
          <div>{{ $t('orders.commission_amount') }}: 90% {{ $t('orders.and') }} $5.00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderCommission',
  props: {
    order: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.details-box
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  font-size: 16px
  line-height: 28px
  color: $color-gray-5

  .details-box-header
    font-weight: $bold
    font-size: 20px
    color: $color-black-1

.round-box
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px

</style>
