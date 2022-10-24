<template>
  <div v-if="orderDetails" class="details">
    <div class="body-8-medium text-capitalize">
      {{ $t('vendor_purchase.transaction_id') }} #{{ orderDetails.transaction.transaction_id }}
    </div>
    <div class="mt-1 body-5-regular date-text">
      {{ $t('vendor_purchase.placed_on') }} {{ orderDetails.transaction.created_at }}
    </div>

    <div class="totals">
      <div v-if="orderDetails.transaction.sub_total"
           class="d-flex align-items-center justify-content-between body-5-regular">
        <span
            class="text-capitalize">{{ $t('shopping_cart.subtotal') }} ({{ orderDetails.quantity }} {{ $t('common.items') }})</span>
        <span>{{ orderDetails.transaction.sub_total | toCurrency }}</span>
      </div>
      <div v-if="orderDetails.transaction.shipping_fee"
           class="d-flex align-items-center justify-content-between body-5-regular mt-7">
        <span class="text-capitalize">{{ $t('shopping_cart.shipping_fee') }}</span>
        <span>{{ orderDetails.transaction.shipping_fee | toCurrency }}</span>
      </div>
      <div v-if="orderDetails.transaction.processing_fee"
           class="d-flex align-items-center justify-content-between body-5-regular mt-7">
        <span class="text-capitalize">{{ $t('shopping_cart.processing_fee') }}</span>
        <span>{{ orderDetails.transaction.processing_fee | toCurrency }}</span>
      </div>
      <div v-if="orderDetails.transaction.tax"
           class="d-flex align-items-center justify-content-between body-5-regular mt-7">
        <span class="text-capitalize">{{ $t('shopping_cart.tax') }}</span>
        <span>{{ orderDetails.transaction.tax | toCurrency }}</span>
      </div>
      <div v-if="orderDetails.transaction.promotion"
           class="d-flex align-items-center justify-content-between body-5-regular mt-7">
        <span class="text-capitalize">{{ $t('vendor_purchase.promotion') }}</span>
        <span>{{ orderDetails.transaction.promotion | toCurrency }}</span>
      </div>
      <div v-if="orderDetails.transaction.total"
           class="d-flex align-items-center justify-content-between body-5-regular mt-7 body-5-regular text-black">
        <span class="text-capitalize">{{ $t('shopping_cart.total') }}</span>
        <span>{{ orderDetails.transaction.total | toCurrency }}</span>
      </div>
    </div>
    <ItemDivider/>
    <div class="body-10-regular color-gray25">
      <div class="body-4-medium text-black">{{ $t('shopping_cart.payment') }}</div>
      <b-row class="mt-16">
        <b-col class="section-label body-5-mendium text-nowrap" cols="6">
          {{ $t('shopping_cart.order_date') }}
        </b-col>
        <b-col cols="6">{{ new Date(orderDetails.created_at).toLocaleDateString() }}</b-col>
      </b-row>
      <b-row class="mt-16">
        <b-col class="section-label body-5-mendium text-nowrap" cols="6">
          {{ $t('shopping_cart.payment') }}
        </b-col>
        <b-col cols="6"> {{ paymentDetail }}</b-col>
      </b-row>
      <ItemDivider/>
      <div v-if="isCrypto" class="mb-3">
        <div class="body-5-regular crypto-header">{{ $t('vendor_purchase.request_amount') }}</div>
        <CopyAbleField :text="cryptoData.currency_to" width="156px">
          <template #after>
            <div class="body-5-medium text-black">
              BTC
            </div>
          </template>
        </CopyAbleField>
        <div class="body-5-regular crypto-header">{{ $t('vendor_purchase.wallet_address') }}</div>
        <!--        TODO change it through API or ENV  -->
        <CopyAbleField :text="'196DgadfadifvDFGDGHJcvdsafjnd3Bd'"/>
      </div>
      <div class="body-4-medium text-black">{{ $t('vendor_purchase.billing') }}</div>
      <b-row class="mt-16">
        <b-col class="section-label body-5-mendium text-nowrap" cols="6">{{ $t('payments.cardholder_name') }}</b-col>
        <b-col cols="6">{{ orderDetails.payment_method.card_holder_name }}</b-col>
      </b-row>
      <b-row class="mt-16">
        <b-col class="section-label body-5-mendium text-nowrap" cols="6">{{ $t('vendor_purchase.billing_address') }}
        </b-col>
        <b-col class="text-wrap" cols="6">{{ orderDetails.billing_address.address_line_1 }}</b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
import {CARD_STATUS, PAYMENT_METHOD_TYPE_CARD, PAYMENT_METHOD_TYPE_CRYPTO} from '~/static/constants';
import ItemDivider from '~/components/profile/notifications/ItemDivider';
import CopyAbleField from '~/components/profile/purchases/summary/CopyAbleField';

export default {
  name: 'MobilePaymentSummary',
  components: {CopyAbleField, ItemDivider},
  props: {
    orderDetails: {
      type: [Object, null],
      default: null
    }
  },
  data() {
    return {
      cardStatus: CARD_STATUS,
      paymentMethodTypeCard: PAYMENT_METHOD_TYPE_CARD,
      cryptoData: {
        currency_from: null,
        amount_from: null,
        currency_to: 'btc',
        estimated_amount: null
      }
    }
  },
  computed: {
    paymentDetail() {
      const method = this.orderDetails.payment_method
      return method && (`${method.card_brand} - ${method.card_last_digits}, Exp. ${method.card_expiry_date}`)
    },
    isCrypto() {
      const method = this.orderDetails.payment_method
      return method && method.payment_type === PAYMENT_METHOD_TYPE_CRYPTO
    }
  },
  mounted() {
    if (this.isCrypto) {
      this.convertCrypto()
    }
  },
  methods: {
    ...mapActions({
      getEstimatedCryptoPrice: 'order-details/getEstimatedCryptoPrice'
    }),
    convertCrypto() {
      this.getEstimatedCryptoPrice({
        cryptoCurrency: 'btc',
        total: this.orderDetails.total
      }).then((res) => {
        console.log(res);
      })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/css/variables"
.details
  font-family: $font-family-sf-pro-display

  .crypto-header
    margin-top: 16px
    margin-bottom: 8px

  .date-text
    letter-spacing: -0.005em
    color: $color-gray-77e9

  .totals
    margin-top: 20px
    color: $color-gray-25

  .mt-7
    margin-top: 7px

  .mt-16
    margin-top: 16px

  .section-title
    margin-bottom: 16px

  .color-gray25
    color: $color-gray-25

  ::v-deep.divider
    border-top: 1px solid rgba($color-gray-23, 0.17)
    margin-inline: auto
    margin-top: 16px
    margin-bottom: 22px
</style>
