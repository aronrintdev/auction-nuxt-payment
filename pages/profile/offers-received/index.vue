<template>
  <div class="col-md-12 vendor-trade-inv-body" :class="mobileClass">
    <div class="container-fluid">
      <div class="row" :class="mobileClass ? 'border-bottom border-dark' : ''">
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

      <div class="row filter-row-top mt-3">
        <!-- Input search -->
        <div
          class="search-input-col vtpc-search"
          :class="mobileClass ? 'col-xs-10' : 'col'"
        >
          <div class="form trade-search">
            <div
              :class="
                `form-group selling-search-input br-5 d-flex align-items-center m-0 ${mobileClass}` +
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
          :class="mobileClass ? 'col-xs-2 filter-icon-col' : ''"
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
          <label>{{ $t('selling_page.filter_by') }}</label>
          <CustomSelect
            bordered
            :default="filterBy"
            :threelineIcon="false"
            :options="{
              default: $t('selling_page.status'),
              accepted: $t('offers_received.filter_by.accepted'),
              rejeced: $t('offers_received.filter_by.rejected'),
              pending: $t('offers_received.filter_by.awaiting_approval'),
            }"
            :title="filterByTitle"
            @input="handleFilterByChange"
          />
        </div>
        <!-- ./Filter By -->

        <!-- Offer Date -->
        <div class="col date-from-col">
          <label>{{ $t('selling_page.offer_date') }}</label>
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

        <div class="col remove-multiple-button mt-auto text-right">
          <Button
            variant="remove-multiple"
            class="pa-0"
            @click="toggleCheckBox"
            >{{ $t('offers_received.remove_multiple') }}</Button
          >
        </div>
      </div>

      <div class="row" :class="mobileClass ? 'mt-3' : 'mt-5'">
        <div :class="`col-xs-7 ${!mobileClass ? 'placed-offer-item-col' : ''}`">
          <div class="d-flex align-items-baseline">
            <span :class="`placed-offers-items ${mobileClass}`">
              {{
                $t('offers_received.your_placed_offers', { count: offerCount })
              }}
            </span>
            <span v-if="!mobileClass" class="fs-16 fw-5 text-secondary ml-3">
              {{ $t('offers_received.placed_offers_desc') }}
            </span>
          </div>
        </div>

        <!-- Delete offers for mobile view -->
        <b-col v-if="mobileClass" class="col-xs-5 d-flex justify-content-end">
          <!-- Delete offers -->
          <span
            v-if="!showCheckBox"
            :class="`delete-offer ${mobileClass}`"
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
              class="check-box"
              type="checkbox"
              :value="handleDelete"
              @change="handleDeleteSelectAll"
            />
            <label :for="`checkbox`"></label>
            <span class="delete-offer mobile float-none">{{
              $t('common.select_all')
            }}</span>
          </span>
          <!-- Select all ends -->
        </b-col>
        <!-- Delete offer for mobile view ends -->
      </div>
      <div class="row">
        <b-col
          v-if="mobileClass && !offers.length"
          :class="`empty-data ${mobileClass}`"
        >
          <div :class="`row vd-purchase-empty ${mobileClass}`">
            <div class="col-12 text-center">
              <p class="vd-purchase-browse-now">
                {{ $t('offers_received.empty.no_incoming_offers') }}
                <br />
                {{ $t('offers_received.empty.list_a_product') }}
              </p>
              <a
                href="/shop"
                :class="`btn vd-purchase-browse-btn ${mobileClass}`"
              >
                {{ $t('home.create_listing') }}
              </a>
            </div>
          </div>
        </b-col>

        <b-col
          v-if="mobileClass && offers.length"
          :class="`offer-received-data ${mobileClass && 'my-4'}`"
        >
          <offer-received-mobile-view
            v-for="offer in offers"
            :key="offer.id"
            :offer="offer"
            :class="`offer-received-list mb-4 ${mobileClass}`"
            :offerChecked="selected"
            :showCheckBox="showCheckBox"
            :selectedAll="handleDelete"
            @selectedItem="toggleSelect"
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

        <b-col v-if="!mobileClass" class="placed-offer-result pt-5">
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
        v-show="mobileClass && showCheckBox && !hideSelectConfirm"
        class="row"
      >
        <div class="col-xs-12">
          <div class="bottom-pop">
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
        ref="deleteConfirm"
        max-width="100vw"
        max-height="90vh"
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
        ref="mobileFilter"
        max-width="100vw"
        max-height="90vh"
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
import { AlertModal } from '~/components/modal'
import ReceivedOffers from '~/components/profile/offers-received/ReceivedOffers'
import { DEFAULT, NO_DATE_SELECTED, DELETE } from '~/static/constants'
import screenSize from '~/plugins/mixins/screenSize'
import OfferReceivedMobileView from '~/components/profile/offers-received/OfferReceivedMobileView'
import Confirmation from '~/components/profile/offers-received/Confirmation.vue'
import MobileFilter from '~/components/profile/offers-received/MobileFilter.vue'

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
  },
  mixins: [screenSize],
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
      showConfirmation: false,
      hideSelectConfirm: false,
      handleDelete: false,
      pageCount: 0,
    }
  },

  computed: {
    // Total count
    offerCount: (vm) => {
      return vm.offers ? vm.offers.length : 0
    },

    itemSelected: (vm) => {
      return vm.selected.length > 0
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
          this.pageCount = parseInt(res.data.meta.last_page)
        })
        .catch((err) => {
          this.$logger.logToServer('Offers Listing', err.response)
        })
        .finally(() => {
          this.isTableBusy = false
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
      for (let i = 1; i <= this.pageCount; i++) {
        this.searchFilters.page = i
        this.$axios
          .get('/offers', {
            params: this.searchFilters,
          })
          .then((res) => {
            this.searchFilters.page = 1
            this.selected.push(...res.data.data.map((p) => p.id))
          })
          .catch((err) => {
            this.$logger.logToServer('Offers Listing', err.response)
          })
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
        this.selected.push(id)
      } else {
        this.selected.splice(this.selected.indexOf(id), 1)
      }
    },

    deleteSelected() {
      this.hideSelectConfirm = !this.hideSelectConfirm
      this.showConfirmation = !this.showConfirmation
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
      this.searchFilters.filterBy = val.status && val.status.value ?  val.status.value : ''  

      this.getOffers()
      this.hideFilter()
    },
  },
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'
.vendor-trade-inv-body
  font-family: $font-sp-pro
  font-style: normal
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
  padding: 2%
  // For mobile view
  &.mobile
    background-color: $color-white-1

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
  height: 44px
  padding: 10px 14px

  &.mobile
    background-color: $color-white-5
