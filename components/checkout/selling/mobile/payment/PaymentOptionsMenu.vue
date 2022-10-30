<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.add_payment_information')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.CheckoutSummary.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Payment Options List Items -->
      <b-row class="options-wrapper">
        <b-col cols="12" sm="12" class="px-0">
          <b-list-group>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.PaymentCard.name)">
              <div class="body-17-normal">{{ $t('shopping_cart.card_payment') }}</div>
            </b-list-group-item>
            <b-list-group-item @click="emitRenderComponentEvent($parent.$options.components.PaymentGiftCard.name)">
              <div class="body-17-normal">{{ $t('shopping_cart.gift_card') }}</div>
            </b-list-group-item>
            <b-list-group-item
              v-for="cryptoPaymentOption in cryptoPaymentOptions"
              :key="cryptoPaymentOption.currency"
              @click="handleCryptoPayment(cryptoPaymentOption.currency)"
            >
              <b-img :src="getImagUrl(cryptoPaymentOption.imageUrl)" />
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
      <!-- End of Payment Options List Items -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'

export default {
  name: 'PaymentOptionsMenu',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG },
  mixins: [ emitEventMixin],
  data() {
    return {
      cryptoPaymentOptions: [
        {
          imageUrl: 'bitcoin.png',
          currency: 'btc',
        },
        {
          imageUrl: 'ethereum.png',
          currency: 'eth',
        },
        {
          imageUrl: 'binance.png',
          currency: 'bnbbsc',
        },
        {
          imageUrl: 'vechain.png',
          currency: 'vet',
        },
      ]
    }
  },
  methods: {
    ...mapActions({
      addCryptoCurrency: 'order-details/addCryptoCurrency'
    }),
    getImagUrl(image) {
      return require(`~/assets/img/shopping-cart/${image}`)
    },
    handleCryptoPayment(currency) {
      this.addCryptoCurrency({
        cryptoCurrency: currency
      })
      this.emitRenderComponentEvent(this.$parent.$options.components.PaymentCrypto.name)
    },
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.options-wrapper
  margin: 12px 18px 0

  .list-group-item
    margin: 8px 0 0
    min-height: 60px
    width: 100%
    border: none
    background: $color-gray-81
    display: flex
    align-items: center
    justify-content: center

    &:first-child
      margin-top: 0

    &:last-child
      margin-bottom: 8px

    &:hover, &:active, &:focus
      background: $color-gray-23b
</style>
