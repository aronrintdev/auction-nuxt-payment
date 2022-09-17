<template>
  <b-col md="3">
    <!-- Order Title -->
    <OrderTitle
      back-link
      :title="$t('shopping_cart.billing_information')"
      @click="
        emitRenderComponentEvent($parent.$options.components.OrderSummary.name)
      "
    /><!-- End of Order Title -->

    <!-- Base Form -->
    <AddressForm
      :address="billingAddress"
      :action-text="$t('shopping_cart.proceed_to_payment').toString()"
      @submit="handleSubmit"
    /><!-- End of Base Form -->
  </b-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import OrderTitle from '~/components/checkout/common/OrderTitle'
import AddressForm from '~/components/checkout/common/AddressForm'
import { ADDRESS_TYPE_BILLING } from '~/static/constants'
export default {
  name: 'BillingForm',
  components: { OrderTitle, AddressForm },
  mixins: [emitEvent],
  data() {
    return {
      sku: '',
    }
  },
  computed: {
    ...mapGetters({
      billingAddress: 'auth/getBillingAddress',
    }),
  },
  mounted() {
    if (this.$route.query.sku !== undefined) this.sku = this.$route.query.sku
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress',
    }),
    handleSubmit(form) {
      // Update current address which is being edited.
      this.updateAddress({
        addressForm: form,
        addressType: ADDRESS_TYPE_BILLING,
      })
      this.emitRenderComponentEvent(
        this.$parent.$options.components.PaymentOption.name
      )
    },
  },
}
</script>
