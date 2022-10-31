<template>
  <b-row>
    <b-col cols="12" sm="12" class="px-0">
      <!-- Top Title -->
      <ShoppingBagTitle
        :title="$t('shopping_cart.shipping_information')"
        text-center
        class="mt-0"
      >
        <template #back-arrow>
          <ArrowLeftBlackSVG class="back-arrow" @click="emitRenderComponentEvent($parent.$options.components.CheckoutSummary.name)"/>
        </template>
      </ShoppingBagTitle>
      <!-- End of Top Title -->

      <!-- Shipping Address Information -->
      <b-row class="shipping-address-wrapper">
        <b-col cols="8" sm="8" class="">
          <div class="body-5-bold">{{ $t('shopping_cart.shipping_address') }}</div>

          <b-form-checkbox
            v-model="shippingAddressChecked"
            class="mt-2"
          >
            <template #default>
              <span class="body-5-normal text-gray-25 ml-2">
                {{ getShippingFullName }}
              </span>
            </template>
          </b-form-checkbox>

          <div class="body-5-normal text-gray-25 shipping-address">{{ getShippingAddress }}</div>
          <div class="body-5-normal text-gray-25 shipping-address">{{ getShippingCity }}</div>
        </b-col>
        <b-col cols="4" sm="4" class="d-flex align-items-center justify-content-end" @click="emitRenderComponentEvent($parent.$options.components.ShippingForm.name)">
          <span class="body-5-normal text-black mr-1">{{ $t('shopping_cart.edit') }}</span>
          <PencilSquaredBlueSvg />
        </b-col>
      </b-row>
      <!-- End of Shipping Address Information -->

      <!-- Action Buttons -->
      <b-row class="btn-wrapper text-center">
        <b-col cols="12" sm="12">
          <Button type="submit" variant="dark-blue" pill @click="emitRenderComponentEvent($parent.$options.components.CheckoutSummary.name)">
            {{ $t('shopping_cart.continue') }}
          </Button>

          <Button type="submit" variant="dark-blue" pill @click="handleAddShippingAddress">
            {{ $t('shopping_cart.add_address') }}
          </Button>
        </b-col>
      </b-row>
      <!-- End of Action Buttons -->
    </b-col>
  </b-row>
</template>

<script>
import { mapActions } from 'vuex'
import emitEventMixin from '~/plugins/mixins/emit-event'
import shippingAddressMixin from '~/plugins/mixins/shipping-address'
import ShoppingBagTitle from '~/components/checkout/selling/mobile/ShoppingBagTitle'
import ArrowLeftBlackSVG from '~/assets/img/shopping-cart/arrow-left-black.svg?inline'
import PencilSquaredBlueSvg from '~/assets/img/icons/pencil_squared_blue.svg?inline'
import Button from '~/components/common/Button'

export default {
  name: 'ShippingInformation',
  components: { ShoppingBagTitle, ArrowLeftBlackSVG, PencilSquaredBlueSvg, Button },
  mixins: [ emitEventMixin, shippingAddressMixin ],
  data() {
    return {
      shippingAddressChecked: true,
    }
  },
  methods: {
    ...mapActions({
      removeShippingAddress: 'auth/removeShippingAddress'
    }),
    handleAddShippingAddress() {
      this.removeShippingAddress()
      this.emitRenderComponentEvent(this.$parent.$options.components.ShippingForm.name)
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.shipping-address-wrapper
  margin: 35px 0 0
  padding: 18px
  border-top: 1px solid $color-gray-23b
  border-bottom: 1px solid $color-gray-23b

  .shipping-address
    margin-left: 33px

.btn-wrapper
  margin: 30px 0

  button
    min-width: 216px
    min-height: 40px

    &:last-child
      margin: 8px 0 0
      background: $color-white-1
      color: $color-blue-20
</style>
