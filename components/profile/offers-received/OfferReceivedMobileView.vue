<template>
  <div class="offer-received-item-wrapper" :class="section">
    <div class="row product-details">
      <div class="col-12">
        <div
          v-if="hideButtons"
          class="
            tag-status
            d-flex
            align-items-center
            justify-content-center
            text-capitalize text-center
          "
          :class="offerStatus"
        >
          {{ offerStatus }}
        </div>
      </div>

      <div class="check-box position-absolute round position-relative">
        <div v-if="showCheckBox">
          <input
            :id="`checkbox-${offer.id}`"
            class="check-box invisible"
            type="checkbox"
            :value="offer.id"
            :checked="offerChecked.includes(offer.id) ? true : false"
            @change="toggleSelect"
          />
          <label
            :for="`checkbox-${offer.id}`"
            class="position-absolute"
          ></label>
        </div>

        <div
          v-if="hideButtons"
          class="check-box col-xs-1 d-flex justify-content-end"
        >
          <span
            class="view-more-option text-center"
            @click="$emit('showEdit', offer)"
          >
            <img
              :src="require('~/assets/img/icons/extra_dot.png')"
              alt="view more"
            />
          </span>
        </div>
        <!-- popup for edit offer -->
      </div>

      <div v-if="!hideButtons" class="col-xs-4 m-auto">
        <img
          class="product-mobile-img"
          :src="productImg || fallBackImg"
          alt="product-img"
          @error="imageLoadError"
        />
      </div>

      <div v-if="hideButtons" class="col-xs-4 m-auto" @click="showDetailPage">
        <img
          class="product-mobile-img d-flex m-auto"
          :src="productImg || fallBackImg"
          alt="product-img"
          @error="imageLoadError"
        />
      </div>

      <div class="col-xs-8 product-mobile-details">
        <div v-if="!hideButtons" class="product-name text-truncate">{{ productName }}</div>
        <div v-if="hideButtons" class="product-name text-truncate" @click="showDetailPage">
          {{ productName }}
        </div>
        <div class="custom-height"></div>
        <div v-if="hideButtons" class="product-sku">
          {{ $t('common.sku') }}&colon; {{ productSku }}
        </div>
        <div v-if="!hideButtons" class="product-sku">
          {{ $t('common.sku') }}&colon; {{ productSku }}
        </div>
        <div class="product-colorway-size">
          {{ $t('common.colorway') }}&colon; {{ productColorWay }}&comma;
          {{ $tc('common.size', 1) }}&colon; {{ productSize }}
        </div>
        <div class="product-condition">
          {{ $t('common.box_condition') }}&colon; {{ productBoxCondition }}
        </div>
      </div>
    </div>
    <div class="row product-offer-details">
      <div class="col-xs-12 d-flex justify-content-between list-item-details">
        <span class="offer-details-key my-auto mx-2">
          {{ $t('selling_page.offer_amount') }}&colon;
        </span>
        <span class="offer-details-value text-right my-auto mx-2">{{
          offerAmount | toCurrency('USD', 'N/A')
        }}</span>
      </div>
      <div
        class="
          col-xs-12
          d-flex
          justify-content-between
          background-grey
          list-item-details
        "
      >
        <span class="offer-details-key my-auto mx-2">
          {{ $t('selling_page.offer_date') }}&colon;
        </span>
        <span class="offer-details-value text-right my-auto mx-2">{{
          offerDate | formatDate
        }}</span>
      </div>
    </div>
    <div v-if="!hideButtons" class="row product-details justify-content-center">
      <!-- Show accept and declined button based on status -->
      <div
        v-if="showAcceptDeclineButton && !hideOnConfirm"
        class="col-xs-12 d-flex justify-content-around"
      >
        <b-button
          variant="outline"
          class="decline-btn align-items-center text-center"
          @click="onDecline"
        >
          {{ $t('common.decline') }}
        </b-button>
        <b-button
          variant="outline"
          class="accept-btn align-items-center text-center"
          @click="onAccept"
        >
          {{ $t('common.accept') }}
        </b-button>
      </div>
      <!-- Show accept and declined button based on status ends -->
      <div v-if="hideOnConfirm" class="col-xs-12 text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </div>

      <!-- On accept or decline offer click, show the confirmation button and message -->
      <span v-if="confirmation" class="confirm-text mb-1 text-align-center">
        {{ $t('offers_received.confirmation_text', { actiontype: action }) }}
      </span>
      <div v-if="confirmation" class="col-xs-12 d-flex justify-content-around">
        <b-button variant="outline" class="decline-btn" @click="onCancel">
          {{ $t('common.no') }}
        </b-button>
        <b-button variant="outline" class="accept-btn" @click="onConfirm">
          {{ $t('common.yes') }}
        </b-button>
      </div>
      <!-- On accept or decline offer click, show the confirmation button and message ends -->

      <div v-if="offerStatus" class="col-xs-12 d-flex justify-content-around">
        <span
          v-if="offerStatus && offerStatus === acceptedOffer"
          class="accepted-offer-text"
        >
          {{ $t('offers_received.accepted') }}
        </span>
        <span
          v-if="offerStatus && offerStatus === declinedOffer"
          class="declined-offer-text"
        >
          {{ $t('offers_received.declined') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  PRODUCT_FALLBACK_URL,
  PRODUCT_IMG_WIDTH,
  ACCEPTED_OFFER,
  DECLINED_OFFER,
  PENDING_OFFER,
} from '~/static/constants'
export default {
  name: 'OfferReceivedMobileView',

  props: {
    offer: {
      type: Object,
      default: () => {},
    },

    showCheckBox: {
      type: Boolean,
      default: false,
    },

    selectedAll: {
      type: Boolean,
      default: false,
    },

    offerChecked: {
      type: Array,
      default: () => [],
    },

    hideButtons: {
      type: Boolean,
      default: false,
    },

    section: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      fallbackImgWidth: PRODUCT_IMG_WIDTH,
      selectedIds: [],
      action: null,
      showConfirmation: false,
      acceptedOffer: ACCEPTED_OFFER,
      declinedOffer: DECLINED_OFFER,
      pendingOffer: PENDING_OFFER,
      hideOnConfirm: false,
      selected: false,
    }
  },

  computed: {
    productName: (vm) => {
      return vm.offer.product.name
    },

    productSku: (vm) => {
      return vm.offer.product.sku
    },

    productColorWay: (vm) => {
      return vm.offer.product.colorway
    },

    productSize: (vm) => {
      return vm.offer.size.size
    },

    productBoxCondition: (vm) => {
      return vm.offer.packaging_condition.name
    },

    offerAmount: (vm) => {
      return vm.offer.bid_price
    },

    offerDate: (vm) => {
      return vm.offer.created_at
    },

    productImg: (vm) => {
      return vm.offer.product.image
    },
    fallBackImg: (vm) => {
      return `${vm.fallbackImgUrl}${vm.fallbackImgWidth}`
    },

    offerStatus: (vm) => {
      return vm.offer.status
    },

    showAcceptDeclineButton: (vm) => {
      return (
        ![vm.acceptedOffer, vm.declinedOffer].includes(vm.offerStatus) &&
        !vm.showConfirmation &&
        !vm.action
      )
    },

    confirmation: (vm) => {
      return vm.action && vm.showConfirmation
    },
  },

  watch: {
    offer() {
      this.hideOnConfirm = false
    },

    selectedAll(value) {
      if (value) {
        this.selected = true
      } else {
        this.selected = false
      }
    },
  },

  methods: {
    // Open the detailed page of selected offer
    showDetailPage() {
      this.$router.push(
        `/profile/offers-placed/placed-offer-details/${this.offer.id}`
      )
    },
    // Image on load error
    imageLoadError(event) {
      event.target.src = this.fallBackImg
    },

    // Checkbox on select
    toggleSelect(event) {
      this.selected = !this.selected
      this.$emit('selectedItem', {
        id: event.target.value,
        checked: this.selected,
      })
    },

    // On accept button click
    onAccept() {
      this.action = 'accept'
      this.showConfirmation = true
    },

    // On Decline button click
    onDecline() {
      this.action = 'decline'
      this.showConfirmation = true
    },

    onCancel() {
      this.action = null
      this.showConfirmation = false
    },

    onConfirm() {
      this.$axios
        .put(`/listing-items/offers/${this.action}/${this.offer.id}`)
        .then((res) => {
          this.$emit('reload')
          this.hideOnConfirm = true
          this.action = null
          this.showConfirmation = false
        })
        .catch((err) => {
          this.$logger.logToServer('Offer accept decline', err.response)
        })
    },

    // Guide to product detail page for profile offer placed
    viewDetails() {
      this.$router.push(
        `/profile/offers-placed/PlacedOfferDetails/${this.offer.id}`
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.offer-received-item-wrapper
  background: $color-white-1
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  .check-box
    right: 1rem
  .product-details
    box-sizing: border-box
    padding: 12px 12px 18px 12px
  .product-offer-details
    box-sizing: border-box
    padding: 0 9px 9px 9px
    .list-item-details
      height: 20px

    .background-grey
      background: $color-white-5

    .offer-details-key
      width: 97px
      height: 15px
      left: 36px
      top: 511px
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-black-1

    .offer-details-value
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-gray-6
      box-sizing: border-box

  .product-mobile-img
    width: 86px

  .product-mobile-details
    .custom-height
      height: 12px
    .product-name
      left: 124px
      top: 12px
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      width: 150px
      height: 17px
      left: 140px
      top: 989px
    .product-sku
      font-family: $font-sp-pro
      font-style: normal
      @include body-6-normal
      color: $color-gray-5
    .product-colorway-size
      font-family: $font-sp-pro
      font-style: normal
      @include body-6-normal
      color: $color-gray-5
    .product-condition
      font-family: $font-sp-pro
      font-style: normal
      @include body-6-normal
      color: $color-gray-6
  .decline-btn
    box-sizing: border-box
    border: 1px solid $color-red-25
    border-radius: 8px
    font-family: $font-montserrat
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
    font-family: $font-montserrat
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
    height: 229px
</style>