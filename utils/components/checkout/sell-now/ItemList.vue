<template>
  <!-- Shopping Cart Product -->
  <b-col md="9" class="p-5 background-light">
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <div class="pull-left heading-1-bold">
              {{ $t('sell_now.review_sale') }}
            </div>
          </b-col>
          <b-col md="6">
            <div class="pull-right pr-5 heading-1-bold">
              {{ getTotalQuantity }}
              {{ $tc('shopping_cart.item', getTotalQuantity) }}
            </div>
          </b-col>
        </b-row>
        <hr class="mb-5 mt-4" />
      </b-col> </b-row
    ><!-- End of Shopping Cart Product -->

    <!-- Shopping Cart List Headers -->
    <b-row class="mb-5">
      <b-col md="6">
        <div class="body-5-bold text-gray-6 text-uppercase">
          {{ $t('shopping_cart.my_products') }}
        </div>
      </b-col>
      <b-col md="6">
        <b-row class="justify-content-center">
          <div class="body-5-bold text-gray-6 text-uppercase">
            {{ $t('shopping_cart.price') }}
          </div>
        </b-row>
      </b-col>
    </b-row>
    <!-- End Of Product List Headers -->

    <!-- Empty Cart Message -->
    <b-row v-show="!getTotalQuantity" class="mt-5">
      <b-col md="12">
        <h6>
          {{ $t('sell_now.you_have_no_items') }}
        </h6>
      </b-col>
    </b-row>
    <!-- End of Empty Cart Message -->

    <!-- List Item -->
    <div v-show="sellItem">
      <ListItem />
    </div>
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import ListItem from './ListItem.vue'

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
      sellItem: 'sell-now/getSellingItem',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      return vm.sellItem.quantity
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Continue shopping button link styles */
#continue-shopping,
#continue-shopping-empty-cart
  border: 0
  color: $color-blue-2
  text-decoration: underline
  &:hover
    background: none
    border: 0
    color: $color-blue-2
    text-decoration: none

#continue-shopping
  border: 0
  bottom: 2%
  position: absolute
  text-decoration: none

/* Navigation modal outline button styles */
.btn
  &.nuxt-link-active
    &.btn-outline-dark
      border: $color-black-1 solid 1px
      color: $color-black-1
      font-weight: $normal
      padding: 8px 8px
      &:hover
        color: $color-white-1

/* Bootstrap's custom vertical rule styles */
.vr
  align-self: stretch
  background-color: currentColor
  display: inline-block
  min-height: 1em
  opacity: $hr-opacity
  width: 1px

.background-light
  background: $color-white-5
</style>
