<template>
  <!-- Sale Summary -->
  <b-col md="3" class="sale-summary">
    <!-- Sale summary title -->
    <b-row>
      <b-col md="12">
        <span class="salesummary-heading d-block">{{
          $t('sell_now.sale_summary')
        }}</span>
        <span class="make-a-sale d-flex align-items-center">{{
          $t('sell_now.make_a_sale')
        }}</span>
      </b-col>
    </b-row>
    <!-- ./Sale summary title -->

    <!-- Quantity of Items Selling Indication -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="body-5-bold">
          {{ $t('sell_now.items_selling') }}&colon;&nbsp;{{ getTotalQuantity }}
        </div>
      </b-col> </b-row
    ><!-- End of Quantity of Items Selling Indication -->

    <!-- Sale Summary Card -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="body-4-medium">{{ $t('shopping_cart.total') }}&colon;</div>
      </b-col>
    </b-row>
    <SaleSummaryCard class="mt-2" :items="getItems" />
    <!-- ./Sale Summary Card -->

    <!-- Have a Promo Code? -->
    <b-row class="mt-3">
      <b-col md="12">
        <div class="promocode-text d-flex align-items-center">
          &#x2b;&nbsp;{{ $t('sell_now.promo_code') }}
        </div>
      </b-col>

      <b-col md="12" class="mt-3">
        <div class="ask_summary_text d-flex align-items-left">
          {{ $t('sell_now.ask_summary_text') }}
        </div>
      </b-col>
    </b-row>
    <!-- ./Have a Promo Code ends -->

    <!-- Sale summary Total Payout -->
    <b-row class="mt-5">
      <b-col md="6" class="text-center">
        <div class="body-4-medium">
          {{ $t('sell_now.total_payout') }}&colon;
        </div>
      </b-col>
      <b-col md="6" class="text-center">
        <div class="body-4-medium">&dollar;{{ getTotal | formatPrice }}</div>
      </b-col> </b-row
    ><!-- End of Sale summary Total Payout -->

    <!-- Sell Now Button -->
    <b-row class="mt-4">
      <b-col v-if="!payoutConnectError">
        <div class="text-center mb-4 connect-text">
          {{ $t('sell_now.payout_not_connected') }} -
          <span
            class="text-primary text-decoration-underline"
            role="button"
            @click="moveToPayoutDetails"
          >
            {{ $t('sell_now.connect_payout') }}
          </span>
        </div>
      </b-col>
      <b-col v-if="loading" md="12" class="text-center">
        <b-spinner variant="color-blue-2"></b-spinner>
      </b-col>
      <b-col v-else md="12" class="text-center">
        <b-button
          :disabled="!payoutConnectError"
          type="button"
          class="px-5 text-white"
          variant="sellnow-confirm"
          pill
          @click="sellNow"
          >{{ $t('sell_now.sell_now') }}</b-button
        >
      </b-col>
    </b-row>
    <!-- End of Sell Now Button -->
  </b-col>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SaleSummaryCard from './SaleSummaryCard.vue'
