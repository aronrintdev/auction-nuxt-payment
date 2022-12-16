<template>
  <b-container fluid class="h-100" :class=" !isScreenXS ? 'container-profile-inventory-new' : 'p-0'">
    <Portal to="back-icon-slot">
      <img
        :src="require('~/assets/img/icons/back.svg')"
        alt="back-arrow"
        class="float-left"
        @click="moveBack"
      />
    </Portal>
    <div v-if="loading"><Loader /></div>
    <div v-else-if="product">
      <ProductView v-model="form" :product="product"
                   :class="isScreenXS ? 'px-16' : ''"
                   @back="$router.push('/profile/inventory/search')">
        <InventoryNewForm
          slot="right-content"
          v-model="form"
          class="mb-sm-4"
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

      <!-- Share Icon in Navbar Begin -->
      <client-only>
        <Portal to="notification-slot">
          <ShareSVG
            :id="`popover-share-product`"
            class="ml-auto share-svg"
            role="button"
          />
          <b-popover
            ref="sharePopover"
            :target="`popover-share-product`"
            triggers="click"
            placement="bottom"
            container="body"
            custom-class="wishlist-popover"
            delay="200"
            @show="shareShow = true"
            @hidden="shareShow = false"
          >
            <ShareButton
              :url="shareUrl + product.sku"
              :title="product.name"
              :description="product.description"
            />
          </b-popover>
        </Portal>
      </client-only>
      <!-- Share Icon in Navbar End -->
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
import ShareSVG from '~/assets/img/icons/share.svg?inline'
import ShareButton from '~/components/common/ShareButton'

export default {
  name: 'ProfileInventoryNew',

  components: {
    Loader,
    InventoryNewForm,
    ProductView,
    SalesSection,
    ShareSVG,
    ShareButton
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
        boxCondition: 1, // default 1
      },
      shareShow: false,
      shareUrl: process.env.APP_URL + '/shop/',
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

    moveBack() {
      this.$router.go(-1)
    }
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

.px-16
  padding-right: 16px
  padding-left: 16px

.share-svg
  stroke: $color-gray-17

</style>
