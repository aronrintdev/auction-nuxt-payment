<template>
  <div class="row bg-white my-1 align-items-center py-1">
    <div class="col">
      <div class="text-center">
        <div class="pb-2"><img :src="product(single).image" height="70" alt=""></div>
        <NuxtLink :to="`/orders/${order.order_id}-${single.id}`" class="d-none d-md-block">
          <span>#{{ order.order_id }}-{{ single.id }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="col-8 col-md-2">
      <div class="title">{{ product(single).name }} ({{ product(single).release_year }})</div>
      <div class="sku">{{ $t('orders.sku') }}: {{ product(single).sku }}</div>
      <div class="attribute">{{ $t('orders.colorway') }}: {{ product(single).colorway }}, {{ $t('orders.size') }}:
        {{ single.listing_item.inventory.size_id }}
      </div>
    </div>

    <div class="col-12 d-block d-md-none">
      <div class="p-1 table-responsive">
        <table class="table table-striped table-borderless">
          <tbody>
          <tr>
            <td>Order Id</td>
            <td class="text-right">
              <NuxtLink :to="`/orders/${order.order_id}-${single.id}`">
                <span>#{{ order.order_id }}-{{ single.id }}</span>
              </NuxtLink>
            </td>
          </tr>
          <tr>
            <td>Order Date</td>
            <td class="text-right">
              {{ dateFormat(order.created_at) }}
            </td>
          </tr>
          <tr>
            <td>Status</td>
            <td class="text-right">
              {{ single.status_label }}
            </td>
          </tr>
          <tr>
            <td>Type</td>
            <td class="text-right">
              {{ order.type.label }}
            </td>
          </tr>
          <tr>
            <td>Vendor Payout</td>
            <td class="text-right">
              ${{ (order.total / 100).toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td>Actions</td>
            <td class="text-right">
              <div v-if="single.status === PROCESSING">
                <a href="#generate-label" @click="generateLabel(single)">{{ $t('orders.generate_shipping_label') }}</a>
              </div>
              <div v-if="single.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
                <a href="#generate-label" @click="generateLabel(single)">{{ $t('orders.delivered_to_deadstock') }}</a>
              </div>
              <div v-if="single.status !== PROCESSING && single.vendor_shipment">
                <a :href="downloadPdf(single)" :download="`${single.vendor_shipment.tracking_no}.pdf`">{{
                    $t('orders.print_shipping_label')
                  }}</a>
              </div>
              <div v-if="single.status !== PROCESSING && single.vendor_shipment">
                <span>{{ single.vendor_shipment.shipping_method_text }}</span>
                <a target="_blank" :href="single.vendor_shipment.tracking_url">{{ single.vendor_shipment.tracking_no }}</a>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="col d-none d-md-block">
      <div class="text-center">{{ dateFormat(order.created_at) }}</div>
    </div>

    <div class="col d-none d-md-block">
      <div class="text-capitalize text-center">{{ order.type.label }}</div>
    </div>

    <div class="col d-none d-md-block">
      <div class="text-center">${{ (order.total / 100).toFixed(2) }}</div>
    </div>

    <div class="col d-none d-md-block">
      <div :class="`text-center status m-auto ${styleFor(single.status_label)}`">{{ single.status_label }}</div>
    </div>

    <div class="col-2 d-none d-md-block">
      <div v-if="single.status === PROCESSING">
        <a href="#generate-label" @click="generateLabel(single)">{{ $t('orders.generate_shipping_label') }}</a>
      </div>
      <div v-if="single.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
        <a href="#generate-label" @click="generateLabel(single)">{{ $t('orders.delivered_to_deadstock') }}</a>
      </div>
      <div v-if="single.status !== PROCESSING && single.vendor_shipment">
        <a :href="downloadPdf(single)" :download="`${single.vendor_shipment.tracking_no}.pdf`">{{
            $t('orders.print_shipping_label')
          }}</a>
      </div>
      <div v-if="single.status !== PROCESSING && single.vendor_shipment">
        <span>{{ single.vendor_shipment.shipping_method_text }}</span>
        <a target="_blank" :href="single.vendor_shipment.tracking_url">{{ single.vendor_shipment.tracking_no }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import {AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING} from '~/static/constants';

export default {
  name: 'OrderSingleComponent',
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
