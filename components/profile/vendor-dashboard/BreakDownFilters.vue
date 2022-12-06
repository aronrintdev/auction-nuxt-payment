<template>
  <div class="breakdown-filters d-flex align-items-center">
    <div v-if="currentTab === 'category'" class="d-flex align-items-center">
      <div class="form-check mr-43">
        <input
          id="flexCheckDefault-total"
          v-model="categorySelectAll"
          class="form-check-input"
          type="checkbox"
          @change="categoryTotalSelect"
        />
        <label for="flexCheckDefault-total">
          {{ $t('vendor_dashboard.breakdown.total') }}
        </label>
      </div>
      <div
        v-for="(item, index) in categories"
        :key="index"
        class="form-check mr-43"
      >
        <input
          :id="`${currentTab}-flexCheckDefault-${index}`"
          v-model="selectedCategories"
          :value="item.value"
          class="form-check-input"
          type="checkbox"
          @change="categoryChange"
        />
        <label :for="`${currentTab}-flexCheckDefault-${index}`">
          {{ item.label | capitalizeFirstLetter }}
        </label>
      </div>
    </div>

    <MultiSelectDropdown
      v-if="currentTab === 'brand'"
      v-model="selectedFilters.brands"
      collapseKey="brands"
      :title="$t('filter_sidebar.brands').toString()"
      :options="brandOptions"
      class="brands mr-29"
    >
      <template #firstRow>
        <div>
          <SearchInput
            :placeholder="
              $t('vendor_dashboard.breakdown.search_brand').toString()
            "
            class="search-filter"
            :debounce="1000"
            :input-height="'26px'"
            @search="filterBrands"
          />
        </div>
      </template>
    </MultiSelectDropdown>
    <div v-if="currentTab === 'brand'" class="d-flex align-items-center">
      <div
        v-for="(item, index) in selectedFilters.brands"
        :key="index"
        class="form-check mr-25"
      >
        <input
          :id="`${currentTab}-flexCheckDefault-${index}`"
          :checked="true"
          class="form-check-input"
          type="checkbox"
        />
        <label
          :for="`${currentTab}-flexCheckDefault-${index}`"
          class="text-gray-simple body-13-normal font-secondary"
        >
          {{ item.name | capitalizeFirstLetter }}
        </label>
      </div>

      <div
        v-if="selectedFilters.brands.length"
        class="body-13-normal font-secondary text-decoration-underline text-gray-simple"
        role="button"
        @click="clearFilters"
      >
        {{ $t('vendor_dashboard.breakdown.clear_all') }}
      </div>
    </div>

    <MultiSelectDropdown
      v-if="currentTab === 'product'"
      v-model="selectedFilters.products"
      collapseKey="categories"
      :title="$t('vendor_dashboard.breakdown.products').toString()"
      :options="productOptions"
      class="categories mr-29"
    >
      <template #firstRow>
        <div>
          <SearchInput
            :placeholder="
              $t('vendor_dashboard.breakdown.search_product').toString()
            "
            class="search-filter"
            :debounce="1000"
            :input-height="'26px'"
            @search="filterProducts"
          />
        </div>
      </template>
    </MultiSelectDropdown>

    <div v-if="currentTab === 'product'" class="d-flex align-items-center">
      <div
        v-for="(item, index) in selectedFilters.products"
        :key="index"
        class="form-check mr-25"
      >
        <input
          :id="`${currentTab}-flexCheckDefault-${index}`"
          :checked="true"
          class="form-check-input"
          type="checkbox"
        />
        <label
          :for="`${currentTab}-flexCheckDefault-${index}`"
          class="text-gray-simple body-13-normal font-secondary"
        >
          {{ item.name | capitalizeFirstLetter }}
        </label>
      </div>

      <div
        v-if="selectedFilters.products.length"
        class="body-13-normal font-secondary text-decoration-underline text-gray-simple"
        role="button"
        @click="clearFilters"
      >
        {{ $t('vendor_dashboard.breakdown.clear_all') }}
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import screenSize from '~/plugins/mixins/screenSize'
import MultiSelectDropdown from '~/components/common/MultiSelectDropdown'
import SearchInput from '~/components/common/SearchInput'

