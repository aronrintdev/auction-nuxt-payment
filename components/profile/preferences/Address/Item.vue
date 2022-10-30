<template>
  <div class="shipping-address-list">
    <MobileHeader
      :title="$t('navbar.profile')"
      @back="$emit('moveBack')"
    ></MobileHeader>
    <div class="address-content-wrapper p-4">
      <b-card class="mt-3 address-card">
        <!-- Your address label -->
        <div class="card-text border-underline">
          <span class="your-address-heading d-flex align-items-center">
            {{ type === 'shipping' ?  $t('preferences.profile.shipping_address') : $t('preferences.profile.billing_address') }}
          </span>
        </div>
        <hr />
        <!-- Your address label ends here -->

        <!-- address -->
        <div v-for="(address, index) in data" :key="index" class="card-text border-underline mt-3" :class="addressLength !== index+1 && 'border-bottom'">
          <span
            role="button"
            class="personal-details-heading"
            @click="$emit('edit', address.id)"
          >
            <span class="d-flex justify-content-between">
              <span class="address-content d-flex align-items-center">
                {{ address.address_line_1 }}&#44;&nbsp;
                {{ address.address_line_2 }}&#44;&nbsp;
                {{ address.city }}&#44;&nbsp;
                {{ address.state }}&#44;&nbsp;
                {{ address.zip }}&#44;&nbsp;
                {{ address.country }}
              </span>

              <span role="button" class="forward-btn">
                <img
                  :src="require('~/assets/img/icons/right-arrow.svg')"
                  class="float-right d-flex img-fluid"
                  alt="right arrow"
                />
              </span>
            </span>
          </span>

          <p class="heading-subtext mt-2 d-flex">
            <b-badge v-if="defaultAddress && defaultAddress.id === address.id" class="default-badge d-flex align-items-center text-center justify-content-center"  variant="primary">{{ $t('preferences.common.default') }}</b-badge>
          </p>
        </div>


      </b-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MobileHeader from '~/components/mobile/MobileHeader.vue'
import emitEvent from '~/plugins/mixins/emit-event'

export default {
  name: 'Item',

  components: {
    MobileHeader
  },

  mixins: [emitEvent],

  props: {
    type: {
      type: String,
      required: true
    },

    data: {
      type: Array,
      default: () => []
    },

    defaultAddress: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    ...mapGetters({
      shippingAddresses: 'auth/getShippingAddresses'
    }),

    addressLength: (vm) => {
      return vm.data && vm.data.length
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.shipping-address-list
  .your-address-heading
    font-family: $font-sp-pro
    font-style: normal
    @include body-13-medium
    letter-spacing: 0.02em
    color: $color-blue-20
  .address-card
    background: $color-white-1
    box-shadow: 0px 1px 4px $color-black-rgb2
    border-radius: 10px
  .address-content
    font-family: $font-sp-pro
    font-style: normal
    @include body-21-normal
    width: 257px
    height: 32px
    color: $color-black-17
  .address-content-wrapper
    margin-bottom: 50%
  .default-badge::v-deep
    width: 61px
    height: 22px
    left: 33px
    top: 239px
    background: $color-blue-30
    border-radius: 4px
    font-family: $font-sp-pro
    font-style: normal
    @include body-6-medium
    color: $color-white-1
</style>