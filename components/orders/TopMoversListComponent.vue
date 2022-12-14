<template>
  <div>
    <div class="row justify-content-center justify-content-md-between align-items-center py-md-0 py-3">
      <div class="text-center flex-md-grow-1 nav-wrapper">
        <NavGroup :value="activeNav" :data="navCategories" @change="navItem"/>
      </div>
      <div class="d-none d-md-block">
        <button class="btn-export text-center border-0" @click="handleExportBtnClick">{{
            $t('orders.export_to_csv')
          }}
        </button>
      </div>
    </div>
    <template v-if="!isScreenXS">
      <div class="py-md-50px">
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

        <div v-if="!isLoading" class="row table-heading text-center">
          <div class="col d-none d-md-block">
            <div class="d-flex">
              <div v-if="action !== 'none'" class="mr-auto">
                <b-form-checkbox
                  v-model="chkSelectAll"
                  name="select"
                  value="select_all"
                  unchecked-value="not_accepted"
                />
              </div>
              <div class="d-flex justify-content-center pointer align-items-center" @click="handleSort('products.name')">
                <div>{{ $t('orders.product') }}</div>
                <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                      :class="(descSort === 'products.name')?'ml-1 desc':'ml-1'"/>
              </div>
            </div>
          </div>
          <div class="col-md-2 d-none d-md-block">
          </div>
          <div class="col d-none d-md-block">
            <div class="d-flex justify-content-center pointer align-items-center" @click="handleSort('created_at')">
              <div>{{ $t('orders.date_ordered') }}</div>
              <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                    :class="(descSort === 'created_at')?'ml-1 desc':'ml-1'"/>
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="d-flex justify-content-center pointer align-items-center" @click="handleSort('order_type')">
              <div>{{ $t('orders.type') }}</div>
              <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                    :class="(descSort === 'order_type')?'ml-1 desc':'ml-1'"/>
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="d-flex justify-content-center pointer align-items-center" @click="handleSort('total')">
              <div>{{ $t('orders.vendor_payout') }}</div>
              <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                    :class="(descSort === 'total')?'ml-1 desc':'ml-1'"/>
            </div>
          </div>
          <div class="col d-none d-md-block">
            <div class="d-flex justify-content-center pointer align-items-center"
                 @click="handleSort('listing_item_order.status')">
              <div>{{ $t('orders.status') }}</div>
              <Icon :src="require('~/assets/img/icons/down-arrow-solid.svg')" height="9"
                    :class="(descSort === 'listing_item_order.status')?'ml-1 desc':'ml-1'"/>
            </div>
          </div>
          <div class="col-md-2 d-none d-md-block">{{ $t('orders.action') }}</div>
        </div>
        <div v-if="isLoading">
          <loader :loading="isLoading"></loader>
        </div>
        <div v-if="!isLoading">
          <top-mover-component-new
            v-for="order in orders" :key="order.key"
            :order="order"
            :is-selectable="action !== 'none'"
            :value="isSelected(order.order_id)?order.order_id:0"
            @labelCreated="reload"
            @checked="handleChecked"
          >
          </top-mover-component-new>
          <div v-if="orders.length===0">
            <div class="py-5 no-order-msg">
              <div class="text-center">{{$t('orders.looks_like_no_orders_have_been_placed')}}</div>
              <div class="text-center my-2">{{$t('orders.list_a_product_today_on_deadstock')}}!</div>
              <div class="text-center mt-4">
                <NuxtLink to="/profile/create-listing" class="btn btn-primary btn-create-listing">{{$t('orders.create_a_listing')}}</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="!isLoading && orders.length!==0">
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
    </template>
    <template v-if="isScreenXS">
      <div>
        <top-mover-component-new
          v-for="infOrder in infiniteOrders" :key="infOrder.key"
          :order="infOrder"
          :is-selectable="action !== 'none'"
          :value="isSelected(infOrder.order_id)?infOrder.order_id:0"
          @labelCreated="reload"
          @checked="handleChecked"
        >
        </top-mover-component-new>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="handleLoading">
        <div slot="no-more"></div>
      </infinite-loading>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {BulkSelectToolbar, Icon, Loader, NavGroup, Pagination} from '~/components/common';
import {AlertModal} from '~/components/modal';
import TopMoverComponentNew from '~/components/orders/TopMoverComponentNew';
import screenSize from '~/plugins/mixins/screenSize';

