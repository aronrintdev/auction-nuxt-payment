<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.add_card_payment')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="handleBackClick"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Payment Details Field -->
      <b-row class="payment-details-wrapper" @click="emitRenderComponentEvent($parent.$options.components.PaymentCard.name)">
        <b-col cols="3" sm="3">
          <b-img :src="getCardBrandLogo" height="12" />
        </b-col>
        <b-col cols="3" sm="3" class="text-center">
          <span class="ml-1">{{ paymentMethod.cardLastDigits }}</span>
        </b-col>
        <b-col cols="3" sm="3" class="text-center">
          <span class="ml-1">{{ paymentMethod.cardExpiryDate }}</span>
        </b-col>
        <b-col cols="3" sm="3" class="text-right">
          <CameraGraySVG />
        </b-col>
      </b-row>
      <!-- End of Payment Details Field -->

      <!-- Billing Form Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.add_billing_address')"
        text-center
        class="billing-title"
      />
      <!-- End of Billing Form Title -->

      <AddressForm
        :address="billingAddress"
        :action-text="$t('shopping_cart.add_billing_address').toString()"
        use-as-shipping
        @submit="handleFormSubmit"
      />
    </b-col>
  </b-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import CameraGraySVG from '~/assets/img/shopping-cart/camera-gray.svg?inline'
import AddressForm from '~/components/checkout/selling/mobile/AddressForm'
import { ADDRESS_TYPE_BILLING, ADDRESS_TYPE_SHIPPING } from '~/static/constants'

export default {
  name: 'BillingForm',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, CameraGraySVG, AddressForm },
  mixins: [ emitEventMixin ],
  computed: {
    ...mapGetters({
      paymentMethod: 'auth/getPaymentMethod',
      billingAddress: 'auth/getBillingAddress',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getCardBrandLogo(vm) {
      try {
        return require(`~/assets/img/shopping-cart/${vm.cardBrand}-logo.png`)
      } catch (error) {
        return require('~/assets/img/shopping-cart/visa-logo.png')
      }
    },
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip',
    }),
    handleBackClick() {
      if ('PaymentOptionsMenu' in this.$parent.$options.components) {
        this.emitRenderComponentEvent(this.$parent.$options.components.PaymentOptionsMenu.name)
      } else {
        this.emitRenderComponentEvent(this.$parent.$options.components.CheckoutSummary.name)
      }
    },
    handleFormSubmit(form) {
      // Update the shipping address in the case were this is the billing address being edited. (Only if "Use as Shipping" is checked)
      if (form.inputForShipping) {
        this.updateAddress({
          addressForm: form,
          addressType: ADDRESS_TYPE_SHIPPING,
        })
      }
      // Update current address which is being edited.
      this.updateAddress({
        addressForm: form,
        addressType: ADDRESS_TYPE_BILLING
      })

      // Retrieve the user's tax rate according to the billing address zip code.
      this.getTaxRateByZip({ zip: form.inputZipCode })

      this.emitRenderComponentEvent(
        this.$parent.$options.components.CheckoutSummary.name,
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.payment-details-wrapper
  padding: 10px
  min-height: 38px
  margin: 26px 18px 0
  background: $color-white-5
  border-radius: 0.5rem
  @include body-5-regular
  color: $black-1

.billing-title
  &.title-wrapper
    margin-top: 36px

</style>
