<template>
  <!-- List Item -->
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
          <div class="body-4-bold pull-right">
            &dollar;{{ total | formatPrice }}
          </div>
        </b-col>
      </b-row>
    </b-col> </b-row
  ><!-- End of List Item -->
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    total: (vm) => {
      return vm.product.price * vm.product.quantity
    },
  },
  methods: {
    showModal() {
      this.$root.$emit('showModal', this.product.id)
      this.$bvModal.show('shopping-cart-list-item-modal')
    },
  },
}
</script>
