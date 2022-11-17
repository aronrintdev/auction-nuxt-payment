<template>
  <b-container fluid class="w h-100" :class=" !isScreenXS ? 'container-profile-inventory-new' : 'p-4'">
    <div v-if="loading"><Loader /></div>
    <div v-else-if="product">
      <ProductView v-model="form" :product="product" @back="$router.push('/profile/inventory/search')">
        <InventoryNewForm slot="right-content"
          v-model="form"
          class="mb-sm-4"
          :is-form-valid="isFormValid"
          @submit="handleAddInventory"
        />
      </ProductView>
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import screenSize from '~/plugins/mixins/screenSize'

export default {
  name: 'ProfileInventoryNew',

  components: {
    Loader,
    InventoryNewForm,
    ProductView
  },

  mixins: [screenSize],

  layout: 'Profile',

  fetchOnServer: false,

  data() {
    return {
      loading: false,
      product: null,
      form: {
        currentSize: null,
        quantity: null,
        price: null,
        boxCondition: null,
      },
    }
  },

  async fetch() {
    const { sku } = this.$route.query

    this.loading = true
    this.product = await this.$axios
      .get(`/products/${sku}/details`)
      .then((res) => res.data)
    this.loading = false
  },

  computed: {
    isFormValid() {
      return (
        this.form.currentSize &&
        this.form.quantity &&
        this.form.price &&
        this.form.boxCondition &&
        this.form.quantity > 0 &&
        this.form.quantity < 51 &&
        this.form.price > 50
      )
    },
  },

  methods: {
    ...mapActions({
      addInventory: 'inventory/addInventoryToDraft',
    }),

    handleAddInventory() {
      this.addInventory({
        product: this.product,
        sizeId: Number(this.form.currentSize),
        quantity: Number(this.form.quantity),
        price: Number(this.form.price) * 100,
        packagingConditionId: Number(this.form.boxCondition),
      })
      this.$router.push('/profile/inventory/confirm')
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.container-profile-inventory-new
  padding: 47px 54px
  background-color: $color-white-5
</style>
