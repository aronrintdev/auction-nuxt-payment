<template>
  <div class="row vd-purchase-history">
    <div class="col-12 purchase-history-heading refund-summary">
      {{ $t('vendor_purchase.refund_summary') }}
    </div>
    <div class="col-12 payment-summary-details mt-3">
      <b-card class="shadow-none border">
        <div class="row">
          <div class="col-12 transaction-details">
            <h5 class="transaction-heading text-capitalize text-bold">
              {{
                $t('vendor_purchase.transactionid', {
                  transactionid: orderDetails.transaction.transaction_id,
                })
              }}&nbsp;({{ orderDetails.type.label }})
            </h5>
            <p class="text-capitalize refunded-date">
              {{ $t('vendor_purchase.refunded_on') }}
              {{ orderDetails.transaction.created_at | formatDateTimeString }}
            </p>
          </div>
          <!-- Billing address -->
          <div class="col-md-4 col-sm-12 address">
            <div
              class="payment-summary-details-subheading text-muted text-bold"
            >
              {{ $t('vendor_purchase.billing_address') }}
            </div>
            <div class="payment-summary-details-description mt-2">
              <span v-if="orderDetails.billing_address.address_line_1">{{
                orderDetails.billing_address.address_line_1
              }}</span>
              <br />
              <span v-if="orderDetails.billing_address.address_line_2">
                {{ orderDetails.billing_address.address_line_2 }}
                <br />
              </span>
              <span v-if="orderDetails.billing_address.city">
                {{ orderDetails.billing_address.city }}
                <br />
              </span>
              <span v-if="orderDetails.billing_address.state">
                {{ orderDetails.billing_address.state }}
                <br />
              </span>
              <span v-if="orderDetails.billing_address.country">{{
                orderDetails.billing_address.country
              }}</span>
            </div>
          </div>
          <!-- ./Billing address -->

          <div v-if="orderDetails.transaction" class="col-md-4 col-sm-12 transaction">
            <div class="payment-summary-details-subheading text-muted text-bold">
              {{ $t('vendor_purchase.payment_method') }}
            </div>
            <div class="payment-summary-details-description mt-2">
              <img :src="getImage" alt="payment-image" class="payment-img" width="50"/>
              {{ $t('vendor_purchase.paymentvia') }}
              <span v-if="cardStatus.includes(orderDetails.transaction.payment_type)" class="text-capitalize">
                <span v-if="orderDetails.payment_method">{{ orderDetails.payment_method.card_brand }}</span>
                &nbsp;&#10005;
                <span v-if="orderDetails.payment_method">{{ orderDetails.payment_method.card_last_digits }}</span>
              </span>
              <span v-else class="text-capitalize">
                <span v-if="orderDetails.payment_method">{{ orderDetails.payment_method.payment_type }}</span>
              </span>
              <p v-if="!cardStatus.includes(orderDetails.transaction.payment_type)" class="mt-4">
                <span class="text-dark">
                  {{ $t('vendor_purchase.bitcoin_status') }}
                </span>
                <br />
                {{ $t('vendor_purchase.status_accepted') }}
              </p>
              <p v-if="!cardStatus.includes(orderDetails.transaction.payment_type)" class="mt-4">
                <span class="text-dark">
                  {{ $t('vendor_purchase.transaction_hash') }}
                </span>
                <br />
                {{ $t('vendor_purchase.transaction_hashedvalue') }}
              </p>
            </div>
          </div>
          <!-- ./Payment method -->


          <!-- Order Total -->
          <div v-if="orderDetails.transaction" class="col-md-4 col-sm-12 total">
            <div
              class="payment-summary-details-subheading text-muted text-bold"
            >
              {{ $t('vendor_purchase.refund_total') }}
            </div>
            <b-row v-if="orderDetails.transaction.sub_total" class="mt-2">
              <b-col md="6">
                <div class="text-gray-25">
                  {{ $t('shopping_cart.subtotal') }}
                  {{
                    $t('vendor_purchase.item', {
                      count: orderDetails.listing_item_order.length,
                    })
                  }}
                </div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">
                  &dollar;{{ orderDetails.transaction.sub_total | formatPrice }}
                </div>
              </b-col>
            </b-row>
            <b-row v-if="orderDetails.transaction.shipping_fee">
              <b-col md="6">
                <div class="text-gray-25">
                  {{ $t('vendor_purchase.shipping_fee') }}
                </div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">
                  &dollar;{{
                    orderDetails.transaction.shipping_fee | formatPrice
                  }}
                </div>
              </b-col>
            </b-row>
            <b-row v-if="orderDetails.transaction.processing_fee">
              <b-col md="6">
                <div class="text-gray-25">
                  {{ $t('vendor_purchase.processing_fee') }}
                </div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">
                  &dollar;{{
                    orderDetails.transaction.processing_fee | formatPrice
                  }}
                </div>
              </b-col>
            </b-row>
            <b-row v-if="orderDetails.transaction.tax">
              <b-col md="6">
                <div class="text-gray-25">{{ $t('vendor_purchase.tax') }}</div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">
                  &dollar;{{ orderDetails.transaction.tax | formatPrice }}
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <div class="text-gray-25">
                  {{ $t('vendor_purchase.promotion') }}
                </div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">&dollar;0.00</div>
                <!-- TODO: Harcoded for now -->
              </b-col>
            </b-row>
            <b-row v-if="orderDetails.transaction.total">
              <b-col md="6">
                <div class="text-bold">{{ $t('vendor_purchase.total') }}</div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">
                  &dollar;{{ orderDetails.transaction.total | formatPrice }}
                </div>
              </b-col>
            </b-row>
          </div>
          <!-- ./Order Total -->
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import {PRODUCT_IMG_WIDTH, PRODUCT_FALLBACK_URL,CARD_STATUS,PAYMENT_METHOD_TYPE_CARD,PAYMENT_METHOD_TYPE_CRYPTO} from '~/static/constants'

