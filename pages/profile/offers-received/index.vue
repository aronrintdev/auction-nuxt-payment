<template>
  <div :class="`col-md-12 vendor-trade-inv-body ${mobileClass}  ${!isScreenXS && 'top-margin'}`">
    <div class="container-fluid">
      <div v-if="!isScreenXS" class="row" :class="mobileClass ? 'border-bottom border-dark' : ''">
        <div
          class="col-12 trade-sum-heading trade-inv-heading"
          :class="mobileClass ? 'd-flex justify-content-center' : ''"
        >
          <h1
            class="placed-offer-heading d-flex align-items-center"
            :class="mobileClass"
          >
            {{ $t('offers_received.heading') }}
          </h1>
        </div>
      </div>

      <div class="row filter-row-top"
           :class="isScreenXS ? 'mt-1' : 'mt-3'"
      >
        <!-- Input search -->
        <div
          class="search-input-col vtpc-search"
          :class="mobileClass ? 'col-xs-11' : 'col'"
        >
          <div class="form trade-search">
            <div
              :class="
                `form-group selling-search-input w-100 br-5 d-flex align-items-center m-0 ${mobileClass}` +
                (!mobileClass ? 'border' : '')
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
                class="form-control form-input vd-purchases-browse-input"
                :class="!mobileClass ? 'bg-white' : ''"
                :placeholder="
                  !mobileClass
                    ? $t('selling_page.filter_details_placeholder')
                    : $t('common.search')
                "
                autocomplete="on"
                @input="searchPurchase"
              />
            </div>
          </div>
        </div>
        <div
          v-show="mobileClass"
          :class="
            mobileClass ? 'col-xs-1 filter-icon-col text-right m-auto' : ''
          "
        >
          <span class="filter-wrapper" role="button" @click="showFilter">
            <img
              class="mobile-filter"
              :src="require('~/assets/img/icons/filter-icon.png')"
              alt="filter-icon"
            />
          </span>
        </div>

        <!-- ./Input search -->

        <!-- Sort By -->
        <div v-show="!mobileClass" class="col sortby-col">
          <CustomSelect
            id="category-types"
            bordered
            class="float-right"
            :default="categorySelected"
            :threelineIcon="false"
            :options="{
              default: $t('vendor_purchase.sort_by'),
              recent_to_old: $t('offers_received.offers_recent_old'),
              old_to_recent: $t('offers_received.offers_old_recent'),
            }"
            @input="handleSortByChange"
          />
        </div>
      </div>

      <div
        v-if="!mobileClass"
        class="row filter-row-bottom align-items-end mt-3"
      >
        <!-- Filter By -->
        <div class="col filter-by-col">
          <label class="filter-by-label">{{ $t('selling_page.filter_by') }}</label>
          <CustomSelectwithCheckbox
            id="filter-by"
            class="dropdown-filters"
            :value="null"
            :default="null"
            :options="FILTER_BY_OPTIONS"
            :icon-arrow-down="DownArrow"
            :title="filterByTitle"
            :updateFilters="filterBy"
          />
        </div>
        <!-- ./Filter By -->

        <!-- Offer Date -->
        <div class="col date-from-col">
          <label class="offer-date-label">{{ $t('selling_page.offer_date') }}</label>
          <b-input-group class="border br-5">
            <b-form-input
              id="example-datepicker-start"
              v-model="searchFilters.startDate"
              type="text"
              :placeholder="$t('offers_received.start_date')"
              autocomplete="off"
              class="border-0"
            ></b-form-input>
            <b-input-group-append class="bg-white">
              <b-form-datepicker
                id="append-b-datepicker"
                v-model="searchFilters.startDate"
                class="bg-white"
                button-only
                button-variant="light"
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
          <b-input-group class="mt-2 border br-5">
            <b-form-input
              id="example-datepicker-end"
              v-model="searchFilters.endDate"
              :placeholder="$t('offers_received.end_date')"
              type="text"
              autocomplete="off"
              class="border-0"
            ></b-form-input>
            <b-input-group-append>
              <b-form-datepicker
                id="append-b-datepicker"
                v-model="searchFilters.endDate"
                button-only
                button-variant="light"
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

        <div class="col remove-multiple-button mt-auto">
          <Button
            variant="remove-multiple text-align-center"
            class="p-0 text-nowrap float-right"
            @click="toggleCheckBox"
            >{{ $t('offers_received.remove_multiple') }}</Button
          >
        </div>
      </div>

      <div class="row" :class="mobileClass ? 'custom-margin px-0' : 'mt-5'">
        <div :class="`col-xs-7 ${!mobileClass ? 'placed-offer-item-col' : ''}`">
          <div class="d-flex align-items-baseline">
            <span :class="`placed-offers-items d-flex text-align-center ${mobileClass}`">
             {{
                $t('offers_received.your_received_offers', { count: offerCount })
              }}
            </span>
            <span v-if="!mobileClass" class="fs-16 fw-5 text-secondary ml-3 help text">
              {{ $t('offers_received.placed_offers_desc') }}
            </span>
          </div>
        </div>

        <!-- Delete offers for mobile view -->
        <b-col v-if="mobileClass" class="col-xs-5 d-flex justify-content-end px-0">
          <!-- Delete offers -->
          <span
            v-if="!showCheckBox"
            :class="`delete-offer ${mobileClass} && ${
              mobileClass ? 'float-right' : ''
            }`"
            role="button"
            @click="onDeleteClick"
          >
            <img
              :src="require('~/assets/img/icons/delete-rounded.svg')"
              alt="delete-rounded-svg"
            />
            {{ $t('offers_received.delete_offers') }}
          </span>
          <!-- Delete offers ends -->
          <!-- Select all -->
          <span v-if="showCheckBox" class="check-box position-absolute round">
            <input
              :id="`checkbox`"
              class="check-box invisible"
              type="checkbox"
              :value="handleDelete"
              @change="handleDeleteSelectAll"
            />
            <label :for="`checkbox`" class="position-absolute"></label>
            <span class="delete-offer mobile float-none">{{
              $t('common.select_all')
            }}</span>
          </span>
          <!-- Select all ends -->
        </b-col>
        <!-- Delete offer for mobile view ends -->
      </div>
      <div class="row" :class="[mobileClass && 'custom-margin px-0']">
        <b-col
          v-if="mobileClass && !offers.length"
          :class="`empty-data ${mobileClass}`"
        >
          <div
            :class="`row vd-purchase-empty ${mobileClass} ${
              mobileClass ? 'd-flex align-items-center text-center' : ''
            }`"
          >
            <div class="col-12 text-center">
              <p class="vd-purchase-browse-now">
                {{ $t('offers_received.empty.no_incoming_offers') }}
                <br />
                {{ $t('offers_received.empty.list_a_product') }}
              </p>
              <a
                href="/shop"
                :class="`btn vd-purchase-browse-btn ${mobileClass} ${
                  mobileClass
                    ? 'flex-row align-items-center justify-center flex-grow-0'
                    : ''
                }`"
              >
                {{ $t('home.create_listing') }}
              </a>
            </div>
          </div>
        </b-col>

        <b-col
          v-if="mobileClass && responsiveData.length"
          class="offer-received-data mx-0 px-0"
        >
          <offer-received-mobile-view
            v-for="offer in responsiveData"
            :key="offer.id"
            :offer="offer"
            :class="`offer-received-list mb-4 ${mobileClass}`"
            :offerChecked="selected"
            :showCheckBox="showCheckBox"
            :selectedAll="handleDelete"
            @selectedItem="toggleSelect"
            @reload="reloadData"
          />

          <infinite-loading
            v-if="responsiveData.length && isScreenXS"
            spinner="spiral"
            @infinite="infiniteScroll"
          ></infinite-loading>
        </b-col>

        <b-col v-if="!mobileClass && offers.length" class="placed-offer-result pt-5">
          <div v-if="!!action" class="p-md-4 p-2">
            <BulkSelectToolbar
              ref="bulkSetoggleSelectlectToolbar"
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

          <ReceivedOffers
            :offers="offers"
            :isBusy="isTableBusy"
            :showCheckBox="showCheckBox"
            :selected="selected"
            @reloadOffers="getOffers"
            @selectedItem="selectedItem"
            @sort="sortItems"
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

      <div
        v-show="mobileClass && showCheckBox"
        class="row"
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
            <div class="delete-confirm-button d-flex">
              <b-button
                variant="outline"
                class="decline-btn d-flex align-items-center text-align-center"
                @click="onCancel"
              >
                {{ $t('common.cancel') }}
              </b-button>
              <b-button
                variant="outline"
                :class="`delete-btn d-flex align-items-center text-align-center ${
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
        v-if="mobileClass"
        id="delete-confirmation"
        ref="deleteConfirm"
        max-width="100vw"
        max-height="236px"
        :rounded="true"
      >
        <Confirmation
          @onCancelConfirm="onCancelConfirm"
          @onDeleteConfirm="onDeleteConfirm"
        />
      </vue-bottom-sheet>
      <!-- Delete confirmation bottom sheet mobile ends. -->

      <vue-bottom-sheet
        v-if="mobileClass"
        id="mobile-filter-offer-received"
        ref="mobileFilter"
        max-width="100vw"
        max-height="450px"
        :rounded="true"
      >
        <MobileFilter @filter="applyFilter" />
      </vue-bottom-sheet>

      <!-- Delete confirm message mobile view -->
      <AlertModal
        v-if="mobileClass"
        id="offer-deleted-modal"
        :message="$t('offers_received.selected_offer_deleted')"
        icon="trash"
        hideHeader
        @hidden="$bvModal.hide('offer-deleted-modal')"
      />
      <!-- Delete confirm message mobile view ends -->
    </div>
    <client-only>
    <Portal to="page-title"> {{ $t('offers_received.offers') }}</Portal>
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
CustomSelectwithCheckbox} from '~/components/common'
import { AlertModal } from '~/components/modal'
import ReceivedOffers from '~/components/profile/offers-received/ReceivedOffers'
import { DEFAULT, NO_DATE_SELECTED, DELETE } from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import OfferReceivedMobileView from '~/components/profile/offers-received/OfferReceivedMobileView'
import Confirmation from '~/components/profile/offers-received/Confirmation.vue'
import MobileFilter from '~/components/profile/offers-received/MobileFilter.vue'
import DownArrow from '~/assets/img/icons/down-arrow.svg'

