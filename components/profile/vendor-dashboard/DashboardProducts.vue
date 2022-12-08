<template>
  <div class="vendor-products" :class="mobileClass">
    <div
      v-if="!isScreenXS"
      class="d-flex align-items-center justify-content-between mb-4"
    >
      <h1 class="heading-1-bold mb-0 font-secondary">
        {{ $t('vendor_dashboard.products') }}
      </h1>
      <NavGroup
        v-if="!isScreenXS"
        :data="menus"
        :value="activeNav"
        :class="mobileClass"
        class="nav-grp"
        @change="navItem"
      />
      <div
        v-if="!isScreenXS"
        class="d-flex justify-content-end align-items-center"
        role="button"
      >
        <a
          class="font-primary body-4-regular mb-0 text-black"
          @click="$router.push('/profile/inventory')"
          >{{ $t('vendor_dashboard.view_all') }}
          <img :src="require('~/assets/img/icons/arrow-right-gray.svg')"
        /></a>
      </div>
    </div>
    <div v-if="!isScreenXS" class="vd-purchases-section">
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
              :placeholder="$t('vendor_dashboard.breakdown.search_placeholder')"
              autocomplete="off"
              class="border-0 w-100 input-text"
              type="text"
              @input="searchProducts"
            />
          </div>
        </div>
        <div class="col-4 d-flex justify-content-end">
          <CustomSelect
            :options="{
              '': $t('vendor_purchase.sort_by'),
              recent_to_old: $t('vendor_purchase.purchase_recent_to_old'),
              old_to_recent: $t('vendor_purchase.purchase_oldest_to_recent'),
            }"
            :threeline-icon="false"
            bordered
            class="vp-custom-select w-100 bg-white-5"
            inputClass="purchase-input"
            dropdownClass="purchase-items"
            @input="handleFilterChanged"
          ></CustomSelect>
        </div>
      </div>
    </div>
    <div
      v-if="isScreenXS"
      class="d-flex align-items-center justify-content-between"
    >
      <div class="text-center body-5-medium">
        {{ $t('vendor_purchase.products') }}
      </div>
    </div>

    <div>
      <b-table
        :fields="fields"
        :items="topProducts"
        borderless
        class="productTable"
        no-border-collapse
        tbody-tr-class="bg-white p-web-row"
        :busy="loading"
        :show-empty="!loading && topProducts.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center w-100">
            <Loader :loading="loading" />
          </div>
        </template>
        <template #head()="scope">
          <div class="text-nowrap" role="button" @click="orderBy(scope)">
            <span class="mr-1">{{ scope.label }}</span>
            <img
              v-if="scope.label"
              :src="require('~/assets/img/icons/down-arrow-solid.svg')"
              :alt="scope.label"
              class="sort-icon"
              :class="reverseDirection(scope.column)"
            />
          </div>
        </template>
        <template #cell(product)="row">
          <div
            :class="{
              'align-items-center': !isScreenXS,
              'align-items-start': isScreenXS,
            }"
            class="d-flex gap-3 mb-2 mb-sm-0"
            role="button"
            @click="
              $router.push(`/profile/vendor-dashboard/products/${row.item.id}`)
            "
          >
            <div class="col-thumb d-flex justify-content-center">
              <ProductThumb
                :product="row.item"
                :src="row.item.image"
                class="prod-image"
              />
            </div>
            <div class="font-secondary">
              <h4
                :class="{
                  'body-5-medium mobile': isScreenXS,
                  'font-secondary': !isScreenXS,
                }"
                class="body-8-medium text-decoration-underline text-link-blue-mobile border-primary mb-1 text-nowrap text-truncate mw-220"
              >
                {{ row.item.name }}
              </h4>
              <h4 class="body-6-normal mb-0 text-color-gray-6">
                {{ $t('vendor_dashboard.sku') }}: {{ row.item.sku }}
              </h4>
              <h4
                :class="mobileClass"
                class="body-6-normal mb-0 text-color-gray-6 text-nowrap text-truncate mw-220"
              >
                {{ $t('vendor_dashboard.colorway') }}: {{ row.item.colorway }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(average_sale_price)="row">
          <div
            :aria-label="$t('vendor_dashboard.avg_price')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.avg_sales_price | toCurrency }}
            </h4>
          </div>
        </template>
        <template #cell(sales_this_month)="row">
          <div
            :aria-label="$t('vendor_dashboard.sales_this_month')"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.sales_amount_this_month | toCurrency }}
              <span
                v-if="row.item.sales_percentage > 0"
                class="text-success text-sm"
                >(+{{ row.item.sales_percentage }}%)</span
              >
              <span
                v-if="row.item.sales_percentage < 0"
                class="text-danger text-sm"
                >(-{{ row.item.sales_percentage }}%)</span
              >
            </h4>
          </div>
        </template>
        <template #cell(total_sales)="row">
          <div
            :aria-label="$tc('vendor_dashboard.total_sales', 1)"
            class="d-flex align-items-center justify-content-center tdHeight"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.total_sales_amount | toCurrency }}
            </h4>
          </div>
        </template>
        <template #cell(chart)="row">
          <div
            class="d-flex align-items-center justify-content-center tdHeight position-relative"
          >
            <LineChart
              :border-width="2"
              :chart-data="itemChart(row.item)"
              is-graph
              :fill="false"
              :options="lineConfig"
              class="stats-graph"
            ></LineChart>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import screenSize from '~/plugins/mixins/screenSize'
