<template>
  <div class="order-commission">
    <div class="border round-box mb-3">
      <div class="details-box">
        <div class="details-box-header">{{ $t('orders.order_details') }}:</div>
        <div class="details-box-body">
          <div class="text-capitalize"><span>{{ $t('orders.order_type') }}: </span><span>{{ order.type.label }}</span>
          </div>
          <div><span>{{ $t('orders.total_earnings') }}:</span> <span>${{ commissionAmount | formatPrice }}</span>
          </div>
          <div class="d-flex d-sm-none"><span>{{ $t('orders.sold_items') }}:</span> <span>{{
              order.items.length
            }}</span></div>
          <div class="d-flex d-sm-none"><span>{{ $t('orders.ordered_on') }}:</span>
            <span>{{ new Date(order.created_at) | formatDateTimeString }}</span></div>
        </div>
      </div>
    </div>

    <div v-if="isBuy" class="border round-box mb-3">
      <div class="details-box">
        <div class="details-box-header">{{ $t('orders.commission_payout') }}:</div>
        <div class="details-box-body">
          <div><span>{{ $t('orders.status') }}:</span> <span>{{ order.status }}</span></div>
          <div><span>{{ $t('orders.total_earnings') }}:</span> <span>${{ commissionAmount | formatPrice }}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isBuy" class="border round-box">
      <div class="details-box">
        <div class="details-box-header">{{ $t('orders.commission_details') }}:</div>
        <div class="details-box-body">
          <div><span>{{ $t('orders.vendor_ranking') }}:</span> <span> {{ vendorRanking }}</span></div>
          <div><span>{{ $t('vendor_dashboard.seller_fee') }}:</span> <span>{{commissionType}}</span></div>
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
    },
    item: {
      type: Object,
      default: null
    }
  },
  computed: {
    isTrade() {
      return this.order.type.label === 'trade'
    },
    isBuy() {
      return this.order.type.label === 'buy'
    },
    commissionAmount() {
      return this.item.commission?.commission || 0
    },
    vendorRanking() {
      return this.item?.commission?.vendor?.rank || 0
    },
    commissionType(){
      return this.item.commission?.commission_type_string
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.order-commission
  .details-box
    padding: 1.5rem 3rem
    font-family: $font-family-sf-pro-display
    @include body-4-normal
    line-height: 28px
    color: $color-gray-5

    .details-box-header
      padding-left: 1.5rem
      @include body-2-bold
      color: $color-black-1

    .details-box-body
      padding-left: 3rem
      padding-top: 1rem

  .round-box
    background: $color-white-1
    border: 1px solid $color-gray-60
    border-radius: 10px

@media (max-width: 992px)
  .order-commission
    margin: 10px 0
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px

    .border
      border: none !important
      border-radius: 0
      border-bottom: 1px solid rgba(196, 196, 196, 0.17) !important

      &:first-child
        border-radius: 10px 10px 0 0

      &:last-child
        border-radius: 0 0 10px 10px
        border: none !important

    .details-box
      padding: 0
      font-size: 14px

      .details-box-header
        padding: 10px 20px
        @include body-5-medium

      .details-box-body
        padding: 0 20px 10px 20px

        div
          display: flex
          justify-content: space-between

          span:first-child
            font-weight: $normal

          span:last-child
            font-weight: $regular

</style>
