<template>
  <b-container fluid>
    <Header />
    <b-row>
      <ItemsList :shopping-cart="shoppingCart" />
      <HeatcheckOrder class="order-summary" />
    </b-row>
  </b-container>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import Header from '~/components/Header'
import ItemsList from '~/pages/checkout/heat-check/itemsList'
import HeatcheckOrder from '~/components/checkout/heat-check/HeatcheckOrder'
export default {
  components: {
    Header,
    ItemsList,
    HeatcheckOrder,
  },
  data() {
    return {
      sku: null,
      shoppingCart: [],
    }
  },
  head() {
    return {
      title: this.$t('shopping_cart.shopping_cart'),
      script: [
        {
          src: process.env.GOOGLE_MAPS_BASE_URL,
          async: true,
          preload: true,
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      products: 'order-details/getProducts',
    }),
  },
  mounted() {
    this.sku = this.$route.query.sku
    this.productDetails()
    this.setShoppingType('heat-check')
  },
  methods: {
    ...mapActions({
      setShoppingType: 'shopping-cart/setType',
      getShoppingCart: 'shopping-cart/setType',
      removeProducts: 'shopping-cart/removeProducts',
    }),
    productDetails() {
      this.shoppingCart.push(this.products[0])
    },
  },
}
</script>
