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
                @input="searchPurchase"
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
              priceAsc: $t('placed_offers.sort_by.price_low_high'),
              priceDesc: $t('placed_offers.sort_by.price_high_low'),
              dateAsc: $t('placed_offers.sort_by.date_listed_new_old'),
              dateDesc: $t('placed_offers.sort_by.date_listed_old_new'),
            }"
            @input="handleSortByChange"
          />
        </div>
      </div>
      <div class="row filter-row-bottom">
        <!-- Filter By -->
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
        <!-- ./Filter By -->
        <!-- Filter By -->
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
        <!-- ./Filter By -->
        <!-- Filter By -->
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
        <!-- ./Filter By -->
        <!-- Filter By -->
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
        <!-- ./Filter By -->
        <!-- Filter By -->
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
        <!-- ./Filter By -->
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
        search: '',
        category: '',
        brand: '',
        size: '',
      },
    }
  },
  methods: {
    // On filter by change.
    handleSortByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },
    // On filter by change.
    handleFilterByCategories(value) {
      this.searchFilters.category = value === DEFAULT ? '' : value
    },
    // On filter by change.
    handleFilterBySizeType(value) {
      this.searchFilters.size = value === DEFAULT ? '' : value
    },
    // On filter by change.
    handleFilterByPriceRange(value) {
      this.searchFilters.priceRange = value === DEFAULT ? '' : value
    },
    // On filter by brands.
    handleFilterByBrands(value) {
      this.searchFilters.brand = value === DEFAULT ? '' : value
    },
    // On filter by years.
    handleFilterByYears(value) {
      this.searchFilters.years = value === DEFAULT ? '' : value
    },
  },
}
</script>
