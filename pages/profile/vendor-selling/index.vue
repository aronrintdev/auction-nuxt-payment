<template>
  <b-container fluid>
    <b-row class="h-100">
      <b-col
        md="12"
        lg="12"
        :class="`vendor-dashboard-body ${
          !mobileClass ? 'px-5 py-5' : 'pad-responsive'
        }`"
      >
        <!-- FILTERS -->
        <!-- Row -->
        <div class="row vd-selling">
          <!-- Heading -->
          <div
            class="
              col-12
              mt-md-4
              my-2
              vd-selling-heading
              d-flex
              align-items-center
            "
            :class="mobileClass"
          >
            {{ $t('selling_page.selling_page_heading') }}
          </div>
          <!-- Heading -->

          <!-- Search Filter -->
          <div
            v-if="userRole"
            class="
              flex-grow-1
              col-sm-12 col-md-8 col-lg-8
              mt-sm-4
              vd-selling-search
            "
          >
            <!--
            <VendorSellingSearchFilter
              v-if="!isScreenXS"
              class="search-filter"
              @search="getProducts"
            />
            -->
            <SearchInput
              v-if="!isScreenXS"
              :placeholder="
                $t('selling_page.filter_details_placeholder').toString()
              "
              class="flex-grow-1 mw-734 search"
              :debounce="1000"
              @search="getProducts"
            />

            <div
              v-else
              class="search-filter-responsive d-flex align-items-center"
            >
              <SearchInput
                id="selling-search"
                class="flex-grow-1 mr-2"
                :placeholder="$t('navbar.search')"
                :value="searchFilters.searchKeyword"
                @change="getProducts"
              />
              <span class="filter-wrapper" role="button" @click="showFilter">
                <img
                  class="mobile-filter"
                  :src="require('~/assets/img/icons/filter-icon.svg')"
                  alt="filter-icon"
                />
              </span>
            </div>
          </div>

          <!-- Sort By -->
          <div
            v-if="userRole"
            class="
              flex-grow-1
              col-sm-12 col-md-4 col-lg-4
              mt-sm-4
              col-sm-6
              browse-dropdown
            "
          >
            <VendorSellingSortBy
              :default="purchaseFilter"
              :options="{
                '': $t('selling_page.sortby'),
                'date-new-old': $t('selling_page.listing_recent_to_old'),
                'date-old-new': $t('selling_page.listing_oldest_to_recent'),
              }"
              class="vendor-selling-sort"
              @input="handleFilterChanged"
            ></VendorSellingSortBy>
          </div>
          <!-- Sort By -->
        </div>
        <!-- Row -->
        <div v-if="resultLength" class="row filter-data">
          <!-- Tabs Filter -->
          <div class="col-12 col-md-4 mt-sm-4 col-sm-12 filter-by mt-2 mt-md-4">
            <label class="filter-text">{{
              $t('selling_page.filter_by')
            }}</label>
            <VendorSellingFilterBy
              v-if="searchResults.data"
              :default="filterBy"
              :options="filterByOptions"
              :title="filterByTitle"
              :updateFilters="activeFilters"
              @filters="updateFilterBy"
            />
          </div>
          <!-- ./Tabs Filter -->

          <!-- Start Date -->
          <div class="col-md-2 col-sm-12 start-date mt-5 pt-3 mt-md-4 pt-md-0">
            <label class="filter-text mb-0">{{
              $t('selling_page.listed_date')
            }}</label>
            <b-form-datepicker
              v-if="searchResults.data"
              id="example-datepicker-start"
              v-model="searchFilters.startDate"
              class="form-item"
              placeholder="Start Date"
              :dateFormatOptions="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            ></b-form-datepicker>
          </div>
          <!-- ./Start Date -->

          <!-- End Date -->
          <div class="col-md-2 col-sm-12 end-date mt-4 mt-md-4 pt-0 pt-md-3">
            <b-form-datepicker
              v-if="searchResults.data"
              id="example-datepicker-end"
              v-model="searchFilters.endDate"
              class="mt-2 form-item"
              placeholder="End date"
              :dateFormatOptions="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
            ></b-form-datepicker>
          </div>
          <!-- ./End Date -->

          <!-- Apply Button -->
          <div class="col-md-1 col-sm-12 col-xs-6 mt-4 mt-md-4">
            <br />
            <Button
              variant="apply text-cente form-item"
              class="px-3"
              :class="{ 'w-100': isScreenXS || isScreenSM }"
              @click="loadData"
            >
              {{ $t('selling_page.apply') }}
            </Button>
          </div>
          <!-- Apply Button -->

          <div class="col-md-3 float-right">
            <Button
            variant="delist"
            class="float-right mt-2 text-center"
            @click="delistMultiple()"
          >
            {{ $t('selling_page.delist_multiple') }}
          </Button>
          </div>
        </div>

        <div
          v-if="resultLength && searchResults.data && !isScreenXS"
          class="
            row
            mt-5
            px-3
            d-flex
            flex-column flex-sm-row
            justify-content-between
          "
        >
          <!-- Delist Multiple Button -->
          <!-- ./Delist Multiple Button -->

          <!-- vacation mode -->
          <div class="d-flex align-items-center mt-3 mt-sm-0">
            <div>
              <template v-if="activeFilters.length">
                <b-badge
                  v-for="(options, typeIndex) in activeFilters"
                  :key="`type-${typeIndex}`"
                  class="
                    filter-badge
                    px-2
                    rounded-pill
                    py-1
                    mr-2
                    text-capitalize
                  "
                >
                  {{ options.type }}&colon; {{ options.text }}
                  <i
                    class="fa fa-times"
                    role="button"
                    aria-hidden="true"
                    @click="removeTypeFilter(options)"
                  ></i>
                </b-badge>
                <span
                  role="button"
                  class="text-decoration-underline text-primary"
                  @click="clearFilters()"
                >
                  {{ $t('vendor_purchase.clear_all_filters') }}
                </span>
              </template>
            </div>
            <div class="vacationMode d-flex align-items-center">
              <!-- TODO: Vacation Mode -->
              <b-form-checkbox
                id="checkbox"
                v-model="vacationMode"
                name="checkbox-1"
                :value="true"
                :unchecked-value="false"
                @change="enableDisableVacationMode"
              >
                {{ $t('selling_page.enable_vacation_mode') }}
                <img
                  :src="require('~/assets/img/icons/info-blue.svg')"
                  alt="ToolTip"
                />
              </b-form-checkbox>
            </div>
          </div>
          <!-- vacation mode -->
        </div>
        <!-- ./Row -->
        <!-- FILTERS ENDS HERE -->

        <template
          v-if="!searchResults.data || !searchResults.data.length"
          class="result-data"
        >
          <!-- Empty Content -->
          <EmptyListing class="empty-listing" />
          <!-- ./Empty Content -->
        </template>
        <template v-else class="result-data">
          <div v-if="!!action" class="p-md-4 p-2">
            <BulkSelectToolbar
              ref="bulkSelectToolbar"
              :active="!!action"
              :selected="selected"
              :unit-label="$tc('common.product', selected.length)"
              :total="totalCount"
              :action-label="$t(`selling_page.${action}_selected`)"
              class="mt-3"
              :successMessage="showSuccessMessage"
              @undo="undoBulkAction"
              @close="cancelAction()"
              @selectAll="handleSelectAll()"
              @deselectAll="handleDeselectAll()"
              @submit="handleBulkAction()"
            />
          </div>

          <!-- DATA -->
          <VendorSellingListItem
            v-if="!isScreenXS"
            class="list-item"
            :searchResults="searchResults.data"
            :loading="loading"
            :totalCount="totalCount"
            :showCheckBox="showCheckBox"
            :selected="selected"
            @selectedItem="selectedItem"
          />

          <Pagination
            v-model="page"
            :total="totalCount"
            :per-page="perPage"
            :per-page-options="perPageOptions"
            class="mt-2 pagination"
            @page-click="handlePageClick"
            @per-page-change="handlePerPageChange"
          />
        </template>
        <!-- ./DATA  -->

        <!-- ListingData Responsive -->
        <template
          v-if="!responsiveData || !responsiveData.length"
          class="result-data-empty"
        >
          <!-- Empty Content -->
          <EmptyListing class="empty-listing-responsive" />
          <!-- ./Empty Content -->
        </template>
        <template v-else>
          <div v-if="isScreenXS" class="listing-count py-4">
            <div class="row">
              <div class="col listing-heading-col">
                <span class="float-left">
                  {{ $t('selling_page.listings') }} &#40;{{
                    totalCount
                  }}&#41;</span
                >
                <span class="float-left ml-2" role="button" @click="moreOption">
                  <img
                    :src="require('~/assets/img/icons/extra_dot.png')"
                    alt="more-option"
                  />
                </span>
              </div>
              <div class="col select-all-col">
                <span v-show="showCheckBox" class="float-right">
                  <div class="check-box round position-relative">
                    <input
                      id="checkbox-select-all"
                      v-model="delistCheckbox"
                      type="checkbox"
                      class="check-box invisible"
                      @change="handleSelectAllListingItem"
                    />
                    <label
                      for="checkbox-select-all"
                      class="position-absolute"
                    ></label>
                    {{ $t('common.select_all') }}
                  </div>
                </span>
              </div>
            </div>
          </div>

          <template v-if="isScreenXS">
            <ListItemResult
              v-for="(result, index) in responsiveData"
              :key="index"
              :result="result"
              :selected="selected"
              :delistMultiple="showCheckBox"
              @select="selectedListItem"
            />
          </template>
          <infinite-loading
            v-if="responsiveData.length && isScreenXS"
            spinner="spiral"
            @infinite="infiniteScroll"
          ></infinite-loading>
        </template>

        <!-- ListingData Responsive Ends -->
      </b-col>
    </b-row>

    <!-- Mobile Filters -->

    <!-- For more options -->
    <vue-bottom-sheet
      ref="myBottomSheet"
      class="more-options"
      max-width="auto"
      max-height="90vh"
      :rounded="true"
    >
      <MoreOptions
        @delistMultiple="delistMultipleConfirmation"
        @enterVacationModeConfirmation="enterVacationModeConfirmation"
        @exitVacationModeConfirmation="exitVacationModeConfirmation"
        @close="closeMoreOption"
      />
    </vue-bottom-sheet>
    <!-- For more options end -->

    <!-- For mobile filters -->
    <vue-bottom-sheet
      ref="filter"
      class="responsive-filter"
      max-width="auto"
      :is-full-screen="true"
      max-height="450px"
      :rounded="true"
    >
      <MobileFilter @filter="applyFilter" />
    </vue-bottom-sheet>
    <!-- For mobile filters end -->

    <!-- For entering vacation mode -->
    <vue-bottom-sheet
      id="vacation-mode-enter"
      ref="enterVacationModeConfirmation"
      max-width="auto"
      max-height="47vh"
      :rounded="true"
    >
      <vacation-mode-confirmation
        :enteringVacationMode="enteringVacationMode"
        :exitingVacationMode="exitingVacationMode"
        @onCancel="onVacationModeCancel"
        @onConfirm="onVacationModeEnterConfirm"
      />
    </vue-bottom-sheet>
    <vue-bottom-sheet
      id="vacation-mode-exit"
      ref="exitVacationModeConfirmation"
      max-width="auto"
      max-height="40vh"
      :rounded="true"
    >
      <vacation-mode-confirmation
        :enteringVacationMode="enteringVacationMode"
        :exitingVacationMode="exitingVacationMode"
        @onCancel="onVacationModeCancel"
        @onConfirm="onVacationModeExitConfirm"
      />
    </vue-bottom-sheet>
    <!-- For entering vacation mode ends -->

    <vue-bottom-sheet
      id="delistConfirmation"
      ref="delistConfirmation"
      max-width="100vw"
      max-height="32vh"
      :rounded="true"
    >
      <ListingConfirmation
        :action="delist"
        @onCancel="onDelistCancel"
        @onConfirm="onDelistConfirm"
      />
    </vue-bottom-sheet>

    <!-- Mobile Filters end here -->

    <!-- Modal Popups Start Here -->
    <ConfirmModal
      id="confirm-modal"
      :message="$t('selling_page.bulk_delist')"
      :confirmLabel="$t('selling_page.delist')"
      @confirm="handleBulkDelist()"
    />

    <!-- Enable Vacation mode -->
    <SellingModal
      id="enable-vacationMode"
      :heading="$t('selling_page.vacation_mode.entering_vacation_mode')"
      :confirmLabel="$t('common.enable')"
      :description1="
        $t('selling_page.vacation_mode.active_listing_become_delisted')
      "
      :description2="$t('selling_page.vacation_mode.giveup_all_placed_offers')"
      :description3="$t('selling_page.vacation_mode.enable_vacation_mode')"
      @onClear="closeVacationMode"
      @onConfirm="confirmVacationMode"
      @hidden="vacationMode = false"
    />
    <!-- ./Enable Vacation Mode -->
    <!-- Exiting Vacation Mode -->
    <SellingModal
      id="exiting-vacationMode"
      :heading="$t('selling_page.vacation_mode.exiting_vacation_mode')"
      :confirmLabel="$t('common.disable')"
      :description1="
        $t('selling_page.vacation_mode.all_listing_become_relisted')
      "
      :description2="$t('selling_page.vacation_mode.disable_vacation_mode')"
      @onClear="closeExitVacationMode"
      @onConfirm="exitVacationMode"
      @hidden="enabledVacationMode = false"
    />
    <!-- ./Exiting Vacation Mode -->

    <AlertModal
      id="delisted-modal"
      :message="$t('selling_page.delisted_selected_listing')"
      icon="trash"
      hideHeader
      @hidden="$bvModal.hide('delisted-modal')"
    />

    <!-- Modal Popups ends here -->
  </b-container>
</template>

<script>
import debounce from 'lodash.debounce'
import EmptyListing from '~/components/profile/vendor-selling/EmptyListing.vue'
// import VendorSellingSearchFilter from '~/components/profile/vendor-selling/SearchFilter'
import VendorSellingListItem from '~/components/profile/vendor-selling/VendorSellingListItem'
import SellingModal from '~/components/profile/vendor-selling/SellingModal.vue'
import {
  CustomSelect as VendorSellingSortBy,
  CustomSelectwithCheckbox as VendorSellingFilterBy,
  Button,
  Pagination,
  BulkSelectToolbar,
  SearchInput,
} from '~/components/common'
import { ConfirmModal, AlertModal } from '~/components/modal'
import screenSize from '~/plugins/mixins/screenSize'
import ListItemResult from '~/components/profile/vendor-selling/ListItemResult.vue'
import MoreOptions from '~/components/profile/vendor-selling/MoreOptions.vue'
import MobileFilter from '~/components/profile/vendor-selling/filters/MobileFilter.vue'
import VacationModeConfirmation from '~/components/profile/vendor-selling/VacationModeConfirmation.vue'
import { DELIST, RELIST } from '~/static/constants'
import ListingConfirmation from '~/components/profile/vendor-selling/details/ListingConfirmation.vue'

export default {
  name: 'Index',

  components: {
    VendorSellingSortBy,
    // VendorSellingSearchFilter,
    VendorSellingFilterBy,
    Button,
    VendorSellingListItem,
    Pagination,
    BulkSelectToolbar,
    ConfirmModal,
    SellingModal,
    EmptyListing,
    ListItemResult,
    MoreOptions,
    MobileFilter,
    VacationModeConfirmation,
    SearchInput,
    ListingConfirmation,
    AlertModal,
  },
  mixins: [screenSize],
  layout: 'Profile',
  middleware: ['vendor'],
  data() {
    return {
      loading: false,
      selected: [],
      action: null,
      page: 1,
      totalCount: 0,
      perPage: 8,
      perPageOptions: [8, 16, 32, 48],
      searchResults: [],
      searchFilters: {
        searchKeyword: '',
        searchSortBy: '',
        searchFilterBy: [],
        startDate: '',
        endDate: '',
        delistMultipleSelected: false,
      },
      showSuccessMessage: null,
      vacationMode: false,
      purchaseFilter: '',
      filterBy: '',
      bulkSuccess: false,
      filterByTitle: this.$t('selling_page.status'),
      filterByOptions: [
        {
          id: 1,
          text: this.$t('selling_page.listed'),
          value: 'listed',
          type: this.$t('selling_page.filter_by'),
        },
        {
          id: 2,
          text: this.$t('selling_page.delisted'),
          value: 'delisted',
          type: this.$t('selling_page.filter_by'),
        },
      ],
      activeFilters: [],
      showCheckBox: false,
      undoSelected: [],
      enabledVacationMode: false,
      userRole: this.$auth.user.roles_name.includes('Vendor'),
      //
      selectAll: false,
      enteringVacationMode: false,
      exitingVacationMode: false,
      pageCount: 0,
      delist: DELIST,
      delistCheckbox: false,
      relist: RELIST,
      responsiveData: [],
    }
  },

  computed: {
    searchData: (vm) => {
      if (vm.isScreenXS) {
        return vm.responsiveData && vm.responsiveData
      } else {
        return vm.searchResults && vm.searchResults.data
      }
    },

    resultLength: (vm) => {
      return vm.searchResults.data && vm.searchResults.data.length
    }
  },

  watch: {
    // On vacation mode click
    vacationMode(val) {
      if (this.enabledVacationMode === true) {
        this.vacationMode = true
      } else {
        this.vacationMode = val
      }
    },
  },

  mounted() {
    // Load the data
    this.responsiveData = []
    this.loadData()
    this.searchFilters.delistMultipleSelected = false
  },

  methods: {
    infiniteScroll($state) {
      setTimeout(() => {
        this.page++
        this.$axios
          .get('selling-items', {
            params: {
              perPage: this.perPage,
              searchFilters: this.searchFilters,
              page: this.page,
            },
          })
          .then((res) => {
            if (res.data.data.data.length > 1) {
              this.loading = false
              this.responsiveData.push(...res.data.data.data)
              this.searchResults = res.data.data
              this.totalCount = parseInt(res.data.data.total)
              this.perPage = parseInt(res.data.data.per_page)
              this.pageCount = parseInt(res.data.data.last_page)
              $state.loaded()
            } else {
              $state.complete()
            }
          })
          .catch((err) => {
            this.$logger.logToServer('Selling Data', err.response)
          })
      }, 500)
    },

    onScrollLoad(page) {
      if (this.page !== page) {
        this.page = page
        this.loadData()
      }
    },

    // Load the data
    loadData() {
      this.responsiveData = []
      this.$axios
        .get('selling-items', {
          params: {
            perPage: this.perPage,
            searchFilters: this.searchFilters,
            page: this.page,
          },
        })
        .then((res) => {
          this.loading = false
          this.responsiveData.push(...res.data.data.data)
          this.searchResults = res.data.data
          this.totalCount = parseInt(res.data.data.total)
          this.perPage = parseInt(res.data.data.per_page)
          this.pageCount = parseInt(res.data.data.last_page)
        })
        .catch((err) => {
          this.$logger.logToServer('Selling Data', err.response)
        })
    },
    // Search keyword
    getProducts: debounce(function (val) {
      this.searchFilters.searchKeyword = val
      this.loadData()
    }, 300),

    // On sort by change
    handleFilterChanged(sortByVal) {
      this.searchFilters.searchSortBy = sortByVal
      this.loadData()
    },

    // Update filter by
    updateFilterBy({ array, value }) {
      this.activeFilters = array

      if (this.searchFilters.searchFilterBy.includes(value)) {
        this.searchFilters.searchFilterBy.splice(
          this.searchFilters.searchFilterBy.indexOf(value),
          1
        )
      } else {
        this.searchFilters.searchFilterBy.push(value)
      }
    },

    // Remove the filter.
    removeTypeFilter(option) {
      if (this.searchFilters.searchFilterBy.includes(option.value)) {
        this.searchFilters.searchFilterBy.splice(
          this.searchFilters.searchFilterBy.indexOf(option.value),
          1
        )
      }
      if (this.activeFilters.includes(option)) {
        this.activeFilters.splice(this.activeFilters.indexOf(option), 1)
      }
      this.loadData()
    },

    // Clear the filters.
    clearFilters() {
      this.searchFilters.searchKeyword = ''
      this.searchFilters.searchSortBy = ''
      this.searchFilters.searchFilterBy = []
      this.searchFilters.startDate = ''
      this.searchFilters.endDate = ''

      this.activeFilters = []
      this.loadData()
    },

    // On pagination click
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.page = page
        this.loadData()
      }
    },

    // Per page change
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.page = 1
        this.loadData()
      }
    },

    // Delist multiple button on click event
    delistMultiple() {
      if (this.action !== null) {
        this.action = null
        this.selected = []
        this.showCheckBox = false
      } else {
        this.action = this.delist
        this.showCheckBox = true
      }
      this.searchFilters.delistMultipleSelected =
        !this.searchFilters.delistMultipleSelected
      this.loadData()
    },

    // Checkbox on checked/ unchecked
    selectedItem(val) {
      if (this.selected.includes(val)) {
        this.selected.splice(this.selected.indexOf(val), 1)
      } else {
        this.selected.push(val)
      }
    },

    /* Bulk select on close */
    cancelAction() {
      this.action = null
      this.selected = []
      this.undoSelected = []
      this.showCheckBox = false
    },

    // Bulk select
    handleSelectAll() {
      if (!this.isScreenXS) {
        this.selected = this.searchResults.data.map((p) => p.id)
      } else {
        this.selected = this.responsiveData.map((p) => p.id)
      }
    },

    // Bulk deselect
    handleDeselectAll() {
      this.selected = []
    },

    // On bulk action
    handleBulkAction() {
      this.bulkDelist = true
      this.$bvModal.show('confirm-modal')
    },

    // On delist multiple confirm
    handleBulkDelist() {
      this.multipleDelist()
      this.action = 'undo'
      this.showSuccessMessage = this.$t('selling_page.delist_success')
      this.searchFilters.delistMultipleSelected = false
    },

    // Vacation Mode on cancel
    closeVacationMode() {
      this.vacationMode = false
      this.$bvModal.hide('enable-vacationMode')
    },
    // On Cancel
    closeExitVacationMode() {
      this.vacationMode = false
      this.enabledVacationMode = false
      this.$bvModal.hide('exiting-vacationMode')
    },

    // Vacation mode on confirm
    confirmVacationMode() {
      if (!this.isScreenXS) {
        this.selected = this.searchResults.data.map((p) => p.id)
      } else {
        this.selected = this.responsiveData.map((p) => p.id)
      }
      this.multipleDelist()
      this.enabledVacationMode = true
      this.action = null
      this.$nuxt.refresh()
      this.$bvModal.hide('enable-vacationMode')
    },

    // Undo Delisting
    undoBulkAction(showPopUp) {
      this.$axios
        .put('/listing-items/relist', {
          id: this.undoSelected,
        })
        .then((res) => {
          this.cancelAction()
          if (!showPopUp === 'hidePopUp') {
            this.$toasted.success(this.$t(res.data.message))
          }
          this.responsiveData = []
          this.$nuxt.refresh()
          this.loadData()
        })
        .catch((err) => {
          this.$logger.logToServer('Relist multiple', err.response)
        })
    },

    // TODO: Vacation Mode on change
    enableDisableVacationMode(e) {
      if (e === true) {
        this.$bvModal.show('enable-vacationMode')
      } else if (this.enabledVacationMode === true) {
        this.$bvModal.show('exiting-vacationMode')
      } else {
        this.$bvModal.hide('enable-vacationMode')
      }
    },

    // TODO: Exiting vacation mode
    exitVacationMode() {
      if (!this.isScreenXS) {
        this.undoSelected = this.searchResults.data.map((p) => p.id)
      } else {
        this.undoSelected = this.responsiveData.map((p) => p.id)
      }
      this.undoBulkAction()
      this.vacationMode = false
      this.enabledVacationMode = false
      this.$nuxt.refresh()
      this.$bvModal.hide('exiting-vacationMode')
    },

    handleSelectAllListingItem() {
      if (this.delistCheckbox) {
        this.handleSelectAll()
        this.$refs.delistConfirmation.open()
      } else {
        this.handleDeselectAll()
      }
    },

    // Do delisting
    multipleDelist() {
      this.$axios
        .put('/listing-items/delist', {
          id: this.selected,
        })
        .then(() => {
          this.undoSelected = this.selected
          this.selected = []
          this.showCheckBox = false
          this.$nuxt.refresh()
          this.loadData()
        })
        .catch((error) => {
          this.$logger.logToServer('Delisting item:', error.response)
        })
    },

    // Show more options.
    moreOption() {
      this.$refs.myBottomSheet.open()
    },

    // Show the filter
    showFilter() {
      this.$refs.filter.open()
    },

    // On responsive filter apply
    applyFilter(value) {
      this.searchFilters.searchFilterBy = value.status
      this.searchFilters.searchSortBy = value.sortby
      if (value.date && value.date.start) {
        this.searchFilters.startDate = this.$options.filters.formatDate(
          value.date.start,
          'YYYY-MM-DD'
        )
      }
      if (value.date && value.date.end) {
        this.searchFilters.endDate = this.$options.filters.formatDate(
          value.date.end,
          'YYYY-MM-DD'
        )
      }

      this.loadData()
      this.$refs.filter.close()
    },

    delistMultipleConfirmation() {
      this.showCheckBox = !this.showCheckBox
      this.searchFilters.delistMultipleSelected =
        !this.searchFilters.delistMultiple
      this.page = 1
        this.loadData() 
      this.$refs.myBottomSheet.close()
    },

    // Entering vacation mode confirmation vue-bottom-sheet
    enterVacationModeConfirmation() {
      this.enteringVacationMode = true
      this.exitingVacationMode = false

      this.$refs.myBottomSheet.close()
      this.$refs.enterVacationModeConfirmation.open()
    },

    // On exit vacation mode
    exitVacationModeConfirmation() {
      this.enteringVacationMode = false
      this.exitingVacationMode = true

      this.$refs.myBottomSheet.close()
      this.$refs.exitVacationModeConfirmation.open()
    },

    // On vacation mode cancel
    onVacationModeCancel() {
      this.$refs.enterVacationModeConfirmation.close()
      this.$refs.exitVacationModeConfirmation.close()
      this.$auth.$storage.removeUniversal(`vacationMode-${this.$auth.user.id}`)
    },

    // On vacation mode enter
    onVacationModeEnterConfirm() {
      if (this.enteringVacationMode && !this.exitingVacationMode) {
        this.handleBulkSelect('delist')
        this.$auth.$storage.setUniversal(`vacationMode-${this.$auth.user.id}`, {
          userid: this.$auth.user.id,
          enable: true,
        })
        this.action = null
        this.$nuxt.refresh()
        this.$refs.enterVacationModeConfirmation.close()
        return true
      }
    },

    // On vacation mode exit
    onVacationModeExitConfirm() {
      if (!this.enteringVacationMode && this.exitingVacationMode) {
        this.handleBulkSelect(this.relist)
        this.$auth.$storage.setUniversal(`vacationMode-${this.$auth.user.id}`, {
          userid: this.$auth.user.id,
          enable: false,
        })
        this.action = null
        this.$nuxt.refresh()
        this.$refs.exitVacationModeConfirmation.close()
        this.loadData()

        return true
      }
    },

    // On bulk select
    handleBulkSelect(value) {
      if (!this.isScreenXS) {
        for (let i = 1; i <= this.pageCount; i++) {
          this.page = i
          this.$axios
            .get('selling-items', {
              params: {
                perPage: this.perPage,
                searchFilters: this.searchFilters,
                page: this.page,
              },
            })
            .then((res) => {
              this.page = 1
              this.selected.push(...res.data.data.data.map((p) => p.id))
              if (value === this.delist) {
                this.multipleDelist()
                return true
              }
              if (value === this.relist) {
                this.undoBulkAction('hidePopUp')
                return true
              }
            })
            .catch((err) => {
              this.$logger.logToServer('Selling Data', err.response)
            })
        }
      } else {
        this.selected.push(...this.responsiveData.map((p) => p.id)) 
        if (value === this.delist) {
          this.multipleDelist()
          return true
        }
        if (value === this.relist) {
          this.undoBulkAction('hidePopUp')
          return true
        }
      }
    },

    // Close More option popup
    closeMoreOption() {
      this.$refs.myBottomSheet.close()
    },

    // On responsive item select
    selectedListItem(val) {
      this.selectedItem(val)
      if (this.selected) {
        this.$refs.delistConfirmation.open()
      }
    },

    // On confirm delist select
    onDelistConfirm() {
      this.$refs.delistConfirmation.close()
      this.multipleDelist()
      this.showCheckBox = false
      this.delistCheckbox = false
      this.searchFilters.delistMultipleSelected = false
      this.$bvModal.show('delisted-modal')
    },

    // On cancel delist select
    onDelistCancel() {
      this.showCheckBox = false
      this.searchFilters.delistMultipleSelected = false
      this.loadData()
      this.delistCheckbox = false
      this.$refs.delistConfirmation.close()
      this.selected = []
    },
  },
}
</script>


<style lang="sass" scoped>
@import '~/assets/css/_variables'
.filter-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-8-normal
  color: $color-black-1
.vd-selling-heading
  font-family: $font-montserrat
  font-style: normal
  @include body-16-bold
  letter-spacing: -0.02em
.btn-apply
  background: $color-blue-20
  border-radius: 5px
  font-family: $font-sp-pro
  font-style: normal
  @include body-8-normal
  color: $color-white-1
.vacationMode::v-deep
  .custom-checkbox
    display: flex
    justify-items: center
  label
    font-family: $font-sp-pro
    font-style: normal
    @include body-8-normal
    color: $color-black-1
.start-date::v-deep,
.end-date::v-deep
  label
    font-family: $font-sp-pro
    font-style: normal
    @include body-8-normal
    color: $color-black-1
.custom-selectbox
  span
    font-family: $font-montserrat
    font-style: normal
    @include body-5-regular
    color: $color-gray-5
.btn-delist
  font-family: $font-montserrat
  font-style: normal
  @include body-5-regular
  color: $color-black-1
.browse-dropdown::v-deep
  .custom-selectbox
    label
      display: none
    span
      font-family: $font-montserrat
      font-style: normal
      @include body-5-regular
      color: $color-gray-5
.pad-responsive
  background-color: $color-white-1
  padding: 2%

@media (min-width: 576px)
  .empty-listing-responsive,
  .pagination-responsive,
  .listing-count
    display: none
  .search-filter-responsive
    display: none
  .pagination
    display: flex
@media (max-width: 575px)
  .browse-dropdown,
  .filter-data,
  .result-data,
  .empty-listing,
  .pagination,
  .search-filter
    display: none
  .vd-selling-heading,
  .empty-listing-responsive,
  .search-filter-responsive,
  .listing-count
    display: block

  .pagination-responsive
    display: flex
    justify-content: center

  .search-filter-responsive::v-deep
    #search-textbox-selling-search
      background: $color-white-5
      border-radius: 8px
      font-family: $font-montserrat
      font-style: normal
      @include body-10-regular
      letter-spacing: 0.06em
      text-transform: capitalize
      color: $color-black-1
    .btn-clear
      letter-spacing: -0.408px
      background: rgba(60, 60, 67, 0.6)
      padding: 1.2%
      border-radius: 11px
      display: flex
      justify-content: center
      img
        filter: brightness(0) invert(1)
        width: 65%
  .vd-selling-heading
    &.mobile
      text-align: center
      font-family: $font-sp-pro
      font-style: normal
      @include body-3-medium
      border-bottom: 0.5px solid $color-gray-47
      justify-content: center
      padding-bottom: 0.5rem
  .vd-selling-search::v-deep
    margin-top: 10px
    .browse-search::v-deep
      height: 44px
      width: 80%
      .selling-search-input::v-deep
        height: 42px
        background: $color-white-5
        border-radius: 8px
  .filter-icon-col
    text-align: center
    margin: auto
    .filter-wrapper
      .filter-icon
        width: 40%
  .listing-count
    font-family: $font-montserrat
    font-style: normal
    @include body-4-medium
    text-align: center
    color: $color-black-1
  .selling-search-input::v-deep
    height: 42px
    background: $color-white-5
    border-radius: 8px
.more-options::v-deep,
.responsive-filter::v-deep
  .bottom-sheet__pan
    padding-bottom: 0
    height: 0
  .bottom-sheet__card
    &.stripe
      padding-bottom: 0
  .bottom-sheet__content
    overflow-y: auto
.round
  & label
    border: 1px solid $color-gray-60
    height: 20px
    left: -5px
    width: 20px
    border-radius: 62px

  & label:after
    border: 2px solid $color-white-1
    border-top: none
    border-right: none
    content: ""
    height: 6px
    left: 3px
    position: absolute
    top: 5px
    transform: rotate(-45deg)
    width: 12px

  & input[type="checkbox"]:checked + label
    background-color: $color-blue-20
    border-color: $color-blue-20

  & input[type="checkbox"]:checked + label:after
    opacity: 1
.select-all-col
  font-family: $font-sp-pro
  font-style: normal
  @include body-5-normal
  color: $color-gray-47
#vacation-mode-enter::v-deep
  .bottom-sheet__content
    overflow-y: visible
    height: 350px
#vacation-mode-exit::v-deep
  .bottom-sheet__card
    height: 39vh
  .bottom-sheet__content
    overflow-y: visible
#delistConfirmation::v-deep
  .bottom-sheet__content
    overflow-y: hidden
.search
  border: 1px solid $white-2
  border-radius: 5px
  height: 45px
.vendor-selling-sort
  border: 1px solid $white-2
.form-item
  border: 1px solid $white-2
  height: 44px
.vendor-dashboard-body::v-deep
  .infinite-loading-container
    .infinite-status-prompt
      display: none
</style>
