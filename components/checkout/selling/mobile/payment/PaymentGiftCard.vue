<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.add_gift_card')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.PaymentOptionsMenu.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <GiftCardDetailsForm v-if="! giftCard" @gift-card-found="handleGiftCardFound" />

      <GiftCardAmountForm v-else :selected-gift-card="giftCard" @gift-card-applied="handleGiftCardApplied" />
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import GiftCardDetailsForm from '~/components/checkout/selling/mobile/payment/GiftCardDetailsForm'
import GiftCardAmountForm from '~/components/checkout/selling/mobile/payment/GiftCardAmountForm'

export default {
  name: 'PaymentGiftCard',
  components: { GiftCardAmountForm, ShoppingBagTitle, ArrowLeftBlackSVG, GiftCardDetailsForm },
  mixins: [ emitEventMixin ],
  data() {
    return {
      giftCard: false
    }
  },
  methods: {
    ...mapActions({
      addGiftCard: 'order-details/addGiftCard'
    }),
    handleGiftCardFound(giftCard) {
      this.giftCard = giftCard
    },
    handleGiftCardApplied(giftCard) {
      this.addGiftCard({
        giftCard,
      }).then(() => {
        this.$toasted.success(this.$t('shopping_cart.gift_card_applied').toString())
        this.emitRenderComponentEvent(this.$parent.$options.components.CheckoutSummary.name)
      })
    }
  }
}
</script>
