<template>
  <div>
    <div v-if="isScreenXS">
      <div v-for="(offer) in offerHistory.offer_history" :key="'offer-history-'+ offer.id" class="offer-history-mobile" :class="'background-' + (isOfferMine(offer) ? 'blue' : 'white')">
        <b-row class="justify-content-between pt-4 pl-4 pr-4">
          <b-col v-if="isOfferMine(offer) && offer.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.your_counter_offer')}} ({{ offer.id}})</b-col>
          <b-col v-else-if="!isOfferMine(offer) && offer.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.their_counter_offer')}} ({{ offer.id}})</b-col>
          <b-col class="history-time-mobile text-right">on {{ offer.created_at | formatDateTimeString }}</b-col>
        </b-row>
        <b-col v-if="!isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.they_offered')}}</b-col>
        <b-col v-else-if="isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.you_asking_for')}}</b-col>
        <b-col class="row justify-content-start pt-2 m-0">
          <offer-items v-if="isOfferMine(offer) && offer.yours_items && offer.yours_items.length > 0" :offerItems="offer.yours_items" marginItems="mr-3"/>
          <offer-items v-if="!isOfferMine(offer) && offer.theirs_items && offer.theirs_items.length > 0" :offerItems="offer.theirs_items" marginItems="mr-3"/>
        </b-col>
        <b-row v-if="offer.cash_added" class="justify-content-end pr-5 pt-3 pb-3">
          <b-col class="request-amount-mobile d-flex justify-content-center align-content-center ml-4 mt-2">
            <img class="mr-2 dollar-img mt-1" :src="require('~/assets/img/dollar.svg')">
            <span v-if="isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <sup>
              <img class="ml-3 mt-2" :src="require('~/assets/img/info.svg')">
            </sup>
          </b-col>
        </b-row>
      </div>
      <div class="offer-history-mobile mt-2" :class="'background-' + (isOfferMine(offerHistory) ? 'blue' : 'white')">
        <b-row class="justify-content-between pt-4 pl-4 pr-4">
          <b-col v-if="isOfferMine(offerHistory) && offerHistory.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.your_counter_offer')}} ({{ offerHistory.id}})</b-col>
          <b-col v-else-if="!isOfferMine(offerHistory) && offerHistory.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.their_counter_offerHistory')}} ({{ offerHistory.id}})</b-col>
          <b-col class="history-time-mobile text-right">on {{ offerHistory.created_at | formatDateTimeString }}</b-col>
        </b-row>
        <b-col v-if="!isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer-small pt-1">{{$t('trades.they_offered')}}</b-col>
        <b-col v-else-if="isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer-small pt-1">{{$t('trades.you_asking_for')}}</b-col>
        <b-col class="row justify-content-start pt-2 m-0">
          <offer-items v-if="isOfferMine(offerHistory) && offerHistory.yours_items && offerHistory.yours_items.length > 0" :offerItems="offerHistory.yours_items" marginItems="mr-3"/>
          <offer-items v-if="!isOfferMine(offerHistory) && offerHistory.theirs_items && offerHistory.theirs_items.length > 0" :offerItems="offerHistory.theirs_items" marginItems="mr-3"/>
        </b-col>
        <b-row v-if="offerHistory.cash_added" class="justify-content-end pr-5 pt-3 pb-3">
          <b-col class="request-amount-mobile  d-flex justify-content-center align-content-center ml-4 mt-2">
            <img class="mr-2 dollar-img mt-1" :src="require('~/assets/img/dollar.svg')">
            <span v-if="isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <sup>
              <img class="ml-3 mt-2" :src="require('~/assets/img/info.svg')">
            </sup>
          </b-col>
        </b-row>
      </div>
    </div>
    <div v-else>
      <div v-for="(offer) in offerHistory.offer_history" :key="'offer-history-'+ offer.id" class="offer-history" :class="'background-' + (isOfferMine(offer) ? 'blue' : 'white')">
        <b-row class="justify-content-between pt-4 pl-4 pr-4">
          <b-col v-if="isOfferMine(offer) && offer.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.your_counter_offer')}} ({{ offer.id}})</b-col>
          <b-col v-else-if="!isOfferMine(offer) && offer.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.their_counter_offer')}} ({{ offer.id}})</b-col>
          <b-col class="history-time text-right">on {{ offer.created_at | formatDateTimeString }}</b-col>
        </b-row>
        <b-col v-if="!isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.they_offered')}}</b-col>
        <b-col v-else-if="isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.you_asking_for')}}</b-col>
        <b-col class="row justify-content-start px-54 pt-2 m-0">
          <offer-items v-if="isOfferMine(offer) && offer.yours_items && offer.yours_items.length > 0" :offerItems="offer.yours_items" marginItems="mr-3"/>
          <offer-items v-if="!isOfferMine(offer) && offer.theirs_items && offer.theirs_items.length > 0" :offerItems="offer.theirs_items" marginItems="mr-3"/>
        </b-col>
        <b-row v-if="offer.cash_added" class="justify-content-end pr-5 pt-3 pb-3">
          <b-col class="request-amount d-flex">
            <img class="mr-2" :src="require('~/assets/img/trades/dollar.svg')">
            <span v-if="isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <sup>
              <img class="ml-3" :src="require('~/assets/img/trades/info.svg')">
            </sup>
          </b-col>
        </b-row>
      </div>
      <div 
        class="offer-history w-100" 
        :class="[isOfferMine(offerHistory) ? 'blue-theme' : 'white-theme', offerHistoryClass]"
      >
        <b-row class="justify-content-between pt-4 pl-4 pr-4">
          <b-col v-if="isOfferMine(offerHistory) && offerHistory.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.your_counter_offer')}} ({{ offerHistory.id}})</b-col>
          <b-col v-else-if="!isOfferMine(offerHistory) && offerHistory.type === COUNTER_OFFER_TYPE" class="history-heading">{{$t('trades.their_counter_offerHistory')}} ({{ offerHistory.id}})</b-col>
          <b-col class="history-time text-right">{{ offerHistory.created_at | formatDateTimeString }}</b-col>
        </b-row>
        <b-col v-if="!isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.they_offered')}}</b-col>
        <b-col v-else-if="isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.you_asking_for')}}</b-col>
        <b-col class="row justify-content-center px-54 pt-2 pb-4 m-0">
          <offer-items            
            v-if="isOfferMine(offerHistory) && offerHistory.yours_items && offerHistory.yours_items.length > 0" 
            :offerItems="offerHistory.yours_items" 
            marginItems="mr-3"
            class="w-100"
          />
          <offer-items 
            v-if="!isOfferMine(offerHistory) && offerHistory.theirs_items && offerHistory.theirs_items.length > 0" 
            :offerItems="offerHistory.theirs_items" 
            marginItems="mr-3"
            class="w-100"
          />
        </b-col>
        <b-row v-if="offerHistory.cash_added" class="justify-content-end pr-5 pt-3 pb-3">
          <b-col class="request-amount d-flex">
            <img class="mr-2" :src="require('~/assets/img/trades/dollar.svg')">
            <span v-if="isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <sup>
              <img class="ml-3" :src="require('~/assets/img/trades/info.svg')">
            </sup>
          </b-col>
        </b-row>
      </div>
    </div>

  </div>
