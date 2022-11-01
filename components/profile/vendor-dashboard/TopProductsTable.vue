<template>
  <div>
    <div class="row my-5">
      <div class="col-6 col-md-3">
        <h1 class="font-secondary fs-24 fw-7 mb-0 heading">
          {{ $t('vendor_dashboard.top_products') }}
        </h1>
      </div>
      <div class="col-md-6 d-sm-flex justify-content-center d-none">
        <NavGroup :value="activeNav" :data="menus" @change="navItem" />
      </div>
      <div class="col-6 col-md-3 d-flex justify-content-end align-items-center" role="button">
        <a
            class="font-secondary fs-16 fw-400 border-bottom border-primary mb-0 view-more-link"
            @click="$router.push('/profile/inventory')"
        >{{ $t('vendor_dashboard.view_all') }}</a
        >
      </div>
    </div>
    <div>
      <b-table
        class="productTable"
        borderless
        no-border-collapse
        :fields="fields"
        :items="topProducts"
        tbody-tr-class="bg-white"
      >
        <template #cell(product)="row">
          <div class="d-flex align-items-center gap-2 mb-2 mb-sm-0">
            <div class="col-thumb d-flex justify-content-center">
              <ProductThumb :src="row.item.image" :product="row.item" />
            </div>
            <div>
              <h4
                class="font-secondary fw-6 fs-15 text-primary border-bottom border-primary mb-1"
              >
                {{ row.item.name }}
              </h4>
              <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
                {{ $t('vendor_dashboard.sku') }}: {{ row.item.sku }}
              </h4>
              <h4 class="font-secondary fs-14 fw-5 mb-0 text-gray-dark">
                {{ $t('vendor_dashboard.colorway') }}: {{ row.item.colorway }}
              </h4>
            </div>
          </div>
        </template>
        <template #cell(average_sale_price)="row">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.avg_price')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.avg_sales_price }}
            </h4>
          </div>
        </template>
        <template #cell(sales_this_month)="row">
          <div
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.sales_this_month')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.sales_amount_this_month }}
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
            class="d-flex align-items-center justify-content-center tdHeight"
            :aria-label="$t('vendor_dashboard.total_sales')"
          >
            <h4 class="font-secondary fw-5 fs-16 mb-0">
              {{ row.item.total_sales_amount }}
            </h4>
          </div>
        </template>
        <template #cell(chart)>
          <div
            class="d-flex align-items-center justify-content-center tdHeight position-relative"
          >
            <LineChart
                :border-width="2"
                :data="datasets.datasets[0].data"
                :fill="false"
                :labels="datasets.labels"
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
export default {
  name: 'TopProductsTable',
  components: { NavGroup, ProductThumb },
  data() {
    return {
      // Active Nav for the Toggle Button
      activeNav: '',
      topProducts: [],
      // TODO dummy data
      fields: [
        {
          key: 'product',
          label: this.$t('vendor_dashboard.product'),
          sortable: true,
        },
        {
          key: 'average_sale_price',
          label: this.$t('vendor_dashboard.avg_price'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'sales_this_month',
          label: this.$t('vendor_dashboard.sales_this_month'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'total_sales',
          label: this.$t('vendor_dashboard.total_sales'),
          sortable: true,
          thClass: 'text-center',
        },
        {
          key: 'chart',
          label: '',
          sortable: false,
          tdClass: 'd-none d-sm-flex',
        },
      ],
      items: [
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
        },
        {
          product: 40,
          average_sale_price: '$350',
          sales_this_month: '$360',
          total_sales: '$2350',
          chart: 4,
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
        elements: {
          point: {
            radius: 0,
          },
        },
      },
      // TODO make dynamic when API provides with data
      datasets: {
        labels: [
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          '7',
          '8',
          '9',
        ],
        datasets: [
          {
            borderColor: '#18A0FB',
            backgroundColor: null,
            data: [65, 59, 80, 81, 56, 55, 100, 22, 55],
            fill: false,
            borderWidth: 2,
          },
        ],
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
    getTopProducts() {
      this.$axios
        .get('/dashboard/vendor/top-products?category_id=' + this.activeNav)
        .then((res) => {
          this.topProducts = res.data.data
        })
        .catch((err) => {
          this.logger.logToServer(err.response)
        })
    },
  },
}
</script>
<style lang="sass">
@import '~/assets/css/_variables'
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
        background-color:  $color-white-5
      &:first-child
        background-color: transparent
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
