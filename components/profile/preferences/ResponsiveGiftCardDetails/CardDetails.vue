<template>
  <!-- <div class="card-details-wrapper mx-auto"> -->
  <div class="card-details-wrapper">
    <!-- Image/ Card Number/ Add funds Button -->
    <b-row class="card-row mx-0">
      <b-col class="card-img-col p-0">
        <img class="card-image img-fluid" :src="require(`~/assets/img/preferences/giftcard/${cardImage}`)" :alt="cardImage">
      </b-col>

      <b-col class="card-details-col p-0">
        <div class="giftcard-number">
          {{ $t('preferences.payments.gift_card') }}&colon; {{ cardNumber }}
        </div>
        <div class="add-fund-wrapper">
          <Button variant="add-fund" class="d-flex align-items-center" @click="$router.push(`/profile/preferences/giftcard/view-giftcard/add-funds/${cardDetails.id}`)">
            {{ $t('giftcard_section.add_funds') }}
          </Button>
        </div>
      </b-col>
    </b-row>
    <!-- ./Image/ Card Number/ Add funds Button -->

    <!-- Avail. Balance/ Giftcardcode/Pin -->
    <b-row class="card-details-row">
      <b-col cols="12">
        <div class="available-balance px-20 d-flex justify-content-between">
          <span class="details">{{ $t('giftcard_section.available_balance') }}</span>
          <span class="result float-right">{{ availBalance | toCurrency('USD', 'N/A') }}</span>
        </div>
        <div class="giftcard-code grey-bg px-20 d-flex justify-content-between">
          <span class="details">{{ $t('giftcard_section.giftcard_code') }}</span>
          <span class="result float-right text-blue">
            <RoundIcon v-if="!showCode" class="pwd-icon" />
            <RoundIcon v-if="!showCode" class="pwd-icon" />
            <RoundIcon v-if="!showCode" class="pwd-icon" />
            <RoundIcon v-if="!showCode" class="pwd-icon" />
            <span v-if="!showCode" class="card-last-digit">{{ cardNumber.slice(-4) }}</span>
            <span v-if="showCode" class="card-digit">{{ cardNumber }}</span>
            <ShowIcon v-if="!showCode"  role="button" @click="showCode = true" />
            <HideIcon v-if="showCode" role="button" @click="showCode = false" />
          </span>
        </div>
        <div class="giftcard-pin px-20 d-flex justify-content-between">
          <span class="details">{{ $t('giftcard_section.pin') }}</span>
          <span class="result">
            <RoundIcon v-if="!showPin" class="pwd-icon" />
            <RoundIcon v-if="!showPin" class="pwd-icon" />
            <RoundIcon v-if="!showPin" class="pwd-icon" />
            <RoundIcon v-if="!showPin" class="pwd-icon" />
            <span v-if="showPin" class="card-pin">{{ pin }}</span>
            <ShowIcon v-if="!showPin"  role="button" @click="showPin = true" />
            <HideIcon v-if="showPin" role="button" @click="showPin = false" />
          </span>
        </div>
      </b-col>
    </b-row>
    <!-- ./Avail. Balance/ Giftcardcode/Pin -->
  </div>
</template>

<script>
import RoundIcon from '~/assets/img/icons/round-gray.svg?inline'
import Button from '~/components/common/Button'
import ShowIcon from '~/assets/img/icons/show-pwd.svg?inline'
import HideIcon from '~/assets/img/icons/hide-pwd.svg?inline'

export default {
  name: 'CardDetails',
  
  components: {
    Button,
    RoundIcon,
    HideIcon,
    ShowIcon
  },

  props: {
    cardDetails: {
      type: Object,
      default: () => {},
      required: true
    }
  },

  data() {
    return {
      showPin: false,
      showCode: false
    }
  },

  computed: {
    cardImage: (vm) => {
      return vm.cardDetails && vm.cardDetails.card.image_name
    },

    cardNumber: (vm) => {
      return vm.cardDetails && vm.cardDetails.giftcard_number
    },

    availBalance: (vm) => {
      return vm.cardDetails && vm.cardDetails.remaining_amount
    },

    pin: (vm) => {
      return vm.cardDetails && vm.cardDetails.pin
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.card-details-wrapper
  background: $color-white
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  margin-right: 16px
  margin-left: 16px
  @media only screen and (min-width: 236px)
    height: 175px
  @media only screen and (max-width: 375px)
    max-width: 343px
  .pwd-icon
    width: 6px
    height: 6px
  .card-row
    padding: 16px 12px 0 12px
  .card-details-row
    margin-top: 14px
    .available-balance
      @media (min-width: 245px)
        height: 20px
    .grey-bg
      background: $color-white-5
    .h-20
      height: 20px
    .px-20
      padding-left: 12px
      padding-right: 12px
    
    .details
      font-family: $font-montserrat
      font-style: normal
      @include body-9-medium
      color: $color-black-1
    .result
      font-family: $font-montserrat
      font-style: normal
      @include body-9-normal
      color: $color-black-1

  .card-img-col::v-deep
    max-width: 126px
    height: 80px
    @media only screen and (max-width: 375px)
      flex: 0 0 40%
      width: 40%     
    
  .card-details-col::v-deep
    @media only screen and (max-width: 375px)
      flex: 0 0 60%
      width: 60% 
    .add-fund-wrapper
      padding-top: 15px
      padding-left: 23px
      .btn-add-fund
        max-width: 164px
        height: 30px
        border: 1px solid $color-grey-101
        border-radius: 20px
        font-family: $font-montserrat
        font-style: normal
        @include body-21-medium
        color: $color-grey-101
        @media only screen and (max-width: 319px)
          padding: 10%
    .giftcard-number
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-black-1
      margin-top: 8px
      margin-left: 8px
      @media only screen and (max-width: 375px)
        max-width: 164px
        height: 30px
</style>