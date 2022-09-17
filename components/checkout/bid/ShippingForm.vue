<template>
  <b-col md="3">
    <OrderTitle
      back-link
      :title="$t('shopping_cart.shipping_address')"
      @click="emitRenderComponentEvent($parent.$options.components.OrderSummary.name)"
    />

    <AddressForm
      :address="shippingAddress"
      :action-text="$t('shopping_cart.proceed_to_payment').toString()"
      @submit="handleSubmit"
    />
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import AddressForm from '~/components/checkout/common/AddressForm'
import { ADDRESS_TYPE_SHIPPING } from '~/static/constants'

export default {
  name: 'ShippingForm',
  components: { OrderTitle, AddressForm },
  mixins: [ emitEvent ],
  computed: {
    ...mapGetters({
      shippingAddress: 'auth/getShippingAddress',
    }),
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress'
    }),
    handleSubmit(form) {
      // Update current address which is being edited.
      this.updateAddress({
        addressForm: form,
        addressType: ADDRESS_TYPE_SHIPPING
      })

      this.emitRenderComponentEvent(
        this.$parent.$options.components.PaymentOption.name
      )
    }
  }
}
</script>
