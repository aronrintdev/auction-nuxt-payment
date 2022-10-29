<template>
  <b-container fluid class="container-auction-search px-md-5 pb-5 mb-5">
    <div class="d-none d-md-flex justify-content-end align-items-center">
      <div v-if="selectedAuctionType === 'collection'">
        <FormStepper :steps="steps" :selected="getCollectionState"/>
      </div>
    </div>
    <div class="heading-1-bold">{{ $t('create_listing.product.search_title') }}</div>
    <div class="d-flex justify-content-between mt-3 align-items-start">
      <div class="position-relative w-100">
        <SearchInput
          :value="searchText"
          :placeholder="$t('inventory.search_placeholder')"
          class="flex-grow-1 mr-3 mr-md-5"
          :class="{'show-results': inventoryProducts.length > 0}"
          :debounce="1000"
          bordered
          @change="onSearchProduct"
        />
        <!-- Show product search result -->
        <div v-if="inventoryProducts.length > 0" class="d-none d-md-flex flex-grow-1 product-search-results mr-3 mr-md-5">
          <div v-for="product in inventoryProducts" :key="product.id" class="w-100 d-flex align-items-center justify-content-between">
            <div class="d-flex align-items-center px-3">
              <ProductThumb :product="product" width="60" height="60" />
              <span class="pl-3 body-4-normal">{{ product.name }}</span>
            </div>
            <div
              class="d-flex align-items-center add-product-btn px-3"
              role="button"
              @click="addAuctionFromProduct(product)"
            >
              <span class="body-4-normal px-2">{{ $t('create_listing.search.add_product') }}</span>
              <img :src="require('~/assets/img/icons/long-arrow-right.svg')" />
            </div>
          </div>
        </div>
      </div>
      <Button
        to="/profile/inventory/search"
        variant="primary"
        pill
        class="btn-add"
      >{{ $t('inventory.add_inventory') }}
      </Button>
    </div>
    <div v-if="inventoryProducts.length > 0" class="d-md-none flex-grow-1 product-search-results">
      <div v-for="product in inventoryProducts" :key="product.id" class="w-100 d-flex align-items-center justify-content-between mb-3 product-item">
        <div class="d-flex align-items-center">
          <ProductThumb :product="product" />
          <span class="ml-3 body-4-normal text-capitalize">{{ product.name }}</span>
        </div>
        <div
          class="d-flex align-items-center add-product-btn ml-3"
          role="button"
          @click="addAuctionFromProduct(product)"
        >
          <span class="text-white px-2">{{ $t('create_listing.add') }}</span>
        </div>
      </div>
    </div>
  </b-container>
</template>
<script>
import SearchInput from '~/components/common/SearchInput.vue'
import ProductThumb from '~/components/product/Thumb.vue'
import { Button } from '~/components/common'
import FormStepper from '~/components/createListing/FormStepper'
import createListingAuction from '~/plugins/mixins/create-listing-auction'

export default {
  name: 'ProductSearchPage',
  components: {
    SearchInput,
    ProductThumb,
    Button,
    FormStepper,
  },
  mixins: [createListingAuction],
  layout: 'Profile',
  middleware: 'auth',
  data() {
    return {
      searchText: null,
      inventoryProducts: [],
    }
  },
  computed: {
    selectedAuctionType() {
      return this.$store.state['create-listing'].auctionType
    },
  },
  methods: {
    onSearchProduct(text) {
      this.searchText = text
      this.$axios.get('/products', {
        params: {
          search: this.searchText,
        }
      }).then((res) => {
        this.inventoryProducts = res.data.data
      })
    },
    // Add new auction from product
    addAuctionFromProduct(product) {
      this.$store.commit('create-listing/setActiveInventoryProduct', product)
      if (this.selectedAuctionType === 'collection') {
        this.$router.push('/create-listing/product/collection/inventory')
      } else {
        this.$router.push('/create-listing/product/inventory')
      }
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.container-auction-search
  padding: 47px 54px
  background-color: $color-white-5
  height: 100%

  h2.title
    @include heading-3
  .btn-add::v-deep
    @include body-4-medium
    width: 168px
    height: 40px
    padding: 0
    display: flex
    align-items: center
    justify-content: center

  @media (max-width: 576px)
    padding: 20px 16px
    background: transparent
    height: calc(100vh - 317px)
    .heading-1-bold
      font-size: 16px
      line-height: 19px

    .btn-add.btn
      background: $black
      border-color: $black 
      font-size: 12px
      line-height: 16px

    .search-input-wrapper::v-deep
      &.search-primary.bordered
        input.search-input
          border: none
          background: $color-white-5
          border-radius: 8px
          font-weight: $regular
          font-size: 12px
          line-height: 16px
          letter-spacing: 0.06em
          padding-top: 12px
          padding-bottom: 12px
    .product-search-results
      border: none
      padding: 20px 0
      position: static
      .product-item
        border: 0.5px solid $color-white-24
        border-radius: 8px
        padding: 0px 12px
        .thumb-wrapper
          width: 80px !important
        .body-4-normal
          font-weight: $normal
          font-size: 13px
          line-height: 130%
          letter-spacing: -0.02em
          color: $color-black-15
          flex: 1
        .add-product-btn
          font-weight: $medium
          font-size: 12px
          line-height: 20px
          background: $color-blue-20
          border: none
          padding: 4px 8px
          border-radius: 5px
          color: $white
</style>
