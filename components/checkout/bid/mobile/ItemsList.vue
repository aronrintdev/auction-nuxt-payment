<template>
  <b-row>
    <b-col sm="12" md="12">
      <!-- List Item -->
      <div v-show="shoppingCart.length">
        <ListItem
          v-for="product in shoppingCart"
          :key="product.listing_item_id"
          :product="product"
          product-options
          quantity-controls
          @item-options-clicked="$emit('item-options-clicked', product)"
        />
      </div>
      <!-- End of List Item -->
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from '~/components/checkout/selling/mobile/ListItem'

export default {
  name: 'ItemsList',
  components: { ListItem },
  data() {
    return {
      productShownInModal: {},
      wishlists: [],
      selectedWishList: {},
      wishlistProduct: {},
    }
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'shopping-cart/getShoppingCart',
      freeSneakersRedeemedReward: 'redeemed-reward/getFreeSneakersRedeemedReward'
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      let totalQuantity =  vm.shoppingCart.reduce((sum, product) => {
        return sum + product.quantity
      }, 0)

      if (vm.freeSneakersRedeemedReward) {
        ++totalQuantity
      }

      return totalQuantity
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Adjust spacing between items */
.product-wrapper
  &:first-child
    margin-top: 28px
  &:last-child
    border-bottom: 1px solid $color-gray-23b
    padding-bottom: 24px

.product-wrapper + .product-wrapper
  margin-top: 42px
</style>
