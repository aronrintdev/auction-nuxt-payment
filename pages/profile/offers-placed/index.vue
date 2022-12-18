<template>
  <div
    id="top"
    class="col-md-12 vendor-trade-inv-body offers-placed-index"
    :class="[isScreenXS && 'mb-5 px-0', !isScreenXS && 'top-margin']"
  >
    <div class="container-fluid">
      <!-- title for web -->
      <div v-if="!isScreenXS" class="offer-placed-web">
        <div class="row">
          <div class="col-12 trade-sum-heading trade-inv-heading">
            <h1 class="placed-offer-heading d-flex align-items-center">
              {{ $t('placed_offers.header_title') }}
            </h1>
          </div>
        </div>
      </div>
      <!-- title for web -->

      <!-- search for web -->
      <div v-if="!isScreenXS" class="offer-placed-web">
        <div class="row filter-row-top">
          <!-- Input search -->
          <div class="col search-input-col vtpc-search pt-3 search-field">
            <div class="form trade-search">
              <div
                class="
                  form-group
                  selling-search-input
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
                    input-fullwidth
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
          <div class="col sortby-col pt-3">
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
      </div>
      <!-- search for web -->

      <!-- filter for web -->
      <div v-if="!isScreenXS" class="offer-placed-web">
        <div class="row filter-row-bottom mt-3">
          <!-- Filter By -->
          <div class="col filter-by-col">
            <label class="filter-label">{{
              $t('selling_page.filter_by')
            }}</label>
            <CustomSelectwithCheckbox
              id="filterby"
              class="dropdown-filters"
              :options="STATUS_OPTIONS"
              :value="filterBy"
              :icon-arrow-down="DownArrow"
              :title="filterByTitle"
              :updateFilters="statusTypeFilters"
              @filters="handleFilterByChange"
            />
          </div>
          <!-- ./Filter By -->

          <!-- Offer Date -->
          <div class="col date-from-col">
            <label class="offer-date-label filter-label">{{ $t('selling_page.offer_date') }}</label>
            <CalendarInput
              id="start-date"
              class="position-absolute"
              :value="searchFilters.startDate"
              :placeholder="$t('placed_offers.start_date')"
              @context="
                (context) => (searchFilters.startDate = context.selectedYMD)
              "
            ></CalendarInput>
          </div>

          <div class="col date-to-col">
            <label class="filter-label">&nbsp;</label>
            <CalendarInput
              id="end-date"
              class="position-absolute"
              :value="searchFilters.endDate"
              :placeholder="$t('placed_offers.end_date')"
              @context="
                (context) => (searchFilters.endDate = context.selectedYMD)
              "
            ></CalendarInput>
          </div>
          <!-- ./Offer Date -->

          <div
            :class="`col apply-button d-flex ${
              screenIsSmallThanLG && 'mt-5'
            }`"
          >
            <Button
              variant="apply"
              class="mt-2 position-absolute ml-1"
              @click="getOffers"
              >{{ $t('selling_page.apply') }}</Button
            >
          </div>
          <div
            :class="`col remove-multiple-button mt-auto d-flex justify-content-end ${
              screenIsSmallThanLG && 'mt-5'
            }`"
          >
            <Button
              variant="remove-multiple"
              class="p-0 font-normal"
              @click="toggleCheckBox"
              >{{ $t('placed_offers.remove_multiple') }}</Button
            >
          </div>
        </div>
      </div>
      <!-- filter for web -->

      <!-- page content for web -->
      <div v-if="!isScreenXS" class="offer-placed-web">
        <div class="row mt-5">
          <div class="col placed-offer-item-col">
            <div class="placed-offers-items d-flex align-items-center">
              {{
                $t('placed_offers.your_placed_offers', { count: offerCount })
              }}
            </div>
          </div>

          <b-col class="placed-offer-result">
            <div v-if="!!action" class="p-md-4">
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
                @submit="handleBulkAction({ showPopUp: true })"
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
      <!-- page content for web -->

      <!-- search for mob -->
      <div
        v-if="isScreenXS"
        class="responsive-offer-placed-mobile search-input-col pt-3 row d-flex flex-grow-1 align-items-center"
      >
        <div class="ml-16 flex-grow-1">
          <MobileSearchInput
            class="w-100"
            id="mobile-search"
            :value="searchFilters.keyWord"
            @input="search"
          />
        </div>
        <div class="mr-16 ml-16">
          <span class="filter-wrapper" role="button" @click="showFilter">
            <img
              class="mobile-filter"
              :src="require('~/assets/img/icons/filter-icon.png')"
              alt="filter-icon"
            />
          </span>
        </div>
      </div>
      <!-- search for mob -->

      <div v-if="isScreenXS" class="responsive-offer-placed-mobile">
        <vue-bottom-sheet
          id="mobile-filter"
          ref="mobileFilter"
          max-width="100vw"
          max-height="450px"
          :rounded="true"
        >
          <MobileFilter showStatusOfferPlaced @filter="applyFilter" />
        </vue-bottom-sheet>
      </div>

      <div
        v-show="isScreenXS"
        class="row"
        :class="mobileClass ? 'custom-margin' : 'mt-5'"
      >
        <div class="col-xs-7 placed-offers-items-mobile">
          <div class="d-flex align-items-baseline">
            <span class="heading-placed-offers text-align-center"
                  :class="{'ml-16': mobileClass}">
              {{
                $t('placed_offers.your_placed_offers', { count: offerCount })
              }}
            </span>
          </div>
        </div>

        <b-col
          v-if="offers && offers.length"
          class="col-xs-5 d-flex justify-content-end action-cols mr-16"
        >
          <span
            v-if="!showCheckBox"
            class="delete-offer float-right"
            role="button"
            @click="onDeleteClick"
          >
            <img
              :src="require('~/assets/img/icons/delete-rounded.svg')"
              alt="delete-rounded-svg"
            />
            <span id="delete-offer-text">{{
              $t('offers_received.delete_offers')
            }}</span>
          </span>
          <span v-if="showCheckBox" class="check-box position-absolute round">
            <input
              :id="`checkbox`"
              class="check-box invisible"
              type="checkbox"
              :value="handleDelete"
              @change="handleDeleteSelectAll"
            />
            <label :for="`checkbox`" class="position-absolute"></label>
            <span id="delete-offer-text" class="delete-offer mobile float-none">
              {{ $t('common.select_all') }}
            </span>
          </span>
        </b-col>
        <!-- delete section -->
      </div>

      <!-- product card for mob -->
      <div v-show="!showDetailsPage" class="responsive-offer-placed-mobile">
        <div
          v-if="!responsiveData.length"
          class="no-offer-message justify-content-center w-100"
        >
          <div
            class="row vd-purchase-empty d-flex align-items-center text-center"
          >
            <div class="col-12 text-center empty-browse-now">
              <p class="vd-purchase-browse-now">
                {{ $t('placed_offers.no_outgoing_offers') }}
                <br />
                {{ $t('placed_offers.place_an_offer') }}
              </p>
              <nuxt-link
                to="/shop"
                class="
                  w-100
                  btn
                  browse-btn
                  flex-row
                  align-items-center
                  justify-center
                  flex-grow-0
                "
                >{{ $t('common.browse') }}</nuxt-link
              >
            </div>
          </div>
        </div>

        <div v-else>
          <b-col class="placed-offer-result placed-offer-result-wrapper">
            <offer-received-mobile-view
              v-for="(offer, index) in responsiveData"
              id="responsive-product-placed-offer-card"
              :key="index"
              :offer="offer"
              class="offer-received-list mb-4"
              :offerChecked="selected"
              section="offers-placed"
              hideButtons
              :showCheckBox="showCheckBox"
              :selectedAll="handleDelete"
              @selectedItem="toggleSelect"
              @showEdit="showEdit"
            />
            <infinite-loading
            v-if="responsiveData.length && isScreenXS"
            spinner="spiral"
            @infinite="infiniteScroll"
          ></infinite-loading>
          </b-col>
        </div>
      </div>
      <!-- product card for mob -->
      <div
        v-show="showCheckBox && isScreenXS"
        class="responsive-offer-placed-mobile row"
      >
        <div class="col-xs-12">
          <div class="bottom-pop m-auto">
            <div
              class="
                delete-confirm-text
                d-flex
                justify-content-center
                align-items-center
                text-align-center
              "
            >
              {{ $t('offers_received.tap_on_offers_to_delete') }}
            </div>
            <div class="delete-confirm-button d-flex justify-content-around">
              <b-button
                variant="outline"
                class="
                  decline-btn
                  d-flex
                  align-items-center
                  justify-content-center
                "
                @click="onCancel"
                >{{ $t('common.cancel') }}</b-button
              >
              <b-button
                variant="outline"
                :class="`delete-btn d-flex align-items-center justify-content-center ${
                  itemSelected && 'selected'
                }`"
                @click="openDelete"
              >
                {{ $t('offers_received.delete_selected') }}
                <span v-show="itemSelected"
                  >&#40;{{ selected.length }}&#41;</span
                >
              </b-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete confirmation bottom sheet mobile -->
      <vue-bottom-sheet
        v-if="isScreenXS"
        id="delete-confirm"
        ref="deleteConfirm"
        max-width="100vw"
        max-height="90vh"
        :rounded="true"
      >
        <!-- Delete confirmation bottom sheet mobile -->
        <Confirmation
          @onCancelConfirm="onCancelConfirm"
          @onDeleteConfirm="onDeleteConfirm"
        />
        <!-- Delete confirmation bottom sheet mobile -->
      </vue-bottom-sheet>
      <!-- Delete confirmation bottom sheet mobile -->

      <!-- Edit offer -->
      <EditOffer
        v-if="isScreenXS"
        :open="openEdit"
        :highestOfferAmount="editPrice"
        :offerId="editOfferId"
        @closed="openEdit = false"
        @reload="reload"
      />
      <!-- Edit offer ends -->
      <!-- page content for mob -->
    </div>
    <client-only>
      <Portal to="page-title"> {{ $t('products.offers') }}</Portal>
    </client-only>
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
import MobileFilter from '~/components/profile/offers-received/MobileFilter.vue'
import OfferReceivedMobileView from '~/components/profile/offers-received/OfferReceivedMobileView'
import Confirmation from '~/components/profile/offers-received/Confirmation.vue'
import MobileSearchInput from '~/components/mobile/MobileSearchInput.vue'
import EditOffer from '~/components/profile/offers-placed/EditOffer.vue'
import screenSize from '~/plugins/mixins/screenSize'
import CalendarInput from '~/components/common/form/CalendarInput'
import {CustomSelectwithCheckbox} from '~/components/common'
import DownArrow from '~/assets/img/icons/down-arrow.svg'

export default {
  name: 'OffersPlaced',

  components: {
    OfferReceivedMobileView,
    MobileFilter,
    CustomSelect,
    PlacedOffers,
    Button,
    BulkSelectToolbar,
    Pagination,
    Confirmation,
    MobileSearchInput,
    EditOffer,
    CalendarInput,
    CustomSelectwithCheckbox,
  },

  mixins: [screenSize],

  layout: 'Profile',

  middleware: 'auth',

  data() {
    return {
      DownArrow,
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
      hideSelectConfirm: false,
      showConfirmation: false,
      handleDelete: false,
      showDetailsPage: false,
      filter: {
        date: {
          start: '',
          end: '',
        },
        status: [],
        sortby: null,
      },
      selectedOffer: null,
      openEdit: false,
      responsiveData: [],
      STATUS_OPTIONS: [
        { value: 'accepted', text: this.$t('placed_offers.filter_by.accepted') },
        { value: 'highest_offer',  text: this.$t('placed_offers.highest_offer') },
        { value: 'pending', text: this.$t('placed_offers.filter_by.awaiting_approval') },
      ],
      statusTypeFilters: [],
    }
  },

  computed: {
    // Total count
    offerCount: (vm) => {
      if(!vm.isScreenXS){
        return vm.offers ? vm.offers.length : 0
      }else{
        return vm.responsiveData ? vm.responsiveData.length : 0
      }
    },

    itemSelected: (vm) => {
      return vm.selected.length > 0
    },

    editPrice: (vm) => {
      return vm.selectedOffer && vm.selectedOffer.bid_price
    },

    editOfferId: (vm) => {
      return (vm.selectedOffer && vm.selectedOffer.id) || 0
    },
  },

  created() {
    this.responsiveData = []
    this.getOffers()
  },

  methods: {
    // Show mobile filter
    showFilter() {
      this.$refs.mobileFilter.open()
    },

    hideFilter() {
      this.$refs.mobileFilter.close()
    },

    applyFilter(val) {
      if (val.date) {
        if (val.date.start === '') {
          this.searchFilters.startDate = ''
        } else {
          this.searchFilters.startDate = this.$options.filters.formatDate(
            val.date.start,
            'YYYY-MM-DD'
          )
        }

        if (val.date.end === '') {
          this.searchFilters.endDate = ''
        } else {
          this.searchFilters.endDate = this.$options.filters.formatDate(
            val.date.end,
            'YYYY-MM-DD'
          )
        }
      } else {
        this.searchFilters.startDate = ''
        this.searchFilters.endDate = ''
      }

      this.searchFilters.sortBy = val.sortby ? val.sortby : ''
      this.searchFilters.filterBy =
        val.status && val.status.value ? val.status.value : ''
      this.searchFilters.page = 1
      this.getOffers()
      this.hideFilter()
    },

    // On delete button click - mobile view
    onDeleteClick() {
      this.showCheckBox = !this.showCheckBox
    },

    statusSelected({ value }) {
      if (!this.offers.status) {
        this.count = this.count + 1
      }
      if (this.offers.status && this.offers.status.value === value.value) {
        this.offers.status = null
        this.count = this.count - 1
        return
      }
      this.offers.status = value
    },

    onDeleteConfirm() {
      this.handleBulkAction({ showPopUp: false })
      this.onCancel()
    },

    onCancel() {
      this.showCheckBox = false
      this.selected = []
      this.handleDelete = false
      this.$nuxt.refresh()
      this.$refs.deleteConfirm.close()
    },

    onCancelConfirm() {
      this.$nuxt.refresh()
      this.onCancel()
    },

    // On delete selected click, show the delete confirm - mobile view
    openDelete() {
      if (this.itemSelected) {
        this.showCheckBox = !this.showCheckBox
        this.$refs.deleteConfirm.open()
      }
    },

    handleDeleteSelectAll(event) {
      this.handleDelete = !this.handleDelete
      if (this.handleDelete) {
        this.handleSelectAll()
      } else {
        this.handleDeselectAll()
      }
    },

    // On toggle checkbox mobile view.
    toggleSelect({ id, checked }) {
      if (checked) {
        this.selected.push(Number(id))
      } else {
        this.selected.splice(this.selected.indexOf(Number(id)), 1)
      }
    },

    // If date is selected.
    dateSelected(value) {
      this.showFilter = value
    },

    // On start date select
    startDateSelected(value) {
      if (this.offers.date && !this.filteroffers.date.end) {
        if (this.offers.date && !this.offers.date.start) {
          this.count = this.count + 1
        }
        if (this.offers.date && this.offers.date.start && !value) {
          this.count = this.count - 1
        }
      }
      this.filter.date.start = value
    },

    // On end date select
    endDateSelected(value) {
      if (this.offers.date && !this.offers.date.start) {
        if (this.offers.date && !this.offers.date.end) {
          this.count = this.count + 1
        }
        if (this.offers.date && this.offers.date.end && !value) {
          this.count = this.count - 1
        }
      }
      this.filter.date.end = value
    },

    // On search input, handle the keyword search
    searchPurchase(event) {
      this.searchFilters.keyWord = event.target.value
      this.getOffers()
    },

    // Get the offers
    getOffers(sortingParams = {}) {
      this.responsiveData = []
      this.isTableBusy = true
      this.$axios
        .get('/offers', {
          params: {
            ...this.searchFilters,
            ...sortingParams,
          },
        })
        .then((res) => {
          this.responsiveData.push(...res.data.data)
          this.totalCount = parseInt(res.data.meta.total)
          this.searchFilters.perPage = parseInt(res.data.meta.per_page)
          this.offers = res.data.data
          this.isTableBusy = false
        })
        .catch((err) => {
          this.isTableBusy = false
          this.$logger.logToServer('Offers Listing', err.response)
        })
    },

    infiniteScroll($state) {
      setTimeout(() =>  {
        this.searchFilters.page ++
        this.$axios
        .get('/offers', {
          params: this.searchFilters,
        })
        .then((res) => {
          if(res.data.data.length ){
            this.responsiveData.push(...res.data.data)
            this.totalCount = parseInt(res.data.meta.total)
            this.searchFilters.perPage = parseInt(res.data.meta.per_page)
            this.offers = res.data.data
            this.isTableBusy = false
            $state.loaded()
          }else{
            $state.complete()
          }

        })
        .catch((err) => {
          this.isTableBusy = false
          this.$logger.logToServer('Offers Listing', err.response)
        })
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
      this.getOffers()
    },
    // On filter by change.
    handleFilterByChange(value) {
      this.searchFilters.filterBy = value.array.length ? value.array.map((i) => i.value).toString() : ''
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
      if(this.isScreenXS){
        this.selected = this.responsiveData.map((p) => p.id)
      }else{
        this.selected = this.offers.map((p) => p.id)
      }
    },

    // On pagination click
    handlePageClick(bvEvent, page) {
      if (this.searchFilters.page !== page) {
        this.searchFilters.page = page
        this.getOffers()
      }
    },

    // On search up
    search(value) {
      this.searchFilters.keyWord = value
      this.getOffers()
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
    handleBulkAction({ showPopUp }) {
      this.$axios
        .delete('/offers', {
          data: { ids: this.selected },
        })
        .then((res) => {
          this.action = ''
          this.selected = []
          this.showCheckBox = false
          this.$nuxt.refresh()
          this.searchFilters.page = 1
          this.getOffers()

          if (showPopUp) {
            this.$toasted.success(this.$t(res.data.message))
          }

          if (!showPopUp && this.mobileClass) {
            this.$bvModal.show('offer-deleted-modal')
          }
        })
        .catch((err) => {
          this.$logger.logToServer('Delete Multiple Offer: ', err.response)
        })
    },

    // show edit offer
    showEdit(val) {
      this.selectedOffer = val
      this.openEdit = true
    },

    // reload offers
    reload() {
      this.getOffers()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.custom-selectbox .selected::after
  top: 4px
#search-result.input-fullwidth
  width: 100%
  max-width: 100%
label.filter-label
  font-weight: $normal
  font-size: 14px
  margin: 0
.font-normal
  font-weight: $normal !important
  font-size: 14px
.placed-offer-heading
  height: 36px
  left: 319px
  top: 146px
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-16-bold
  color: $color-black-1

@media (min-width: 992px)
  .col-lg-10
    flex: 0 0 auto
    width: 83.33333333%

@media (min-width: 768px)
  .col-md-12
    flex: 0 0 auto
    width: 100%
.selling-search-input::v-deep
  background: $color-white-1
  border-radius: 4px
  width: 100%
  max-width: 734px
  height: 38px
  padding: 10px 14px
  #search-result
    height: 36px
#btn-dropdown-sort-by
  border-radius: none
.placed-offers-items
  font-family: $font-sp-pro
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

.apply-button::v-deep
  @media (min-width: 992px)
    text-align: center
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
  background: $color-blue-20
  color: $color-white-1
  height: 47px
#example-datepicker-start,
#example-datepicker-end
  width: 170px
  height: 38px
  background: $color-white-1
  border: 1px solid $white-2
  .input-group-append
    .btn-secondary
      background: $color-white-1
.btn-remove-multiple
  width: 168px
  height: 38px
  left: 1201px
  top: 291px
  background: $color-white-1
  border: 0.5px solid $color-gray-47
  border-radius: 5px
  color: $color-black-1

  font-family: $font-montserrat
  font-style: normal
  @include body-5-normal
  text-align: center
  color: $color-black-1

//for mobile
.placed-offer-heading-mobile
  font-family: $font-montserrat
  font-style: normal
  @include body-3-medium
  color: $color-black-1

.responsive-offer-placed-search
  height: 33px
  top: 121px
.filter-wrapper
  .filter-icon
    width: 40%

#responsive-product-placed-offer-card::v-deep
  .accepted-offer-text
    visibility: hidden
  .tag-status
    margin-top: -12px
    margin-left: -12px
    &.pending
      width: 108px
      height: 23px
      left: 16px
      top: 215px
      background: $color-red-28
      border-radius: 10px 0px 5px
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-orange-11

    &.accepted
      width: 108px
      height: 23px
      left: 16px
      top: 215px
      background: $color-green-25
      border-radius: 10px 0px 5px
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-green-3

    &.declined
      width: 108px
      height: 23px
      left: 16px
      top: 215px
      background: $color-gray-87
      border-radius: 10px 0px 5px
      font-family: $font-sp-pro
      font-style: normal
      @include body-9-normal
      color: $color-white-1

.offer-deleted-modal
  height: 176px

.delete-confirm-button
  margin-top: 10px

.decline-btn
  width: 162px
  border: 1px solid $color-gray-80
  border-radius: 20px
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-medium
  color: $color-gray-80
.delete-btn
  width: 162px
  background: $color-gray-81
  border-radius: 20px
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-medium
  color: $color-gray-47
  &.selected
    background: $color-blue-20
    border-radius: 20px
    color: $color-white-1

/** Checkbox style */
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
/** Checkbox style ends here */

.bottom-pop
  margin-left: -25%
  bottom: 0px
  left: 50%
  height: 75px
  left: 0px
  top: 1056px
.delete-confirm-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-9-normal
  color: $color-gray-80

.vd-purchase-browse-now
  color: $color-gray-5
  font-family: $font-montserrat
  font-style: normal
  font-weight: $normal
  @include body-5-medium

.no-offer-message
  margin-top: 90px
  margin-bottom: 130px

.browse-btn
  width: 309px
  background: $color-blue-20
  border-radius: 21px
  font-family: $font-sp-pro
  font-style: normal
  @include body-4-medium
  color: $color-white-1

@media (max-width:576px)
  .offer-placed-web
    display: none
  .responsive-offer-placed-mobile::v-deep
    display: block
    background-color: $color-white-1
    &.search-input-col
      display: flex

@media (min-width:576px)
  .offer-placed-web
    display: block
  .vendor-trade-inv-body
    background-color: $color-white-4
  .responsive-offer-placed-mobile
    display: none
    &.search-input-col
      display: none

.responsive-offer-placed-mobile::v-deep
  #mobile-search
    width: 100%
  .placed-offer-result-wrapper
    padding-top: 20px

#responsive-product-placed-offer-card::v-deep
  height: 185px

.empty-browse-now
  .browse-btn
    font-family: $font-montserrat
    font-style: normal
    @include body-13-medium
    color: $color-white-1
.offers-placed-index
  min-height: 35rem
  .heading-placed-offers
    font-family: $font-montserrat
    font-style: normal
    @include body-4-medium
    color: $color-black-1
  .action-cols
    #delete-offer-text
      font-style: normal
      @include body-9-normal
      color: $color-gray-47
    #delete-text
      font-style: normal
      @include body-9-normal
      color: $color-gray-47

#delete-confirm::v-deep
  .bottom-sheet__content
    overflow-y: hidden
#delete-confirm::v-deep
  .bottom-sheet__content
    height: 145px

.offers-placed-index::v-deep
  &.top-margin
    padding: 71px 2%
  /**  Search input */
  .trade-search
    .selling-search-input
      border: 1px solid $color-gray-60
      @media (min-width: 1440px)
        width: 100%
        height: 38px
      @media (min-width: 1314px)
        width: 734px
        height: 38px
        #search-result
          height: 36px
      #search-result
        font-family: $font-montserrat
        font-style: normal
        @include body-5-regular
        letter-spacing: 0.06em
        color: $color-gray-5
  /** Sort by */
  .sortby-col
    #category-types
      width: 100%
      max-width: 245px
      height: 38px
      float: right
      .selected
        height: 100%
        border: 1px solid $color-gray-60
        border-radius: 5px
        padding: 8px 8px
        &::after
          top: 4px
      .items
        border: 1px solid $color-gray-60

  .apply-button
    .btn-apply
      height: 38px
      width: 89px
      background: $color-blue-20
      border-radius: 5px
      bottom: 0
      font-family: $font-sp-pro
      font-style: normal
      @include body-8-normal
      text-align: center
      color: $color-white

  .date-from-col
    .offer-date-label
      width: 67px
      height: 18px
      left: 583px
      top: 268px
      font-family: $font-sp-pro
      font-style: normal
      @include body-8-normal
      color: $color-black-1

    #start-date
      width: 100%
      max-width: 170px
      height: 38px
      bottom: 0
      .date-input
        background: $color-white-1
      .date-input-icon
        .dropdown-toggle
          background: $color-white-1
  .date-to-col
    #end-date
      width: 100%
      max-width: 170px
      height: 38px
      bottom: 0
      .date-input
        background: $color-white-1
      .date-input-icon
        .dropdown-toggle
          background: $color-white-1
  .filter-by-col
    .filter-label
      width: 67px
      height: 18px
      left: 583px
      top: 268px
      font-family: $font-sp-pro
      font-style: normal
      @include body-8-normal
      color: $color-black-1
    #filterby
      width: 100%
      max-width: 245px
      height: 38px
      .selected
        height: 100%
        border: 1px solid $color-gray-60
        border-radius: 5px
        padding: 8px 8px
        &:after
          top: 3px
      .items
        border: 1px solid $color-gray-60
        border-radius: 5px
#mobile-filter::v-deep
  .bottom-sheet__pan
    padding-bottom: 10.96px
    .bottom-sheet__bar
      width: 36px
      height: 5px
  .bottom-sheet__content
    overflow-y: unset
.vendor-trade-inv-body::v-deep
  .custom-margin
    margin-top: 20px
  .offers-placed-web
    margin-top: 18px
    .filter-row-bottom
      // For the filter by select
      .filter-by-select
        .filter-label
          font-family: $font-sp-pro
          font-style: normal
          @include body-8-normal
          color: $color-black-1
        #filterby-select-box
          .selected
            width: 245px
            height: 38px
            left: 319px
            top: 291px
            background: $color-white
            border: 1px solid $color-gray-60
            border-radius: 5px
            padding: 8px
            &::after
              top: 4px
      // For the offer start date
      .offer-date
        .parent-row
          width: 360px
          height: 38px
        .offer-date-label
          font-family: $font-sp-pro
          font-style: normal
          @include body-8-normal
          color: $color-black-1
        #start-date-input,
        #end-date-input
          width: 170px
          height: 38px
          border-radius: 5px
          .date-input-icon
            .date-dp .btn-secondary
              background: $color-white
          input
            background: $color-white
      .remove-multiple-button
        margin-left: auto
        margin-top: auto
@media (min-width: 576px) and (max-width: 894px)
  .offers-placed-web
    .remove-multiple-button
      margin-top: 18px
@media (min-width: 576px) and (max-width: 780px)
  .filter-by-select::v-deep
    margin-right: 11px
    #filterby-select-box
      width: 210px
      height: 38px
      margin-right: 0
      .selected
        width: 245px !important
  .offer-date::v-deep
    margin-right: 0px

.search-field
  @media (min-width:993px)
    flex: 0 0 71%
    max-width: 71%
.filter-by-col
  font-family: $font-sp-pro
  @media (max-width: 425px)
    flex: 0 0 100%
    max-width: 100%
  @media (min-width: 993px)
    flex: 0 0 20%
    max-width: 20%
  @media (min-width:426px) and (max-width: 768px)
    flex: 0 0 33.33%
    max-width: 33.33%
  @media (min-width: 768px)
    margin-right: 4px
.date-from-col,
.date-to-col
  font-family: $font-sp-pro
  @media (max-width: 425px)
    flex: 0 0 100%
    max-width: 100%
  @media (min-width: 993px)
    flex: 0 0 17%
    max-width: 17%
  @media (min-width:426px) and (max-width: 768px)
    flex: 0 0 33.33%
    max-width: 33.33%
  @media (min-width: 768px)
    margin-right: 4px
.apply-button
  .btn-aplly
    height: 38px
    width: 89px
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%
.remove-multiple-button
  .btn-remove-multiple
    width: 100%
    max-width: 168px
    height: 38px
    @media (max-width: 320px)
      width: 139px
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%
.offers-placed-index::v-deep
  .infinite-loading-container
    .infinite-status-prompt
      display: none
  @media (max-width: 641px)
    #category-types::v-deep
      .selected
        float: right
        &::after
          right: 56px
    #filterby::v-deep
      .selected
        font-family: $font-montserrat
        font-style: normal
        @include body-5-regular
        color: $color-gray-5
        &::after
          right: 47px

.ml-16
  margin-left: 16px

.mr-16
  margin-right: 16px


::v-deep
  #filterby .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      border-radius: 0px
      background-color: $color-blue-20
      box-shadow: none
      border: 1px solid $color-blue-20

::v-deep
  #filterby .custom-control-input
    ~ .custom-control-label::before
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 0px
      top: 4px
      left: -20px
      width: 10px
      height: 10px
      border: 1px solid $color-gray-60
    ~ .custom-control-label::after
      left: -20px

.dropdown-filters::v-deep
  height: 38px
  min-width: 170px
  border: none
  .selected
    height: 38px
    border: 1px solid $color-gray-60
    padding: 9px 9px 9px 10px
    &.open
      border: 1px solid $color-gray-60
      border-bottom: none
      &::after
        top: 2px
    &::after
      top: 2px
      right: 25px
  .items
    padding: 0
    overflow: auto
    border: 1px solid $color-gray-60
    .filter-select-count
      padding: 10px !important
    .item-wrapper
      border: none
      & > div
        border: none
        border-bottom: 1px solid $color-gray-60
      .d-flex
        font-weight: $regular
        @include body-5
        color: $black
        border: none
        padding: 9px 10px !important
        .custom-checkbox
          min-height: 18px
          line-height: 18px
          margin-left: 20px !important


</style>
