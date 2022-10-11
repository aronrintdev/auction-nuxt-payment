<template>
  <b-col v-show="showOffer" cols="12" class="offer-grid mt-3 px-4 py-3">
    <div class="details-grid w-100">
      <!-- Price icons/Offer Price/status -->
      <b-row class="details-row">
        <b-col cols="3">
          <img :src="require('~/assets/img/icons/offer-price.svg')" alt="offer-icon"/>
        </b-col>
        <b-col cols="4">
          <div class="price-block">
            {{ offer.bid_price |toCurrency('USD', 'N/A') }}
          </div>

          <div v-if="highestOffer && offer.id === highestOffer.id" class="score-block">
            {{ $t('selling_page.highest_offer') }}
          </div>
        </b-col>
        <b-col cols="5">
          <div :class="`status-block d-flex justify-content-center ${offer.status}`">
            <p class="mb-0 my-auto">{{ getOfferStatus | capitalizeFirstLetter }}</p>
          </div>
        </b-col>
      </b-row>
      <!-- Price icons/Offer Price/status ends -->

      <!-- Placed on/ Expires In -->
      <b-row class="placed-details d-block mt-2">
        <p class="placed-on">{{ $t('selling_page.placed_on') }} {{ offer.created_at | formatDateTimeString('dd/mm/yyyy hh:mm ampm timezone') }}</p>
        <!-- TODO expiry -->
        <p class="expires-on d-flex align-items-center text-align-center">{{ $t('selling_page.expires_in') }} 2 Days</p>
        <!-- TODO: Expiry -->
      </b-row>
      <!-- Placed on/ Expires In ends  -->

      <b-row :class="`action-row justify-content-around ${offer.status === pendingOffer ? 'd-flex show-action' : 'd-none hide-action'}`">
        <b-button variant="decline" class="d-flex align-items-center text-align-center" @click="$emit('confirmation', {action: 'decline', id: offer.id})">
          {{ $t('common.decline') }}
        </b-button>
        <b-button variant="accept" class="d-flex align-items-center text-align-center" @click="$emit('confirmation', {action: 'accept', id: offer.id})">
          {{ $t('common.accept') }}
        </b-button>
      </b-row>
    </div>
  </b-col>
</template>

<script>
import { PENDING_STATUS, AWAITING_APPROVAL, ACCEPTED_OFFER } from '~/static/constants'
export default {
  name: 'OffersGrid',

  props: {
    offer: {
      type: Object,
      default: () => {},
    },

    highestOffer: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      pendingOffer: PENDING_STATUS,
      awaitingApproval: AWAITING_APPROVAL,
      acceptedOffer: ACCEPTED_OFFER
    }
  },

  computed: {
    getOfferStatus: (vm) => {
      if (vm.offer.status === vm.pendingOffer) {
        return vm.awaitingApproval
      }
      return vm.offer.status
    },

    showOffer: (vm) => {
      return vm.offer.status === vm.pendingOffer ||
      (vm.offer.status === vm.acceptedOffer &&
        vm.offer.sell_details &&
        vm.offer.sell_details.vendor_id === vm.$auth.user.vendor.id)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.offer-grid
  .action-row
    .show-action
      width: 343px
      height: 149px
    .hide-action
      width: 343px
      height: 102px
  background: $color-white-1
  box-shadow: 0px 1px 4px $drop-shadow1
  border-radius: 10px
.price-block
  font-family: $font-montserrat
  font-style: normal
  @include body-5-medium
  color: $color-black-1
.score-block
  font-family: $font-sp-pro
  font-style: normal
  @include body-9-normal
  color: $color-green-2
@media (max-width: 356px)
  .status-block
    @include body-6-normal
    width: auto
@media (min-width: 356px)
  .status-block
    width: 129px
    @include body-5-normal
.status-block
  height: 28px
  left: 207px
  top: 458px
  font-family: $font-sp-pro
  font-style: normal
  &.declined
    background: $color-red-23
    border-radius: 4px
    color: $color-red-3
  &.pending
    background: $color-gray-82
    border-radius: 4px
    color: $color-black-1
.placed-details
  padding-right: 8px
  padding-left: 8px
  .placed-on
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-regular
    letter-spacing: -0.005em
    color: $color-gray-83
    margin-bottom: 2px
  .expires-on
    font-family: $font-sp-pro
    font-style: normal
    @include body-9-normal
    color: $color-gray-5
.action-row
  .btn-decline
    left: 14.93%
    right: 56.53%
    top: 57.08%
    bottom: 38.82%
    border: 1px solid $color-red-25
    border-radius: 8px
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-red-25
  .btn-accept
    left: 56.53%
    right: 14.93%
    top: 57.08%
    bottom: 38.82%
    border: 1px solid $color-green-2
    border-radius: 8px
    font-family: $font-montserrat
    font-style: normal
    @include body-9-medium
    color: $color-green-2
</style>
