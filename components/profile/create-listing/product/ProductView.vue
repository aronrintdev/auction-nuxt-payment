<template>
  <div class="profile-view">
    <span
      v-if="!isScreenXS"
      role="button" :class="backButtonClass"
      class="backToSearch body-13"
      @click="$emit('back')"
    >
      <img :src="require('~/assets/img/icons/arrow-left-gray.svg')" class="img-fluid"/>
      {{ $t(backButtonText) }}
    </span>
    <b-row>
      <b-col sm="12" md="6">
      </b-col>
      <b-col v-if="!isScreenXS" sm="12" md="6">
        <ProductTitle
          :product="product"
          :product-name="product.name"
          :lowest-price="lowestPrice ? lowestPrice : 0"
          :product-last-sale-price="lastSold && lastSold.sale_price ? lastSold.sale_price : 0"
          class="mt-5"
        />
      </b-col>
      <b-col v-else sm="12" md="6">
        <!-- Nav Bar Mobile -->
        <div class="row mb-3 w-100">
          <div class="col-12">
            <nav-group
              v-model="selectedCategory"
              :data="visibleCategories"
              nav-key="category"
              class="m-0 w-100 d-flex justify-content-center"
            />
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-between mt-2 mx-3">
              <div class="mx-3 text-gray-24 body-5-medium w-100 text-center" :class="selectedCategory == buy && 'active text-black'">
                {{ lowestPrice | toCurrency }}
              </div>
              <div class="mx-3 text-gray-24 body-5-medium w-100 text-center" :class="selectedCategory == offer && 'active text-black'">
                {{ highestOffer | toCurrency }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nav Bar Mobile end -->
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="12" md="6">
        <!-- Product thumbnail -->
        <ProductThumb
          v-if="!has360Images"
          :product="product"
          overlay
          class="product-thumbnail mx-auto align-items-center overflow-hidden mt-3"
        />
        <!-- Product thumbnail ends -->

        <!-- Product thumbnail 360 -->
        <ProductImageViewerMagic360
          v-if="has360Images"
          class="image-viewer-three-sixty px-2"
          :product="product"
        />

        <div v-if="has360Images" class="row">
          <div class="col-12">
            <span class="d-flex justify-content-center -mt-32px">
              <img
                :src="require('~/assets/img/icons/360ViewIcon.svg')"
                alt="360 view icon"
              />
            </span>
          </div>
        </div>
        <!-- Product thumbnail 360 ends -->
      </b-col>
      <b-col sm="12" md="6">
        <!-- Nav Bar -->
        <div v-if="!isScreenXS" class="row">
          <div class="col-12 mt-4">
            <nav-group
              v-model="selectedCategory"
              :data="visibleCategories"
              nav-key="category"
              class="m-0 w-100 d-flex justify-content-center"
            />
          </div>
          <div class="col-12">
            <div class="d-flex justify-content-between mt-2 mx-4">
              <div class="text-gray-24 body-1-medium text-center w-100" :class="selectedCategory == buy && 'active text-black'">
                {{ lowestPrice | toCurrency }}
              </div>
              <div class="text-gray-24 body-1-medium text-center w-100" :class="selectedCategory == offer && 'active text-black'">
                {{ highestOffer | toCurrency }}
              </div>
            </div>
          </div>
        </div>
        <!-- Nav Bar end -->

        <!-- Mobile product name begin -->
        <b-row v-else>
          <b-col sm="12" md="6">
            <ProductTitle
              :product="product"
              :product-name="product.name"
              :lowest-price="lowestPrice ? lowestPrice : 0"
              :product-last-sale-price="lastSold && lastSold.sale_price ? lastSold.sale_price : 0"
              :show-share="false"
              :show-wishlist="false"
              class="mt-5"
            />
          </b-col>
        </b-row>
        <!-- Mobile product name end -->

        <!-- SizePicker -->
        <div class="mt-2 mx-auto section-product-size">

          <!-- SizePicker -->
          <SizeCarouselResponsive
            v-if="isScreenXS"
            :sizes="sizes"
            :prices="pricesBySize"
            :value="value.currentSize"
            :view-mode="sizeViewMode"
            class="size-picker"
            @update="handleSizeChange"
            @changeViewMode="handleSizeViewModeChange"
          />
          <ProductSizePicker
            v-if="!isScreenXS"
            :sizes="sizes"
            :prices="pricesBySize"
            :value="value.currentSize"
            :view-mode="sizeViewMode"
            iconTextClass="text-color-blue-30"
            iconClass="d-none"
            class="size-picker"
            @update="handleSizeChange"
            @changeViewMode="handleSizeViewModeChange"
          />
          <!-- ./SizePicker -->
        </div>
        <!-- SizePicker ends -->

        <!-- Box Condition Section Responsive -->
        <div class="row box-condition-responsive mt-2 mb-4 px-2">
          <BoxConditionPicker
            :value="value.boxCondition"
            :conditions="packagingConditions"
            class="box-conditions m-0"
            @change="(obj) => handlePackagingConditionChange(obj.id)"
          />
        </div>
        <!-- Box Condition Section Responsive ends -->

        <slot name="right-content"></slot>

      </b-col>
    </b-row>

    <div v-if="!isScreenXS" class="section-product-details">
      <span class="body-2-medium text-black px-3">{{ $t('create_listing.product.product_details') }}</span>
      <hr>
      <b-row>
        <b-col sm="12" md="6" class="px-4 pt-3">
          <b-row>
            <b-col cols="4" class="text-black py-1">{{ $t('common.sku') }}:</b-col>
            <b-col cols="8" class="py-1 pl-4">{{ product.sku }}</b-col>
            <b-col cols="4" class="text-black py-1">{{ $t('common.color') }}:</b-col>
            <b-col cols="8" class="py-1 pl-4">{{ product.colorway }}</b-col>
            <template v-if="product.retail_price">
              <b-col cols="4" class="text-black py-1">{{ $t('common.retail_price') }}:</b-col>
              <b-col cols="8" class="py-1 pl-4">{{ product.retail_price | formatPrice }}</b-col>
            </template>
            <template v-if="product.release_date">
              <b-col cols="4" class="text-black py-1">{{ $t('common.release_date') }}:</b-col>
              <b-col cols="8" class="py-1 pl-4">{{ product.release_date | formatDate }}</b-col>
            </template>
          </b-row>
        </b-col>
      </b-row>
    </div>
    <div v-else class="rounded box-shadow mt-4 mobile-product-details"
         @click="mobileDetailsIsExpanded = !mobileDetailsIsExpanded">
      <div class="d-flex justify-content-between">
        <span class="body-13-medium text-black">
          {{ $t('create_listing.product.product_details') }}
        </span>
        <img :src="require('~/assets/img/icons/arrow-down-dark-blue.svg')"
             width="12"
             :class="{'rotate': mobileDetailsIsExpanded}" />
      </div>
      <div v-if="mobileDetailsIsExpanded" class="mt-3">
        <div class="d-flex justify-content-between body-6-normal py-1">
          <div class="flex-grow-1">{{ $t('common.sku') }}:</div>
          <div>{{ product.sku }}</div>
        </div>
        <div class="d-flex justify-content-between body-9-normal py-1">
          <div class="flex-grow-1">{{ $t('common.color') }}:</div>
          <div>{{ product.colorway }}</div>
        </div>
        <div v-if="product.retail_price" class="d-flex justify-content-between body-6-medium py-1">
          <div class="flex-grow-1">{{ $t('common.retail_price') }}:</div>
          <div>{{ product.retail_price | formatPrice }}</div>
        </div>
        <div v-if="product.release_date" class="d-flex justify-content-between body-6-medium py-1">
          <div class="flex-grow-1">{{ $t('common.retail_price') }}:</div>
          <div>{{ product.release_date | formatDate }}</div>
        </div>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import ProductSizePicker from '~/components/product/SizePicker'
import SizeCarouselResponsive from '~/components/profile/create-listing/SizeCarouselResponsive.vue'
import ProductTitle from '~/components/product/ProductTitle'

import {NavGroup} from '~/components/common'
import {
  QUANTITY_MIN_VAL,
  QUANTITY_MAX_VAL,
  PRICE_MIN_VAL,
  MINOFFER_MIN_VAL,
  TYPE_BUY,
  TYPE_OFFER,
} from '~/static/constants'

import ProductImageViewerMagic360 from '~/components/product/ImageViewerMagic360'
import screenSize from '~/plugins/mixins/screenSize'
import arrowDownIcon from '~/assets/img/icons/arrow-down-dark-blue.svg'
import BoxConditionPicker from '~/components/product/BoxConditionPicker';

export default {
  name: 'ProductView',

  components: {
    ProductSizePicker,
    ProductTitle,
    NavGroup,
    ProductImageViewerMagic360,
    SizeCarouselResponsive,
    BoxConditionPicker
  },

  mixins: [screenSize],

  layout: 'Profile',

  props: {
    product: {
      type: Object,
      required: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
    backButtonText: {
      type: String,
      default: 'common.back_to_search'
    },
    backButtonClass: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      quantityMinVal: QUANTITY_MIN_VAL,
      quantityMaxVal: QUANTITY_MAX_VAL,
      priceMinVal: PRICE_MIN_VAL,
      minOfferMinVal: MINOFFER_MIN_VAL,
      visibleCategories: [
        {
          label: this.$t('products.lowest_price'),
          value: 'buy',
        },
        {
          label: this.$t('products.highest_offer'),
          value: 'offer',
        },
      ],
      selectedCategory: 'buy',
      arrowDownIcon,
      selectedSize: '',
      selectedCondition: '',
      sizeViewMode: 'carousel',
      lastAmount: '',
      avgAmount: '',
      avgType: '',
      buy: TYPE_BUY,
      offer: TYPE_OFFER,
      mobileDetailsIsExpanded: false
    }
  },

  computed: {
    ...mapGetters({
      inventoryColors: 'inventory/getColors',
      isVendor: 'auth/isVendor',
      isAuthenticated: 'auth/authenticated',
      getSelectedItemforVendor: 'sell-now/getSelectedItem',
    }),
    sizes() {
      return this.product?.sizes || []
    },

    /**
     * Get the colors available.
     */
    colors: (vm) => {
      return (
        vm.inventoryColors?.map((i) => {
          return { label: i.name, value: i.id }
        }) || []
      )
    },
    /**
     * Get the prices of the product wrt. size id.
     */
    pricesBySize() {
      return this.product?.lowest_prices?.filter((i) => {
        const items = this.product.lowest_prices.filter(
          (j) => j.packaging_condition_id === i.packaging_condition_id
        )
        const minItem = _.minBy(items, 'price')
        return i.size_id === minItem.size_id
      })
    },
    /**
     * Get the lowest listed price of the product wrt. size.
     */
    lowestListedPrice() {
      const items = this.product?.lowest_prices?.filter(
        (i) => i.size_id === this.value.currentSize
      )
      return _.minBy(items, 'price')?.price
    },
    /**
     * Get the highest offer price of the product wrt. size.
     */
    highestOfferPrice() {
      const offers = this.product?.highest_offers?.filter(
        (i) => i.size_id === this.value.currentSize
      )
      return _.maxBy(offers, 'price')?.price
    },

    // todo
    lastSoldPrice() {
      return null
    },
    /**
     * Get the packaging Condtions of product.
     */
    packagingConditions() {
      return (
        this.product?.packaging_conditions?.map((i) => {
          return { ...i }
        }) || []
      )
    },

    listingItemOrder: (vm) => {
      return vm.product.listing_item_order
    },

    lastSold: (vm) => {
      if(vm.listingItemOrder && vm.listingItemOrder.length) {
        const items = vm.listingItemOrder && vm.listingItemOrder.reverse()
        const sold = items.find(
          (i) =>
            i.inventory.size_id === vm.value.currentSize &&
            i.inventory.packaging_condition_id === vm.value.boxCondition
        )

        return sold && sold.inventory
      }
    },

    has360Images() {
      return this.product?.has360Images
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    lowestPrice: (vm) => {
      const lowerPrice = vm.product?.lowest_prices ?? []
      const val = lowerPrice.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    highestOffer: (vm) => {
      const highestOffers = vm.product?.highest_offers ?? []
      const val = highestOffers.find(
        (i) =>
          i.size_id === vm.selectedSize &&
          i.packaging_condition_id === vm.selectedCondition
      )
      return val && val.price
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    quantityError: (vm) => {
      if (
        vm.quantityMinVal > vm.value.quantity ||
        vm.value.quantity > vm.quantityMaxVal
      ) {
        return vm.$t('inventory.message.between', {
          field: vm.$t('common.quantity').toLowerCase(),
          min: vm.quantityMinVal,
          max: vm.quantityMaxVal,
        })
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    minOfferError: (vm) => {
      if (
        vm.value.minOfferAmount === null ||
        vm.value.minOfferAmount <= vm.minOfferMinVal
      ) {
        return vm.$t('inventory.message.gt_than', {
          field: vm.$t('common.price').toLowerCase(),
          amount: vm.minOfferMinVal,
        })
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    priceError: (vm) => {
      if (vm.value.price !== null && vm.value.price <= vm.priceMinVal) {
        return vm.$t('inventory.message.gt_than', {
          field: vm.$t('common.price').toLowerCase(),
          amount: vm.priceMinVal,
        })
      }
    },
  },

  created() {
    this.getColors()
    if (!this.value.boxCondition) {
      this.selectedCondition = 1
      this.$emit('input', { ...this.value, boxCondition: 1 })
    }


  },

  methods: {
    ...mapActions({
      fetchColors: 'inventory/fetchColors',
      checkItemExistforVendor: 'sell-now/checkItemExistforVendor',
    }),
    handleSizeViewModeChange(mode) {
      this.sizeViewMode = mode
    },

    // Get the colors
    getColors() {
      this.fetchColors()
    },
    /**
     * On size input emit the value to be updated.
     */
    handleSizeChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.selectedSize = value

        this.$emit('input', { ...this.value, currentSize: value })
      }
    },
    /**
     * On quantity input emit the value to be updated.
     */
    handleQuantityChange(value) {
      this.$emit('input', { ...this.value, quantity: value })
    },
    /**
     * On price input emit the value to be updated.
     */
    handlePriceChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.$emit('input', { ...this.value, price: value })
      }
    },
    /**
     * on packaging condition input, emit the value to be updated.
     */
    handlePackagingConditionChange(value) {
      if (value && this.$route.query.path !== 'from-inventory') {
        this.selectedCondition = value
        this.$emit('input', { ...this.value, boxCondition: value })
      }
    },
    // On min offer amount input
    handleMinOfferPriceChange(value) {
      this.$emit('input', { ...this.value, minOfferAmount: value })
    },
    /**
     * On add listing button click.
     * Store the values and show confirmation screen.
     */
    handleSaveClick() {
      this.$emit('addToDraft')
    },
    /**
     * On update listing button click,
     * Show the values in the confirm screen.
     */
    handleEditClick() {
      this.$bvModal.show('save-listing-success')
    },

    // On confirm disacard
    onConfirm() {
      this.$bvModal.show('discard-confirm')
    },

    emitEditSuccess() {
      this.$emit('editDraft')
    },

    // TODO
    handleYearChange(value) {
      return null
    },

    // Color input on change.
    handleColorChange(value) {
      this.$emit('input', { ...this.value, color: value })
    },

    // On cancel discard
    onCancelDiscard() {
      this.$router.push({
        path: '/profile/create-listing/selling/confirm',
        query: { path: 'from-inventory' },
      })
    },

    // On cancel click, clear the value
    onCancel() {
      this.$emit('clearValue')
    },

    handleDiscard() {
      this.$bvModal.show('discard')
    },

    handleMethodNavClick(selected) {
      if (selected) {
        this.selectedCategory = selected
      }
    },


    // Show the up/down
    latestPrice({ amount, type }) {
      this.avgAmount = amount
      this.avgType = type
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.profile-view
  .btn-back
    @include body-4-regular
    color: $color-black-1

  .section-product-details
    @include body-3-normal
    color: $color-gray-5
    font-family: $font-family-sf-pro-display

  .section-product-size
    max-width: 570px

  .section-form-fields
    .error-text
      display: none

    .error

      border: 0
      .input-error::v-deep
        .form-input
          border-color: $color-red-3

      .error-text
        @include body-5-regular
        display: block
        color: $color-red-3

    .input-col::v-deep
      .input-label
        font-family: $font-montserrat
        font-style: normal
        @include body-8-normal
        color: $color-black-1
        margin-left: 0px!important
        text-transform: uppercase
        margin-bottom: 8px
      input
        border-radius: 4px!important
        height: 40px
        left: 16px
        top: 804px
        border: 1px solid $color-blue-20
        &::placeholder
          font-family: $font-montserrat
          font-style: normal
          @include body-8-normal
          font-weight: normal
          color: $color-gray-23

@media (max-width: 375px)
  .profile-view
    .product-thumbnail
      width: 246px
@media (min-width: 650px)
.box-condition-select-col::v-deep
  .form-dropdown-wrapper
    .btn-dropdown
      border: 1px solid $color-black-1
      border-radius: 0
      width: 315px
      height: 37px
    .form-input
      .bg-white
        position: absolute
        width: 152px
        height: 49px
        left: 16px
        top: 804px
        border: 1px solid $color-gray-3
        border-radius: 10px
    .search-results
      .popover-body > div:last-child
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0

.responsive-inputs-row::v-deep
  .input-col
    .form-input-wrapper
      .input-label
        font-family: $font-montserrat
        font-style: normal
        @include body-9-medium
        color: $color-black-1

// For !mobile screen
@media (min-width: 576px)
  .profile-view::v-deep
    .section-product-details,
    .product-size-details,
    .size-meter
      display: block

    .backToSearch
      display: block
      margin-left: 14px

    .product-thumbnail
      display: flex
    .mobile-nav-row,
    .responsive-inputs-row,
    .add-listing-btn,
    .responsive-product-details-block,
    .product-thumbnail
      width: 323px !important // Added !important coz the product thumb component breaks the width of component
      height: 246px
    .image-viewer-three-sixty
      width: 323px !important // Added !important coz the product thumb component breaks the width of component
      height: 246px
      display: flex
      justify-content: center
      position: relative
      margin: auto

// For mobile screen
@media (max-width: 576px)
  .profile-view::v-deep
    .product-details-heading,
    .section-product-details,
    .product-size-details,
    .size-meter,
    .backToSearch
      display: none
    .product-thumbnail
      width: 240px
      .overlay
        display: none
    .responsive-inputs::v-deep
      .form-input-wrapper
        .form-input
          width: 152px
          height: 49px
          left: 16px
          top: 804px
          border: 1px solid $color-gray-3
          border-radius: 10px

    .add-listing-btn
      background: $color-black-1
      border-radius: 20px
      color: $color-white-1

    .responsive-product-details-block
      .product-details-block-col
        .product-details-block
          height: 56px
          left: 15.5px
          top: 977px
          background: $color-white-1
          box-shadow: 0px -0.1px 2px $color-gray-th-43, 0px 1px 2px $color-gray-th-43
          border-radius: 8px
          font-family: $font-montserrat
          font-style: normal
          @include body-5-medium
          color: $color-black-1
    .mobile-nav-row
      .mobile-nav-price-col
        .price-section
          display: inline-flex
          justify-content: space-around
          font-family: $font-montserrat
          font-style: normal
          @include body-17-medium
          display: flex
          align-items: center
          letter-spacing: -0.04em
          color: $color-gray-47
          .active
            font-family: $font-montserrat
            font-style: normal
            @include body-17-medium
            display: flex
            align-items: center
            text-align: center
            letter-spacing: -0.04em
            color: $color-black-1

    .product-details-responsive
      .product-name
        font-family: $font-montserrat
        font-style: normal
        @include body-3-medium
        display: flex
        align-items: center
        color: $color-black-1

    .product-size-select-row
      .select-size-title
        font-family: $font-montserrat
        font-style: normal
        @include body-21-regular
        display: flex
        align-items: center
        text-align: center
        color: $color-black-1
      .all-sizes-option
        font-family: $font-montserrat
        font-style: normal
        @include body-21-regular
        display: flex
        align-items: center
        text-align: center
        color: $color-black-1
    .box-condition-responsive
      .box-condition-title
        font-family: $font-montserrat
        font-style: normal
        @include body-5-medium
        color: $color-black-1

#form-input-responsive::v-deep
  .input-label
    margin-bottom: 3px
  input
    height: 49px
    left: 16px
    top: 804px
    border: 1px solid $white-5
    &::placeholder
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-gray-23
#error-responsive::v-deep
  .input-label
    margin-bottom: 3px
  input
    height: 49px
    left: 16px
    top: 804px
    border: 1px solid $color-red-3
.box-condition-select-col::v-deep
  #dropdown-container-box-condition-dropdown
    .popover
      .popover-body
        border: 1px solid $color-gray-85
    #btn-dropdown-box-condition-dropdown
      div
        font-family: $font-montserrat
        font-style: normal
        @include body-5-normal
        display: flex
        align-items: center
        text-align: center
        color: $color-blue-20
        justify-content: center

.box-shadow
  box-shadow: 0px 1px 2px $color-gray-th-43

.rotate
  transform: rotate(180deg)

.mobile-product-details
  padding: 19px
</style>
<style lang="sass">
.profile-view
  .nav-group .btn-group
    width: 100%
    margin-left: 24px
    margin-right: 24px
  .-mt-32px
    margin-top: -32px
</style>

