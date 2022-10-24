<template>
  <div
    class="single-live-reserve-section-box-collections w-100 mt-3 d-md-none d-lg-none"
    :class="delistMultiple && 'overlay-select'"
  >
    <div class="row">
      <div class="col-md-12">
        <div class="carousel-auctions-collections">
          <div class="carousel slide pointer-event">
            <div class="carousel-inner auction-inner-carousels-box position-relative w-100 overflow-hidden">
              <div class="carousel-item active d-block">
                <div class="row">
                  <!-- Image -->
                  <div class="col-xs-4">
                    <div
                      class="
                        pull-left
                        single-img-prodct-reserve-jordon-mbl
                        my-auto
                        float-left
                      "
                    >
                      <img
                        :src="productImg || fallbackImage"
                        alt="product-img"
                        class="ml-2"
                        @error="imageLoadError"
                      />
                    </div>
                    <!-- Image -->
                  </div>
                  <div class="col-xs-7">
                    <div class="info-single-reserve-info-prodct-mbl my-auto float-left">
                      <!-- Product name -->
                      <div class="name-prodct-single-live-reserve-jordon mb-1 d-flex w-100">
                        <span class="w-90">
                          {{ product.name }}
                        </span>
                        
                      </div>
                      <!-- Product name ends -->
                      <!-- Product sku -->
                      <div
                        class="
                          name-prodct-single-live-reserve-jordon-info-desc
                          mb-1
                        "
                      >
                        {{ $t('common.sku') }}&colon; {{ product.sku }}
                      </div>
                      <!-- Product sku ends -->
                      <!-- Product colorway -->
                      <div
                        class="
                          name-prodct-single-live-reserve-jordon-info-desc
                          mb-1
                        "
                      >
                        {{ $t('common.colorway') }}&colon; {{ product.colorway }}, Size: {{ size.size }}
                      </div>
                      <!-- Product colorway ends -->
                      <!-- Product box condition -->
                      <div
                        class="
                          name-prodct-single-live-reserve-jordon-info-desc
                          mb-1
                        "
                      >
                        {{ $t('common.box_condition') }}&colon; {{ packagingCondition.name }}
                      </div>
                      <!-- ./Product box condition -->
                    </div>
                  </div>
                  <div class="col-xs-1">
                    <span class="float-right view-icon d-flex align-items-center text-center" role="button" @click="viewMore">
                      <img :src="require('~/assets/img/icons/eye2.svg')" alt="view-details" class="mr-1">
                      {{ $t('common.view') }}
                    </span>
                    <div v-if="delistMultiple" class="three-dots-icon-single-reserve-mbl float-right mx-3 mt-2">
                      <div
                        class="
                          check-box
                          position-absolute
                          round
                          position-relative
                        "
                      >
                        <input
                          :id="`checkbox-${result.id}`"
                          type="checkbox"
                          class="check-box invisible"
                          :value="result.id"
                          :checked="selected.includes(result.id)"
                          @change="onItemSelect"
                        />
                        <label
                          :for="`checkbox-${result.id}`"
                          class="position-absolute"
                        ></label>
                      </div>
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
        {{ $t('common.listing_id') }}&colon;
        <span
          class="
            float-right
            auction-id-digit-num-live-single
            text-decoration-underline
          "
          
          ><a href="#">{{ result.id }}</a></span
        >
      </div>
      <div class="single-live-auctions-listed-on-heading-mbl">
        {{ $t('selling_page.date_listed') }}&colon;
        <span class="float-right">{{ result.created_at | formatDate }}</span>
      </div>
      <div class="single-live-auctions-id-informtion">
        {{ $t('common.price') }}&colon;

        <span class="float-right">{{
          result.min_bid_price | toCurrency('USD', 'N/A')
        }}</span>
      </div>
      <!-- TODO Last sold -->
      <div class="single-live-auctions-listed-on-heading-mbl">
        {{ $t('selling_page.last_sold') }}&colon; <span class="float-right">--</span>
      </div>
        <!-- TODO Last Sold -->
      <div class="single-live-auctions-id-informtion">
        {{ $t('place_offer.offer') }}&colon; 
        <span v-if="result.status === listed " class="float-right">{{ getOffers(inventory) }}</span>
        <span v-else class="float-right">{{ emptyOffer }}</span>

      </div>
      <div class="single-live-auctions-listed-on-heading-mbl">
        {{ $t('place_offer.quantity') }}&colon; <span class="float-right">{{ result.quantity }}</span>
      </div>
      <div class="single-live-auctions-id-informtion">
        {{ $t('selling_page.status') }}&colon;
        
        <span
          class="
            float-right
            single-hours-headings-reserve
            text-bold text-capitalize
          "
          >{{ result.status }}</span
        >

      </div>
    </div>
  </div>
</template>

<script>
import {
  PRODUCT_IMG_WIDTH,
  PRODUCT_FALLBACK_URL,
  PENDING_OFFER,
  ACCEPTED_OFFER,
  LISTED,
  EMPTY_OFFER
} from '~/static/constants'
export default {
  name: 'ListItemResult',

  props: {
    result: {
      type: Object,
      default: () => {},
    },

    selected: {
      type: Array,
      default: () => []
    },

    delistMultiple: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      pendingOffer: PENDING_OFFER,
      acceptedOffer: ACCEPTED_OFFER,
      listed: LISTED,
      emptyOffer: EMPTY_OFFER
    }
  },

  computed: {
    inventory: (vm) => {
      return vm.result && vm.result.inventory
    },

    product: (vm) => {
      return vm.inventory && vm.inventory.product
    },

    size: (vm) => {
      return vm.inventory && vm.inventory.size
    },

    packagingCondition: (vm) => {
      return vm.inventory && vm.inventory.packaging_condition
    },

    fallbackImage: (vm) => {
      return vm.fallbackImgUrl + '' + vm.productImageWidth
    },

    productImg: (vm) => {
      try {
        return vm.product.image
      } catch (error) {
        return vm.fallbackImage
      }
    },
  },

  methods: {
    // Image on load error
    imageLoadError(event) {
      event.target.src = `${this.fallbackUrl}${this.productImageWidth}`
    },

    getOffers(inventory) {
      const sizeId = inventory.size_id
      const productId = inventory.product_id
      const offers = inventory.product.offers
      let count = 0

      offers.forEach((element) => {
        if (
          (element.size_id === sizeId &&
            element.product_id === productId &&
            element.status === this.pendingOffer) ||
          (element.status === this.acceptedOffer &&
            element.sell_details &&
            element.sell_details.vendor_id === this.$auth.user.vendor.id)
        ) {
          count = count + 1
        }
      })
      return count
    },

    viewMore() {
      this.$router.push(`/profile/vendor-selling/details/${this.result.id}`)
    },

    onItemSelect(event){
      this.$emit('select', event.target.value)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.w-90
  width: 90%
.single-live-reserve-section-box-collections
  height: 320px
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb1
  border-radius: 8px
.carousel
  height: 145px
.auction-inner-carousels-box
  height: 145px
.carousel-item
  &.active
    padding: 3%
.single-img-prodct-reserve-jordon-mbl
  img
    width: 87.98px
    left: 32px
    top: 259px
.name-prodct-single-live-reserve-jordon
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-medium
  color: $color-black-1
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
.view-icon
  font-family: $font-montserrat
  font-style: normal
  @include body-9-regular
  color: $color-black-1
.overlay-select
  inset: 0px
  opacity: 0.6
  backdrop-filter: blur(2px)
  background: $white-4
@media (min-width: 576px)
  .single-live-reserve-section-box-collections
    display: none
</style>