export default {
  name: 'TopMoversListComponent',
  components: {
    NavGroup,
    TopMoverComponentNew,
    Pagination,
    BulkSelectToolbar,
    Icon,
    Loader,
    AlertModal
  },
  mixins: [screenSize],
  data() {
    return {
      page: this.currentPage || 1,
      // Active Nav for the Toggle Button
      infiniteOrders: [],
      activeNav: '',
      action: 'none', // show, none
      descSort: '',
      chkSelectAll: '',
      selectedOrders: [],
      infiniteId: +new Date(),
      url: null,
      navCategories: [
        {label: 'All', value: ''},
        {label: 'Footwear', value: '1'},
        {label: 'Apparel', value: '2'},
        {label: 'Accessories', value: '3'},
      ],
    }
  },
  computed: {
    ...mapGetters({
      'orders': 'vendors/orders',
      'totalPage': 'vendors/totalPage',
      'currentPage': 'vendors/currentPage',
      'perPage': 'vendors/perPage',
      'isLoading': 'vendors/isLoading',
      'queryString': 'vendors/queryString'
    })
  },
  watch: {
    descSort(val) {
      val = val === 'type' ? 'order_type' : val;
      val = val === 'date_ordered' ? 'created_at' : val;
      val = val === 'vendor_payout' ? 'vendor_commission' : val;

      this.$store.commit('vendors/setOrderBy', val)
      this.$store.dispatch('vendors/getVendorOrders', 1)
    },
    queryString(val) {
      this.infiniteOrders = []
      this.infiniteId += 1
      this.url = `/vendors/orders?page=1${val}`
    },
    chkSelectAll(val) {
      if (val === 'select_all') {
        this.handleSelectAll()
      } else {
        this.handleDeselectAll()
      }
    }
  },
  mounted() {
    this.url = `/vendors/orders?page=1${this.queryString}`
  },
  methods: {
    ...mapActions({
      'updateQueryString': 'vendors/updateQueryString'
    }),
    navItem(val) {
      this.activeNav = val
      this.$store.commit('vendors/setCategoryId', {category_id: val})
      this.infiniteId += 1
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
    handleLoading($state) {
      const that = this
      this.$axios.get(this.url).then(res => {
        const data = res.data?.data

        if (!data.orders.next_page_url) {
          $state.complete()
        } else {
          that.url = data.orders.next_page_url
        }

        if (data.orders.current_page === 1) {
          that.infiniteOrders = [...data.orders.data]
        } else {
          that.infiniteOrders = [...that.infiniteOrders, ...data.orders.data]
        }

        $state.loaded()
      })
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
@import '/assets/css/variables'
.no-order-msg
  color: $color-gray-5
  font-family: $font-montserrat
  @include body-14
  font-weight: $medium

  .btn-create-listing
    border: none
    background: $color-blue-20
    color: $color-white-1
    background: $color-grey-101
    border-radius: 21px

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
  color: $white
  padding: 10px 25px

::v-deep .collapsible-table .table
  border-collapse: separate
  border-spacing: 0 10px
  text-align: center

.table-heading
  font-family: $font-family-montserrat
  @include body-8-medium

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

::v-deep .status.awaiting-shipment
  background: $awaiting-shipment
  color: $color-red-20

::v-deep .status.awaiting-shipment-ds
  background: $awaiting-shipment-ds
  color: $color-green-3

::v-deep .status.commission-paid
  background: $commission-paid
  color: $color-blue-34

::v-deep .status.arrived
  background: $color-green-20
  color: $color-green-3

::v-deep .status.shipped
  background: $shipped
  color: $color-blue-16

::v-deep .status.awaiting-auth
  background: $awaiting-auth
  color: $color-blue-17

::v-deep .status.order-taken-over
  background: $order-taken-over
  color: $color-gray-5

::v-deep .collapsible-table tbody tr
  background: $white

::v-deep .nav-align button.btn.btn-secondary
  text-transform: capitalize

::v-deep .nav-group .btn-group .btn.btn-secondary
  text-transform: capitalize

.desc
  transform: rotate(180deg)

::v-deep .nav-group
  .btn-group
    background-color: $white-5

    .btn
      @include body-6
      background-color: $white-5

    .btn.active
      font-weight: $medium

@media (min-width: 993px)
  .nav-wrapper
    width: 80%

  .d-md-header-group
    display: table-header-group !important

  .py-md-50px
    margin-top: 57px

  ::v-deep .nav-group
    margin: 5px 0

  ::v-deep .nav-group .btn-group
    width: 45%

@media (max-width: 992px)
  .nav-wrapper
    width: 96%
</style>
