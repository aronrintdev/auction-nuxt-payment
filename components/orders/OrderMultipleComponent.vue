<template>
  <div class="row align-items-center py-1">
    <div class="col d-none d-md-block">
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
          <div class="pb-2"><img :src="require('~/assets/img/orders/multiple-orders.svg')" height="37" alt=""></div>
          <span>#{{ order.order_id }}</span>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-2">
      <div class="d-none d-md-flex align-items-center cursor-pointer flex-nowrap" @click="expand">
        <div class="mr-2 title">{{ $t('orders.multi_product_item', [order.items.length]) }}</div>
        <Icon :src="iconSvg"/>
      </div>
      <div class="d-block d-md-none">
        <div class="d-flex justify-content-center align-items-center">
          <div class="p-1"><img :src="require('~/assets/img/orders/multiple-orders.svg')" height="16" alt=""></div>
          <div class="title">{{ $t('orders.multi_product_item', [order.items.length]) }}</div>
        </div>
        <b-carousel
          id="carousel-1"
          ref="showcase"
          :interval="5000"
          img-width="1024"
          img-height="250"
        >
          <b-carousel-slide v-for="single in order.items" :key="single.key">
            <template #img>
              <div class="w-100">
                <div class="row">
                  <div class="col">
                    <div class="text-center">
                      <div class="pb-2"><img :src="product(single).image" height="70" alt=""></div>
                      <NuxtLink :to="`/orders/${order.order_id}-${single.id}`" class="d-none d-md-block">
                        <span>#{{ order.order_id }}-{{ single.id }}</span>
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="col-8">
                    <div class="title">{{ product(single).name }} ({{ product(single).release_year }})</div>
                    <div class="sku">{{ $t('orders.sku') }}: {{ product(single).sku }}</div>
                    <div class="attribute">{{ $t('orders.colorway') }}: {{ product(single).colorway }},
                      {{ $t('orders.size') }}:
                      {{ single.listing_item.inventory.size_id }}
                    </div>
                  </div>
                </div>
                <div class="my-2">
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
                          <a href="#generate-label"
                             @click="generateLabel(single)">{{ $t('orders.generate_shipping_label') }}</a>
                        </div>
                        <div v-if="single.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
                          <a href="#generate-label"
                             @click="generateLabel(single)">{{ $t('orders.delivered_to_deadstock') }}</a>
                        </div>
                        <div v-if="single.status !== PROCESSING && single.vendor_shipment">
                          <a :href="downloadPdf(single)" :download="`${single.vendor_shipment.tracking_no}.pdf`">{{
                              $t('orders.print_shipping_label')
                            }}</a>
                        </div>
                        <div v-if="single.status !== PROCESSING && single.vendor_shipment">
                          <span>{{ single.vendor_shipment.shipping_method_text }}</span>
                          <a target="_blank"
                             :href="single.vendor_shipment.tracking_url">{{ single.vendor_shipment.tracking_no }}</a>
                        </div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>

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
    <div class="col"></div>
    <div class="col-2 text-center d-none d-md-block"> -</div>

    <template v-if="!isCollapsed">
      <div class="w-100"></div>
      <div class="col-12 d-none d-md-block">
        <div v-for="item in order.items" :key="item.key" class="row mt-3">
          <div class="col d-flex align-items-center justify-content-center">
            <NuxtLink :to="`/orders/${order.order_id}-${item.id}`">
              <span>#{{ order.order_id }}-{{ item.id }}</span>
            </NuxtLink>
          </div>

          <div class="col-8 col-md-2">
            <div class="d-flex align-items-center text-left forced-wide">
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
          </div>

          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>

          <div class="col">
            <div :class="`text-center status m-auto ${styleFor(item.status_label)}`">{{ item.status_label }}</div>
          </div>

          <div class="col-2">
            <div>
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
            </div>
          </div>
          <div class="w-100"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {AWAITING_SHIPMENT_TO_DEADSTOCK, PROCESSING} from '~/static/constants';
import {Icon} from '~/components/common';

export default {
  name: 'OrderMultipleComponent',
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
    single() {
      return this.order.items[0]
    },
    iconSvg() {
      return this.isCollapsed
        ? require('~/assets/img/icons/arrow-down-gray.svg')
        : require('~/assets/img/icons/arrow-up-gray.svg')
    },
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
      const url = `/order-items/${this.order.id}/status?status=${status.key}`;

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
  font-size: 14px
  font-weight: bold

.sku, .attribute
  font-size: 13px
  color: $color-gray-6

.status
  width: 141px
  padding: 10px 15px
  border-radius: 4px

@media (min-width: 993px)
  .forced-wide
    width: 350px

</style>