export default {
  name: 'BreakDownFilters',
  components: { SearchInput, MultiSelectDropdown },
  mixins: [screenSize],
  props: {
    currentTab: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      brandSearch: null,
      productSearchKey: '',
      categorySelectAll: false,
      selectedFilters: {
        brands: [],
        products: [],
      },
      searchedProducts: [],
      selectedCategories: [],
      categories: Object.keys(
        this.$t('vendor_dashboard.breakdown.categories')
      ).map((key) => {
        return {
          label: this.$t(`vendor_dashboard.breakdown.categories.${key}`),
          value: key,
        }
      }),
    }
  },
  computed: {
    ...mapGetters('browse', ['filters']),
    brandOptions() {
      const res = this.filters?.brands
        ?.map((item) => {
          return { label: item.name, value: item }
        })
        .filter((item) =>
          this.brandSearch
            ? item.label.toLowerCase().includes(this.brandSearch)
            : true
        )

      res.unshift({
        label: this.$t('vendor_dashboard.breakdown.select_all'),
        value: {
          id: -1,
          name: this.$t('vendor_dashboard.breakdown.select_all').toString()
        },
      })
      return res
    },
    productOptions() {
      const res = this.searchedProducts
        .map((item) => {
          return { label: item.name, value: item }
        })
        .filter((item) =>
          this.brandSearch
            ? item.label.toLowerCase().includes(this.brandSearch)
            : true
        )

      res.unshift({
        label: this.$t('vendor_dashboard.breakdown.select_all'),
        value: {
          id: -1,
          name: this.$t('vendor_dashboard.breakdown.select_all').toString()
        },
      })
      return res
    },
  },
  mounted() {
    this.searchProduct()
  },
  methods: {
    categoryTotalSelect(val){
      if (this.categorySelectAll){
        this.selectedCategories = this.categories.map(item => item.value)
      }else{
        this.selectedCategories = []
      }
    },
    categoryChange(val){
      this.categorySelectAll = this.selectedCategories.length === 3;
    },
    clearFilters() {
      this.selectedFilters.brands = []
      this.selectedFilters.products = []
    },
    filterBrands(text) {
      this.brandSearch = text
    },
    filterProducts: _.debounce(function (text) {
      this.productSearchKey = text
      this.searchProduct()
    }, 500),
    searchProduct() {
      this.$axios
        .get('/products', {
          params: {
            search: this.productSearchKey.toLowerCase(),
            take: 50,
          },
        })
        .then((response) => {
          this.searchedProducts = response.data.data || []
        })
        .catch((error) => {
          this.$toasted.error(error)
        })
    },
  },
}
</script>

<style scoped lang="sass">
@import "~/assets/css/variables"
.mr-29
  margin-right: 29px

.mr-25
  margin-right: 25px

.mr-43
  margin-right: 43px

.breakdown-filters
  margin-top: 13px

  ::v-deep.search-filter
    margin-bottom: 14px
    .icon-search
      height: 13px
      width: 13px
      margin-left: 8px
      margin-right: 14px
    input.search-input
      @include body-5-normal
      font-family: $font-family-sf-pro-display
      border-radius: 0
      padding: 8px 8px 8px 25px

::v-deep.brands
  width: 330px

::v-deep.categories
  width: 330px
  .form-check
    label
      width: 200px
      overflow: hidden
      text-overflow: ellipsis
      white-space: nowrap
      padding-top: 4px

.form-check
  & > *
    cursor: pointer !important

  .form-check-input
    border: none
    box-shadow: none

    &::after
      content: ' '
      background-color: $color-gray-75
      position: absolute
      left: 0
      top: 50%
      width: 16px
      height: 16px
      transform: translateY(-7px)
      border-radius: 2px

    &:checked
      &::after
        background-color: $color-blue-20
        border-color: $color-blue-20
        background-image: url('~/assets/img/icons/checkmark-thick.svg')
        background-repeat: no-repeat
        background-size: 10px
        box-shadow: none
        background-position: center

  label
    font-family: $font-family-sf-pro-display
    @include body-13-normal
    text-align: left
    color: $color-gray-5
    padding-left: 16px
    width: 100%
</style>
