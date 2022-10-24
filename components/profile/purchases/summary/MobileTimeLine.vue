<template>
  <div class="d-flex flex-column ">
    <div v-for="item in filteredStatuses" :key="item.id" class="timeline-item d-flex align-items-start">
      <TimelineIcon :status="item.value === orderStatus? 'active': 'past'" class="icon"></TimelineIcon>
      <div :class="item.value !== orderStatus && 'mid' " class="d-flex flex-column pb-30 desc-section">
        <div class="body-5-normal title-section">{{ item.status }}</div>
        <div class="body-9-regular color-gray mt-1">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ARRIVED_TO_DEADSTOCK,
  AUTHENTICATED_AND_SHIPPED, DELIVERED,
  PENDING,
  PROCESSING,
  PROCESSING_PAYMENT,
  SEND_TO_DEADSTOCK
} from '~/static/constants';
import TimelineIcon from '~/components/orders/TimelineIcon';


export default {
  name: 'MobileTimeLine',
  components: {TimelineIcon},
  props: {
    orderStatus: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      timelineStatuses: [
        {
          id: 1,
          status: this.$t('vendor_purchase.orderstatus.pending'),
          description: this.$t('vendor_purchase.awaiting_shipment'),
          value: PENDING,
        },
        {
          id: 2,
          status: this.$t('vendor_purchase.orderstatus.processing'),
          description: this.$t('vendor_purchase.awaiting_shipment'),
          value: PROCESSING,
        },
        {
          id: 3,
          status: this.$t('vendor_purchase.send_to_ds'),
          description: this.$t('vendor_purchase.package_send_to_deadstock'),
          value: SEND_TO_DEADSTOCK,
        },
        {
          id: 4,
          status: this.$t('vendor_purchase.orderstatus.arrived_at_ds'),
          description: this.$t('vendor_purchase.awaiting_shipment'),
          value: ARRIVED_TO_DEADSTOCK,
        },
        {
          id: 5,
          status: this.$t('vendor_purchase.processing_payment'),
          description: this.$t('vendor_purchase.package_send_to_deadstock'),
          value: PROCESSING_PAYMENT,
        },
        {
          id: 6,
          status: this.$t('vendor_purchase.authenticated_and_shipped'),
          description: this.$t('vendor_purchase.package_send_to_deadstock'),
          value: AUTHENTICATED_AND_SHIPPED,
        },
        {
          id: 7,
          status: this.$t('vendor_purchase.delivered'),
          description: this.$t('vendor_purchase.package_send_to_deadstock'),
          value: DELIVERED,
        },
      ]
    }
  },
  computed: {
    filteredStatuses() {
      let index = this.timelineStatuses.findIndex(status => status.value === this.orderStatus)
      index = index > 0 ? index : 0;
      return this.timelineStatuses.slice(0, index + 1).sort((a, b) => a.id - b.id)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"

::v-deep.icon
  z-index: 999

  div
    line-height: 16px

.pb-30
  padding-bottom: 30px

.title-section
  margin-top: -10px

.desc-section
  padding-left: 20px
  margin-left: -10px
  margin-top: 10px

  &.mid
    border-left: dotted 4px $light-gray

.color-gray
  color: $color-gray-5
</style>
