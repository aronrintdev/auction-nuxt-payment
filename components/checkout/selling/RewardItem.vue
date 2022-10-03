<template>
  <!-- Shopping Cart Reward Item -->
  <b-row class="mt-4">
  <b-col md="6">
    <b-row>
      <b-col md="3">
        <b-img
          class="custom-thumbnail"
          :src="product.image"
          :alt="$t('shopping_cart.product_image')"
          @click="showModal"
        ></b-img>
      </b-col>
      <b-col md="9" class="pl-3">
        <b-row class="mb-2 d-block">
          <div class="body-4-bold mb-2">{{ product.name }}</div>
          <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
            {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }} &nbsp;
            {{ $tc('common.size', 1) }}&colon;&nbsp;{{ product.size }}
          </div>
          <div class="body-4-normal mb-2 text-gray-6">
            {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
              product.colorWay
            }}
          </div>
        </b-row>
        <b-row class="d-inline">
          <b-btn
            class="custom-link pl-0"
            variant="link"
            @click="clearReward"
          >{{ $t('shopping_cart.remove') }}</b-btn
          >
        </b-row>
      </b-col>
    </b-row>
  </b-col>
  <b-col md="6">
    <b-row>
      <b-col md="4">
        <b-row>
          <b-col md="12" class="text-center">
            <span class="body-4-bold">{{ product.quantity }}</span>
          </b-col>
        </b-row>
      </b-col>
      <b-col md="4" class="text-center">
        <div class="body-4-bold text-color-gray-47 text-decoration-line-through">
          &dollar;{{ product.price | formatPrice }}
        </div>
        <div class="body-4-bold text-color-gray-47 mt-2">
          &dollar;{{ 0.00 | formatPrice }}
        </div>
      </b-col>
      <b-col md="4" class="text-center">
        <div class="body-4-bold text-color-gray-47 text-decoration-line-through">&dollar;{{ product.price | formatPrice }}</div>
        <div class="body-4-bold text-color-gray-47 mt-2">&dollar;{{ 0.00 | formatPrice }}</div>
      </b-col>
    </b-row>
  </b-col> </b-row
  ><!-- End of Shopping Cart Reward Item -->
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'RewardItem',
  props: {
    product: {
      type: [Object, Array],
      default: () => {
        return {}|[]
      },
      required: true
    },
  },
  methods: {
    ...mapActions({
      removeRedeemedReward: 'redeemed-reward/removeRedeemedReward'
    }),
    showModal() {
      this.$root.$emit('showModal', this.product)
      this.$bvModal.show('shopping-cart-list-item-modal')
    },
    clearReward() {
      this.removeRedeemedReward()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.text-decoration-line-through
  text-decoration: line-through

.text-color-gray-47
  color: $color-gray-47

</style>
