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
  </b-col>
</template>

<script>
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
    }
  },
  methods: {
    handleChange(value) {
      if (value === this.$parent.$options.components.PaymentCard.name) {
        this.emitRenderComponentEvent(value)
      }
    }
  }
}
</script>
