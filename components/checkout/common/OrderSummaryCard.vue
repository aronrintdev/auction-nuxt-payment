<template>
  <b-row class="summary-wrapper">
    <b-col cols="12" sm="12" md="12">
      <slot name="label"></slot>
      <b-card class="custom-card radius-3">
        <b-row
          v-for="(item) in getItems"
          :key="item.key"
          :class="{ 'd-none': item.hideWith0Value && item.value <= 0 }"
          class="summary-row"
        >
          <b-col cols="6" sm="6" md="6">
            <div class="body-5-regular text-gray-25">
              {{ item.label }}&colon;
            </div>
          </b-col>
          <b-col cols="6" sm="6" md="6">
            <div class="body-5-regular text-gray-25 pull-right">
              &dollar;{{ item.value | formatPrice }}
            </div>
            <div v-if="item.paymentDetails" class="col-12 text-gray-25 pull-right text-sm text-right pr-0">
              <small>({{item.paymentDetails}})</small>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="promoCode" class="summary-row">
          <b-col cols="6" sm="6" md="6">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.promo_code') }}&colon;
            </div>
            <div class="body-5-regular text-success">
              {{ $t('shopping_cart.promo_code_applied') }}
            </div>
          </b-col>
          <b-col cols="6" sm="6" md="6" class="d-flex align-items-center">
            <b-button
              class="ml-auto pa-0"
              variant="img"
              @click="$emit('clear-promo')"
            >
              <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')" />
            </b-button>
            <span class="body-5-regular text-gray-25">
              &minus;&dollar;{{ promoCodeDiscount | formatPrice }}
            </span>
          </b-col>
        </b-row>
        <b-row v-if="giftCardNumber" class="summary-row">
          <b-col cols="6" sm="6" md="6">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.gift_card') }}&colon;
            </div>
            <div class="body-5-regular text-success">
              {{ $t('shopping_cart.gift_card_applied') }}
            </div>
          </b-col>
          <b-col cols="6" sm="6" md="6" class="d-flex align-items-center">
            <b-button
              class="ml-auto pa-0"
              variant="img"
              @click="$emit('clear-gift-card')"
            >
              <b-img :src="require('~/assets/img/shopping-cart/x-close.svg')" />
            </b-button>
            <span class="body-5-regular text-gray-25">
              &minus;&dollar;{{ giftCardDiscount | formatPrice }}
            </span>
          </b-col>
        </b-row>
        <b-row class="summary-row">
          <b-col cols="6" sm="6" md="6" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.total') }}&colon;
            </div>
          </b-col>
          <b-col cols="6" sm="6" md="6">
            <div class="pull-right body-5-normal">
              &dollar;{{ getTotal | formatPrice }}
            </div>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { CASH_ADDED } from '~/static/constants/trades'
import { SUB_TOTAL, SUB_TOTAL_AFTER_DISCOUNT } from '~/static/constants'

export default {
  name: 'OrderSummaryCard',
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    },
    promoCode: {
      type: [Object, Boolean],
      default: false,
    },
    promoCodeDiscount: {
      type: Number,
      default: 0
    },
    giftCardNumber: {
      type: [String, Boolean],
      default: false,
    },
    giftCardDiscount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    getItems: (vm) => {
      return vm.items.filter((item) => {
        return item.key !== SUB_TOTAL_AFTER_DISCOUNT
      })
    },
    getTotal: (vm) => {
      return vm.items.reduce((sum, item) => {
        if (item.key === CASH_ADDED || item.key === SUB_TOTAL) {
          return sum
        }

        return sum + item.value
      }, 0)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.summary-wrapper
  @media (max-width: 576px)
    padding: 0 18px 24px
    margin: 30px 0 0

    >div
      padding: 0

.summary-row
  margin: 16px 0 0

  @media (max-width: 576px)
    margin: 12px 0 0

.card.custom-card
  @media (max-width: 576px)
    background: $color-white-5

    .card-body
      padding: 0 14.5px 12px
</style>
