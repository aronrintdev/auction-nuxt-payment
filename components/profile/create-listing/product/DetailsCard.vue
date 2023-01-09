<template>
  <div :id="id" class="product-details-item-wrapper">
    <div class="row product-details">
      <div class="check-box position-absolute round position-relative">
        <span class="view-more-option text-center" role="button" @click="$emit('edit')">
          
            <img
              :src="require('~/assets/img/icons/extra_dot.png')"
              alt="view more"
            />
        </span>  
      </div>

      <div class="col-xs-4">
        <img
          class="product-mobile-img"
          :src="productImg || fallBackImg"
          alt="product-img"
          @error="imageLoadError"
        />
      </div>

      <div class="col-xs-8 product-mobile-details">
        <div class="product-name">
          {{ productName }}
        </div>
        <div class="product-sku mt-2">
          {{ $t('common.sku') }}&colon;
          {{ productSku }}
        </div>
        <div class="product-colorway-size">
          {{ $t('common.colorway') }}&colon;
          {{ productColorWay }}
          &comma;
          {{ $tc('common.size', 1) }}&colon;
          {{ productSize }}
        </div>

        <div class="product-condition">
          {{ $t('common.box_condition') }}&colon;
          {{ productBoxCondition }}
        </div>
      </div>
    </div>

    <div class="row product-offer-details">
      <div v-if="!showInputs" class="col-xs-12 d-flex justify-content-between">
        <span  class="offer-details-key">
          {{ $t('common.quantity') }}&colon;
        </span>
        <span class="offer-details-value text-right">
          {{ item.quantity }}
        </span>
      </div>
      <div v-if="!showInputs" class="col-xs-12 d-flex justify-content-between background-grey">
        <span class="offer-details-key">
          {{ $t('createlisting.minOfferAmount') }}&colon;
        </span>
        <span class="offer-details-value text-right">
          {{ item.minOfferAmount | toCurrency }}
        </span>
      </div>
      <div class="col-xs-12 d-flex justify-content-between">
        <span class="offer-details-key">
          {{ $t('inventory.your_price') }}&colon;
        </span>
        <span class="offer-details-value text-right">
          {{ item.price | toCurrency }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PRODUCT_FALLBACK_URL,
  PRODUCT_IMG_WIDTH
} from '~/static/constants'
export default {
  name: 'DetailsCard',

  props: {
    id: {
      type: String,
      default: 'details-card',
    },

    product: {
      type: Object,
      default: () => {},
    },

    item: {
      type: Object,
      default: () => {},
    }
  },

  data() {
    return {
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      fallbackImgWidth: PRODUCT_IMG_WIDTH,
    }
  },

  computed: {
     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productName: (vm) => {
      return vm.product.name
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productSku: (vm) => {
      return vm.product.sku
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productSize: (vm) => {
      if (vm.item.sizeId && vm.item.product) {
        return vm.item.product.sizes.find((size) => size.id === vm.item.sizeId)
          ?.size
      }
      if (vm.item.size_id) {
        return vm.item.product.sizes.find((size) => size.id === vm.item.size_id)
          ?.size
      }
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productColorWay: (vm) => {
      return vm.product.colorway
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productBoxCondition: (vm) => {
      if (vm.item.packagingConditionId && vm.item.product) {
        return vm.item.product.packaging_conditions.find(
          (packagingCondition) =>
            packagingCondition.id === vm.item.packagingConditionId
        )?.name
      }
      if (vm.item.packaging_condition_id && vm.item.product) {
        return vm.item.product.packaging_conditions.find(
          (packagingCondition) =>
            packagingCondition.id === vm.item.packaging_condition_id
        )?.name
      }
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    productImg: (vm) => {
      return vm.product.image
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    fallBackImg: (vm) => {
      return `${vm.fallbackImgUrl}${vm.fallbackImgWidth}`
    },

     // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    showInputs: (vm) => {
      return vm.$route.query.path === 'from-inventory'
    }
  },

  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallBackImg
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-details-item-wrapper
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  .check-box
    right: 1rem
  .product-details
    box-sizing: border-box
    padding: 12px
  .product-offer-details
    box-sizing: border-box
    padding: 9px

    .background-grey
      background: $color-white-5

    .offer-details-key
      font-family: $font-family-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-black-1
      box-sizing: border-box
      padding: 9px
    .offer-details-value
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-gray-6
      box-sizing: border-box
      padding: 9px

  .product-mobile-img
    width: 86px

  .product-mobile-details::v-deep
    .product-name
      width: 90%
      left: 124px
      top: 12px
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-black-1
    .product-sku
      left: 124px
      top: 41px
      font-family: $font-sp-pro
      font-style: normal
      @include body-20-normal
      color: $color-gray-5
    .product-colorway-size
      left: 124px
      top: 56px
      font-family: $font-sp-pro
      font-style: normal
      @include body-20-normal
      color: $color-gray-5
    .product-condition
      left: 124px
      top: 71px
      font-family: $font-sp-pro
      font-style: normal
      @include body-20-normal
      color: $color-gray-6
  .decline-btn
    box-sizing: border-box
    border: 1px solid $color-red-25
    border-radius: 8px
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-medium
    color: $color-red-25
    width: 107px
    height: 39px
    background: $color-white-1
  .accept-btn
    box-sizing: border-box
    border: 1px solid $color-green-2
    border-radius: 8px
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-medium
    color: $color-green-2
    width: 107px
    height: 39px
    background: $color-white-1
  .confirm-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-8-medium
    color: $color-black-1
  .accepted-offer-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-normal
    color: $color-green-3
  .declined-offer-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-normal
    color: $color-red-3
.round
  & label
    border: 1px solid $color-gray-60
    height: 20px
    left: -5px
    width: 20px
    border-radius: 62px

  & label:after
    border: 2px solid $color-white-1
    border-top: none
    border-right: none
    content: ""
    height: 6px
    left: 3px
    position: absolute
    top: 5px
    transform: rotate(-45deg)
    width: 12px

  & input[type="checkbox"]:checked + label
    background-color: $color-blue-20
    border-color: $color-blue-20

  & input[type="checkbox"]:checked + label:after
    opacity: 1
.custom-checkbox
  .custom-control-label::before
    border-radius: 2.25rem
    width: 1.1rem
    height: 1.1rem
@media (min-width: 417px) and (max-width: 575px)
  .offer-received-item-wrapper
    height: 293px
</style>