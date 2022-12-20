<template>
  <b-row class="my-2 mx-3">
    <b-col md="6" class="text-center w-50 line-bar">
      <p class="fw-6 fs-13 lh-16 mb-1">
        {{ $t('shop_by_style.style_id') }}
      </p>
      <p class="mb-1 fw-5 fs-14 lh-17">{{ $route.params.product }}</p>
    </b-col>
    <b-col md="6" class="text-center w-50">
      <p class="fw-6 fs-13 lh-16 mb-1">
        {{ $t('common.color') }}
      </p>
      <p class="mb-1 fw-5 fs-14 lh-17">{{ product ? product.colorway : '' }}</p>
    </b-col>
    <b-col cols="12" class="p-0">
      <Loader v-if="loading" class="min-vh-100" />
      <div v-if="product">
        <div>
          <ProductImageViewer
            v-if="!has360Images"
            :product="product"
            :showSlider="false"
            class="product-image-wrapper"
          />
          <ProductImageViewerMagic360
            v-if="has360Images"
            :product="product"
            class="product-image-wrapper"
          />
        </div>
        <div class="px-md-1 px-xl-1">
          <ProductTitle
            :product-name="product.name"
            :product="product"
            :lowest-price="lowestPrice"
            :product-last-sale-price="
              isNaN(product.last_sold_for) ? 0 : product.last_sold_for
            "
            class="mt-5"
          />
          <!-- Lowest Price & Highest Offer Nav Group -->
          <NavGroup
            v-model="method"
            :data="methods"
            nav-key="method"
            class="text-center mt-4 body-8-normal d-none d-sm-block"
            :btnGroupStyle="{
              minHeight: '40px',
            }"
            @change="handleMethodNavClick"
          />
          <b-row class="mt-2 offer-text d-none d-sm-flex mx-auto">
            <b-col md="6" class="text-center">
              <span class="body-1-medium" :class="method === 'buy' && 'active'">
                {{ lowestPrice | toCurrency }}
              </span>
            </b-col>
            <b-col md="6" class="text-center">
              <span
                class="body-1-medium"
                :class="method === 'offer' && 'active'"
              >
                {{ highestOffer | toCurrency }}
              </span>
            </b-col>
          </b-row>
          <!-- End of Lowest Price & Highest Offer Nav Group -->

          <ProductSizePicker
            :sizes="sizes"
            :prices="pricesBySize"
            :value="currentSize"
            :viewMode="sizeViewMode"
            :arrows-visible="false"
            class="size-picker"
            :xsCount="5"
            @update="handleSizeChange"
            @changeViewMode="handleSizeViewModeChange"
          >
            <template #all-sizes-btn>
              <div @click="openSizePicker">
                <img
                  width="18"
                  height="18"
                  :src="require('~/assets/img/icons/eye2.svg')"
                  class="d-sm-none"
                  :class="iconClass"
                />
                <span class="all-sizes" :class="iconTextClass" role="button">
                  {{ $t('products.all_sizes') }}
                </span>
              </div>
            </template>
          </ProductSizePicker>

          <ProductBoxConditionPicker
            :value="currentCondition"
            :conditions="packagingConditions"
            class="box-conditions mb-3"
            @change="handleConditionChange"
          />

          <!-- User Conditional Actions -->
          <OutOfStock
            v-if="
              method === 'buy' &&
              isOutOfStock &&
              sizeViewMode === 'carousel' &&
              !offerAmount
            "
            class="mt-3 px-4 d-none d-sm-block px-sm-0"
            :product="product"
            @notify-me="handleNotifyMeClick"
            @offer-duration="handleOfferDurationEvent"
          />

          <OfferDuration
            v-else-if="sizeViewMode === 'carousel' && offerAmount"
            class="mt-3 px-3 px-sm-0"
            :offer-amount="offerAmount"
            @place-offer="handleOfferSubmit"
            @clear-offer="offerAmount = null"
          />

          <BuyNow
            v-else-if="method === 'buy' && sizeViewMode === 'carousel'"
            class="mt-3 d-none d-sm-block"
            :product="product"
            :lowest-price="lowestPrice"
            @buy-now="handleBuyNowClick"
            @add-to-cart="handleAddToCartClick"
            @shipping-option-selected="handleShippingOptionSelected"
          />

          <SellNow
            v-else-if="sizeViewMode === 'carousel' && !offerAmount"
            class="mt-3 px-3 px-sm-0"
            :highest-offer="highestOffer"
            @offer-duration="handleOfferDurationEvent"
            @sell-now="handleSellNowClick"
          />
          <!-- End of User Conditional Actions -->
        </div>
      </div>

      <!-- Product Details & Size Guide Section -->
      <div v-if="product">
        <ProductDetailsTab
          :product="product"
          :selected-size="productCurrentSize"
        />
      </div>
      <!-- End of Product Details & Size Guide Section -->

      <AlertModal id="message-modal" :message="message" icon="tick" />
      <div class="row mt-3 ml-2 mr-2">
        <div class="w-75 text-left">
          <p class="fw-6 fs-16">{{ $t('shop_by_style.more_look') }}</p>
        </div>
        <div class="w-25 fw-5 fs-14 text-right view-all">
          <p>{{ $t('shop_by_style.view_all') }}</p>
        </div>
      </div>
      <ProductCarousel
        :products="style.products"
        :pageName="pageName"
        itemWidth="164px"
        autoWidth
      >
        <template #product>
          <div
            v-for="(product, index) in filteredProducts"
            :key="`product-carousel-${index}`"
            class="item"
          >
            <DetailCard
              :product="product"
              :showActionBtn="false"
              :showActions="false"
              cardHeight="137px"
              cardHeightSm="180px"
              cardWidthSm="164px"
              :showSize="false"
              :showPrice="true"
              noRedirect
            >
              <template #badge>
                <div
                  class="d-flex justify-content-end"
                  @click="redirectToDetail(product)"
                >
                  <PlusCircle />
                </div>
              </template>
            </DetailCard>
          </div>
        </template>
      </ProductCarousel>

      <!-- Error message text -->
      <b-row v-if="errorText" class="mt-2 text-center">
        <b-col md="12">
          <div class="body-5-normal text-color-red-3">{{ errorText }}</div>
        </b-col>
      </b-row>
      <!-- End of Error message text -->

      <OutOfStockSm
        v-if="method === 'buy' && isOutOfStock && sizeViewMode === 'carousel'"
        class="px-4 d-sm-none"
        :product="product"
        @notify-me="handleNotifyMeClick"
        @place-offer="handleOfferSubmit"
      />

      <BuyNow
        v-else-if="method === 'buy' && sizeViewMode === 'carousel' && product"
        class="mt-3 px-4 d-sm-none"
        :product="product"
        :lowest-price="lowestPrice"
        @buy-now="handleBuyNowClick"
        @add-to-cart="handleAddToCartClick"
        @shipping-option-selected="handleShippingOptionSelected"
      />
    </b-col>

    <!-- bottom sheet for all sizes  -->
    <vue-bottom-sheet
      ref="sizePicker"
      max-width="auto"
      max-height="85vh"
      :rounded="true"
      :is-full-screen="true"
      class="mobile-sizes-scroll"
    >
      <div class="all-sizes-bottom-sheet">
        <div class="border-bottom mb-3 pb-2 bottom_sheet_header">
          <h3 class="font-secondary fs-16 fw-7 text-black text-center mb-1">
            {{ $t('shop_by_style.general.all_sizes') }}
          </h3>
          <p class="text-center mb-1 fs-15 fw-4">{{ product ? product.name : '' }}</p>
        </div>
        <div class="bottom_sheet_body">
          <div class="radio_wrapper">
            <div v-for="(size, index) in sizes" :key="index">
              <SizePickerMobile
                v-model="selectedSize"
                list
                :size="size.size"
                :price="getPriceBySize(size.id)"
                :boxCondition="'Excellent'"
                :val="size.id"
                name="sizePicker"
                @notify-me="handleNotifyMeClick"
              />
            </div>
          </div>
        </div>
        <div
          class="bottom-sheet-footers position-absolute d-flex justify-content-between align-items-center w-100 p-3 bg-white"
        >
          <button
            class="btn fs-16 fw-6 font-secondary rounded-pill btn-outline-dark"
          >
            {{ $t('common.reset') }}
          </button>
          <button
            class="btn text-white fs-16 fw-6 font-secondary rounded-pill apply-btn"
          >
            {{ $t('orders.apply_filter') }}
          </button>
        </div>
      </div>
    </vue-bottom-sheet>
  </b-row>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import { NavGroup, Loader } from '~/components/common'
