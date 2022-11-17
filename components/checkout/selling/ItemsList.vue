<template>
  <!-- Shopping Cart Product -->
  <b-col md="9" class="py-5 px-5">
    <b-row>
      <b-col md="12">
        <b-row>
          <b-col md="6">
            <div class="pull-left heading-1-bold">{{ $t('shopping_cart.shopping_cart') }}</div>
          </b-col>
          <b-col md="6">
            <div class="pull-right pr-5 heading-1-bold">
              {{ getTotalQuantity }} {{ $tc('shopping_cart.item', getTotalQuantity) }}
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
    <b-row v-show="! getTotalQuantity" class="mt-5">
      <b-col md="12">
        <h6>
          {{
            $t('shopping_cart.you_have_no_items_in_your_cart')
          }}&nbsp;<b-button id="continue-shopping-empty-cart" variant="link" to="/">{{
            $t('shopping_cart.continue_shopping')
          }}</b-button>
        </h6>
      </b-col> </b-row
    ><!-- End of Empty Cart Message -->

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
              to="/"
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

export default {
  name: 'ItemsList',
  components: { ListItemModal, ListItem, RewardItem },
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
  font-family: 'SF Pro Display', serif

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

</style>
