<template>
  <div class="your-address-page">
    <div class="address-content p-4">
      <b-card class="mt-3 address-card">
        <!-- Your address -->
        <div class="card-text border-underline">
          <span class="your-address-heading d-flex align-items-center">
            {{ $t('preferences.profile.your_addresses') }}
          </span>
          <p class="sub-text d-flex align-items-center mt-2">
            {{ $t('preferences.profile.update_shipping_billing') }}
          </p>
        </div>
        <hr />
        <!-- Your address ends here -->
        <!-- address -->
        <div class="card-text border-underline mt-3">
          <span
            class="personal-details-heading"
            @click="viewAddress('shipping')"
          >
            <span class="d-flex justify-content-between">
              <span class="heading-text d-flex align-items-center">{{
                $t('preferences.profile.shipping_address')
              }}</span>

              <span role="button" class="forward-btn">
                <img
                  :src="require('~/assets/img/icons/right-arrow.svg')"
                  class="float-right d-flex img-fluid"
                  alt="right arrow"
                />
              </span>
            </span>
          </span>
          <div v-if="!shipping" class="heading-subtext mt-2 d-flex align-items-center">
            {{ $t('preferences.profile.add_shippingaddress') }}
          </div>
          <div v-if="shipping" class="heading-subtext mt-2 d-flex">
            <span v-if="shipping.is_default === 1">
              {{ $t('preferences.common.default') }}&colon;&nbsp;
            </span>
            {{ shipping.address_line_1 }}
            {{ shipping.address_line_2 }}
            {{ shipping.city }}
            {{ shipping.state }}
            {{ shipping.country }}
            {{ shipping.zip }}

          </div>
        </div>
        <hr />
        <!-- address -->

        <!-- address -->
        <div class="card-text border-underline mt-3">
          <span
            class="personal-details-heading"
            @click="viewAddress('billing')"
          >
            <span class="d-flex justify-content-between">
              <span class="heading-text">{{
                $t('preferences.profile.billing_address')
              }}</span>

              <span role="button" class="forward-btn">
                <img
                  :src="require('~/assets/img/icons/right-arrow.svg')"
                  class="float-right d-flex img-fluid"
                  alt="right arrow"
                />
              </span>
            </span>
          </span>
           <div v-if="!billing" class="heading-subtext mt-2 d-flex">
            {{ $t('preferences.profile.add_billingaddress') }}
          </div>
          <div v-if="billing" class="heading-subtext mt-2 d-flex">
            <span v-if="billing.is_default === 1">
              {{ $t('preferences.common.default') }}&colon;&nbsp;
            </span>
            {{ billing.address_line_1 }},
            {{ billing.address_line_2 }},
            {{ billing.city }},
            {{ billing.state }},
            {{ billing.country }},
            {{ billing.zip }}

          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import emitEvent from '~/plugins/mixins/emit-event'
import {
  SHIPPING, BILLING
} from '~/static/constants'
export default {
  name: 'YourAddress',

  mixins: [emitEvent],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      shippingVal: SHIPPING,
      billingVal: BILLING
    }
  },

  computed: {
    ...mapGetters({
      shippingAddress: 'auth/getShippingAddresses',
      billingAddress: 'auth/getBillingAddresses',

      defaultShipping: 'auth/getShippingAddress',
      defaultBilling: 'auth/getBillingAddress',
    }),

    billing: (vm) => {
      if (vm.billingAddress && vm.billingAddress.length) {
        const defaultAddress = vm.billingAddress.filter(
          (i) => i.is_default === 1
        )
        if (defaultAddress && defaultAddress.length) {
          return defaultAddress[0]
        } else {
          return vm.billingAddress[0]
        }
      } else {
        return false
      }
    },
    shipping: (vm) => {
      if (vm.shippingAddress && vm.shippingAddress.length) {
        const defaultAddress = vm.shippingAddress.filter(
          (i) => i.is_default === 1
        )
        if (defaultAddress && defaultAddress.length) {
          return defaultAddress[0]
        } else {
          return vm.shippingAddress[0]
        }
      } else {
        return false
      }
    },
  },

  created() {
    this.$auth.fetchUser()
    this.billingAddresses()
    this.shippingAddresses()
  },

  mounted() {
    if(this.$auth.$storage.getState('updateConfirm') && this.$auth.$storage.getState('loadAddressForm')){
      this.$auth.$storage.removeState('loadAddressForm')
      this.emitRenderComponentEvent(this.$parent.$options.components.AddressForm.name)
    }
  },

  methods: {
    ...mapActions({
      billingAddresses: 'auth/billingAddresses',
      shippingAddresses: 'auth/shippingAddresses',
      saveAddressType: 'preferences/saveSelectedAddressType',
    }),

    viewAddress(type) {
      this.saveAddressType(type)
      if (type === this.shippingVal) {
        if (this.shippingAddress && !this.shippingAddress.length) {
          this.$store.dispatch('preferences/actionType', 'add')
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressForm.name
          )
        } else {
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressList.name
          )
        }
      }

      if (type === this.billingVal) {
        if (this.billingAddress && !this.billingAddress.length) {
           this.$store.dispatch('preferences/actionType', 'add')
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressForm.name
          )
        } else {
          this.emitRenderComponentEvent(
            this.$parent.$options.components.AddressList.name
          )
        }
      }
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.your-address-page
  .address-content
    margin-bottom: 50%
  .address-card::v-deep
    .card-body
      height: 241px
      left: 16px
      top: 115px
      background: $color-white-1
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 10px
  .your-address-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    letter-spacing: 0.02em
    color: $color-blue-20
  .sub-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17
  .heading-text
    font-family: $font-sp-pro
    font-style: normal
    @include body-5-medium
    color: $color-black-1
  .heading-subtext
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-regular
    color: $color-black-17
</style>
