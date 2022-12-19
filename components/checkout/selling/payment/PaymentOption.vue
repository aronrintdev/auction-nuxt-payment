<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.payment_information')"
      class="section-title"
      @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
    /><!-- End of Order Title -->

    <!-- Card Payment Radio Option -->
    <RadioOptionCard
      :name="cardOption.name"
      :value="cardOption.value"
      :image-urls="cardOption.imageUrls"
      :text="cardOption.text"
      @change="handleChange"
    />
    <!-- Card Payment Radio Option -->

    <!-- Gift Card Radio Option -->
    <RadioOptionCard
      v-if="! giftCard"
      :name="giftCardOption.name"
      :value="giftCardOption.value"
      :image-urls="giftCardOption.imageUrls"
      :text="giftCardOption.text"
      @change="handleChange"
    />
    <!-- End of Gift Card Radio Option -->

    <!-- Installment Plans Title -->
    <b-row class="option-group-title-wrapper">
      <b-col md="12">
        <div class="body-2-medium">
          {{ $t('shopping_cart.installment_plans') }}
        </div>
      </b-col> </b-row
    ><!-- End of Installment Plans Title -->

    <!-- AfterPay Radio Option TODO: Temporarily disabled until implemented -->
    <RadioOptionCard
      disabled
      :name="'payment-option'"
      :value="'PaymentAfterPay'"
      :image-urls="'afterpay.svg'"
      :text="$t('shopping_cart.afterpay').toString()"
      @change="handleChange"
    />
    <!-- End of AfterPay Radio Option -->

    <!-- Affirm Radio Option -->
    <RadioOptionCard
      :name="'payment-option'"
      :value="'PaymentAffirm'"
      :image-urls="'affirm.svg'"
      :text="$t('shopping_cart.affirm').toString()"
      @change="handleChange"
    />
    <!-- End of Affirm Radio Option -->

    <!-- Crypto Title -->
    <b-row class="option-group-title-wrapper">
      <b-col md="12">
        <div class="body-2-medium">
          {{ $t('shopping_cart.crypto') }}
        </div>
      </b-col> </b-row
    ><!-- End of Crypto Title -->

    <!-- Crypto Currency Radio Options -->
    <RadioOptionCard
      v-for="cryptoOption in cryptoOptions"
      :key="cryptoOption.value"
      :name="cryptoOption.name"
      :value="cryptoOption.value"
      :image-urls="cryptoOption.imageUrls"
      :text="cryptoOption.text"
      @change="handleChange"
    />
    <!-- End of Crypto Currency Radio Options -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'

export default {
  name: 'PaymentOption',
  components: { RadioOptionCard, OrderTitle },
  mixins: [ emitEventMixin ],
  data() {
    return {
      cardOption: {
        name: 'payment-option',
        value: 'PaymentCard',
        imageUrls: [
          'visa.svg',
          'mastercard.svg',
          'amex.svg',
          'jcb.svg',
        ],
        text: this.$t('shopping_cart.card_payment')
      },
      giftCardOption: {
        name: 'payment-option',
        value: 'PaymentGiftCard',
        imageUrls: 'deadstock-logo.svg',
        text: this.$t('shopping_cart.gift_card')
      },
      cryptoOptions: [
        {
          name: 'payment-option',
          value: 'btc',
          imageUrls: 'bitcoin.svg',
          text: this.$t('shopping_cart.bitcoin')
        },
        {
          name: 'payment-option',
          value: 'eth',
          imageUrls: 'ethereum.svg',
          text: this.$t('shopping_cart.ethereum')
        },
        {
          name: 'payment-option',
          value: 'bnbbsc',
          imageUrls: 'binance.svg',
          text: this.$t('shopping_cart.binance_coin')
        },
        {
          name: 'payment-option',
          value: 'vet',
          imageUrls: 'vechain.svg',
          text: this.$t('shopping_cart.vechain')
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      giftCard: 'order-details/getGiftCard',
    }),
  },
  methods: {
    ...mapActions({
      addCryptoCurrency: 'order-details/addCryptoCurrency'
    }),
    handleChange(value) {
      if (value === this.$parent.$options.components.PaymentCard.name
        || value === this.$parent.$options.components.PaymentGiftCard.name
        || value === this.$parent.$options.components.PaymentAffirm.name
      ) {
        this.emitRenderComponentEvent(value)

        return
      }

      this.addCryptoCurrency({
        cryptoCurrency: value
      })
      this.emitRenderComponentEvent(this.$parent.$options.components.PaymentCrypto.name)
    }
  }
}
</script>

<style scoped lang="sass">
@import '~/assets/css/_variables'

.section-title
  margin-bottom: 30px

.option-group-title-wrapper
  margin: 14px 0 20px
  font-family: $font-sp-pro
</style>
