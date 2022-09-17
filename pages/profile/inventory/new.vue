<template>
  <b-container fluid class="container-profile-inventory-new h-100">
    <div v-if="loading"><Loader /></div>
    <div v-else-if="product">
      <Button to="/profile/inventory/search" variant="link" class="btn-back">
        <img
          :src="require('~/assets/img/icons/arrow-left-gray.svg')"
          :alt="$t('common.back')"
          class="mr-2"
        />
        {{ $t('inventory.back_to_search') }}
      </Button>

      <InventoryNewForm v-model="form" :product="product" />

      <div class="mt-5 mx-auto d-flex justify-content-center">
        <Button
          variant="outline-primary"
          pill
          :disabled="!isFormValid"
          @click="handleAddInventory"
          >{{ $t('inventory.add_inventory') }}</Button
        >
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { Button, Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'

export default {
  name: 'ProfileInventoryNew',

  components: {
    Button,
    Loader,
    InventoryNewForm,
  },

  layout: 'Profile',

  fetchOnServer: false,

  data() {
    return {
      loading: false,
      product: null,
      form: {
        sizeId: null,
        quantity: null,
        price: null,
        packagingConditionId: null,
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
        this.form.sizeId &&
        this.form.quantity &&
        this.form.price &&
        this.form.packagingConditionId &&
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
        sizeId: Number(this.form.sizeId),
        quantity: Number(this.form.quantity),
        price: Number(this.form.price) * 100,
        packagingConditionId: Number(this.form.packagingConditionId),
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
