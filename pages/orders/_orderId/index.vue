<template>
  <b-container fluid>
    <div v-if="!order">{{ $t('orders.loading') }}...</div>
    <div v-if="order">
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <div class="p-4 page-title text-capitalize">{{ $t('orders.order_id') }} #{{ order.order_id }}</div>
          <div class="px-4 page-subtitle">{{ $t('orders.product_summary') }}</div>
        </div>
        <div>
          <div class="px-5">
            <NuxtLink to="/orders">&laquo; {{ $t('orders.back') }}</NuxtLink>
          </div>
        </div>
      </div>
      <b-row class="p-4">
        <b-col>
          <div class="border round-box">
            <div class="px-5 py-4">
              <b-row align-h="between">
                <b-col cols="8">
                  <div class="order-id">{{ $t('orders.order_id') }} #{{ order.order_id }} <span
                    class="pl-3">{{ $t('orders.sold') }}</span>
                  </div>
                  <div class="order-date">{{ $t('orders.ordered_on') }} {{ new Date(order.created_at) }}</div>
                </b-col>
                <b-col cols="2">
                  <div class="text-center w-200 align-self-end">
                    <template v-if="item.status!=='processing'">
                      <div class="my-2">
                        <a class="btn-print-shipping px-3 py-2 align-items-center text-center" :href="printLabel()"
                           :download="`${order.order_id}.pdf`">
                          {{ $t('orders.print_shipping_label') }}
                        </a>
                      </div>
                      <div class="print-invoice">
                        <a href="#print-invoice" @click="exportPDF(order.order_id)">{{ $t('orders.print_invoice') }}</a>
                      </div>
                    </template>
                  </div>
                </b-col>
              </b-row>
              <div class="sold-items">{{ $t('orders.sold_items') }}: {{ order.items.length }}</div>
              <b-row class="product-details" align-v="center">
                <b-col cols="2">
                  <div>
                    <img :src="product(item).image" height="100"/>
                  </div>
                </b-col>
                <b-col cols="10">
                  <div class="box-header pb-2">{{ $t('orders.product_details') }}</div>
                  <b-row>
                    <b-col cols="3">
                      <div>{{ product(item).name }} ({{ product(item).release_year }})</div>
                      <div>{{ $t('orders.colorway') }}: {{ product(item).colorway }}</div>
                      <div>{{ $t('orders.box_condition') }}:
                        {{ item.listing_item.inventory.packaging_condition.name }}
                      </div>
                    </b-col>
                    <b-col cols="3">
                      <div>{{ $t('orders.size') }}: {{ item.listing_item.inventory.size.size }}</div>
                      <div>{{ $t('orders.sku') }}: {{ product(item).sku }}</div>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
      <b-row class="px-4">
        <b-col class="">
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
        </b-col>
        <b-col class="">
          <div class="border round-box mb-3">
            <div class="px-5 py-4 details-box">
              <div class="pl-4 details-box-header">{{ $t('orders.order_details') }}:</div>
              <div class="pl-5 pt-3">
                <div class="text-capitalize">{{ $t('orders.order_type') }}: {{ order.type.label }}</div>
                <div>{{ $t('orders.total_earnings') }}: ${{ order.vendor_commission | formatPrice }}</div>
              </div>
            </div>
          </div>

          <div class="border round-box mb-3">
            <div class="px-5 py-4 details-box">
              <div class="pl-4 details-box-header">{{ $t('orders.commission_payout') }}:</div>
              <div class="pl-5 pt-3">
                <div>{{ $t('orders.status') }}: {{ order.status }}</div>
                <div>{{ $t('orders.total_earnings') }}: ${{ order.vendor_commission | formatPrice }}</div>
              </div>
            </div>
          </div>

          <div class="border round-box">
            <div class="px-5 py-4 details-box">
              <div class="pl-4 details-box-header">{{ $t('orders.commission_details') }}:</div>
              <div class="pl-5 pt-3">
                <!--todo values are static for now need to update after the API updated-->
                <div>{{ $t('orders.vendor_ranking') }}: 87%</div>
                <div>{{ $t('orders.commission_amount') }}: 90% {{ $t('orders.and') }} $5.00</div>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div v-if="isMultipleItems" class="px-4 py-2">
      <h5 class="my-4">{{ $t('orders.more_from_order_id') }} #{{ order.order_id }}</h5>
      <div class="product-card">
        <b-card-group deck>
          <div v-for="(single, index) in order.items" :key="single.key">
            <div v-if="single.id!==item.id">
              <div class="px-2">
                <NuxtLink :to="`/orders/${order.order_id}-${index + 1}`">
                  {{ order.order_id }}-{{ index + 1 }}
                </NuxtLink>
              </div>
              <b-card
                :img-src="product(single).image"
                img-width="102"
                class="card-width"
              >
                <b-card-text>
                  <div>{{ product(single).name }} ({{ product(single).release_year }})</div>
                  <div class="color-gray">{{ product(single).colorway }}</div>
                  <div>${{ product(single).retail_price | formatPrice }}</div>
                </b-card-text>
              </b-card>
            </div>
          </div>
        </b-card-group>
      </div>
    </div>
  </b-container>
