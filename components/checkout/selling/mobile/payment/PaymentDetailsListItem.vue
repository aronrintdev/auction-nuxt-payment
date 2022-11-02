<template>
  <b-row>
    <b-col cols="12" sm="12">
      <b-row>
        <b-col cols="6" sm="6">
          <span class="text-black body-17-normal">{{ $t('shopping_cart.payment') }}</span>
        </b-col>

        <b-col v-if="! hasPaymentMethod" cols="6" sm="6" class="text-right">
          <span class="option-action text-blue-20 body-5-normal">{{ $t('shopping_cart.add_payment') }}</span>
          <ArrowRightBlackSVG />
        </b-col>

        <b-col v-if="hasCryptoPaymentMethod" cols="6" sm="6" class="text-right">
          <b-img class="option-action" :src="getCryptoLogo" alt="..." />
          <ArrowRightBlackSVG />
        </b-col>

        <b-col v-if="hasOnlyCardPaymentMethod" cols="6" sm="6" class="text-right">
          <b-img :src="getCardBrandLogo" alt="..." width="37" />
          <span class="option-action text-gray-25 body-5-normal">{{ paymentMethod.cardLastDigits }}</span>
          <ArrowRightBlackSVG />
        </b-col>

        <b-col v-if="hasGiftCardFullAmountApplied" cols="6" sm="6" class="text-right" :class="{ 'offset-6 offset-sm-6 no-arrow': ! hasOnlyGiftCardApplied }">
          <b-img :src="require('~/assets/img/preferences/giftcard/GiftCard_1.png')" alt="..." width="34" />
          <span class="option-action text-gray-25 body-5-normal">{{ $t('shopping_cart.gift_card') }}</span>
          <ArrowRightBlackSVG v-if="hasOnlyGiftCardApplied" />
        </b-col>
      </b-row>

      <b-row v-if="hasPartialGiftCardAmountApplied">
        <b-col cols="8" sm="8">
          <span class="body-5-regular text-gray-25">{{ $t('shopping_cart.remaining_amount_due') }}&colon;</span>
        </b-col>
        <b-col cols="4" sm="4" class="text-right no-arrow">
          <span class="body-5-regular text-gray-25 option-action">{{ giftCard.remainingAmount | toCurrency }}</span>
        </b-col>
      </b-row>

      <b-row v-if="hasOnlyGiftCardApplied" :class="{ 'mt-1': hasGiftCardFullAmountApplied }">
        <b-col cols="12" sm="12">
          <div class="body-5-regular text-red-3">{{ $t('shopping_cart.add_payment_method') }}</div>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import  { mapGetters } from 'vuex'
import ArrowRightBlackSVG from '~/assets/img/shopping-cart/arrow-right-black.svg?inline'

export default {
  name: 'PaymentDetailsListItem',
  components: { ArrowRightBlackSVG },
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod',
      giftCard: 'order-details/getGiftCard',
      installmentPlans: 'order-details/getInstallmentDetails',
      cryptoDetails: 'order-details/getCryptoDetails',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCardBrandLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.cardBrand}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCryptoLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.cryptoDetails.currency}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    },
    hasPaymentMethod(vm) {
      return vm.paymentMethod || vm.cryptoDetails.amount || vm.giftCard
    },
    hasOnlyCardPaymentMethod(vm) {
      return vm.paymentMethod && ! vm.cryptoDetails.amount
    },
    hasCryptoPaymentMethod(vm) {
      return vm.cryptoDetails.amount
    },
    hasOnlyGiftCardApplied(vm) {
      return ! vm.paymentMethod && ! vm.cryptoDetails.amount && vm.giftCard
    },
    hasGiftCardFullAmountApplied(vm) {
      return vm.giftCard
    },
    hasPartialGiftCardAmountApplied(vm) {
      return vm.giftCard.remainingAmount
    }
  }
}
</script>

<style lang="sass" scoped>
.option-action
  margin-right: 29px
  margin-left: 8px

.no-arrow
  span
    margin-right: 41px
</style>