export default {
  name: 'OffersReceived',
  components: {
    CustomSelect,
    ReceivedOffers,
    Button,
    BulkSelectToolbar,
    Pagination,
    OfferReceivedMobileView,
    AlertModal,
    Confirmation,
    MobileFilter,
    CustomSelectwithCheckbox,
  },
  mixins: [screenSize],
  layout: 'Profile',
  middleware: ['auth', 'vendor'],
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
      filterBy: [],
      showSuccessMessage: null,
      FILTER_BY_OPTIONS: [
        { text: this.$t('offers_received.filter_by.accepted'), value: 'accepted'},
        { text: this.$t('offers_received.filter_by.rejected'), value: 'rejected'},
        { text: this.$t('offers_received.filter_by.awaiting_approval'), value: 'pending'},
      ],
      searchFilters: {
        startDate: '',
        endDate: '',
        keyWord: '',
        sortBy: '',
        auctionType: '',
        perPage: 8,
        page: 1,
      },
      formatted: '',
      selected: [],
      action: false,
      delete: DELETE,
      perPageOptions: [8, 16, 32, 48],
      showConfirmation: false,
      hideSelectConfirm: false,
      handleDelete: false,
      pageCount: 0,
      responsiveData: [],
      orderByField: 'id',
      orderByDirection: 'asc',
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
  },
  watch: {
    filterBy: {
      handler (val) {
        if (val.length > 0) {
          this.searchFilters.filterBy = val.map((item) => item.value ).toString()
        } else {
          this.searchFilters.filterBy = ''
        }
      },
      deep: true
    }
  },
  created() {
    this.responsiveData = []
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
      this.responsiveData = []
      this.isTableBusy = true
      this.$axios
        .get('/offers-received', {
          params: {
            ...this.searchFilters,
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          }
        })
        .then((res) => {
          this.responsiveData.push(...res.data.data)
          this.totalCount = parseInt(res.data.data)
          this.searchFilters.perPage = parseInt(res.data.meta.per_page)
          this.offers = res.data.data
          this.pageCount = parseInt(res.data.meta.last_page)
        })
        .catch((err) => {
          this.$logger.logToServer('Offers Listing', err.response)
        })
        .finally(() => {
          this.isTableBusy = false
        })
    },

    infiniteScroll($state) {
      setTimeout(() =>  {
        this.searchFilters.page ++
        this.$axios
        .get('/offers-received', {
          params: this.searchFilters,
        })
        .then((res) => {
          if(res.data.data.length){
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

    // On delete button click - mobile view
    onDeleteClick() {
      this.showCheckBox = !this.showCheckBox
    },

    // On toggle checkbox mobile view.
    toggleSelect({ id, checked }) {
       if (checked) {
        this.selected.push(Number(id))
      } else {
        this.selected.splice(this.selected.indexOf(Number(id)), 1)
      }
    },

    onCancel() {
      this.showCheckBox = false
      this.selected = []
      this.handleDelete = false
      this.$nuxt.refresh()
      this.$refs.deleteConfirm.close()
    },

    // On delete selected click, show the delete confirm - mobile view
    openDelete() {
      if (this.itemSelected) {
        this.showCheckBox = !this.showCheckBox
        this.$refs.deleteConfirm.open()
      }
    },

    onDeleteConfirm() {
      this.handleBulkAction({ showPopUp: false })
      this.onCancel()
    },

    onCancelConfirm() {
      this.$nuxt.refresh()
      this.onCancel()
    },

    handleDeleteSelectAll(event) {
      this.handleDelete = !this.handleDelete
      if (this.handleDelete) {
        this.handleSelectAll()
      } else {
        this.handleDeselectAll()
      }
    },

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
      this.searchFilters.filterBy = val.status.length ? val.status.map((s) => s.value).toString() : ''
      this.searchFilters.page = 1
      this.getOffers()
      this.hideFilter()
    },

    reloadData(){
      this.searchFilters.page = 1
      this.getOffers()
    },

    sortItems(sort) {
      const { orderByField, orderByDirection } = sort
      this.orderByField = orderByField
      this.orderByDirection = orderByDirection
      this.searchFilters.page = 1
      this.getOffers()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.vendor-trade-inv-body::v-deep
  font-family: $font-sp-pro
  font-style: normal
  min-height: 35rem
  &.top-margin
    padding: 71px 2%
  .custom-margin
    margin-top: 20px
  .filter-row-bottom
    .filter-by-label,
    .offer-date-label
      font-family: $font-sp-pro
      font-style: normal
      @include body-8-normal
      color: $color-black-1
  .infinite-loading-container
    .infinite-status-prompt
      display: none
.placed-offer-heading
  font-style: normal
  font-family: $font-sp-pro
  @include heading-3
  color: $color-black-1
  // For mobile
  &.mobile
    text-align: center
    font-family: $font-sp-pro
    font-style: normal
    @include body-3-medium

.vendor-trade-inv-body
  background-color: $color-white-4
  padding-top: 2%
  // For mobile view
  &.mobile
    background-color: $color-white-1
    padding-left: 16px
    padding-right: 16px

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
  padding: 10px 14px
  max-width: 734px
  height: 38px
  left: 0px
  top: 0px
  #search-result
    height: 36px
    &::placeholder
      font-family: $font-montserrat
      font-style: normal
      @include body-5-regular
      letter-spacing: 0.06em
      color: $color-gray-5
  &.mobile
    background-color: $color-white-5
    height: 33px
    #search-result
      height: 33px
#btn-dropdown-sort-by
  border-radius: none
.placed-offers-items
  font-family: $font-sp-pro
  font-style: normal
  @include body-1-bold
  color: $color-black-1

  .help-text
    font-family: $font-sf-pro-text
    font-style: normal
    @include body-13-normal
    color: $color-gray-5

  &.mobile
    font-family: $font-montserrat
    font-style: normal
    @include body-4-medium
    text-align: center
    color: $color-black-1

.placed-offer-item-col
  flex: 0 0 100%
  max-width: 100%
  &.mobile
    flex: 0 0 50%
    max-width: 50%

.filter-row-top
  @media (min-width:993px)
    display: flex
    justify-content: space-between

.search-input-col
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
.filter-by-col::v-deep
  #filter-by
    width: 100%
    max-width: 245px
    height: 38px
    .selected
      height: 36px
      padding: 8px
      &::after
        top: 4px
      span
        font-family: $font-montserrat
        font-style: normal
        @include body-5-regular
        color: $color-gray-5
.apply-button
  .btn-aplly
    height: 38px
    width: 89px
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%
.remove-multiple-button::v-deep
  .btn-remove-multiple
    width: 100%
    max-width: 168px
    height: 38px
    @media (max-width: 320px)
      width: 139px
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%

.hide-col
  @media (max-width: 320px)
    display: none

.btn-apply
  color: $color-white-1
  background: $color-grey-101
  border-radius: 5px
  height: 38px
  font-family: $font-sp-pro
  font-style: normal
  @include body-8-normal
  text-align: center
  color: $color-white

#example-datepicker-start,
#example-datepicker-end
  height: 36px
  background: $color-white-1
  border: 1px solid $white-2
  font-family: $font-montserrat
  font-style: normal
  @include body-5-regular
  color: $color-gray-5
  .input-group-append
    .btn-secondary
      background: $color-white-1
.btn-remove-multiple
  font-family: $font-montserrat
  font-style: normal
  @include body-5-normal
  color: $color-black-1
  width: 168px
  height: 38px
  left: 1201px
  top: 291px
  background: $color-white
  border: 0.5px solid $color-gray-47
  border-radius: 5px

// For mobile view

/** Mobile view filter icon */
.filter-icon-col
  .filter-wrapper
    .filter-icon
      width: 40%
/** Mobile view filter icon ends  */
.delete-offer
  &.mobile
    font-family: $font-sp-pro
    font-style: normal
    @include body-8-normal
    color: $color-gray-47
@media( min-width: 320px)
  .vd-purchase-browse-btn
    &.mobile
      width: 309px
.empty-data
  &.mobile
    margin: 35% 0 35%
  .vd-purchase-empty
    &.mobile
      font-family: $font-sp-pro
      font-style: normal
      @include body-5-medium
      color: $color-gray-5
    .vd-purchase-browse-btn
      &.mobile
        padding: 8px
        gap: 10px
        height: 40px
        left: calc(50% - 309px/2)
        bottom: 387px
        background: $color-blue-20
        border-radius: 21px
        font-family: $font-sp-pro
        font-style: normal
        @include body-4-medium
        text-align: center
        color: $color-white-1
        flex: none
        order: 0
.bottom-pop
  margin-left: -25%
  bottom: 0px
  left: 50%
  height: 95px
  left: 0px
  top: 1056px
.delete-confirm-button
  justify-content: space-evenly
  margin-top: 10px
.delete-confirm-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-9-normal
  color: $color-gray-80
.decline-btn
  border: 1px solid $color-gray-80
  border-radius: 20px
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-medium
  color: $color-gray-80
.delete-btn
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
.offer-deleted-modal
  height: 176px
.sortby-col::v-deep
  #category-types
    width: 100%
    max-width: 245px
    height: 38px
    .selected
      height: 38px
      padding: 8px 8px
      &::after
        top: 4px
      span
        font-family: $font-montserrat
        font-style: normal
        @include body-5-regular
        color: $color-gray-5
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

.date-from-col::v-deep,
.date-to-col::v-deep
  .input-group
    width: 100%
    max-width: 170px
    height: 38px

    .input-group-append
      #append-b-datepicker
        background: $color-white-1
        border: none
#offer-delete-modal
  .modal-content
    background: $color-gray-81
    backdrop-filter: blur(2px)
    border-radius: 8px
#mobile-filter-offer-received::v-deep
  .bottom-sheet__content
    overflow-y: auto
  .bottom-sheet__bar
    width: 36px
    height: 5px
#delete-confirmation::v-deep
  .bottom-sheet__content
    overflow-y: auto
  .bottom-sheet__bar
    width: 36px
    height: 5px

::v-deep
  #filter-by .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      border-radius: 0px
      background-color: $color-blue-20
      box-shadow: none
      border: 1px solid $color-blue-20

::v-deep
  #filter-by .custom-control-input
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
      display: none
    .item-wrapper
      border: none
      & > div
        border: none
        border-bottom: 1px solid $color-gray-60
        &:last-child
          border-bottom: none
      .d-flex
        font-weight: $regular
        @include body-5
        color: $black
        border: none
        padding: 9px 10px
        .custom-checkbox
          min-height: 18px
          line-height: 18px
          margin-left: 20px
</style>
