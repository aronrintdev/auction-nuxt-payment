<template>
  <div>
    <div v-if="mobileClass" class="d-flex justify-content-between align-items-center mb-30px">
      <MobileSearchInput :value="''" class="flex-grow-1" />
      <a role="button" @click="showMobileFilter">
        <img
          class="mobile-filter pt-1 pl-2"
          :src="require('~/assets/img/icons/filter-icon.svg')"
          alt="filter-icon"
        />
      </a>
    </div>
    <div :class="mobileClass ? '' : 'commission p-4'">
      <div class="d-flex justify-content-between align-items-center">
        <div class="title" :class="mobileClass.length ? 'body-10-medium color-blue-20' : 'heading-3-normal'">
          {{ $t('vendor_hub.commission.overview') }}
        </div>
      </div>
      <b-row class="mt-1 mt-sm-3">
        <div v-for="(item, ind) in commissionItems" :key="ind" :class="mobileClass.length ? 'commission-item-box' : 'col'">
          <CommissionItem :item="item" />
        </div>
      </b-row>
    </div>

    <div :class="mobileClass.length ? 'mt-30px' : 'commission p-4 mt-3'">
      <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center">
        <div class="d-flex justify-content-between w-100 mb-2 mb-sm-4">
          <div class="title" :class="mobileClass.length ? 'body-10-medium color-blue-20' : 'heading-3-normal'">
          {{ $t('vendor_hub.commission.commission_details') }}
          </div>
        </div>
        <download-csv
            :data="exportableData"
            :fields="fields.map(({ key }) => key)"
            :labels="fields.map(({label}) => label)"
            :name="'Commissions.csv'"
        >
          <Button ref="exportButton" class="d-none" />
        </download-csv>

        <Button
          v-if="!mobileClass"
          variant="dark export-button px-0"
          @click="toggleExport"
        >
            {{ $t('vendor_hub.commission.export_to_csv') }}
        </Button>

      </div>

      <div v-if="!mobileClass" class="d-flex align-items-center justify-content-between mt-3">
        <span class="label-text">({{ itemsTotal }} {{ $t('vendor_hub.commission.entries') }})</span>

        <div class="d-flex flex-column">
          <span class="label-text thin">{{ $t('vendor_hub.commission.date_ordered') }}</span>
          <div class="d-flex align-items-center mt-1">
            <CalendarInput
              class="date-picker"
              :date-reset-button="true"
              :placeholder="$t('vendor_hub.commission.start_date')"
              :value="filterForm.startDate"
              @context="(ctx) => calendarContextChange(ctx, true)"
            />
            <CalendarInput
              class="date-picker"
              :date-reset-button="true"
              :placeholder="$t('vendor_hub.commission.end_date')"
              :value="filterForm.endDate"
              @context="(ctx) => calendarContextChange(ctx, false)"
            />
            <Button class="apply-button" variant="primary" @click="applyFilter">
              {{ $t('vendor_hub.form.apply') }}
            </Button>
          </div>
        </div>

        <div class="d-flex flex-column justify-content-end">
          <span class="label-text thin">{{ $t('vendor_hub.commission.filter_by') }}</span>
          <div class="mt-1">
            <CustomSelectwithCheckbox
                :options="STATUSES"
                :title="$t('bids.status')"
                :updateFilters="filterForm.activeStatusFilters"
                :value="filterForm.statusType"
                class="dropdown-filters"
                @filters="onStatusHandler"
            />
          </div>
        </div>
      </div>
      <div v-else class="d-flex justify-content-between">
        <span class="text-color-gray-5 body-10-medium">{{ itemsTotal  }} {{ $t('vendor_hub.commission.entries') }}</span>
        <!-- Hide it right now there aren't API yet -->
        <a role="button" class="d-flex align-items-center" @click="sendCSV">
          <img :src="require('~/assets/img/vendorhub/upload-icon.svg')" class="px-1">
          <span class="color-gray-5 body-5-normal">{{ $t("vendor_hub.commission.email_csv") }}</span>
        </a>
      </div>

      <!-- Mobile list view -->
      <template v-if="mobileClass">
        <div v-for="(item, index) in items"  :key="index" class="border shadow-sm mt-3">
          <b-row v-if="item.product">
            <b-col cols="3">
              <ProductThumb :product="item.product" />
            </b-col>
            <b-col cols="9">
              <span class="body-5-medium">{{ item.product.name }}</span>
              <div class="mb-2 text-gray-6 text-uppercase body-6-medium">
                {{ $t('shopping_cart.sku') }}&colon;&nbsp;{{ item.product.sku }}
              </div>
              <div class="mb-2 text-gray-6 body-6-medium">
                {{ $t('shopping_cart.color_way') }}&colon;&nbsp;{{ item.product.colorway }}
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="py-1">
              <div class="d-flex justify-content-between">
                <span class="d-sm-block d-md-none body-9-medium">{{ $t('vendor_hub.commission.table.order_id') }}</span>
                <NuxtLink :to="`/orders/${item.order.order_id}-1`">
                  <span class="body-9-regular text-decoration-underline text-blue-30">
                  {{ item.order.order_id }}
                  </span>
                </NuxtLink>
              </div>
            </b-col>
            <b-col cols="12" class="py-1 bg-lightgrey">
              <div class="d-flex justify-content-between">
                <span class="d-sm-block d-md-none body-9-medium">{{ $t('vendor_hub.commission.table.commission') }}</span>
                <span class="body-9-regular text-gray-6">{{ item.commission | toCurrency }}</span>
              </div>
            </b-col>
            <b-col cols="12" class="py-1">
              <div class="d-flex justify-content-between">
                <span class="d-sm-block d-md-none body-9-medium">
                  {{ $t('vendor_hub.commission.table.status') }}
                </span>
                <span class="body-9-regular text-gray-6 text-capitalize">
                  {{ item.status }}
                </span>
              </div>
            </b-col>
            <b-col cols="12" class="py-1 bg-lightgrey">
              <div class="d-flex justify-content-between">
                <span class="d-sm-block d-md-none body-9-medium">
                  {{ $t('vendor_hub.commission.table.shipped_to_ds') }}
                </span>
                <span class="body-9-regular text-gray-6 text-capitalize">
                  {{ item.status == 'paid' ? 'Yes' : 'No' }}
                </span>
              </div>
            </b-col>
            <b-col cols="12" class="py-1">
              <div class="d-flex justify-content-between">
                <span class="d-sm-block d-md-none body-9-medium">
                  {{ $t('vendor_hub.commission.table.date_ordered') }}
                </span>
                <span class="body-9-regular text-gray-6 text-capitalize">
                  {{ item.order.created_at | formatDate }}
                </span>
              </div>
            </b-col>
          </b-row>
        </div>
      </template>

      <!-- Desktop list (table) view -->
      <div v-else class="mt-3 flex-wrap overflow-auto commission-table">
        <b-table
            :borderless="true"
            :busy="dataLoading"
            :fields="fields"
            :items="items"
            :show-empty="true"
        >
          <template #head()="scope">

            <div class="d-flex" :class="{'justify-content-center' : scope.column !== 'order_id'}">
              <b-form-checkbox
                v-if="isExportActive && scope.column == 'order_id'"
                v-model="isAllSelected"
                @change="allSelected"
              />
              <div class="text-nowrap" role="button" @click="orderBy(scope)">
                <span class="mr-1 header">{{ scope.label }}</span>
                <img v-if="isSortActive(scope.field)"
                     :src="require('~/assets/img/icons/down-arrow-solid.svg')"
                     :alt="scope.label"
                     class="sort-icon" :class="reverseDirection(scope.column)">
              </div>
            </div>
          </template>

          <template #empty>
            <div class="d-flex justify-content-around">{{ $t('vendor_hub.commission.no_data') }}</div>
          </template>
          <template #table-busy>
            <Loader :loading="dataLoading"></Loader>
          </template>
          <template #top-row>
            <td class="p-0" colspan="6">
              <div v-if="!isExportActive" class="divider"></div>
              <BulkSelectToolbar
                  v-if="isExportActive"
                  ref="bulkSelectToolbar"
                  :action-label="$tc(`vendor_hub.commission.export_selected`)"
                  :active="isExportActive"
                  :selected="selected"
                  :total="10"
                  :unit-label="$tc('common.product', selected.length)"
                  class="mt-3"
                  @close="cancelAction()"
                  @deselectAll="handleDeselectAll()"
                  @selectAll="handleSelectAll()"
                  @submit="handleBulkAction()"
              />
            </td>
          </template>
          <template #cell(order_id)="data">
            <div class="d-flex">
              <b-form-checkbox
                  v-if="isExportActive"
                  :checked="isItemSelected(data.item.id)"
                  @change="itemSelected(data.item.id)"
              >
              </b-form-checkbox>

              <span class="link-text" role="button" @click="$router.push(`/orders/${data.item.order.order_id}-1`)">
                {{ data.item.order.order_id }}
              </span>
            </div>
          </template>

          <template #cell(product)="data">
            <div class="text-center">
              {{ data.item.product && data.item.product.name ? data.item.product.name : '-' }}
            </div>
          </template>
          <template #cell(commission)="data">
            <span>
              {{ data.value | toCurrency }}
            </span>
          </template>
          <template #cell(shipped_to_ds)="data">
            <span class="mr-4">
              {{ data.item.status === 'paid' ? 'Yes' : 'No' }}
            </span>
          </template>
          <template #cell(date_ordered)="data">
            <span class="mr-4">
              {{ data.item.order.created_at | formatDate }}
            </span>
          </template>
          <template #cell(status)="data">
            <span class="text-capitalize">
              {{ data.value }}
            </span>
          </template>
        </b-table>
      </div>
    </div>
    <div v-if="!isScreenXS" class="d-flex justify-content-around mt-3">
      <Pagination
          v-if="items.length>0"
          :per-page="perPage"
          :per-page-options="perPageOptions"
          :total="itemsTotal"
          :value="page"
          class="pagination-group"
          @page-click="handlePageClick"
          @per-page-change="handlePerPageChange"
      />
    </div>

    <vue-bottom-sheet
      id="mobile-filter"
      ref="mobileFilter"
      max-width="100vw"
      max-height="90vh"
      :rounded="true"
    >
      <CommissionMobileFilter @filter="applyMobileFilter" />
    </vue-bottom-sheet>
    <CSVMailSuccessModal :show-modal="csv_is_sent" />
  </div>
