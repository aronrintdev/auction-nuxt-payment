<template>
  <!-- Reward Item -->
  <b-row class="mt-5">
    <b-col md="8">
      <b-row>
        <b-col md="4">
          <b-img
            class="custom-thumbnail"
            :src="`${product.image}`"
            :alt="$t('shopping_cart.product_image')"
            @click="showModal"
          ></b-img>
        </b-col>
        <b-col md="8" class="pl-3">
          <b-row class="d-block mb-2">
            <div class="body-4-bold mb-2">{{ product.name }}</div>
            <div class="body-4-normal mb-2 text-gray-6 text-uppercase">
              {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ product.sku }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{
                product.colorWay
              }}
            </div>
            <div class="body-4-normal mb-2 text-gray-6">
              {{ $t('shopping_cart.box_condition') }}&colon;&nbsp;{{
                product.packaging_condition
              }}
            </div>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
    <b-col md="4">
      <b-row>
        <b-col md="6" class="text-center">
          <div class="body-4-bold">{{ product.quantity }}</div>
        </b-col>
        <b-col md="6">
          <b-row>
            <div class="body-4-bold ml-auto text-color-gray-47 text-decoration-line-through">&dollar;{{ product.price | formatPrice }}</div>
          </b-row>
          <b-row class="mt-2">
            <div class="body-4-bold ml-auto text-color-gray-47">&dollar;{{ 0.00 | formatPrice }}</div>
          </b-row>
        </b-col>
      </b-row>
    </b-col> </b-row
  ><!-- End of Reward Item -->
</template>

<script>
export default {
  name: 'RewardItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    showModal() {
      this.$root.$emit('showModal', this.product)
      this.$bvModal.show('shopping-cart-list-item-modal')
    }
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
