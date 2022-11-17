<template>
  <div>
    <div v-if="isScreenXS">
      <div v-if="offers.length > 0" :offers="offers">
        <div v-for="(offer) in offers" :key="'trade-page-offer-list-' + offer.id" class="offer-item-trade-container-mobile mt-2 mb-2" @click="showOffer(offer.id)">
          <div class="d-flex justify-content-between">
            <div class="offer-id">
              {{ $t('trades.offer_id') }} #{{ offer.id }}
            </div>

            <div 
              class="d-flex context-tran align-items-center" 
              @click="$router.push('/profile/trades/dashboard/' + offer.trade.id)"
            >
              <img v-if="!isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="mr-1" alt="">
              <img v-else-if="isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="mr-1" alt="">
              <div>{{ $t(offer.offer_type_translation) }}</div>
            </div>
          </div>
          
          <div class="mt-2 d-flex justify-content-between">
            <div class="offer-time">
              {{ $t('trades.placed_on') }} {{ offer.created_at | formatDateTimeString }}
            </div>
            <div 
              class="cond-tran"
              :class="[offer.condition === 'poor' ? 'poor' : 'excellent']"
            >
              {{ $t(offer.condition_translation) }}
            </div> 
          </div>

          <div class="d-flex justify-content-center mt-3" role="button">
            <offer-items :offerItems="offer.theirs_items"/>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-3">
        {{(offerType !== ALL_OFFER_TYPE) ? $t('trades.no_trade_offers_have_been')
        + $t('trades.offer_type.' + offerType) : $t('trades.no_trade_offers_have_been_found')}}</div>
    </div>
    <div v-else>
      <div v-if="offers.length > 0" :offers="offers">
        <div 
          v-for="(offer) in offers" 
          :key="'trade-page-offer-list-' + offer.id"
          class="offer-item-trade-container m-4 pb-4" 
          @click="showOffer(offer.id)"
        >
          <b-row class="heading-wrapper">
            <b-col>
              <div>
                <div class="offer-id-text">{{$t('trades.offer_id')}} #{{offer.id}}</div>
                <div class="mt-2 offer-time">{{$t('trades.placed_on')}} {{ offer.created_at | formatDateTimeString }}</div>
              </div>
            </b-col>
            <b-col>
              <div class="float-right">
                <div>
                  <img v-if="!isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
                  <img v-else-if="isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
                  {{$t(offer.offer_type_translation)}}
                </div>
                <div class="mt-2 view-detail-text text-right">
                  {{$t('trades.view_details')}}
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- items sections -->
          <b-row class="justify-content-center mt-3 w-72 mx-auto" role="button">
            <offer-items :offerItems="offer.theirs_items"/>
          </b-row>

          <div class="trade-hub-buttons d-flex justify-content-center align-items-center mt-4">
            <Button class="accpt-btn mr-3"  @click="acceptOffer()">{{ $t('trades.accept') }}</Button>
            <Button class="decline-btn mr-3"  @click="$bvModal.show('declineOffer')">{{ $t('trades.decline') }}
            </Button>
            <Button class="count-btn"  @click="$router.push('/profile/trades/dashboard/counter-offer/' + offer.id)">
              {{ $t('trades.counter_offer') }}
            </Button>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-3">
        {{(offerType !== ALL_OFFER_TYPE) ? $t('trades.no_trade_offers_have_been')
        + $t('trades.offer_type.' + offerType) : $t('trades.no_trade_offers_have_been_found')}}</div>
    </div>

  </div>
</template>

