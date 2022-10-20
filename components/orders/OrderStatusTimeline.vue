<template>
  <div class="border round-box order-status-timeline">
    <div class="d-block d-sm-none py-3 pad-x">
      <order-summary :item="item" :order="order"/>
    </div>
    <div class="border-bottom border-top order-status pad-x">
      <div class="order-status-header mb-3">{{ $t('orders.order_status') }}: {{ item.status_label }}</div>
      <div v-if="item.status!=='processing'" class="tracking">
        <div><span>{{ $t('orders.shipping_carrier') }}:</span> <span>{{ shippingMethod }}</span></div>
        <div><span>{{ $t('orders.tracking_number') }}:</span> <a target="_blank" :href="trackingUrl">{{
            trackingNo
          }}</a></div>
      </div>
    </div>
    <div class="pad pad-x">
      <OrderTimeline
        :timeline="timelineData"
        :active-frames="currentActiveTimeline"
      />
    </div>
  </div>
</template>

<script>
import OrderTimeline from '~/components/orders/OrderTimeline';
import OrderSummary from '~/components/orders/OrderSummary';

export default {
  name: 'OrderStatusTimeline',
  components: {
    OrderTimeline,
    OrderSummary
  },
  props: {
    order: {
      type: Object,
      default: null
    },
    item: {
      type: Object,
      default: null
    },
  },
  computed: {
    currentActiveTimeline() {
      return [this.order.status];
    },
    timelineData() {
      return [
        {
          status: this.$t('timeline.processing'),
          value: 'processing',
          label: this.$t('timeline.preparing_shipment'),
          date: this.order.updated_at
        },
        {
          status: this.$t('timeline.shipping_label_created'),
          value: 'shipping_label_created',
          label: '',
          date: this.item.vendor_shipment?.meta.createDate
        },
        {
          status: this.$t('timeline.shipped_to_deadstock'),
          value: 'shipped_to_ds',
          label: this.$t('timeline.package_is_on_its_way'),
          date: this.getStatusDate('shipped_to_ds')
        },
        {
          status: this.$t('timeline.arrived_at_deadstock'),
          value: 'arrived_at_ds',
          label: this.$t('timeline.package_has_arrived'),
          date: this.getStatusDate('arrived_at_ds')
        },
        {
          status: this.$t('timeline.authentication_check'),
          value: 'awaiting_auth',
          label: this.$t('timeline.awaiting_authentication_by'),
          date: this.getStatusDate('awaiting_auth')
        },
        {
          status: this.$t('timeline.commission_payout'),
          value: 'commission_payout',
          label: '',
          date: this.getStatusDate('commission_payout')
        },
      ];
    },
    shippingMethod() {
      return this.item.vendor_shipment?.shipping_method_text
    },
    trackingUrl() {
      return this.item.vendor_shipment?.tracking_url
    },
    trackingNo() {
      return this.item.vendor_shipment?.tracking_no
    }
  },
  methods: {
    getStatusDate(statusKey) {
      const status = this.item.status_history.filter(x => x.status_key === statusKey)[0]
      return status ? status.created_at : ''
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.order-status-timeline
  font-family: $font-family-sf-pro-display

  .pad
    padding: 1.5rem 3rem

.border-top
  border-top: none !important

.order-status
  line-height: 30px
  padding: 1.5rem 3rem

  a
    color: $color-blue-1
    text-decoration: underline

.round-box
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px

.order-status-header
  font-weight: $bold
  @include body-2
  color: $color-black-1

  span
    font-weight: $normal
    @include body-4
    color: $color-blue-1

@media (max-width: 992px)
  .order-status-timeline
    font-family: $font-family-sf-pro-display
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
    border-radius: 10px
    margin: 10px 0

    .pad
      padding: 15px 0

    .pad-x
      padding: 10px 20px
    &.border
      border: none !important


  .order-status
    padding: 15px 0
    @include body-5-regular

    .tracking
      div
        display: flex
        justify-content: space-between

  .order-status-header
    @include body-5-medium

  .border-bottom
    border-bottom: 1px solid rgba(196, 196, 196, 0.17) !important
  .border-top
    border-top: 1px solid rgba(196, 196, 196, 0.17) !important

</style>
