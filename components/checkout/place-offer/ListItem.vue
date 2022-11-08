<template>
  <!-- Shopping Cart List Item -->
  <b-row  class="mt-4">
    <b-col  md="6">
      <b-row v-if="product">
        <b-col md="3">
          <b-img
            class="custom-thumbnail"
            :src="product.image"
            :alt="$t('shopping_cart.product_image')"
          ></b-img>
        </b-col>
        <b-col md="9" class="pl-3">
          <b-row class="mb-2 d-block">
            <div class="body-4-bold mb-2">{{ product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }} &nbsp;
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorway
              }} &nbsp;
              {{ $tc('common.size', 1) }}&colon;&nbsp;{{ size.size }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('common.box_condition') }}&colon;&nbsp;{{
                packagingCondition.name
              }} &nbsp;
            </div>
          </b-row>
          <b-row class="d-inline">
            <b-btn
              class="custom-link pl-0"
              variant="link"
              @click="removeItem"
              >{{ $t('place_offer.remove') }}</b-btn
            >
            <b-btn
              class="custom-link pl-0"
              variant="link"
              @click="saveForLater"
              >{{ $t('place_offer.save_for_later') }}</b-btn
            >
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="6">
      <b-row class="justify-content-center">
        <b-col>
          <div class="text-center">
            <div class="body-4-bold">{{ itemQuantity }}</div>
          </div>
        </b-col>
        <b-col>
          <div class="text-center">
            <div class="body-4-bold">{{ expiry }}</div>
          </div>
        </b-col>
        <b-col>
          <div class="text-center">
            <div class="body-4-bold">{{ offerAmount | toCurrency('USD', 'N/A') }}</div>
          </div>
        </b-col>
      </b-row>
    </b-col>
  </b-row
  ><!-- End of Shopping Cart List Item -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ListItem',

  data() {
    return {
      expiryDate: 5, // TODO: Offer Expiry
    }
  },

  computed: {
    ...mapGetters({
      getOfferDetails: 'offer/getOfferDetails',
    }),

    product: (vm) => {
      return vm.getOfferDetails.product
    },

    size: (vm) => {
      const size = vm.product.sizes.filter(
        (i) => i.id === vm.getOfferDetails.size_id
      )
      return size[0]
    },

    packagingCondition: (vm) => {
      const condition = vm.product.packaging_conditions.filter(
        (i) =>  i.id === vm.getOfferDetails.packaging_condition_id
      )
      return condition[0]
    },

    expiry: (vm) => {
      return `${vm.expiryDate} ${vm.$tc('place_offer.days', 1)}`
    },

    itemQuantity: (vm) => {
      return vm.getOfferDetails.quantity
    },

    offerAmount: (vm) => {
      return vm.getOfferDetails.bid_price
    }
  },

  methods: {
    ...mapActions({
      storeOfferDetails: 'offer/storeOfferDetails'
    }),
    // Remove Item and redirectback
    removeItem(){
      this.storeOfferDetails({})
      this.$router.push(this.$nuxt.context.from)
    },
    // On save for later click
    saveForLater(){
      this.$router.push(this.$nuxt.context.from)
    }
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

/* Quantity controls (plus and minus incrementer) styles */
.quantity-control
  &:hover,
  &:focus
    color: $color-gray-4
    cursor: pointer
    user-select: none

/* Quantity indicator styles */
.quantity-indicator
  &.form-control
    background: $white
    border: 1px solid $color-gray-4
    border-radius: 0.25rem
    position: absolute
    right: 0
    top: -0.6rem
    @include body-4-bold
    &:focus
      border: 1px solid $color-gray-4
      border-radius: 0.25rem
</style>
