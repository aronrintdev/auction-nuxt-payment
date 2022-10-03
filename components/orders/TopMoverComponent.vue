<template>
  <b-tbody>
    <template v-if="multiple">
      <b-tr>
        <b-td class="d-flex align-items-center">
          <div v-if="isSelectable">
            <b-form-checkbox
              v-model="selected"
              name="select"
              :value="order.order_id"
              unchecked-value=""
            />
          </div>
          <div>
            <div class="pb-2"><img :src="require('~/assets/img/orders/multiple-orders.svg')" height="37" alt=""></div>
            <span>#{{ order.order_id }}</span>
          </div>
        </b-td>
        <b-td>
          <div class="d-flex align-items-end cursor-pointer" @click="expand">
            <div class="mr-2">{{ $t('orders.multi_product_item', [order.items.length]) }}</div>
            <Icon :src="iconSvg"/>
          </div>
        </b-td>
        <b-td>{{ dateFormat(order.created_at) }}</b-td>
        <b-td class="text-capitalize">{{ order.type.label }}</b-td>
        <b-td> ${{ order.total }}</b-td>
        <b-td> -</b-td>
        <b-td> -</b-td>
      </b-tr>
      <template v-if="!isCollapsed">
        <b-tr v-for="item in order.items" :key="item.key">
          <b-td>
            <NuxtLink :to="`/orders/${order.order_id}-${item.id}`">
              <span>#{{ order.order_id }}-{{ item.id }}</span>
            </NuxtLink>
          </b-td>
          <b-td colspan="4">
            <div class="d-flex align-items-center text-left">
              <div class="p-1">
                <div class="pb-2"><img :src="product(item).image" height="70" alt=""></div>
              </div>
              <div>
                <div class="title">{{ product(item).name }}</div>
                <div class="sku">{{ $t('orders.sku') }}: {{ product(item).sku }}</div>
                <div class="attribute">{{ $t('orders.colorway') }}: {{ product(item).colorway }}, {{
                    $t('orders.Size')
                  }}:
                  {{ item.listing_item.inventory.size_id }}
                </div>
              </div>
            </div>
          </b-td>
          <b-td>
            <div :class="`status m-auto ${styleFor(item.status_label)}`">{{ item.status_label }}</div>
          </b-td>
          <b-td>
            <!--todo this portion need further confirmation-->
            <div v-if="item.status === PROCESSING">
              <a href="#generate-label" @click="generateLabel(item)">{{ $t('orders.generate_shipping_label') }}</a>
            </div>
            <div v-if="item.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
              <a href="#generate-label" @click="generateLabel(item)">{{ $t('orders.delivered_to_deadstock') }}</a>
            </div>
            <div v-if="item.status !== PROCESSING && item.vendor_shipment">
              <a :href="downloadPdf(item)" :download="`${item.vendor_shipment.tracking_no}.pdf`">
                {{ $t('orders.print_shipping_label') }}
              </a>
            </div>
            <div v-if="item.status !== PROCESSING && item.vendor_shipment">
              <span>{{ item.vendor_shipment.shipping_method_text }}</span>
              <a target="_blank" :href="item.vendor_shipment.tracking_url">{{ item.vendor_shipment.tracking_no }}</a>
            </div>
          </b-td>
        </b-tr>
      </template>
    </template>
    <template v-if="!multiple">
      <b-tr>
        <b-td class="d-flex align-items-center">
          <div v-if="isSelectable">
            <b-form-checkbox
              v-model="selected"
              name="select"
              :value="order.order_id"
              unchecked-value=""
            />
          </div>
          <div>
            <div class="pb-2"><img :src="product(single).image" height="70" alt=""></div>
            <NuxtLink :to="`/orders/${order.order_id}-${single.id}`">
              <span>#{{ order.order_id }}-{{ single.id }}</span>
            </NuxtLink>
          </div>
        </b-td>
        <b-td class="text-left">
          <div class="title">{{ product(single).name }} ({{ product(single).release_year }})</div>
          <div class="sku">{{ $t('orders.sku') }}: {{ product(single).sku }}</div>
          <div class="attribute">{{ $t('orders.colorway') }}: {{ product(single).colorway }}, {{ $t('orders.size') }}:
            {{ single.listing_item.inventory.size_id }}
          </div>
        </b-td>
        <b-td>
          <div>{{ dateFormat(order.created_at) }}</div>
        </b-td>
        <b-td>
          <div class="text-capitalize">{{ order.type.label }}</div>
        </b-td>
        <b-td>
          <div>${{ (order.total / 100).toFixed(2) }}</div>
        </b-td>
        <b-td>
          <div :class="`status m-auto ${styleFor(single.status_label)}`">{{ single.status_label }}</div>
        </b-td>
        <b-td>
          <!--todo this portion need further confirmation-->
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
        </b-td>
      </b-tr>
    </template>
  </b-tbody>
</template>

<script>
import {Icon} from '~/components/common';
import {AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING} from '~/static/constants';

export default {
  name: 'TopMoverComponent',
  components: {
    Icon
  },
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
      isCollapsed: true,
      selected: this.value
    }
  },
  computed: {
    iconSvg() {
      return this.isCollapsed
        ? require('~/assets/img/icons/arrow-down-gray.svg')
        : require('~/assets/img/icons/arrow-up-gray.svg')
    },
    multiple() {
      return this.order.items.length > 1;
    },
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
    expand() {
      this.isCollapsed = !this.isCollapsed
    },
    product(item) {
      return item.listing_item.inventory.product
    },
    async generateLabel(item) {
      const len = item.status_markable.length
      if (len < 1) {
        return false
      }
      const status = item.status_markable[len - 1]
      const url = `/order-items/${this.order.id}/status?status=${status.key}`;

      const resp = await this.$axios.put(url)
      if (resp.status === 200) {
        this.$emit('labelCreated')
      }
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
