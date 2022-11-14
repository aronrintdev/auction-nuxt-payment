<template>
  <div>
    <div v-if="width <= 500">
      <div v-if="offers.length > 0" :offers="offers">
        <div v-for="(offer) in offers" :key="'trade-page-offer-list-' + offer.id" class="offer-item-trade-container-mobile mt-2 mb-2" @click="showOffer(offer.id)">
          <div class="offer-id pt-2 ml-2">{{$t('trades.offer_id')}} #{{offer.id}}</div>
          <div class="offer-time m-2">{{$t('trades.placed_on')}} {{ offer.created_at | formatDateTimeString }}</div>
            <div class="d-flex justify-content-end mr-2 context-tran" @click="$router.push('/profile/trades/dashboard/' + offer.trade.id)">
              <img v-if="!isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
              <img v-else-if="isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
              {{$t(offer.offer_type_translation)}}
            </div>
           <div class="d-flex justify-content-end mr-2 cond-tran">
             {{$t(offer.condition_translation)}}
           </div>
          <!-- items sections -->
          <b-row class="justify-content-center mt-3" role="button">
            <offer-items :offerItems="offer.theirs_items"/>
          </b-row>
        </div>
      </div>
      <div v-else class="text-center mt-3">
        {{(offerType !== ALL_OFFER_TYPE) ? $t('trades.no_trade_offers_have_been')
        + $t('trades.offer_type.' + offerType) : $t('trades.no_trade_offers_have_been_found')}}</div>
    </div>
    <div v-else>
      <div v-if="offers.length > 0" :offers="offers">
        <div v-for="(offer) in offers" :key="'trade-page-offer-list-' + offer.id" class="offer-item-trade-container m-4" @click="showOffer(offer.id)">
          <div class="d-flex">
            <div class="justify-content-start align-content-start place-cont">
              <div class="offer-id-text pt-2 ml-2">{{$t('trades.offer_id')}} #{{offer.id}}</div>
              <div class="offer-time m-2">{{$t('trades.placed_on')}} {{ offer.created_at | formatDateTimeString }}</div>
            </div>
            <div class="justify-content-end align-content-end mt-2">
              <div>
                <img v-if="!isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
                <img v-else-if="isOfferMine(offer)" :src="require('~/assets/img/downarrow.svg')" class="ml-2" alt="">
                {{$t(offer.offer_type_translation)}}
              </div>
              <div class="view-detail-text ml-5">
                View Details
              </div>
            </div>
          </div>
          <!-- items sections -->
          <b-row class="justify-content-center mt-3" role="button">
            <offer-items :offerItems="offer.theirs_items"/>
          </b-row>
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
import {
  ALL_OFFER_TYPE,
  OFFER_RECEIVED,
  OFFER_SENT,
  COUNTER_OFFER_TYPE,
  OFFER_TYPE
} from '~/static/constants/trades'
export default {
  name: 'AllOffersItems',
  components: {
    OfferItems
  },
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
  data(){
    return {
      width:'',
      ALL_OFFER_TYPE,
      OFFER_RECEIVED,
      COUNTER_OFFER_TYPE,
      OFFER_TYPE,
      OFFER_SENT
    }
  },
  mounted(){
    this.width = window.innerWidth
  },
  methods: {
    isOfferMine(offer) {
      return offer.sent_by_id === this.$auth.user.vendor.id
    },
    showOffer(offerId){
      this.$router.push('/profile/trades/dashboard/' + offerId)
    }
  }

}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.offer-item-trade-container
  height: 350px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px
  background: $color-white-1
.offer-item-trade-container-mobile
  height: 360px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

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
  @include body-13-bold
  color: $color-black-1

.offer-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-9-normal
  color: $color-gray-47

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
.place-cont
  width: 870px
</style>
