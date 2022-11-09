<template>
  <div class="row align-items-center py-1 sf-pro">
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
        <div class="row">
          <div class="col"></div>
          <div class="col-8">
            <div class="d-flex justify-content-start align-items-center fix-margin">
              <div class="p-1"><img :src="require('~/assets/img/orders/multiple-orders.svg')" height="16" alt=""></div>
              <div class="title">{{ $t('orders.multi_product_item', [order.items.length]) }}</div>
            </div>
          </div>
        </div>
        <b-carousel
          id="carousel-1"
          ref="showcase"
          v-model="currentSlide"
          :interval="5000"
          indicators
        >
          <b-carousel-slide v-for="(single, index) in order.items" :key="single.key">
            <template #img>
              <div class="w-100">
                <div class="row">
                  <div class="col">
                    <div class="text-center">
                      <div class="pb-2"><img :src="product(single).image" width="74" alt=""></div>
                      <NuxtLink :to="`/orders/${order.order_id}-${index + 1}`" class="d-none d-md-block">
                        <span>#{{ order.order_id }}-{{ index + 1 }}</span>
                      </NuxtLink>
                    </div>
                  </div>

                  <div class="col-8">
                    <div class="attribute">{{ product(single).name | wordLimit }} ({{
                        product(single).release_year
                      }})
                    </div>
                    <div class="sku">{{ $t('orders.sku') }}: {{ product(single).sku }}</div>
                    <div class="attribute">{{ $t('orders.colorway') }}: {{ product(single).colorway }}</div>
                    <div class="attribute">{{ $t('orders.size') }}: {{ sizeId(single) }}</div>
                    <div class="attribute">{{ $t('orders.box_condition') }}: {{ boxCondition(single) }}</div>
                  </div>
                </div>
              </div>
            </template>
          </b-carousel-slide>
        </b-carousel>
        <div class="my-2">
          <table class="table table-striped table-borderless">
            <tbody>
            <tr>
              <td>{{ $t('orders.order_id') }}</td>
              <td class="text-right">
                <NuxtLink :to="`/orders/${order.order_id}-${currentSlide + 1}`">
                  <span>#{{ order.order_id }}-{{ currentSlide + 1 }}</span>
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
                {{ slideItem.status_label }}
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
              <td v-if="isBuy" class="text-right">
                ${{ commissionAmount | formatPrice }}
              </td>
            </tr>
            <tr>
              <td>{{ $t('orders.action') }}</td>
              <td class="text-right">
                <div v-if="slideItem.status === PROCESSING">
                  <a href="#generate-label"
                     @click="generateLabel(slideItem)">{{ $t('orders.generate_shipping_label') }}</a>
                </div>
                <div v-if="slideItem.status === AWAITING_SHIPMENT_TO_DEADSTOCK">
                  <a href="#generate-label"
                     @click="generateLabel(slideItem)">{{ $t('orders.delivered_to_deadstock') }}</a>
                </div>
                <div v-if="slideItem.status !== PROCESSING && slideItem.vendor_shipment">
                  <a :href="downloadPdf(slideItem)" :download="`${slideItem.vendor_shipment.tracking_no}.pdf`">{{
                      $t('orders.print_shipping_label')
                    }}</a>
                </div>
                <div v-if="slideItem.status !== PROCESSING && slideItem.vendor_shipment">
                  <span>{{ slideItem.vendor_shipment.shipping_method_text }}</span>
                  <a target="_blank"
                     :href="slideItem.vendor_shipment.tracking_url">{{ slideItem.vendor_shipment.tracking_no }}</a>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="col d-none d-md-block">
      <div class="text-center">{{ dateFormat(order.created_at) }}</div>
    </div>

    <div class="col d-none d-md-block">
      <div class="text-capitalize text-center">{{ order.type.label }}</div>
    </div>

    <div class="col d-none d-md-block">
      <div v-if="isBuy" class="text-center">
        ${{ commissionAmount | formatPrice }}
      </div>
    </div>
    <div class="col"></div>
    <div class="col-2 text-center d-none d-md-block"> -</div>

    <template v-if="!isCollapsed">
      <div class="w-100"></div>
      <div class="col-12 d-none d-md-block">
        <div v-for="(item, index) in order.items" :key="item.key" class="row mt-3">
          <div class="col d-flex align-items-center justify-content-center">
            <NuxtLink :to="`/orders/${order.order_id}-${index + 1}`">
              <span>#{{ order.order_id }}-{{ index + 1 }}</span>
            </NuxtLink>
          </div>

          <div class="col-8 col-md-2">
            <div class="d-flex align-items-center text-left forced-wide">
              <div class="p-1">
                <div class="pb-2"><img :src="product(item).image" height="70" alt=""></div>
              </div>
              <div>
                <div class="title">{{ product(item).name | wordLimit }}</div>
                <div class="sku">{{ $t('orders.sku') }}: {{ product(item).sku }}</div>
                <div class="attribute">{{ $t('orders.colorway') }}: {{ product(item).colorway }},
                  {{
                    $t('orders.size')
                  }}:
                  {{ sizeId(item) }}
                </div>
              </div>
            </div>
          </div>

          <div class="col"></div>
          <div class="col"></div>
          <div class="col"></div>

          <div class="col">
            <div v-if="item.status_label!=='voided'" :class="`text-center status m-auto ${styleFor(item.status_label)}`">{{ item.status_label | wordLimit }}</div>
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
      selected: this.value,
      currentSlide: 0
    }
  },
  computed: {
    iconSvg() {
      return this.isCollapsed
        ? require('~/assets/img/icons/arrow-down-gray.svg')
        : require('~/assets/img/icons/arrow-up-gray.svg')
    },
    isTrade() {
      return this.order.type.label === 'trade'
    },
    isBuy() {
      return this.order.type.label === 'buy'
    },
    isAuction() {
      return this.order.type.label === 'auction'
    },
    commissionAmount() {
      let total = 0
      this.order.items.forEach(x => {
        total = total + (x.commission?.commission || 0)
      })
      return total
    },
    slideItem() {
      return this.order.items[this.currentSlide]
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
      if (this.isBuy) {
        return item.listing_item?.inventory?.product
      }
      return item.product
    },
    boxCondition(item) {
      return item.listing_item?.inventory?.packaging_condition.name
    },
    sizeId(item) {
      return item.listing_item?.inventory?.size_id
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

.fix-margin
  margin-left: -25px

@media (max-width: 992px)
  ::v-deep .carousel-indicators
    position: relative

    li
      border-radius: 50%
      width: 5px
      height: 5px
      background-color: $color-black-1

@media (min-width: 993px)
  .forced-wide
    width: 350px

</style>
