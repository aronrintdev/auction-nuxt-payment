<template>
  <b-row>
    <b-col md="12">
      <b-card class="custom-card radius-3">
        <b-row
          v-for="(item, index) in getItems"
          :key="item.key"
          :class="{'mt-3': index, 'd-none': item.hideWith0Value && item.value <= 0 }"
        >
          <b-col md="6">
            <div class="body-5-regular text-gray-25">
              {{ item.label }}&colon;
            </div>
          </b-col>
          <b-col md="6">
            <div class="body-5-regular text-gray-25 pull-right">
              &dollar;{{ item.value | formatPrice }}
            </div>
            <div v-if="item.paymentDetails" class="col-12 text-gray-25 pull-right text-sm text-right pr-0">
              <small>({{item.paymentDetails}})</small>
            </div>
          </b-col>
        </b-row>
        <b-row v-if="promoCode" class="mt-3">
          <b-col md="6">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.promo_code') }}&colon;
            </div>
            <div class="body-5-regular text-success">
              {{ $t('shopping_cart.promo_code_applied') }}
            </div>
          </b-col>
          <b-col md="6" class="d-flex align-items-center">
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
        <b-row v-if="giftCardNumber" class="mt-3">
          <b-col md="6">
            <div class="body-5-regular text-gray-25">
              {{ $t('shopping_cart.gift_card') }}&colon;
            </div>
            <div class="body-5-regular text-success">
              {{ $t('shopping_cart.gift_card_applied') }}
            </div>
          </b-col>
          <b-col md="6" class="d-flex align-items-center">
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
        <b-row class="mt-3">
          <b-col md="6" class="d-flex align-items-center">
            <div class="body-5-normal">
              {{ $t('shopping_cart.total') }}&colon;
            </div>
          </b-col>
          <b-col md="6">
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
