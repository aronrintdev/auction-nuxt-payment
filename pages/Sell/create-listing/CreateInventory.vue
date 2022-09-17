<template>
  <div class="create-listing mb-5">
    <div class="d-flex mb-5 top-bar align-items-center">
      <div class="mr-3 position-relative">
        <SearchInput
          :value="searchText"
          variant="secondary"
          @change="onFetchProducts"
        />
        <div v-if="hasSearchResult" class="dropdown-options">
          <div
            v-for="prod in searchedProducts"
            :key="`${prod.sku}-${prod.category.name}`"
            class="dropdown-option"
            @click="selectProduct(prod.sku)"
          >
            {{ prod.sku }} ({{ prod.category.name }})
          </div>
          <div
            v-if="searchedProducts.length === 0"
            class="dropdown-option text-center"
          >
            {{ $t('sell.create_listing.no_result') }}
          </div>
        </div>
      </div>
      <div>&nbsp;</div>
    </div>
    <div v-if="product" class="listing-content">
      <div class="row mb-3">
        <div class="col-12 col-md-6">
          <div class="product-details">
            <div class="product-details-title">{{ product.name }}</div>
            <div class="product-details-sku">{{ product.sku }}</div>
            <div class="product-details-color">{{ product.colorway }}</div>
            <div class="product-image">
              <img :src="`${apiUrl}/products/${product.sku}/image`" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="size-chart">
            <div class="size-chart-title mb-3">
              {{ $t('sell.create_listing.price_by_size') }}
            </div>
            <div class="d-flex flex-wrap size-chart-box">
              <template v-for="idx in 29">
                <div
                  v-if="idx > 7"
                  :key="idx"
                  class="price-box"
                  :class="{ active: selectedSize == idx / 2 }"
                  @click="onPriceboxClick(idx / 2)"
                >
                  <span class="price-box-size">{{ idx / 2 }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="mt-5 create-inventory-btn-wrapper">
            <button
              class="btn w-100 btn-dark confirm-list-btn"
              :disabled="!selectedSize || !product || loading"
              @click="onCreateInventoryClick"
            >
              <div v-if="loading" class="text-center text-dark loading-wrapper">
                <b-spinner class="align-middle"></b-spinner>
              </div>
              {{ $t('sell.create_inventory.create_btn') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchInput from '~/components/common/SearchInput.vue'

/*
  Create inventory page
 */
export default {
  name: 'CreateInventory',
  components: {
    SearchInput,
  },
  data() {
    return {
      user_name: this.$store.state.auth.user.first_name, // Logged in user firstname,
      searchedProducts: [],
      product: null,
      apiUrl: process.env.API_URL,
      hasSearchResult: false,
      loading: false,
      searchText: null,
      selectedSize: null,
    }
  },
  methods: {
    // Product search event listener
    onFetchProducts(term) {
      const self = this
      this.$axios
        .get('/products', {
          params: {
            search: term.toLowerCase(),
          },
        })
        .then(function (response) {
          const products = response.data || []
          self.hasSearchResult = true
          self.searchedProducts = products
        })
    },
    // Products dropdown "Click" event listener
    selectProduct(sku) {
      const index = this.searchedProducts.findIndex((p) => p.sku === sku)
      this.product = this.searchedProducts[index]
      this.hasSearchResult = false // Hide product select box
      this.searchText = this.product.sku
    },
    // Price box "Click" event listener (Size/Prices chart)
    onPriceboxClick(size) {
      this.selectedSize = size
      this.form = {
        ...this.form,
        size,
      }
    },
    // Create inventory button 'Click' event. Call inventory store API.
    onCreateInventoryClick() {
      this.loading = true
      this.$axios
        .post('/inventories', {
          sku: this.product.sku,
          name: this.product.name,
          colorway: this.product.colorway,
          brand: this.product.brand,
          category: this.product.category.name,
          release_year: this.product.releaseYear,
          size: `${this.selectedSize}`,
        })
        .then(() => {
          this.loading = false
          this.product = null
          this.selectedSize = null
          this.searchText = null
          this.$toasted.success(this.$t('sell.create_inventory.success_msg'))
        })
    },
  },
}
</script>
