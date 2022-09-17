<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.payment_information')"
      @click="emitRenderComponentEvent($parent.$options.components.PaymentOption.name)"
    /><!-- End of Order Title -->

    <!-- Gift Card Radio Option -->
    <RadioOptionCard
      class="mt-3"
      :name="giftCardOption.name"
      :checked="giftCardOption.checked"
      :value="giftCardOption.value"
      :text="giftCardOption.text"
      :image-urls="giftCardOption.imageUrls"
    />
    <!-- End of Gift Card Radio Option -->

    <RedeemGiftCardForm
      v-if="! appliedGiftCard"
      @gift-card-applied="handleGiftCardApplied"
    />

    <SelectGiftCardAmountForm
      v-else
      :applied-gift-card="appliedGiftCard"
      @gift-card-selected="handleGiftCardSelected"
    />
  </b-col>
</template>

<script>
import { mapActions } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import RadioOptionCard from '~/components/checkout/common/RadioOptionCard'
import RedeemGiftCardForm from '~/components/checkout/common/RedeemGiftCardForm'
import SelectGiftCardAmountForm from '~/components/checkout/common/SelectGiftCardAmountForm'

export default {
  name: 'PaymentGiftCard',
  components: {
    OrderTitle,
    RadioOptionCard,
    RedeemGiftCardForm,
    SelectGiftCardAmountForm,
  },
  mixins: [emitEvent],
  data() {
    return {
      giftCardOption: {
        name: 'payment-option',
        value: 'PaymentGiftCard',
        checked: 'PaymentGiftCard',
        imageUrls: 'deadstock-logo.png',
        text: this.$t('shopping_cart.gift_card')
      },
      appliedGiftCard: false,
    }
  },
  methods: {
    ...mapActions({
      addGiftCard: 'order-details/addGiftCard'
    }),
    handleGiftCardApplied(giftCard) {
      this.appliedGiftCard = giftCard
    },
    handleGiftCardSelected(giftCard) {
      this.addGiftCard({
        giftCard,
      }).then(() => {
        this.$toasted.success(this.$t('shopping_cart.gift_card_applied').toString())
        this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOption.name)
      })
    }
  },
}
</script>