import Loader from '~/components/common/Loader'
import CustomSelect from '~/components/common/CustomSelect'

export default {
  name: 'DashboardVendorProducts',
  components: { CustomSelect, Loader, NavGroup, ProductThumb },
  mixins: [screenSize],
  props: {
    filterSearch: {
      type: String,
      default: '',
    },
    filterSort: {
      type: String,
      default: 'recent_to_old',
    },
  },
  data() {
    return {
      activeNav: '1',
      topProducts: [],
      fields: [
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: false,
          thClass: 'text-nowrap body-4-bold',
        },
        {
          key: 'average_sale_price',
          label: this.$t('vendor_dashboard.avg_price'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'sales_this_month',
          label: this.$t('vendor_dashboard.sales_this_month'),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'total_sales',
          label: this.$tc('vendor_dashboard.total_sales', 1),
          sortable: false,
          thClass: 'text-nowrap text-center body-4-bold',
        },
        {
          key: 'chart',
          label: '',
          sortable: false,
          tdClass: 'd-none d-sm-flex',
        },
      ],
      lineConfig: {
        responsive: true,
        maintainAspectRatio: false,
        borderWidth: 3,
        showLine: false,
        fill: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: false,
              },
              scaleLabel: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltip: {
          display: false,
        },
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      /** Todo need to make dynamic onces we have way of main categories in DB */
      menus: [
        { label: this.$t('vendor_dashboard.all'), value: '' },
        { label: this.$t('vendor_dashboard.footwear'), value: '1' },
        { label: this.$t('vendor_dashboard.apparel'), value: '2' },
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: '3',
        },
      ],
      loading: false,
      orderByField: 'id',
      orderByDirection: 'asc',
      sortBySelected: 'recent_to_old',
      searchValue: null,
    }
  },
  computed: {
    mobileMenu() {
      return this.menus.filter((menu) => menu.value !== '')
    },
  },
  watch: {
    filterSearch(val) {
      this.searchProducts(val)
    },
    filterSort(val) {
      this.handleFilterChanged(val)
    },
  },
  mounted() {
    this.getTopProducts()
  },
  methods: {
    handleFilterChanged(filter) {
      this.sortBySelected = filter
      this.orderByField = 'created_at'
      this.orderByDirection = filter === 'recent_to_old' ? 'asc' : 'desc'
      this.getTopProducts()
    },
    searchProducts: _.debounce(function () {
      this.getTopProducts()
    }, 500),
    orderBy(scope) {
      if (scope.column !== 'actions') {
        this.orderByDirection = this.reverseDirection(scope.column)
        this.orderByField = scope.column
        this.getTopProducts()
      }
    },
    reverseDirection(column) {
      return column === this.orderByField
        ? this.orderByDirection === 'asc'
          ? 'desc'
          : 'asc'
        : 'desc'
    },
    navItem(val) {
      this.activeNav = val
      this.getTopProducts()
    },
    itemData(item) {
      return Object.values(item.month_graph)
    },
    itemLabel(item) {
      return Object.keys(item.month_graph)
    },
    itemChart(item) {
      return {
        labels: this.itemLabel(item),
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: null,
            data: this.itemData(item),
            fill: false,
            borderWidth: 2,
          },
        ],
      }
    },
    getTopProducts() {
      this.loading = true
      this.$axios
        .get('/dashboard/vendor/top-products', {
          params: {
            top_products_count: 5,
            category_id: this.activeNav,
            order_by_column: this.orderByField,
            order_by_direction: this.orderByDirection,
            sort_by: this.sortBySelected,
            search: this.searchValue,
          },
        })
        .then((res) => {
          this.topProducts = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>
<style lang="sass" scoped>
@import '~/assets/css/_variables'
.input-field-search
  max-width: 778px

::v-deep.vp-custom-select
  width: 245px !important
  .selected
    &:after
      top: 3px

.vendor-products
  margin-top: 61px
  &.mobile
    margin-top: 40px

.sort-icon
  &.asc
    transform: rotate(180deg)

::v-deep.p-web-row
  padding: 26px 28px

::v-deep.nav-grp
  width: 460px
  margin: 0 !important
  &.mobile
    width: 100%
  .btn-group
    height: 32px
    button.btn
      @include body-6-regular
      font-family: $font-montserrat
      width: 103px
      padding-block: 1px
      &.active
        font-weight: $medium

::v-deep.prod-image
  width: 100px

  img
    object-fit: cover

.text-color-blue-30
  color: $color-blue-30

.mt-20
  margin-top: 20px

.text-color-blue-1
  color: $color-blue-1

.text-color-gray-6
  color: $color-gray-6

.mw-220
  max-width: 220px

  &.mobile
    max-width: 200px

::v-deep.productTable
  &.table.b-table.b-table-no-border-collapse
    border-spacing: 0 10px

  thead th div
    font-family: $font-family-base
    @include body-13-bold

  tbody td
    height: 100px
    @media (max-width: 576px)
      display: flex
      height: fit-content
      padding: 2px 0.75rem
      &:nth-child(odd)
        background-color: $color-white-5
      &:first-child
        background-color: transparent

  thead
    tr
      [aria-sort=none]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22zM51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important

      [aria-sort=descending]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 101l25-23 24-22H1l25 22z'/%3e%3c/svg%3e") !important

      [aria-sort=ascending]
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='101' height='101' view-box='0 0 101 101' preserveAspectRatio='none'%3e%3cpath fill='black' d='M51 1l25 23 24 22H1l25-22z'/%3e%3c/svg%3e") !important


  .tdHeight
    height: inherit

  .stats-graph
    width: 100px
    height: 40px

  @media (max-width: 576px)
    .view-more-link
      font-size: 10px
      font-weight: $medium
    .heading
      font-family: $font-family-base
      @include body-5-medium
    thead
      display: none
    tr[role="row"]
      box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25)
      border-radius: 8px
      outline: 1px solid $color-gray-3
      display: block
      margin: 12px 0
      padding: 15px 0 6px 0

      h4.font-secondary
        width: fit-content
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base

        &.border-bottom.bottom-primary
          border: 0 !important
    .tdHeight
      @include body-9-medium
      color: $color-black-1
      width: 100%
      padding: 1px 0
      h4
        @include body-9-normal
        color: $color-gray-6

      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
