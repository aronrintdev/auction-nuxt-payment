<template>
  <div class="card-payment">
    <client-only  v-if="isScreenXS">
      <Portal to="page-title"> {{ $t('giftcard_section.add_funds') }}</Portal>
      <Portal to="back-icon-slot"> 
        <img
          :src="require('~/assets/img/icons/back.svg')"
          alt="back-arrow"
          class="float-left"
          @click="$router.push(`/profile/preferences/giftcard/view-giftcard/add-funds/new-payment/${getSelectedGiftCard.id}`)"
        />
      </Portal>
    </client-only>

    <add-funds-component v-if="isScreenXS" :details="getSelectedGiftCard">
      <NewPaymentComponent  v-if="isScreenXS" />
    </add-funds-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import AddFundsComponent from '~/components/profile/preferences/ResponsiveGiftCardDetails/AddFunds/AddFundsComponent.vue'
import NewPaymentComponent from '~/components/profile/preferences/ResponsiveGiftCardDetails/AddFunds/NewPaymentComponent.vue'

export default {
  name: 'AddFundsCardPayment',

  components: {
    AddFundsComponent,
    NewPaymentComponent,
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      cardImage: '',
      cardOption: {
        name: 'payment-option',
        checked: 'PaymentCard',
        value: 'PaymentCard',
        imageUrls: [
          'visa-logo.png',
          'mastercard-logo.png',
          'amex-logo.png',
          'jcb-logo.png',
        ],
        text: this.$t('shopping_cart.card_payment'),
      }
    }
  },

  computed: {
    ...mapGetters({
      amount: 'preferences/getSelectedAmount',
      getSelectedGiftCard: 'preferences/getSelectedGiftCard',
    })
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.card-payment
  #radio-option-card::v-deep
    .custom-card
      background: $color-white-5
      border-radius: 4px
      width: 343px
      height: 49px
      .card-body
        padding: 16px 12px
        label
          font-family: $font-sp-pro
          font-style: normal
          @include body-5-normal
          letter-spacing: -0.02em
          color: $color-black-1
</style>