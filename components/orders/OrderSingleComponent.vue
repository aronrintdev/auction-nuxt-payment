<template>
  <div class="row align-items-center py-1">
    <div class="col">
      <div class="d-flex align-items-center">
        <div v-if="isSelectable">
          <b-form-checkbox
            v-model="selected"
            name="select"
            :value="order.order_id"
            unchecked-value=""
          />
        </div>
        <div class="text-center m-auto">
          <div class="pb-2"><img :src="product(single).image" height="70" alt=""></div>
          <NuxtLink :to="`/orders/${order.order_id}-1`" class="d-none d-md-block">
            <span>#{{ order.order_id }}-1</span>
          </NuxtLink>
        </div>
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
      <div class="table-responsive my-2">
        <table class="table table-striped table-borderless">
          <tbody>
          <tr>
            <td>{{ $t('orders.order_id') }}</td>
            <td class="text-right">
              <NuxtLink :to="`/orders/${order.order_id}-1`">
                <span>#{{ order.order_id }}-1</span>
              </NuxtLink>
            </td>
          </tr>
          <tr>
            <td>{{ $t('orders.date_ordered') }}</td>
            <td class="text-right">
              {{ dateFormat(order.created_at) }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('orders.status') }}</td>
            <td class="text-right">
              {{ single.status_label }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('orders.type') }}</td>
            <td class="text-right">
              {{ order.type.label }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('orders.vendor_payout') }}</td>
            <td class="text-right">
              ${{ order.total | formatPrice }}
            </td>
          </tr>
          <tr>
            <td>{{ $t('orders.action') }}</td>
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
                <a target="_blank" :href="single.vendor_shipment.tracking_url">{{
                    single.vendor_shipment.tracking_no
                  }}</a>
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
      <div class="text-center">${{ order.vendor_commission | formatPrice }}</div>
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
    },
    isSelectable: {
      type: Boolean,
      default: true
    },
    value: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      PROCESSING,
      AWAITING_SHIPMENT_TO_DEADSTOCK,
      selected: this.value
    }
  },
  computed: {
    single() {
      return this.order.items[0]
    }
  },
  watch: {
    selected(newVal, oldVal) {
      this.$emit('checked', newVal, oldVal)
    },
    isSelectable(newVal, oldVal) {
      if (!newVal && oldVal) {
        this.selected = ''
      }
    },
    value(val) {
      this.selected = val
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
    async generateLabel(item) {
      const len = item.status_markable.length
      if (len < 1) {
        return false
      }
      const status = item.status_markable[len - 1]
      const url = `/order-items/${item.id}/status?status=${status.key}`;

      const resp = await this.$axios.put(url)
      if (resp.status === 200) {
        this.$emit('labelCreated')
      }
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
@import '/assets/css/variables'

.title
  @include body-5-bold

.sku, .attribute
  @include body-10
  color: $color-gray-6

.status
  width: 141px
  padding: 10px 15px
  border-radius: 4px

</style>
