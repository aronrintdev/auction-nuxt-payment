<template>
  <b-container fluid class="container-auction-search h-100 px-5">
    <div class="d-flex justify-content-end align-items-center">
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
          class="flex-grow-1 mr-5"
          :class="{'show-results': inventoryProducts.length > 0}"
          :debounce="1000"
          bordered
          @change="onSearchProduct"
        />
        <!-- Show product search result -->
        <div v-if="inventoryProducts.length > 0" class="flex-grow-1 product-search-results mr-5">
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
        this.inventoryProducts = res.data
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

  h2.title
    @include heading-3
    color: $color-black-1
  
  .btn-add::v-deep
    @include body-4-medium
    width: 168px
    height: 40px
    padding: 0
    display: flex
    align-items: center
    justify-content: center

</style>
