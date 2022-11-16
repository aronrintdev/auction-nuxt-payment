<template>
  <div class="product-summary-details">
    <!-- Product summary heading -->
    <div class="row vd-product-summary-listing py-4">
      <div class="col-12 product-summary-heading d-flex justify-content-start text-center">
        {{ $t('selling_page.product_summary') }}
      </div>
    </div>
    <!-- ./Product summary heading -->

    <!-- Product summary details -->
    <div class="single-live-reserve-section-box-collections mt-3 d-md-none d-lg-none w-100">
      <div class="row">
        <div class="col-md-12">
          <div class="carousel-auctions-collections">
            <div class="carousel slide">
              <div class="carousel-inner auction-inner-carousels-box position-relative w-100 overflow-hidden">
                <div class="carousel-item active d-block">
                  <div class="row product-details-row d-flex flex-1">
                    <div class="col-xs-4">
                      <div class="float-left single-img-prodct-reserve-jordon-mbl">
                        <img :src="productImage||fallbackImage" alt="product-image" @error="imageLoadError"/>
                      </div>
                    </div>
                    <div class="col-xs-7">
                      <div class="info-single-reserve-info-prodct-mbl float-left">
                        <div class="name-prodct-single-live-reserve-jordon mb-1 d-flex">
                          <span class="name float-left mr-2">{{ product && product.name }}</span>
                          <span class="status float-right mt-2 text-capitalize">{{ details.status }}</span>
                        </div>
                        <div class="name-prodct-single-live-reserve-jordon-info-desc mb-1">
                          {{ $t('common.sku') }}&colon;
                          {{ product && product.sku }}
                        </div>
                        <div class="name-prodct-single-live-reserve-jordon-info-desc mb-1">
                          {{ $t('common.colorway') }}&colon;
                          {{ product && product.colorway }}&comma; {{ $t('selling_page.size') }}&colon;
                          {{ size && size.size }}
                        </div>
                        <div class="name-prodct-single-live-reserve-jordon-info-desc mb-1">
                          {{ $t('common.box_condition') }}&colon; {{ packagingCondition && packagingCondition.name }}
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-1">
                      <div class="three-dots-icon-single-reserve-mbl text-center">
                        <span class="view-more-option text-center" @click="$emit('viewOptions')">
                          <img
                            :src="require('~/assets/img/icons/extra_dot.png')"
                            alt="view more"
                          />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="single-live-auction-summary-reserve-mbls mt-3 w-100 float-left">
        <div class="single-live-auctions-id-informtion">
          {{ $t('selling_page.listid') }}:
          <span class="float-right listingId text-decoration-underline"
      >
            <nuxt-link to="#">
                {{ details.id }}
            </nuxt-link>
          </span>
        </div>
        <div class="single-live-auctions-listed-on-heading-mbl">
          {{ $t('selling_page.listed_on') }}:
          <span class="float-right sub-text text-right">
            {{ listedOn }}
          </span>
        </div>
        <div class="single-live-auctions-id-informtion">
          {{ $t('common.price') }}:
          <span class="float-right sub-text text-right">
            {{ details && details.min_bid_price | toCurrency('USD', 'N/A') }}
          </span>
        </div>
        <div class="single-live-auctions-listed-on-heading-mbl">
          {{ $t('selling_page.you_listed') }}:
          <span class="float-right sub-text text-right">
            {{ details.quantity }}
          </span>
        </div>
      </div>
    </div>
    <!-- Product summary details ending -->
  </div>
</template>

<script>
import { PRODUCT_IMG_WIDTH, PRODUCT_FALLBACK_URL } from '~/static/constants'
export default {
  name: 'ProductSummary',

  props: {
    details: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
    }
  },

  computed: {
    inventory: (vm) => {
      return vm.details.inventory
    },

    product: (vm) => {
      return vm.inventory && vm.inventory.product
    },

    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },
    size: (vm) => {
      return vm.inventory && vm.inventory.size
    },

    packagingCondition: (vm) => {
      return vm.inventory && vm.inventory.packaging_condition
    },

    productImage: (vm) => {
      try {
        return vm.product.image
      } catch (error) {
        return vm.fallbackImage
      }
    },

    listedOn: (vm) => {
      if(vm.details && vm.details.created_at) {
        const date = new Date(vm.details.created_at)
        return vm.$options.filters.formatDateTimeString(date, 'dd-mm-yyyy|hh:mm ampm timezone')
      }
      
    }
  },

  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = `${this.fallbackUrl}${this.productImageWidth}`
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.product-summary-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-4-medium
  color: $color-black-1
.single-live-reserve-section-box-collections
  height: 256px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb1
  border-radius: 8px
.listingId
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-blue-30
.sub-text
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-gray-6
.carousel
  height: 145px
.auction-inner-carousels-box
  height: 145px
.carousel-item
  height: 145px
.single-img-prodct-reserve-jordon-mbl
  img
    width: 87.98px
    left: 32px
    top: 259px
.name-prodct-single-live-reserve-jordon
  .name
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-medium
    color: $color-black-1
  .status
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-normal
    color: $color-green-2
.name-prodct-single-live-reserve-jordon-info-desc
  font-family: $font-sp-pro
  font-style: normal
  @include body-6-normal
  color: $color-gray-5
.single-img-prodct-reserve-jordon-mbl
  flex: 0 0 30%
  max-width: 30%

.single-live-auction-summary-reserve-mbls
  height: auto
.single-live-auctions-id-informtion
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
  padding-left: 15px
  padding-right: 15px
  padding-top: 2px
  padding-bottom: 2px

.single-live-auctions-listed-on-heading-mbl
  font-family: $font-montserrat
  font-style: normal
  @include body-9-medium
  color: $color-black-1
  background: $color-white-5
  padding-left: 15px
  padding-right: 15px
  padding-bottom: 5px
  padding-top: 5px
.product-details-row
  padding: 3%
</style>