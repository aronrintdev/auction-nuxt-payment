<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.billing_information')"
      @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
    /><!-- End of Order Title -->

    <!-- Base Form -->
    <AddressForm
      :address="billingAddress"
      :action-text="$t('shopping_cart.proceed_to_shipping').toString()"
      :password-field="! authenticated"
      use-as-shipping
      @submit="handleSubmit"
      @login="emitRenderComponentEvent($parent.$options.components.LoginForm.name)"
    /><!-- End of Base Form -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import AddressForm from '~/components/checkout/common/AddressForm'
import { ADDRESS_TYPE_BILLING, ADDRESS_TYPE_SHIPPING} from '~/static/constants'

export default {
  name: 'BillingForm',
  components: { OrderTitle, AddressForm },
  mixins: [ emitEvent ],
  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
      authenticated: 'auth/authenticated',
    }),
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress',
      getTaxRateByZip: 'tax-rate/getTaxRateByZip'
    }),
    handleSubmit(form) {
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
          this.$parent.$options.components.ShippingForm.name,
        )
    }
  }
}
</script>
