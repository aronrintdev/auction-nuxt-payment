<template>
  <!-- Shopping Cart Product -->
  <b-col md="9" class="product-list-wrapper">
    <b-row class="product-text-wrapper">
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <div class="pull-left heading-3-bold">{{ $t('shopping_cart.shopping_cart') }}</div>
          </b-col>
          <b-col md="6">
            <div class="pull-right pr-4 heading-3-bold">
              {{ getTotalQuantity }} {{ $tc('shopping_cart.item', getTotalQuantity) }}
            </div>
          </b-col>
        </b-row>
        <hr />
      </b-col> </b-row
    ><!-- End of Shopping Cart Product -->

    <!-- Shopping Cart List Headers -->
    <b-row v-show="getTotalQuantity" class="mb-5">
      <b-col md="6">
        <div class="body-5-bold text-gray-6 text-uppercase">
          {{ $t('shopping_cart.my_products') }}
        </div>
      </b-col>
      <b-col md="6">
        <b-row>
          <b-col md="4" class="text-center">
            <div class="body-5-bold text-gray-6 text-uppercase">
              {{ $t('shopping_cart.quantity') }}
            </div>
          </b-col>
          <b-col md="4" class="text-center">
            <div class="body-5-bold text-gray-6 text-uppercase">
              {{ $t('shopping_cart.price') }}
            </div>
          </b-col>
          <b-col md="4" class="text-center">
            <div class="body-5-bold text-gray-6 text-uppercase">
              {{ $t('shopping_cart.total') }}
            </div>
          </b-col>
        </b-row>
      </b-col> </b-row
    ><!-- End Of Product List Headers -->

    <!-- Empty Cart Message -->
    <b-row v-show="! getTotalQuantity" class="empty-cart-wrapper">
      <b-col md="12" class="d-flex align-items-center justify-content-center">
        <b-img :src="require('~/assets/img/shopping-cart/empty-cart.svg')" />
        <div>
          <div class="body-1-bold text-black">{{ $t('shopping_cart.empty_cart') }}</div>
          <div class="body-3-normal text-gray-102">{{ $t('shopping_cart.looks_like_you') }}&period;&period;&period;</div>
          <Button variant="dark-blue" to="/shop">{{ $t('shopping_cart.back_to_browse') }}</Button>
        </div>
      </b-col>
    </b-row><!-- End of Empty Cart Message -->

    <!-- Reward Item -->
    <div v-if="freeSneakersRedeemedReward">
      <RewardItem
        :product="freeSneakersRedeemedReward"
      />
    </div>
    <!-- End of Reward Item -->

    <!-- List Item -->
    <div v-show="shoppingCart.length">
      <ListItem
        v-for="product in shoppingCart"
        :key="product.listing_item_id"
        :product="product"
      />
    </div>
    <!-- End of List Item -->

    <!-- List Item Modal -->
    <div v-show="shoppingCart.length">
      <ListItemModal
        :product="productShownInModal"
      />
    </div>
    <!-- End of List Item Modal -->

    <!-- Navigation Modal -->
    <b-modal
      id="shopping-cart-navigation-modal"
      centered
      hide-footer
      content-class="radius-3"
      header-class="border-bottom-0"
      body-class="pt-0"
    >
      <b-container fluid>
        <b-row>
          <b-col md="6" offset-md="3" class="text-center">
            <div>{{ $t('shopping_cart.navigation_modal_text') }}</div>
          </b-col>
        </b-row>
        <b-row class="mt-2 mb-2">
          <b-col md="4" offset-md="2">
            <b-button
              block
              pill
              variant="outline-dark"
              to="/shop"
            >{{ $t('shopping_cart.ok') }}
            </b-button>
          </b-col>
          <b-col md="4">
            <b-button
              block
              pill
              variant="confirm"
              @click="$bvModal.hide('shopping-cart-navigation-modal')"
            >{{ $t('shopping_cart.cancel') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- End of Navigation Modal -->

    <!-- Wish Lists Modal -->
    <b-modal
      id="shopping-cart-wishlist-modal"
      centered
      hide-footer
      content-class="radius-3"
      header-class="border-bottom-0"
      body-class="pt-0"
    >
      <b-container fluid>
        <b-row>
          <b-col md="6" offset-md="3" class="text-center">
            <div>{{ $t('shopping_cart.please_select_with_list') }}&colon;</div>
            <b-form-select
              v-model="selectedWishList"
              class="mt-2"
            >
              <b-form-select-option v-for="wishlist in wishlists" :key="wishlist.id" :value="wishlist">
                {{ wishlist.name }}
              </b-form-select-option>
            </b-form-select>
          </b-col>
        </b-row>
        <b-row class="mt-4 mb-2">
          <b-col md="4" offset-md="2">
            <b-button
              block
              pill
              variant="outline-dark"
              @click="addToWishList"
            >{{ $t('shopping_cart.ok') }}
            </b-button>
          </b-col>
          <b-col md="4">
            <b-button
              block
              pill
              variant="confirm"
              @click="$bvModal.hide('shopping-cart-wishlist-modal')"
            >{{ $t('shopping_cart.cancel') }}
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
    <!-- End of Wish Lists Modal -->

    <!-- Continue Shopping Link Button -->
    <b-button v-show="getTotalQuantity" id="continue-shopping" variant="link" @click.prevent="$bvModal.show('shopping-cart-navigation-modal')">
      <span><b-img :src="require('~/assets/img/shopping-cart/arrow-left.svg')"></b-img>
        &nbsp;{{ $t('shopping_cart.continue_shopping') }}
      </span>
    </b-button>
    <!-- End of Continue Shopping Link Button -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import ListItem from '~/components/checkout/selling/ListItem'
import RewardItem from '~/components/checkout/selling/RewardItem'
import ListItemModal from '~/components/checkout/selling/ListItemModal'
import Button from '~/components/common/Button'

export default {
  name: 'ItemsList',
  components: { ListItemModal, ListItem, RewardItem, Button },
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
  mounted() {
    this.$root.$on('showModal', (product) => {
      this.productShownInModal = product
    })
    this.$root.$on('showWishListModal', (payload) => {
      this.wishlists = payload.wishlists
      this.selectedWishList = payload.wishlists[0]
      this.wishlistProduct = payload.product
    })
  },
  methods: {
    ...mapActions({
      addProductsToWishList: 'wish-list/addProductsToWishList',
      removeProduct: 'shopping-cart/removeProduct',
    }),
    addToWishList() {
      this.addProductsToWishList({
        wishList: this.selectedWishList,
        ids: [this.wishlistProduct.id]
      }).then((data) => {
        this.$toasted.success(this.$t('wish_lists.one_item_added', { list: data.name }).toString())
        this.removeProduct(this.wishlistProduct)
        this.$bvModal.hide('shopping-cart-wishlist-modal')
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

*
  font-family: $font-sp-pro

.product-list-wrapper
  padding-left: 76px
  padding-right: 76px

  .product-text-wrapper
    div
      font-family: $font-sf-pro-text

    hr
      margin-top: 30px
      margin-bottom: 42px

.empty-cart-wrapper
  margin: 130px 139px 0 199px

  .text-gray-102
    margin-top: 22px

  img
    margin-right: 128px

  button
    @include body-13-medium
    margin-top: 22px
    border-radius: 2px
    width: 222px
    height: 40px

.text-gray-102
  color: $color-gray-102

/* Continue shopping button link styles */
#continue-shopping
  padding-left: 0
  border: 0
  bottom: 2%
  position: absolute
  color: $color-blue-2
  text-decoration: none
  &:hover
    background: none
    border: 0
    color: $color-blue-2
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

</style>
