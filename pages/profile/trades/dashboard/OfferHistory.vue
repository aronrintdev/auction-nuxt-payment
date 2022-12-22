<template>
  <div>
    <div v-if="isScreenXS">
      <div
        v-for="(offer) in offerHistory.offer_history"
        :key="'offer-history-'+ offer.id"
        class="offer-history-mobile"
        :class="'background-' + (isOfferMine(offer) ? 'blue ml-3' : 'white mr-3')"
      >
        <div class="history-heading"> {{ getOfferTitle(offer) }} </div>
        <div class="mt-2 d-flex justify-content-between align-items-center">
          <div v-if="!isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer">{{$t('trades.they_offered')}}</div>
          <div v-else-if="isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer">{{$t('trades.you_asking_for')}}</div>
          <div class="history-time-mobile">
            {{ $t('common.on') }} {{ offer.created_at | formatDateTimeString }}
          </div>
        </div>

        <div class="row justify-content-start pt-2 m-0">
          <offer-items v-if="isOfferMine(offer) && offer.yours_items && offer.yours_items.length > 0" :offerItems="offer.yours_items" marginItems="mr-3"/>
          <offer-items v-if="!isOfferMine(offer) && offer.theirs_items && offer.theirs_items.length > 0" :offerItems="offer.theirs_items" marginItems="mr-3"/>
        </div>
        <div v-if="offer.cash_added" class="d-flex justify-content-center pt-3">
          <div class="request-amount-mobile d-flex justify-content-center align-items-center mt-2">
            <img class="mr-2 dollar-img" :src="require('~/assets/img/dollar.svg')">
            <span v-if="isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <span v-if="!isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
            <sup>
              <img class="ml-3 mt-2" :src="require('~/assets/img/info.svg')">
            </sup>
          </div>
        </div>
      </div>
      <div
        class="offer-history-mobile mt-3"
        :class="'background-' + (isOfferMine(offerHistory) ? 'blue ml-3' : 'white mr-3')"
      >
        <div class="history-heading"> {{ getOfferTitle(offerHistory) }} </div>
        <div class="mt-2 d-flex justify-content-between align-items-center">
          <div v-if="!isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer">{{$t('trades.they_offered')}}</div>
          <div v-else-if="isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer">{{$t('trades.you_asking_for')}}</div>
          <div class="history-time-mobile">
            {{ $t('common.on') }} {{ offerHistory.created_at | formatDateTimeString }}
          </div>
        </div>
        <div class="row pt-2 m-0">
          <offer-items v-if="isOfferMine(offerHistory) && offerHistory.yours_items && offerHistory.yours_items.length > 0" :offerItems="offerHistory.yours_items" marginItems="mr-3" class="w-100" />
          <offer-items v-if="!isOfferMine(offerHistory) && offerHistory.theirs_items && offerHistory.theirs_items.length > 0" :offerItems="offerHistory.theirs_items" marginItems="mr-3" class="w-100" />
        </div>
        <div v-if="offerHistory.cash_added" class="d-flex justify-content-center pt-3">
          <div class="request-amount-mobile d-flex justify-content-center align-items-center mt-2">
            <img class="mr-2 dollar-img" :src="require('~/assets/img/dollar.svg')">
            <span v-if="isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <span v-if="!isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
            <sup>
              <img class="ml-3 mt-2" :src="require('~/assets/img/info.svg')">
            </sup>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        v-for="(offer) in offerHistory.offer_history"
        :key="'offer-history-'+ offer.id"
        class="offer-history col-12 col-lg-10 col-xl-7 pb-4 mt-4"
        :class="'background-' + (isOfferMine(offer) ? 'blue' : 'white ml-auto')"
      >
        <b-row class="justify-content-between">
          <b-col class="history-heading">
            {{ getOfferTitle(offer) }}
          </b-col>
          <b-col class="history-time text-right">{{ $t('common.on') }} {{ offer.created_at | formatDateTimeString }}</b-col>
        </b-row>
        <div v-if="!isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.they_offered')}}</div>
        <div v-else-if="isOfferMine(offer) && offer.type === OFFER_TYPE" class="heading-offer pt-1">{{$t('trades.you_asking_for')}}</div>
        <b-col class="row justify-content-start pt-2 m-0">
          <offer-items
            v-if="isOfferMine(offer) && offer.yours_items && offer.yours_items.length > 0"
            :offerItems="offer.yours_items"
            marginItems="mr-3"
            :isOfferSummary="true"
            class="w-100"
          />
          <offer-items
            v-if="!isOfferMine(offer) && offer.theirs_items && offer.theirs_items.length > 0"
            :offerItems="offer.theirs_items"
            marginItems="mr-3"
            :isOfferSummary="true"
            class="w-100"
          />
        </b-col>
        <div v-if="offer.cash_added" class="request-amount d-flex align-items-center ml-auto mr-1">
          <img class="mr-2" :src="require('~/assets/img/trades/dollar.svg')">
          <span v-if="isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offer.cash_added)})"></span>
          <span v-if="isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offer.cash_added)})"></span>
          <span v-if="!isOfferMine(offer) && !cashRequested(offer)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
          <span v-if="!isOfferMine(offer) && cashRequested(offer)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offer.cash_added)})"></span>
          <sup>
            <img class="ml-3" :src="require('~/assets/img/trades/info.svg')">
          </sup>
        </div>
      </div>
      <div
        class="mt-4 offer-history col-12 col-lg-10 col-xl-7 pb-2"
        :class="[
          isOfferMine(offerHistory) ? 'blue-theme' : 'white-theme',
          isLastOfferMine ? 'ml-auto' : '',
          offerHistoryClass
        ]"
      >
        <b-row class="justify-content-between align-items-center">
          <b-col class="history-heading">
            {{ getOfferTitle(offerHistory) }}
          </b-col>
          <b-col class="history-time text-right">
            {{ offerHistory.created_at | formatDateTimeString }}
          </b-col>
        </b-row>
        <div v-if="!isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer pt-2">
          {{ $t('trades.they_offered') }}
        </div>
        <div v-else-if="isOfferMine(offerHistory) && offerHistory.type === OFFER_TYPE" class="heading-offer pt-2">
          {{ $t('trades.you_asking_for') }}
        </div>
        <b-col class="row justify-content-center pt-2 pb-4 m-0">
          <offer-items
            v-if="isOfferMine(offerHistory) && offerHistory.yours_items && offerHistory.yours_items.length > 0"
            :offerItems="offerHistory.yours_items"
            marginItems="mr-3"
            :isOfferSummary="true"
            class="w-100"
          />
          <offer-items
            v-if="!isOfferMine(offerHistory) && offerHistory.theirs_items && offerHistory.theirs_items.length > 0"
            :offerItems="offerHistory.theirs_items"
            marginItems="mr-3"
            :isOfferSummary="true"
            class="w-100"
          />
        </b-col>
        <div v-if="offerHistory.cash_added" class="request-amount d-flex align-items-center ml-auto mr-1 mb-3">
          <img class="mr-2" :src="require('~/assets/img/trades/dollar.svg')">
          <span v-if="isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_requested',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
          <span v-if="isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.you_added',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
          <span v-if="!isOfferMine(offerHistory) && !cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_offered_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
          <span v-if="!isOfferMine(offerHistory) && cashRequested(offerHistory)" class="amount-text" v-html="$t('trades.they_requested_amount',{0: convertCashToDollars(offerHistory.cash_added)})"></span>
          <sup>
            <img class="ml-3" :src="require('~/assets/img/trades/info.svg')">
          </sup>
        </div>
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
  computed: {
    isLastOfferMine() {
      const offer = this.offerHistory.offer_history[this.offerHistory.offer_history.length - 1]
      if (offer) {
        return this.isOfferMine(offer)
      }
      return false
    }
  },
  mounted() {
    this.width = window.innerWidth
  },
  methods: {
    cashRequested(offer){
      return (offer.cash_type === CASH_TYPE_REQUESTED)
    },
    isOfferMine(offer) {
      return offer.sent_by_id === this.$auth.user.vendor.id
    },
    getOfferTitle(offerHistory) {
      let result = ''
      if (this.isOfferMine(offerHistory) && this.offerHistory.type === COUNTER_OFFER_TYPE) {
        result = `${this.$t('trades.your_counter_offer')}`
      } else if (!this.isOfferMine(offerHistory) && this.offerHistory.type === COUNTER_OFFER_TYPE) {
        result = `${this.$t('trades.their_counter_offerHistory')}`
      } else if (!this.isOfferMine(offerHistory) && this.offerHistory.type === 'offer') {
        result = `${this.$t('trades.index.their_offer')}`
      } else {
        result = this.$t('trades.your_offer')
      }

      return `${result} (${this.offerHistory.id})`
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
    min-width: 685px
    border-radius: 10px
    padding: 30px 49px 0 49px

.px-54
  padding-left: 54px
  padding-right: 54px

.offer-history-mobile
  background: $color-white-5 !important
  padding: 15px 22px 20px 22px

.history-heading
  @include body-4-bold
  font-family: $font-family-sf-pro-display
  color: $color-blue-20
  @media (min-width: 576px)
    @include body-2-bold
    color: $color-blue-20

.history-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-black-1

.history-time-mobile
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-9-normal
  color: $color-black-1
.heading-offer
  @include body-9-normal
  color: $color-gray-47
  font-family: $font-family-sf-pro-display
  @media (min-width: 576px)
    @include body-13-normal

.background-blue
  background: $color-blue-28

.background-white
  background: $color-white-1

.request-amount
  background: $color-gray-1
  border-radius: 4px
  padding-left: 20px
  padding-right: 10px
  height: 33px
  width: max-content

.amount-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-5-regular
  color: $color-black-1

.pl-54
  padding-left: 54px
.request-amount-mobile
  width: 225px
  height: 30px
  border-radius: 4px
  background: $color-white-4
.dollar-img
  width: 7px
  height: 12px
.blue-theme
  background: #edf5ff
  margin-top: 2rem

.white-theme
  background: white
</style>
