<template>
  <div class="d-block">
    <div
      v-for="(offer) in offers"
      :key="'offer-' + offer.id"
      class="mb-4"
    >
      <div class="desktop-offer d-none d-lg-block">
        <div class="d-flex justify-content-between">
          <div class="offer-id">
            {{ $t('trades.offer_id') }} {{ $t('common.thread') }} #{{ offer.id }}
          </div>
          <div
            v-if="new Date(offer.offer_expiry).getTime() > Date.now()"
            class="offer-type d-flex justify-content-center align-items-center"
          >
            <img
              v-if="offer.offer_type === OFFER_SENT"
              :src="require('~/assets/img/trades/SentType.svg')"
              class="mr-2"
            >
            <img
              v-else-if="offer.offer_type === OFFER_RECEIVED"
              :src="require('~/assets/img/trades/ReceivedType.svg')"
              class="mr-2"
            >
            {{ $t(offer.offer_type_translation )}}
          </div>
          <div
            v-else
            class="expired-label d-flex align-items-center justify-content-center"
          >
            {{ $t('bids.expired') }}
          </div>
        </div>
        <div class="d-flex mt-1">
          <div class="w-62 px-0 d-flex justify-content-between align-items-center">
            <div class="offer-time pr-2">
              {{ $t('trades.received_on')}} {{ offer.created_at | formatDateTimeString }}
            </div>
            <div
              v-if="offer.cash_added"
              class="offer-on-top d-flex align-items-center"
            >
              <span class="dollar-sign">$</span>
              {{ $t('common.they_added') }}
              <span class="dollar-count mx-1">${{ offer.cash_added/100 }}</span> {{ $t('common.on_top') }}  <img class="ml-1" src="~/assets/img/info-offer.svg" />
            </div>
          </div>
          <div
            v-if="offer.deleted_at === null"
            class="w-38 px-0 view-details d-flex align-items-center justify-content-end"
            role="button"
            @click="showOffer(offer)"
          >
            {{ $t('vendor_purchase.view_details') }}
          </div>
        </div>

        <div class="mt-4 d-flex">
          <div class="w-45 items-section">
            <div class="text-center owner-name-desktop">
              {{ $t('vendor_purchase.theirs') }}
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div
                v-for="(theirItems) in offer.theirs_items"
                :key="'offer-item-'+ theirItems.id"
                class="col-4 text-left mx-auto"
              >
                <div class="image-wrapper">
                  <img class="pro-image" :src="theirItems.inventory.product | getProductImageUrl"/>
                  <div class="overlay"></div>
                </div>
                <div class="product-name">
                  {{ theirItems.inventory.product.name }}
                </div>
                <div class="mt-1 product-box">
                  {{ $t('sell.inventory.box') }}:
                  {{ theirItems.inventory.packaging_condition.name }}
                </div>
                <div class="mt-1 product-size">
                  {{ $t('home_page.size') }} {{ theirItems.inventory.size.size }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-10 text-break d-flex flex-column align-items-center justify-content-center">
            <div class="trade-icon-text mb-2 px-1">{{ $t(`common.${offer.condition}`) }}</div>
            <img width="45" height="45" :src="require('~/assets/img/trade-center.svg')" />
          </div>
          <div class="w-45 items-section">
            <div class="text-center owner-name-desktop">
              {{ $t('vendor_purchase.yours') }}
            </div>

            <div class="d-flex flex-wrap justify-content-between">
              <div
                v-for="(yoursItems) in offer.yours_items"
                :key="'offer-item-'+ yoursItems.id"
                class="col-4 text-left mx-auto"
              >
                <div class="image-wrapper">
                  <img class="pro-image" :src="yoursItems.inventory.product | getProductImageUrl"/>
                  <div class="overlay"></div>
                </div>

                <div class="product-name">
                  {{ yoursItems.inventory.product.name }}
                </div>
                <div class="mt-1 product-box">
                  {{ $t('sell.inventory.box') }}:
                  {{ yoursItems.inventory.packaging_condition.name }}
                </div>
                <div class="mt-1 product-size">
                  {{ $t('home_page.size') }} {{ yoursItems.inventory.size.size }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="new Date(offer.offer_expiry).getTime() > Date.now()"
          class="mt-4 d-flex justify-content-center"
        >
          <Button
            variant="dark-blue"
            class="mr-3 buttons-for-offers p-0"
            @click="$router.push(`/profile/trades/dashboard/${offer.id}`)"
          >
            {{ $t('common.accept_trade') }}
          </Button>

          <div
            class="decline-button d-flex justify-content-center align-items-center mr-3 buttons-for-offers"
            role="button"
            @click="$bvModal.show('declineOffer')"
          >
            {{ $t('common.decline') }}
          </div>

          <Button
            variant="outline-dark-blue buttons-for-offers p-0"
            @click="$router.push(`/profile/trades/dashboard/counter-offer/${offer.id}`)"
          >
            {{ $t('trades.counter_offer') }}
          </Button>
        </div>
        <Button
          v-else-if="offer.latest_offer && offer.latest_offer.status === 'Declined'"
          class="mt-4"
          variant="outline-warning"
        >
          {{ $t('common.rescind') }}
        </Button>

      </div>
      <div class="mobile-offer d-lg-none">
        <div class="d-flex justify-content-between align-items-center">
          <div
            class="offer-id"
            @click="showOffer(offer)"
          >
            {{$t('trades.offer_id')}} #{{offer.id}}
          </div>

          <div
            v-if="new Date(offer.offer_expiry).getTime() > Date.now()"
            class="d-flex align-items-center"
          >
            <img
              v-if="offer.offer_type === 'sent'"
              :src="require('~/assets/img/trades/SentType.svg')"
              alt=""
            />
            <img
              v-else
              :src="require('~/assets/img/trades/ReceivedType.svg')"
              alt=""
            />
            <div class="ml-1 offer-type">{{ $t(`trades.offer_type.${offer.offer_type}`) }}</div>
          </div>
          <div
            v-else
            class="expired-label d-flex align-items-center justify-content-center"
          >
            {{ $t('bids.expired') }}
          </div>

        </div>
        <div class="d-flex justify-content-between align-items-center">
          <div class="offer-time text-left mt-2">
            {{ $t('trades.sent_on')}} {{ offer.created_at | formatDateTimeString }}
          </div>
          <div v-if="action && selected.find(s => s === offer.id) && !offer.deleted_at">
            <div
              class="circle-full mr-3"
              @click="$emit('select', offer.id)"
            >
              <img
                :src="require('~/assets/img/trades/Tick.svg')"
                alt=""
              />
            </div>
          </div>
          <div
            v-else-if="action && !selected.find(s => s === s.id) && !offer.deleted_at"
            class="circle-blue mr-3"
            @click="$emit('select', offer.id)"
          >
          </div>
        </div>
        <div class="mt-2 d-flex justify-content-between">
          <div class="owner-name">
            {{ $t('vendor_purchase.theirs') }}
          </div>
          <div class="owner-name">
            {{ $t('vendor_purchase.yours') }}
          </div>
        </div>
        <div class="d-flex justify-content-between">
          <div class="col-5 d-flex flex-column justify-content-center">
            <div
              v-for="(theirItems) in offer.theirs_items"
              :key="'mobile-offer-item-'+ theirItems.id"
              class="px-0 text-left"
            >
              <img
                width="99"
                :src="theirItems.inventory.product | getProductImageUrl"
                class="h-auto"
              >
              <div class="mobile-product-name">
                {{ theirItems.inventory.product.name }}
              </div>
              <div class="mt-1 mobile-description">
                <div>
                  {{ theirItems.inventory.product.colorway | truncate(10, '...') }}, {{ $t('home_page.size') }} {{ theirItems.inventory.size.size }}
                </div>
                {{ $t('sell.inventory.box') }}:
                {{ theirItems.inventory.packaging_condition.name }}
              </div>
            </div>
          </div>
          <div class="col-2 relative-right-10 d-flex flex-column align-items-center justify-content-center">
            <div class="trade-icon-text mb-2">{{ $t(`common.${offer.condition}`) }}</div>
            <img width="31" height="31" :src="require('~/assets/img/icons/trade-icon.svg')" />
          </div>
          <div class="col-4 px-0 d-flex flex-column justify-content-center">
            <div
              v-for="(yoursItems) in offer.yours_items"
              :key="'mobile-offer-item-'+ yoursItems.id"
              class="px-0 text-left d-flex flex-column"
            >
              <img
                width="99"
                :src="yoursItems.inventory.product | getProductImageUrl"
                class="h-auto mx-auto"
              >
              <div class="mobile-product-name">
                {{ yoursItems.inventory.product.name }}
              </div>
              <div class="mt-1 mobile-description">
                <div>
                  {{ yoursItems.inventory.product.colorway | truncate(10, '...') }}, {{ $t('home_page.size') }} {{ yoursItems.inventory.size.size }}
                </div>
                {{ $t('sell.inventory.box') }}:
                {{ yoursItems.inventory.packaging_condition.name }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeclineModel
        v-if="offer"
        :offer="offer"
        @decline="(blockUser) => { declineOffer(offer, blockUser) }"
      />
    </div>

    <b-modal id="order-success-modal" hide-footer hide-header size="md">
      <div class="text-right">
        <close-icon role="button" class="close-icon" @click="$bvModal.hide('order-success-modal')"></close-icon>
      </div>
      <div class="text-center w-75 mx-auto my-2">
        <div class="success-text">{{ $t('trades.offer_accepted_successfully') }}</div>
        <div class="d-flex align-items-center justify-content-center mx-auto mt-3 checkmark-icon">
          <CheckmarkIcon />
        </div>
      </div>
    </b-modal>

    <infinite-loading
      class="d-sm-none"
      :identifier="infiniteId"
      @infinite="($state) => { $emit('loadMore', $state, page + 1) }"
    />
  </div>
</template>

<script>

import {
  OFFER_SENT,
  OFFER_RECEIVED
} from '~/static/constants/trades'
import Button from '~/components/common/Button'
import DeclineModel from '~/pages/profile/trades/dashboard/DeclineModel'

export default {
  name: 'TradeOfferItems',

  components: {
    Button,
    DeclineModel
  },

  props: {
    offers: {
      type: Array,
      required: true,
    },
    action: {
      type: String,
      default: ''
    },
    selected: {
      type: Array,
      default: () => []
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      OFFER_SENT,
      OFFER_RECEIVED,
      infiniteId: +new Date(),
    }
  },
  methods: {
    declineOffer(offer, blockUser) {
      this.$axios.put(`/trades/${offer.id}/decline-offer`, {
        offer_id: offer.id,
        block_user: (blockUser) ? 1 : 0
      })
      .catch((error) => {
        this.$toasted.error(this.$t(error.response.data.error))
      })
    },

    showOffer(offer){
      if(offer.deleted_at === null){
        this.$router.push('/profile/trades/dashboard/' + offer.id)
      }
      return false
    },
    showOfferId(val){
      if(val?.latest_offer !== null){
        return val.latest_offer.id
      }
      else{ return val.id}
    },

    handleLoading() {
      this.infiniteId++
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.expired-label
  @include body-5-medium
  color: $color-white-1
  background: $color-red-24
  height: 31px
  width: 100px

.decline-button
  @include body-8-medium
  background: $color-white-29
  color: $color-blue-32
  height: 38px
  border-radius: .25rem
  padding: 0px 30px

.w-62
  width: 62%

.w-38
  width: 38%

.w-45
  width: 45%

.w-10
  width: 10%

.product-name, .product-box, .product-size
  @include body-10-medium
  color: $color-black-1
  font-family: $font-family-sf-pro-display

.product-box
  color: $color-gray-5
  font-weight: $regular

.product-size
  @include body-9

.owner-name-desktop
  @include body-3-bold
  color: $color-black-1

.items-section
  border: 1px solid $color-gray-th-44
  border-radius: 4px
  height: 272px
  width: 451px
  padding: 20px 11px 8px 11px

.view-details
  @include body-4-normal
  color: $color-blue-20
  text-decoration: underline

.offer-on-top
  @include body-5-regular
  background: $color-gray-1
  border-radius: 4px
  padding-left: 20px
  padding-right: 52px
  color: $color-black-1
  font-family: $font-family-sf-pro-display
  height: 33px

.dollar-count
  @include body-5-medium

.dollar-sign
  @include body-2-bold
  margin-right: 20px
  font-weight: $normal !important

.desktop-offer
  background: $color-white-1
  padding: 27px 20px
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  width: 1050px
  height: 466px

.circle-full, .circle-blue
  width: 19px
  height: 19px
  border: 1px solid $color-blue-20
  border-radius: 25px

.circle-full
  display: flex
  align-items: center
  justify-content: center
  background: $color-blue-20

.relative-right-10
  position: relative
  right: 10px

.trade-icon-text
  @include body-3-bold
  color: $color-black-1
  font-family: $font-family-sf-pro-display

.w-77
  width: 77%

.mobile-description
  @include body-6-normal
  line-height: 14px
  font-family: $font-family-sf-pro-display
  color: $color-gray-5

.mobile-product-name
  @include body-6-medium
  font-family: $font-family-sf-pro-display
  color: $color-black-1

.owner-name
  @include body-5-medium
  color: $color-black-1
  width: 99px
  font-family: $font-family-sf-pro-display
  background: $color-gray-1
  height: 23px
  display: flex
  justify-content: center
  align-items: center

.offer-type
  @include body-18
  color: $color-black-1
  @media (min-width: 576px)
    @include body-4-normal
    color: $color-gray-5

.mobile-offer
  box-shadow: 0px 4px 4px $drop-shadow1
  padding: 13px 14px 20px 14px
  border-radius: 6px
  background: $color-white-1
  @media (min-width: 576px)
    width: 75%
    margin-left: auto
    margin-right: auto

#flyer-excellent
  height: 30.36px
  background: $color-green-21
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px
  @media (min-width: 1200px)
    width: 145px


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
  height: 30.36px
  background: $color-yellow-7
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px
  @media (min-width: 1200px)
    width: 145px

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
  height: 30.36px
  background: $color-red-16
  border-radius: 0 4px 4px 0
  margin-left: -6px
  margin-top: 15px
  padding-left: -6px
  color: $color-white-1
  font-family: $font-family-sf-pro-display
  padding-top: 3px
  @media (min-width: 1200px)
    width: 145px

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
  @include body-4-bold
  color: $color-blue-1
  font-family: $font-family-sf-pro-display
  @media (min-width: 768px)
    @include body-3-bold
    font-style: normal
    color: $color-black-1

.offer-time
  @include body-9-normal
  color: $color-gray-47
  font-family: $font-family-sf-pro-display
  @media (min-width: 576px)
    @include body-4-normal
    text-align: left
    font-style: normal
    color: $color-gray-64

.offer-received
  background: $color-blue-27
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5
  @media (min-width: 1200px)
    width: 195px

.offer-sent
  background: $color-yellow-5
  border-radius: 0 9px
  font-family: $font-family-montserrat
  font-style: normal
  @include body-4-normal
  color: $color-gray-5
  @media (min-width: 1200px)
    width: 195px

.trade-listing-item-single
  height: 340px
  filter: drop-shadow(0px 1px 4px $drop-shadow1)
  background: $color-white-1
  border-radius: 10px
  @media (min-width: 1200px)
    width: 514px


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
  @media (min-width: 1200px)
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
.image-wrapper
  position: relative
.image-wrapper
  .overlay
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: $color-grey-70
.pro-image
  width: 130px
.buttons-for-offers
  width: 139px
  height: 39px
</style>
