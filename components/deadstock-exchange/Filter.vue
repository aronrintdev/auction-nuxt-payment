<template>
<div>
  <div class="row h-100">
    <div class="col-md-12 col-lg-12 vendor-dashboard-body px-5 py-5">
      <!-- Row (Heading/ Search Fields/ Tabs) -->
      <div class="row vd-purchase-css">
        <!-- Heading -->
        <div class="col-12 purchase-heading">
          {{ $t('vendor_purchase.purchases') }}
        </div>
        <!-- ./Heading -->
        <!-- Search Input -->
        <div class="col-md-8 col-12 col-sm-6 mt-md-4 mt-2">
          <div class="form browse-search border rounded">
            <div class="form-group selling-search-input">
              <img
                :src="require('~/assets/img/icons/search.svg')"
                class="icon-search"
                alt="Search"
              />
              <input
                id="search-result"
                v-model="searchValue"
                type="text"
                class="form-control form-input vd-purchases-browse-input"
                :placeholder="$t('vendor_purchase.search_purchases_summary')"
                autocomplete="on"
                @input="searchPurchase"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- ./Row -->
      <!-- ./Row -->
      <div class="row filter-second-row">
        <div class="col-md-2 col-12 col-sm-12 mt-md-4 mt-2 datepicker">
          <b-form-datepicker
            id="example-datepicker-start"
            v-model="startdate"
            placeholder="Start date"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mb-2 h-100"
            @context="onContext"
          ></b-form-datepicker>
        </div>
        <div class="col-md-2 col-12 col-sm-12 mt-md-4 mt-2 datepicker">
          <b-form-datepicker
            id="example-datepicker-end"
            v-model="enddate"
            placeholder="End date"
            :dateFormatOptions="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            }"
            class="mb-2 h-100"
            @context="onContext"
          ></b-form-datepicker>
        </div>
        <div
          class="
            col-md-1 col-12 col-sm-12
            apply-btn-wrapper
            mt-md-4 mt-2
            text-center
          "
        >
          <b-button
            variant="apply"
            size="sm"
            class="text-white shadow"
            @click="loadData"
            >{{ $t('vendor_purchase.apply') }}</b-button
          >
        </div>
        <div class="col-md-2 mt-md-4 mt-2 clearall-filter">
          <span
            role="button"
            class="justify-content-center d-flex text-primary"
            @click="clearFilters()"
          >
            <u>{{ $t('vendor_purchase.clear_all_filters') }}</u>
          </span>
        </div>
      </div>
      <!-- ./Row -->
      <!-- Filters -->
      <div class="row filter-row">
        <div class="col-md-12 col-sm-12 mt-md-4 mt-4">
          <!-- Type Filters -->
          <b-badge
            v-for="(options, typeIndex) in activeTypeFilters"
            :key="`type-${typeIndex}`"
            class="filter-badge px-2 rounded-pill py-1 mr-2 text-capitalize"
          >
            {{ options.type }}&colon; {{ options.text }}
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
        </div>
      </div>
      <!-- ./ -->
      <div class="row vd-purchase-history mt-md-4 mt-4">
        <div class="col-12 purchase-history-heading">
          {{ $t('vendor_purchase.purchase_history') }} &#40;{{
          }}&#41;
        </div>
      </div>
      <!-- No products -->


    </div>
  </div>
</div>
</template>

