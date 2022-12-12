<template>
  <!-- Shopping Cart List Item -->
  <b-row class="mt-4">
    <b-col md="6">
      <b-row>
        <b-col md="4">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
            @click="showModal"
          ></b-img>
        </b-col>
        <b-col md="8">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ sku }} &nbsp;
              {{ $tc('common.size', 1) }}&colon;&nbsp;{{ product.size.size }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ product.colorWay }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.box_condition') }}&colon;&nbsp;{{ product.packaging_condition }}
            </div>
          </b-row>
          <b-row class="d-inline">
            <b-btn
              class="custom-link pl-0"
              variant="link"
              @click="removeProduct(product)"
              >{{ $t('shopping_cart.remove') }}</b-btn
            >
            <b-btn
              v-if="wishList"
              class="custom-link ml-5"
              variant="link"
              @click="removeFromWishList"
            >
              {{ $t('shopping_cart.remove_from_wishlist') }}
            </b-btn>
            <b-btn
              v-else
              :id="`popover-wishlist-${product.listing_item_id}`"
              class="custom-link ml-5"
              variant="link"
              >{{ $t('shopping_cart.save_for_later') }}</b-btn
            >
            <WishListPopover
              v-if="! wishList"
              :product="product"
              :target="`popover-wishlist-${product.listing_item_id}`"
              :wish-list="wishList"
              @show="isWishListShown = true"
              @hidden="isWishListShown = false"
              @wishlisted="onWishListed"
            />
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6">
      <b-row>
        <b-col md="4">
          <b-row class="mt-n2">
            <b-col md="12" class="d-flex align-items-center justify-content-center">
              <span class="quantity-control mr-3" @click="decrementQuantity(product)">&minus;</span>
              <b-form-input
                class="text-center quantity-indicator"
                :value="product.quantity"
                readonly
              />
              <span class="quantity-control ml-3" @click="checkInventoryQuantity(product)">&plus;</span>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="4" class="text-center">
          <div class="body-4-bold">
            &dollar;{{ product.price | formatPrice }}
          </div>
        </b-col>
        <b-col md="4" class="text-center">
          <div class="body-4-bold">&dollar;{{ total | formatPrice }}</div>
        </b-col>
      </b-row>
    </b-col> </b-row
  ><!-- End of Shopping Cart List Item -->
</template>

<script>
import { mapActions } from 'vuex'
import WishListPopover from '~/components/wish-list/Popover'

export default {
  name: 'ListItem',
  components: {WishListPopover},
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isWishListShown: false,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    sku: (vm) => {
      return vm.product.sku.substr(0, 22)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    name: (vm) => {
      return vm.product.name.substr(0, 36)
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    wishList(vm) {
      return vm.product.wishLists && vm.product.wishLists.length ? vm.product.wishLists[0] : false
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    total: (vm) => {
      return vm.product.price * vm.product.quantity
    },
  },
  methods: {
    ...mapActions({
      removeProduct: 'shopping-cart/removeProduct',
      incrementQuantity: 'shopping-cart/incrementQuantity',
      decrementQuantity: 'shopping-cart/decrementQuantity',
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      removeProductFromWishList: 'shopping-cart/removeProductFromWishList',
    }),
    showModal() {
      this.$root.$emit('showModal', this.product)
      this.$bvModal.show('shopping-cart-list-item-modal')
    },
    checkInventoryQuantity (product) {
      if (product.quantity >= product.inventory_stock) {
        this.$bvModal.show('insufficient-quantity-modal')
      } else {
        this.incrementQuantity(product)
      }
    },
    removeFromWishList() {
      if (this.wishList) {
        this.removeProductsFromWishList({ wishList: this.wishList, ids: [this.product.id] }).then(() => {
          this.removeProductFromWishList(this.product).then(() => {
            this.$toasted.success(this.$tc('wish_lists.products_removed_from_wishlist', 1).toString())
          })
        })
      }
    },
    onWishListed(wishList) {
      if (wishList) {
        this.isWishListShown = false
        this.removeProduct(this.product)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Quantity controls (plus and minus incrementer) styles */
.quantity-control
  @include body-3-regular
  color: $color-black-1

  &:hover,
  &:focus
    color: $color-gray-4
    cursor: pointer
    user-select: none

/* Quantity indicator styles */
.quantity-indicator
  &.form-control
    @include body-4-regular
    padding: 0
    width: 40px
    height: 32px
    background: $white
    border: 1px solid $color-gray-4
    border-radius: 0.25rem
    @include body-4-bold
    &:focus
      border: 1px solid $color-gray-4
      border-radius: 0.25rem
</style>
