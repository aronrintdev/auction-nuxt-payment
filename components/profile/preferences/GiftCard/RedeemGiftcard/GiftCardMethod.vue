<template>
  <div v-if="isScreenXS" class="profile-component-wrapper">
    <client-only>
      <Portal to="page-title"> {{ $tc('common.payment', 2) }}</Portal>
      <!-- If back icons needed -->
      <Portal to="back-icon-slot"> 
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="backTo"
        />
      </Portal>
    </client-only>

    <b-card class="mt-3">
      <!-- card heading -->
      <div class="card-text border-underline">
        <span class="payment-heading">
          <span class="d-flex mb-3">
            {{ $t('purchases.gift_cards') }}
          </span>
        </span>
        <p v-if="!giftCardRedeemed" class="payment-sub-heading d-flex">
          {{ $t('preferences.payments.add_gift_card') }}
        </p>
      </div>
      <!-- card heading -->

      <!-- card details -->
      <div v-if="giftCardRedeemed" class="mb-5">
        <div class="mt-3 d-flex justify-content-center">
          <div class="ds-wallet-title d-flex justify-content-center">
            {{ $tc('preferences.payments.ds_wallet', 2) }}
          </div>
        </div>

        <div class="d-flex justify-content-center w-100 mt-3">
          <span role="button" class="icon-wrapper" @click="swap = !swap">
            <img :src="require('~/assets/img/icons/more-info.svg')" class="position-absolute more-info-icon float-right" alt="more-info">
          </span>
          <img
            v-if="!swap"
            :src="giftCardImage"
            alt="Demo Debit Card"
            class="w-50 justify-content-center card-image"
          />
          <div class="back-side">
            
          </div>
        </div>

        <div class="mt-4">
          <div class="d-flex justify-content-between ml-3 mr-3">
            <span class="card-details">{{
              $t('preferences.payments.gift_card_remaining')
            }}</span>
            <span class="card-details"
              >{{ $t('preferences.payments.expiry') }}&colon;10/23</span
            >
          </div>
          <div class="d-flex justify-content-between ml-3 mr-3 mt-1">
            <span class="card-remain">{{
              remainingBalance | toCurrency('USD', 'N/A')
            }}</span>
            <span class="card-details">
              <img
                role="button"
                :src="require('~/assets/img/icons/side-menu/watchlist.svg')"
                @click="viewPin"
              />
              &nbsp;{{ $t('preferences.payments.pin') }}&colon;
              <span v-if="showPinNumber">{{ pin }}</span>
              <span v-else>****</span>
            </span>
          </div>
          <div class="card-detail-link mt-2 mr-3 float-right mb-5">
            <span>{{ $t('preferences.payments.view_gift_card_detail') }}</span>
          </div>
        </div>
      </div>
      <!-- card details -->

      <!-- card payments -->
      <div class="card-text border-underline mt-3">
        <span class="payment-details-heading" @click="redeemGiftCard">
          <span class="d-flex">
            {{ $t('preferences.payments.redeem_a_gift_card') }}
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
          {{ $t('preferences.payments.got_gift_card') }}
        </p>
      </div>
      <!-- card payments -->

      <!-- gift card -->
      <div class="card-text mt-3">
        <span class="payment-details-heading">
          <span class="d-flex">
            {{ $t('preferences.payments.purchase_a_gift_card') }}
            <span role="button" class="forward-btn  position-absolute">
              <img
                :src="require('~/assets/img/icons/right-arrow.svg')"
                class="float-right d-flex"
                alt="right arrow"
              />
            </span>
          </span>
        </span>
        <p class="payment-details-sub-heading mt-2 d-flex">
          {{ $t('preferences.payments.purchase_gift_card_caption') }}
        </p>
      </div>
      <!-- gift card -->
    </b-card>
    <!--show success alert after saving the card-->
    <TransparentAlertModal
      id="update-profile-success"
      :text="$t('preferences.payments.gift_card_success_alert')"
      :show="showAlert"
      @hide="listenModalClose"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import emitEvent from '~/plugins/mixins/emit-event'
import TransparentAlertModal from '~/components/common/TransparentAlertModal.vue'
export default {
  name: 'GiftCardMethod',

  components: {
    TransparentAlertModal,
  },

  mixins: [screenSize, emitEvent],
  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      showAlert: false,
      showPinNumber: false,
      swap: false
    }
  },

  computed: {
    ...mapGetters({
      giftCardRedeemed: 'preferences/giftCardRedeemed',
      redeemSuccess: 'preferences/getRedeemSuccess',
      successAlert: 'preferences/giftCardSuccessAlert',
    }),

    ...mapActions({
      giftCardSuccessAlert: 'preferences/giftCardSuccessAlert',
    }),

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    giftCardImage: (vm) => {
      return require(`~/assets/img/preferences/giftcard/${vm.redeemSuccess.card.image_name}`)
      // return require('~/assets/img/preferences/gift-card-4.png')
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    remainingBalance: (vm) => {
      return vm.redeemSuccess.remaining_amount
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    cardCode: (vm) => {
      return vm.redeemSuccess.giftcard_number
    },

    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    pin: (vm) => {
      return vm.redeemSuccess.pin
    },
  },

  created() {
    this.showAlert = this.successAlert === true
  },

  methods: {
    redeemGiftCard() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.ResponsiveRedeemGiftCard.name
      )
    },

    purchaseGiftCard() {
      this.$store.dispatch('preferences/changeHeaderVisibility', false)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.ResponsivePurchaseGiftCard.name
      )
    },

    listenModalClose() {
      this.showAlert = false
    },

    viewPin() {
      this.showPinNumber = !this.showPinNumber
    },

    // back to previous page
    backTo() {
      this.$store.dispatch('preferences/changeHeaderVisibility', true)
      this.emitRenderComponentEvent(
        this.$parent.$options.components.PaymentComponent.name
      )
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.profile-component-wrapper
  .payment-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-4-medium
    color: $color-blue-20

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

  .ds-wallet-title
    width: 89px
    font-family: $font-sp-pro
    font-style: normal
    @include body-34-medium
    letter-spacing: -0.02em
    color: $color-black-1

  .card-details
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-regular
    letter-spacing: 0.02em
    color: $color-black-1

  .card-remain
    font-family: $font-sf-pro-text
    font-style: normal
    @include body-13-medium
    color: $color-black-1

  .card-detail-link
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-normal
    letter-spacing: 0.02em
    color: $color-blue-30

  .card-image
    width: 240px
    height: 150px
  .more-info-icon
    right: 3.5rem
    top: 7.5rem
</style>