</template>

<script>
import Vue from 'vue'
import debounce from 'lodash.debounce';
import {mapActions} from 'vuex';
import JsonCSV from 'vue-json-csv'
import CommissionItem from '~/components/profile/vendor-hub/CommissionItem';
import {BulkSelectToolbar, Button, CustomSelectwithCheckbox, Pagination} from '~/components/common';
import CalendarInput from '~/components/common/form/CalendarInput';
import Loader from '~/components/common/Loader';
import {COMMISSIONS_PAGE_OPTIONS, COMMISSIONS_PER_PAGE} from '~/static/constants';
import screenSize from '~/plugins/mixins/screenSize'
import CommissionMobileFilter from '~/components/profile/vendor-hub/CommissionMobileFilter';
import CSVMailSuccessModal from '~/components/profile/vendor-hub/CSVMailSuccessModal';

Vue.component('DownloadCsv', JsonCSV)
export default {
  name: 'Commissions',
  components: {
    Loader, CommissionItem, CSVMailSuccessModal,
    Button, CalendarInput, CustomSelectwithCheckbox, Pagination, BulkSelectToolbar, CommissionMobileFilter},
  mixins: [screenSize],
  data() {
    return {
      isExportActive: false,
      itemsTotal: 0,
      page: 1,
      lastPage: 1,
      perPage: COMMISSIONS_PER_PAGE,
      perPageOptions: COMMISSIONS_PAGE_OPTIONS,
      fields: Object.keys(this.$t('vendor_hub.commission.table')).map(a => {
        return {
          label: this.$t('vendor_hub.commission.table.' + a),
          key: a,
          column: a,
          class: a !== 'order_id' ? ['text-center', 'table-bold', 'pt-3'] : ['table-bold', 'pt-3'],
          sortable: true
        }
      }),
      items: [],
      STATUSES: Object.keys(this.$t('vendor_hub.commission.statuses')).map(a => {
        return {
          text: this.$t('vendor_hub.commission.statuses.' + a),
          value: a
        }
      }),
      filterForm: {
        startDate: null,
        endDate: null,
        statusType: '',
        activeStatusFilters: [],
      },
      commissionItems: [
        {
          image: require('~/assets/img/icons/profile/orders.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/orders.svg'),
          description: this.$t('vendor_hub.commission.orders_fulfilled'),
          amount: '-',
          color: 'blue'
        },
        {
          image: require('~/assets/img/icons/purchase.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/purchase.svg'),
          description: this.$t('vendor_hub.commission.orders_pending'),
          amount: '-',
          color: 'orange'
        },
        {
          image: require('~/assets/img/profile/vendor-hub/infor-orders.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/orders-taken-over.svg'),
          description: this.$t('vendor_hub.commission.orders_taken_over'),
          amount: '-',
          color: 'orange'
        },
        {
          image: require('~/assets/img/profile/vendor-hub/singe-dollar.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/paid-commision.svg'),
          description: this.$t('vendor_hub.commission.total_commission'),
          amount: '-',
          color: 'blue'
        },
        {
          image: require('~/assets/img/profile/vendor-hub/comission-due.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/due-commision.svg'),
          description: this.$t('vendor_hub.commission.total_commission_due'),
          amount: '-',
          color: 'orange'
        },
        {
          image: require('~/assets/img/profile/vendor-hub/tri-star.svg'),
          mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/vendor-rating.svg'),
          description: this.$t('vendor_hub.commission.vendor_rating'),
          amount: '-',
          color: 'blue'
        }
      ],
      selected: [],
      isAllSelected: false,
      dataLoading: false,
      orderByField: 'id',
      orderByDirection: 'asc',
      csv_is_sent: false,
    }
  },
  computed: {
    isItemSelected() {
      return (id) => this.selected.includes(id)
    },
    exportableData() {
      return this.items.filter(item => this.selected.includes(item.id)).map(item => {
        return {
          order_id: item.order.id,
          product: item.product ? item.product.name : '-',
          commission: item.commission,
          status: item.status,
          shipped_to_ds: item.shipped_to_ds,
          date_ordered: item.order.created_at
        }
      })
    }
  },
  mounted() {
    this.getCommissions(true)
    this.getStatistics()
    if (process.browser) {
      const container = document.getElementById('profile-layout')
      window.onscroll = (ev) => {
        if (container && !this.dataLoading) {
          if ((window.innerHeight + window.scrollY) >= container.offsetHeight - 10 && this.isScreenXS) {
            if (this.page < this.lastPage) {
              this.page++
              this.getCommissions()
            }
          }
        }
      };
    }
  },
  methods: {
    ...mapActions({
      fetchCommissions: 'vendor-hub/fetchCommissions',
      fetchCommissionsStatistics: 'vendor-hub/fetchCommissionsStatistics'
    }),
    cancelAction() {
      this.isExportActive = false
      this.selected = []
      this.isAllSelected = false
    },
    handleSelectAll() {
      this.selected = this.items.map(item => item.id)
      this.isAllSelected = true
    },
    handleDeselectAll() {
      this.selected = []
      this.isAllSelected = false
    },
    handleBulkAction() {
      this.$refs.exportButton.$el.click()
    },
    applyFilter() {
      this.getCommissions(true)
    },
    applyMobileFilter(filters) {
      this.filterForm.activeStatusFilters = filters?.activeStatusFilters ?? []
      this.filterForm.startDate = filters?.startDate ?? null
      this.filterForm.endDate = filters?.endDate ?? null
      this.getCommissions(true)
    },
    allSelected(val) {
      this.isAllSelected = val
      if (this.isAllSelected) {
        this.selected = this.items.map(a => a.id)
      } else {
        this.selected = []
      }
    },
    getCommissions(isNewRecordCollection = false, page = 1) {
      this.dataLoading = true
      /* start new lazy loading collection */
      if (isNewRecordCollection) {
        this.page = page // lazy loading will start from first page
        this.items = [] // new lazy loading record list
      }
      this.fetchCommissions(
          {
            take: this.perPage,
            status: this.filterForm.activeStatusFilters.map(filter => filter.value),
            startDate: this.filterForm.startDate,
            endDate: this.filterForm.endDate,
            page: this.page,
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
          }
      ).then(res => {
        this.items.push(...res.data.data.data)
        this.itemsTotal = res.data.data.total
        this.lastPage = res.data.data.last_page
      }).catch(err => {
        this.$toasted.error(err.message)
      }).finally(() => {
        this.dataLoading = false
      })
    },
    getStatistics() {
      this.fetchCommissionsStatistics().then(res => {
        const stats = res.data.data
        this.commissionItems = [
          {
            image: require('~/assets/img/icons/profile/orders.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/orders.svg'),
            description: this.$t('vendor_hub.commission.orders_fulfilled'),
            amount: String(stats.orders.fulfilled),
            color: 'blue'
          },
          {
            image: require('~/assets/img/icons/purchase.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/purchase.svg'),
            description: this.$t('vendor_hub.commission.orders_pending'),
            amount: String(stats.orders.pending),
            color: 'orange'
          },
          {
            image: require('~/assets/img/profile/vendor-hub/infor-orders.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/orders-taken-over.svg'),
            description: this.$t('vendor_hub.commission.orders_taken_over'),
            amount: String(stats.orders.taken_over),
            color: 'orange'
          },
          {
            image: require('~/assets/img/profile/vendor-hub/singe-dollar.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/paid-commision.svg'),
            description: this.$t('vendor_hub.commission.total_commission'),
            amount: this.$options.filters.toCurrency(parseFloat(stats.commission.paid)),
            color: 'blue'
          },
          {
            image: require('~/assets/img/profile/vendor-hub/comission-due.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/due-commision.svg'),
            description: this.$t('vendor_hub.commission.total_commission_due'),
            amount: this.$options.filters.toCurrency(parseFloat(stats.commission.due)),
            color: 'orange'
          },
          {
            image: require('~/assets/img/profile/vendor-hub/tri-star.svg'),
            mobile_image: require('~/assets/img/vendorhub/commission-mobile-icons/vendor-rating.svg'),
            description: this.$t('vendor_hub.commission.vendor_rating'),
            amount: String(stats.vendor_data[0].current_points),
            color: 'blue'
          }
        ]
      }).catch(err => {
        this.$toasted.error(err.message)
      })
    },
    itemSelected(id) {
      const index = this.selected.find(selectedId => selectedId === id)
      if (index) {
        this.selected.splice(index, 1)
      } else {
        this.selected.push(id)
      }
      this.isAllSelected = this.selected.length === this.items.length
    },
    toggleExport() {
      this.isExportActive = !this.isExportActive
      this.selected = []
      this.isAllSelected = false
    },
    calendarContextChange(ctx, from = true) {
      if (ctx.selectedYMD)
        if (from)
          this.filterForm.startDate = ctx.selectedYMD
        else
          this.filterForm.endDate = ctx.selectedYMD
      else if (from)
        this.filterForm.startDate = null
      else
        this.filterForm.endDate = null
    },
    handlePageClick(bvEvent, page) {
      if (this.page !== page) {
        this.getCommissions(true, page)
      }
    },
    handlePerPageChange(value) {
      if (this.perPage !== value) {
        this.perPage = value
        this.getCommissions(true)
      }
    },
    // Show the filter
    showMobileFilter() {
      const { mobileFilter } = this.$refs
      if (mobileFilter) {
        mobileFilter.open()
      }
    },
    onStatusHandler: debounce(function (e) {
     this.getCommissions(true)
    }, 500),

    isSortActive(field){
      return field.sortable
    },
    orderBy(headerItem){
      if (this.isSortActive(headerItem.field)){
        this.orderByDirection = this.reverseDirection(headerItem.field.column)
        this.orderByField = headerItem.field.column
        this.getCommissions(true, 1)
      }
    },
    reverseDirection(column){
      return column === this.orderByField ? (this.orderByDirection === 'asc'? 'desc' : 'asc'): 'desc'
    },
    sendCSV() {
      // TODO: Mail send api integration
      if (!this.csv_is_sent) {
        this.csv_is_sent = true
        setTimeout(() => {
          this.csv_is_sent = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import '~/assets/css/_variables'

.link-text
  text-decoration-line: underline
  color: $color-blue-1

::v-deep
  td.table-bold
    @include body-8
    font-family: $font-family-sf-pro-display
    font-style: normal
    font-weight: $normal

.dropdown-filters
  min-width: 141px

.label-text.thin
  font-weight: $normal

.label-text
  @include body-8-normal
  font-family: $font-family-sf-pro-display
  font-style: normal
  color: $color-black-1

.commission
  background: $color-white-1
  border: 1px solid $color-gray-29
  box-shadow: 0 2px 4px rgba($color-black-1, 0.15)
  border-radius: 4px

.title
  font-family: $font-family-montserrat

::v-deep.bg-light
  position: initial !important

.apply-button.btn
  width: max-content
  font-weight: $normal
  background-color: $color-blue-20
  border: none
  &:hover
    background-color: rgba($color-blue-20, .9)

::v-deep
  .custom-control-input:checked
    ~ .custom-control-label::before
      color: $white
      background-color: $black
      box-shadow: none
      border-radius: 2px
      border: 1px solid $black

::v-deep
  .custom-control-input
    ~ .custom-control-label::before
      color: $white
      background-color: $white
      box-shadow: none
      border-radius: 2px
      border: 1px solid $black

.divider
  border: 2px solid $color-gray-3

.color-blue-20
  color: $color-blue-20

.color-gray-5
  color: $color-gray-5

.commission-item-box
  flex: 50%

.text-color-gray-5
  color: $color-gray-5

.border
  border: 1px solid $color-gray-60
  border-radius: 12px
  overflow: hidden
  padding: 15px 10px

.text-blue-30
  color: $color-blue-30

.export-button
  min-width: 141px
  font-family: $font-sp-pro
  @include body-8-medium

.header
  font-family: $font-family-sf-pro-display
  font-style: normal
  @include body-8-bold

.mb-30px
  margin-bottom: 30px

.mt-30px
  margin-top: 30px

.commission-table::v-deep
  .table.b-table > thead > tr > [aria-sort=none]
    background-size: 0px
  .table.b-table > thead > tr > [aria-sort=ascending]
    background-size: 0px
  .table.b-table > thead > tr > [aria-sort=descending]
    background-size: 0px

.sort-icon
  &.asc
    transform: rotate(180deg)

::v-deep.date-picker
  width: 170px
  .date-input,
  .date-dp .btn-secondary
    background-color: $white
</style>
