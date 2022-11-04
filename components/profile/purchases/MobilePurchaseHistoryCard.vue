<template>
  <div class="purchase-card">
    <Carousel
        ref="sizeCarousel"
        :center="true"
        :dots="true"
        :loop="false"
        :margin="20"
        :mouse-drag="false"
        :nav="true"
        :nav-text="['', '']"
        :responsive="{
            0: { items: 1, nav: false, center: true },
          }"
        class="carousel slide-fade position-relative size-carousel"
    >
      <template #default>
        <div
            v-for="(item, index) in purchase.items" :key="item.id"
            :data-position="index"
            :data-size="item.id"
        >
          <b-row>
            <b-col class="title-item text-nowrap text-truncate" offset="4">
              {{ item.product.name }}
            </b-col>
          </b-row>
          <b-row class="">
            <b-col cols="4">
              <ProductThumb :product="item.product" width="82"/>
            </b-col>
            <b-col class="item-desc" cols="8">
              <div v-if="item.product.sku" class="text-nowrap text-truncate mt-1">
                {{ $t('common.sku') }}: {{ item.product.sku }}
              </div>
              <div v-if="item.product.colorway" class="text-nowrap text-truncate mt-1">
                {{ $t('common.colorway') }}: {{ item.product.colorway }}
              </div>
              <div v-if="item.product.sku" class="text-nowrap text-truncate mt-1">
                {{ $t('common.box_condition') }}: {{ item.product.sku }}
              </div>
            </b-col>
          </b-row>
        </div>
      </template>
    </Carousel>
    <div class="d-flex flex-column info-table">
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.id') }}</span>
        <span
            class="text-right text-capitalize value-class order-link text-decoration-underline"
            @click="viewOrder">{{ purchase.id }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.created_at') }}</span>
        <span
            class="text-right text-capitalize value-class">{{
            new Date(purchase.created_at).toLocaleDateString()
          }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.order_status') }}</span>
        <span :class="statusColors[purchase.order_status]" class="text-right text-capitalize value-class">{{
            $t(`vendor_purchase.orderstatus.${purchase.order_status}`)
          }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.type') }}</span>
        <span class="text-right text-capitalize value-class">{{ purchase.type.label }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.quantity') }}</span>
        <span class="text-right text-capitalize value-class">{{ purchase.quantity }}</span>
      </div>
      <div class="d-flex align-items-center justify-content-between info-row">
        <span class="text-left text-nowrap label-class">{{ $t('purchases.info_table.total') }}</span>
        <span class="text-right text-capitalize value-class">{{ purchase.total | toCurrency('usd') }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import ProductThumb from '~/components/product/Thumb';

export default {
  name: 'MobilePurchaseHistoryCard',
  components: {ProductThumb},
  props: {
    purchase: {
      type: Object,
      default: () => {
      },
    },
  },
  data() {
    return {
      statusColors: {
        'pending': 'orange',
        'processing': 'orange',
        'arrived_to_ds': 'green',
        'send_to_ds': 'purple',
        'processing_payment': '',
        'authenticated_and_shipped': '',
        'delivered': 'black',
        'cancelled': 'red',
        'shipped_and_auth': '',
        'multiple': ''
      }
    }
  },
  methods: {
    viewOrder() {
      this.$router.push(`/profile/purchases/summary/${this.purchase.id}`)
    },
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.purchase-card
  box-shadow: 0 1px 4px rgba($color-black-1, 0.25)
  border-radius: 8px
  padding: 22px 12px
  margin-top: 15px
  font-style: normal
  background-color: $color-white-1

  span.orange
    color: $color-orange-20

  span.green
    color: $color-green-3

  span.purple
    color: $color-purple-7

  span.red
    color: $color-red-3

  span.black
    color: $color-black-1

  span.order-link
    color: $color-blue-30

  .info-table
    div:nth-child(even)
      background: $color-white-5

  .info-row
    padding-block: 3px

  .label-class
    @include body-9-medium
    font-family: $font-montserrat

  .value-class
    @include body-9-normal
    font-family: $font-montserrat
    color: $color-gray-6

  .item-desc
    @include body-6-normal
    font-family: $font-family-sf-pro-display
    color: $color-gray-6

  .title-item
    @include body-5-medium
    font-family: $font-family-sf-pro-display

  ::v-deep.owl-theme
    .owl-nav.disabled + .owl-dots
      height: 10px
      margin-top: 5px
      margin-bottom: 22px

      .owl-dot
        margin-inline: 4px
        margin-block: 0

      .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span
        background-color: $color-black-1

      button
        span
          margin: 0
          height: 4px
          width: 4px
          background-color: $color-gray-4

</style>
