<template>
  <b-col md="9" class="py-5 px-5 auction-cart">
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="9">
            <div class="heading-1-bold">{{ `${$t('common.auction')} #${auction.id}` }}</div>
            <p class="mt-3">{{ $t('auctions.frontpage.auction_cart_desc') }}</p>
          </b-col>
          <b-col md="3">
            <div class="pull-right pr-5 heading-1-bold">
              {{ getTotalQuantity }} {{ $tc('shopping_cart.item', getTotalQuantity) }}
            </div>
          </b-col>
        </b-row>
        <hr class="mb-5 mt-4" />
      </b-col>
    </b-row>

    <b-row class="mb-5">
      <b-col md="10" class="d-flex align-items-center">
        <div class="body-5-bold text-gray-6 text-uppercase">
          {{ `Item Details` }}
        </div>
      </b-col>
      <b-col md="2" class="text-center">
        <div class="body-5-bold text-gray-6 text-uppercase">
            {{ $t('shopping_cart.quantity') }}
        </div>
      </b-col>
    </b-row>

    <b-row v-for="item in auction.auction_items" :key="item.id" class="mt-4">
      <b-col md="10">
        <b-row>
          <b-col md="2">
            <ProductThumb :product="item.inventory.product" overlay />
          </b-col>
          <b-col md="10" class="pl-4">
            <b-row class="mb-2 d-block">
              <div class="body-4-bold mb-2">{{ item.inventory.product.name }}</div>
              <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.inventory.product.sku }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.inventory.color }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('shopping_cart.size') }}&colon;&nbsp;{{ item.inventory.size ? item.inventory.size.size : '' }}
              </div>
              <div class="body-4-normal mb-2 text-gray-6">
                {{ $t('products.box_condition') }}&colon;&nbsp;{{ item.inventory.packaging_condition.name }}
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="2" class="text-center">
        <h5>{{ item.quantity }}</h5>
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
