<template>
  <div>
    <div class="row justify-content-between py-20">
      <div class="text-center flex-md-grow-1">
        <NavGroup :value="activeNav" :data="categories" @change="navItem"/>
      </div>
      <div class="d-none d-md-block">
        <button class="btn-export" @click="handleExportBtnClick">{{ $t('orders.export_to_csv') }}</button>
      </div>
    </div>

    <div>
      <bulk-select-toolbar
        :active="action !== 'none'"
        :total="orders.length"
        :selected="selectedOrders"
        :unitLabel="$tc('common.product', selectedOrders.length)"
        :successLabel="$tc('wish_lists.products_removed_from_wishlist')"
        :action-label="$tc('orders.export_to_csv')"
        @close="cancelAction()"
        @selectAll="handleSelectAll()"
        @deselectAll="handleDeselectAll()"
        @submit="exportToCSV"
      />
      <b-table-simple responsive borderless class="collapsible-table top-movers-table">
        <b-thead class="d-none d-md-header-group">
          <b-tr>
            <b-th class="d-flex">
              <div v-if="action !== 'none'" class="mr-auto">
                <b-form-checkbox
                  v-model="chkSelectAll"
                  name="select"
                  value="select_all"
                  unchecked-value="not_accepted"
                />
              </div>
              <div class="d-flex justify-content-center align-items-center pointer" @click="handleSort('order_id')">
                <div>{{ $t('orders.order_id') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'order_id')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>
              <div class="d-flex justify-content-center pointer" @click="handleSort('products.name')">
                <div>{{ $t('orders.product') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'products.name')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>
              <div class="d-flex justify-content-center pointer" @click="handleSort('created_at')">
                <div>{{ $t('orders.date_ordered') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'created_at')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>
              <div class="d-flex justify-content-center pointer" @click="handleSort('order_type')">
                <div>{{ $t('orders.type') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'order_type')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>
              <div class="d-flex justify-content-center pointer" @click="handleSort('total')">
                <div>{{ $t('orders.vendor_payout') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'total')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>
              <div class="d-flex justify-content-center pointer" @click="handleSort('listing_item_order.status')">
                <div>{{ $t('orders.status') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'listing_item_order.status')?'ml-1 desc':'ml-1'"/>
              </div>
            </b-th>
            <b-th>{{ $t('orders.action') }}</b-th>
          </b-tr>
        </b-thead>
        <b-tbody v-if="isLoading">
          <b-tr>
            <b-td colspan="7">
              <loader :loading="isLoading"></loader>
            </b-td>
          </b-tr>
        </b-tbody>
        <template v-if="!isLoading">
          <top-mover-component
            v-for="order in orders" :key="order.key"
            :order="order"
            :is-selectable="action !== 'none'"
            :value="isSelected(order.order_id)?order.order_id:0"
            @labelCreated="reload"
            @checked="handleChecked"/>
        </template>
      </b-table-simple>
    </div>
    <div v-if="!isLoading">
      <Pagination
        v-model="page"
        :total="totalPage"
        :per-page="perPage"
        :per-page-options="[5, 10, 15, 20, 25]"
        class="mt-2"
        @page-click="handlePageClick"
        @per-page-change="handlePerPageChange"
      />
    </div>
    <AlertModal
      id="exported-message-modal"
      :message="$t('inventory.message.exported')"
      icon="tick"
      auto-hide
      @hidden="onExportedModalHidden"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {BulkSelectToolbar, Icon, Loader, NavGroup, Pagination} from '~/components/common';
import TopMoverComponent from '~/components/orders/TopMoverComponent';
import {AlertModal} from '~/components/modal';

export default {
  name: 'TopMoversListComponent',
  components: {
    NavGroup,
    TopMoverComponent,
    Pagination,
    BulkSelectToolbar,
    Icon,
    Loader,
    AlertModal
  },
  data() {
    return {
      page: this.currentPage || 1,
      // Active Nav for the Toggle Button
      activeNav: 'all',
      action: 'none', // show, none
      descSort: '',
      chkSelectAll: '',
      selectedOrders: []
    }
  },
  computed: {
    ...mapGetters({
      'orders': 'vendors/orders',
      'totalPage': 'vendors/totalPage',
      'currentPage': 'vendors/currentPage',
      'perPage': 'vendors/perPage',
      'categories': 'vendors/categories',
      'isLoading': 'vendors/isLoading'
    }),
  },
  watch: {
    descSort(val) {
      val = val === 'type' ? 'order_type' : val;
      val = val === 'date_ordered' ? 'created_at' : val;
      val = val === 'vendor_payout' ? 'vendor_commission' : val;

      this.$store.commit('vendors/setOrderBy', val)
      this.$store.dispatch('vendors/getVendorOrders', 1)
    },
    chkSelectAll(val) {
      if (val === 'select_all') {
        this.handleSelectAll()
      } else {
        this.handleDeselectAll()
      }
    }
  },
  methods: {
    navItem(val) {
      this.activeNav = val
      const categoryId = this.categories.filter(x => x.value === val)[0]?.id
      this.$store.commit('vendors/setCategoryId', {category_id: categoryId})
      this.reload()
    },
    handlePageClick(e, page) {
      this.$store.dispatch('vendors/getVendorOrders', page)
    },
    reload() {
      this.$store.dispatch('vendors/getVendorOrders', this.page)
    },
    handlePerPageChange(e) {
      this.$store.commit('vendors/setPerPage', e)
    },
    cancelAction() {
      this.action = 'none'
      this.chkSelectAll = ''
      this.selectedOrders = []
    },
    handleDeselectAll() {
      this.chkSelectAll = ''
      this.selectedOrders = []
    },
    handleSelectAll() {
      this.chkSelectAll = 'select_all'
      const orderIds = this.orders.map(x => x.order_id)
      this.selectedOrders = Array.from(orderIds)
    },
    onExportedModalHidden() {
      this.chkSelectAll = ''
      this.selectedOrders = []
    },
    exportToCSV() {
      const data = []
      this.orders.forEach(order => {
        if (this.selectedOrders.includes(order.order_id)) {
          order.items.forEach(i => {
            data.push({
              order_id: order.order_id,
              order_date: order.created_at,
              vendor_commission: order.vendor_commission,
              status: i.status,
              product: i.product.name,
              sku: i.product.sku,
              brand: i.product.brand,
              colorway: i.product.colorway,
              release_year: i.product.release_year,
              retail_price: i.product.retail_price,
              sales_percentage: i.product.sales_percentage
            })
          })
        }
      })

      let csvContent = 'data:text/csv;charset=utf-8,'
      csvContent += [
        [
          'order_id',
          'order_date',
          'vendor_commission',
          'status',
          'product',
          'sku',
          'brand',
          'colorway',
          'release_year',
          'retail_price',
          'sales_percentage'
        ].join(','),
        ...data
          .map((i) =>
            [
              i.order_id,
              i.order_date,
              i.vendor_commission / 100,
              i.status,
              i.product,
              i.sku,
              i.brand,
              i.colorway,
              i.release_year,
              i.retail_price / 100,
              i.sales_percentage,
            ].join(',')
          ),
      ]
        .join('\n')
        .replace(/(^\[)|(\]$)/gm, '')

      const content = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', content)
      link.setAttribute('download', 'export.csv')
      link.click()

      this.$bvModal.show('exported-message-modal')
    },
    handleChecked(newVal, oldVal) {
      const isSelected = newVal && !oldVal
      const isDeselected = !newVal && oldVal

      if (isSelected && !this.selectedOrders.includes(newVal)) {
        this.selectedOrders.push(newVal)
      }

      if (isDeselected) {
        const index = this.selectedOrders.findIndex(v => v === oldVal)
        // delete the deselected orderId from the array
        this.selectedOrders.splice(index, 1)
      }
    },
    handleExportBtnClick(e) {
      this.action = this.action === 'none' ? 'show' : 'none'
      if (this.action === 'none') {
        this.selectedOrders = []
      }
    },
    handleSort(field) {
      this.descSort = (this.descSort === field) ? '' : field
    },
    isSelected(orderId) {
      return this.selectedOrders.includes(orderId)
    }
  }
}
</script>

<style scoped lang="sass">
@import 'bootstrap/scss/functions'
@import 'bootstrap/scss/variables'
@import 'bootstrap/scss/mixins'
@import '/assets/css/variables'

.py-20
  padding: 20px

.nav-align
  flex-grow: 2
  text-align: center

.btn-export
  height: 38px
  background: $black
  border-radius: 5px
  font-family: $font-family-sf-pro-display
  font-weight: $normal
  @include body-8
  text-align: center
  color: $white
  padding: 10px 25px
  border: none

::v-deep .collapsible-table .table
  border-collapse: separate
  border-spacing: 0 10px
  text-align: center

.collapsible-table thead th
  font-family: $font-family-montserrat
  @include body-4-bold

.top-movers-table th:nth-child(1)
  width: 148px

.top-movers-table th:nth-child(2)
  width: 267px

.top-movers-table th:nth-child(3)
  width: 198px

.top-movers-table th:nth-child(4)
  width: 92px

.top-movers-table th:nth-child(5)
  width: 213px

.top-movers-table th:nth-child(6)
  width: 235px

::v-deep .collapsible-table tbody td
  vertical-align: middle
  font-family: $font-family-sf-pro-display
  @include body-4-normal

  .title
    font-size: 14px
    font-weight: bold

  .sku, .attribute
    font-size: 13px
    color: $color-gray-6

  .status
    width: 141px
    padding: 12px 30px
    border-radius: 4px

::v-deep .status.awaiting
  background: $color-gray-3
  color: $color-red-20

::v-deep .status.arrived
  background: $color-green-20
  color: $color-green-3

::v-deep .status.shipped
  background: $dark-gray-5
  color: $color-blue-16

::v-deep .status.awaiting-auth
  background: $dark-gray-6
  color: $color-blue-17

::v-deep .status.order-taken-over
  background: $dark-gray-7
  color: $color-gray-5

::v-deep .collapsible-table tbody tr
  background: $white

::v-deep .nav-align button.btn.btn-secondary
  text-transform: capitalize

.desc
  transform: rotate(180deg)

@include media-breakpoint-up(md)
    .d-md-header-group
        display: table-header-group !important

</style>
