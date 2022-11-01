<template>
  <div>
    <div v-if="width <=500">
      <b-row v-if="offer !== null">
        <b-col :md="isPayment ? 9 : 12">
          <div class="">
            <div>
              <div class="amounts-input">
                <!-- TODO -->
                <input type="text" class="theirs" disabled :value="$t('trades.trade_arena.theirs') + `: ${getTheirTotal()}`">
                <input type="text" class="yours" disabled :value="$t('trades.trade_arena.yours') + `: ${getYourTotal()}`">
              </div>
            </div>
            <div class="d-flex">
              <div class="left-side-image" :class="{'left-item-margin':lastSubmittedOffer.theirs_items.length === ONE_ITEM && lastSubmittedOffer.yours_items.length}">
                <div class="item-head-trade-hub">{{ $t('trades.trade_arena.theirs') }}:</div>
                <div v-for="(item) in lastSubmittedOffer.theirs_items"
                     :key="item.id" class="mb-4 ml-1"
                     :class="[((lastSubmittedOffer.theirs_items.length > ONE_ITEM )|| (lastSubmittedOffer.yours_items.length)) ? 'item-length-small' : 'item-normal-small']">
                  <img class="item-image-small" :src="item.inventory.product | getProductImageUrl"
                       :class="{'item-image-cond-small':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }"/>
                  <div class="item-caption">
                    <span class="item-name-small">{{ item.inventory.product.name }}</span>
                    <span
                      class="item-box-condition-small">Box: {{ item.inventory.packaging_condition.name }}</span>
                    <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                    <span class="item-size">Size: {{ item.inventory.size.size }}</span>
                  </div>
                </div>
              </div>
              <div class="center-item">
                <div v-if="lastSubmittedOffer.theirs_items.length > ONE_ITEM" class="pointer-left-small"></div>
                <div class="long-line" :class="{'long-line-length' : lastSubmittedOffer.theirs_items.length === ONE_ITEM }"></div>
                <img :src="require('~/assets/img/tradecenter.svg')"/>
                <div class="long-line" :class="{'long-line-length' : lastSubmittedOffer.yours_items.length === ONE_ITEM }"></div>
                <div v-if="lastSubmittedOffer.yours_items.length > ONE_ITEM" class="pointer-right"></div>
              </div>
              <div class="right-side-image"
                   :class="{'right-item-margin':lastSubmittedOffer.theirs_items.length > ONE_ITEM &&
                    lastSubmittedOffer.yours_items.length === 0,'mt-10p': lastSubmittedOffer.theirs_items.length > ONE_ITEM &&
                    lastSubmittedOffer.yours_items.length === ONE_ITEM,'mt-8p': lastSubmittedOffer.theirs_items.length === ONE_ITEM
                    && lastSubmittedOffer.yours_items.length === ONE_ITEM}">
                <div class="item-head-trade-hub">{{ $t('trades.trade_arena.yours') }}:</div>
                <div v-if="lastSubmittedOffer.yours_items.length" >
                  <div v-for="(item) in lastSubmittedOffer.yours_items"
                   :key="item.id" class="mb-4">
                    <img class="item-image-small" :src="item.inventory.product | getProductImageUrl" alt="image"
                         :class="{'item-image-cond-small':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }" />
                    <div class="item-caption">
                      <span class="item-name-small">{{ item.inventory.product.name }}</span>
                      <span
                        class="item-box-condition-small">Box : {{ item.inventory.packaging_condition.name }}</span>
                      <span class="item-caption-description-small">{{ item.inventory.product.colorway }}</span>
                      <span class="item-size">Size : {{ item.inventory.size.size }}</span>
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
                <b-btn class="btn-counter" v-if="!isOfferMine()"   @click="$router.push('/profile/trades/dashboard/counter-offer/' + offer.id)">
                  {{ $t('trades.counter_offer') }}
                </b-btn>
              </div>
              <div v-else class="trade-hub-buttons mt-4 mb-4">
                <b-btn class="btn-declined">
                  {{ $t('trades.declined') }}
                </b-btn>
              </div>
              <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
                <Meter :highest="getTheirTotal(false)"
                       :lowest="0"
                       :value="getYourTotal(false)"
                       :fair="getFairTradeValue()"
                       :heading="false"
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
    <div v-else>
      <b-row v-if="offer !== null">
        <b-col :md="isPayment ? 9 : 12">
          <b-row class="justify-content-between ml-54 pt-4">
            <b-col>
              <div class="offer-id-head">{{ $t('trades.trade_id') }} #{{offer.trade_id}}</div>
              <div class="offer-sum-text">{{ $t('trades.offer_summary') }}</div>
            </b-col>
            <b-col class="text-right pr-5">
              <div class="d-flex justify-content-end">
                <div class="offer-id-sm">{{ $t('trades.offer_id') }} #{{lastSubmittedOffer.id}}</div>
                <div class="offer-type pl-3">{{ (isAcceptedOffer() ? $t('trades.accepted') : $t(lastSubmittedOffer.offer_type_translation)) }}</div>
              </div>
              <div class="placed-time">{{ $t('trades.placed_on') }} {{ lastSubmittedOffer.created_at | formatDateTimeString }}</div>
              <div v-if="!isAcceptedOffer()" class="placed-time">{{ $t('trades.expires_on') }} {{ lastSubmittedOffer.offer_expiry | formatDateTimeString }}</div>
            </b-col>
          </b-row>
          <div class="offer-card m-3">
            <div class="center-container d-flex justify-content-center"
                 :class="{'center-cont-height':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }">
              <div class="left-item" :class="{'left-item-margin':lastSubmittedOffer.theirs_items.length === ONE_ITEM && lastSubmittedOffer.yours_items.length}">
                <div class="item-head-trade-hub">{{ $t('trades.trade_arena.theirs') }}:</div>
                <div v-for="(item, index) in lastSubmittedOffer.theirs_items" :id="lastSubmittedOffer.theirs_items.length === THREE_ITEMS ?'trade-item-'+index : ''"
                     :key="item.id" class="item mb-4"
                     :class="[((lastSubmittedOffer.theirs_items.length > ONE_ITEM )|| (lastSubmittedOffer.yours_items.length)) ? 'item-length' : 'item-normal']">
                  <img class="item-image" :src="item.inventory.product | getProductImageUrl"
                       :class="{'item-image-cond':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }" width="131px"/>
                  <div class="item-caption">
                    <span class="item-name">{{ item.inventory.product.name }}</span>
                    <span
                      class="item-box-condition">{{ $t('trades.trade_arena.box_condition') }}: {{ item.inventory.packaging_condition.name }}</span>
                    <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                    <span class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                  </div>
                </div>
              </div>
              <div class="center-item">
                <div v-if="lastSubmittedOffer.theirs_items.length > ONE_ITEM" class="pointer-left"></div>
                <div class="long-line" :class="{'long-line-length' : lastSubmittedOffer.theirs_items.length === ONE_ITEM }"></div>
                <img :src="require('~/assets/img/trades/border.svg')"/>
                <div class="long-line" :class="{'long-line-length' : lastSubmittedOffer.yours_items.length === ONE_ITEM }"></div>
                <div v-if="lastSubmittedOffer.yours_items.length > ONE_ITEM" class="pointer-right"></div>
              </div>
              <div class="right-item"
                   :class="{'right-item-margin':lastSubmittedOffer.theirs_items.length > ONE_ITEM && lastSubmittedOffer.yours_items.length === 0,'mt-10p': lastSubmittedOffer.theirs_items.length > ONE_ITEM && lastSubmittedOffer.yours_items.length === ONE_ITEM,'mt-8p': lastSubmittedOffer.theirs_items.length === ONE_ITEM && lastSubmittedOffer.yours_items.length === ONE_ITEM}">
                <div class="item-head-trade-hub">{{ $t('trades.trade_arena.yours') }}:</div>
                <div v-if="lastSubmittedOffer.yours_items.length" >
                  <div v-for="(item, index) in lastSubmittedOffer.yours_items"
                       :id="lastSubmittedOffer.yours_items.length > TWO_ITEMS ?'your-trade-item-'+index : 'your-item'" :key="item.id"
                       class="preview item-length mb-4">
                    <img class="item-image" :src="item.inventory.product | getProductImageUrl" alt="image"
                         :class="{'item-image-cond':(lastSubmittedOffer.theirs_items.length > ONE_ITEM || lastSubmittedOffer.yours_items.length) }" width="131px"/>
                    <div class="item-caption">
                      <span class="item-name">{{ item.inventory.product.name }}</span>
                      <span
                        class="item-box-condition">{{ $t('trades.trade_arena.box_condition') }}: {{ item.inventory.packaging_condition.name }}</span>
                      <span class="item-caption-description">{{ item.inventory.product.colorway }}</span>
                      <span class="item-size">{{ $t('trades.trade_arena.size') }} {{ item.inventory.size.size }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="!isAcceptedOffer()" class="d-flex flex-column align-items-center mb-4">
              <div class="fair-trade-division d-flex justify-content-center flex-column align-items-center">
                <Meter :highest="getTheirTotal(false)"
                       :lowest="0"
                       :value="getYourTotal(false)"
                       :fair="getFairTradeValue()"
                       :heading="false"
                />
              </div>
              <div>
                <div class="amounts-input">
                  <!-- TODO -->
                  <input type="text" class="theirs" disabled :value="$t('trades.trade_arena.theirs') + `: ${getTheirTotal()}`">
                  <input type="text" class="yours" disabled :value="$t('trades.trade_arena.yours') + `: ${getYourTotal()}`">
                </div>
              </div>
              <div v-if="!lastSubmittedOffer.is_blocked" class="trade-hub-buttons mt-4 mb-4">
                <Button v-if="!isOfferMine()" variant="primary" class="mr-3" @click="acceptOffer()">{{ $t('trades.accept') }}</Button>
                <Button v-if="!isOfferMine()" variant="light" class="mr-3" @click="$bvModal.show('declineOffer')">{{ $t('trades.decline') }}
                </Button>
                <Button v-if="!isOfferMine()" variant="outline-primary"  @click="$router.push('/profile/trades/dashboard/counter-offer/' + offer.id)">
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
          <b-row class="ml-54 history-heading">{{ $t('trades.offer_history') }}</b-row>
          <b-row class="m-3">
            <offer-history :offerHistory="offer" />
          </b-row>
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

  </div>
</template>

<script>
import Meter from '~/components/common/Meter'
import Button from '~/components/common/Button'
import OfferHistory from '~/pages/profile/trades/dashboard/OfferHistory'
import InitialListing from '~/pages/profile/trades/dashboard/InitialListing'
import DeclineModel from '~/pages/profile/trades/dashboard/DeclineModel'
  import CheckoutSidebar from '~/components/checkout/trades/ShoppingCartOrder'
import {
  ONE_ITEM,
  TWO_ITEMS,
  THREE_ITEMS,
  CASH_TYPE_ADDED,
  CASH_TYPE_REQUESTED,
  DEFAULT_FAIR_TRADE_VALUE,
  ACCEPTED_OFFER,
  OFFER_TYPE_YOURS,
  ACCEPT_OFFER
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
      OFFER_TYPE_YOURS
    }
  },
  mounted(){
    this.$root.$on('trade_done', (val)=>{ // this emit is used to complete trade and show result
      if(val)
        this.$router.push('/profile/trades/dashboard')
    })

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

  },
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.center-container
  margin: 45px 2%

