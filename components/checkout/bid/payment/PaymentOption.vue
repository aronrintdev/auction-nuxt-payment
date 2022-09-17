<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.payment_information')"
      @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
    /><!-- End of Order Title -->

    <!-- Card Payment Radio Option -->
    <RadioOptionCard
      class="mt-4"
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

    <!-- Installment Plans Title -->
    <b-row class="mt-4">
      <b-col md="12">
        <div class="body-2-medium">
          {{ $t('shopping_cart.installment_plans') }}
        </div>
      </b-col> </b-row
    ><!-- End of Installment Plans Title -->

    <!-- AfterPay Radio Option TODO: Temporarily disabled until implemented -->
    <RadioOptionCard
      class="mt-3"
      disabled
      :name="'payment-option'"
      :value="'PaymentAfterPay'"
      :image-urls="'afterpay-logo.png'"
      :text="$t('shopping_cart.afterpay').toString()"
      @change="handleChange"
    />
    <!-- End of AfterPay Radio Option -->

    <!-- Affirm Radio Option -->
    <RadioOptionCard
      :name="'payment-option'"
      :value="'PaymentAffirm'"
      :image-urls="'affirm-logo.png'"
      :text="$t('shopping_cart.affirm').toString()"
      @change="handleChange"
    />
    <!-- End of Affirm Radio Option -->
  </b-col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import shoppingCartMixin from '~/plugins/mixins/shopping-cart'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'

export default {
  name: 'PaymentOption',
  components: { RadioOptionCard, OrderTitle },
  mixins: [shoppingCartMixin],
  data() {
    return {
      cardOption: {
        name: 'payment-option',
        value: 'PaymentCard',
        imageUrls: [
          'visa-logo.png',
          'mastercard-logo.png',
          'amex-logo.png',
          'jcb-logo.png',
        ],
        text: this.$t('shopping_cart.card_payment')
      },
      giftCardOption: {
        name: 'payment-option',
        value: 'PaymentGiftCard',
        imageUrls: 'deadstock-logo.png',
        text: this.$t('shopping_cart.gift_card')
      },
      cryptoOptions: [
        {
          name: 'payment-option',
          value: 'btc',
          imageUrls: 'btc-logo.png',
          text: this.$t('shopping_cart.bitcoin')
        },
        {
          name: 'payment-option',
          value: 'eth',
          imageUrls: 'eth-logo.png',
          text: this.$t('shopping_cart.ethereum')
        },
        {
          name: 'payment-option',
          value: 'bnbbsc',
          imageUrls: 'bnbbsc-logo.png',
          text: this.$t('shopping_cart.binance_coin')
        },
        {
          name: 'payment-option',
          value: 'vet',
          imageUrls: 'vet-logo.png',
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
