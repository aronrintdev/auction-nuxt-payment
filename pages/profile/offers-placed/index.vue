<template>
  <div class="col-md-12 vendor-trade-inv-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 trade-sum-heading trade-inv-heading">
          <h1 class="placed-offer-heading d-flex align-items-center">
            {{ $t('placed_offers.heading') }}
          </h1>
        </div>
      </div>

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
                :placeholder="$t('selling_page.filter_details_placeholder')"
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
          <label>{{ $t('selling_page.filter_by') }}</label>
          <CustomSelect
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('selling_page.status'),
              accepted: $t('placed_offers.filter_by.accepted'),
              rejeced: $t('placed_offers.filter_by.rejected'),
              pending: $t('placed_offers.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->

        <!-- Offer Date -->
        <div class="col date-from-col">
          <label>{{ $t('selling_page.offer_date') }}</label>
          <b-input-group>
            <b-form-input
              id="example-datepicker-start"
              v-model="searchFilters.startDate"
              type="text"
              :placeholder="$t('placed_offers.start_date')"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                id="append-b-datepicker"
                v-model="searchFilters.startDate"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                @context="onContextStart"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </div>

        <div class="col date-to-col">
          <br />
          <b-input-group class="mt-2">
            <b-form-input
              id="example-datepicker-end"
              v-model="searchFilters.endDate"
              :placeholder="$t('placed_offers.end_date')"
              type="text"
              autocomplete="off"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                id="append-b-datepicker"
                v-model="searchFilters.endDate"
                button-only
                right
                locale="en-US"
                aria-controls="example-input"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                }"
                @context="onContextEnd"
              ></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </div>
        <!-- ./Offer Date -->

        <div class="col apply-button">
          <br />
          <Button variant="apply" class="mt-2" @click="getOffers">
            {{ $t('selling_page.apply') }}
          </Button>
        </div>
        <div class="col hide-col"></div>
        <div class="col remove-multiple-button mt-auto">
          <Button
            variant="remove-multiple"
            class="pa-0"
            @click="toggleCheckBox"
            >{{ $t('placed_offers.remove_multiple') }}</Button
          >
        </div>
      </div>

      <div class="row mt-5">
        <div class="col placed-offer-item-col">
          <div class="placed-offers-items d-flex align-items-center">
            {{ $t('placed_offers.your_placed_offers', { count: offerCount }) }}
          </div>
        </div>

        <b-col class="placed-offer-result pt-5">
          <div v-if="!!action" class="p-md-4 p-2">
            <BulkSelectToolbar
              ref="bulkSelectToolbar"
              :active="action"
              :selected="selected"
              :unit-label="$tc('common.product', selected.length)"
              :total="totalCount"
              :action-label="$t(`placed_offers.delete_selected`)"
              class="mt-3"
              :successMessage="showSuccessMessage"
              @selectAll="handleSelectAll()"
              @deselectAll="selected = []"
              @close="cancelAction()"
              @submit="handleBulkAction()"
            />
          </div>

          <PlacedOffers
            :offers="offers"
            :isBusy="isTableBusy"
            :showCheckBox="showCheckBox"
            :selected="selected"
            @reloadOffers="getOffers"
            @selectedItem="selectedItem"
          />
          <Pagination
            v-model="searchFilters.page"
            :total="totalCount"
            :per-page="searchFilters.perPage"
            :per-page-options="perPageOptions"
            class="mt-2"
            @page-click="handlePageClick"
            @per-page-change="handlePerPageChange"
          />
        </b-col>
      </div>
    </div>
  </div>
</template>

