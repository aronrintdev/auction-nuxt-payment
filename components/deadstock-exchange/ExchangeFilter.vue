<template>
  <div>
    <div class="">
      <div class="row filter-row-top">
        <!-- Input search -->
        <div class="col search-input-col vtpc-search p-lg-3 pt-3">
          <div class="form trade-search">
            <div
              class="form-group selling-search-input d-flex align-items-center m-0"
            >
              <img
                :src="require('~/assets/img/icons/search.svg')"
                class="icon-search"
                alt="Search"
              />
              <input
                id="search-result"
                v-model="searchValue"
                type="text"
                class="form-control form-input vd-purchases-browse-input bg-white"
                :placeholder="
                  $t('deadstock_exchange.filters.details_placeholder')
                "
                autocomplete="on"
                @input="searchProduct"
              />
            </div>
          </div>
        </div>
        <!-- ./Input search -->

        <!-- Sort By -->
        <div class="col sortby-col p-lg-3 pt-3">
          <CustomSelect
            id="category-types"
            :default="categorySelected"
            :threelineIcon="false"
            :options="{
              default: $t('vendor_purchase.sort_by'),
              highestChange: $t('deadstock_exchange.sort_by.highest_change'),
              lowestChange: $t('deadstock_exchange.sort_by.lowest_change'),
              releaseDateAsc: $t('deadstock_exchange.sort_by.release_date_asc'),
              releaseDateDesc: $t('deadstock_exchange.sort_by.release_date_desc'),
              lastPriceLh: $t('deadstock_exchange.sort_by.last_price_lh'),
              lastPriceHl: $t('deadstock_exchange.sort_by.last_price_hl'),
            }"
            @input="handleSortByChange"
          />
        </div>
      </div>
      <div class="row filter-row-bottom">
        <!-- Filter By Category-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.categories'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByCategories"
          />
        </div>
        <!-- Filter By Category-->

        <!-- Filter By SizeType-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.size_types'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterBySizeType"
          />
        </div>
        <!-- Filter By SizeType-->

        <!-- Filter By Price Range-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.price_range'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByPriceRange"
          />
        </div>
        <!-- Filter By Price Range-->

        <!-- Filter By Brands-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.brands'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByBrands"
          />
        </div>
        <!-- Filter By Brands-->

        <!-- Filter By Years-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filters.years'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByYears"
          />
        </div>
        <!-- Filter By Years-->
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from '~/components/common/CustomSelect.vue'
import { DEFAULT } from '~/static/constants'
export default {
  name: 'ExchangeFilter',
  components: {
    CustomSelect,
  },
  data() {
    return {
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      searchValue: '',
      categorySelected: '', // For Sort by filter
      filterBy: '',
      showSuccessMessage: null,
      searchFilters: {
        filterBy: '',
        search: '',
        category: '',
        brand: '',
        size: '',
        priceRange: '',
      },
    }
  },
  methods: {
    // On filter by change.
    searchProduct() {
      this.searchFilters.search =  this.searchValue
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleSortByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterByCategories(value) {
      this.searchFilters.category = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterBySizeType(value) {
      this.searchFilters.size = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterByPriceRange(value) {
      this.searchFilters.priceRange = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by brands.
    handleFilterByBrands(value) {
      this.searchFilters.brand = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by years.
    handleFilterByYears(value) {
      this.searchFilters.years = value === DEFAULT ? '' : value
      this.$emit('filterList',this.searchFilters)
    },
  },
}
</script>