<script>
import { PER_PAGE_OPTIONS, PERPAGE } from '~/static/constants'
export default {
  name: 'FiterPage',
  components: {
  },
  data() {
    return {
      rows: 10,
      currentPage: 1,
      refresh: false,
      purchaseFilter: '',
      activeFilterValue: 'all',
      productsFilter: '',
      searchValue: '', // Keyword search value
      purchaseDatas: [],
      sortbySelected: null,
      startdate: '', // StartDate filter value
      enddate: '', // EndDate Filter Value
      typeTitle: this.$t('vendor_purchase.type'),
      typeOptions: [
        {
          id: 1,
          text: this.$t('vendor_purchase.buy'),
          value: 1,
          type: this.$t('vendor_purchase.type'),
        },
        {
          id: 2,
          text: this.$t('vendor_purchase.sell'),
          value: 2,
          type: this.$t('vendor_purchase.type'),
        },
        {
          id: 3,
          text: this.$t('vendor_purchase.auction'),
          value: 3,
          type: this.$t('vendor_purchase.type'),
        },
        {
          id: 4,
          text: this.$t('vendor_purchase.trade'),
          value: 4,
          type: this.$t('vendor_purchase.type'),
        },
        {
          id: 5,
          text: this.$t('vendor_purchase.heatcheck'),
          value: 6,
          type: this.$t('vendor_purchase.type'),
        },
        {
          id: 6,
          text: this.$t('vendor_purchase.giftcard'),
          value: 5,
          type: this.$t('vendor_purchase.type'),
        },
      ],
      productsOptions: [
        {
          id: 1,
          text: this.$t('vendor_purchase.products'),
          value: '',
          type: 'products',
        },
        {
          id: 2,
          text: this.$t('vendor_purchase.orderstatus.pending'),
          value: 'pending_products',
          type: 'products',
        },
        {
          id: 3,
          text: this.$t('vendor_purchase.orderstatus.shipped_to_ds'),
          value: 'shipped_to_ds_products',
          type: 'products',
        },
        {
          id: 4,
          text: this.$t('vendor_purchase.orderstatus.received_at_ds'),
          value: 'received_at_deadstock_products',
          type: 'products',
        },
        {
          id: 5,
          text: this.$t(
            'vendor_purchase.orderstatus.authenticated_and_shipped'
          ),
          value: 'authenticated_and_shipped_products',
          type: 'products',
        },
        {
          id: 6,
          text: this.$t('vendor_purchase.orderstatus.delivered'),
          value: 'delivered_products',
          type: 'products',
        },
        {
          id: 7,
          text: this.$t('vendor_purchase.orderstatus.cancelled'),
          value: 'cancelled_products',
          type: 'products',
        },
        {
          id: 8,
          text: this.$t('vendor_purchase.heatcheck'),
          value: '',
          type: 'heatcheck',
        },
        {
          id: 9,
          text: this.$t('vendor_purchase.orderstatus.pending'),
          value: 'pending_heatcheck',
          type: 'heatcheck',
        },
        {
          id: 10,
          text: this.$t('vendor_purchase.orderstatus.passed'),
          value: 'passed_heatcheck',
          type: 'heatcheck',
        },
        {
          id: 11,
          text: this.$t('vendor_purchase.orderstatus.inconclusive'),
          value: 'inconclusive_heatcheck',
          type: 'heatcheck',
        },
        {
          id: 12,
          text: this.$t('vendor_purchase.orderstatus.cannot_verify'),
          value: 'cannotVerify_heatcheck',
          type: 'heatcheck',
        },
        {
          id: 13,
          text: this.$t('vendor_purchase.orderstatus.failed'),
          value: 'failed_heatcheck',
          type: 'heatcheck',
        },
        {
          id: 14,
          text: this.$t('vendor_purchase.giftcard'),
          value: '',
          type: 'giftcard',
        },
        {
          id: 15,
          text: this.$t('vendor_purchase.purchased'),
          value: 'complete_giftcard',
          type: 'giftcard',
        },
      ],
      statusTitle: this.$t('vendor_purchase.status'),
      statusFilter: [],
      typeFilter: [],
      filters: {
        keyword: '',
        sortBy: '',
        startDate: '',
        endDate: '',
        status: '',
        type: '',
      },
      activeTypeFilters: [],
      activeStatusFilters: [],
      perPage: PERPAGE,
      total: 0,
      perPageOption: PER_PAGE_OPTIONS,
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

    // Remove the filter from respective arrays
    removeTypeFilter(option) {
      if (option.type === 'Type') {
        const activeTypeFilter = this.activeTypeFilters
        const typeFilter = this.typeFilter
        if (activeTypeFilter.includes(option)) {
          activeTypeFilter.splice(activeTypeFilter.indexOf(option), 1)
        }
        if (typeFilter.includes(option.value)) {
          typeFilter.splice(typeFilter.indexOf(option.value), 1)
        }
      } else {
        const activeStatusFilter = this.activeStatusFilters
        const statusFilter = this.statusFilter
        if (activeStatusFilter.includes(option)) {
          activeStatusFilter.splice(activeStatusFilter.indexOf(option), 1)
        }
        if (statusFilter.includes(option.value)) {
          statusFilter.splice(statusFilter.indexOf(option.value), 1)
        }
      }
      this.loadData()
    },
  },
}
</script>
