<template>
  <div class="d-block">
    <div v-for="(offer) in offers" :key="'offer-' + offer.id" class="offer-item-trade-container mb-4" :role="(offer.deleted_at === null ? 'button' : '')" @click="showOffer(offer)">
      <div class="d-flex justify-content-between">
        <div :id="`flyer-${offer.condition}`">
          {{$t(offer.condition_translation)}}
        </div>
        <div class="pt-3">
          <div class="offer-id">
            {{$t('trades.offer_id')}} #{{offer.id}}
          </div>
          <div class="offer-time">{{$t('trades.placed_on')}} {{ offer.created_at | formatDateTimeString }}</div>
        </div>
        <div :class="`offer-${offer.offer_type}`" class="d-flex justify-content-center align-items-center">
          {{$t(offer.offer_type_translation)}}
          <img v-if="offer.offer_type === OFFER_SENT" :src="require('~/assets/img/icons/upword-arrow.svg')" class="ml-2">
          <img v-else-if="offer.offer_type === OFFER_RECEIVED" :src="require('~/assets/img/icons/downword-arrow.svg')" class="ml-2">
        </div>
      </div>
      <!-- items sections -->
      <div class="d-flex justify-content-between mt-4">
        <div class="inner-items-listed ml-auto mr-auto">
          <div class="inner-heading-listing text-center p-2">
            {{$t(offer.offer_type_translation)}}
          </div>
          <div v-if="offer.latest_offer">
            <div v-for="(theirItems) in offer.latest_offer.theirs_items" :key="'offer-item-'+ theirItems.id" class="d-flex align-items-center ml-4">
              <img :src="theirItems.inventory.product | getProductImageUrl" class="inner-item-image">
              <ul class="inner-item-text">
                <li class="pt-3 text-truncate product-name">{{theirItems.inventory.product.name | truncate(30, '...')}}</li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div v-for="(theirItems) in offer.theirs_items" :key="'offer-item-'+ theirItems.id" class="d-flex align-items-center ml-4">
              <img :src="theirItems.inventory.product | getProductImageUrl" class="inner-item-image">
              <ul class="inner-item-text text-truncate product-name">
                <li class="pt-3">{{theirItems.inventory.product.name | truncate(30, '...')}}</li>
              </ul>
            </div>
          </div>
        </div>
        <img :src="require('~/assets/img/icons/trade-icon.svg')">
        <div class="inner-items-listed ml-auto mr-auto">
          <div class="inner-heading-listing text-center p-2">
            {{$t('trades.your_listed_items')}}
          </div>
          <div v-if="offer.latest_offer">
            <div v-for="(yourItems) in offer.latest_offer.yours_items" :key="'trade-offer-item-'+ yourItems.id" class="d-flex align-items-center ml-4">
              <img :src="yourItems.inventory.product | getProductImageUrl" class="inner-item-image">
              <ul class="inner-item-text">
                <li class="pt-3 text-truncate product-name">{{yourItems.inventory.product.name | truncate(30, '...')}}</li>
              </ul>
            </div>
          </div>
          <div v-else>
            <div v-for="(yourItems) in offer.yours_items" :key="'trade-offer-item-'+ yourItems.id" class="d-flex align-items-center ml-4">
              <img :src="yourItems.inventory.product | getProductImageUrl" class="inner-item-image">
              <ul class="inner-item-text">
                <li class="pt-3 text-truncate product-name">{{ yourItems.inventory.product.name | truncate(30, '...')}}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {
  OFFER_SENT,
  OFFER_RECEIVED
} from '~/static/constants/trades'

export default {
  name: 'TradeOfferItems',
  props:{
    offers: {
      type: Array,
      required: true,
    }
  },
  data(){
    return {
      OFFER_SENT,
      OFFER_RECEIVED
    }
  },
  methods: {
    showOffer(offer){
      if(offer.deleted_at === null){
        this.$router.push('/profile/trades/dashboard/' + offer.id)
      }
      return false
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.offer-item-trade-container
  width: 1062px
  height: 350px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

#flyer-excellent
  width: 145px
  height: 30.36px
  background: $color-green-21
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-excellent:before,#flyer-excellent::before
  position: absolute
  margin-top: 27.5px
  margin-left: -22px
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
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-fair:before,#flyer-fair::before
  position: absolute
  margin-top: 27.5px
  margin-left: -22px
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
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px

#flyer-poor:before,#flyer-poor::before
  position: absolute
  margin-top: 27.5px
  margin-left: -22px
  content: ''
  width: 0
  height: 0
  border-top: 6px solid $color-red-16
  border-left: 6px solid transparent

.offer-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-blue-1

.offer-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-gray-64

.offer-received
  width: 195px
  background: $color-blue-27
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5

.offer-sent
  width: 195px
  background: $color-yellow-5
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5

.trade-listing-item-single
  width: 514px
  height: 340px
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 10px

.trade-id
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-bold
  color: $color-blue-1

.new-offers
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-14-normal
  letter-spacing: 0.05em
  color: $color-red-18

.listed-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-gray-4

.inner-items-listed
  width: 418px
  height: 217px
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.inner-heading-listing
  background: $color-gray-1
  border-radius: 9px 9px 0 0
  font-family: $font-family-montserrat
  font-style: normal
  @include body-3-bold
  color: $color-black-1

.inner-item-image
  width: 58px
  height: auto

.inner-item-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-12-normal
  color: $color-gray-5
</style>
