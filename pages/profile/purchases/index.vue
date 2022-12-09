<template>
  <client-only>
    <div class="container-fluid vd-purchases-section p-0">
      <div class="row h-100 vd-purchases-section">
        <div
            :class="{
            'web-padding': !isScreenXS,
            mobile: isScreenXS,
          }"
            class="col-md-12 col-lg-12 vendor-dashboard-body main-section"
        >
          <!-- Row (Heading/ Search Fields/ Tabs) -->
          <div v-if="!isScreenXS" class="vd-purchase-css">
            <!-- Heading -->
            <div class="heading-13 mb-22">
              {{ $t('vendor_purchase.purchases') }}
            </div>
            <!-- ./Heading -->
            <!-- Search Input -->
            <div class="w-100 d-flex align-items-center justify-content-between">
              <div class="col-8 pl-0">
                <div class="flex-grow-1 d-flex input-field-search align-items-center">
                  <img
                      :src="require('~/assets/img/icons/search.svg')"
                      alt="Search"
                      class="mr-2"
                      height="18"
                      width="18"
                  />
                  <input
                      id="search-result"
                      v-model="searchValue"
                      :placeholder="
                      $t('vendor_purchase.search_purchases_summary_placeholder')
                    "
                      autocomplete="on"
                      class="border-0 w-100 input-text"
                      type="text"
                      @input="searchPurchase"
                  />
                </div>
              </div>
              <div class="col-4 pr-0 col-xl-3">
                <VendorPurchaseCustomSelect
                    :options="{
                    '': $t('vendor_purchase.sort_by'),
                    recent_to_old: $t('vendor_purchase.purchase_recent_to_old'),
                    old_to_recent: $t(
                      'vendor_purchase.purchase_oldest_to_recent'
                    ),
                  }"
                    :threeline-icon="false"
                    bordered
                    class="vp-custom-select w-100 bg-white-5"
                    inputClass="purchase-input"
                    dropdownClass="purchase-items"
                    @input="handleFilterChanged"
                ></VendorPurchaseCustomSelect>
              </div>
            </div>
            <!-- Select Box -->
          </div>
          <!-- ./Row -->
          <!-- ./Row -->
          <div v-if="!isScreenXS" class="mt-3 d-xl-flex">
            <div class="col-xl-4 px-0 pr-xl-3">
              <span class="filter-title">
                {{ $t('common.filter_by') }}
              </span>
              <div class="d-flex mb-3 mb-xl-0">
                <div class="col-6 pl-0">
                  <VendorPurchaseSelectWithCheckbox
                      :options="typeOptions"
                      :title="typeTitle"
                      :updateFilters="activeTypeFilters"
                      bordered
                      class="vp-custom-select purchase border-0 bg-white-5"
                      inputClass="purchase-input"
                      @filters="typeFilters"
                  />
                </div>

                <div class="col-6 pr-0">
                  <VendorPurchaseSelectWithCheckbox
                      :options="productsOptions"
                      :title="statusTitle"
                      :updateFilters="activeStatusFilters"
                      bordered
                      class="vp-custom-select purchase border-0 bg-white-5"
                      inputClass="purchase-input"
                      @filters="statusFilters"
                  />
                </div>
              </div>
            </div>
            <div class="col-xl-4 px-0">
              <span class="filter-title">
                {{ $t('orders.date_ordered') }}
              </span>
              <div class="d-flex">
                <div class="col-6 pl-0">
                  <CalendarInput
                      :placeholder="$t('bids.start_date').toString()"
                      :value="startdate"
                      class="date-calendar"
                      inputClass="letter-spacing-initial"
                      @context="(context) => (startdate = context.selectedYMD)"
                  ></CalendarInput>
                </div>
                <div class="col-6 pr-0">
                  <CalendarInput
                      :placeholder="$t('bids.end_date').toString()"
                      :value="enddate"
                      class="date-calendar"
                      inputClass="letter-spacing-initial"
                      @context="(context) => (enddate = context.selectedYMD)"
                  ></CalendarInput>
                </div>
              </div>
            </div>
            <Button
              class="mt-3 mt-xl-4 ml-xl-3 bg-blue-2 apply-button text-white"
              variant="dark-blue"
              @click="loadData"
            >
              {{ $t('vendor_purchase.apply') }}
            </Button>
          </div>
          <!-- ./Row -->
          <!-- Filters -->
          <div v-if="!isScreenXS" class="row filter-row mb-36">
            <div class="col-md-12 col-sm-12 mt-md-4 mt-4">
              <!-- Type Filters -->
              <b-badge
                  v-for="(options, typeIndex) in activeTypeFilters"
                  :key="`type-${typeIndex}`"
                  class="filter-badge body-9-regular px-2 rounded-pill py-1 mr-2 text-capitalize"
              >
                {{ options.text }}
                <img
                    :src="require('~/assets/img/close-dark-blue.svg')"
                    alt=""
                    class="ml-1"
                    role="button"
                    @click="removeTypeFilter(options)"
                />
              </b-badge>
              <!-- ./Type Filters -->
              <!-- Status Filters -->
              <b-badge
                  v-for="(status, statusIndex) in activeStatusFilters"
                  :key="`status-${statusIndex}`"
                  class="filter-badge body-9-regular px-2 rounded-pill py-1 mr-2 text-capitalize"
              >
                {{ status.type }}&colon; {{ status.text }}
                <img
                    :src="require('~/assets/img/close-dark-blue.svg')"
                    alt=""
                    class="ml-1"
                    role="button"
                    @click="removeTypeFilter(status)"
                />
              </b-badge>
              <!-- Status Filters -->
              <!-- clear filter link -->
              <span
                  v-if="activeStatusFilters.length || activeTypeFilters.length"
                  class="text-base-blue body-9-regular font-primary"
                  role="button"
                  @click="clearFilters()"
              >
                <u>{{ $t('vendor_purchase.clear_all_filters') }}</u>
              </span>
            </div>
          </div>
          <!-- ./ -->

          <div
              v-if="isScreenXS"
              class="d-flex align-items-center justify-content-between"
          >
            <MobileSearchInput
                :value="searchValue"
                class="w-100"
                @input="handleSearch"
            />
            <filter-svg
                class="ml-3"
                role="button"
                @click="mobileFiltersOpen = !mobileFiltersOpen"
            ></filter-svg>
          </div>

          <div
              :class="{
              mobile: isScreenXS,
            }"
              class="row vd-purchase-history"
          >
            <div
                :class="{
                'body-4-medium font-primary': isScreenXS,
                'purchase-history-heading': !isScreenXS,
              }"
                class="col-12"
            >
              {{ $t('vendor_purchase.purchase_history') }} &#40;{{ total }}&#41;
            </div>
          </div>
          <!-- No products -->

          <div
              v-if="loading"
              class="d-flex align-items-center justify-content-center"
          >
            <Loader :loading="loading"></Loader>
          </div>

          <template v-if="purchaseDatas.data && !loading">
            <div
                v-if="purchaseDatas.data.length === 0 && !isScreenXS"
                class="row vd-purchase-empty mb-5 mt-38"
            >
              <div class="col-12 text-center">
                <p class="vd-purchase-browse-now">
                  {{ $t('vendor_purchase.no_data_text') }}
                  <br/>
                  {{ $t('vendor_purchase.no_data_text_browsenow') }}
                </p>
                <nuxt-link class="btn vd-purchase-browse-btn" to="/shop"
                >{{ $t('vendor_purchase.browse') }}
                </nuxt-link>
              </div>
            </div>

            <!-- ./No products -->
            <template
                v-if="purchaseDatas.data.length !== 0 && !isScreenXS && !loading"
            >
              <VendorPurchaseHistory
                class="justify-content-center justify-content-md-start"
                :purchaseDatas="purchaseDatas.data"
              />
            </template>

            <div
                v-if="purchaseDatas.data.length !== 0 && isScreenXS"
                class="purchase-list"
            >
              <div v-for="purchase in purchaseDatas.data" :key="purchase.id">
                <MobilePurchaseHistoryCard :purchase="purchase"/>
              </div>
            </div>
            <div
                v-if="(!isScreenXS)"
                class="row justify-content-center purchase-paginator"
            >
              <Pagination
                  v-if="(purchaseDatas.data.length !== 0)"
                  v-model="currentPage"
                  :per-page="perPage"
                  :per-page-options="perPageOption"
                  :total="total"
                  class="mt-2"
                  @page-click="handlePageClick"
                  @per-page-change="handlePerPageChange"
              />
            </div>
            <div v-else>
              <infinite-loading
                  ref="loader"
                  :identifier="infiniteId"
                  @infinite="infiniteHandler"
              >
                <div slot="no-more"></div>
              </infinite-loading>
            </div>
          </template>
        </div>
      </div>

      <MobileBottomSheet
          :height="'90%'"
          :open="mobileFiltersOpen"
          :title="$t('common.filter_by').toString()"
          @closed="mobileFiltersOpen = false"
          @opened="mobileFiltersOpen = true"
      >
        <template #default>
          <div
              class="d-flex flex-column align-items-center justify-content-between h-88 w-100 filters"
          >
            <div class="d-flex flex-column w-100">
              <FilterAccordion
                  :open="true"
                  :title="$t('orders.sort').toString()"
              >
                <b-form-radio-group
                    v-model="sortbySelected"
                    :options="sortOptions"
                    class="d-flex flex-column mt-2 sort-filters"
                >
                </b-form-radio-group>
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion
                  :title="$t('purchases.purchase_type').toString()"
              >
                <ButtonSelector
                    :options="typeOptions"
                    :values="typeFilter"
                    @change="typeFilterChange"
                />
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion :title="statusTitle">
                <div class="d-flex flex-column">
                  <div class="filter-divider">
                    {{ $t('purchases.products') }}
                  </div>
                  <ButtonSelector
                      :options="
                      productsOptions.filter(
                        (a) => a.type === 'products' && a.value
                      )
                    "
                      :values="statusFilter"
                      @change="productFilterChange"
                  />
                  <div class="filter-divider">
                    {{ $t('purchases.gift_cards') }}
                  </div>
                  <ButtonSelector
                      :options="
                      productsOptions.filter(
                        (a) => a.type === 'giftcard' && a.value
                      )
                    "
                      :values="statusFilter"
                      @change="productFilterChange"
                  />
                </div>
              </FilterAccordion>
              <ItemDivider/>

              <FilterAccordion :title="$t('orders.date_ordered').toString()">
                <div
                    class="mt-2 d-flex align-items-center justify-content-between"
                >
                  <input
                      v-model="startdate"
                      :placeholder="$t('notifications.start_date')"
                      class="date-input"
                      type="date"
                  />
                  <input
                      v-model="enddate"
                      :placeholder="$t('notifications.end_date')"
                      class="date-input"
                      type="date"
                  />
                </div>
              </FilterAccordion>
            </div>
            <div class="w-100 d-flex justify-content-between buttons">
              <Button
                  :disabled="loading"
                  class="filter-button"
                  pill
                  variant="outline-dark"
                  @click="clearFilters"
              >
                {{ $t('notifications.reset') }}
              </Button>

              <Button
                  :disabled="loading"
                  class="filter-button apply-filters"
                  pill
                  variant="dark-blue"
                  @click="handleFilter"
              >
                {{
                  $t('notifications.apply_filters') +
                  (filterChangeCount ? ` (${filterChangeCount})` : '')
                }}
              </Button>
            </div>
          </div>
        </template>
      </MobileBottomSheet>
    </div>
  </client-only>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import InfiniteLoading from 'vue-infinite-loading'
