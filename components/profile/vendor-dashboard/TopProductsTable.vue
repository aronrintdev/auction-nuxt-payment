<template>
  <div>
    <div v-if="!isScreenXS" class="d-flex align-items-center justify-content-between">
      <h1 class="heading-1-bold mb-0 heading font-secondary">
        {{ $t('vendor_dashboard.top_products') }}
      </h1>
      <NavGroup :data="menus" :value="activeNav" @change="navItem"/>
      <div class="col-6 col-md-3 d-flex justify-content-end align-items-center" role="button">
        <a
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
            @click="$router.push('/profile/inventory')"
        >{{ $t('vendor_dashboard.view_all') }}</a
        >
      </div>
    </div>
    <div v-if="isScreenXS" class="d-flex ">
      <div class="flex-grow-1 text-center body-5-medium ml-5">
        {{ $t('vendor_purchase.products') }}
      </div>
      <div class="d-flex align-items-center body-9-regular"
           role="button"
           @click="$router.push('/profile/inventory')">
        <img :alt="$t('vendor_dashboard.view_all')" :src="require('~/assets/img/icons/eye2.svg')"
             class="mr-1">{{ $t('vendor_dashboard.view_all') }}
      </div>
    </div>
    <div>
      <b-table
          :fields="fields"
          :items="topProducts"
          borderless
          class="productTable"
          no-border-collapse
          tbody-tr-class="bg-white"
          :busy="loading"
          :show-empty="!loading && topProducts.length === 0"
      >
        <template #table-busy>
          <div class="d-flex align-items-center justify-content-center">
            <Loader :loading="loading"/>
          </div>
        </template>
        <template #cell(product)="row">
          <div class="d-flex align-items-center gap-3 mb-2 mb-sm-0" role="button"
               @click="$router.push('/profile/inventory')">
            <div class="col-thumb d-flex justify-content-center">
              <ProductThumb :product="row.item" :src="row.item.image"/>
            </div>
            <div class="font-secondary">
              <h4
                  :class="{
                  'body-5-medium mobile': isScreenXS,
                  'font-secondary': !isScreenXS,
                }"
                  class="body-8-medium text-color-blue-1 border-bottom border-primary mb-1 text-nowrap text-truncate mw-300"
              >
                {{ row.item.name }}
              </h4>
              <h4 class="body-21-normal mb-0 text-color-gray-6">
                {{ $t('vendor_dashboard.sku') }}: {{ row.item.sku }}
              </h4>
              <h4 :class="mobileClass"
                  class="body-21-normal mb-0 text-color-gray-6 text-nowrap text-truncate mw-300">
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
import ProductThumb from '~/components/product/Thumb.vue'
import NavGroup from '~/components/common/NavGroup.vue'
import screenSize from '~/plugins/mixins/screenSize';
import Loader from '~/components/common/Loader';

export default {
  name: 'TopProductsTable',
  components: {Loader, NavGroup, ProductThumb},
  mixins: [screenSize],
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: '',
      topProducts: [],
      fields: [
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
          thClass: 'body-4-bold',
        },
        {
          key: 'average_sale_price',
          label: this.$t('vendor_dashboard.avg_price'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'sales_this_month',
          label: this.$t('vendor_dashboard.sales_this_month'),
          sortable: true,
          thClass: 'text-center body-4-bold',
        },
        {
          key: 'total_sales',
          label: this.$tc('vendor_dashboard.total_sales', 1),
          sortable: true,
          thClass: 'text-center body-4-bold',
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
        {label: this.$t('vendor_dashboard.all'), value: ''},
        {label: this.$t('vendor_dashboard.footwear'), value: '1'},
        {label: this.$t('vendor_dashboard.apparel'), value: '2'},
        {
          label: this.$t('vendor_dashboard.accessories'),
          value: '3',
        },
      ],
      loading: false
    }
  },
  mounted() {
    this.getTopProducts()
  },
  methods: {
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
          .get('/dashboard/vendor/top-products?category_id=' + this.activeNav)
          .then((res) => {
            this.topProducts = res.data.data
          })
          .catch((err) => {
            this.logger.logToServer(err.response)
          }).finally(() => {
        this.loading = false
      })
    },
  },
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'

.text-color-blue-1
  color: $color-blue-1

.text-color-gray-6
  color: $color-gray-6

.mw-300
  max-width: 300px

  &.mobile
    max-width: 200px

.productTable
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

  .col-thumb
    width: 100px

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
      padding: 15px 0

      h4.font-secondary
        width: fit-content
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal
        font-family: $font-family-base

        &.border-bottom.bottom-primary
          border: 0 !important
    .tdHeight
      font-size: 12px
      color: $color-black-1
      font-weight: $bold
      width: 100%

      h4
        font-size: 12px
        color: $color-gray-6
        font-weight: $normal

      &::before
        content: attr(aria-label)
        margin-right: auto
        width: 100%
</style>
