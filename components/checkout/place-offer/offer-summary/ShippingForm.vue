<template>
  <b-col md="3">
    <OrderTitle
      back-link
      :title="$t('shopping_cart.shipping_address')"
      @click="
        emitRenderComponentEvent($parent.$options.components.OfferSummary.name)
      "
    />

    <AddressForm
      :address="shippingAddress"
      :action-text="
        !paymentMethod
          ? $t('shopping_cart.proceed_to_payment').toString()
          : $t('place_offer.offer_summary').toString()
      "
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
  mixins: [emitEvent],
  computed: {
    ...mapGetters({
      shippingAddress: 'auth/getShippingAddress',
      paymentMethod: 'auth/getPaymentMethod',
    }),
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress',
    }),
    handleSubmit(form) {
      // Update current address which is being edited.
      this.updateAddress({
        addressForm: form,
        addressType: ADDRESS_TYPE_SHIPPING,
      })

      if (!this.paymentMethod) {
        this.emitRenderComponentEvent(
          this.$parent.$options.components.PaymentCard.name
        )
      } else {
        this.emitRenderComponentEvent(
          this.$parent.$options.components.OfferSummary.name
        )
      }
    },
  },
}
</script>
