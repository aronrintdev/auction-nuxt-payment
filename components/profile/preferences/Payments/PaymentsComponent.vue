<template>
  <div v-if="isScreenXS" class="profile-component-wrapper-responsive">
    <b-card id="responsive-paymentcard" class="mt-3">
      <!-- heading -->
      <div class="card-text border-underline">
        <span class="payment-heading d-flex align-items-center">
          <span class="d-flex">
            {{ $t('preferences.payments.payment_method') }}
          </span>
        </span>
        <p class="payment-sub-heading d-flex">
          {{ $t('preferences.payments.update_your_payment_info') }}
        </p>
      </div>
      <!-- heading -->

      <!-- card payments -->
      <div class="card-text border-underline mt-3">
        <span class="payment-details-heading" @click="showCardPayments">
          <span class="d-flex">
            {{ $t('preferences.payments.card_payments') }}
            <span role="button" class="forward-btn position-absolute">
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="payment-details-sub-heading mt-2 d-flex align-items-center">
          {{ $t('preferences.payments.add_card_payments') }}
        </p>
      </div>
      <!-- card payments -->

      <!-- gift card -->
      <div class="card-text mt-3" @click="showGiftCards">
        <span class="payment-details-heading">
          <span class="d-flex">
            {{ $t('preferences.payments.gift_card') }}
            <span role="button" class="forward-btn position-absolute">
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="payment-details-sub-heading mt-2 d-flex">
          {{ $t('common.purchase') }}/{{ $t('preferences.payments.redeem_gift_card') }}
        </p>
      </div>
      <!-- gift card -->
    </b-card>
  </div>
</template>

<script>
import screenSize from '~/plugins/mixins/screenSize'
import emitEvent from '~/plugins/mixins/emit-event'
export default {
  name: 'PaymentComponent',
  
  mixins: [screenSize, emitEvent],

  layout: 'Profile',

  middleware: 'auth',

  methods: {
    showCardPayments() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.CardPayments.name
      )
    },

    showGiftCards() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.GiftCardMethod.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper-responsive
  .payment-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    letter-spacing: 0.02em
    color: $color-grey-101

  .payment-sub-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17

  .payment-details-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-medium
    color: $color-black-1

  .payment-details-sub-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17

  .border-underline
    border-bottom: 2px solid $color-white-25

  .forward-btn
    right: 25px
  #responsive-paymentcard::v-deep
    .card-body
      padding: 20px 17px
    .payment-sub-heading,
    .payment-details-sub-heading
      margin-top: 4px
      margin-bottom: 20px
</style>