import ProductTitle from '~/components/shop-by-style/ProductTitle'
import ProductImageViewer from '~/components/product/ImageViewerV2'
import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import ProductSizePicker from '~/components/product/SizePicker'
import ProductBoxConditionPicker from '~/components/product/BoxConditionPicker'
import ProductDetailsTab from '~/components/shop-by-style/DetailsTab'
import AlertModal from '~/components/modal/Alert'
import { API_PROD_URL } from '~/static/constants/environments'
import { AMOUNT_OFFSET, INSTANT_SHIPPING } from '~/static/constants'
import BuyNow from '~/components/shop-by-style/BuyNow'
import OutOfStock from '~/components/product/OutOfStock'
import OutOfStockSm from '~/components/shop-by-style/OutOfStock'
import SellNow from '~/components/product/SellNow'
import OfferDuration from '~/components/product/OfferDuration'
import PlusCircle from '~/assets/icons/PlusCircle'
import ProductCarousel from '~/components/shop-by-style/ProductCarousel'
import DetailCard from '~/components/shop-by-style/DetailCard'
import SizePickerMobile from '~/components/shop-by-style/SizePickerMobile'
export default {
  name: 'ShopByStyleProductDetails',
  components: {
    OfferDuration,
    OutOfStock,
    OutOfStockSm,
    BuyNow,
    SellNow,
    ProductTitle,
    ProductImageViewer,
    ProductImageViewerMagic360,
    NavGroup,
    ProductSizePicker,
    ProductBoxConditionPicker,
    ProductDetailsTab,
    Loader,
    AlertModal,
    PlusCircle,
    ProductCarousel,
    DetailCard,
    SizePickerMobile,
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
      selectedSize: null,
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
      message: null,
      amountOffset: AMOUNT_OFFSET,
      shippingOption: '',
      offerAmount: null,
      style: {
        id: '',
      },
    }
  },
  async fetch() {
    const sku = this.$route.params.sku
    const styleID = this.$route.params.product
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
    this.$axios
      .get('/shop-by-style/' + this.$route.params.product)
      .then((res) => {
        this.style = {
          styleID,
          images: res.data.data.images,
          products: res.data.data.products,
          style: res.data.data.style,
        }
      })
      .catch((error) => {
        this.$toasted.error(error)
      })
    this.loading = false
  },
  computed: {
    ...mapGetters({
      isVendor: 'auth/isVendor',
      isAuthenticated: 'auth/authenticated',
      getSelectedItemforVendor: 'sell-now/getSelectedItem',
      hasVendorPayoutMethod: 'auth/getVendorPayoutMethod',
    }),

    filteredProducts() {
      return this.style.products.filter(
        (item) => item.sku !== this.$route.params.sku
      )
    },
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
    highestOfferId() {
      return this.product?.highest_offers?.find(
        (i) =>
          i.size_id === this.currentSize &&
          i.packaging_condition_id === this.currentCondition
      )?.offer_id
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
    instantShip(vm) {
      return vm.product?.instant_ship ? vm.product?.instant_ship : null
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
    errorText() {
      for (const errorKey in this.error) {
        if (this.error[`${errorKey}`]) {
          return this.error[`${errorKey}`]
        }
      }

      return false
    },
    productCurrentSize(vm) {
      return vm.sizes.find((size) => size.id === vm.currentSize)
    },
  },
  methods: {
    ...mapActions({
      checkItemExistforVendor: 'sell-now/checkItemExistforVendor',
      storeOfferDetails: 'offer/storeOfferDetails',
    }),
    // Get min price for a given size among listing items
    getPriceBySize(sizeId) {
      return this.pricesBySize.find((i) => String(i.size_id) === String(sizeId))
        ?.price
    },
    openSizePicker() {
      this.$refs.sizePicker.open()
    },
    closeSizePicker() {
      this.$refs.sizePicker.close()
    },
    handleShippingOptionSelected(shippingOption) {
      this.shippingOption = shippingOption
    },
    resetError() {
      this.error = {
        addToCart: null,
        buyNow: null,
        makeOffer: null,
        shipping: null,
      }
    },
    handleMethodNavClick(method) {
      if (method) {
        this.method = method
      }
    },
    redirectToDetail(product) {
      this.$router.push(
        `/shop-by-style/${this.$route.params.product}/${product.sku}`
      )
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
        size: this.sizes.find((item) => item.id === this.currentSize),
        quantity: 1,
        wishLists: this.product?.wish_lists,
        packaging_condition: this.packagingConditions.find(
          (item) => item.id === this.currentCondition
        ).name,
        inventory_stock: this.currentListingItem?.inventory_stock,
        price: this.currentListingItem?.inventory?.sale_price,
        instantShipPrice:
          this.shippingOption === INSTANT_SHIPPING
            ? this.currentListingItem?.inventory?.instant_ship_price
            : 0,
        image: `${this.API_PROD_URL}/${this.category}/${this.sku}/image`,
        listing_item_id: this.currentListingItem?.id,
      }
    },
    handleAddToCartClick() {
      this.resetError()

      if (!this.currentSize) {
        return (this.error.addToCart = this.$t('products.error.select_size'))
      }

      if (this.instantShip && !this.shippingOption) {
        return (this.error.shipping = this.$t(
          'products.error.select_shipping_type'
        ))
      }

      this.addingToCart = true
      this.$store.dispatch(
        'shopping-cart/addOrIncrementQuantityProduct',
        this.getCartProduct()
      )
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

      if (this.instantShip && !this.shippingOption) {
        return (this.error.shipping = this.$t(
          'products.error.select_shipping_type'
        ))
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
    handleOfferDurationEvent(amount) {
      this.resetError()
      // If no size is selected.
      if (!this.currentSize) {
        return (this.error.makeOffer = this.$t(
          'products.error.select_size_to_offer'
        ))
      }
      // If no amount.
      if (!amount || amount <= 0) {
        return (this.error.makeOffer = this.$t(
          'products.error.enter_valid_amount'
        ))
      }
      // If not logged in.
      if (!this.$auth.loggedIn) {
        return this.$router.push('/login')
      }

      this.offerAmount = amount
    },
    handleOfferSubmit(payload) {
      this.resetError()
      // If no amount.
      if (!payload.offerAmount || payload.offerAmount <= 0) {
        return (this.error.makeOffer = this.$t(
          'products.error.enter_valid_amount'
        ))
      }
      // If not duration.
      if (!payload.offerDuration) {
        return (this.error.makeOffer = this.$t(
          'products.error.select_offer_duration'
        ))
      }
      // Do the place offer.
      this.storeOfferDetails({
        bid_price: payload.offerAmount * this.amountOffset,
        packaging_condition_id: this.currentCondition,
        size_id: this.currentSize,
        product: this.product,
        duration: payload.offerDuration,
        quantity: 1,
      })
        .then(() => {
          this.$router.push('/checkout/place-offer')
        })
        .catch((err) => {
          this.$logger.logToServer('Place an offer', err.response)
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
          this.$store
            .dispatch('sell-now/selectedItem', res.data.data)
            .then(() => {
              return this.moveToSellNow()
            })
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Sell now create inventory and listing error',
            err.response
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
          selectedOfferId: this.highestOfferId,
        }

        this.$store.dispatch('sell-now/addItem', sellNowData)
        this.$router.push('/checkout/sell-now')
      }
    },
    // On create listing click, redirect to list creation page.
    redirectToCreateListing() {
      // If not authenticated redirect to login
      if (!this.authenticated) {
        return this.$router.push('/login')
      }
      // If authenticated, but the user is not a vendor, redirect to vendor hub.
      if (this.authenticated && !this.isVendor) {
        return this.$router.push('/profile/vendor-hub')
      }
      // Redirect to listing page.
      this.$router.push('/profile/create-listing')
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.view-all
  color: $color-gray-30
.line-bar
  border-right: 1px solid $color-gray-47
.lh-16
  line-height: 16px
.lh-17
  line-height: 17px
  color: $color-grey-101
.product-image-wrapper
  @media (min-width: 576px)
    margin-top: 110px

.nav-group::v-deep
  @media (min-width: 576px)
    margin: 32px 0 15px

    .btn-group
      min-width: 408px

.mx-72
  @media (min-width: 576px)
    padding-left: 72px
    padding-right: 72px

.offer-text
  color: $color-gray-20

  @media (min-width: 576px)
    width: 408px

  .active
    color: $black

.size-picker::v-deep
  padding: 0
  margin: 0 -16px
  max-width: 100vw
  width: 100vw
  .carousel-wrapper
    .owl-item
      margin-right: 17px
    .row
      margin: 0 16px
::v-deep .box-conditions
  .dropdown-wrapper
    padding: 0
    width: 315px
    margin: 15px auto
    margin-bottom: 26px

.text-color-red-3
  color: $color-red-3

.body-17-medium
  @include body-17-medium

.create-listing
  background: $color-white-5
  padding-left: 20px

.listing-title
  @include body-2-normal
  margin-top: 32px

.listing-sub-title
  @include body-8-normal
  color: $color-white-17
  margin-top: 15px

.create-listing-btn
  @include body-4-normal
  margin-top: 20px
  margin-bottom: 42px
  min-height: 35px
  background: $color-blue-20
  padding: 5px 20px
  border-radius: 20px
  color: $color-white-1

.product-image-wrapper
  margin-top: 13px
  width: 286px
  height: 286px
  margin-left: 45px

.buy-now-section, .out-of-stock-section
  position: fixed
  bottom: 94px
  z-index: 9
  width: 100vw
  height: 90px
  background: $color-white-1
  padding: 4px 17px 14px 17px
  left: 0
.all-sizes-bottom-sheet
  padding-bottom: 90px
  .bottom_sheet_body
    margin: 0 19px
    .radio_wrapper
      margin: 0 -19px
      ::v-deep .list-type .radio-title
        padding-left: 19px
        padding-right: 19px
.mobile-sizes-scroll
  ::-webkit-scrollbar-thumb
    background-color: $color-gray-23
</style>
