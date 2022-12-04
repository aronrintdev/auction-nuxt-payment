<template>
  <b-container fluid class="h-100" :class=" !isScreenXS ? 'container-profile-inventory-new' : 'p-0'">
    <div v-if="loading"><Loader /></div>
    <div v-else-if="product">
      <ProductView v-model="form" :product="product"
                   :class="isScreenXS ? 'p-3' : ''"
                   @back="$router.push('/profile/inventory/search')">
        <InventoryNewForm
          slot="right-content"
          ref="inventoryForm"
          v-model="form"
          class="mb-sm-4"
          :show-buttons="!isScreenXS"
          :is-form-valid="isFormValid"
          @submit="handleAddInventory"
        />
      </ProductView>
      <!-- Sales Graph and Sales Data Section -->
      <SalesSection :class="!isScreenXS ? 'sales-section' : ''"
        :product="product"
        :chart-header-class="'d-none mt-1'"
        :chart-labels-style="chartLabelStyle"
      />
      <!-- End of Sales Graph and Sales Data Section -->
      <div v-if="isScreenXS" class="d-flex justify-content-center mt-5">
        <a role="button" class="inventory-add-btn" @click="handleAddInventory">{{ $t('inventory.add_inventory') }}</a>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { Loader } from '~/components/common'
import InventoryNewForm from '~/components/inventory/NewForm'
import ProductView from '~/components/profile/create-listing/product/ProductView'
import screenSize from '~/plugins/mixins/screenSize'
import SalesSection from '~/components/product/SalesSection'

export default {
  name: 'ProfileInventoryNew',

  components: {
    Loader,
    InventoryNewForm,
    ProductView,
    SalesSection
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
        this.form.quantity !== null &&
        this.form.quantity > 0 &&
        this.form.quantity < 51 &&
        this.form.price > 50
      )
    },
    chartLabelStyle() {
      if (this.isScreenSM)
        return { 'width': '80%', 'margin-left': '140px' }

      if (this.isScreenMD)
        return {'width': '70%', 'margin-left': '140px' }

      return {'width': '60%', 'margin-left': '160px' }
    }
  },

  methods: {
    ...mapActions({
      addInventory: 'inventory/addInventoryToDraft',
    }),

    handleAddInventory() {
      if (!this.isFormValid) return

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
  padding: 30px  120px 0px 14px
  background-color: $color-white-5

.sales-section
  margin-top: 55px

.inventory-add-btn
  background-color: $color-black-1
  max-width: 216px
  color: $color-white
  font-family: $font-montserrat
  @include body-10-normal
  border-radius: 20px
  padding: 12px 61px
  &:hover
    background-color: rgba($color-black-1, .8)

</style>
