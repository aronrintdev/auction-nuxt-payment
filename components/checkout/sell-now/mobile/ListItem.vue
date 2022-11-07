<template>
  <!-- Place Offer List Item -->
  <b-row class="product-wrapper mx-0">
    <b-col cols="12" sm="12">
      <b-row class="product-card">
        <b-col cols="6" sm="6" class="bg-white-4 d-flex align-items-center justify-content-center">
          <b-img
            class="custom-thumbnail"
            :src="sellItem.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col cols="6" sm="6" class="product-details pr-0">
          <div class="body-10-medium">
            <ThreeDotMenuSVG v-if="productOptions" class="float-right" @click="$emit('item-options-clicked')" />
            <span>{{ name }}</span>
          </div>
          <div class="body-9-normal text-gray-5 text-uppercase">
            <span>{{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ sellItem.sku }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ colorWay }}&comma;</span>
            <span>{{ $tc('common.size', 1) }}&colon;&nbsp;{{ sellItem.size.size }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('shopping_cart.box_condition') }}&colon;&nbsp;{{ boxCondition }}</span>
          </div>
          <div class="body-9-normal text-gray-5">
            <span>{{ $t('sell_now.price') }}&colon;&nbsp;{{ sellItem.price | toCurrency }}</span>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <!-- End of Place Offer List Item -->
</template>

<script>
import ThreeDotMenuSVG from '~/assets/img/shopping-cart/three-dot-menu.svg?inline'

export default {
  name: 'ListItem',
  components: { ThreeDotMenuSVG },
  props: {
    sellItem: {
      type: Object,
      required: true,
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
      return vm.sellItem.name.substr(0, 36)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    colorWay: (vm) => {
      return vm.sellItem.colorWay.substr(0, 4)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    boxCondition: (vm) => {
      return vm.sellItem.packaging_condition.name.substr(0, 10)
    }
  }
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