<script>
import arrowUpIcon from '~/assets/img/icons/arrow-up-blue.svg'
import arrowDownIcon from '~/assets/img/icons/arrow-down-blue.svg'
import threeLinesIcon from '~/assets/img/icons/three-lines.svg'
import {
  CustomSelect,
  Button,
  BulkSelectToolbar,
  Pagination,
} from '~/components/common'
import PlacedOffers from '~/components/profile/offers-placed/PlacedOffers.vue'
import { DEFAULT, NO_DATE_SELECTED, DELETE } from '~/static/constants'
export default {
  name: 'OffersPlaced',

  components: {
    CustomSelect,
    PlacedOffers,
    Button,
    BulkSelectToolbar,
    Pagination,
  },

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      showCheckBox: false,
      filterByTitle: this.$t('selling_page.status'),
      isTableBusy: false,
      arrowUpIcon,
      arrowDownIcon,
      threeLinesIcon,
      totalCount: 0,
      offers: [],
      searchValue: '',
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
      formatted: '',
      selected: [],
      action: false,
      delete: DELETE,
      perPageOptions: [8, 16, 32, 48],
    }
  },

  computed: {
    // Total count
    offerCount: (vm) => {
      return vm.offers ? vm.offers.length : 0
    },
  },

  created() {
    this.getOffers()
  },

  methods: {
    // On search input, handle the keyword search
    searchPurchase(event) {
      this.searchFilters.keyWord = event.target.value
      this.getOffers()
    },

    // Get the offers
    getOffers() {
      this.isTableBusy = true
      this.$axios
        .get('/offers', {
          params: this.searchFilters,
        })
        .then((res) => {
          this.totalCount = parseInt(res.data.meta.total)
          this.searchFilters.perPage = parseInt(res.data.meta.per_page)
          this.offers = res.data.data
          this.isTableBusy = false
        })
        .catch((err) => {
          this.$logger.logToServer('Offers Listing', err.response)
        })
    },

    // On start date select.
    onContextStart(ctx) {
      if (ctx.selectedFormatted !== NO_DATE_SELECTED) {
        this.searchFilters.startDate = ctx.selectedYMD
      }
    },
    // On end date select.
    onContextEnd(ctx) {
      if (ctx.selectedFormatted !== NO_DATE_SELECTED) {
        this.searchFilters.endDate = ctx.selectedYMD
      }
    },
    // On sort by change.
    handleSortByChange(value) {
      this.searchFilters.sortBy = value === DEFAULT ? '' : value
    },
    // On filter by change.
    handleFilterByChange(value) {
      this.searchFilters.filterBy = value === DEFAULT ? '' : value
    },

    // On remove multiple button click
    toggleCheckBox() {
      this.action = !this.action
      this.showCheckBox = !this.showCheckBox
    },

    // Checkbox on checked/ unchecked
    selectedItem(val) {
      if (this.selected.includes(val)) {
        this.selected.splice(this.selected.indexOf(val), 1)
      } else {
        this.selected.push(val)
      }
    },

    // Bulk deselect
    handleDeselectAll() {
      this.action = ''
      this.selected = []
      this.showCheckBox = false
    },

    /* Bulk select on close */
    cancelAction() {
      this.action = null
      this.selected = []
      this.showCheckBox = false
    },
    // On select all click
    handleSelectAll() {
      this.selected = this.offers.map((p) => p.id)
    },

    // On pagination click
    handlePageClick(bvEvent, page) {
      if (this.searchFilters.page !== page) {
        this.searchFilters.page = page
        this.getOffers()
      }
    },

    // Per page change
    handlePerPageChange(value) {
      if (this.searchFilters.perPage !== value) {
        this.searchFilters.perPage = value
        this.searchFilters.page = 1
        this.getOffers()
      }
    },

    // Delete offers bulk.
    handleBulkAction() {
      this.$axios
        .delete('/offers', {
          data: { ids: this.selected },
        })
        .then((res) => {
          this.action = ''
          this.selected = []
          this.showCheckBox = false
          this.getOffers()
          this.$toasted.success(this.$t(res.data.message))
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Multiple Offer: ', err.response)
        })
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.placed-offer-heading
  font-style: normal
  @include heading-3
  color: $color-black-1
.vendor-trade-inv-body
  background-color: $color-white-4
  padding: 2%

@media (min-width: 992px)
  .col-lg-10
    flex: 0 0 auto
    width: 83.33333333%

@media (min-width: 768px)
  .col-md-12
    flex: 0 0 auto
    width: 100%
.selling-search-input
  background: $color-white-1
  border-radius: 4px
  height: 44px
  padding: 10px 14px
#btn-dropdown-sort-by
  border-radius: none
.placed-offers-items
  font-style: normal
  @include body-1-bold
  color: $color-black-1
.placed-offer-item-col
  flex: 0 0 100%
  max-width: 100%

.filter-row-top
  @media (min-width:993px)
    display: flex
    justify-content: space-between

.sortby-col
  @media (min-width:993px)
    flex: 0 0 30%
    max-width: 30%

.search-input-col
  @media (min-width:993px)
    flex: 0 0 60%
    max-width: 60%
.filter-by-col,
.date-from-col,
.date-to-col
  @media (max-width: 425px)
    flex: 0 0 100%
    max-width: 100%
  @media (min-width: 993px)
    flex: 0 0 20%
    max-width: 20%
  @media (min-width:426px) and (max-width: 768px)
    flex: 0 0 33.33%
    max-width: 33.33%
.apply-button
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%
.remove-multiple-button
  .btn-remove-multiple
    @media (max-width: 320px)
      width: 139px
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%

.hide-col
  @media (max-width: 320px)
    display: none

.btn-apply
  background: $color-blue-2
  color: $color-white-1
  height: 47px
#example-datepicker-start,
#example-datepicker-end
  height: 47px
  background: $color-white-1
  border: 1px solid $white-2
  .input-group-append
    .btn-secondary
      background: $color-white-1
.btn-remove-multiple
  width: 168px
  height: 47px
  left: 1201px
  top: 291px
  background: $color-white-1
  border: 0.5px solid $color-gray-47
  border-radius: 5px
  color: $color-black-1
</style>