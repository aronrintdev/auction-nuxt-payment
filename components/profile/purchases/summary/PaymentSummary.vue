<template>
  <div class="row">

    <!-- Cash Summary -->
    <div v-if="orderDetails.type === 'trade'" class="col-12">
      <b-card class="purchase-multiple-orders">
        <h4 class="card-title cash-summary-header">
          <img :src="require('~/assets/img/purchases/dollar.svg')" alt="dollar-image" class="dollar-image-trade"/>
          {{ $t('vendor_purchase.cash_received', { total: $options.filters.formatPrice(orderDetails.transaction.total ), }) }}
        </h4>
        <!-- Down arrow -->
        <span class="float-right" :class="{ rotatearrowimage: showDetails }" @click="toggleDetails">
          <span v-if="!showDetails" class="text-bold text-capitalize">
            {{ $t('vendor_purchase.status') }} &colon;
            {{ orderDetails.order_status }}
          </span>
          <img :src="downArrow" alt="down-arrow" />
        </span>
        <!-- ./Down arrow -->

        <span class="img-wrapper"> </span>

        <template v-if="showDetails">

          <!-- Description -->
          <b-card-text>
            {{ $t('vendor_purchase.cash_received_description') }}
          </b-card-text>
          <!-- ./Description -->

          <!-- Other Details -->
          <b-card-text>
            <div class="row">
              <div class="col-md-3">
                <div class="payment-summary-details-subheading text-muted text-bold">
                  {{ $t('vendor_purchase.payment_method') }}
                </div>
                <div class="payment-summary-details-description">
                  <img :src="getImage" alt="payment-img" class="img-fluid" width="50"/>
                </div>
              </div>
              <div class="col-md-3">
                <div class="payment-summary-details-subheading text-muted text-bold">
                  {{ $t('vendor_purchase.pending_cash') }}
                </div>
                <div class="payment-summary-details-description">
                  &dollar;{{ orderDetails.transaction.total | formatPrice }}
                </div>
              </div>
            </div>
          </b-card-text>
          <!-- /Other Details -->

        </template>
      </b-card>
    </div>

    <!-- ./Cash Summary -->

    <!-- Payment Details -->
    <div class="col-12 purchase-history-heading">
      <h5 class="text-bold">
        {{ orderDetails.type !== 'trade' ? $t('vendor_purchase.payment_summary') : '' }}
      </h5>
    </div>

    <div class="col-12 payment-summary-details mt-3">
      <b-card class="shadow-none border">
        <div class="row">
          <div class="col-md-12 col-sm-12">
            <b-alert v-if="paymentInfoIsUpdated" show dismissible variant="payment-success" class="text-dark text-bold">
              <i class="fa fa-check-circle" aria-hidden="true"></i>
              <span>{{ $t('vendor_purchase.payment_processed') }}</span>
            </b-alert>
          </div>

          <div class="col-12 transaction-details">
            <h5 v-if="orderDetails.type !== 'trade'" class="transaction-heading text-capitalize text-bold">
              {{ $t('vendor_purchase.transactionid', { transactionid: orderDetails.transaction.transaction_id, })}}
              &nbsp;
              ({{ orderDetails.type }})
            </h5>
            <h5 v-else class="transaction-heading text-capitalize text-bold">
              {{ $t('vendor_purchase.trade_summary') }}
            </h5>
            <p class="text-capitalize transaction-on">
              {{ $t('vendor_purchase.purchased_on') }}
              {{ orderDetails.transaction.created_at | formatDateTimeString }}
            </p>
          </div>

          <!-- Billing address -->
          <div class="col-md-4 col-sm-12 address">
            <div class="payment-summary-details-subheading text-muted text-bold">
              {{ $t('vendor_purchase.billing_address') }}
            </div>

            <div class="payment-summary-details-description mt-2">
              <span v-if="orderDetails.billing_address.address_line_1">
                {{ orderDetails.billing_address.address_line_1 }}
              </span>
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
              <span v-if="orderDetails.billing_address.country">
                {{ orderDetails.billing_address.country }}
              </span>
            </div>
            <div v-if="cardStatus.includes(orderDetails.transaction.payment_type)">
              <span class="text-decoration-underline">
                {{ $t('vendor_purchase.terms_condition') }}</span>
            </div>
          </div>
          <!-- ./Billing address -->
          <div v-if="orderDetails.transaction" class="col-md-4 col-sm-12 transaction">
            <div class="payment-summary-details-subheading text-muted text-bold"
            >
              {{ $t('vendor_purchase.payment_method') }}
            </div>
            <div class="payment-summary-details-description mt-2">
              <img :src="getImage" alt="payment-img" class="img-fluid payment-img" width="50"/>
              {{ $t('vendor_purchase.paymentvia') }}
              <template v-if="orderDetails.transaction">
                <span v-if="cardStatus.includes(orderDetails.transaction.payment_type)"
                  class="text-capitalize"
                >
                  <span v-if="orderDetails.payment_method">{{ orderDetails.payment_method.card_brand }}</span>
                  &nbsp;&#10005;<span v-if="orderDetails.payment_method">{{ orderDetails.payment_method.card_last_digits }}</span>
                  </span
                >
                <span v-else class="text-capitalize">
                  {{ orderDetails.transaction.payment_type }}
                </span>

                <p v-if="!cardStatus.includes(orderDetails.transaction.payment_type)" class="mt-4">
                  <span class="text-dark">
                    {{ $t('vendor_purchase.bitcoin_status') }}
                  </span>
                  <br />{{ $t('vendor_purchase.status_accepted') }}
                </p>
                <p v-if="!cardStatus.includes(orderDetails.transaction.payment_type)" class="mt-4">
                  <span class="text-dark">
                    {{ $t('vendor_purchase.transaction_hash') }}
                  </span>
                  <br />
                  {{ $t('vendor_purchase.transaction_hashedvalue') }}
                </p>
              </template>
            </div>
          </div>
          <!-- ./Payment method -->
          <!-- Order Total -->
          <div v-if="orderDetails.transaction" class="col-md-4 col-sm-12 total">
            <div
              class="payment-summary-details-subheading text-muted text-bold"
            >
              {{ $t('vendor_purchase.order_total') }}
            </div>
            <!-- TODO -->
            <b-row v-if="orderDetails.transaction.sub_total" class="mt-2">
              <b-col md="6">
                <div class="text-gray-25">
                  {{ $t('shopping_cart.subtotal') }}
                  {{
                    $t('vendor_purchase.item', {
                      count: orderDetails.quantity,
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
            <b-row v-if="orderDetails.transaction.discount && orderDetails.promo_code!==null">
              <b-col md="6">
                <div class="text-gray-25">
                 {{ $t('vendor_purchase.promotion') }}
                  <span v-if="orderDetails.promo_code">({{orderDetails.promo_code}})</span>
                </div>
              </b-col>
              <b-col md="3">
                <div class="text-gray-25 pull-right">&dollar;{{orderDetails.transaction.discount}}</div>
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
            <!--TODO  -->
          </div>
          <!-- ./Order Total -->
        </div>
      </b-card>
    </div>
    <!-- Payment Details -->
  </div>
</template>

<script>
import DownArrow from '~/assets/img/icons/down-arrow.svg'
import {PAYMENT_METHOD_TYPE_CRYPTO, PRODUCT_IMG_WIDTH, CARD_STATUS, PRODUCT_FALLBACK_URL, PAYMENT_METHOD_TYPE_CARD} from '~/static/constants'
export default {
  name: 'PaymentSummary',

  props: {
    orderDetails: {
      type: Object,
      default: () => {},
      required: true,
    },

    paymentInfoIsUpdated: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      downArrow: DownArrow,
      showDetails: false,
      productImageWidth: PRODUCT_IMG_WIDTH,
      fallbackImgUrl: PRODUCT_FALLBACK_URL,
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

  methods: {
    toggleDetails() {
      this.showDetails = !this.showDetails
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

@media (max-width: 426px)
  .purchase-history-heading
    h5
      @include body-7-bold
      font-style: normal
      letter-spacing: -0.02em
      text-align: left
  .transaction-details
    .transaction-on
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
