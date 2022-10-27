<template>
  <!-- Shopping Cart List Item -->
  <b-row class="product-wrapper mx-0">
    <b-col cols="12" sm="12">
      <b-row class="product-card">
        <b-col cols="6" sm="6" class="bg-color-white-4 d-flex align-items-center justify-content-center">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col cols="6" sm="6" class="product-details pr-0">
          <div class="body-10-medium">
            <ThreeDotMenuSVG class="float-right" @click="$emit('item-options-clicked')" />
            <span>{{ name }}</span>
          </div>
          <div class="body-9-normal text-color-gray-5 text-uppercase">
            <span>{{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }}</span>
          </div>
          <div class="body-9-normal text-color-gray-5">
            <span>{{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ colorWay }}&comma;</span>
            <span>{{ $tc('common.size', 1) }}&colon;&nbsp;{{ product.size.size }}</span>
          </div>
          <div class="body-9-normal text-color-gray-5">
            <span>{{ $t('shopping_cart.box_condition') }}&colon;&nbsp;{{ boxCondition }}</span>
          </div>
          <div class="body-9-normal text-color-gray-5">
            <span>{{ $t('shopping_cart.price') }}&colon;&nbsp;{{ total | toCurrency }}</span>
          </div>

          <b-button-group id="quantity-controls" size="sm">
            <b-button class="d-flex align-items-center justify-content-center text-black bg-white" @click="decrementQuantity(product)">
              <span class="body-3-bold">&minus;</span>
            </b-button>
            <b-button class="d-flex align-items-center justify-content-center text-black bg-white disabled">
              <span class="body-5-bold">{{ product.quantity }}</span>
            </b-button>
            <b-button class="d-flex align-items-center justify-content-center text-black bg-white" @click="checkInventoryQuantity(product)">
              <span class="body-3-bold">&plus;</span>
            </b-button>
          </b-button-group>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
  <!-- End of Shopping Cart List Item -->
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ThreeDotMenuSVG from '~/assets/img/shopping-cart/three-dot-menu.svg?inline'

export default {
  name: 'ListItem',
  components: { ThreeDotMenuSVG },
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    ...mapGetters({
      wishLists: 'wish-list/getWishLists',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    total: (vm) => {
      return vm.product.price * vm.product.quantity
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.product.name.substr(0, 36)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    colorWay: (vm) => {
      return vm.product.colorWay.substr(0, 4)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    boxCondition: (vm) => {
      return vm.product.packaging_condition.substr(0, 8)
    }
  },
  methods: {
    ...mapActions({
      removeProduct: 'shopping-cart/removeProduct',
      incrementQuantity: 'shopping-cart/incrementQuantity',
      decrementQuantity: 'shopping-cart/decrementQuantity',
    }),
    checkInventoryQuantity(product) {
      if (product.quantity >= product.inventory_stock) {
        this.$bvModal.show('insufficient-quantity-modal')
      } else {
        this.incrementQuantity(product)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.product-wrapper
  padding: 0 18px

.product-card
  min-height: 188px

.product-details
  >div + div
    margin-top: 7px

/* Quantity controls styles */
#quantity-controls
  margin-top: 19px

  .btn
    border: 1px solid $color-gray-47

    &.disabled
      opacity: 1

    @media (max-width: 576px)
      height: 23px
      width: 48px

      &:first-child
        width: 38px
        border-top-left-radius: 0.25rem
        border-bottom-left-radius: 0.25rem

      &:last-child
        width: 38px
        border-top-right-radius: 0.25rem
        border-bottom-right-radius: 0.25rem

      &:focus, &:active, &:hover
        background: $color-gray-47
</style>
