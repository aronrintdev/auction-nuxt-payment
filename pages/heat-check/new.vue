<template>
  <b-container fluid class="container-heatcheck">
    <div>
      <div class="d-flex justify-content-between header">
        <div class="title">
          <h2>{{ $t('heatcheck.heatcheck') }}</h2>
        </div>
      </div>

      <div
        class="d-flex justify-content-between align-items-center mt-4 position-relative"
      >
        <SearchInput
          id="new-inventory"
          :value="searchText"
          :placeholder="$t('inventory.search_product_placeholder')"
          size="lg"
          class="search-input mr-3 w-600px"
          bordered
          autofocus
          @change="onSearchProduct"
        >
          <div
            v-for="product in products"
            :key="`product-${product.id}`"
            class="d-flex align-items-center w-100"
          >
            <ProductThumb
              :product="product"
              width="39"
              height="39"
              class="mr-2 flex-shrink-0"
            />
            <div class="flex-grow-1 text-truncate">{{ product.name }}</div>
            <Button
              variant="link"
              class="flex-shrink-0 ml-3 btn-add-to-inventory"
              @click="selectProduct(product.sku)"
            >
              <img
                :src="require('~/assets/img/icons/forward.svg')"
                class="ml-2"
              />
            </Button>
          </div>
        </SearchInput>
      </div>
    </div>
  </b-container>
</template>
<script>
import { mapActions } from 'vuex'
import { Button, SearchInput } from '~/components/common'

export default {
  name: 'New',
  components: {
    Button,
    SearchInput,
  },
  layout: 'Profile',
  data() {
    return {
      category: 'all',
      action: 'none',
      hasSearchResult: false,
      apiUrl: process.env.API_URL,
      searchText: null,
      newListType: null,
      newListName: '',
      wishLists: [],
      currentWishList: null,
      listProducts: [],
      products: [],
      selected: [],
      currentPage: 1,
      perPage: 0,
      totalCount: 0,
      loading: false,
    }
  },
  methods: {
    ...mapActions({
      resetData: 'heat-check/resetData',
    }),
    onSearchProduct(term) {
      this.$axios
        .get(`/products/?search=${term.toLowerCase()}&take=5`)
        .then((response) => {
          if (response.data.data.length > 0) {
            this.hasSearchResult = true
            this.products = response.data.data
          }
        })
        .catch((error) => {
          this.$toasted.error(this.$t(error.response.data.error))
        })
    },
    selectProduct(sku) {
      this.resetData()
      this.$router.push({
        path: `/heat-check/product?sku=${sku}`,
      })
    },
    handleBrowseClick() {
      this.$router.push({
        path: '/heat-check/product',
      })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.form-control.form-input
    padding: 10px 15px 10px 25px

.search-box-container .form .fa-search
    position: absolute
    top: 11px
    left: 7px

.container-heatcheck
  min-height: 65vh

.dropdown-options
  background: $color-white-1
  border: 0.2px solid $color-gray-47
  border-radius: 0px 0px 8px 8px
  width: 100%
  margin-top: 0

.dropdown-options .dropdown-option-title
  font-family: $font-family-montserrat
  font-style: normal
  font-weight: $normal
  font-size: 16px
  line-height: 20px
  letter-spacing: 0.06em
  text-transform: capitalize
  color: $color-black-1
  width: 400px
.arrow-right-image
  height: 14px
  width: 14px
.dropdown-options .dropdown-option-title
  width: 100%
.dropdown-options .dropdown-option img
  width: 40px
.arrow-right-image
  margin-left: auto

.popfix
  position: absolute
  top: 5%
.w-600px
  width: 600px
</style>
