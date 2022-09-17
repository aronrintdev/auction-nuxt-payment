<template>
  <b-container fluid>
    <b-row class="h-100">
      <b-col md="12" lg="12" class="vendor-dashboard-body px-5 py-5">
        <!-- FILTERS -->
        <!-- Row -->
        <div class="row vd-selling">
          <!-- Heading -->
          <div class="col-12 mt-md-4 mt-2 vd-selling-heading">
            {{ $t('selling_page.selling_page_heading') }}
          </div>
          <!-- Heading -->

          <!-- Search Filter -->
          <div v-if="userRole" class="col-md-8 col-12 col-sm-6 mt-md-4 vd-selling-search">
            <VendorSellingSearchFilter
              @search="getProducts"
            />
          </div>
          <!-- Search Filter -->

          <!-- Sort By -->
          <div v-if="userRole" class="col-12 col-md-4 mt-md-4 col-sm-6 browse-dropdown">
            <VendorSellingSortBy
              :default="purchaseFilter"
              :options="{
                '': $t('selling_page.sortby'),
                'date-new-old': $t('selling_page.listing_recent_to_old'),
                'date-old-new': $t('selling_page.listing_oldest_to_recent'),
              }"
              @input="handleFilterChanged"
            ></VendorSellingSortBy>
          </div>
          <!-- Sort By -->
        </div>

        <!-- Row -->
        <div v-if="searchResults.data" class="row">
          <!-- Tabs Filter -->
          <div class="col-md-3 col-sm-12 filter-by mt-md-4 mt-2">
            <label>{{ $t('selling_page.filter_by') }}</label>
            <VendorSellingFilterBy
              :default="filterBy"
              :options="filterByOptions"
              :title="filterByTitle"
              :updateFilters="activeFilters"
              @filters="updateFilterBy"
            />
          </div>
          <!-- ./Tabs Filter -->

          <!-- Start Date -->
          <div class="col-md-2 col-sm-12 start-date mt-md-4 mt-2">
            <label>{{ $t('selling_page.listed_date') }}</label>
            <b-form-datepicker
              id="example-datepicker-start"
              v-model="searchFilters.startDate"
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
          <div class="col-md-2 col-sm-12 end-date mt-md-4 mt-2">
            <br />
            <b-form-datepicker
              id="example-datepicker-end"
              v-model="searchFilters.endDate"
              placeholder="End date"
              :dateFormatOptions="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }"
              class="mt-2"

            ></b-form-datepicker>
          </div>
          <!-- ./End Date -->

          <!-- Apply Button -->
          <div class="col-md-1 col-sm-12 col-xs-6 mt-md-4 mt-2">
            <br />
            <Button variant="apply" class="mt-2" @click="loadData">
              {{ $t('selling_page.apply') }}
            </Button>
          </div>
          <!-- Apply Button -->

          <!-- Delist Multiple Button -->
          <div class="col-md-4 col-sm-12 col-xs-6 mt-md-4 mt-2">
            <br />
            <Button
              variant="delist"
              class="float-right mt-2"
              @click="delistMultiple()"
            >
              {{ $t('selling_page.delist_multiple') }}
            </Button>
          </div>
          <!-- ./Delist Multiple Button -->
        </div>
        <!-- ./Row -->

        <!-- Row -->
        <div v-if="searchResults.data" class="row">
          <div class="col-md-10 filter-list mt-md-4 mt-2">
            <template v-if="activeFilters.length">
              <b-badge
                v-for="(options, typeIndex) in activeFilters"
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
              <span
                role="button"
                class="text-decoration-underline text-primary"
                @click="clearFilters()"
              >
                {{ $t('vendor_purchase.clear_all_filters') }}
              </span>
            </template>
          </div>
          <div class="col-md-2 justify-content-end vacationMode mt-md-4 mt-2">
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
        <!-- ./Row -->
        <!-- FILTERS ENDS HERE -->

        <template v-if="!searchResults.data || !searchResults.data.length">
          <!-- Empty Content -->
          <EmptyListing />
          <!-- ./Empty Content -->
        </template>
        <template v-else>
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
            :searchResults="searchResults.data"
            :loading="loading"
            :showCheckBox="showCheckBox"
            :selected="selected"
            @selectedItem="selectedItem"
          />

          <Pagination
            v-model="page"
            :total="totalCount"
            :per-page="perPage"
            :per-page-options="perPageOptions"
            class="mt-2"
            @page-click="handlePageClick"
            @per-page-change="handlePerPageChange"
          />
        </template>
        <!-- ./DATA  -->
      </b-col>
    </b-row>

    <ConfirmModal
      id="confirm-modal"
      :message="$t('selling_page.bulk_delist')"
      :confirmLabel="$t('selling_page.delist')"
      @confirm="handleBulkDelist()"
    />
    <!-- TODO -->
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
    <!-- ./TODO -->
  </b-container>
</template>

<script>
import EmptyListing from '~/components/profile/vendor-selling/EmptyListing.vue'
import VendorSellingSearchFilter from '~/components/profile/vendor-selling/SearchFilter'
import VendorSellingListItem from '~/components/profile/vendor-selling/VendorSellingListItem'
import SellingModal from '~/components/profile/vendor-selling/SellingModal.vue'
import {
  CustomSelect as VendorSellingSortBy,
  CustomSelectwithCheckbox as VendorSellingFilterBy,
  Button,
  Pagination,
  BulkSelectToolbar,
} from '~/components/common'
import { ConfirmModal } from '~/components/modal'
export default {
  name: 'Index',

  components: {
    VendorSellingSortBy,
    VendorSellingSearchFilter,
    VendorSellingFilterBy,
    Button,
    VendorSellingListItem,
    Pagination,
    BulkSelectToolbar,
    ConfirmModal,
    SellingModal,
    EmptyListing,
  },

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
      userRole: this.$auth.user.roles_name.includes('Vendor')
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
    this.loadData()
  },

  methods: {
    // Load the data
    loadData() {
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
          this.searchResults = res.data.data
          this.totalCount = parseInt(res.data.data.total)
          this.perPage = parseInt(res.data.data.per_page)
        })
        .catch((err) => {
          this.$logger.logToServer('Selling Data', err.response)
        })
    },
    // Search keyword
    getProducts(val) {
      this.searchFilters.searchKeyword = val
      this.loadData()
    },

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
        this.action = 'delist'
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
      this.selected = this.searchResults.data.map((p) => p.id)
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
      this.selected = this.searchResults.data.map((p) => p.id)
      this.multipleDelist()
      this.enabledVacationMode = true
      this.action = null
      this.$nuxt.refresh()
      this.$bvModal.hide('enable-vacationMode')
    },

    // Undo Delisting
    undoBulkAction() {
      this.$axios
        .put('/listing-items/relist', {
          id: this.undoSelected,
        })
        .then((res) => {
          this.cancelAction()
          this.$toasted.success(this.$t(res.data.message))
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
      this.undoSelected = this.searchResults.data.map((p) => p.id)
      this.undoBulkAction()
      this.vacationMode = false
      this.enabledVacationMode = false
      this.$nuxt.refresh()
      this.$bvModal.hide('exiting-vacationMode')
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
  },
}
</script>
