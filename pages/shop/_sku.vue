<template>
  <b-container fluid class="wrapper">
    <Loader v-if="loading" class="min-vh-100" />
    <div v-else-if="product">
      <b-row>
        <b-col lg="6">
          <ProductBreadcrumb
            :category="category"
            :brand="product.brand"
            :name="product.colorway"
          ></ProductBreadcrumb>

          <ProductTitle
            :product-name="product.name"
            :product-color="product.colorway"
            :product-price="lowestPrice"
            :category="category"
            :sku="sku"
            class="mt-3"
          ></ProductTitle>

          <ProductImageViewer v-if="!has360Images" :product="product" />

          <ProductImageViewerMagic360 v-if="has360Images" :product="product" />

          <div class="create-listing-text mt-5 mb-4">
            {{ $t('products.have_pair_to_sell') }}
            <!-- todo: add link -->
            <span class="link" role="button" @click="redirectToCreateListing">
              {{ $t('products.create_a_listing') }}
            </span>
          </div>
        </b-col>
        <b-col lg="6">
          <div class="d-flex flex-column align-items-center position-relative">
            <div class="icon-btns">
              <Button
                :id="`popover-wishlist-${product.id}`"
                variant="white"
                :icon="wishList ? `heart-red.svg` : 'heart2.svg'"
                icon-only
                class="mr-3"
                tabindex="0"
                :tooltip-text="wishList ? wishList.name : ''"
                pill
                @click="removeFromWishList"
              >
              </Button>
              <Button variant="white" icon="share.svg" icon-only pill />
            </div>

            <div class="last-sold-text">
              {{ $t('products.last_sold_for') }}:
              {{ product.last_sold_for | toCurrency }}
            </div>

            <NavGroup
              v-model="method"
              :data="methods"
              nav-key="method"
              class="method-nav"
              @change="handleMethodNavClick"
            />

            <div class="price-section">
              <div :class="method == 'buy' && 'active'">
                {{ lowestPrice | toCurrency }}
              </div>
              <div :class="method == 'offer' && 'active'">
                {{ highestOffer | toCurrency }}
              </div>
            </div>

            <div v-if="!tableType" class="w-100">
              <ProductSizePicker
                :sizes="sizes"
                :prices="pricesBySize"
                :value="currentSize"
                :viewMode="sizeViewMode"
                class="size-picker"
                @update="handleSizeChange"
                @changeViewMode="handleSizeViewModeChange"
              />

              <ProductBoxConditionPicker
                :value="currentCondition"
                :conditions="packagingConditions"
                class="box-conditions"
                @change="handleConditionChange"
              />

              <div
                v-if="method === 'buy' && isOutOfStock"
                class="out-of-stock-btns"
              >
                <div class="warn-text">
                  {{ $t('products.error.out_of_stock') }}
                </div>

                <Button
                  variant="outline-dark-blue"
                  block
                  black-text
                  border="thick"
                  @click="handleNotifyMeClick"
                >
                  {{ $t('products.notify_me') }}
                </Button>
              </div>

              <div
                v-else-if="
                  method === 'buy' &&
                  sizeViewMode === 'carousel' &&
                  !isOutOfStock
                "
                class="action-btns"
              >
                <div>
                  <Button
                    variant="warning"
                    block
                    border="thick"
                    :disabled="addingToCart"
                    @click="handleAddToCartClick"
                  >
                    <div class="d-flex justify-content-center">
                      <div>{{ $t('products.add_to_bag') }}</div>
                      <div
                        class="ml-1"
                        :class="
                          addingToCart ? 'add-to-cart-animation' : 'invisible'
                        "
                      >
                        +1
                      </div>
                    </div>
                  </Button>
                  <div class="error-text">
                    {{ error.addToCart }}
                  </div>
                </div>
                <div>
                  <Button
                    variant="dark-blue"
                    block
                    class="mt1"
                    border="thick"
                    @click="handleBuyNowClick"
                  >
                    <div class="mr-3">
                      {{ $t('products.buy_now') }}
                    </div>
                  </Button>
                  <div v-if="error.buyNow" class="error-text">
                    {{ error.buyNow }}
                  </div>
                </div>
              </div>

              <div
                v-else-if="method === 'offer' && sizeViewMode === 'carousel'"
                class="action-btns"
              >
                <!-- Make an Offer  -->
                <div>
                  <ProductOfferInput
                    :min-amount="
                      currentListingItem ? currentListingItem.min_bid_price : 0
                    "
                    @submit="handleOfferSubmit"
                  />
                  <div v-if="error.makeOffer" class="error-text">
                    {{ error.makeOffer }}
                  </div>
                </div>
                <!-- ./Make an Offer -->

                <!-- Sell Now Button -->
                <Button
                  variant="outline-dark-blue"
                  block
                  black-text
                  border="thick"
                  class="mt2"
                  @click="handleSellNowClick"
                >
                  <div class="d-flex justify-content-between">
                    <div>{{ $t('products.sell_now') }}</div>
                    <div>{{ highestOffer | toCurrency }}</div>
                  </div>
                </Button>
                <!-- ./Sell Now Button -->
              </div>
            </div>

            <div v-else-if="tableType === 'asks'" class="table-wrapper">
              <ProductRecentAsks :sku="product.sku" @close="setTableType()" />
            </div>

            <div v-else-if="tableType === 'offers'" class="table-wrapper">
              <ProductRecentOffers :sku="product.sku" @close="setTableType()" />
            </div>

            <div v-else-if="tableType === 'sales'" class="table-wrapper">
              <ProductRecentSales :sku="product.sku" @close="setTableType()" />
            </div>

            <div v-if="sizeViewMode === 'carousel'" class="mt-4">
              <Button
                variant="light-gray"
                class="btn-asks"
                :pressed="tableType === 'asks'"
                @click="setTableType('asks')"
                >{{ $t('products.asks') }}</Button
              ><Button
                variant="light-gray"
                class="btn-asks"
                :pressed="tableType === 'offers'"
                @click="setTableType('offers')"
                >{{ $t('products.offers') }}</Button
              ><Button
                variant="light-gray"
                class="btn-asks"
                :pressed="tableType === 'sales'"
                @click="setTableType('sales')"
                >{{ $t('products.sales') }}</Button
              >
            </div>

            <ProductAcceptedPayments
              v-if="sizeViewMode === 'carousel'"
              class="mt-4"
            />
          </div>
        </b-col>
      </b-row>

      <b-row
        v-if="product.similar_products && product.similar_products.length > 0"
      >
        <b-col>
          <ProductSimilarItems
            :products="product.similar_products"
            class="mt-4"
          />
        </b-col>
      </b-row>

      <b-row class="mt-4">
        <b-col md="6">
          <ProductDetailsTab :product="product" />
        </b-col>
        <b-col md="6">
          <ProductPromo :product="product" />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <ProductLatestSales
            :value="product.latest_sales"
            :sku="product.sku"
          />
        </b-col>
      </b-row>

      <AlertModal id="message-modal" :message="message" icon="tick" />

      <WishListPopover
        v-if="!wishList"
        :product="product"
        :wish-list="wishList"
        :target="`popover-wishlist-${product.id}`"
        @show="wishListShow = true"
        @hidden="wishListShow = false"
        @wishlisted="onWishListed"
      />
    </div>
  </b-container>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import { NavGroup, Button, Loader } from '~/components/common'