#btn-dropdown-sort-by
  border-radius: none
.placed-offers-items
  font-style: normal
  @include body-1-bold
  color: $color-black-1

  &.mobile
    font-family: $font-sp-pro
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
.filter-by-col,
.date-from-col,
.date-to-col
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
.apply-button
  @media (max-width: 320px)
    flex: 0 0 50%
    max-width: 50%
.remove-multiple-button
  .btn-remove-multiple
    white-space: nowrap
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
  height: 44px
  font-family: $font-sp-pro
#example-datepicker-start,
#example-datepicker-end
  height: 44px
  background: $color-white-1
  border: 1px solid $white-2
  .input-group-append
    .btn-secondary
      background: $color-white-1
.btn-remove-multiple
  width: 168px
  height: 44px
  left: 1201px
  top: 291px
  background: $color-white-1
  border: 0.5px solid $color-gray-47
  border-radius: 5px
  color: $color-black-1

// For mobile view

/** Mobile view filter icon */
.filter-icon-col
  text-align: center
  margin: auto

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
    float: right
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
      display: flex
      align-items: center
      text-align: center
      color: $color-gray-5
    .vd-purchase-browse-btn
      &.mobile
        flex-direction: row
        justify-content: center
        align-items: center
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
        flex-grow: 0
.bottom-pop
  margin-left: -25%
  bottom: 0px
  left: 50%
  height: 95px
  left: 0px
  top: 1056px
  margin: auto
.delete-confirm-button
  justify-content: space-evenly
  margin-top: 10px
.delete-confirm-text
  font-family: $font-sp-pro
  font-style: normal
  @include body-9-normal
  color: $color-gray-73
.decline-btn
  border: 1px solid $color-gray-72
  border-radius: 20px
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-medium
  color: $color-gray-72
.delete-btn
  background: $color-gray-71
  border-radius: 20px
  font-family: $font-sp-pro
  font-style: normal
  @include body-10-medium
  color: $color-gray-47

  &.selected
    background: $color-blue-20
    border-radius: 20px
    color: $color-white-1
.confirmation-delete
  background: $color-white-1
  border-radius: 20px 20px 0px 0px
.highlight-symbol
  width: 36px
  height: 5px
  left: calc(50% - 36px/2 - 0.5px)
  bottom: 221px
  background: $light-gray-2
  border-radius: 5px
  margin: auto
.offer-deleted-modal
  height: 176px
.sortby-col
  #category-types
    width: 245px
    height: 38px
    float: right
/** Checkbox style */
.round
  position: relative

  & label
    border: 1px solid $color-gray-60
    cursor: pointer
    height: 20px
    left: -5px
    position: absolute
    top: 0
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

  & input[type="checkbox"]
    visibility: hidden

  & input[type="checkbox"]:checked + label
    background-color: $color-blue-20
    border-color: $color-blue-20

  & input[type="checkbox"]:checked + label:after
    opacity: 1
/** Checkbox style ends here */

.date-from-col
  .input-group
    .input-group-append
      #append-b-datepicker
        background: white
#offer-delete-modal
  .modal-content
    background: rgba(247, 247, 247, 0.91)
    backdrop-filter: blur(2px)
    border-radius: 8px
</style>