.item-head-trade-hub
  font-family: $font-family-sf-pro-display
  font-style: normal
  font-weight: $medium
  font-size: 17px
  color: $color-black-1
  margin-bottom: 10px
  height: 35px
  padding-top: 15px

#trade-item-0
  position: absolute
  margin-left: 115%
  margin-top: 107px

#your-trade-item-0
  position: absolute
  margin-top: 107px
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
  color: $color-blue-2

.history-heading
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-15-bold
  color: $color-black-1

.center-line
  width: 879px
  border: 1px solid $color-gray-65

.item
  border: 0.5px solid $light-gray-2

.order-summary
  padding: 0
.btn-accept
  border-radius: 8px
  background: #667799
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  font-size: 11px
  color: #FFFFFF
.btn-decline
  border-radius: 8px
  background: #F7F7F7
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  font-size: 11px
  color: #545F77
  border: 1px solid #F7F7F7
.btn-counter
  border-radius: 8px
  border: 1px solid #667799
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  font-size: 11px
  color: #667799
  background-color: #FFFFFF
.fair-trade-division
  background-color: #FAFAFA
  width: 247px
  height: 68px
.item-image-small
  width: 80px
  height: 100px
.item-image-cond-small
  width: 80px
  height: 100px
.pointer-left-small
  height: 160px
  width: 100px
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
  font-weight: $medium
  font-size: 11px
  line-height: 13px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-box-condition-small
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  width: 80px
  font-size: 11px
  line-height: 13px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.item-caption-description-small
  font-family: 'Montserrat'
  font-style: normal
  font-weight: 600
  width: 80px
  font-size: 11px
  line-height: 13px
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  display: block
.left-side-image
  height: 650px
.right-side-image
  height: 650px
.center-item
  margin-left: -4rem
</style>