</template>

<script>
import {mapGetters} from 'vuex';
import OrderTimeline from '~/components/orders/OrderTimeline';

export default {
  name: 'ProductSummary',
  components: {
    OrderTimeline
  },
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      item: {},
      order: ''
    }
  },
  computed: {
    ...mapGetters({
      'orders': 'vendors/orders',
      'currentPage': 'vendors/currentPage',
    }),
    currentActiveTimeline() {
      return [this.order.status];
    },
    shippingMethod() {
      return this.item.vendor_shipment?.shipping_method_text
    },
    trackingUrl() {
      return this.item.vendor_shipment?.tracking_url
    },
    trackingNo() {
      return this.item.vendor_shipment?.tracking_no
    },
    isMultipleItems() {
      return this.order.items
        ? this.order.items.length > 1
        : false
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
    }
  },
  mounted() {
    const ids = this.$route.params.orderId.trim().split('-')
    const orderId = parseInt(ids[0])
    const itemIndex = parseInt(ids[1]) - 1

    this.order = this.orders.filter(x => x.order_id === orderId)[0]
    this.item = this.order.items[itemIndex]
  },
  methods: {
    product(item) {
      return item.listing_item.inventory.product
    },
    printLabel() {
      return `data:application/pdf;base64,${this.item.vendor_shipment?.meta.labelData}`
    },
    getStatusDate(statusKey) {
      const status = this.item.status_history.filter(x => x.status_key === statusKey)[0]
      return status ? status.created_at : ''
    },
    exportPDF(orderId) {
      this.$axios.get(`/orders/${orderId}/invoice-pdf`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
          params: {id: orderId},
          responseType: 'blob',
        }).then((res) => {
        const fileURL = window.URL.createObjectURL(
          new Blob([res.data], {
            type: 'application/pdf',
          })
        )
        const fileLink = document.createElement('a')
        fileLink.href = fileURL
        fileLink.setAttribute('download', 'invoice.pdf')
        document.body.appendChild(fileLink)
        fileLink.click()
      }).catch((err) => {
        this.$logger.logToServer(err.response)
      })
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.page-title
  font-family: $font-montserrat
  font-weight: $bold
  @include body-16
  letter-spacing: -0.02em
  color: $color-black-1

.page-subtitle
  font-family: $font-family-sf-pro-display
  font-weight: $bold
  @include body-7
  color: $color-black-1

.round-box
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px

.w-200
  width: 200px

.order-id, .order-status-header
  font-family: $font-family-sf-pro-display
  font-weight: $bold
  @include body-2
  color: $color-black-1

  span
    font-family: $font-montserrat
    font-weight: $normal
    @include body-4
    color: $color-blue-1

.order-date
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  font-size: 16px
  line-height: 19px
  color: $color-black-1

.btn-print-shipping
  width: 180px
  left: calc(50% - 180px / 2 + 569px)
  background: $color-blue-2
  border: 1px solid $color-blue-2
  border-radius: 21px
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  @include body-13
  color: $color-white-1

.print-invoice
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $normal
  @include body-13
  align-items: center
  text-align: center
  color: $color-blue-2
  cursor: pointer

.sold-items, .order-status
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  @include body-12
  color: $color-black-1

.order-status
  line-height: 30px

  a
    color: $color-blue-1
    text-decoration: underline

.product-details
  font-family: $font-family-sf-pro-display
  font-weight: $regular
  font-size: 16px
  line-height: 24px
  color: $color-black-1

  .box-header
    font-weight: $medium
    font-size: 18px
    color: $color-gray-5

.details-box
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  font-size: 16px
  line-height: 28px
  color: $color-gray-5

  .details-box-header
    font-weight: $bold
    font-size: 20px
    color: $color-black-1

.product-card
  @include body-9

.card-width
  width: 240px

.color-gray
  color: $color-gray-5
</style>