<script>
import OfferItems from '~/pages/profile/trades/dashboard/OfferItems';
import Button from '~/components/common/Button'
import ScreenSize from '~/plugins/mixins/screenSize'
import {
  ALL_OFFER_TYPE,
  OFFER_RECEIVED,
  OFFER_SENT,
  COUNTER_OFFER_TYPE,
  OFFER_TYPE,
  OFFER_TYPE_YOURS,
  ACCEPT_OFFER,
  CASH_TYPE_REQUESTED,
  ACCEPTED_OFFER,
  ONE_ITEM,
  THREE_ITEMS,
  TWO_ITEMS,
  DEFAULT_FAIR_TRADE_VALUE, CASH_TYPE_ADDED, FILTER_OFFER_STATUS_DECLINED
} from '~/static/constants/trades'
export default {
  name: 'AllOffersItems',
  components: {
    OfferItems,
    Button
  },
  mixins: [ScreenSize],
  props:{
    offers: {
      type: Array,
      required: true,
    },
    offerType: {
      type: String,
      required: true
    }
  },
  mixins: [ScreenSize],
  data() {
    return {
      offer: null,
      ALL_OFFER_TYPE,
      OFFER_RECEIVED,
      COUNTER_OFFER_TYPE,
      OFFER_TYPE,
      OFFER_SENT,
      lastSubmittedOffer: null,
      ACCEPTED_OFFER,
      ACCEPT_OFFER,
      OFFER_TYPE_YOURS,
      tradeId: 0,
      ONE_ITEM,
      THREE_ITEMS,
      TWO_ITEMS,
      fairTradePercentage: (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
      CASH_TYPE_ADDED,
      CASH_TYPE_REQUESTED,
      DEFAULT_FAIR_TRADE_VALUE,
      isPayment: false,
      FILTER_OFFER_STATUS_DECLINED
    }
  },
  methods: {
    isOfferMine(offer) {
      return offer.sent_by_id === this.$auth.user.vendor.id
    },
    showOffer(offerId){
      this.$router.push('/profile/trades/dashboard/' + offerId)
    },
    acceptOffer(){
      let cashAdded = 0
      if(this.lastSubmittedOffer.cash_added &&
        !this.isOfferMine() &&
        this.isCashTypeRequested())
      {
        cashAdded = (this.lastSubmittedOffer.cash_added)
      }
      this.$store.commit('trade/setActiveTrade', {
        trade: this.offer,
        theirItems: this.lastSubmittedOffer.theirs_items,
        yourItems: this.lastSubmittedOffer.yours_items,
        cashAdded: parseInt(parseFloat(cashAdded)),
        cashType: this.lastSubmittedOffer.cash_type,
        lastOffer: this.lastSubmittedOffer,
        tradeCondition: this.lastSubmittedOffer.condition,
        submittedItemType: OFFER_TYPE_YOURS,
        offerType: ACCEPT_OFFER,
        theirVendorId: this.lastSubmittedOffer.theirs_items[0].vendor_id,
        tradeId: this.lastSubmittedOffer.trade_id,
        offerParentId: (this.lastSubmittedOffer.parent_id ? this.lastSubmittedOffer.parent_id : this.lastSubmittedOffer.id)
      })
      this.isPayment = true
    },
    isCashTypeRequested(){
      return this.lastSubmittedOffer.cash_type === CASH_TYPE_REQUESTED
    },
    fetchOfferDetails(){
      this.offerId = parseInt(this.$route.params.id)
      this.$axios
        .get('trades/offer/' + this.offerId)
        .then((response) => {
          this.offer = response.data.data
          this.lastSubmittedOffer = response.data.data.latest_offer ?? response.data.data
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
          this.offer = null
        })
    },
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.w-72
  width: 72%

.heading-wrapper
  padding: 18px 31px 0 31px

.offer-item-trade-container
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  background: $color-white-1
.offer-item-trade-container-mobile
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 4px
  padding: 13px

#flyer-excellent
  width: 145px
  height: 30.36px
  background: $color-green-21
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: 16px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-excellent:before,#flyer-excellent::before
  position: absolute
  margin-top: 27.5px
  margin-left: -16px
  content: ''
  width: 0
  height: 0
  border-top: 6px solid $color-green-22
  border-left: 6px solid transparent


#flyer-fair
  width: 145px
  height: 30.36px
  background: $color-yellow-7
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: 16px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-fair:before,#flyer-fair::before
  position: absolute
  margin-top: 27.5px
  margin-left: -16px
  content: ''
  width: 0
  height: 0
  border-top: 6px $color-yellow-7
  border-left: 6px solid transparent

#flyer-poor
  width: 145px
  height: 30.36px
  background: $color-red-16
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: 16px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-poor:before,#flyer-poor::before
  position: absolute
  margin-top: 27.5px
  margin-left: -16px
  content: ''
  width: 0
  height: 0
  border-top: 6px solid $color-red-16
  border-left: 6px solid transparent

.offer-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-bold
  color: $color-blue-20
.offer-id-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-3-bold
  color: $color-black-1

.offer-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-9-normal
  color: $color-gray-47
  @media (min-width: 576px)
    @include body-4-normal
    color: $color-gray-64

.offer-received
  width: 195px
  background: $color-blue-27
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-regular
  color: $color-gray-5

.offer-sent
  width: 195px
  background: $color-yellow-5
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-regular
  color: $color-gray-5
.context-tran
  font-family: $font-family-montserrat
  font-style: normal
  @include body-18-regular
  color: $color-black-1
.cond-tran
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-21-bold
.view-detail-text
  font-family: $font-family-sf-pro-display
  font-style: $normal
  font-weight: 500
  @include body-13
  line-height: 19px
  text-decoration-line: underline
  color: $color-blue-20

.accpt-btn
 width: 139px
 height: 39px
 font-family: $font-family-montserrat
 font-style: normal
 font-weight: $medium
 @include body-13
 color: $color-white-1 !important
 background: $color-blue-20 !important
 border-radius: 8px
.decline-btn
  width: 139px
  height: 39px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-13
  color: $color-blue-32 !important
  background: $color-white-29 !important
  border-radius: 8px
.count-btn
  width: 139px
  height: 39px
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  @include body-13
  color: $color-blue-20 !important
  background: $color-white-1 !important
  border-radius: 8px
  border: 1px solid $color-blue-20 !important

.excellent
  color: #6FD179

.poor
  color: #FA3E3E

</style>
