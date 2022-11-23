<template>
  <div>
    <div v-if="isResponsive" class="responsive-div">
      <b-row v-if="offer !== null">
        <b-col :md="isPayment ? 9 : 12">
          <div class="">
            <div class="d-flex">
              <div class="left-side-image ml-2 mt-2" :class="{'left-item-margin':lastSubmittedOffer.theirs_items.length === ONE_ITEM && lastSubmittedOffer.yours_items.length}">
                <div class="item-head-trade-hub-mobile">{{ $t('trades.trade_arena.theirs') }}</div>
                <div v-for="(item) in lastSubmittedOffer.theirs_items"
                     :key="item.id" class="mb-4 ml-1 mt-2">
                  <div class="p-2 image-small-size position-relative">
                    <img class="item-image-small" :src="item.inventory.product | getProductImageUrl"
                         :class="{'item-image-cond-small'
                       :(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }"/>
                    <div class="overlay-mob"></div>
                  </div>

                  <div class="item-caption-small">
                    <span class="item-name-small">{{ item.inventory.product.name }}</span>
                    <span
                      class="item-box-condition-small">{{$tc('common.box')}}: {{ item.inventory.packaging_condition.name }}</span>
                    <span class="item-caption-description">{{ item.inventory.product.colorway }},{{$tc('common.size')}}{{ item.inventory.size.size }}</span>
                  </div>
                </div>
              </div>


              <div class="center-item-small">
                <div v-if="lastSubmittedOffer.theirs_items.length === TWO_ITEMS" class="pointer-left-small-two"></div>
                <div v-if="lastSubmittedOffer.theirs_items.length === THREE_ITEMS" class="pointer-left-small-three"></div>
                <img v-if="lastSubmittedOffer.theirs_items.length === ONE_ITEM" :src="require('~/assets/img/tradecenter.svg')" class="middle-trade-one"/>
                <img v-if="lastSubmittedOffer.theirs_items.length === TWO_ITEMS" :src="require('~/assets/img/tradecenter.svg')" class="middle-trade-two mr-2"/>
                <img  v-if="lastSubmittedOffer.theirs_items.length === THREE_ITEMS" :src="require('~/assets/img/tradecenter.svg')" class="middle-trade-three mr-2"/>
                <div v-if="lastSubmittedOffer.theirs_items.length === TWO_ITEMS" class="pointer-right-small-two"></div>
                <div v-if="lastSubmittedOffer.theirs_items.length === THREE_ITEMS" class="pointer-right-small-three"></div>
              </div>

              <div class="right-side-image mt-2"
                   :class="{'right-item-margin':lastSubmittedOffer.theirs_items.length > ONE_ITEM &&
                    lastSubmittedOffer.yours_items.length === 0,'mt-10p': lastSubmittedOffer.theirs_items.length > ONE_ITEM &&
                    lastSubmittedOffer.yours_items.length === ONE_ITEM,'mt-8p': lastSubmittedOffer.theirs_items.length === ONE_ITEM
                    && lastSubmittedOffer.yours_items.length === ONE_ITEM}">
                <div class="item-head-trade-hub-mobile">{{ $t('trades.trade_arena.yours') }}</div>
                <div v-if="lastSubmittedOffer.yours_items.length" >
                  <div v-for="(item) in lastSubmittedOffer.yours_items"
                   :key="item.id" class="mb-4 mt-2">
                    <div class="p-2 image-small-size position-relative">
                      <img class="item-image-small" :src="item.inventory.product | getProductImageUrl" alt="image"
                           :class="{'item-image-cond-small':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }" />
                      <div class="overlay-mob"></div>
                    </div>
                    <div class="item-caption-small">
                      <span class="item-name-small">{{ item.inventory.product.name }}</span>
                      <span class="item-caption-description-small">{{ item.inventory.product.colorway }},{{$tc('common.size')}}{{ item.inventory.size.size }}</span>
                      <span
                        class="item-box-condition-small">{{$tc('common.box')}}: {{ item.inventory.packaging_condition.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!isAcceptedOffer()" class="d-flex flex-column align-items-center mb-4">
              <div v-if="!lastSubmittedOffer.is_blocked" class="d-flex mt-4 mb-4">
                <b-btn v-if="!isOfferMine()" class="btn-decline mr-1"
                       @click="$bvModal.show('declineOffer')">{{ $t('trades.decline') }}
                </b-btn>
                <b-btn v-if="!isOfferMine()"  class="btn-accept mr-1" @click="acceptOffer()">
                  {{ $t('trades.accept') }}</b-btn>
                <b-btn v-if="!isOfferMine()" class="btn-counter"   @click="$router.push('/profile/trades/dashboard/counter-offer/' + offer.id)">
                  {{ $t('trades.counter_offer') }}
                </b-btn>
              </div>
              <div v-else class="trade-hub-buttons mt-4 mb-4">
                <b-btn class="btn-declined">
                  {{ $t('trades.declined') }}
                </b-btn>
              </div>
              <div class="fair-trade-division-mobile d-flex justify-content-center flex-column align-items-center">
                <Meter :highest="getTheirTotal(false)"
                       :lowest="0"
                       :value="getYourTotal(false)"
                       :fair="getFairTradeValue()"
                       heading="trades.trade_arena.fair_trade_meter"
                />
              </div>
            </div>
          </div>
          <b-row class="ml-54 history-heading">{{ $t('trades.offer_history') }}</b-row>
          <div>
            <offer-history :offerHistory="offer" />
          </div>
          <b-row class="justify-content-center pt-3 pb-3">
            <hr class="center-line">
          </b-row>
          <b-row class="ml-3 mr-3 mb-4 mt-4">
            <initial-listing :initialWantsItems="offer.trade.wants" />
          </b-row>
        </b-col>
        <CheckoutSidebar v-if="isPayment" class="order-summary" />
      </b-row>
      <DeclineModel v-if="lastSubmittedOffer" :offer="lastSubmittedOffer"
                    @decline="declineOffer" @close="closeDeclineModal" />
    </div>
    <div v-else class="">
      <b-row v-if="offer !== null">
        <b-col class="main-content" :md="isPayment ? 9 : 12">
          <div class="d-flex justify-content-between">
            <div class="col px-0 offer-id-head">{{ $t('trades.offer_summary') }}</div>
            <div class="">
              <div class="d-flex align-items-center justify-content-between">
                <div class="offer-id-sm">{{ $t('trades.offer_id') }} #{{lastSubmittedOffer.id}}</div>
                <div class="offer-type px-3">
                  <img
                    v-if="lastSubmittedOffer.offer_type === 'sent'"
                    :src="require('~/assets/img/trades/SentType.svg')"
                  >
                  <img
                    v-else-if="lastSubmittedOffer.offer_type === 'received'"
                    :src="require('~/assets/img/trades/ReceivedType.svg')"
                  >
                  {{ $t(lastSubmittedOffer.offer_type_translation )}}
                </div>
              </div>
              <div class="mt-2 placed-time">{{ $t('trades.placed_on') }} {{ lastSubmittedOffer.created_at | formatDateTimeString }}</div>
              <div v-if="!isAcceptedOffer()" class="mt-2 placed-time">{{ $t('trades.expires_on') }} {{ lastSubmittedOffer.offer_expiry | formatDateTimeString }}</div>
            </div>
          </div>
          <div class="current-trade">{{ $t('common.current_trade') }}</div>
          <div class="offer-card">
            <div
              class="d-flex flex-column px-3 px-lg-0"
            >
              <div class="d-flex justify-content-between col-12 col-md-8 mb-2 mx-auto">
                <div class="value">
                  {{ $t('common.their_value') }}
                  <span class="ml-1 price">{{ getTheirTotal() }}</span>
                </div>
                <div class="value">
                  {{ $t('common.your_value') }}
                  <span class="ml-1 price">{{ getYourTotal() }}</span>
                </div>
              </div>
              <div
                class="center-container d-flex mx-0 mx-md-auto justify-content-between align-items-center col-md-8 col-xl-12"
                :class="{'center-cont-height':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }"
              >
                <div class="left-item">
                  <div v-for="(item, index) in lastSubmittedOffer.theirs_items" :id="lastSubmittedOffer.theirs_items.length === THREE_ITEMS ?'trade-item-'+index : ''"
                      :key="item.id" class="item"
                      :class="[((lastSubmittedOffer.theirs_items.length > ONE_ITEM )|| (lastSubmittedOffer.yours_items.length)) ? 'item-length' : 'item-normal']">
                    <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" />
                    <div class="item-caption">
                      <span class="item-name">{{ item.inventory.product.name }}</span>
                      <div class="mt-1 item-caption-description d-flex">
                        <div class="item-color text-truncate">
                          {{ item.inventory.product.colorway }}
                        </div>
                        <div>, {{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</div>
                      </div>
                      <span class="mt-1 item-caption-description">
                        {{ $t('trades.trade_arena.box') }}:
                        {{ item.inventory.packaging_condition.name }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="center-item">
                  <div v-if="lastSubmittedOffer.theirs_items.length > ONE_ITEM" class="pointer-left"></div>
                  <div class="long-line" :class="{'w-xl-100' : lastSubmittedOffer.theirs_items.length === ONE_ITEM }"></div>
                  <img :src="require('~/assets/img/trades/Trade.svg')" />
                  <div class="long-line" :class="{'w-xl-100' : lastSubmittedOffer.yours_items.length === ONE_ITEM }"></div>
                  <div v-if="lastSubmittedOffer.yours_items.length > ONE_ITEM" class="pointer-right"></div>
                </div>
                <div class="right-item">
                  <div v-if="lastSubmittedOffer.yours_items.length" >
                    <div v-for="(item, index) in lastSubmittedOffer.yours_items"
                        :id="lastSubmittedOffer.yours_items.length > TWO_ITEMS ?'your-trade-item-'+index : 'your-item'" :key="item.id"
                        class="item-length">
                      <img class="img-fluid" :src="item.inventory.product | getProductImageUrl" alt="image" />
                      <div class="item-caption">
                        <span class="item-name">{{ item.inventory.product.name }}</span>
                        <div class="mt-1 item-caption-description d-flex">
                          <div class="item-color text-truncate">
                            {{ item.inventory.product.colorway }}
                          </div>
                          <div>, {{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</div>
                        </div>
                        <span class="mt-1 item-caption-description">
                          {{ $t('trades.trade_arena.box') }}:
                          {{ item.inventory.packaging_condition.name }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!isAcceptedOffer()" class="d-flex flex-column align-items-center">
              <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
                <Meter :highest="getTheirTotal(false)"
                       :lowest="0"
                       :value="getYourTotal(false)"
                       :fair="getFairTradeValue()"
                       heading="common.fair_trade_meter"
                       headingClass="my-header"
                />
              </div>
              <div v-if="!lastSubmittedOffer.is_blocked" class="trade-hub-buttons mt-4 mb-4">
                <Button v-if="!isOfferMine()" variant="dark-blue" class="mr-3" @click="acceptOffer()">{{ $t('common.accept_trade') }}</Button>
                <Button v-if="!isOfferMine()" variant="light" class="mr-3 text-blue-32" @click="$bvModal.show('declineOffer')">{{ $t('trades.decline') }}
                </Button>
                <Button v-if="!isOfferMine()" variant="outline-dark-blue" @click="$router.push('/profile/trades/dashboard/counter-offer/' + offer.id)">
                  {{ $t('trades.counter_offer') }}
                </Button>
              </div>
              <div v-else class="trade-hub-buttons mt-4 mb-4">
                <Button variant="outline-danger">
                  {{ $t('trades.declined') }}
                </Button>
              </div>

            </div>
          </div>
          <div class="history-heading">{{ $t('trades.offer_history') }}</div>
          <div class="col-12 col-lg-10 col-xl-7 d-flex px-0 m-0">
            <offer-history class="w-100" :offerHistory="offer" offerHistoryClass="ml-0" />
          </div>
          <b-row class="justify-content-center pt-3 pb-3">
            <hr class="center-line">
          </b-row>
          <initial-listing :initialWantsItems="offer.trade.wants" />
        </b-col>
        <CheckoutSidebar v-if="isPayment" class="order-summary" />
      </b-row>
      <DeclineModel v-if="lastSubmittedOffer" :offer="lastSubmittedOffer"
                    @decline="declineOffer" @close="closeDeclineModal" />
    </div>
  </div>
</template>

<script>
import Meter from '~/components/common/Meter'
import Button from '~/components/common/Button'
import OfferHistory from '~/pages/profile/trades/dashboard/OfferHistory'
import InitialListing from '~/pages/profile/trades/dashboard/InitialListing'
import DeclineModel from '~/pages/profile/trades/dashboard/DeclineModel'
import CheckoutSidebar from '~/components/checkout/trades/ShoppingCartOrder'
import screenSize from '~/plugins/mixins/screenSize'
import {
  ONE_ITEM,
  TWO_ITEMS,
  THREE_ITEMS,
  CASH_TYPE_ADDED,
  CASH_TYPE_REQUESTED,
  DEFAULT_FAIR_TRADE_VALUE,
  ACCEPTED_OFFER,
  OFFER_TYPE_YOURS,
  ACCEPT_OFFER, FILTER_OFFER_STATUS_DECLINED,
} from '~/static/constants/trades'

export default {
  name: 'AcceptOffer',
  components: {
    DeclineModel,
    InitialListing,
    OfferHistory,
    Button,
    Meter,
    CheckoutSidebar
  },
  mixins: [ screenSize ],
  layout: 'Profile',
  data() {
    return {
      width:'',
      offer: null,
      tradeId: 0,
      ONE_ITEM,
      THREE_ITEMS,
      TWO_ITEMS,
      lastSubmittedOffer: null,
      fairTradePercentage: (DEFAULT_FAIR_TRADE_VALUE / 100).toFixed(2), // converting to percentage
      CASH_TYPE_ADDED,
      CASH_TYPE_REQUESTED,
      DEFAULT_FAIR_TRADE_VALUE,
      isPayment: false,
      ACCEPTED_OFFER,
      ACCEPT_OFFER,
      OFFER_TYPE_YOURS,
      FILTER_OFFER_STATUS_DECLINED
    }
  },
  computed:{
    isResponsive() {
      return this.isScreenXS || this.isScreenSM
    }
  },
  mounted(){
    this.$root.$on('trade_done', (val)=>{ // this emit is used to complete trade and show result
      if(val)
        this.$router.push('/profile/trades/dashboard')
    })

    document.querySelector('.main-wrapper').style.backgroundColor = '#F7F7F7'

    this.fetchOfferDetails()
    this.width = window.innerWidth
  },
  methods: {
    isAcceptedOffer(){
      return (this.lastSubmittedOffer.status === ACCEPTED_OFFER)
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
    getFairTradeValue(){
      return (this.getTheirTotal(false) * this.fairTradePercentage)
    },
    declineOffer(blockUser){
      this.$axios.put(`/trades/${this.lastSubmittedOffer.trade_id}/decline-offer`, {
          offer_id: this.lastSubmittedOffer.id,
          block_user: (blockUser) ? 1 : 0
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
    closeDeclineModal(updated){
      if(updated){
        this.$router.push('/profile/trades/dashboard/alloffers')
      }
    },
    getTheirTotal(formattedPrice = true){
      let cashAdded = 0
      if(this.lastSubmittedOffer.cash_added &&
        (((this.isOfferMine() &&
        this.isCashTypeRequested())) ||
        (!this.isOfferMine() &&
        this.isCashTypeAdded())))
      {
          cashAdded = (this.lastSubmittedOffer.cash_added/100)
      }
      const totalPrice = this.lastSubmittedOffer.theirs_items.map((inventoryItem) => inventoryItem.inventory.sale_price)
      if(totalPrice.length) {
        return  (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + cashAdded).toFixed(2) : ((totalPrice.reduce((a, b) => a + b, 0)/100) + cashAdded)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(cashAdded)) : cashAdded * 100
    },
    getYourTotal(formattedPrice = true){
      let cashAdded = 0
      if(this.lastSubmittedOffer.cash_added &&
        (((!this.isOfferMine() &&
        this.isCashTypeRequested())) ||
        ((this.isOfferMine() &&
        this.isCashTypeAdded()))))
      {
          cashAdded = (this.lastSubmittedOffer.cash_added/100)
      }
      const totalPrice = this.lastSubmittedOffer.yours_items.map((inventoryItem) => inventoryItem.inventory.sale_price)
      if(totalPrice.length) {
        return  (formattedPrice) ?
          '$' + ((totalPrice.reduce((a, b) => a + b, 0)/100) + cashAdded).toFixed(2) : ((totalPrice.reduce((a, b) => a + b, 0)/100) + cashAdded)
      }
      return (formattedPrice) ? '$' + (parseFloat('0.00') +  parseFloat(cashAdded)) : cashAdded * 100
    },
    isCashTypeRequested(){
        return this.lastSubmittedOffer.cash_type === CASH_TYPE_REQUESTED
    },
    isCashTypeAdded(){
        return this.lastSubmittedOffer.cash_type === CASH_TYPE_ADDED
    },
    isOfferMine() {
      return this.lastSubmittedOffer.sent_by_id === this.$auth.user.vendor.id
    },
    fetchOfferDetails() {
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

  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.item-color
  max-width: 140px

.w-xl-100
  @media (min-width: 1200px)
    width: 100%

.value
  @include body-8-normal
  color: $color-gray-5
  text-transform: uppercase

.price
  @include body-8-medium
  color: $color-black-1

.current-trade
  @include body-7-bold
  font-family: $font-family-sf-pro-display
  color: $color-black-1

.main-content
  padding: 50px 20px
  @media (min-width: 768px)
    padding: 50px 62px

.center-container
  @media (min-width: 1200px)
    padding-left: 30px
    padding-right: 30px
  @media (min-width: 1400px)
    padding-left: 127px
    padding-right: 127px

.item-head-trade-hub
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 17px
  color: $color-black-1
  margin-bottom: 10px
  height: 35px
  padding-top: 15px
.item-head-trade-hub-mobile
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 14px
  color: $color-black-1
  height: 23px
  background: $color-gray-1
  width: 99px
  text-align: center
.fair-trade-division-mobile
  background-color: $color-white-4
  width: 247px
  height: 68px

#trade-item-0
  @media (min-width: 1200px)
    position: absolute
    margin-left: 115%
    margin-top: 110px

#your-trade-item-0
  @media (min-width: 1200px)
    position: absolute
    margin-top: 110px
    margin-left: -115%

.mt-10p
  margin-top: 10%

.mt-8p
  margin-top: 8%

.left-item-margin
  padding-left: 4%

.view-trade-btn
  border: 1px solid $color-blue-1
  border-radius: 41px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-medium
  color: $color-blue-1
  width: 157px
  height: 38px
  background: $color-white-1

.dismiss-btn
  width: 139px
  height: 38px
  border: 1px solid $color-red-3
  border-radius: 41px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-medium
  color: $color-red-3
  background: $color-white-1

.offer-card
  margin-top: 30px
  padding-top: 66px
  background: $color-white-1
  box-shadow: 0 1px 4px $drop-shadow1
  border-radius: 10px

.offer-id-head
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-16-bold
  letter-spacing: -0.02em
  text-transform: capitalize
  color: $color-black-1

.offer-sum-text
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1
  padding-top: 15px

.ml-54
  margin-left: 54px

.placed-time
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-13-normal
  color: $color-black-1

.offer-id-sm
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-2-bold
  color: $color-black-1

.offer-type
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5

.history-heading
  @include body-15-bold
  font-family: $font-family-sf-pro-display
  font-style: normal
  margin-top: 77px
  margin-bottom: 30px
  color: $color-black-1

.center-line
  width: 83%
  border: 1px solid $color-gray-98

.order-summary
  padding: 0
.btn-accept
  border-radius: 8px
  background: $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-white-1
.btn-decline
  border-radius: 8px
  background: $color-white-5
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-blue-32
  border: 1px solid $color-white-5
.btn-counter
  border-radius: 8px
  border: 1px solid $color-blue-20
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $medium
  font-size: 11px
  color: $color-blue-20
  background-color: $color-white-1
.fair-trade-division
  background-color: $color-white-4
  width: 247px
  height: 68px
.item-image-small
  width: 80px
  height: 100px

.item-image-cond-small
  width: 80px
  height: 100px
.pointer-left-small
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -2rem
.item-length-small
  height: 160px
  width: 100px
.item-normal-small
  height: 160px
  width: 100px
.item-name-small
  width: 90px
  height: 26px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-box-condition-small
  font-family: $font-family-montserrat
  font-style: normal
  width: 80px
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-caption-description-small
  font-family: $font-family-montserrat
  font-style: normal
  width: 80px
  @include body-6-medium
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.left-side-image
  height: 700px
.right-side-image
  height: 700px
  margin-right: 4rem

.center-item-small
  margin-left: -4rem
  display: flex
  justify-content: space-between
  align-items: center
  padding-top: 21px
  margin: 0 10px
  min-width: 100px
  max-width: 300px
.long-line-length-small
  width: 40px
  border: 1px solid $light-gray-2
.long-line-small
  width: 40px
  border: 1px solid $light-gray-2
.pointer-right-small
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 210px
  margin-top: -1rem !important
.item-caption-small
  width: 100px
  padding: 5px 10px
  font-family: $font-family-sf-pro-display
  font-style: normal

.item-caption
  background: $color-white-1

.image-small-size
  background: $color-gray-1
.responsive-div
  background: $color-white-1
.overlay-mob
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: $color-grey-70
.pointer-left-small-two
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -5rem
.pointer-left-small-three
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-right: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 8px
  margin-top: -10rem
.middle-trade-three
  margin-top: -10rem
.pointer-right-small-three
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-top: -10rem !important
.pointer-right-small-two
  border-top: 0.5px solid $light-gray-2
  border-bottom: 0.5px solid $light-gray-2
  border-left: 0.5px solid $light-gray-2
  height: 450px
  width: 100px
  margin-right: 210px
  margin-top: -5rem !important
</style>
