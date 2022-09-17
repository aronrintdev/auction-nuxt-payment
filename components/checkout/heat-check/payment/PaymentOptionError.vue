<template>
  <!-- Shopping Cart Order Summary -->
  <b-col md="3">
    <OrderTitle class="text-danger" :title="$t('shopping_cart.error')" />

    <!-- Shopping Cart Order Error Text -->
    <b-row class="mt-4">
      <b-col md="10">
        <div class="body-5-regular">
          {{ $t('shopping_cart.payment_method_card_error') }}
        </div>
      </b-col> </b-row
    ><!-- End of Shopping Cart Order Error Text -->

    <!-- Shopping Cart Billing Address -->
    <b-row class="mt-4 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.billing_address') }}&colon;
        </div>
      </b-col>
    </b-row>
    <AddressCard
      editable
      :full-address="getBillingAddress"
      :full-name="getBillingFullName"
      @edit="
        emitRenderComponentEvent($parent.$options.components.BillingForm.name)
      "
    />
    <!-- End of Shopping Cart Billing Address -->

    <!-- Shopping Cart Payment Details -->
    <b-row class="mt-4 mb-2">
      <b-col md="12">
        <div class="body-4-medium">
          {{ $t('shopping_cart.payment') }}&colon;
        </div>
      </b-col>
    </b-row>
    <PaymentCardDetailsCard
      editable
      :card-last-digits="paymentMethod.cardLastDigits"
      :card-expiry-date="paymentMethod.cardExpiryDate"
      :card-brand="paymentMethod.cardBrand"
      @edit="
        emitRenderComponentEvent($parent.$options.components.PaymentOption.name)
      "
    />
    <!-- End of Shopping Cart Payment Details -->
  </b-col>
</template>

<script>
import { mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import AddressCard from '~/components/checkout/common/AddressCard'
import PaymentCardDetailsCard from '~/components/checkout/common/PaymentCardDetailsCard'
export default {
  name: 'PaymentOptionError',
  components: { OrderTitle, AddressCard, PaymentCardDetailsCard },
  mixins: [emitEvent],
  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
      paymentMethod: 'auth/getPaymentMethod',
    }),
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingFullName: (vm) => {
      return `${vm.billingAddress.firstName} ${vm.billingAddress.lastName}`
    },
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    getBillingAddress: (vm) => {
      return `${vm.billingAddress.addressLine}, ${vm.billingAddress.city}, ${vm.billingAddress.country}, ${vm.billingAddress.zipCode}`
    },
  },
}
</script>
