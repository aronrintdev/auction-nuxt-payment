<template>
  <div class="border round-box order-summary">
    <div class="pad">
      <b-row align-h="between">
        <b-col cols="8">
          <div class="order-id">{{ $t('orders.order_id') }} #{{ order.order_id }} <span
            class="pl-3">{{ $t('orders.sold') }}</span>
          </div>
          <div class="order-date d-none d-sm-block">{{ $t('orders.ordered_on') }} {{ new Date(order.created_at) }}</div>
        </b-col>
        <b-col cols="3">
          <div v-if="item.status!=='processing'" class="text-right cursor-pointer d-block d-sm-none" @click="openBottomSheet">
            <img :src="require('/assets/img/icons/three-dots.svg')" alt="" />
          </div>
          <div class="text-right w-200 align-self-end d-none d-sm-block">
            <template v-if="item.status!=='processing'">
              <div class="my-2">
                <a class="btn-print-shipping px-3 py-2 align-items-center text-center" :href="printLabel()"
                   :download="`${order.order_id}.pdf`">
                  {{ $t('orders.print_shipping_label') }}
                </a>
              </div>
              <div class="print-invoice text-right mr-4">
                <a href="#print-invoice" class="mr-3" @click="exportPDF(order.id)">{{ $t('orders.print_invoice') }}</a>
              </div>
            </template>
          </div>
        </b-col>
      </b-row>
      <div class="sold-items d-none d-sm-block">{{ $t('orders.sold_items') }}: {{ order.items.length }}</div>
      <b-row class="product-details" align-v="center">
        <b-col cols="4" sm="2">
          <div class="text-center">
            <img :src="product(item).image" height="100"/>
          </div>
        </b-col>
        <b-col cols="8" sm="10">
          <div class="box-header pb-2 d-none d-sm-block">{{ $t('orders.product_details') }}</div>
          <b-row class="d-none d-sm-flex">
            <b-col cols="3">
              <div>{{ product(item).name }} ({{ product(item).release_year }})</div>
              <div>{{ $t('orders.colorway') }}: {{ product(item).colorway }}</div>
              <div v-if="isBuy">
                {{ $t('orders.box_condition') }}:
                {{ item.listing_item.inventory.packaging_condition.name }}
              </div>
            </b-col>
            <b-col cols="3">
              <div v-if="isBuy">{{ $t('orders.size') }}: {{ item.listing_item.inventory.size.size }}</div>
              <div>{{ $t('orders.sku') }}: {{ product(item).sku }}</div>
            </b-col>
          </b-row>
          <div class="d-block d-sm-none product-info">
            <div class="text-bold">{{ product(item).name }} ({{ product(item).release_year }})</div>
            <div><span>{{ $t('orders.sku') }}:</span> {{ product(item).sku }}</div>
            <div><span>{{ $t('orders.colorway') }}:</span> {{ product(item).colorway }}</div>
            <div v-if="isBuy"><span>{{ $t('orders.size') }}:</span> {{ item.listing_item.inventory.size.size }}</div>
            <div v-if="isBuy"><span>{{ $t('orders.box_condition') }}:</span>
              {{ item.listing_item.inventory.packaging_condition.name }}
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <vue-bottom-sheet ref="printLabel" :is-full-screen="true" max-height="30%">
      <div>
        <div class="text-bold px-3 py-2">Options</div>
        <div class="cursor-pointer border-top d-flex justify-content-between align-items-center p-2">
          <div>
            <a class="btn" :href="printLabel()"
               :download="`${order.order_id}.pdf`">
              {{ $t('orders.print_shipping_label') }}
            </a>
          </div>
          <div><img :src="require('/assets/img/icons/arrow-right-black.svg')" alt="" /></div>
        </div>
        <div class="cursor-pointer border-top d-flex justify-content-between p-2 align-items-center" @click="exportPDF(order.id)">
          <div><span class="btn">{{ $t('orders.print_invoice') }}</span></div>
          <div><img :src="require('/assets/img/icons/arrow-right-black.svg')" alt="" /></div>
        </div>
        <div class="border-top cursor-pointer p-2" @click="close()">
          <div class="btn">Cancel</div>
        </div>
      </div>
    </vue-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: 'OrderSummary',
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
  computed:{
    isTrade() {
      return this.order.type.label === 'trade'
    },
    isBuy() {
      return this.order.type.label === 'buy'
    }
  },
  methods:{
    product(item) {
      if(this.isBuy){
        return item.listing_item?.inventory?.product
      }
      return item.product
    },
    printLabel() {
      return `data:application/pdf;base64,${this.item.vendor_shipment?.meta.labelData}`
    },
    exportPDF(orderId) {
        this.$axios.get(`/orders/${orderId}/generate-invoice`,
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
    openBottomSheet(e){
      e.preventDefault()
      this.$refs.printLabel.open()
    },
    close(e){
      e.preventDefault()
      this.$refs.printLabel.close()
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'
.order-summary
  .pad
    padding: 1.5rem 3rem

.round-box
  background: $color-white-1
  border: 1px solid $color-gray-60
  border-radius: 10px

.order-id
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
  background: $color-grey-101
  border: 1px solid $color-grey-101
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

.sold-items
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  @include body-12
  color: $color-black-1

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

@media (max-width: 992px)
  .order-summary
    &.border
      border: none !important

    .pad
      padding: 0

    .order-id
      @include body-5-medium
      color: $color-black-1
      padding-bottom: 15px

      span
        @include body-9-normal
        color: $color-blue-1

    .product-details
      @include body-10-regular
      line-height: 18px

    .product-info
      span
        color: $color-gray-5

</style>
