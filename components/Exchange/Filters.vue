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
                  $t('deadstock_exchange.filter_by.details_placeholder')
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
      <div  class="row filter-row-bottom" >
        <!-- Filter By Category-->
        <div class="col filter-by-col">
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('deadstock_exchange.filter_by.categories.title'),
              ...categories
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
              default: $t('deadstock_exchange.filter_by.size_types'),
              men: $t('deadstock_exchange.filter_by.size_type.men'),
              women: $t('deadstock_exchange.filter_by.size_type.women'),
              kids: $t('deadstock_exchange.filter_by.size_type.kids'),
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
              default: $t('deadstock_exchange.filter_by.price_range'),
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
              default: $t('deadstock_exchange.filter_by.brands'),
              ...brands
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
              default: $t('deadstock_exchange.filter_by.years'),
              ...Years
            }"
            :title="filterByTitle"
            @input="handleFilterByYears"
          />
        </div>
        <!-- Filter By Years-->
      </div>
    </div>
    <!-- Filters -->
    <div class="row filter-row">
    <div class="col-md-12 col-sm-12 mt-md-4 mt-4">
      <!-- Type Filters -->
      <b-badge
        v-for="(options, typeIndex) in activeTypeFilters"
        :key="`type-${typeIndex}`"
        class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize float-right"
      >
        {{ options }}&colon;
        <i
          class="fa fa-times"
          role="button"
          aria-hidden="true"
          @click="removeTypeFilter(options)"
        ></i>
      </b-badge>
      <!-- ./Type Filters -->
      <!-- Status Filters -->
      <b-badge
        v-for="(status, statusIndex) in activeStatusFilters"
        :key="`status-${statusIndex}`"
        class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize"
      >
        {{ status.type }}&colon; {{ status.text }}
        <i
          class="fa fa-times"
          role="button"
          aria-hidden="true"
          @click="removeTypeFilter(status)"
        ></i>
      </b-badge>
      <!-- Status Filters -->
      <div
        v-if="searchFilters.brand !='' || searchFilters.size!='' || searchFilters.category!=''"
        class="col-md-2 clearall-filter float-right">
        <span
          role="button"
          class="justify-content-center d-flex text-primary"
          @click="clearFilters()"
        >
          <u>{{ $t('vendor_purchase.clear_all_filters') }}</u>
        </span>
    </div>
    </div>
  </div>

        <!-- ./ -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CustomSelect from '~/components/common/CustomSelect.vue'
import { Years } from '~/static/constants/stock-exchange'
export default {
  name: 'ExchangeFilter',
  components: {
    CustomSelect,
  },
  data() {
    return {
      // TODO Dummy Data
      filterByTitle: this.$t('selling_page.status'),
      Years,
      searchValue: '',
      categorySelected: '', // For Sort by filter
      filterBy: '',
      brands: [],
      categories: [],
      showSuccessMessage: null,
      searchFilters: {
        filterBy: '',
        search: '',
        category: '',
        brand: '',
        size: '',
        priceRange: '',
      },
      activeTypeFilters: [],
      activeStatusFilters: [],
    }
  },
  computed:{
    ...mapGetters({activeFilters:'stock-exchange/getActiveFilters'}),
  },
  mounted(){
    this.loadFilters()
    // this.searchFilters = this.activeFilters
  },

  methods: {
    // Get All Product Filters List
    loadFilters() {
      this.$axios
      .get('/products/filters-list')
      .then((response) => {
        const brandsList = {}
        response.data.brands.forEach((elem,index) =>{
          const name =elem.name;
          brandsList[`${name}`]= name;
        })
        this.brands = brandsList

        const categoriesList = {}
        response.data.categories.forEach((elem,index) =>{
          const name =elem.name;
          categoriesList[`${name}`]= name;
        })
        this.categories = categoriesList
      })
      .catch((error) => {
        // Show unauthorized message on error
        this.$toasted.error(error)
      })
    },
    // On filter by change.
    searchProduct() {
      this.searchFilters.search =  this.searchValue
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleSortByChange(value) {
      this.searchFilters.filterBy = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterByCategories(value) {
      this.searchFilters.category = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterBySizeType(value) {
      this.searchFilters.size = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by change.
    handleFilterByPriceRange(value) {
      this.searchFilters.priceRange = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by brands.
    handleFilterByBrands(value) {
      this.searchFilters.brand = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // On filter by years.
    handleFilterByYears(value) {
      this.searchFilters.years = value === '' ? '' : value
       this.setActiveFilter()
      this.$emit('filterList',this.searchFilters)
    },
    // Remove the filter from respective arrays
    removeTypeFilter(option) {
      const statusFilter = this.activeTypeFilters
      if (statusFilter.includes(option)) {
          statusFilter.splice(statusFilter.indexOf(option), 1)
          this.$store.commit('stock-exchange/setActiveFilters',this.searchFilters)
          this.$emit('filterList',this.searchFilters)
      }
      if (statusFilter.lenght ===0)
      {
        this.clearFilters()
      }
    },
    // Clear the values
    clearFilters() {
      this.activeTypeFilters =[]
      this.activeStatusFilters =[]
      this.searchFilters= {
        filterBy: '',
        search: '',
        category: '',
        brand: '',
        size: '',
        priceRange: '',
      }
      this.$store.commit('stock-exchange/removeActiveFilters')
      this.$emit('filterList',this.searchFilters)
    },
    setActiveFilter(){
      const val =this.searchFilters
      this.activeTypeFilters=[]
      for (const value of Object.values(val)) {
        if(value !==''){
          if (!this.activeTypeFilters.includes(value)) {
            this.activeTypeFilters.push(value)

          }
        }
      }
      // this.$store.commit('stock-exchange/setActiveFilters',val)
    }

  },
}
</script>
