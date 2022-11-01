<template>
  <section class="auction-filters p-0">
    <div class="auction-filters-content">
      <div class="d-flex justify-content-between">
        <div
          v-click-outside="hideDropdown"
          class="searchbox"
          :class="{ open: hasSearchResult }"
        >
          <search-box
            :searchText="searchText"
            :placeholder="`${$t('common.search')} ${$t('common.shop')}`"
            @search="search"
          />
          <div v-if="hasSearchResult" class="dropdown-options">
            <div
              v-for="prod in searchedProducts"
              :key="`${prod.sku}-${prod.category.name}`"
              class="dropdown-option d-flex align-items-center"
              @click="selectProduct(prod)"
            >
              <div class="position-relative d-inline-flex">
                <b-img
                  :src="`${
                    prod.image || 'https://images.deadstock.co/404.png'
                  }?width=150}`"
                  class="mx-auto"
                  alt="..."
                />
                <div class="position-absolute overlay"></div>
              </div>
              &nbsp; {{ prod.name }}
            </div>
            <div
              v-if="!searchedProducts.length"
              class="dropdown-option text-center"
            >
              {{ $t('sell.create_listing.no_result') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import debounce from 'lodash.debounce'
import SearchBox from '../RoundSearchBox'
export default {
  name: 'ShopSearchbar',
  components: {
    SearchBox,
  },
  directives: {
    ClickOutside,
  },
  props: {
    searchKeyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchText: null,
      hasSearchResult: false,
      searchedProducts: [],
    }
  },
  watch: {
    searchKeyword(newV) {
      this.searchText = newV
    },
    selectedFilters: {
      handler(newV) {
        this.emitChange(newV)
      },
      deep: true,
    },
  },
  mounted() {
    this.searchText = this.searchKeyword
    // Get categories list
    this.$axios
      .get('/categories', {
        params: {
          take: 3,
        },
      })
      .then((res) => {
        this.categoryOptions = res.data.map((cat) => ({
          label: this.$t(`common.categories.${cat.name}`),
          value: cat.id,
        }))
      })
      .catch(() => {
        this.categoryOptions = []
      })
  },
  methods: {
    // Search event listener
    search(value) {
      this.searchText = value
      if (value) {
        this.$axios
          .get('/products', {
            params: {
              search: value.toLowerCase(),
            },
          })
          .then((response) => {
            this.hasSearchResult = true
            this.searchedProducts = response.data.data || []
          })
          .catch((error) => {
            this.hasSearchResult = false
            this.$toasted.error(error)
          })
      } else {
        this.selectedProduct = null
        this.emitChange()
      }
    },
    // Select product
    selectProduct(product) {
      this.selectedProduct = product.sku
      this.searchText = product.name
      this.selectedFilters = {
        ...this.selectedFilters,
        product: this.selectedProduct,
      }
      this.$emit('change', this.selectedFilters)
      this.hideDropdown()
    },

    // Submit updated filters
    emitChange: debounce(function (filters) {
      this.$emit('change', filters)
    }, 300),
    hideDropdown() {
      this.hasSearchResult = false
      this.searchedProducts = []
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'

.dropdown-sort::v-deep
  .btn-dropdown
    @include body-4-normal
    color: $color-black-1
    border: 1px solid transparent
    background-color: $color-white-4
    border-radius: 8px
    height: 48px
    width: 327px
    padding: 0 13px 0 23px

    .icon-main
      margin-right: 20px !important

    .icon-clear
      right: 23px

    &.opened
      border-bottom-left-radius: 0
      border-bottom-right-radius: 0
      border: 1px solid transparent

  .search-results
    .popover-body
      >div
        @include body-4-normal
        font-family: $font-family-base
        color: $color-black-1
        background-color: $color-white-4
        height: 46px
        border: none
        border-bottom: 0.2px solid $light-gray-2
        padding: 0 23px
        &:hover
          color: $color-gray-5

        &:last-child
          border-bottom-left-radius: 8px
          border-bottom-right-radius: 8px
          border: none
.overflow-x-hidden
  overflow-x: hidden
::v-deep .nav-group
  .btn-group
    background-color: $white-3
    .btn
      background-color: $white-3
.overlay
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba($gray, 0.05)
.searchbox::v-deep .rounded-search-input
  padding: 13px
  padding-top: 8px
  padding-bottom: 8px
</style>
