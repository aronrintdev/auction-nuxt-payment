<template>
<div>
  <div class="" >
      <div class="row filter-row-top">
        <!-- Input search -->
        <div class="col search-input-col vtpc-search p-lg-3 pt-3">
          <div class="form trade-search">
            <div
              class="
                form-group
                selling-search-input
                border
                d-flex
                align-items-center
                m-0
              "
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
                class="
                  form-control form-input
                  vd-purchases-browse-input
                  bg-white
                "
                :placeholder="$t('deadstock_exchange.filters.details_placeholder')"
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
import { DEFAULT} from '~/static/constants'
export default {
  name: 'ExchangeFilter',
  components: {
    CustomSelect
  },
  data(){
    return {
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      searchValue:'',
      categorySelected: '', // For Sort by filter
      filterBy: '',
      showSuccessMessage: null,
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        filterBy: '',
        perPage: 8,
        page: 1,
      },
      tableColumns: [
        {
          key: 'ranking',
          label: this.$t('deadstock_exchange.list.table_columns.ranking'),
          class: 'text-left',
        },
        {
          key: 'name',
          label: this.$t('deadstock_exchange.list.table_columns.name'),
        },
        {
          key: 'last_price',
          label: this.$t('deadstock_exchange.list.table_columns.last_price'),
        },
        {
          key: '24h',
          label: this.$t('deadstock_exchange.list.table_columns.24h'),
        },
        {
          key: '7d',
          label: this.$t('deadstock_exchange.list.table_columns.7d'),
        },
        {
          key: '30d',
          label: this.$t('deadstock_exchange.list.table_columns.30d'),
        },
        {
          key: 'last_7d',
          label: this.$t('deadstock_exchange.list.table_columns.last_7d'),
        },
      ],
      tableColumnsForCollection: [
      {
          key: 'ranking',
          label: this.$t('deadstock_exchange.list.table_columns.ranking'),
          class: 'text-left',
        },
        {
          key: 'name',
          label: this.$t('deadstock_exchange.list.table_columns.name'),
        },
        {
          key: 'last_price',
          label: this.$t('deadstock_exchange.list.table_columns.last_price'),
        },
        {
          key: '24h',
          label: this.$t('deadstock_exchange.list.table_columns.24h'),
        },
        {
          key: '7d',
          label: this.$t('deadstock_exchange.list.table_columns.7d'),
        },
        {
          key: '30d',
          label: this.$t('deadstock_exchange.list.table_columns.30d'),
        },
        {
          key: 'last_7d',
          label: this.$t('deadstock_exchange.list.table_columns.last_7d'),
        },
      ],
      totalRows: null,
      currentPage: 1,
      perPage: process.env.INVENTORY_ITEMS_PER_PAGE,
    }
  },
  computed: {
    // Expects a View Model. Use the variable vm (short for ViewModel) to refer to our Vue instance.
    purchaseDataCount: (vm) => {
      if (vm.purchaseDatas && vm.purchaseDatas.data) {
        return vm.purchaseDatas.data.length
      } else {
        return 0
      }
    },
  },

  mounted() {
    // this.loadData()
  },
  methods: {
    // Search Data
    searchPurchase() {
      this.loadData()
    },
    // On filter change
    handleFilterChanged(filter) {
      this.productsFilter = filter
      this.loadData()
    },

    // Active tab value on change
    activeVal(value) {
      this.activeFilterValue = value
    },
    // Filters onchange
    typeFilters({ array, value }) {
      this.activeTypeFilters = array
      // For backend
      if (this.typeFilter.includes(value)) {
        this.typeFilter.splice(this.typeFilter.indexOf(value), 1)
      } else {
        this.typeFilter.push(value)
      }
    },

    // Status filters onchange
    statusFilters({ array, value }) {
      this.activeStatusFilters = array

      // For backend
      if (this.statusFilter.includes(value)) {
        this.statusFilter.splice(this.statusFilter.indexOf(value), 1)
      } else {
        this.statusFilter.push(value)
      }
    },

    // For date picker format
    onContext(ctx) {
      // The date formatted in the locale, or the `label-no-date-selected` string
      this.formatted = ctx.selectedFormatted
      // The following will be an empty string until a valid date is entered
      this.selected = ctx.selectedYMD
    },

    // Get the purchase data
    loadData() {
      this.filters.keyword = this.searchValue
      this.filters.sortBy = this.productsFilter
      this.filters.startDate = this.startdate
      this.filters.endDate = this.enddate
      this.filters.status = this.statusFilter.toString()
      this.filters.type = this.typeFilter.toString()
      this.$axios
        .get(`/purchases?page=${this.currentPage}`, {
          params: {
            ...this.filters,
            perPage: this.perPage,
            page: this.page,
          },
        })
        .then((res) => {
          this.total = res.data.result.total
          this.perPage = parseInt(res.data.result.per_page)
          this.rows = res.data.result.last_page
          this.purchaseDatas = res.data.result
        })
        .catch((err) => {
          this.$logger.logToServer(
            'Vendor purchase section - get Purchase Data error: ',
            err.response.data
          )
          this.$toasted.error(this.$t(err.response.data.message))
        })
    },

    // Clear the values
    clearFilters() {
      this.searchValue = ''
      this.productsFilter = ''
      this.startdate = ''
      this.enddate = ''
      this.statusFilter = []
      this.typeFilter = []
      this.refresh = true
      this.activeStatusFilters = []
      this.activeTypeFilters = []
      this.$nuxt.refresh()
      this.loadData()
    },

    // On pagination click
    handlePageClick(bvEvent, page) {
      if (this.currentPage !== page) {
        this.currentPage = page
        this.loadData()
      }
    },

    // Per page change
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.currentPage = 1
        this.loadData()
      }
    },
     // On filter by change.
    handleSortByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },
     // On filter by change.
    handleFilterByCategories(value) {
      this.searchFilters.categories = value === DEFAULT ? '' : value
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
      this.searchFilters.brands = value === DEFAULT ? '' : value
    },
     // On filter by years.
    handleFilterByYears(value) {
      this.searchFilters.years = value === DEFAULT ? '' : value
    },
  },
}
</script>