import {
  SALE_SELLER_FEE,
  SALE_TRANSACTION_FEE,
  PERCENT_OFFSET,
  VENDOR_SPECIFIC_COMMISSION,
  GLOBAL_COMMISSION,
  FIXED_AND_PERCENTAGE,
  PERCENTAGE,
  FIXED_AMOUNT,
} from '~/static/constants'
export default {
  name: 'SaleSummary',

  components: { SaleSummaryCard },

  data() {
    return {
      saleSellerFee: SALE_SELLER_FEE,
      saleTransactionFee: SALE_TRANSACTION_FEE,
      loading: false,
      showConnectError: false,
      vendorSpecific: VENDOR_SPECIFIC_COMMISSION,
      globalCommission: GLOBAL_COMMISSION,
      fixedAndPercentage: FIXED_AND_PERCENTAGE,
      percentage: PERCENTAGE,
      fixedAmount: FIXED_AMOUNT,
      percentageOffset: PERCENT_OFFSET,
      commission: {}
    }
  },

  async fetch() {
    await this.$axios
      .get('/calculate-commission-details', {
        handleError: false,
        params: { offer: this.sellItem.selectedOfferId },
      })
      .then((res) => {
        this.commission = res.data.data
      })
      .catch((err) => {
        this.$logger.logToServer('Calculate Commission error: ', err.response)
      })
  },

  fetchOnServer: false,

  computed: {
    ...mapGetters({
      sellItem: 'sell-now/getSellingItem',
      getVendorPayoutMethod: 'auth/getVendorPayoutMethod',
      shippingFee: 'order-settings/getShippingFee',
      processingFee: 'order-settings/getProcessingFee',
      getCommission: 'commission/getCommission',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotalQuantity: (vm) => {
      return vm.sellItem.quantity
    },

    calculateCommission: (vm) => {
      return vm.commission.commission_amount
    },

    getSellerPercentage: (vm) => {
      return ((vm.calculateCommission / vm.getSubTotal) * 100).toFixed(2)
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSubTotal: (vm) => {
      // Processing fee and shipping fee will be added to it.
      return vm.sellItem.highestOffer * vm.getTotalQuantity
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getSellerFee: (vm) => {
      return vm.calculateCommission 
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTransactionFee: (vm) => {
      if(vm.getSellerFee >= vm.getSubTotal){
        return 0
      }else{
        return vm.getSubTotal * (vm.saleTransactionFee / vm.percentageOffset)
      }
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getTotal: (vm) => {
      return vm.getSubTotal - vm.getSellerFee - vm.getTransactionFee || 0
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getItems: (vm) => {
      const items = []
      items.push({
        key: vm.$t('sell_now.ask_price'),
        value: vm.getSubTotal || 0,
        sign: '+',
      })
      items.push({
        key: vm.$t('sell_now.seller_fee', {
          percentage: vm.getSellerPercentage || 0,
        }),
        value: vm.getSellerFee || 0,
        sign: '-',
      })
      items.push({
        key: vm.$t('sell_now.transaction_fee', {
          percentage: vm.getTransactionFee > 0 ? vm.saleTransactionFee : 0,
        }),
        value: vm.getTransactionFee || 0,
        sign: '-',
      })
      return items
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    payoutConnectError: (vm) => {
      if (vm.getVendorPayoutMethod) {
        return !!Object.keys(vm.getVendorPayoutMethod).length
      } else {
        return false
      }
    },
  },

  created() {
    // Check the vendors payout method
    this.addVendorPayoutMethod()
  },

  methods: {
    ...mapActions({
      addVendorPayoutMethod: 'auth/addVendorPayoutMethod',
      doSellNow: 'sell-now/doSellNow',
      addSellNowItem: 'sell-now/addItem',
      selectedInventoryAndListing: 'sell-now/selectedItem',
    }),

    // Move to payout details in vendor hub.
    moveToPayoutDetails() {
      this.$router.push({ path: '/profile/vendor-hub' })
    },
    sellNow() {
      this.loading = true
      // make data for the sell now.
      const data = {
        ...this.sellItem,
        totalPayout: Math.round(this.getTotal),
        sellerFee: Math.round(this.getSellerFee),
        transactionFee: Math.round(this.getTransactionFee),
        payoutmethod: this.getVendorPayoutMethod,
        // Shipping Fee, processing fee and tax is added when placing an offer.
        shippingFee: 0,
        processingFee: 0,
        askPrice: this.getSubTotal,
        commission: this.commission
      }
      // Do the sell now.

        this.doSellNow(data)
        .then((res) => {
          this.loading = false
          this.addSellNowItem({})
          this.selectedInventoryAndListing({})
          this.$toasted.success(this.$t('sell_now.sell_successfull'))
          this.$router.push(`/orders/${res.data.data.order_id}-1`)
        })
        .catch((error) => {
          this.loading = false
          this.$logger.logToServer('Sell now error', error.response.data)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.sale-summary
  min-height: 720px
.salesummary-heading
  font-family: $font-family-base
  font-style: normal
  @include body-16-medium
  color: $color-black-1
.make-a-sale
  font-family: $font-montserrat
  font-style: normal
  @include body-9-normal
  color: $color-gray-24
.promocode-text
  font-style: normal
  @include body-5-regular
  letter-spacing: 0.06em
  color: $color-gray-5
.ask_summary_text
  font-style: normal
  @include body-5-regular
  color: $color-gray-25
.btn-sellnow-confirm
  background: $color-blue-20
  box-shadow: 0px 4px 4px rgb(0 0 0 / 25%)
  font-weight: $medium
.connect-text
  font-style: normal
  font-weight: $normal
  @include body-4-normal
  color: $color-black-1
</style>
