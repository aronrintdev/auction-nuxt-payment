<template>
  <b-row>
    <b-col md="12">
      <b-row>
        <b-col md="8" offset-md="2" class="d-flex align-items-center">
          <span class="body-5-normal">
            {{ $t('products.pre_authenticated_ships_instantly') }}
          </span>

          <InstantShipSVG class="ml-1" />

          <span class="body-5-medium text-color-gray-5 ml-auto">{{ instantShipPrice | toCurrency }}</span>
          <b-form-checkbox
            v-model="shippingOption"
            :value="INSTANT_SHIPPING"
            inline
            class="ml-3"
            :unchecked-value="NORMAL_SHIPPING"
            @change="$emit('shipping-option-selected', shippingOption)"
          />
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col md="8" offset-md="2" class="d-flex align-items-center">
          <span class="body-5-normal">
            {{ $t('products.normal_authentication_and_shipping') }}
          </span>
          <span class="body-5-medium text-color-gray-5 ml-auto">{{ normalShipPrice | toCurrency}}</span>
          <b-form-checkbox
            v-model="shippingOption"
            inline
            :value="NORMAL_SHIPPING"
            class="ml-3"
            :unchecked-value="INSTANT_SHIPPING"
            @change="$emit('shipping-option-selected', shippingOption)"
          />
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import InstantShipSVG from '~/assets/img/product/instant-ship-icon.svg?inline'
import { NORMAL_SHIPPING, INSTANT_SHIPPING } from '~/static/constants'

export default {
  name: 'ShippingOptions',
  components: { InstantShipSVG },
  props: {
    normalShipPrice: {
      type: Number,
      default: 0,
    },
    instantShipPrice: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      shippingOption: '',
      NORMAL_SHIPPING,
      INSTANT_SHIPPING
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-color-gray-5
  color: $color-gray-5
</style>