export default {
  name: 'RefundSummary',

  props: {
    orderDetails: {
      type: Object,
      default: () => {},
      required: true,
    },
  },

  data() {
    return {
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
      productImageWidth: PRODUCT_IMG_WIDTH,
      cardStatus: CARD_STATUS,
      paymentMethodTypeCard: PAYMENT_METHOD_TYPE_CARD,
      paymentMethodTypeCrypto: PAYMENT_METHOD_TYPE_CRYPTO
    }
  },

  computed: {
    // Get the image
    getImage: (vm) => {
      if(vm.orderDetails.transaction.payment_type === vm.paymentMethodTypeCard){
        try {
          const payment = vm.orderDetails.payment_method
          if (vm.cardStatus.includes(payment.payment_type)) {
            return require(`~/assets/img/purchases/${payment.card_brand}-logo.svg`)
          } else {
            return require(`~/assets/img/purchases/${payment.payment_type}-logo.svg`)
          }
        } catch (error) {
          return require('~/assets/img/purchases/visa-logo.svg')
        }
      }

      // For crypto the payment type is stored. So default bitcoin icon is given.
      // TODO: add other crypto payments icons.
      if(vm.orderDetails.transaction.payment_type === vm.paymentMethodTypeCrypto){
        return require('~/assets/img/shopping-cart/btc-logo.png')
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
@media (max-width: 426px)
  .refund-summary
    @include body-7-bold
    font-style: normal
    letter-spacing: -0.02em
    text-align: left
  .payment-summary-details
    .refunded-date
      @include body-5
  .payment-summary-details
    .transaction, .total
      margin-top: 2rem
    .transaction
      @include body-5
    .total
      .col-md-6, .col-md-3
        width: 50%
.payment-img
  border: 1.5px solid $color-gray-29
  border-radius: 4px
  padding: 10px
</style>
