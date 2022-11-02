<template>
  <!-- Shopping Cart List Item -->
  <b-row class="product-wrapper mx-0">
    <b-col cols="12" sm="12">
      <b-row class="product-card">
        <b-col cols="6" sm="6" class="bg-white-4 d-flex align-items-center justify-content-center">
          <b-img
            class="custom-thumbnail"
            :src="offerDetails.product.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col cols="6" sm="6" class="product-details pr-0">
          <div class="body-10-medium">
            <ThreeDotMenuSVG v-if="productOptions" class="float-right" @click="$emit('item-options-clicked')" />
            <span>{{ name }}</span>
          </div>
          <div class="body-9-normal text-gray-5 text-uppercase">
            <span>{{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ offerDetails.product.sku }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ colorWay }}&comma;</span>
            <span>{{ $tc('common.size', 1) }}&colon;&nbsp;{{ size }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('shopping_cart.box_condition') }}&colon;&nbsp;{{ boxCondition }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('place_offer.offer_amount') }}&colon;&nbsp;{{ offerDetails.bid_price | toCurrency }}</span>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <!-- End of Shopping Cart List Item -->
</template>

<script>
import ThreeDotMenuSVG from '~/assets/img/shopping-cart/three-dot-menu.svg?inline'

export default {
  name: 'ListItem',
  components: { ThreeDotMenuSVG },
  props: {
    offerDetails: {
      type: Object,
      default: () => {
        return {}
      },
    },
    productOptions: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.offerDetails.product.name.substr(0, 36)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    colorWay: (vm) => {
      return vm.offerDetails.product.colorway.substr(0, 4)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    size: (vm) => {
      const size = vm.offerDetails.product.sizes.filter(
        (i) => i.id === vm.offerDetails.size_id
      )

      return size[0].size
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    boxCondition: (vm) => {
      const condition = vm.offerDetails.product.packaging_conditions.filter(
        (i) =>  i.id === vm.offerDetails.packaging_condition_id
      )

      return condition[0].name.substr(0, 10)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.product-wrapper
  margin-top: 28px
  padding: 0 18px 24px
  border-bottom: 1px solid $color-gray-23b

  .product-card
    min-height: 188px

  .product-details
    >div + div
      margin-top: 7px
</style>