</template>

<script>
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems';
import ScreenSize from '~/plugins/mixins/screenSize'
import {
  OFFER_TYPE,
  COUNTER_OFFER_TYPE,
  CASH_TYPE_REQUESTED
} from '~/static/constants/trades'
export default {
  name: 'OfferHistory',
  components: {
    OfferItems
  },
  mixins: [ScreenSize],
  props:{
    variant:{
      type: String,
      default: 'white'
    },
    offerHistory: {
      type: Object,
      default: () => {},
    },
    offerHistoryClass: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      COUNTER_OFFER_TYPE,
      OFFER_TYPE,
      CASH_TYPE_REQUESTED,
      width:'',
    }
  },
  mounted(){
    this.width = window.innerWidth
  },
  methods: {
    cashRequested(offer){
      return (offer.cash_type === CASH_TYPE_REQUESTED)
    },
    isOfferMine(offer) {
      return offer.sent_by_id === this.$auth.user.vendor.id
    },
    // convert cash to dollars
    convertCashToDollars(cash){
      return (cash) ? (cash/100).toFixed(2) : '0.00'
    }
  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.offer-history
  @media (max-width: 500px)
    width: 685px
    min-height: 333px
    max-height: 350px
    background: $color-white-1
    border-radius: 10px

  @media (min-width: 576px)
    border-radius: 10px

.px-54
  padding-left: 54px
  padding-right: 54px

.offer-history-mobile
  width: 360px
  background: $color-white-5 !important

.history-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-2-bold
  color: $color-blue-1

.history-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-black-1

.history-time-mobile
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-9-regular
  color: $color-black-1
.heading-offer
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-gray-47
  padding-left: 47px

.heading-offer-small
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-9-normal
  color: $color-gray-47

.background-blue
  background:  $color-blue-28

.request-amount
  max-width: 247px
  background: $color-gray-1
  border-radius: 4px
  padding: 10px

.amount-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  color: $color-black-1

.pl-54
  padding-left: 54px
.request-amount-mobile
  width: 225px
  border-radius: 4px
  background: $color-white-4
.dollar-img
  width: 7px
  height: 12px
.blue-theme
  background: #edf5ff
  margin-top: 2rem
  float: right
  margin-left: 35rem
  @media (min-width: 576px)
    width: 100%

.white-theme
  background: white
  float: left
</style>