import ProductBreadcrumb from '~/components/product/Breadcrumb'
import ProductTitle from '~/components/product/ProductTitle'
import ProductImageViewer from '~/components/product/ImageViewerV2'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import ProductSizePicker from '~/components/product/SizePicker'
import ProductAcceptedPayments from '~/components/product/AcceptedPaymentsV2'
import ProductOfferInput from '~/components/product/OfferInput'
import ProductBoxConditionPicker from '~/components/product/BoxConditionPicker'
import ProductSimilarItems from '~/components/product/SimilarItems'
import ProductDetailsTab from '~/components/product/DetailsTab'
import ProductPromo from '~/components/product/Promo'
import ProductLatestSales from '~/components/product/LatestSales'
import WishListPopover from '~/components/wish-list/Popover.vue'
import AlertModal from '~/components/modal/Alert'
import ProductRecentAsks from '~/components/product/RecentAsks'
import ProductRecentOffers from '~/components/product/RecentOffers'
import ProductRecentSales from '~/components/product/RecentSales'
import { API_PROD_URL } from '~/static/constants/environments'
import { AMOUNT_OFFSET } from '~/static/constants'

export default {
  components: {
    ProductBreadcrumb,
    ProductTitle,
    ProductImageViewer,
    ProductImageViewerMagic360,
    NavGroup,
    Button,
    ProductSizePicker,
    ProductAcceptedPayments,
    ProductOfferInput,
    ProductBoxConditionPicker,
    ProductSimilarItems,
    ProductDetailsTab,
    ProductPromo,
    ProductLatestSales,
    WishListPopover,
    Loader,
    AlertModal,
    ProductRecentAsks,
    ProductRecentOffers,
    ProductRecentSales,
  },

  layout: 'IndexLayout',

  fetchOnServer: false,

  data() {
    return {
      API_PROD_URL,
      MODAL_FADE_TIMEOUT: 2000,
      product: null,
      currentSize: null,
      currentCondition: null,
      currentListingItem: null,
      loading: true,
      methods: [
        {
          label: this.$t('products.lowest_price'),
          value: 'buy',
        },
        {
          label: this.$t('products.highest_offer'),
          value: 'offer',
        },
      ],
      method: 'buy',
      error: {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
      },
      sizeViewMode: 'carousel',
      addingToCart: false,
      similiarProducts: [],
      message: null,
      wishListShow: false,
      tableType: null,
      amountOffset: AMOUNT_OFFSET
    }
  },

  async fetch() {
    const { sku } = this.$route.params

    this.loading = true
    this.product = await this.$axios
      .get(`/products/${sku}/details`)
      .then((res) => res.data)
    if (this.product) {
      const lowestPrice = _.minBy(this.product.lowest_prices, 'price')
      if (lowestPrice) {
        this.currentSize = lowestPrice.size_id
        this.currentCondition = lowestPrice.packaging_condition_id
        await this.findListingItem() // 'add to chart' button needs listing of item
      } else {
        this.currentCondition = this.product.packaging_conditions[0]?.id
      }
    }
    this.loading = false
  },

  computed: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
      isAuthenticated: 'auth/authenticated',
      getSelectedItemforVendor: 'sell-now/getSelectedItem',
    }),
    category() {
      return this.product?.category?.name
    },

    sku() {
      return this.product?.sku
    },

    has360Images() {
      return this.product?.has360Images
    },

    lowestPrice() {
      return this.product?.lowest_prices?.find(
        (i) =>
          i.size_id === this.currentSize &&
          i.packaging_condition_id === this.currentCondition
      )?.price
    },

    highestOffer() {
      return this.product?.highest_offers?.find(
        (i) =>
          i.size_id === this.currentSize &&
          i.packaging_condition_id === this.currentCondition
      )?.price
    },

    sizes() {
      return this.product?.sizes || []
    },

    packagingConditions() {
      return this.product?.packaging_conditions || []
    },

    isOutOfStock() {
      return this.currentSize && !this.currentListingItem
    },

    pricesBySize() {
      if (this.method === 'buy') {
        return this.product?.lowest_prices?.filter(
          (i) => i.packaging_condition_id === this.currentCondition
        )
      } else {
        return this.product?.highest_offers?.filter(
          (i) => i.packaging_condition_id === this.currentCondition
        )
      }
    },

    wishList() {
      return this.product.wish_lists && this.product.wish_lists.length > 0
        ? this.product.wish_lists[0]
        : null
    },
  },

  methods: {
    ...mapActions({
      removeProductsFromWishList: 'wish-list/removeProductsFromWishList',
      checkItemExistforVendor: 'sell-now/checkItemExistforVendor',
      storeOfferDetails: 'offer/storeOfferDetails'
    }),

    resetError() {
      this.error = {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
      }
    },

    handleMethodNavClick(method) {
      if (method) {
        this.method = method
      }
    },

    async findListingItem() {
      if (!this.currentSize || !this.currentCondition) return
      const params = {
        size_id: this.currentSize,
        packaging_condition_id: this.currentCondition,
      }
      this.currentListingItem = await this.$axios
        .get(`/products/${this.product.id}/selling-item`, {
          params,
          handleError: false,
        })
        .then((res) => res.data)
        .catch(() => null)
      if (
        this.currentListingItem &&
        this.currentListingItem.inventory &&
        this.currentListingItem.inventory.sale_price < this.lowestPrice
      ) {
        this.product.lowest_prices = this.product.lowest_prices.map((i) => {
          if (
            i.size_id === this.currentSize &&
            i.packaging_condition_id === this.currentCondition
          ) {
            i.price = this.currentListingItem.inventory.sale_price
          }
          return i
        })
      }
    },

    handleSizeChange(sizeId) {
      if (sizeId) {
        this.currentSize = sizeId
        this.resetError()
        this.findListingItem()
      }
    },

    handleConditionChange(condition) {
      if (condition?.id !== this.currentCondition) {
        this.currentCondition = condition.id
        this.findListingItem()
      }
    },

    showMessageModal(message, callback = () => {}) {
      this.message = message
      this.$bvModal.show('message-modal')
      setTimeout(() => {
        this.$bvModal.hide('message-modal')
        callback()
      }, this.MODAL_FADE_TIMEOUT)
    },

    getCartProduct() {
      return {
        id: this.product.id,
        name: this.product.name,
        brand: this.product.brand,
        sku: this.product.sku,
        colorWay: this.product.colorway,
        size: this.sizes[this.currentSize - 1],
        quantity: 1,
        inventory_stock: this.currentListingItem?.inventory_stock,
        price: this.currentListingItem?.inventory?.sale_price,
        image: `${this.API_PROD_URL}/${this.category}/${this.sku}/image`,
        listing_item_id: this.currentListingItem?.id,
      }
    },

    handleAddToCartClick() {
      this.resetError()
      if (!this.currentSize) {
        return (this.error.addToCart = this.$t('products.error.select_size'))
      }

      this.addingToCart = true
      this.$store.dispatch('shopping-cart/addOrIncrementQuantityProduct', this.getCartProduct())
      this.showMessageModal(
        this.$t('products.message.added_to_cart', {
          productName: this.product.name,
        }),
        () => (this.addingToCart = false)
      )
    },

    handleBuyNowClick() {
      this.resetError()
      if (!this.currentSize) {
        this.error.buyNow = this.$t('products.error.select_size')
        return
      }

      this.$store.dispatch('shopping-cart/addProduct', this.getCartProduct())
      this.$router.push('/checkout/selling')
    },

    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },

    handleNotifyMeClick() {
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }

      this.$axios
        .post(`/products/${this.product.id}/requests`, {
          size_id: this.currentSize,
          packaging_condition_id: this.currentCondition,
        })
        .then(() => {
          this.showMessageModal(this.$t('products.message.send_item_email'))
        })
    },

    handleOfferSubmit(amount) {
      this.resetError()
      // If no size is selected.
      if (!this.currentSize) {
        return (this.error.makeOffer = this.$t(
          'products.error.select_size_to_offer'
        ))
      }
      // If no amount.
      if (!amount) {
        return (this.error.makeOffer = this.$t(
          'products.error.enter_valid_amount'
        ))
      }
      // If not logged in.
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }
      // Do the place offer.
      this.storeOfferDetails({
        bid_price : amount * this.amountOffset,
        packaging_condition_id: this.currentCondition,
        size_id: this.currentSize,
        product: this.product,
        quantity: 1
      }).then(() => {
        this.$router.push('/checkout/place-offer')
      }).catch((err) => {
        this.$logger.logToServer('Place an offer', err.response);
      })
    },
    // On sell now click
    handleSellNowClick() {
      // When user clicks on sell now, if not logged in, the user will go to login screen or to sign up,
      if (!this.authenticated) {
        this.$router.push('/login')
      }

      // If the user is not a vendor then we will redirect user to vendor hub apply page
      if (this.authenticated && !this.isVendor) {
        this.$router.push('/profile/vendor-hub')
        return
      }

      // If no highest offer is placed.
      if (!this.highestOffer) {
        this.$toasted.error(this.$t('sell_now.no_offer'))
        return false
      }

      // If no listing or
      // If the currently listing inventory's vendor id doesnot matches the logged in vendor id,
      // then create listing with inventory.

      this.checkItemExistforVendor({
        productID: this.getCartProduct().id,
        sizeId: this.currentSize,
        packagingConditionId:
          this.packagingConditions[this.currentCondition - 1].id,
        offerAmount: this.highestOffer,
      })
        .then((res) => {
          this.$store.dispatch('sell-now/selectedItem', res.data.data).then(() => {
            this.moveToSellNow()
          })

          return true
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Sell now create inventory and listing error',
            err.response.data.message
          )
          this.$nuxt.refresh()
        })
    },

    moveToSellNow() {
      // after becoming a vendor or logging in as a vendor, the user will see
      // the above screen for the sell now based on commission percentage like if
      // vendor specific is defined then vendor specific otherwise global and
      // calculate the products price including shipping and processing fee
      if (
        this.getSelectedItemforVendor &&
        this.getSelectedItemforVendor.product &&
        this.authenticated &&
        this.isVendor
      ) {
        const sellNowData = {
          id: this.getSelectedItemforVendor.product_id,
          size: this.getSelectedItemforVendor.size,
          size_id: this.getSelectedItemforVendor.size_id,
          name: this.getSelectedItemforVendor.product.name,
          product: this.product,
          brand: this.getSelectedItemforVendor.product.brand,
          sku: this.getSelectedItemforVendor.product.sku,
          colorWay: this.getSelectedItemforVendor.product.colorway,
          image: `${this.API_PROD_URL}/${this.getSelectedItemforVendor.product.category.name}/${this.getSelectedItemforVendor.product.sku}/image`,
          quantity: 1,
          packaging_condition:
            this.packagingConditions[
              this.getSelectedItemforVendor.packaging_condition_id - 1
            ],
          packaging_condition_id:
            this.packagingConditions[
              this.getSelectedItemforVendor.packaging_condition_id - 1
            ].id,
          price: this.getSelectedItemforVendor.sale_price,
          listing_item_id: this.getSelectedItemforVendor.listing_items[0].id,
          highestOffer: this.highestOffer,
        }

        this.$store.dispatch('sell-now/addItem', sellNowData)
        this.$router.push('/checkout/sell-now')
      }
    },

    onWishListed(wishList) {
      if (wishList) {
        this.product.wish_lists = [wishList]
        this.wishListShow = false
      }
    },

    removeFromWishList() {
      if (this.wishList) {
        // We need to blur button in order to make popover work again.
        document.activeElement.blur()
        this.removeProductsFromWishList({
          wishList: this.wishList,
          ids: [this.product.id],
        })
        this.product.wish_lists = []
      }
    },

    setTableType(type) {
      this.tableType = type
    },

    // On create listing click, redirect to list creation page.
    redirectToCreateListing(){
      // If not authenticated redirect to login
      if(!this.authenticated){
        return this.$router.push('/login')
      }
      // If authenticated, but the user is not a vendor, redirect to vendor hub.
      if (this.authenticated && !this.isVendor) {
        return this.$router.push('/profile/vendor-hub')
      }
      // Redirect to listing page.
      this.$router.push('/profile/create-listing')
    }
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.wrapper
  padding: 20px 40px
  position: relative
  max-width: 1440px
  margin-left: auto
  margin-right: auto

  .create-listing-text
    @include body-8-medium
    margin-top: 40px
    color: $color-black-1

    >span.link
      color: $color-blue-20
      font-weight: $normal

  .last-sold-text
    @include body-4-medium
    color: $color-gray-6
    border-bottom: 1px solid $color-gray-6
    margin-top: 13px

  .icon-btns
    position: absolute
    right: 0
    top: 0
    display: flex
    align-items: center

  .method-nav::v-deep
    margin-top: 13px

    .btn-group
      padding: 6px 7px

      .btn
        @include body-8-bold
        padding: 6px 35px
        height: auto
        width: 198px

  .price-section
    display: flex
    margin-top: 12px

    >div
      @include heading-3
      width: 198px
      padding: 14px 0
      text-align: center
      color: $color-gray-20

      &.active
        color: $color-black-1

  .action-btns
    margin-top: 20px

    >div, .btn
      width: 408px
      max-width: 100%
      margin-left: auto
      margin-right: auto

    .mt1
      margin-top: 10px

    .mt2
      margin-top: 10px

    .error-text
      @include body-5-normal
      color: $color-red-3
      margin-top: 3px
      height: 17px
      padding-left: 20px

    .add-to-cart-animation::v-deep
      animation: 0.5s anim-lineUp ease-out
      opacity: 0
    @keyframes anim-lineUp
      0%
        opacity: 1
        transform: translateY(30%)
      20%
        opacity: 1
      50%
        opacity: 0.5
        transform: translateY(-30%)
      100%
        opacity: 0
        transform: translateY(-50%)

  .out-of-stock-btns
    .warn-text
      @include body-8-medium
      color: $color-black-1
      width: 300px
      margin-left: auto
      margin-right: auto
      text-align: center
      margin-top: 25px

    .btn
      width: 408px
      max-width: 100%
      margin-top: 16px
      margin-left: auto
      margin-right: auto

  .btn-asks
    width: 120px
    margin: 0 12px

    &.active
      background-color: $color-gray-4

  .size-picker::v-deep
    .size-carousel
      margin-left: auto
      margin-right: auto

      .owl-carousel
        .item
          &.active
            &::after
              border-color: $color-blue-20

    .all-sizes
      .item
        &.active
          &::after
            border-color: $color-blue-20

  .table-wrapper
    width: 475px
    max-width: 100%

@media (max-width: 620px)
  .wrapper
    .btn-asks
      width: 100%
      margin: 8px 0

@media (max-width: 576px)
  .wrapper
    .size-picker::v-deep
      width: 100%

      .all-sizes
        .item
          width: 33%

    .icon-btns
      position: relative

    .last-sold-text
      margin: 20px 0

    .box-conditions::v-deep
      .box-condition-btns
        display: flex
        flex-direction: column
    .action-btns
      width: 100%
    .out-of-stock-btns
      width: 100%
</style>
