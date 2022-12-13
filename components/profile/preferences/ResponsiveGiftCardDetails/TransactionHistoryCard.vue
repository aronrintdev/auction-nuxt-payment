<template>
  <div class="transaction-historycard mx-auto">
    <b-row class="transaction-history-details">
      <b-col cols="6" class="date-product-name">
        <div class="date">{{ history.order.created_at  | formatDate('MM/DD/YYYY')}}</div>
        <div class="product-name">
          <span v-if="history.transaction_type === reload" class="products">
            {{ $t('giftcard_section.add_funds') }}
          </span>
          <template v-else>
            <template  v-if="history.order && history.order.items">
              <span v-for="(item, indexVal) in  history.order.items" :key="indexVal" class="products">
                {{ item.product.name }}
              </span>
            </template>
          </template>
        </div>
      </b-col>
      <b-col cols="3" class="order-details text-center">
        <div class="order-id">
          {{ $t('giftcard_section.transaction_table.order_id') }}
        </div>
        <div class="order-id-details text-decoration-underline">
          {{ order.order_id }}
        </div>
      </b-col>
      <b-col cols="3" class="amount-col">
        <div class="cd-amount" :class="type">
          {{ type === 'credit' ? '+' : '' }}{{ history.amount | toCurrency('USD', 'N/A') }}
        </div>
          <div class="balance-details d-flex align-items-center text-align-center">{{ $t('giftcard_section.transaction_table.balance') }}</div>
          <div class="balance-details d-flex align-items-center text-align-center">{{ history.balance | toCurrency('USD', 'N/A') }}</div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { RELOAD  } from '~/static/constants'

export default {
  name: 'TransactionHistoryCard',

  props: {
    history: {
      type: Object,
      default: () => {}
    }
  },

  data() {
    return {
      reload: RELOAD
    }
  },

  computed: {
    type: (vm) => {
      return vm.history.type
    },

    order: (vm) => {
      return vm.history && vm.history.order
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.transaction-historycard
  background: $color-white
  height: 81px
  border: 1px solid $color-gray-29
  box-shadow: 0px 1px 4px $color-black-rgb2
  border-radius: 10px
  padding: 18px 25px 18px 10px
  @media only screen and (max-width: 375px)
    max-width: 343px
  @media only screen and (max-width: 287px)
    height: 110px
    padding: 18px 10px 18px 10px
  
  .transaction-history-details
    .date-product-name
      @media only screen and (max-width: 287px)
        flex: 0 0 100%
        max-width: 100%
      .date
        font-family: $font-sp-pro
        font-style: normal
        @include body-1214-light
        color: $color-black-15
      .product-name
        font-family: $font-montserrat
        font-style: normal
        @include body-9-normal
        color: $color-black-1
        width: 165px
        height: 16px
        .products
          width: 165px
    .order-details
      @media only screen and (max-width: 287px)
        flex: 0 0 50%
        max-width: 50%
      .order-id
        font-family: $font-montserrat
        font-style: normal
        @include body-6-normal
        color: $color-black-15
        margin-top: 8px
        @media only screen and (max-width: 287px)
          float: left
      .order-id-details
        font-family: $font-montserrat
        font-style: normal
        @include body-9-normal
        color: $color-blue-30
        @media only screen and (max-width: 287px)
          float: left
    .amount-col
      @media only screen and (max-width: 287px)
        flex: 0 0 500%
        max-width: 50%
      .cd-amount
        font-family: $font-sf-pro-text
        font-style: normal
        @include body-8-regular
        color: $color-black-15
        &.credit
          font-family: $font-sf-pro-text
          font-style: normal
          @include body-8-regular
          color: $color-green-36
        &.debit
          font-family: $font-sf-pro-text
          font-style: normal
          @include body-8-regular
          color: $color-black-15

      .balance-details
        font-family: $font-montserrat
        font-style: normal
        @include body-18-bold
        color: $color-black-1
      


</style>