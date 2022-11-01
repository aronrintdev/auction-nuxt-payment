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
          <div class="d-flex justify-content-between">
            <div :id="`flyer-${offer.condition}`">
              {{$t(offer.condition_translation)}}
            </div>
            <div class="pt-3 text-center">
              <div class="offer-id">{{$t('trades.offer_id')}} #{{offer.id}}</div>
              <div class="offer-time">{{$t('trades.placed_on')}} {{ offer.created_at | formatDateTimeString }}</div>
            </div>
            <div :class="`offer-${offer.offer_type}`" class="d-flex justify-content-center align-items-center" @click="$router.push('/profile/trades/dashboard/' + offer.trade.id)">
              {{$t(offer.offer_type_translation)}}
              <img v-if="!isOfferMine(offer)" :src="require('~/assets/img/icons/upword-arrow.svg')" class="ml-2" alt="">
              <img v-else-if="isOfferMine(offer)" :src="require('~/assets/img/icons/downword-arrow.svg')" class="ml-2" alt="">
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
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 700
  font-size: 16px
  line-height: 19px
  color: #667799


.offer-time
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 500
  font-size: 12px
  line-height: 14px
  color: #999999

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
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 400
  font-size: 10px
  line-height: 12px
  color: #000000
.cond-tran
  font-family: 'SF Pro Display'
  font-style: normal
  font-weight: 700
  font-size: 13px
  line-height: 16px
</style>
