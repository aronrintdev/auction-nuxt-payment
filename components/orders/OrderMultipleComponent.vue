<template>
  <div class="row bg-white my-1 align-items-center py-1">
    <div class="col">xxx</div>
    <div class="col">xxx</div>
    <div class="col">xxx</div>
    <div class="col">xxx</div>
    <div class="col">xxx</div>
    <div class="col">xxx</div>
    <div class="col">xxx</div>
  </div>
</template>

<script>
import {AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING} from '~/static/constants';

export default {
  name: 'OrderMultipleComponent',
  props: {
    order: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      PROCESSING,
      AWAITING_SHIPMENT_TO_DEADSTOCK
    }
  },
  computed: {
    single() {
      return this.order.items[0]
    }
  },
  methods: {
    product(item) {
      return item.listing_item.inventory.product
    },
    // formatting date to US format mm/dd/yyyy
    dateFormat(strDate) {
      return new Date(strDate).toLocaleDateString('en-US')
    },
    styleFor(statusLabel) {
      switch (statusLabel.toLowerCase()) {
        case 'arrived at deadstock':
          return 'arrived';
        case 'shipped to deadstock':
          return 'shipped';
        case 'awaiting authentication':
          return 'awaiting-auth';
        case 'order taken over':
          return 'order-taken-over';
      }

      return 'awaiting'
    },
    downloadPdf(item) {
      return `data:application/pdf;base64,${item.vendor_shipment.shipment_pdf}`
    }
  }
}
</script>

<style scoped lang="sass">
@import 'bootstrap/scss/functions'
@import 'bootstrap/scss/variables'
@import 'bootstrap/scss/mixins'
@import '/assets/css/variables'

.title
  font-size: 14px
  font-weight: bold

.sku, .attribute
  font-size: 13px
  color: $color-gray-6

.status
  width: 141px
  padding: 10px 15px
  border-radius: 4px

</style>
