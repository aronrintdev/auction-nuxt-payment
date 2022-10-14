<template>
  <div class="border round-box">
    <div class="px-5 py-4 border-bottom order-status">
      <div class="order-status-header mb-3">{{ $t('orders.order_status') }}: {{ item.status_label }}</div>
      <template v-if="item.status!=='processing'">
        <div>{{ $t('orders.shipping_carrier') }}: {{ shippingMethod }}</div>
        <div>{{ $t('orders.tracking_number') }}: <a target="_blank" :href="trackingUrl">{{
            trackingNo
          }}</a></div>
      </template>
    </div>
    <div class="px-5 py-3">
      <!--  Timeline -->
      <OrderTimeline
        :timeline="timelineData"
        :active-frames="currentActiveTimeline"
      />
      <!-- Timeline -->
    </div>
  </div>
</template>

<script>
import OrderTimeline from '~/components/orders/OrderTimeline';

export default {
  name: 'OrderStatusTimeline',
  components: {
    OrderTimeline
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
.order-status
  line-height: 30px

  a
    color: $color-blue-1
    text-decoration: underline

.round-box
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px

.order-status-header
  font-family: $font-family-sf-pro-display
  font-weight: $bold
  @include body-2
  color: $color-black-1

  span
    font-family: $font-montserrat
    font-weight: $normal
    @include body-4
    color: $color-blue-1

</style>
