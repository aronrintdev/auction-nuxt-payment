<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="shippingFormText"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.CheckoutSummary.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <AddressForm
        :address="shippingAddress"
        :action-text="shippingFormText"
        @submit="handleFormSubmit"
      />
    </b-col>
  </b-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import ShoppingBagTitle from '~/components/checkout/common/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import AddressForm from '~/components/checkout/common/mobile/AddressForm'
import { ADDRESS_TYPE_SHIPPING } from '~/static/constants'

export default {
  name: 'ShippingForm',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, AddressForm },
  mixins: [ emitEventMixin ],
  computed: {
    ...mapGetters({
      shippingAddress: 'auth/getShippingAddress',
    }),
    shippingFormText(vm) {
      if (vm.shippingAddress) {
        return this.$t('shopping_cart.edit_shipping_address')
      }

      return this.$t('shopping_cart.add_shipping_address')
    },
  },
  methods: {
    ...mapActions({
      updateAddress: 'auth/updateAddress',
    }),
    handleFormSubmit(form) {
      this.updateAddress({
        addressForm: form,
        addressType: ADDRESS_TYPE_SHIPPING,
      })
      this.emitRenderComponentEvent(this.$parent.$options.components.CheckoutSummary.name)
    }
  }
}
</script>

<style lang="sass" scoped>
.address-form
  margin-top: 28px
</style>
