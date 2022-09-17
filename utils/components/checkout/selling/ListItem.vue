<template>
  <!-- Shopping Cart List Item -->
  <b-row class="mt-4">
    <b-col md="6">
      <b-row>
        <b-col md="3">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
            @click="showModal"
          ></b-img>
        </b-col>
        <b-col md="9" class="pl-3">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }} &nbsp;
              {{ $tc('common.size', 1) }}&colon;&nbsp;{{ product.size.size }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorWay
              }}
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
              class="custom-link ml-5"
              variant="link"
              @click="saveForLater"
              >{{ $t('shopping_cart.save_for_later') }}</b-btn
            >
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6">
      <b-row>
        <b-col md="4">
          <b-row>
            <b-col md="4" class="text-center">
              <div
                class="body-4-bold quantity-control"
                @click="decrementQuantity(product)"
              >
                &minus;
              </div>
            </b-col>
            <b-col md="4" class="custom-form">
              <b-form-input
                class="text-center quantity-indicator"
                :value="product.quantity"
                readonly
              ></b-form-input>
            </b-col>
            <b-col md="4" class="text-center">
              <div
                class="body-4-bold quantity-control"
                @click="checkInventoryQuantity(product)"
              >
                &plus;
              </div>
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
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ListItem',
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
  },
  methods: {
    ...mapActions({
      removeProduct: 'shopping-cart/removeProduct',
      incrementQuantity: 'shopping-cart/incrementQuantity',
      decrementQuantity: 'shopping-cart/decrementQuantity',
      fetchWishLists: 'wish-list/fetchWishLists',
    }),
    showModal() {
      this.$root.$emit('showModal', this.product)
      this.$bvModal.show('shopping-cart-list-item-modal')
    },
    saveForLater() {
      this.fetchWishLists()
        .then(() => {
          if (this.wishLists.length) {
            this.$root.$emit('showWishListModal', {
              wishlists: this.wishLists,
              product: this.product,
            })
            this.$bvModal.show('shopping-cart-wishlist-modal')
          } else {
            this.$toasted.error(this.$t('wish_lists.no_wish_lists').toString())
          }
        })
        .catch((error) => {
          // If error or credentials don't match
          if (error.response.status === 401) {
            this.$toasted.error(
              this.$t('login.error_message.unauthorized').toString()
            )
          } else {
            this.$toasted.error(
              this.$t('error.something_went_wrong').toString()
            )
          }
        })
    },
    checkInventoryQuantity (product) {
      if (product.quantity >= product.inventory_stock) {
        this.$bvModal.show('insufficient-quantity-modal')
      } else {
        this.incrementQuantity(product)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Quantity controls (plus and minus incrementer) styles */
.quantity-control
  &:hover,
  &:focus
    color: $color-gray-4
    cursor: pointer
    user-select: none

/* Quantity indicator styles */
.quantity-indicator
  &.form-control
    background: $white
    border: 1px solid $color-gray-4
    border-radius: 0.25rem
    position: absolute
    right: 0
    top: -0.6rem
    @include body-4-bold
    &:focus
      border: 1px solid $color-gray-4
      border-radius: 0.25rem
</style>
