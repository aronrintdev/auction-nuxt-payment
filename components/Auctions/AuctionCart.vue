<template>
  <b-col md="9" class="auction-cart">
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="9">
            <div class="auction-cart-title">{{ `${$t('common.auction')} #${auction.id}` }}</div>
            <p class="mt-2 auction-cart-desc mb-0">{{ $t('auctions.frontpage.auction_cart_desc') }}</p>
          </b-col>
          <b-col md="3">
            <div class="pull-right pr-md-4 auction-cart-title">
              {{ getTotalQuantity }} {{ $tc('shopping_cart.item', getTotalQuantity) }}
            </div>
          </b-col>
        </b-row>
        <hr class="mb-5 mt-1" />
      </b-col>
    </b-row>

    <b-row class="mb-3 mb-md-4 auction-cart-header">
      <b-col cols="9" md="10" class="d-flex align-items-center">
        <div class="body-5-bold text-gray-6 text-uppercase">
          {{ $t('shopping_cart.my_products') }}
        </div>
      </b-col>
      <b-col cols="3" md="2" class="text-center">
        <div class="body-5-bold text-gray-6 text-uppercase">
            {{ $t('shopping_cart.quantity') }}
        </div>
      </b-col>
    </b-row>

    <b-row v-for="item in auction.auction_items" :key="item.id">
      <b-col cols="9" md="10">
        <b-row>
          <b-col cols="4" md="2">
            <ProductThumb :product="item.inventory.product" overlay />
          </b-col>
          <b-col cols="8" md="10" class="pl-md-4">
            <b-row class="mb-2 d-block">
              <div class="body-4-bold mb-1 mb-md-2">{{ item.inventory.product.name }}</div>
              <div class="body-4-normal mb-1 mb-md-2 text-gray-6 text-uppercase">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
              </div>
              <div class="body-4-normal mb-1 mb-md-2 text-gray-6">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.inventory.color }}
              </div>
              <div class="body-4-normal mb-1 mb-md-2 text-gray-6">
                {{ $t('shopping_cart.size') }}&colon;&nbsp;{{ item.inventory.size ? item.inventory.size.size : '' }}
              </div>
              <div class="body-4-normal mb-1 mb-md-2 text-gray-6">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="3" md="2" class="text-center quantity">
        {{ item.quantity }}
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: 'AuctionCart',
  props: {
    auction: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity() {
      return this.auction.auction_items && this.auction.auction_items.length
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.auction-cart
  padding: 44px 57px 0 76px
  font-family: $font-sf-pro-text
  &-title
    font-weight: $bold
    @include body-16
    color: $black
  &-desc
    font-family: $font-montserrat
    font-weight: $medium
    @include body-8
    color: $color-gray-5
  .quantity
    font-weight: $bold
    @include body-13
    color: $black
  &-header
    .body-5-bold
      letter-spacing: -0.02em
  @media (max-width: 576px)
    padding: 16px
    &-title
      @include body-2
    &-desc
      @include body-21
    &-header
      .body-5-bold
        @include body-9
    .quantity
      @include body-10
    .body-4-bold 
      @include body-10
    .body-4-normal
      @include body-9
</style>