import VendorPurchaseCustomSelect from '~/components/common/CustomSelect.vue'
import VendorPurchaseHistory from '~/components/profile/purchases/PurchaseHistory.vue'
import VendorPurchaseSelectWithCheckbox from '~/components/common/CustomSelectwithCheckbox.vue'
import {Pagination} from '~/components/common'
import {PER_PAGE_OPTIONS, PERPAGE} from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import MobileSearchInput from '~/components/mobile/MobileSearchInput'
import filterSvg from '~/assets/img/profile/notifications/filters.svg?inline'
import MobilePurchaseHistoryCard from '~/components/profile/purchases/MobilePurchaseHistoryCard'
import MobileBottomSheet from '~/components/mobile/MobileBottomSheet'
import Button from '~/components/common/Button'
import ItemDivider from '~/components/profile/notifications/ItemDivider'
import FilterAccordion from '~/components/mobile/FilterAccordion'
import ButtonSelector from '~/components/mobile/ButtonSelector'
import CalendarInput from '~/components/common/form/CalendarInput'
import Loader from '~/components/common/Loader'

export default {
  name: 'ProfilePreferencesPurchasesIndexPage',

  components: {
    Loader,
    CalendarInput,
    InfiniteLoading,
    ButtonSelector,
    FilterAccordion,
    ItemDivider,
    Button,
    MobileBottomSheet,
    MobilePurchaseHistoryCard,
    filterSvg,
    MobileSearchInput,
    VendorPurchaseCustomSelect,
    VendorPurchaseHistory,
    VendorPurchaseSelectWithCheckbox,
    Pagination,
  },
  mixins: [screenSize],
  layout: 'Profile',

  data() {
    return {
      infiniteId: +new Date(),
      loading: false,
      mobileFiltersOpen: false,
      rows: 10,
      currentPage: 1,
      refresh: false,
      purchaseFilter: [],
      activeFilterValue: 'all',
      productsFilter: [],
      searchValue: '', // Keyword search value
      purchaseDatas: [],
      sortbySelected: 'recent_to_old',
      startdate: '', // StartDate filter value
      enddate: '', // EndDate Filter Value
      sortOptions: [
        {
          value: 'recent_to_old',
          text: this.$t('vendor_purchase.purchase_recent_to_old'),
        },
        {
          value: 'old_to_recent',
          text: this.$t('vendor_purchase.purchase_oldest_to_recent'),
        },
      ],
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
    filterChangeCount() {
      return (
          +!!this.startdate +
          +!!this.enddate +
          +(this.statusFilter.length > 0) +
          +(this.typeFilter.length > 0)
      )
    },
    typeTitle() {
      return this.activeTypeFilters.length
          ? this.activeTypeFilters.map((a) => a.text).join(', ')
          : this.$t('vendor_purchase.type')
    },
    statusTitle() {
      return this.activeStatusFilters.length
          ? this.activeStatusFilters
              .map(
                  (a) =>
                      `${this.$options.filters.capitalizeFirstLetter(a.type)}: ${
                          a.text
                      }`
              )
              .join(', ')
          : this.$t('vendor_purchase.status')
    },
  },

  mounted() {
    this.loadData()
  },
  methods: {
    infiniteHandler($state) {
      if (this.total > this.perPage) {
        this.perPage += PERPAGE
        this.loadData($state)
      } else {
        $state.complete()
      }
    },
    typeFilterChange(types) {
      this.typeFilter = types
    },
    productFilterChange(filter) {
      this.statusFilter = filter
    },
    handleFilter() {
      this.infiniteId += 1
      this.perPage = PERPAGE
      this.loadData()
    },
    handleSearch(value) {
      this.infiniteId += 1
      this.perPage = PERPAGE
      this.searchValue = value
      this.loadData()
    },
    // Search Data
    searchPurchase() {
      this.loadData()
    },
    // On filter change
    handleFilterChanged(filter) {
      this.sortbySelected = filter
      this.loadData()
    },
    // Filters onchange
    typeFilters({array, value}) {
      this.activeTypeFilters = array
      // For backend
      if (this.typeFilter.includes(value)) {
        this.typeFilter.splice(this.typeFilter.indexOf(value), 1)
      } else {
        this.typeFilter.push(value)
      }
    },

    // Status filters onchange
    statusFilters({array, value}) {
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
    loadData($loaderState = null) {
      if (!$loaderState)
        this.loading = true
      this.filters.keyword = this.searchValue
      this.filters.sortBy = this.sortbySelected
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
            if ($loaderState) {
              $loaderState.loaded()
            }
          })
          .catch((err) => {
            this.$logger.logToServer(
                'Vendor purchase section - get Purchase Data error: ',
                err.response.data
            )
            this.$toasted.error(this.$t(err.response.data.message))
          })
          .finally(() => {
            this.loading = false
            this.mobileFiltersOpen = false
          })
    },

    // Clear the values
    clearFilters() {
      this.infiniteId += 1
      this.perPage = PERPAGE
      this.mobileFiltersOpen = false
      this.searchValue = ''
      this.productsFilter = []
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

<style lang="sass" scoped>
@import "~/assets/css/variables"

.filter-title
  @include body-8-normal
  color: $color-black-1
  font-family: $font-family-sf-pro-display

::v-deep.vp-custom-select
  .selected
    &:after
      top: 3px

::v-deep.date-calendar
  .date-input
    background-color: $color-white-1
    @include body-5-regular
    font-family: $font-montserrat
    font-style: normal
    white-space: nowrap

  .date-dp
    .btn-secondary
      background-color: $color-white-1

.flex-end-align-col
  align-self: flex-end

.font15
  font-size: 15px !important

.font-normal
  font-weight: normal !important

.filter-label
  font-weight: $normal !important

.apply-btn-wrapper button
  height: 40px
  line-height: 0

  background:$color-blue-20 !important

.filter-datepicker
  padding: 0
  margin: 0 7.5px
  direction: rtl

.filter-datepicker .b-form-datepicker
  background: $color-white-1
  height: 40px !important
  margin: 0 !important
  font-size: 14px
  padding: 0
  margin: 0 7.5px

.browse-search .form-input
  height: 38px
  max-width: 100% !important
  width: 100% !important
  padding: 0
  margin: 0
  font-size: 14px

.custom-selectbox div
  font-size: 14px !important
  font-weight: normal !important

input.date-input
  @include body-9
  height: 49px
  width: 154px
  border-radius: 10px
  border: 1px solid $color-black-1
  font-family: $font-montserrat
  font-style: normal
  font-weight: $medium
  color: $color-black-4
  padding: 15px 17px

.filter-divider
  @include body-5-normal
  background-color: $color-white-5
  padding: 4px 14px
  font-family: $font-family-sf-pro-display
  font-style: normal
  margin-bottom: 10px
  margin-top: 20px

.filters
  padding: 28px 21px

.h-88
  height: 92%

.buttons
  margin-top: 10px

::v-deep.divider
  border-top: 1px solid $color-gray-62
  margin-inline: 0
  margin-block: 20px

::v-deep.sort-filters
  .custom-control
    display: flex
    align-items: center

    label
      @include body-5-normal
      padding-top: 3px
      font-family: $font-family-sf-pro-display
      font-style: normal
      color: $color-black-9

      &:before
        color: $color-black-1
        border-color: $color-black-1
        background-color: $color-white-1
        box-shadow: none

::v-deep.sort-filters
  .custom-control-input
    &:checked ~ .custom-control-label::after
      background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='4' fill='%23000'/%3E%3C/svg%3E")

.vendor-dashboard-body
  background: $color-white-5
  &.mobile
    padding: 16px 20px
    background-color: $color-white-1

.purchase-list
  margin-top: 5px

.vd-purchase-history
  &.mobile
    margin-top: 30px
    @include body-4-medium
    font-family: $font-montserrat

@media (min-width: 768px) and (max-width: 1299px)
  .datepicker
    flex: 0 0 26.666667%
    max-width: 26.666667%

    :deep(.b-form-btn-label-control.form-control > .form-control)
      height: 38px

@media (min-width: 768px) and (max-width: 1100px)
  :deep(.clearall-filter)
    flex: 0 0 22.666667%
    max-width: 22.666667%

.main-section
  background: $color-white-5
</style>
